// backend/src/API/Controllers/RegistrationsController.cs
using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MedicalCamp.Application.DTOs;
using MedicalCamp.Domain.Entities;
using MedicalCamp.Infrastructure.Data;
using MedicalCamp.Infrastructure.Services;

namespace MedicalCamp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class RegistrationsController : ControllerBase
{
    private readonly MedicalCampContext _context;
    private readonly IMapper _mapper;
    private readonly PdfService _pdfService;
    private readonly IConfiguration _configuration;

    public RegistrationsController(MedicalCampContext context, IMapper mapper, PdfService pdfService, IConfiguration configuration)
    {
        _context = context;
        _mapper = mapper;
        _pdfService = pdfService;
        _configuration = configuration;
    }

    [HttpPost]
    public async Task<ActionResult<CampRegistrationDto>> RegisterForCamp(CreateRegistrationDto dto)
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        using var transaction = await _context.Database.BeginTransactionAsync();
        try
        {
            var camp = await _context.MedicalCamps.FindAsync(dto.CampId);
            if (camp == null) return NotFound("Camp not found");

            if (camp.RemainingSeats <= 0)
                return BadRequest(new { message = "No seats available" });

            if (await _context.CampRegistrations.AnyAsync(r => r.UserId == userId && r.CampId == dto.CampId))
                return BadRequest(new { message = "Already registered for this camp" });

            var registration = _mapper.Map<CampRegistration>(dto);
            registration.UserId = userId;

            camp.RemainingSeats--;

            _context.CampRegistrations.Add(registration);
            await _context.SaveChangesAsync();
            await transaction.CommitAsync();

            var result = await _context.CampRegistrations
                .Include(r => r.User)
                .Include(r => r.Camp)
                .FirstAsync(r => r.Id == registration.Id);

            // Send registration confirmation email
            try
            {
                var emailService = new EmailService(_configuration);
                await emailService.SendCampRegistrationEmailAsync(
                    result.User.Email, 
                    result.User.Name, 
                    result.Camp.Title, 
                    result.Camp.Date, 
                    result.Camp.Location
                );
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Registration email failed: {ex.Message}");
                // Don't fail registration if email fails
            }

            return CreatedAtAction(nameof(GetRegistration), new { id = registration.Id }, _mapper.Map<CampRegistrationDto>(result));
        }
        catch
        {
            await transaction.RollbackAsync();
            throw;
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CampRegistrationDto>> GetRegistration(int id)
    {
        var registration = await _context.CampRegistrations
            .Include(r => r.User)
            .Include(r => r.Camp)
            .FirstOrDefaultAsync(r => r.Id == id);

        if (registration == null) return NotFound();

        return Ok(_mapper.Map<CampRegistrationDto>(registration));
    }

    [HttpGet("camp/{campId}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<List<CampRegistrationDto>>> GetCampRegistrations(int campId)
    {
        var registrations = await _context.CampRegistrations
            .Include(r => r.User)
            .Include(r => r.Camp)
            .Where(r => r.CampId == campId)
            .OrderBy(r => r.RegisteredAt)
            .ToListAsync();

        return Ok(_mapper.Map<List<CampRegistrationDto>>(registrations));
    }

    [HttpGet("camp/{campId}/export-pdf")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> ExportCampRegistrationsPdf(int campId)
    {
        var camp = await _context.MedicalCamps.FindAsync(campId);
        if (camp == null) return NotFound();

        var registrations = await _context.CampRegistrations
            .Include(r => r.User)
            .Include(r => r.Camp)
            .Where(r => r.CampId == campId)
            .OrderBy(r => r.RegisteredAt)
            .ToListAsync();

        var registrationDtos = _mapper.Map<List<CampRegistrationDto>>(registrations);
        var pdfBytes = _pdfService.GenerateRegistrationsPdf(registrationDtos, camp.Title);

        return File(pdfBytes, "text/html", $"camp-{campId}-registrations.html");
    }

    [HttpDelete("{id}")]
    [Route("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> RemoveRegistration(int id)
    {
        using var transaction = await _context.Database.BeginTransactionAsync();
        try
        {
            var registration = await _context.CampRegistrations
                .Include(r => r.Camp)
                .FirstOrDefaultAsync(r => r.Id == id);
            
            if (registration == null) return NotFound();

            // Increase available seats
            registration.Camp.RemainingSeats++;
            
            _context.CampRegistrations.Remove(registration);
            await _context.SaveChangesAsync();
            await transaction.CommitAsync();

            return NoContent();
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            return BadRequest(new { message = $"Failed to remove registration: {ex.Message}" });
        }
    }
}
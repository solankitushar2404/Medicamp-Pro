// backend/src/API/Controllers/SpecialtiesController.cs
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MedicalCamp.Application.DTOs;
using MedicalCamp.Domain.Entities;
using MedicalCamp.Infrastructure.Data;

namespace MedicalCamp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SpecialtiesController : ControllerBase
{
    private readonly MedicalCampContext _context;
    private readonly IMapper _mapper;

    public SpecialtiesController(MedicalCampContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<List<MedicalSpecialtyDto>>> GetSpecialties()
    {
        var specialties = await _context.MedicalSpecialties.ToListAsync();
        return Ok(_mapper.Map<List<MedicalSpecialtyDto>>(specialties));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<MedicalSpecialtyDto>> GetSpecialty(int id)
    {
        var specialty = await _context.MedicalSpecialties.FindAsync(id);
        if (specialty == null) return NotFound();

        return Ok(_mapper.Map<MedicalSpecialtyDto>(specialty));
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<MedicalSpecialtyDto>> CreateSpecialty(CreateMedicalSpecialtyDto dto)
    {
        var specialty = _mapper.Map<MedicalSpecialty>(dto);
        
        _context.MedicalSpecialties.Add(specialty);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetSpecialty), new { id = specialty.Id }, _mapper.Map<MedicalSpecialtyDto>(specialty));
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateSpecialty(int id, CreateMedicalSpecialtyDto dto)
    {
        var specialty = await _context.MedicalSpecialties.FindAsync(id);
        if (specialty == null) return NotFound();

        _mapper.Map(dto, specialty);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeleteSpecialty(int id)
    {
        var specialty = await _context.MedicalSpecialties.FindAsync(id);
        if (specialty == null) return NotFound();

        if (await _context.MedicalCamps.AnyAsync(c => c.SpecialtyId == id))
            return BadRequest(new { message = "Cannot delete specialty with existing camps" });

        _context.MedicalSpecialties.Remove(specialty);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
// backend/src/API/Controllers/AdminCampsController.cs
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MedicalCamp.Infrastructure.Data;
using MedicalCamp.Domain.Entities;

namespace MedicalCamp.API.Controllers;

[ApiController]
[Route("api/admin/camps")]
public class AdminCampsController : ControllerBase
{
    private readonly MedicalCampContext _context;

    public AdminCampsController(MedicalCampContext context)
    {
        _context = context;
    }



    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> CreateCamp([FromForm] CreateCampRequest request)
    {
        try
        {
            if (string.IsNullOrEmpty(request.Title) || string.IsNullOrEmpty(request.Time))
            {
                return BadRequest(new { message = "Title and Time are required" });
            }

            var camp = new Domain.Entities.MedicalCamp
            {
                Title = request.Title,
                Description = request.Description,
                Date = DateTime.SpecifyKind(request.Date, DateTimeKind.Utc),
                Time = TimeSpan.Parse(request.Time),
                Location = request.Location,
                TotalSeats = request.TotalSeats,
                RemainingSeats = request.TotalSeats,
                CategoryId = request.CategoryId,
                SpecialtyId = request.SpecialtyId,
                CreatedAt = DateTime.UtcNow
            };

            if (request.BannerImage != null)
            {
                var fileName = $"camp_{Guid.NewGuid()}{Path.GetExtension(request.BannerImage.FileName)}";
                var uploadsPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", "camps");
                Directory.CreateDirectory(uploadsPath);
                var filePath = Path.Combine(uploadsPath, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await request.BannerImage.CopyToAsync(stream);
                }

                camp.BannerImagePath = $"/images/camps/{fileName}";
            }

            _context.MedicalCamps.Add(camp);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Camp created successfully" });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> UpdateCamp(int id, [FromForm] UpdateCampRequest request)
    {
        var camp = await _context.MedicalCamps.FindAsync(id);
        if (camp == null) return NotFound();

        camp.Title = request.Title;
        camp.Description = request.Description;
        camp.Date = DateTime.SpecifyKind(request.Date, DateTimeKind.Utc);
        camp.Time = TimeSpan.Parse(request.Time);
        camp.Location = request.Location;
        camp.TotalSeats = request.TotalSeats;
        camp.CategoryId = request.CategoryId;
        camp.SpecialtyId = request.SpecialtyId;

        if (request.BannerImage != null)
        {
            var fileName = $"camp_{Guid.NewGuid()}{Path.GetExtension(request.BannerImage.FileName)}";
            var uploadsPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", "camps");
            Directory.CreateDirectory(uploadsPath);
            var filePath = Path.Combine(uploadsPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await request.BannerImage.CopyToAsync(stream);
            }

            camp.BannerImagePath = $"/images/camps/{fileName}";
        }

        await _context.SaveChangesAsync();
        return Ok(new { message = "Camp updated successfully" });
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> DeleteCamp(int id)
    {
        var camp = await _context.MedicalCamps.FindAsync(id);
        if (camp == null) return NotFound();

        _context.MedicalCamps.Remove(camp);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Camp deleted successfully" });
    }
}

public class CreateCampRequest
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public string Time { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public int TotalSeats { get; set; }
    public int CategoryId { get; set; }
    public int SpecialtyId { get; set; }
    public IFormFile? BannerImage { get; set; }
}

public class UpdateCampRequest
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public string Time { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public int TotalSeats { get; set; }
    public int CategoryId { get; set; }
    public int SpecialtyId { get; set; }
    public IFormFile? BannerImage { get; set; }
}
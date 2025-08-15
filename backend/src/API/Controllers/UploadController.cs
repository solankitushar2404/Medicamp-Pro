// backend/src/API/Controllers/UploadController.cs
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MedicalCamp.Infrastructure.Data;

namespace MedicalCamp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class UploadController : ControllerBase
{
    private readonly MedicalCampContext _context;
    private readonly IWebHostEnvironment _environment;

    public UploadController(MedicalCampContext context, IWebHostEnvironment environment)
    {
        _context = context;
        _environment = environment;
    }

    [HttpPost("user-image")]
    public async Task<IActionResult> UploadUserImage(IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest("No file uploaded");

        if (!IsValidImageFile(file))
            return BadRequest("Invalid file type. Only JPG, PNG, and GIF are allowed");

        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        var user = await _context.Users.FindAsync(userId);
        if (user == null) return NotFound();

        var fileName = $"user_{userId}_{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
        var filePath = Path.Combine(_environment.WebRootPath, "images", "users", fileName);

        Directory.CreateDirectory(Path.GetDirectoryName(filePath)!);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
            await stream.FlushAsync();
        }

        user.ProfileImagePath = $"/images/users/{fileName}";
        await _context.SaveChangesAsync();

        return Ok(new { imagePath = user.ProfileImagePath });
    }

    [HttpPost("camp-banner")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UploadCampBanner(IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest("No file uploaded");

        if (!IsValidImageFile(file))
            return BadRequest("Invalid file type. Only JPG, PNG, and GIF are allowed");

        var fileName = $"camp_{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
        var filePath = Path.Combine(_environment.WebRootPath, "images", "camps", fileName);

        Directory.CreateDirectory(Path.GetDirectoryName(filePath)!);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
            await stream.FlushAsync();
        }

        return Ok(new { imagePath = $"/images/camps/{fileName}" });
    }

    private static bool IsValidImageFile(IFormFile file)
    {
        var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif" };
        var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
        return allowedExtensions.Contains(extension) && file.Length <= 5 * 1024 * 1024; // 5MB limit
    }
}
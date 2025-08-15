// backend/src/API/Controllers/PasswordController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MedicalCamp.Application.DTOs;
using MedicalCamp.Domain.Entities;
using MedicalCamp.Infrastructure.Data;
using MedicalCamp.Infrastructure.Services;

namespace MedicalCamp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PasswordController : ControllerBase
{
    private readonly MedicalCampContext _context;
    private readonly EmailService _emailService;

    public PasswordController(MedicalCampContext context, EmailService emailService)
    {
        _context = context;
        _emailService = emailService;
    }

    [HttpPost("forgot")]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDto dto)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
        if (user == null)
            return Ok(new { message = "If the email exists, an OTP has been sent." });

        // Generate 6-digit OTP
        var otp = new Random().Next(100000, 999999).ToString();
        
        // Save OTP to database
        var resetToken = new PasswordResetToken
        {
            UserId = user.Id,
            Token = otp,
            ExpiresAt = DateTime.UtcNow.AddMinutes(5),
            IsUsed = false,
            CreatedAt = DateTime.UtcNow
        };

        _context.PasswordResetTokens.Add(resetToken);
        await _context.SaveChangesAsync();

        // Send OTP email
        try
        {
            await _emailService.SendPasswordResetEmailAsync(user.Email, user.Name, otp);
            Console.WriteLine($"OTP email sent successfully to: {user.Email}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"OTP email failed: {ex.Message}");
            throw;
        }

        return Ok(new { message = "If the email exists, an OTP has been sent." });
    }

    [HttpPost("reset")]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto dto)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
        if (user == null)
            return BadRequest(new { message = "Invalid request." });

        var resetToken = await _context.PasswordResetTokens
            .FirstOrDefaultAsync(rt => rt.UserId == user.Id && 
                                      rt.Token == dto.Token && 
                                      !rt.IsUsed && 
                                      rt.ExpiresAt > DateTime.UtcNow);

        if (resetToken == null)
            return BadRequest(new { message = "Invalid or expired OTP." });

        // Update password
        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
        
        // Mark token as used
        resetToken.IsUsed = true;
        
        await _context.SaveChangesAsync();

        // Send confirmation email
        await _emailService.SendPasswordChangedEmailAsync(user.Email, user.Name);

        return Ok(new { message = "Password reset successfully." });
    }
}
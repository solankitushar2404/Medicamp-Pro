// backend/src/API/Controllers/UsersController.cs
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
public class UsersController : ControllerBase
{
    private readonly MedicalCampContext _context;
    private readonly IMapper _mapper;
    private readonly EmailService _emailService;

    public UsersController(MedicalCampContext context, IMapper mapper, EmailService emailService)
    {
        _context = context;
        _mapper = mapper;
        _emailService = emailService;
    }

    [HttpGet("profile")]
    public async Task<ActionResult<UserDto>> GetProfile()
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        var user = await _context.Users.FindAsync(userId);
        
        if (user == null) return NotFound();
        
        return Ok(_mapper.Map<UserDto>(user));
    }

    [HttpGet("me")]
    public async Task<ActionResult<UserDto>> GetCurrentUser()
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        var user = await _context.Users.FindAsync(userId);
        
        if (user == null) return NotFound();
        
        return Ok(_mapper.Map<UserDto>(user));
    }

    [HttpPut("profile")]
    public async Task<IActionResult> UpdateProfile(UpdateProfileDto dto)
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        var user = await _context.Users.FindAsync(userId);
        
        if (user == null) return NotFound();

        if (await _context.Users.AnyAsync(u => u.Email == dto.Email && u.Id != userId))
            return BadRequest(new { message = "Email already exists" });

        _mapper.Map(dto, user);
        await _context.SaveChangesAsync();
        
        return NoContent();
    }

    [HttpPost("change-password")]
    public async Task<IActionResult> ChangePassword(ChangePasswordDto dto)
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        var user = await _context.Users.FindAsync(userId);
        
        if (user == null) return NotFound();

        if (!BCrypt.Net.BCrypt.Verify(dto.CurrentPassword, user.PasswordHash))
            return BadRequest(new { message = "Current password is incorrect" });

        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
        await _context.SaveChangesAsync();
        
        return Ok(new { message = "Password changed successfully" });
    }

    [HttpPost("request-password-change-otp")]
    public async Task<IActionResult> RequestPasswordChangeOtp()
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        var user = await _context.Users.FindAsync(userId);
        
        if (user == null) return NotFound();

        // Generate 6-digit OTP
        var otp = new Random().Next(100000, 999999).ToString();
        
        user.PasswordChangeOtp = otp;
        user.PasswordChangeOtpExpiry = DateTime.UtcNow.AddMinutes(5); // 5 minutes expiry
        
        await _context.SaveChangesAsync();
        
        try
        {
            await _emailService.SendPasswordResetEmailAsync(user.Email, user.Name, otp);
            return Ok(new { message = "OTP sent to your email address" });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = "Failed to send OTP email" });
        }
    }

    [HttpPost("verify-otp-and-change-password")]
    public async Task<IActionResult> VerifyOtpAndChangePassword(VerifyOtpAndChangePasswordDto dto)
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        var user = await _context.Users.FindAsync(userId);
        
        if (user == null) return NotFound();

        // Verify OTP
        if (string.IsNullOrEmpty(user.PasswordChangeOtp) || 
            user.PasswordChangeOtp != dto.Otp ||
            user.PasswordChangeOtpExpiry == null ||
            user.PasswordChangeOtpExpiry < DateTime.UtcNow)
        {
            return BadRequest(new { message = "Invalid or expired OTP" });
        }

        // Change password
        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
        user.PasswordChangeOtp = null;
        user.PasswordChangeOtpExpiry = null;
        
        await _context.SaveChangesAsync();
        
        try
        {
            await _emailService.SendPasswordChangedEmailAsync(user.Email, user.Name);
        }
        catch (Exception ex)
        {
            // Log error but don't fail the password change
            Console.WriteLine($"Failed to send password changed email: {ex.Message}");
        }
        
        return Ok(new { message = "Password changed successfully" });
    }
}
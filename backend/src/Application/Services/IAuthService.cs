// backend/src/Application/Services/IAuthService.cs
using MedicalCamp.Application.DTOs;

namespace MedicalCamp.Application.Services;

public interface IAuthService
{
    Task<AuthResponseDto> LoginAsync(LoginDto loginDto);
    Task<AuthResponseDto> RegisterAsync(RegisterDto registerDto);
    string GenerateJwtToken(UserDto user);
}
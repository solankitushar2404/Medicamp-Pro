// backend/src/Domain/Entities/User.cs
namespace MedicalCamp.Domain.Entities;

public class User
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string? Phone { get; set; }
    public string Role { get; set; } = "User";
    public string? ProfileImagePath { get; set; }
    public string? PasswordChangeOtp { get; set; }
    public DateTime? PasswordChangeOtpExpiry { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public ICollection<CampRegistration> Registrations { get; set; } = new List<CampRegistration>();
}
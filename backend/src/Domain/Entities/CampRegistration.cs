// backend/src/Domain/Entities/CampRegistration.cs
namespace MedicalCamp.Domain.Entities;

public class CampRegistration
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public User User { get; set; } = null!;
    public int CampId { get; set; }
    public MedicalCamp Camp { get; set; } = null!;
    public int Age { get; set; }
    public string Gender { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Symptoms { get; set; }
    public DateTime RegisteredAt { get; set; } = DateTime.UtcNow;
}
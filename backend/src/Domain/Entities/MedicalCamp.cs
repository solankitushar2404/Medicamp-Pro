// backend/src/Domain/Entities/MedicalCamp.cs
namespace MedicalCamp.Domain.Entities;

public class MedicalCamp
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public TimeSpan Time { get; set; }
    public string Location { get; set; } = string.Empty;
    public int TotalSeats { get; set; }
    public int RemainingSeats { get; set; }
    public string? BannerImagePath { get; set; }
    public int CategoryId { get; set; }
    public CampCategory Category { get; set; } = null!;
    public int SpecialtyId { get; set; }
    public MedicalSpecialty Specialty { get; set; } = null!;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public ICollection<CampRegistration> Registrations { get; set; } = new List<CampRegistration>();
}
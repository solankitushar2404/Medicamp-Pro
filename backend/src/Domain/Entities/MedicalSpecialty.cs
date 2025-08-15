// backend/src/Domain/Entities/MedicalSpecialty.cs
namespace MedicalCamp.Domain.Entities;

public class MedicalSpecialty
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public ICollection<MedicalCamp> Camps { get; set; } = new List<MedicalCamp>();
}
// backend/src/Domain/Entities/CampCategory.cs
namespace MedicalCamp.Domain.Entities;

public class CampCategory
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public ICollection<MedicalCamp> Camps { get; set; } = new List<MedicalCamp>();
}
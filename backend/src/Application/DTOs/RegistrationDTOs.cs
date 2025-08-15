// backend/src/Application/DTOs/RegistrationDTOs.cs
namespace MedicalCamp.Application.DTOs;

public class CampRegistrationDto
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string UserName { get; set; } = string.Empty;
    public string UserEmail { get; set; } = string.Empty;
    public int CampId { get; set; }
    public string CampTitle { get; set; } = string.Empty;
    public int Age { get; set; }
    public string Gender { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Symptoms { get; set; }
    public DateTime RegisteredAt { get; set; }
}

public class CreateRegistrationDto
{
    public int CampId { get; set; }
    public int Age { get; set; }
    public string Gender { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Symptoms { get; set; }
}
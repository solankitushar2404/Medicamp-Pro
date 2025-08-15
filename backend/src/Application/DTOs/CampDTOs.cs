// backend/src/Application/DTOs/CampDTOs.cs
namespace MedicalCamp.Application.DTOs;

public class MedicalCampDto
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
    public string CategoryName { get; set; } = string.Empty;
    public int SpecialtyId { get; set; }
    public string SpecialtyName { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}

public class CreateCampDto
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public TimeSpan Time { get; set; }
    public string Location { get; set; } = string.Empty;
    public int TotalSeats { get; set; }
    public int CategoryId { get; set; }
    public int SpecialtyId { get; set; }
    public string? BannerImagePath { get; set; }
}

public class UpdateCampDto
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public TimeSpan Time { get; set; }
    public string Location { get; set; } = string.Empty;
    public int TotalSeats { get; set; }
    public int CategoryId { get; set; }
    public int SpecialtyId { get; set; }
    public string? BannerImagePath { get; set; }
}

public class CampCategoryDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}

public class CreateCampCategoryDto
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}

public class MedicalSpecialtyDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}

public class CreateMedicalSpecialtyDto
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}

public class PagedResult<T>
{
    public List<T> Items { get; set; } = new();
    public int TotalCount { get; set; }
    public int Page { get; set; }
    public int PageSize { get; set; }
    public int TotalPages { get; set; }
}
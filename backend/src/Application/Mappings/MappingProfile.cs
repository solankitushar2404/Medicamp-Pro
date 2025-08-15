// backend/src/Application/Mappings/MappingProfile.cs
using AutoMapper;
using MedicalCamp.Application.DTOs;
using MedicalCamp.Domain.Entities;

namespace MedicalCamp.Application.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<User, UserDto>();
        CreateMap<RegisterDto, User>()
            .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => DateTime.UtcNow));
        CreateMap<UpdateProfileDto, User>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.PasswordHash, opt => opt.Ignore())
            .ForMember(dest => dest.Role, opt => opt.Ignore())
            .ForMember(dest => dest.CreatedAt, opt => opt.Ignore());

        CreateMap<Domain.Entities.MedicalCamp, MedicalCampDto>()
            .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category.Name))
            .ForMember(dest => dest.SpecialtyName, opt => opt.MapFrom(src => src.Specialty.Name));
        CreateMap<CreateCampDto, Domain.Entities.MedicalCamp>()
            .ForMember(dest => dest.RemainingSeats, opt => opt.MapFrom(src => src.TotalSeats))
            .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => DateTime.UtcNow));
        CreateMap<UpdateCampDto, Domain.Entities.MedicalCamp>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
            .ForMember(dest => dest.RemainingSeats, opt => opt.Ignore());

        CreateMap<CampCategory, CampCategoryDto>();
        CreateMap<CreateCampCategoryDto, CampCategory>();

        CreateMap<MedicalSpecialty, MedicalSpecialtyDto>();
        CreateMap<CreateMedicalSpecialtyDto, MedicalSpecialty>();

        CreateMap<CampRegistration, CampRegistrationDto>()
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.User.Name))
            .ForMember(dest => dest.UserEmail, opt => opt.MapFrom(src => src.User.Email))
            .ForMember(dest => dest.CampTitle, opt => opt.MapFrom(src => src.Camp.Title));
        CreateMap<CreateRegistrationDto, CampRegistration>()
            .ForMember(dest => dest.RegisteredAt, opt => opt.MapFrom(src => DateTime.UtcNow));
    }
}
// backend/src/API/Program.cs
using System.Text;
using DinkToPdf;
using DinkToPdf.Contracts;
using System.Runtime.Loader;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using MedicalCamp.Application.Mappings;
using MedicalCamp.Application.Services;
using MedicalCamp.Application.Validators;
using MedicalCamp.Domain.Interfaces;
using MedicalCamp.Infrastructure.Data;
using MedicalCamp.Infrastructure.Repositories;
using MedicalCamp.Infrastructure.Services;

var builder = WebApplication.CreateBuilder(args);

// Database
builder.Services.AddDbContext<MedicalCampContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("Default")));

// AutoMapper
builder.Services.AddAutoMapper(typeof(MappingProfile));

// FluentValidation
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddValidatorsFromAssemblyContaining<LoginDtoValidator>();

// Services
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<PdfService>();
builder.Services.AddScoped<EmailService>();
// builder.Services.AddHostedService<CampCleanupService>(); // Temporarily disabled

// JWT Authentication
var jwtKey = builder.Configuration["JWT:Key"]!;
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["JWT:Issuer"],
            ValidAudience = builder.Configuration["JWT:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
        };
    });

// CORS
var corsOrigins = builder.Configuration.GetSection("Cors:Origins").Get<string[]>() ?? new[] { "http://localhost:4200" };
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(corsOrigins)
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new MedicalCamp.API.Converters.TimeSpanConverter());
    });
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Medical Camp API", Version = "v1" });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
            },
            Array.Empty<string>()
        }
    });
});

var app = builder.Build();

// Configure pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");
app.UseStaticFiles();

// Ensure uploads directory exists
var uploadsPath = Path.Combine(Directory.GetCurrentDirectory(), "uploads");
Directory.CreateDirectory(uploadsPath);
Directory.CreateDirectory(Path.Combine(uploadsPath, "camps"));

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(uploadsPath),
    RequestPath = "/uploads"
});
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

// Ensure wwwroot directories exist
var webRootPath = app.Environment.WebRootPath;
Directory.CreateDirectory(Path.Combine(webRootPath, "images", "users"));
Directory.CreateDirectory(Path.Combine(webRootPath, "images", "camps"));

// Seed database
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<MedicalCampContext>();
    await SeedData(context);
}

app.Run();

static async Task SeedData(MedicalCampContext context)
{
    await context.Database.EnsureCreatedAsync();

    if (!context.Users.Any())
    {
        var adminUser = new MedicalCamp.Domain.Entities.User
        {
            Name = "Admin User",
            Email = "admin@medicamp.local",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin@123"),
            Role = "Admin",
            CreatedAt = DateTime.UtcNow
        };

        var regularUser = new MedicalCamp.Domain.Entities.User
        {
            Name = "Regular User",
            Email = "user@medicamp.local",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("User@123"),
            Role = "User",
            CreatedAt = DateTime.UtcNow
        };

        context.Users.AddRange(adminUser, regularUser);
    }

    if (!context.CampCategories.Any())
    {
        var categories = new[]
        {
            new MedicalCamp.Domain.Entities.CampCategory { Name = "General Health", Description = "General health checkups and consultations" },
            new MedicalCamp.Domain.Entities.CampCategory { Name = "Eye Care", Description = "Eye examinations and vision tests" },
            new MedicalCamp.Domain.Entities.CampCategory { Name = "Dental Care", Description = "Dental checkups and treatments" },
            new MedicalCamp.Domain.Entities.CampCategory { Name = "Women's Health", Description = "Health services for women" }
        };
        context.CampCategories.AddRange(categories);
    }

    if (!context.MedicalSpecialties.Any())
    {
        var specialties = new[]
        {
            new MedicalCamp.Domain.Entities.MedicalSpecialty { Name = "Cardiology", Description = "Heart and cardiovascular system" },
            new MedicalCamp.Domain.Entities.MedicalSpecialty { Name = "Ophthalmology", Description = "Eye and vision care" },
            new MedicalCamp.Domain.Entities.MedicalSpecialty { Name = "Dentistry", Description = "Dental and oral health" },
            new MedicalCamp.Domain.Entities.MedicalSpecialty { Name = "Gynecology", Description = "Women's reproductive health" }
        };
        context.MedicalSpecialties.AddRange(specialties);
    }

    await context.SaveChangesAsync();

    if (!context.MedicalCamps.Any())
    {
        var camps = new[]
        {
            new MedicalCamp.Domain.Entities.MedicalCamp
            {
                Title = "Free Eye Checkup Camp",
                Description = "Comprehensive eye examination for all ages",
                Date = DateTime.UtcNow.Date.AddDays(30),
                Time = new TimeSpan(9, 0, 0),
                Location = "Community Health Center, Main Street",
                TotalSeats = 100,
                RemainingSeats = 100,
                CategoryId = 2,
                SpecialtyId = 2,
                CreatedAt = DateTime.UtcNow
            },
            new MedicalCamp.Domain.Entities.MedicalCamp
            {
                Title = "Heart Health Screening",
                Description = "Free cardiac screening and consultation",
                Date = DateTime.UtcNow.Date.AddDays(45),
                Time = new TimeSpan(10, 0, 0),
                Location = "City Hospital, Downtown",
                TotalSeats = 50,
                RemainingSeats = 50,
                CategoryId = 1,
                SpecialtyId = 1,
                CreatedAt = DateTime.UtcNow
            }
        };
        context.MedicalCamps.AddRange(camps);
        await context.SaveChangesAsync();
    }
}
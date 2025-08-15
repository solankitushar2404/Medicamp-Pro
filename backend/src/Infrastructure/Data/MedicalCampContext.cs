// backend/src/Infrastructure/Data/MedicalCampContext.cs
using Microsoft.EntityFrameworkCore;
using MedicalCamp.Domain.Entities;

namespace MedicalCamp.Infrastructure.Data;

public class MedicalCampContext : DbContext
{
    public MedicalCampContext(DbContextOptions<MedicalCampContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<MedicalCamp.Domain.Entities.MedicalCamp> MedicalCamps { get; set; }
    public DbSet<CampCategory> CampCategories { get; set; }
    public DbSet<MedicalSpecialty> MedicalSpecialties { get; set; }
    public DbSet<CampRegistration> CampRegistrations { get; set; }
    public DbSet<PasswordResetToken> PasswordResetTokens { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.Email).IsUnique();
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Email).IsRequired().HasMaxLength(255);
            entity.Property(e => e.PasswordHash).IsRequired();
            entity.Property(e => e.Role).IsRequired().HasMaxLength(20);
        });

        modelBuilder.Entity<MedicalCamp.Domain.Entities.MedicalCamp>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title).IsRequired().HasMaxLength(200);
            entity.Property(e => e.Description).IsRequired();
            entity.Property(e => e.Location).IsRequired().HasMaxLength(500);
            entity.HasOne(e => e.Category).WithMany(c => c.Camps).HasForeignKey(e => e.CategoryId);
            entity.HasOne(e => e.Specialty).WithMany(s => s.Camps).HasForeignKey(e => e.SpecialtyId);
        });

        modelBuilder.Entity<CampCategory>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Description).IsRequired();
        });

        modelBuilder.Entity<MedicalSpecialty>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Description).IsRequired();
        });

        modelBuilder.Entity<CampRegistration>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Gender).IsRequired().HasMaxLength(10);
            entity.Property(e => e.Phone).IsRequired().HasMaxLength(15);
            entity.Property(e => e.Email).IsRequired().HasMaxLength(255);
            entity.HasOne(e => e.User).WithMany(u => u.Registrations).HasForeignKey(e => e.UserId);
            entity.HasOne(e => e.Camp).WithMany(c => c.Registrations).HasForeignKey(e => e.CampId);
            entity.HasIndex(e => new { e.UserId, e.CampId }).IsUnique();
        });

        modelBuilder.Entity<PasswordResetToken>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Token).IsRequired().HasMaxLength(10);
            entity.HasOne(e => e.User).WithMany().HasForeignKey(e => e.UserId);
        });
    }
}
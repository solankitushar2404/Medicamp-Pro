// backend/src/API/Controllers/CategoriesController.cs
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MedicalCamp.Application.DTOs;
using MedicalCamp.Domain.Entities;
using MedicalCamp.Infrastructure.Data;

namespace MedicalCamp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly MedicalCampContext _context;
    private readonly IMapper _mapper;

    public CategoriesController(MedicalCampContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<List<CampCategoryDto>>> GetCategories()
    {
        var categories = await _context.CampCategories.ToListAsync();
        return Ok(_mapper.Map<List<CampCategoryDto>>(categories));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CampCategoryDto>> GetCategory(int id)
    {
        var category = await _context.CampCategories.FindAsync(id);
        if (category == null) return NotFound();

        return Ok(_mapper.Map<CampCategoryDto>(category));
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<CampCategoryDto>> CreateCategory(CreateCampCategoryDto dto)
    {
        var category = _mapper.Map<CampCategory>(dto);
        
        _context.CampCategories.Add(category);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetCategory), new { id = category.Id }, _mapper.Map<CampCategoryDto>(category));
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateCategory(int id, CreateCampCategoryDto dto)
    {
        var category = await _context.CampCategories.FindAsync(id);
        if (category == null) return NotFound();

        _mapper.Map(dto, category);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeleteCategory(int id)
    {
        var category = await _context.CampCategories.FindAsync(id);
        if (category == null) return NotFound();

        if (await _context.MedicalCamps.AnyAsync(c => c.CategoryId == id))
            return BadRequest(new { message = "Cannot delete category with existing camps" });

        _context.CampCategories.Remove(category);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
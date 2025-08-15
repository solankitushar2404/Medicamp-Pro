// backend/src/API/Controllers/CampsController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MedicalCamp.Infrastructure.Data;
using MedicalCamp.Infrastructure.Services;
using MedicalCamp.Application.DTOs;
using AutoMapper;

namespace MedicalCamp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CampsController : ControllerBase
{
    private readonly MedicalCampContext _context;
    private readonly PdfService _pdfService;
    private readonly IMapper _mapper;

    public CampsController(MedicalCampContext context, PdfService pdfService, IMapper mapper)
    {
        _context = context;
        _pdfService = pdfService;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult> GetCamps(int page = 1, int pageSize = 10)
    {
        var camps = await _context.MedicalCamps
            .Include(c => c.Category)
            .Include(c => c.Specialty)
            .OrderBy(c => c.Date)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        var totalCount = await _context.MedicalCamps.CountAsync();

        var result = new
        {
            items = camps.Select(c => new
            {
                c.Id,
                c.Title,
                c.Description,
                c.Date,
                Time = c.Time.ToString(@"hh\:mm"),
                c.Location,
                c.TotalSeats,
                c.RemainingSeats,
                c.CategoryId,
                CategoryName = c.Category?.Name,
                c.SpecialtyId,
                SpecialtyName = c.Specialty?.Name,
                c.BannerImagePath,
                c.CreatedAt
            }),
            totalCount,
            page,
            pageSize,
            totalPages = (int)Math.Ceiling((double)totalCount / pageSize)
        };

        return Ok(result);
    }

    [HttpGet("all/export-pdf")]
    public async Task<IActionResult> ExportAllCampsPdf()
    {
        var camps = await _context.MedicalCamps
            .Include(c => c.Category)
            .Include(c => c.Specialty)
            .OrderBy(c => c.Date)
            .ToListAsync();

        var html = $@"
        <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; margin: 20px; }}
                h1 {{ color: #1e3c72; text-align: center; }}
                table {{ width: 100%; border-collapse: collapse; margin-top: 20px; }}
                th, td {{ border: 1px solid #ddd; padding: 8px; text-align: left; }}
                th {{ background-color: #1e3c72; color: white; }}
                .date {{ white-space: nowrap; }}
            </style>
        </head>
        <body>
            <h1>MediCamp Pro - Camps Report</h1>
            <table>
                <thead>
                    <tr>
                        <th>Camp Name</th>
                        <th>Date</th>
                        <th>Location</th>
                        <th>Category</th>
                        <th>Specialty</th>
                        <th>Total Seats</th>
                        <th>Remaining</th>
                    </tr>
                </thead>
                <tbody>";

        foreach (var camp in camps)
        {
            html += $@"
                    <tr>
                        <td>{camp.Title}</td>
                        <td class='date'>{camp.Date:yyyy-MM-dd}</td>
                        <td>{camp.Location}</td>
                        <td>{camp.Category?.Name ?? "N/A"}</td>
                        <td>{camp.Specialty?.Name ?? "N/A"}</td>
                        <td>{camp.TotalSeats}</td>
                        <td>{camp.RemainingSeats}</td>
                    </tr>";
        }

        html += @"
                </tbody>
            </table>
        </body>
        </html>";

        return File(System.Text.Encoding.UTF8.GetBytes(html), "text/html", "camps-report.html");
    }
}
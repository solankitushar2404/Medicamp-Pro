// backend/src/Infrastructure/Services/PdfService.cs
using System.Text;
using MedicalCamp.Application.DTOs;

namespace MedicalCamp.Infrastructure.Services;

public class PdfService
{
    // Generate print-ready HTML that browsers can convert to PDF
    public byte[] GenerateRegistrationsPdf(List<CampRegistrationDto> registrations, string campTitle)
    {
        var html = GeneratePrintableHtml(registrations, campTitle);
        return Encoding.UTF8.GetBytes(html);
    }

    private string GeneratePrintableHtml(List<CampRegistrationDto> registrations, string campTitle)
    {
        var html = new StringBuilder();
        html.AppendLine("<!DOCTYPE html>");
        html.AppendLine("<html>");
        html.AppendLine("<head>");
        html.AppendLine("<meta charset='utf-8'>");
        html.AppendLine($"<title>Camp Registrations - {campTitle}</title>");
        html.AppendLine("<style>");
        html.AppendLine("@media print { body { margin: 0; } }");
        html.AppendLine("body { font-family: Arial, sans-serif; margin: 20px; font-size: 12px; }");
        html.AppendLine(".header { text-align: center; margin-bottom: 30px; }");
        html.AppendLine(".camp-title { font-size: 20px; font-weight: bold; color: #333; }");
        html.AppendLine(".subtitle { font-size: 14px; color: #666; margin-top: 10px; }");
        html.AppendLine("table { width: 100%; border-collapse: collapse; margin-top: 20px; }");
        html.AppendLine("th, td { border: 1px solid #ddd; padding: 6px; text-align: left; font-size: 11px; }");
        html.AppendLine("th { background-color: #f2f2f2; font-weight: bold; }");
        html.AppendLine(".total { margin-top: 20px; font-weight: bold; }");
        html.AppendLine("</style>");
        html.AppendLine("</head>");
        html.AppendLine("<body>");
        
        html.AppendLine("<div class='header'>");
        html.AppendLine($"<div class='camp-title'>{campTitle}</div>");
        html.AppendLine($"<div class='subtitle'>Registration Report - Generated on {DateTime.Now:yyyy-MM-dd HH:mm}</div>");
        html.AppendLine("</div>");
        
        html.AppendLine("<table>");
        html.AppendLine("<thead>");
        html.AppendLine("<tr>");
        html.AppendLine("<th>S.No</th>");
        html.AppendLine("<th>Name</th>");
        html.AppendLine("<th>Age</th>");
        html.AppendLine("<th>Gender</th>");
        html.AppendLine("<th>Phone</th>");
        html.AppendLine("<th>Email</th>");
        html.AppendLine("<th>Symptoms</th>");
        html.AppendLine("<th>Registered At</th>");
        html.AppendLine("</tr>");
        html.AppendLine("</thead>");
        html.AppendLine("<tbody>");

        for (int i = 0; i < registrations.Count; i++)
        {
            var reg = registrations[i];
            html.AppendLine("<tr>");
            html.AppendLine($"<td>{i + 1}</td>");
            html.AppendLine($"<td>{reg.UserName}</td>");
            html.AppendLine($"<td>{reg.Age}</td>");
            html.AppendLine($"<td>{reg.Gender}</td>");
            html.AppendLine($"<td>{reg.Phone}</td>");
            html.AppendLine($"<td>{reg.Email}</td>");
            html.AppendLine($"<td>{reg.Symptoms ?? "N/A"}</td>");
            html.AppendLine($"<td>{reg.RegisteredAt:yyyy-MM-dd HH:mm}</td>");
            html.AppendLine("</tr>");
        }

        html.AppendLine("</tbody>");
        html.AppendLine("</table>");
        
        html.AppendLine($"<div class='total'>Total Registrations: {registrations.Count}</div>");
        
        html.AppendLine("<script>");
        html.AppendLine("window.onload = function() { window.print(); };");
        html.AppendLine("</script>");
        
        html.AppendLine("</body>");
        html.AppendLine("</html>");

        return html.ToString();
    }

    private string GenerateHtml(List<CampRegistrationDto> registrations, string campTitle)
    {
        var html = new StringBuilder();
        html.AppendLine("<!DOCTYPE html>");
        html.AppendLine("<html>");
        html.AppendLine("<head>");
        html.AppendLine("<meta charset='utf-8'>");
        html.AppendLine($"<title>Camp Registrations - {campTitle}</title>");
        html.AppendLine("<style>");
        html.AppendLine("body { font-family: Arial, sans-serif; margin: 20px; }");
        html.AppendLine(".header { text-align: center; margin-bottom: 30px; }");
        html.AppendLine(".camp-title { font-size: 24px; font-weight: bold; color: #333; }");
        html.AppendLine(".subtitle { font-size: 16px; color: #666; margin-top: 10px; }");
        html.AppendLine("table { width: 100%; border-collapse: collapse; margin-top: 20px; }");
        html.AppendLine("th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }");
        html.AppendLine("th { background-color: #f2f2f2; font-weight: bold; }");
        html.AppendLine(".total { margin-top: 20px; font-weight: bold; }");
        html.AppendLine("</style>");
        html.AppendLine("</head>");
        html.AppendLine("<body>");
        
        html.AppendLine("<div class='header'>");
        html.AppendLine($"<div class='camp-title'>{campTitle}</div>");
        html.AppendLine($"<div class='subtitle'>Registration Report - Generated on {DateTime.Now:yyyy-MM-dd HH:mm}</div>");
        html.AppendLine("</div>");
        
        html.AppendLine("<table>");
        html.AppendLine("<thead>");
        html.AppendLine("<tr>");
        html.AppendLine("<th>S.No</th>");
        html.AppendLine("<th>Name</th>");
        html.AppendLine("<th>Age</th>");
        html.AppendLine("<th>Gender</th>");
        html.AppendLine("<th>Phone</th>");
        html.AppendLine("<th>Email</th>");
        html.AppendLine("<th>Symptoms</th>");
        html.AppendLine("<th>Registered At</th>");
        html.AppendLine("</tr>");
        html.AppendLine("</thead>");
        html.AppendLine("<tbody>");

        for (int i = 0; i < registrations.Count; i++)
        {
            var reg = registrations[i];
            html.AppendLine("<tr>");
            html.AppendLine($"<td>{i + 1}</td>");
            html.AppendLine($"<td>{reg.UserName}</td>");
            html.AppendLine($"<td>{reg.Age}</td>");
            html.AppendLine($"<td>{reg.Gender}</td>");
            html.AppendLine($"<td>{reg.Phone}</td>");
            html.AppendLine($"<td>{reg.Email}</td>");
            html.AppendLine($"<td>{reg.Symptoms ?? "N/A"}</td>");
            html.AppendLine($"<td>{reg.RegisteredAt:yyyy-MM-dd HH:mm}</td>");
            html.AppendLine("</tr>");
        }

        html.AppendLine("</tbody>");
        html.AppendLine("</table>");
        
        html.AppendLine($"<div class='total'>Total Registrations: {registrations.Count}</div>");
        
        html.AppendLine("</body>");
        html.AppendLine("</html>");

        return html.ToString();
    }
}
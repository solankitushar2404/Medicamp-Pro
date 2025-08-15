// backend/src/Infrastructure/Services/EmailService.cs
using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Configuration;

namespace MedicalCamp.Infrastructure.Services;

public class EmailService
{
    private readonly IConfiguration _configuration;
    private readonly string _smtpHost;
    private readonly int _smtpPort;
    private readonly string _smtpUsername;
    private readonly string _smtpPassword;
    private readonly string _fromEmail;

    public EmailService(IConfiguration configuration)
    {
        _configuration = configuration;
        _smtpHost = _configuration["Email:SmtpHost"] ?? "smtp.gmail.com";
        _smtpPort = int.Parse(_configuration["Email:SmtpPort"] ?? "587");
        _smtpUsername = _configuration["Email:Username"] ?? "";
        _smtpPassword = _configuration["Email:Password"] ?? "";
        _fromEmail = _configuration["Email:FromEmail"] ?? "noreply@medicamp.pro";
    }

    public async Task SendWelcomeEmailAsync(string toEmail, string firstName)
    {
        var subject = "Welcome to MediCamp Pro!";
        var body = $@"
        <html>
        <body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
            <div style='max-width: 600px; margin: 0 auto; padding: 20px;'>
                <div style='text-align: center; margin-bottom: 30px;'>
                    <h1 style='color: #1e3c72; margin: 0; font-size: 2.5rem;'>MediCamp Pro</h1>
                    <p style='color: #7f8c8d; margin: 5px 0;'>Healthcare Made Accessible</p>
                </div>
                
                <h2 style='color: #2c3e50;'>Welcome, {firstName}!</h2>
                
                <p>Thank you for joining MediCamp Pro! We're excited to have you as part of our healthcare community.</p>
                
                <div style='background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;'>
                    <h3 style='color: #1e3c72; margin-top: 0;'>Your Account Details:</h3>
                    <p><strong>Email:</strong> {toEmail}</p>
                    <p><strong>Status:</strong> Active</p>
                </div>
                
                <div style='text-align: center; margin: 30px 0;'>
                    <a href='http://localhost:4200/auth/login' style='background: linear-gradient(135deg, #1e3c72, #2a5298); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;'>
                        Login to Your Account
                    </a>
                </div>
                
                <div style='background: #e8f4fd; padding: 15px; border-radius: 8px; border-left: 4px solid #1e3c72;'>
                    <h4 style='color: #1e3c72; margin-top: 0;'>What's Next?</h4>
                    <ul style='margin: 0; padding-left: 20px;'>
                        <li>Browse upcoming medical camps</li>
                        <li>Register for camps near you</li>
                        <li>Manage your profile and preferences</li>
                    </ul>
                </div>
                
                <hr style='border: none; border-top: 1px solid #eee; margin: 30px 0;'>
                
                <p style='color: #7f8c8d; font-size: 14px; text-align: center;'>
                    This email was sent by MediCamp Pro. If you have any questions, please contact our support team.
                </p>
            </div>
        </body>
        </html>";

        await SendEmailAsync(toEmail, subject, body);
    }

    public async Task SendPasswordResetEmailAsync(string toEmail, string firstName, string otp)
    {
        var subject = "MediCamp Pro - Password Reset OTP";
        var body = $@"
        <html>
        <body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
            <div style='max-width: 600px; margin: 0 auto; padding: 20px;'>
                <div style='text-align: center; margin-bottom: 30px;'>
                    <h1 style='color: #1e3c72; margin: 0; font-size: 2.5rem;'>MediCamp Pro</h1>
                </div>
                
                <h2 style='color: #2c3e50;'>Password Reset Request</h2>
                
                <p>Hello {firstName},</p>
                <p>We received a request to reset your password. Use the OTP code below to proceed:</p>
                
                <div style='text-align: center; margin: 30px 0;'>
                    <div style='background: #f8f9fa; border: 2px dashed #1e3c72; padding: 20px; border-radius: 10px; display: inline-block;'>
                        <h1 style='color: #1e3c72; font-size: 36px; margin: 0; letter-spacing: 8px;'>{otp}</h1>
                    </div>
                </div>
                
                <div style='background: #fff3cd; padding: 15px; border-radius: 8px; border-left: 4px solid #ffc107; margin: 20px 0;'>
                    <p style='margin: 0; color: #856404;'><strong>⏰ This OTP will expire in 5 minutes.</strong></p>
                </div>
                
                <div style='background: #f8d7da; padding: 15px; border-radius: 8px; border-left: 4px solid #dc3545; margin: 20px 0;'>
                    <p style='margin: 0; color: #721c24;'><strong>🔒 Security Note:</strong> Do not share this code with anyone. Our team will never ask for your OTP.</p>
                </div>
                
                <p>If you didn't request this password reset, please ignore this email or contact our support team.</p>
                
                <hr style='border: none; border-top: 1px solid #eee; margin: 30px 0;'>
                
                <p style='color: #7f8c8d; font-size: 14px; text-align: center;'>
                    This email was sent by MediCamp Pro. If you have any questions, please contact our support team.
                </p>
            </div>
        </body>
        </html>";

        await SendEmailAsync(toEmail, subject, body);
    }

    public async Task SendPasswordChangedEmailAsync(string toEmail, string firstName)
    {
        var subject = "MediCamp Pro - Password Changed Successfully";
        var body = $@"
        <html>
        <body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
            <div style='max-width: 600px; margin: 0 auto; padding: 20px;'>
                <div style='text-align: center; margin-bottom: 30px;'>
                    <h1 style='color: #1e3c72; margin: 0; font-size: 2.5rem;'>MediCamp Pro</h1>
                </div>
                
                <div style='text-align: center; margin-bottom: 30px;'>
                    <h2 style='color: #155724; margin: 0; font-size: 2rem;'>Password Changed Successfully!</h2>
                </div>
                
                <p>Hello {firstName},</p>
                <p>Your password has been successfully changed. Your account is now secure with the new password.</p>
                
                <div style='text-align: center; margin: 30px 0;'>
                    <a href='http://localhost:4200/auth/login' style='background: linear-gradient(135deg, #1e3c72, #2a5298); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;'>
                        Login with New Password
                    </a>
                </div>
                
                <div style='background: #f8d7da; padding: 15px; border-radius: 8px; border-left: 4px solid #dc3545; margin: 20px 0;'>
                    <h4 style='color: #721c24; margin-top: 0;'>🔒 Security Reminder:</h4>
                    <ul style='margin: 0; padding-left: 20px; color: #721c24;'>
                        <li>Keep your password secure and don't share it with anyone</li>
                        <li>Use a strong, unique password for your account</li>
                        <li>If you didn't make this change, contact support immediately</li>
                    </ul>
                </div>
                
                <hr style='border: none; border-top: 1px solid #eee; margin: 30px 0;'>
                
                <p style='color: #7f8c8d; font-size: 14px; text-align: center;'>
                    This email was sent by MediCamp Pro. If you have any questions, please contact our support team.
                </p>
            </div>
        </body>
        </html>";

        await SendEmailAsync(toEmail, subject, body);
    }

    public async Task SendCampRegistrationEmailAsync(string toEmail, string userName, string campName, DateTime campDate, string campLocation)
    {
        var subject = $"Registration Confirmed - {campName}";
        var body = $@"
        <html>
        <body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
            <div style='max-width: 600px; margin: 0 auto; padding: 20px;'>
                <div style='text-align: center; margin-bottom: 30px;'>
                    <h1 style='color: #1e3c72; margin: 0; font-size: 2.5rem;'>MediCamp Pro</h1>
                </div>
                
                <div style='text-align: center; margin-bottom: 30px;'>
                    <h2 style='color: #155724; margin: 0; font-size: 2rem;'>Registration Confirmed!</h2>
                </div>
                
                <p>Hello {userName},</p>
                <p>Your registration for the medical camp has been confirmed. Here are your camp details:</p>
                
                <div style='background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #1e3c72;'>
                    <h3 style='color: #1e3c72; margin-top: 0;'>📋 Camp Details</h3>
                    <p><strong>Camp Name:</strong> {campName}</p>
                    <p><strong>Date & Time:</strong> {campDate:dddd, MMMM dd, yyyy} at {campDate:hh:mm tt}</p>
                    <p><strong>Location:</strong> {campLocation}</p>
                </div>
                
                <div style='background: #e8f4fd; padding: 15px; border-radius: 8px; border-left: 4px solid #1e3c72; margin: 20px 0;'>
                    <h4 style='color: #1e3c72; margin-top: 0;'>📝 What to Bring:</h4>
                    <ul style='margin: 0; padding-left: 20px;'>
                        <li>Valid government-issued ID</li>
                        <li>Any relevant medical records</li>
                        <li>List of current medications</li>
                        <li>Insurance information (if applicable)</li>
                    </ul>
                </div>
                
                <div style='background: #fff3cd; padding: 15px; border-radius: 8px; border-left: 4px solid #ffc107; margin: 20px 0;'>
                    <h4 style='color: #856404; margin-top: 0;'>⏰ Important Reminders:</h4>
                    <ul style='margin: 0; padding-left: 20px; color: #856404;'>
                        <li>Arrive 15 minutes early for check-in</li>
                        <li>You'll receive updates if there are any changes</li>
                        <li>Contact us if you need to cancel (24 hours notice preferred)</li>
                    </ul>
                </div>
                
                <hr style='border: none; border-top: 1px solid #eee; margin: 30px 0;'>
                
                <p style='color: #7f8c8d; font-size: 14px; text-align: center;'>
                    Thank you for choosing MediCamp Pro. We look forward to serving you!
                </p>
            </div>
        </body>
        </html>";

        await SendEmailAsync(toEmail, subject, body);
    }

    public async Task SendCampUpdateEmailAsync(string toEmail, string userName, string campName, string updateMessage)
    {
        var subject = $"Important Update - {campName}";
        var body = $@"
        <html>
        <body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
            <div style='max-width: 600px; margin: 0 auto; padding: 20px;'>
                <div style='text-align: center; margin-bottom: 30px;'>
                    <h1 style='color: #1e3c72; margin: 0; font-size: 2.5rem;'>MediCamp Pro</h1>
                </div>
                
                <div style='text-align: center; margin-bottom: 30px;'>
                    <h2 style='color: #856404; margin: 0; font-size: 2rem;'>Camp Update</h2>
                </div>
                
                <p>Hello {userName},</p>
                <p>We have an important update regarding your registered medical camp:</p>
                
                <div style='background: #fff3cd; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #ffc107;'>
                    <h3 style='color: #856404; margin-top: 0;'>📢 Update Details</h3>
                    <p><strong>Camp:</strong> {campName}</p>
                    <p><strong>Update:</strong> {updateMessage}</p>
                </div>
                
                <div style='text-align: center; margin: 30px 0;'>
                    <a href='http://localhost:4200/camps' style='background: linear-gradient(135deg, #1e3c72, #2a5298); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;'>
                        View Camp Details
                    </a>
                </div>
                
                <p>If you have any questions or concerns, please don't hesitate to contact our support team.</p>
                
                <hr style='border: none; border-top: 1px solid #eee; margin: 30px 0;'>
                
                <p style='color: #7f8c8d; font-size: 14px; text-align: center;'>
                    This email was sent by MediCamp Pro. We appreciate your understanding.
                </p>
            </div>
        </body>
        </html>";

        await SendEmailAsync(toEmail, subject, body);
    }

    public async Task SendCampCancellationEmailAsync(string toEmail, string userName, string campName, string reason)
    {
        var subject = $"Camp Cancelled - {campName}";
        var body = $@"
        <html>
        <body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
            <div style='max-width: 600px; margin: 0 auto; padding: 20px;'>
                <div style='text-align: center; margin-bottom: 30px;'>
                    <h1 style='color: #1e3c72; margin: 0; font-size: 2.5rem;'>MediCamp Pro</h1>
                </div>
                
                <div style='text-align: center; margin-bottom: 30px;'>
                    <h2 style='color: #721c24; margin: 0; font-size: 2rem;'>Camp Cancelled</h2>
                </div>
                
                <p>Hello {userName},</p>
                <p>We regret to inform you that the following medical camp has been cancelled:</p>
                
                <div style='background: #f8d7da; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #dc3545;'>
                    <h3 style='color: #721c24; margin-top: 0;'>❌ Cancelled Camp</h3>
                    <p><strong>Camp Name:</strong> {campName}</p>
                    <p><strong>Reason:</strong> {reason}</p>
                </div>
                
                <div style='background: #e8f4fd; padding: 15px; border-radius: 8px; border-left: 4px solid #1e3c72; margin: 20px 0;'>
                    <h4 style='color: #1e3c72; margin-top: 0;'>🔄 What's Next?</h4>
                    <ul style='margin: 0; padding-left: 20px;'>
                        <li>Browse other available camps in your area</li>
                        <li>Register for alternative dates</li>
                        <li>Contact support if you need assistance finding alternatives</li>
                    </ul>
                </div>
                
                <div style='text-align: center; margin: 30px 0;'>
                    <a href='http://localhost:4200/camps' style='background: linear-gradient(135deg, #1e3c72, #2a5298); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;'>
                        Find Alternative Camps
                    </a>
                </div>
                
                <p>We sincerely apologize for any inconvenience caused and appreciate your understanding.</p>
                
                <hr style='border: none; border-top: 1px solid #eee; margin: 30px 0;'>
                
                <p style='color: #7f8c8d; font-size: 14px; text-align: center;'>
                    This email was sent by MediCamp Pro. Thank you for your patience.
                </p>
            </div>
        </body>
        </html>";

        await SendEmailAsync(toEmail, subject, body);
    }

    private async Task SendEmailAsync(string toEmail, string subject, string body)
    {
        try
        {
            // Validate email addresses
            if (string.IsNullOrEmpty(toEmail) || string.IsNullOrEmpty(_fromEmail))
            {
                throw new ArgumentException("Email addresses cannot be null or empty");
            }

            Console.WriteLine($"Email Config - Host: {_smtpHost}, Port: {_smtpPort}");
            Console.WriteLine($"From: {_fromEmail}, To: {toEmail}");
            Console.WriteLine($"Username: {_smtpUsername}");

            using var client = new SmtpClient(_smtpHost, _smtpPort);
            client.EnableSsl = true;
            client.UseDefaultCredentials = false;
            client.Credentials = new NetworkCredential(_smtpUsername, _smtpPassword);
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.Timeout = 30000; // 30 seconds

            var message = new MailMessage()
            {
                From = new MailAddress(_fromEmail, "MediCamp Pro"),
                Subject = subject,
                Body = body,
                IsBodyHtml = true
            };
            message.To.Add(new MailAddress(toEmail));

            Console.WriteLine($"Attempting to send email...");
            await client.SendMailAsync(message);
            Console.WriteLine($"✅ Email sent successfully to: {toEmail}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"❌ Email sending failed: {ex.Message}");
            Console.WriteLine($"Exception type: {ex.GetType().Name}");
            if (ex.InnerException != null)
            {
                Console.WriteLine($"Inner exception: {ex.InnerException.Message}");
            }
            throw;
        }
    }
}
// frontend/src/app/features/landing/help.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MedicampLogoComponent } from '../../shared/components/medicamp-logo.component';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatExpansionModule, MedicampLogoComponent],
  template: `
    <div class="landing-container">
      <nav class="landing-navbar">
        <div class="navbar-content">
          <a routerLink="/auth/login" class="navbar-brand">
            <app-medicamp-logo [size]="40"></app-medicamp-logo>
            <h1 class="navbar-title">MediCamp Pro</h1>
          </a>
          <div class="navbar-links">
            <a routerLink="/landing/find-camps" class="navbar-link">Find Camps</a>
            <a routerLink="/landing/about" class="navbar-link">About Us</a>
            <a routerLink="/landing/help" class="navbar-link active">Help</a>
            <a routerLink="/auth/login" class="login-btn">Login</a>
          </div>
        </div>
      </nav>

      <div class="hero-section">
        <div class="hero-content">
          <h1 class="hero-title">Help & Support</h1>
          <p class="hero-subtitle">Get answers to your questions and learn how to use MediCamp Pro</p>
        </div>
      </div>

      <div class="help-section">
        <div class="container">
          <div class="help-grid">
            <div class="help-category">
              <div class="category-icon">
                <mat-icon>help_outline</mat-icon>
              </div>
              <h3>Getting Started</h3>
              <p>Learn the basics of using MediCamp Pro</p>
              <a routerLink="/auth/register" class="category-link">Start Here</a>
            </div>
            <div class="help-category">
              <div class="category-icon">
                <mat-icon>search</mat-icon>
              </div>
              <h3>Finding Camps</h3>
              <p>How to search and filter medical camps</p>
              <a routerLink="/landing/find-camps" class="category-link">Learn More</a>
            </div>
            <div class="help-category">
              <div class="category-icon">
                <mat-icon>event</mat-icon>
              </div>
              <h3>Registration</h3>
              <p>How to register for medical camps</p>
              <a routerLink="/auth/login" class="category-link">Get Started</a>
            </div>
            <div class="help-category">
              <div class="category-icon">
                <mat-icon>account_circle</mat-icon>
              </div>
              <h3>Account Management</h3>
              <p>Manage your profile and settings</p>
              <a routerLink="/auth/login" class="category-link">Login</a>
            </div>
          </div>
        </div>
      </div>

      <div class="faq-section">
        <div class="container">
          <h2 class="section-title">Frequently Asked Questions</h2>
          <mat-accordion class="faq-accordion">
            <mat-expansion-panel>
              <mat-expansion-panel-header>
                <mat-panel-title>How do I register for a medical camp?</mat-panel-title>
              </mat-expansion-panel-header>
              <p>To register for a medical camp, first create an account or log in. Then browse available camps, select the one you want to attend, and click "Register". Fill out the required information and submit your registration.</p>
            </mat-expansion-panel>

            <mat-expansion-panel>
              <mat-expansion-panel-header>
                <mat-panel-title>Are medical camps free?</mat-panel-title>
              </mat-expansion-panel-header>
              <p>Most medical camps offer free or low-cost services. The cost information is displayed on each camp's details page. Some specialized services may have nominal fees.</p>
            </mat-expansion-panel>

            <mat-expansion-panel>
              <mat-expansion-panel-header>
                <mat-panel-title>How do I find camps near me?</mat-panel-title>
              </mat-expansion-panel-header>
              <p>Use the search and filter options on the Find Camps page. You can filter by location, date, medical specialty, and other criteria to find camps that match your needs.</p>
            </mat-expansion-panel>

            <mat-expansion-panel>
              <mat-expansion-panel-header>
                <mat-panel-title>Can I cancel my registration?</mat-panel-title>
              </mat-expansion-panel-header>
              <p>Yes, you can cancel your registration through your account dashboard. Please cancel at least 24 hours before the camp date to allow others to register.</p>
            </mat-expansion-panel>

            <mat-expansion-panel>
              <mat-expansion-panel-header>
                <mat-panel-title>What should I bring to a medical camp?</mat-panel-title>
              </mat-expansion-panel-header>
              <p>Bring a valid ID, any relevant medical records, current medications list, and insurance information if applicable. Specific requirements are listed in each camp's details.</p>
            </mat-expansion-panel>

            <mat-expansion-panel>
              <mat-expansion-panel-header>
                <mat-panel-title>How do I reset my password?</mat-panel-title>
              </mat-expansion-panel-header>
              <p>Click "Forgot Password" on the login page, enter your email address, and follow the instructions sent to your email to reset your password.</p>
            </mat-expansion-panel>

            <mat-expansion-panel>
              <mat-expansion-panel-header>
                <mat-panel-title>Is my personal information secure?</mat-panel-title>
              </mat-expansion-panel-header>
              <p>Yes, we use industry-standard encryption and security measures to protect your personal and medical information. All data is stored securely and never shared with third parties without your consent.</p>
            </mat-expansion-panel>

            <mat-expansion-panel>
              <mat-expansion-panel-header>
                <mat-panel-title>Do I need to pay for medical camp services?</mat-panel-title>
              </mat-expansion-panel-header>
              <p>Most basic medical services at our camps are provided free of charge. Some specialized treatments or diagnostic tests may have minimal fees, which are clearly mentioned in the camp details.</p>
            </mat-expansion-panel>

            <mat-expansion-panel>
              <mat-expansion-panel-header>
                <mat-panel-title>How far in advance can I register for a camp?</mat-panel-title>
              </mat-expansion-panel-header>
              <p>You can register for camps as soon as they are published on our platform, typically 2-4 weeks before the camp date. Early registration is recommended as spots fill up quickly.</p>
            </mat-expansion-panel>

            <mat-expansion-panel>
              <mat-expansion-panel-header>
                <mat-panel-title>What if I miss my registered camp?</mat-panel-title>
              </mat-expansion-panel-header>
              <p>If you miss your registered camp, you can register for the next available camp in your area. We recommend setting reminders and arriving 15 minutes early to avoid missing your appointment.</p>
            </mat-expansion-panel>

            <mat-expansion-panel>
              <mat-expansion-panel-header>
                <mat-panel-title>Can family members register together?</mat-panel-title>
              </mat-expansion-panel-header>
              <p>Yes, you can register multiple family members for the same camp. Each person needs their own registration, but you can do this from a single account by adding family member details.</p>
            </mat-expansion-panel>

            <mat-expansion-panel>
              <mat-expansion-panel-header>
                <mat-panel-title>Are there age restrictions for medical camps?</mat-panel-title>
              </mat-expansion-panel-header>
              <p>Most camps welcome all ages, but some specialized camps may have age restrictions. Check the camp details for specific age requirements. Children under 16 must be accompanied by a parent or guardian.</p>
            </mat-expansion-panel>

            <mat-expansion-panel>
              <mat-expansion-panel-header>
                <mat-panel-title>How do I know if a camp is cancelled?</mat-panel-title>
              </mat-expansion-panel-header>
              <p>You'll receive email and SMS notifications if a camp is cancelled or rescheduled. We also update the status on our platform and recommend checking your account before traveling to the camp location.</p>
            </mat-expansion-panel>
          </mat-accordion>
        </div>
      </div>

      <div class="contact-section">
        <div class="container">
          <h2 class="section-title">Still Need Help?</h2>
          <div class="contact-grid">
            <div class="contact-card">
              <mat-icon>email</mat-icon>
              <h3>Email Support</h3>
              <p>Get help via email</p>
              <a href="mailto:solankitusharramjibhai&#64;gmail.com">solankitusharramjibhai&#64;gmail.com</a>
            </div>
            <div class="contact-card">
              <mat-icon>phone</mat-icon>
              <h3>Phone Support</h3>
              <p>Call us for immediate help</p>
              <a href="tel:+919016846375">+91 9016846375</a>
            </div>

          </div>
        </div>
      </div>

      <div class="social-section">
        <div class="container">
          <h2 class="section-title">Follow Us</h2>
          <div class="social-links">
            <a href="https://www.instagram.com/tushar_solanki_67/" target="_blank" class="social-link instagram">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.646.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="https://x.com/solanki_tushar7" target="_blank" class="social-link twitter">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/tusharkumarsolanki" target="_blank" class="social-link linkedin">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="https://github.com/solankitushar2404" target="_blank" class="social-link github">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div class="cta-section">
        <div class="container">
          <h2>Ready to Get Started?</h2>
          <p>Join MediCamp Pro today and access quality healthcare in your community.</p>
          <div class="cta-buttons">
            <a routerLink="/auth/register" class="btn-primary">
              <mat-icon>person_add</mat-icon>
              Create Account
            </a>
            <a routerLink="/auth/login" class="btn-secondary">
              <mat-icon>login</mat-icon>
              Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .landing-container { min-height: 100vh; background: #f8f9fa; }
    .landing-navbar { background: white; padding: 15px 0; box-shadow: 0 2px 10px rgba(0,0,0,0.1); position: sticky; top: 0; z-index: 100; }
    .navbar-content { max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; padding: 0 20px; }
    .navbar-brand { display: flex; align-items: center; gap: 12px; text-decoration: none; }
    .navbar-title { font-size: 1.6rem; font-weight: 700; color: #2c3e50; margin: 0; }
    .navbar-links { display: flex; gap: 30px; align-items: center; }
    .navbar-link { color: #7f8c8d; text-decoration: none; font-weight: 500; transition: color 0.3s; padding: 8px 0; }
    .navbar-link:hover, .navbar-link.active { color: #1e3c72; border-bottom: 2px solid #1e3c72; }
    .login-btn { background: linear-gradient(135deg, #1e3c72, #2a5298); color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: 600; transition: transform 0.3s; }
    .login-btn:hover { transform: translateY(-2px); }
    .hero-section { background: linear-gradient(135deg, #1e3c72, #2a5298); color: white; padding: 80px 20px; text-align: center; }
    .hero-content { max-width: 800px; margin: 0 auto; }
    .hero-title { font-size: 3rem; font-weight: 700; margin-bottom: 20px; }
    .hero-subtitle { font-size: 1.3rem; opacity: 0.9; }
    .help-section { padding: 80px 20px; background: white; }
    .container { max-width: 1200px; margin: 0 auto; }
    .help-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; }
    .help-category { text-align: center; padding: 30px 20px; background: #f8f9fa; border-radius: 16px; transition: transform 0.3s; }
    .help-category:hover { transform: translateY(-5px); box-shadow: 0 15px 40px rgba(0,0,0,0.1); }
    .category-icon { width: 70px; height: 70px; background: linear-gradient(135deg, #1e3c72, #2a5298); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; }
    .category-icon mat-icon { color: white; font-size: 36px; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; }
    .help-category h3 { font-size: 1.4rem; font-weight: 600; color: #2c3e50; margin-bottom: 10px; }
    .help-category p { color: #7f8c8d; margin-bottom: 20px; }
    .category-link { color: #1e3c72; text-decoration: none; font-weight: 600; }
    .category-link:hover { text-decoration: underline; }
    .faq-section { padding: 80px 20px; background: #f8f9fa; }
    .section-title { text-align: center; font-size: 2.5rem; font-weight: 700; color: #2c3e50; margin-bottom: 60px; }
    .faq-accordion { max-width: 800px; margin: 0 auto; }
    .contact-section { padding: 80px 20px; background: white; }
    .contact-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 40px; }
    .contact-card { text-align: center; padding: 40px 20px; background: #f8f9fa; border-radius: 16px; }
    .contact-card mat-icon { font-size: 48px; color: #1e3c72; margin-bottom: 20px; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; margin-left: auto; margin-right: auto; }
    .contact-card h3 { font-size: 1.4rem; font-weight: 600; color: #2c3e50; margin-bottom: 10px; }
    .contact-card p { color: #7f8c8d; margin-bottom: 20px; }
    .contact-card a { color: #1e3c72; text-decoration: none; font-weight: 600; }
    .contact-card a:hover { text-decoration: underline; }

    .cta-section { background: linear-gradient(135deg, #1e3c72, #2a5298); color: white; padding: 80px 20px; text-align: center; }
    .cta-section h2 { font-size: 2.5rem; font-weight: 700; margin-bottom: 20px; }
    .cta-section p { font-size: 1.2rem; margin-bottom: 40px; opacity: 0.9; }
    .cta-buttons { display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; }
    .btn-primary, .btn-secondary { padding: 16px 32px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 1.1rem; display: inline-flex; align-items: center; gap: 10px; transition: all 0.3s; }
    .btn-primary { background: white; color: #1e3c72; }
    .btn-secondary { background: transparent; color: white; border: 2px solid white; }
    .btn-primary:hover, .btn-secondary:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
    .social-section { padding: 80px 20px; background: #f8f9fa; }
    .social-links { display: flex; gap: 30px; justify-content: center; flex-wrap: wrap; }
    .social-link { display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 15px; background: white; border-radius: 50%; width: 70px; height: 70px; text-decoration: none; color: #1e3c72; transition: all 0.3s; justify-content: center; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
    .social-link:hover { transform: translateY(-5px) scale(1.1); box-shadow: 0 15px 40px rgba(0,0,0,0.2); color: white; }
    .social-link.instagram:hover { background: linear-gradient(135deg, #E4405F, #C13584); }
    .social-link.twitter:hover { background: linear-gradient(135deg, #1DA1F2, #0d8bd9); }
    .social-link.linkedin:hover { background: linear-gradient(135deg, #0077B5, #005885); }
    .social-link.github:hover { background: linear-gradient(135deg, #333, #24292e); }
    .social-link svg { width: 28px; height: 28px; transition: all 0.3s; }
    .social-link span { display: none; }
    @media (max-width: 768px) { .cta-buttons { flex-direction: column; align-items: center; } .social-links { gap: 20px; } }
  `]
})
export class HelpComponent {}
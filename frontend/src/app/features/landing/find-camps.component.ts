// frontend/src/app/features/landing/find-camps.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MedicampLogoComponent } from '../../shared/components/medicamp-logo.component';

@Component({
  selector: 'app-find-camps',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MedicampLogoComponent],
  template: `
    <div class="landing-container">
      <nav class="landing-navbar">
        <div class="navbar-content">
          <a routerLink="/auth/login" class="navbar-brand">
            <app-medicamp-logo [size]="40"></app-medicamp-logo>
            <h1 class="navbar-title">MediCamp Pro</h1>
          </a>
          <div class="navbar-links">
            <a routerLink="/landing/find-camps" class="navbar-link active">Find Camps</a>
            <a routerLink="/landing/about" class="navbar-link">About Us</a>
            <a routerLink="/landing/help" class="navbar-link">Help</a>
            <a routerLink="/auth/login" class="login-btn">Login</a>
          </div>
        </div>
      </nav>

      <div class="hero-section">
        <div class="hero-content">
          <h1 class="hero-title">Find Medical Camps Near You</h1>
          <p class="hero-subtitle">Discover quality healthcare services in your community</p>
          <a routerLink="/auth/register" class="cta-btn">
            <mat-icon>person_add</mat-icon>
            Get Started Today
          </a>
        </div>
      </div>

      <div class="features-section">
        <div class="container">
          <h2 class="section-title">Why Choose MediCamp Pro?</h2>
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon">
                <mat-icon>search</mat-icon>
              </div>
              <h3>Easy Search</h3>
              <p>Find medical camps by location, specialty, and date with our advanced search filters.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">
                <mat-icon>verified</mat-icon>
              </div>
              <h3>Verified Camps</h3>
              <p>All medical camps are verified by healthcare professionals for quality assurance.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">
                <mat-icon>schedule</mat-icon>
              </div>
              <h3>Real-time Updates</h3>
              <p>Get instant notifications about camp schedules, availability, and important updates.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="cta-section">
        <div class="container">
          <h2>Ready to Access Quality Healthcare?</h2>
          <p>Join thousands of patients who trust MediCamp Pro for their healthcare needs.</p>
          <div class="cta-buttons">
            <a routerLink="/auth/register" class="btn-primary">
              <mat-icon>person_add</mat-icon>
              Register Now
            </a>
            <a routerLink="/auth/login" class="btn-secondary">
              <mat-icon>login</mat-icon>
              Login
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
    .hero-section { background: linear-gradient(135deg, #1e3c72, #2a5298); color: white; padding: 100px 20px; text-align: center; }
    .hero-content { max-width: 800px; margin: 0 auto; }
    .hero-title { font-size: 3.5rem; font-weight: 700; margin-bottom: 20px; line-height: 1.2; }
    .hero-subtitle { font-size: 1.3rem; margin-bottom: 40px; opacity: 0.9; }
    .cta-btn { background: white; color: #1e3c72; padding: 16px 32px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 1.1rem; display: inline-flex; align-items: center; gap: 10px; transition: all 0.3s; }
    .cta-btn:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
    .features-section { padding: 80px 20px; background: white; }
    .container { max-width: 1200px; margin: 0 auto; }
    .section-title { text-align: center; font-size: 2.5rem; font-weight: 700; color: #2c3e50; margin-bottom: 60px; }
    .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 40px; }
    .feature-card { text-align: center; padding: 40px 20px; border-radius: 16px; background: #f8f9fa; transition: transform 0.3s; }
    .feature-card:hover { transform: translateY(-5px); box-shadow: 0 15px 40px rgba(0,0,0,0.1); }
    .feature-icon { width: 80px; height: 80px; background: linear-gradient(135deg, #1e3c72, #2a5298); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; }
    .feature-icon mat-icon { color: white; font-size: 40px; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; }
    .feature-card h3 { font-size: 1.5rem; font-weight: 600; color: #2c3e50; margin-bottom: 15px; }
    .feature-card p { color: #7f8c8d; line-height: 1.6; }
    .cta-section { background: linear-gradient(135deg, #1e3c72, #2a5298); color: white; padding: 80px 20px; text-align: center; }
    .cta-section h2 { font-size: 2.5rem; font-weight: 700; margin-bottom: 20px; }
    .cta-section p { font-size: 1.2rem; margin-bottom: 40px; opacity: 0.9; }
    .cta-buttons { display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; }
    .btn-primary, .btn-secondary { padding: 16px 32px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 1.1rem; display: inline-flex; align-items: center; gap: 10px; transition: all 0.3s; }
    .btn-primary { background: white; color: #1e3c72; }
    .btn-secondary { background: transparent; color: white; border: 2px solid white; }
    .btn-primary:hover, .btn-secondary:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
    @media (max-width: 768px) { .hero-title { font-size: 2.5rem; } .navbar-links { gap: 15px; } .cta-buttons { flex-direction: column; align-items: center; } }
  `]
})
export class FindCampsComponent {}
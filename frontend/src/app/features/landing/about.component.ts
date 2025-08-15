// frontend/src/app/features/landing/about.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MedicampLogoComponent } from '../../shared/components/medicamp-logo.component';

@Component({
  selector: 'app-about',
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
            <a routerLink="/landing/find-camps" class="navbar-link">Find Camps</a>
            <a routerLink="/landing/about" class="navbar-link active">About Us</a>
            <a routerLink="/landing/help" class="navbar-link">Help</a>
            <a routerLink="/auth/login" class="login-btn">Login</a>
          </div>
        </div>
      </nav>

      <div class="hero-section">
        <div class="hero-content">
          <h1 class="hero-title">About MediCamp Pro</h1>
          <p class="hero-subtitle">Revolutionizing healthcare accessibility through technology</p>
        </div>
      </div>

      <div class="mission-section">
        <div class="container">
          <div class="mission-content">
            <div class="mission-text">
              <h2>Our Mission</h2>
              <p>At MediCamp Pro, we believe healthcare should be accessible to everyone, everywhere. Our platform connects communities with quality medical services through organized medical camps, making healthcare more convenient and affordable.</p>
              <p>We're committed to bridging the gap between healthcare providers and patients, ensuring that quality medical care reaches every corner of our communities.</p>
            </div>
            <div class="mission-stats">
              <div class="stat">
                <h3>10,000+</h3>
                <p>Patients Served</p>
              </div>
              <div class="stat">
                <h3>500+</h3>
                <p>Medical Camps</p>
              </div>
              <div class="stat">
                <h3>50+</h3>
                <p>Healthcare Partners</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="values-section">
        <div class="container">
          <h2 class="section-title">Our Values</h2>
          <div class="values-grid">
            <div class="value-card">
              <div class="value-icon">
                <mat-icon>favorite</mat-icon>
              </div>
              <h3>Compassion</h3>
              <p>We care deeply about improving lives and making healthcare accessible to all communities.</p>
            </div>
            <div class="value-card">
              <div class="value-icon">
                <mat-icon>security</mat-icon>
              </div>
              <h3>Trust</h3>
              <p>We maintain the highest standards of security and privacy for all patient information.</p>
            </div>
            <div class="value-card">
              <div class="value-icon">
                <mat-icon>lightbulb</mat-icon>
              </div>
              <h3>Innovation</h3>
              <p>We leverage cutting-edge technology to create better healthcare experiences.</p>
            </div>
            <div class="value-card">
              <div class="value-icon">
                <mat-icon>groups</mat-icon>
              </div>
              <h3>Community</h3>
              <p>We believe in the power of community-driven healthcare initiatives.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="team-section">
        <div class="container">
          <h2 class="section-title">Our Impact</h2>
          <div class="impact-grid">
            <div class="impact-item">
              <mat-icon>health_and_safety</mat-icon>
              <h3>Quality Care</h3>
              <p>All medical camps are staffed by certified healthcare professionals with years of experience.</p>
            </div>
            <div class="impact-item">
              <mat-icon>accessibility</mat-icon>
              <h3>Accessibility</h3>
              <p>We bring healthcare services directly to underserved communities and remote areas.</p>
            </div>
            <div class="impact-item">
              <mat-icon>trending_up</mat-icon>
              <h3>Growth</h3>
              <p>Continuously expanding our network to serve more communities across the region.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="cta-section">
        <div class="container">
          <h2>Join Our Mission</h2>
          <p>Be part of the healthcare revolution. Together, we can make quality healthcare accessible to everyone.</p>
          <div class="cta-buttons">
            <a routerLink="/auth/register" class="btn-primary">
              <mat-icon>person_add</mat-icon>
              Get Started
            </a>
            <a routerLink="/landing/help" class="btn-secondary">
              <mat-icon>help</mat-icon>
              Learn More
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
    .mission-section { padding: 80px 20px; background: white; }
    .container { max-width: 1200px; margin: 0 auto; }
    .mission-content { display: grid; grid-template-columns: 2fr 1fr; gap: 60px; align-items: center; }
    .mission-text h2 { font-size: 2.5rem; font-weight: 700; color: #2c3e50; margin-bottom: 30px; }
    .mission-text p { font-size: 1.1rem; line-height: 1.8; color: #7f8c8d; margin-bottom: 20px; }
    .mission-stats { display: flex; flex-direction: column; gap: 30px; }
    .stat { text-align: center; padding: 20px; background: #f8f9fa; border-radius: 12px; }
    .stat h3 { font-size: 2.5rem; font-weight: 700; color: #1e3c72; margin: 0; }
    .stat p { color: #7f8c8d; margin: 5px 0 0 0; }
    .values-section { padding: 80px 20px; background: #f8f9fa; }
    .section-title { text-align: center; font-size: 2.5rem; font-weight: 700; color: #2c3e50; margin-bottom: 60px; }
    .values-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 40px; }
    .value-card { text-align: center; padding: 40px 20px; background: white; border-radius: 16px; transition: transform 0.3s; }
    .value-card:hover { transform: translateY(-5px); box-shadow: 0 15px 40px rgba(0,0,0,0.1); }
    .value-icon { width: 70px; height: 70px; background: linear-gradient(135deg, #1e3c72, #2a5298); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; }
    .value-icon mat-icon { color: white; font-size: 36px; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; }
    .value-card h3 { font-size: 1.4rem; font-weight: 600; color: #2c3e50; margin-bottom: 15px; }
    .value-card p { color: #7f8c8d; line-height: 1.6; }
    .team-section { padding: 80px 20px; background: white; }
    .impact-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px; }
    .impact-item { text-align: center; padding: 30px; }
    .impact-item mat-icon { font-size: 48px; color: #1e3c72; margin-bottom: 20px; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; margin-left: auto; margin-right: auto; }
    .impact-item h3 { font-size: 1.5rem; font-weight: 600; color: #2c3e50; margin-bottom: 15px; }
    .impact-item p { color: #7f8c8d; line-height: 1.6; }
    .cta-section { background: linear-gradient(135deg, #1e3c72, #2a5298); color: white; padding: 80px 20px; text-align: center; }
    .cta-section h2 { font-size: 2.5rem; font-weight: 700; margin-bottom: 20px; }
    .cta-section p { font-size: 1.2rem; margin-bottom: 40px; opacity: 0.9; }
    .cta-buttons { display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; }
    .btn-primary, .btn-secondary { padding: 16px 32px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 1.1rem; display: inline-flex; align-items: center; gap: 10px; transition: all 0.3s; }
    .btn-primary { background: white; color: #1e3c72; }
    .btn-secondary { background: transparent; color: white; border: 2px solid white; }
    .btn-primary:hover, .btn-secondary:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
    @media (max-width: 768px) { .mission-content { grid-template-columns: 1fr; gap: 40px; } .mission-stats { flex-direction: row; justify-content: space-around; } .cta-buttons { flex-direction: column; align-items: center; } }
  `]
})
export class AboutComponent {}
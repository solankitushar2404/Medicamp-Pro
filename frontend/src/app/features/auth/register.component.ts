// frontend/src/app/features/auth/register.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../core/services/auth.service';
import { MedicampLogoComponent } from '../../shared/components/medicamp-logo.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatSnackBarModule,
    MatIconModule,
    MedicampLogoComponent
  ],
  template: `
    <div class="auth-container">
      <nav class="auth-navbar">
        <div class="navbar-content">
          <a href="#" class="navbar-brand">
            <app-medicamp-logo [size]="40"></app-medicamp-logo>
            <h1 class="navbar-title">MediCamp Pro</h1>
          </a>
          <div class="navbar-links">
            <a routerLink="/landing/find-camps" class="navbar-link">Find Camps</a>
            <a routerLink="/landing/about" class="navbar-link">About Us</a>
            <a routerLink="/landing/help" class="navbar-link">Help</a>
          </div>
        </div>
      </nav>
      <div class="auth-split">
        <div class="auth-left">
          <div class="brand-section">
            <div class="logo-container">
              <app-medicamp-logo [size]="80"></app-medicamp-logo>
              <div class="brand-text">
                <h1 class="brand-name">MediCamp Pro</h1>
                <p class="brand-tagline">Healthcare Made Accessible</p>
              </div>
            </div>
            <div class="hero-content">
              <h2 class="hero-title">Join Our Healthcare Community</h2>
              <p class="hero-description">Create your account to access medical camps, book appointments, and manage your healthcare journey with ease.</p>
              <div class="benefits">
                <div class="benefit">
                  <mat-icon>health_and_safety</mat-icon>
                  <span>Free Health Checkups</span>
                </div>
                <div class="benefit">
                  <mat-icon>notifications_active</mat-icon>
                  <span>Camp Notifications</span>
                </div>
                <div class="benefit">
                  <mat-icon>history</mat-icon>
                  <span>Medical History</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="auth-right">
          <div class="auth-form">
            <div class="form-header">
              <h2>Create Account</h2>
              <p class="subtitle">Join thousands of satisfied patients</p>
            </div>
            
            <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
              <div class="form-row">
                <div class="form-group">
                  <label>Full Name</label>
                  <input type="text" formControlName="name" placeholder="Enter your full name">
                  <div class="error" *ngIf="registerForm.get('name')?.hasError('required') && registerForm.get('name')?.touched">
                    Name is required
                  </div>
                </div>
                
                <div class="form-group">
                  <label>Phone Number</label>
                  <input type="tel" formControlName="phone" placeholder="Enter your phone number">
                  <div class="error" *ngIf="registerForm.get('phone')?.hasError('required') && registerForm.get('phone')?.touched">
                    Phone number is required
                  </div>
                </div>
              </div>
              
              <div class="form-group">
                <label>Email Address</label>
                <input type="email" formControlName="email" placeholder="Enter your email">
                <div class="error" *ngIf="registerForm.get('email')?.hasError('required') && registerForm.get('email')?.touched">
                  Email is required
                </div>
                <div class="error" *ngIf="registerForm.get('email')?.hasError('email') && registerForm.get('email')?.touched">
                  Please enter a valid email
                </div>
              </div>
              
              <div class="form-group">
                <label>Password</label>
                <input type="password" formControlName="password" placeholder="Create a secure password">
                <div class="error" *ngIf="registerForm.get('password')?.hasError('required') && registerForm.get('password')?.touched">
                  Password is required
                </div>
                <div class="error" *ngIf="registerForm.get('password')?.hasError('minlength') && registerForm.get('password')?.touched">
                  Password must be at least 6 characters
                </div>
              </div>
              
              <button type="submit" class="auth-btn" [disabled]="!registerForm.valid || loading">
                <mat-icon>person_add</mat-icon>
                {{ loading ? 'Creating Account...' : 'Create Account' }}
              </button>
            </form>
            
            <div class="divider">
              <span>Already have an account?</span>
            </div>
            
            <a routerLink="/auth/login" class="login-btn">
              <mat-icon>login</mat-icon>
              Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background: #f8f9fa;
    }
    
    .auth-navbar {
      background: white;
      padding: 15px 0;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    .navbar-content {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
    }
    
    .navbar-brand {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
    }
    
    .navbar-title {
      font-size: 1.6rem;
      font-weight: 700;
      color: #2c3e50;
      margin: 0;
      letter-spacing: -0.5px;
    }
    
    .navbar-links {
      display: flex;
      gap: 20px;
    }
    
    .navbar-link {
      color: #7f8c8d;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s;
    }
    
    .navbar-link:hover {
      color: #1e3c72;
    }
    
    .auth-split {
      display: flex;
      width: 100%;
      max-width: 1400px;
      margin: 0 auto;
      box-shadow: 0 20px 60px rgba(0,0,0,0.1);
      border-radius: 20px;
      overflow: hidden;
      margin: 20px;
    }
    
    .auth-left {
      flex: 1.2;
      background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      padding: 60px 40px;
    }
    
    .brand-section {
      text-align: center;
      color: white;
      max-width: 500px;
    }
    
    .logo-container {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
      margin-bottom: 40px;
    }
    
    .logo-circle {
      width: 80px;
      height: 80px;
      background: rgba(255,255,255,0.15);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(10px);
      border: 2px solid rgba(255,255,255,0.2);
    }
    
    .logo-icon {
      font-size: 40px;
      color: #81c784;
    }
    
    .brand-text {
      text-align: left;
    }
    
    .brand-name {
      font-size: 2.5rem;
      font-weight: 700;
      margin: 0;
      color: #ffffff;
    }
    
    .brand-tagline {
      font-size: 1.1rem;
      margin: 5px 0 0 0;
      opacity: 0.9;
      font-weight: 300;
    }
    
    .hero-content {
      text-align: left;
    }
    
    .hero-title {
      font-size: 2.2rem;
      font-weight: 600;
      margin-bottom: 20px;
      line-height: 1.2;
    }
    
    .hero-description {
      font-size: 1.1rem;
      line-height: 1.6;
      opacity: 0.9;
      margin-bottom: 40px;
    }
    
    .benefits {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    
    .benefit {
      display: flex;
      align-items: center;
      gap: 15px;
      padding: 15px 20px;
      background: rgba(255,255,255,0.1);
      border-radius: 12px;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.2);
    }
    
    .benefit mat-icon {
      color: #ffffff;
      font-size: 24px;
    }
    
    .benefit span {
      font-weight: 500;
    }
    
    .auth-right {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      background: white;
      padding: 60px 40px;
    }
    
    .auth-form {
      width: 100%;
      max-width: 400px;
    }
    
    .form-header {
      text-align: center;
      margin-bottom: 30px;
    }
    
    .form-header h2 {
      font-size: 2.2rem;
      font-weight: 700;
      margin: 0 0 10px 0;
      color: #2c3e50;
    }
    
    .subtitle {
      color: #7f8c8d;
      font-size: 1rem;
      margin: 0;
    }
    
    .form-row {
      display: flex;
      gap: 15px;
      margin-bottom: 25px;
    }
    
    .form-row .form-group {
      flex: 1;
      margin-bottom: 0;
    }
    
    .form-group {
      margin-bottom: 25px;
    }
    
    .form-group label {
      display: block;
      font-weight: 600;
      margin-bottom: 8px;
      color: #2c3e50;
      font-size: 0.95rem;
    }
    
    .form-group input {
      width: 100%;
      padding: 16px 20px;
      border: 2px solid #e8ecef;
      border-radius: 12px;
      font-size: 16px;
      transition: all 0.3s ease;
      box-sizing: border-box;
      background: #f8f9fa;
    }
    
    .form-group input:focus {
      outline: none;
      border-color: #1e3c72;
      background: white;
      box-shadow: 0 0 0 3px rgba(30,60,114,0.1);
    }
    
    .error {
      color: #e74c3c;
      font-size: 14px;
      margin-top: 8px;
      font-weight: 500;
    }
    
    .auth-btn {
      width: 100%;
      padding: 16px 24px;
      background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
      color: white;
      border: none;
      border-radius: 12px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }
    
    .auth-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(30,60,114,0.3);
    }
    
    .auth-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }
    
    .divider {
      text-align: center;
      margin: 30px 0 20px 0;
      position: relative;
    }
    
    .divider::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 1px;
      background: #e8ecef;
      z-index: 1;
    }
    
    .divider span {
      background: white;
      padding: 0 20px;
      color: #7f8c8d;
      font-size: 14px;
      position: relative;
      z-index: 2;
    }
    
    .login-btn {
      width: 100%;
      padding: 16px 24px;
      background: white;
      color: #1e3c72;
      border: 2px solid #1e3c72;
      border-radius: 12px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      text-decoration: none;
      box-sizing: border-box;
    }
    
    .login-btn:hover {
      background: #1e3c72;
      color: white;
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(30,60,114,0.2);
    }
    
    @media (max-width: 1024px) {
      .auth-split {
        margin: 10px;
        border-radius: 15px;
      }
      
      .auth-left, .auth-right {
        padding: 40px 30px;
      }
    }
    
    @media (max-width: 768px) {
      .auth-container {
        background: white;
      }
      
      .auth-split {
        flex-direction: column;
        margin: 0;
        border-radius: 0;
        box-shadow: none;
      }
      
      .auth-left {
        min-height: 400px;
        padding: 40px 20px;
      }
      
      .logo-container {
        flex-direction: column;
        gap: 15px;
      }
      
      .brand-text {
        text-align: center;
      }
      
      .brand-name {
        font-size: 2rem;
      }
      
      .hero-title {
        font-size: 1.8rem;
      }
      
      .hero-content {
        text-align: center;
      }
      
      .auth-right {
        padding: 30px 20px;
      }
      
      .form-row {
        flex-direction: column;
        gap: 0;
      }
      
      .form-row .form-group {
        margin-bottom: 25px;
      }
    }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.loading = true;
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          this.loading = false;
          this.snackBar.open('Registration successful!', 'Close', { duration: 2000 });
          this.router.navigate(['/camps']);
        },
        error: (error) => {
          this.loading = false;
          this.snackBar.open(error.error?.message || 'Registration failed', 'Close', { duration: 3000 });
        }
      });
    }
  }
}
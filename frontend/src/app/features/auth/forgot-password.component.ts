// frontend/src/app/features/auth/forgot-password.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { MedicampLogoComponent } from '../../shared/components/medicamp-logo.component';

@Component({
  selector: 'app-forgot-password',
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
            <a routerLink="/auth/login" class="navbar-link">Back to Login</a>
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
              <h2 class="hero-title">Forgot Your Password?</h2>
              <p class="hero-description">No worries! Enter your email address and we'll send you a secure OTP to reset your password.</p>
              <div class="features">
                <div class="feature">
                  <mat-icon>security</mat-icon>
                  <span>Secure OTP Verification</span>
                </div>
                <div class="feature">
                  <mat-icon>timer</mat-icon>
                  <span>5-Minute Expiry</span>
                </div>
                <div class="feature">
                  <mat-icon>email</mat-icon>
                  <span>Instant Email Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="auth-right">
          <div class="auth-form">
            <div class="form-header">
              <h2>Reset Password</h2>
              <p class="subtitle">Enter your email to receive OTP</p>
            </div>
            
            <form [formGroup]="forgotForm" (ngSubmit)="onSubmit()">
              <div class="form-group">
                <label>Email Address</label>
                <input type="email" formControlName="email" placeholder="Enter your registered email">
                <div class="error" *ngIf="forgotForm.get('email')?.hasError('required') && forgotForm.get('email')?.touched">
                  Email is required
                </div>
                <div class="error" *ngIf="forgotForm.get('email')?.hasError('email') && forgotForm.get('email')?.touched">
                  Please enter a valid email
                </div>
              </div>
              
              <button type="submit" class="auth-btn" [disabled]="!forgotForm.valid || loading">
                <mat-icon>send</mat-icon>
                {{ loading ? 'Sending OTP...' : 'Send OTP' }}
              </button>
            </form>
            
            <div class="divider">
              <span>Remember your password?</span>
            </div>
            
            <a routerLink="/auth/login" class="login-btn">
              <mat-icon>login</mat-icon>
              Back to Login
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
    
    .navbar-logo {
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, #1e3c72, #2a5298);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .navbar-logo mat-icon {
      color: white;
      font-size: 24px;
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
      max-width: 1200px;
      margin: 40px auto;
      flex: 1;
    }
    
    .auth-left {
      flex: 1.2;
      background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      padding: 60px 40px;
      border-radius: 20px;
      margin-right: 40px;
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
      color: #4fc3f7;
    }
    
    .brand-text {
      text-align: left;
    }
    
    .brand-name {
      font-size: 2.5rem;
      font-weight: 700;
      margin: 0;
      background: linear-gradient(45deg, #4fc3f7, #29b6f6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
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
    
    .features {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    
    .feature {
      display: flex;
      align-items: center;
      gap: 15px;
      padding: 15px 20px;
      background: rgba(255,255,255,0.1);
      border-radius: 12px;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.2);
    }
    
    .feature mat-icon {
      color: #4fc3f7;
      font-size: 24px;
    }
    
    .feature span {
      font-weight: 500;
    }
    
    .auth-right {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 60px 40px;
    }
    
    .auth-form {
      width: 100%;
      max-width: 400px;
      background: white;
      padding: 40px;
      border-radius: 20px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.1);
      box-sizing: border-box;
    }
    
    .form-header {
      text-align: center;
      margin-bottom: 40px;
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
    
    @media (max-width: 768px) {
      .auth-split {
        flex-direction: column;
        margin: 20px;
      }
      
      .auth-left {
        min-height: 400px;
        padding: 40px 20px;
        margin-right: 0;
        margin-bottom: 20px;
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
    }
  `]
})
export class ForgotPasswordComponent {
  forgotForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.forgotForm.valid) {
      this.loading = true;
      this.http.post(`${environment.apiBaseUrl}/password/forgot`, this.forgotForm.value)
        .subscribe({
          next: () => {
            this.loading = false;
            this.snackBar.open('OTP sent to your email!', 'Close', { duration: 3000 });
            this.router.navigate(['/auth/reset-password'], { 
              queryParams: { email: this.forgotForm.value.email } 
            });
          },
          error: () => {
            this.loading = false;
            this.snackBar.open('Error sending OTP', 'Close', { duration: 3000 });
          }
        });
    }
  }
}
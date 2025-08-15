// frontend/src/app/features/auth/reset-password.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { MedicampLogoComponent } from '../../shared/components/medicamp-logo.component';

@Component({
  selector: 'app-reset-password',
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
              <h2 class="hero-title">Reset Your Password</h2>
              <p class="hero-description">Enter the OTP sent to your email and create a new secure password for your account.</p>
              <div class="features">
                <div class="feature">
                  <mat-icon>verified_user</mat-icon>
                  <span>Secure Verification</span>
                </div>
                <div class="feature">
                  <mat-icon>lock_reset</mat-icon>
                  <span>New Password Setup</span>
                </div>
                <div class="feature">
                  <mat-icon>shield</mat-icon>
                  <span>Account Protection</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="auth-right">
          <div class="auth-form">
            <div class="form-header">
              <h2>Enter OTP</h2>
              <p class="subtitle">Check your email for the 6-digit code</p>
            </div>
            
            <form [formGroup]="resetForm" (ngSubmit)="onSubmit()">
              <div class="form-group">
                <label>6-Digit OTP</label>
                <input type="text" formControlName="token" placeholder="Enter OTP" maxlength="6" class="otp-input">
                <div class="error" *ngIf="resetForm.get('token')?.hasError('required') && resetForm.get('token')?.touched">
                  OTP is required
                </div>
                <div class="error" *ngIf="resetForm.get('token')?.hasError('pattern') && resetForm.get('token')?.touched">
                  Please enter a valid 6-digit OTP
                </div>
              </div>
              
              <div class="form-group">
                <label>New Password</label>
                <input type="password" formControlName="newPassword" placeholder="Enter new password">
                <div class="error" *ngIf="resetForm.get('newPassword')?.hasError('required') && resetForm.get('newPassword')?.touched">
                  Password is required
                </div>
                <div class="error" *ngIf="resetForm.get('newPassword')?.hasError('minlength') && resetForm.get('newPassword')?.touched">
                  Password must be at least 6 characters
                </div>
              </div>
              
              <div class="form-group">
                <label>Confirm Password</label>
                <input type="password" formControlName="confirmPassword" placeholder="Confirm new password">
                <div class="error" *ngIf="resetForm.get('confirmPassword')?.hasError('required') && resetForm.get('confirmPassword')?.touched">
                  Please confirm your password
                </div>
                <div class="error" *ngIf="resetForm.hasError('passwordMismatch') && resetForm.get('confirmPassword')?.touched">
                  Passwords do not match
                </div>
              </div>
              
              <button type="submit" class="auth-btn" [disabled]="!resetForm.valid || loading">
                <mat-icon>lock_reset</mat-icon>
                {{ loading ? 'Resetting Password...' : 'Reset Password' }}
              </button>
            </form>
            
            <div class="divider">
              <span>Didn't receive OTP?</span>
            </div>
            
            <a routerLink="/auth/forgot-password" class="resend-btn">
              <mat-icon>refresh</mat-icon>
              Resend OTP
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
    
    .otp-input {
      text-align: center;
      font-size: 24px;
      font-weight: 600;
      letter-spacing: 8px;
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
    
    .resend-btn {
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
    
    .resend-btn:hover {
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
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  loading = false;
  email = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.resetForm = this.fb.group({
      token: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit() {
    this.email = this.route.snapshot.queryParams['email'] || '';
    if (!this.email) {
      this.router.navigate(['/auth/forgot-password']);
    }
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('newPassword');
    const confirmPassword = form.get('confirmPassword');
    return password && confirmPassword && password.value !== confirmPassword.value 
      ? { passwordMismatch: true } : null;
  }

  onSubmit() {
    if (this.resetForm.valid) {
      this.loading = true;
      const resetData = {
        email: this.email,
        token: this.resetForm.value.token,
        newPassword: this.resetForm.value.newPassword
      };

      this.http.post(`${environment.apiBaseUrl}/password/reset`, resetData)
        .subscribe({
          next: () => {
            this.loading = false;
            this.snackBar.open('Password reset successfully!', 'Close', { duration: 3000 });
            this.router.navigate(['/auth/login']);
          },
          error: (error) => {
            this.loading = false;
            this.snackBar.open(error.error?.message || 'Invalid or expired OTP', 'Close', { duration: 3000 });
          }
        });
    }
  }
}
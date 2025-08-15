// frontend/src/app/features/profile/profile.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../core/services/user.service';
import { UploadService } from '../../core/services/upload.service';
import { AuthService } from '../../core/services/auth.service';
import { ImagePreviewComponent } from '../../shared/components/image-preview.component';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatSnackBarModule,
    MatIconModule,
    ImagePreviewComponent
  ],
  template: `
    <div class="profile-container">
      <div class="page-header">
        <mat-icon class="page-icon">person</mat-icon>
        <h1>My Profile</h1>
      </div>
      
      <mat-tab-group>
        <mat-tab label="Profile Information">
          <div class="tab-content">
            <div class="profile-image-section">
              <h3>Profile Picture</h3>
              <div *ngIf="currentUser?.profileImagePath" class="current-image">
                <img [src]="getImageUrl(currentUser?.profileImagePath)" alt="Profile" class="profile-image">
              </div>
              <app-image-preview
                placeholder="Upload profile picture"
                (fileSelected)="onImageSelected($event)">
              </app-image-preview>
            </div>
            
            <form [formGroup]="profileForm" (ngSubmit)="updateProfile()">
              <mat-form-field class="full-width">
                <mat-label>Full Name</mat-label>
                <input matInput formControlName="name" required>
                <mat-error *ngIf="profileForm.get('name')?.hasError('required')">
                  Name is required
                </mat-error>
              </mat-form-field>
              
              <mat-form-field class="full-width">
                <mat-label>Email</mat-label>
                <input matInput type="email" formControlName="email" required>
                <mat-error *ngIf="profileForm.get('email')?.hasError('required')">
                  Email is required
                </mat-error>
                <mat-error *ngIf="profileForm.get('email')?.hasError('email')">
                  Please enter a valid email
                </mat-error>
              </mat-form-field>
              
              <mat-form-field class="full-width">
                <mat-label>Phone</mat-label>
                <input matInput formControlName="phone">
              </mat-form-field>
              
              <button mat-raised-button color="primary" type="submit" 
                      [disabled]="!profileForm.valid || profileLoading">
                {{ profileLoading ? 'Updating...' : 'Update Profile' }}
              </button>
            </form>
          </div>
        </mat-tab>
        
        <mat-tab label="Change Password">
          <div class="tab-content">
            <div class="password-change-container">
              <h3>Secure Password Change</h3>
              <p class="info-text">For your security, we'll send an OTP to your email address to verify the password change.</p>
              
              <div *ngIf="!otpSent" class="step-1">
                <form [formGroup]="passwordForm" (ngSubmit)="requestOtp()">
                  <mat-form-field class="full-width">
                    <mat-label>New Password</mat-label>
                    <input matInput type="password" formControlName="newPassword" required>
                    <mat-error *ngIf="passwordForm.get('newPassword')?.hasError('required')">
                      New password is required
                    </mat-error>
                    <mat-error *ngIf="passwordForm.get('newPassword')?.hasError('minlength')">
                      Password must be at least 6 characters
                    </mat-error>
                  </mat-form-field>
                  
                  <mat-form-field class="full-width">
                    <mat-label>Confirm New Password</mat-label>
                    <input matInput type="password" formControlName="confirmPassword" required>
                    <mat-error *ngIf="passwordForm.get('confirmPassword')?.hasError('required')">
                      Please confirm your password
                    </mat-error>
                    <mat-error *ngIf="passwordForm.get('confirmPassword')?.hasError('mismatch')">
                      Passwords do not match
                    </mat-error>
                  </mat-form-field>
                  
                  <button mat-raised-button color="primary" type="submit" 
                          [disabled]="!passwordForm.valid || passwordLoading">
                    <mat-icon>email</mat-icon>
                    {{ passwordLoading ? 'Sending OTP...' : 'Send OTP to Email' }}
                  </button>
                </form>
              </div>
              
              <div *ngIf="otpSent" class="step-2">
                <div class="otp-sent-info">
                  <mat-icon class="success-icon">mark_email_read</mat-icon>
                  <h4>OTP Sent!</h4>
                  <p>We've sent a 6-digit verification code to <strong>{{ currentUser?.email }}</strong></p>
                  <p class="timer-text">Code expires in: <span class="timer">{{ formatTime(otpTimer) }}</span></p>
                </div>
                
                <form [formGroup]="otpForm" (ngSubmit)="verifyOtpAndChangePassword()">
                  <mat-form-field class="full-width">
                    <mat-label>Enter OTP Code</mat-label>
                    <input matInput formControlName="otp" placeholder="Enter 6-digit code" maxlength="6" required>
                    <mat-error *ngIf="otpForm.get('otp')?.hasError('required')">
                      OTP is required
                    </mat-error>
                    <mat-error *ngIf="otpForm.get('otp')?.hasError('pattern')">
                      Please enter a valid 6-digit code
                    </mat-error>
                  </mat-form-field>
                  
                  <div class="otp-actions">
                    <button mat-raised-button color="primary" type="submit" 
                            [disabled]="!otpForm.valid || passwordLoading">
                      <mat-icon>lock</mat-icon>
                      {{ passwordLoading ? 'Changing Password...' : 'Change Password' }}
                    </button>
                    
                    <button mat-button type="button" (click)="resendOtp()" 
                            [disabled]="passwordLoading || otpTimer > 0">
                      <mat-icon>refresh</mat-icon>
                      {{ otpTimer > 0 ? 'Resend in ' + formatTime(otpTimer) : 'Resend OTP' }}
                    </button>
                    
                    <button mat-button type="button" (click)="cancelPasswordChange()" 
                            [disabled]="passwordLoading">
                      <mat-icon>cancel</mat-icon>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .profile-container {
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
    }
    
    .page-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 30px;
      padding-bottom: 15px;
      border-bottom: 2px solid #1e3c72;
    }
    
    .page-icon {
      font-size: 32px;
      color: #1e3c72;
    }
    
    .page-header h1 {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-weight: 700;
      font-size: 28px;
      color: #2c3e50;
      margin: 0;
      letter-spacing: -0.5px;
    }
    
    .tab-content {
      padding: 20px 0;
    }
    
    .profile-image-section {
      margin-bottom: 30px;
    }
    
    .full-width {
      width: 100%;
      margin-bottom: 16px;
    }
    
    .current-image {
      margin-bottom: 16px;
    }
    
    .profile-image {
      max-width: 150px;
      max-height: 150px;
      border-radius: 50%;
      object-fit: cover;
    }
    
    .password-change-container {
      max-width: 500px;
    }
    
    .info-text {
      color: #666;
      margin-bottom: 20px;
      font-size: 14px;
    }
    
    .otp-sent-info {
      text-align: center;
      padding: 20px;
      background: #e8f5e8;
      border-radius: 8px;
      margin-bottom: 20px;
    }
    
    .success-icon {
      font-size: 48px;
      color: #4caf50;
      margin-bottom: 10px;
    }
    
    .otp-sent-info h4 {
      color: #2e7d32;
      margin: 10px 0;
    }
    
    .timer-text {
      font-size: 14px;
      color: #666;
    }
    
    .timer {
      font-weight: bold;
      color: #f44336;
    }
    
    .otp-actions {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    
    .otp-actions button {
      width: 100%;
    }
  `]
})
export class ProfileComponent implements OnInit, OnDestroy {
  profileForm: FormGroup;
  passwordForm: FormGroup;
  otpForm: FormGroup;
  profileLoading = false;
  passwordLoading = false;
  currentUser: User | null = null;
  otpSent = false;
  otpTimer = 0;
  private otpInterval: any;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private uploadService: UploadService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['']
    });

    this.passwordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });

    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
    });
  }

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    // Get current user from auth service first
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      this.profileForm.patchValue({
        name: this.currentUser.name,
        email: this.currentUser.email,
        phone: this.currentUser.phone || ''
      });
    }
    
    // Then refresh from server
    this.userService.getProfile().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.profileForm.patchValue({
          name: user.name,
          email: user.email,
          phone: user.phone || ''
        });
      },
      error: (error) => {
        console.error('Failed to load profile:', error);
        this.snackBar.open('Failed to load profile data', 'Close', { duration: 3000 });
      }
    });
  }

  updateProfile() {
    if (this.profileForm.valid) {
      this.profileLoading = true;
      this.userService.updateProfile(this.profileForm.value).subscribe({
        next: () => {
          this.profileLoading = false;
          this.snackBar.open('Profile updated successfully!', 'Close', { duration: 3000 });
          this.loadProfile(); // Refresh profile data
        },
        error: (error) => {
          this.profileLoading = false;
          this.snackBar.open(error.error?.message || 'Update failed', 'Close', { duration: 3000 });
        }
      });
    }
  }

  passwordMatchValidator(form: any) {
    const password = form.get('newPassword');
    const confirmPassword = form.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ mismatch: true });
      return { mismatch: true };
    }
    return null;
  }

  requestOtp() {
    if (this.passwordForm.valid) {
      this.passwordLoading = true;
      this.userService.requestPasswordChangeOtp().subscribe({
        next: () => {
          this.passwordLoading = false;
          this.otpSent = true;
          this.startOtpTimer();
          this.snackBar.open('OTP sent to your email!', 'Close', { duration: 3000 });
        },
        error: (error) => {
          this.passwordLoading = false;
          this.snackBar.open(error.error?.message || 'Failed to send OTP', 'Close', { duration: 3000 });
        }
      });
    }
  }

  verifyOtpAndChangePassword() {
    if (this.otpForm.valid && this.passwordForm.valid && this.currentUser) {
      this.passwordLoading = true;
      const request = {
        email: this.currentUser.email,
        otp: this.otpForm.get('otp')?.value,
        newPassword: this.passwordForm.get('newPassword')?.value
      };
      
      this.userService.verifyOtpAndChangePassword(request).subscribe({
        next: () => {
          this.passwordLoading = false;
          this.resetPasswordChangeForm();
          this.snackBar.open('Password changed successfully!', 'Close', { duration: 3000 });
        },
        error: (error) => {
          this.passwordLoading = false;
          this.snackBar.open(error.error?.message || 'Password change failed', 'Close', { duration: 3000 });
        }
      });
    }
  }

  resendOtp() {
    this.requestOtp();
  }

  cancelPasswordChange() {
    this.resetPasswordChangeForm();
  }

  private resetPasswordChangeForm() {
    this.otpSent = false;
    this.otpTimer = 0;
    this.passwordForm.reset();
    this.otpForm.reset();
    if (this.otpInterval) {
      clearInterval(this.otpInterval);
    }
  }

  private startOtpTimer() {
    this.otpTimer = 300; // 5 minutes
    this.otpInterval = setInterval(() => {
      this.otpTimer--;
      if (this.otpTimer <= 0) {
        clearInterval(this.otpInterval);
      }
    }, 1000);
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  onImageSelected(file: File) {
    this.uploadService.uploadUserImage(file).subscribe({
      next: (response) => {
        this.snackBar.open('Profile picture updated!', 'Close', { duration: 3000 });
        this.loadProfile(); // Refresh to show new image
        // Update auth service with new profile image
        if (this.currentUser) {
          this.currentUser.profileImagePath = response.imagePath;
          this.authService.updateCurrentUser(this.currentUser);
        }
      },
      error: (error) => {
        this.snackBar.open('Image upload failed', 'Close', { duration: 3000 });
      }
    });
  }

  getImageUrl(imagePath: string | undefined): string {
    if (!imagePath) return '';
    return `http://localhost:5000${imagePath}`;
  }

  ngOnDestroy() {
    if (this.otpInterval) {
      clearInterval(this.otpInterval);
    }
  }
}
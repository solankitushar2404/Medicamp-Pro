// frontend/src/app/features/camps/camp-registration-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MedicalCamp } from '../../core/models/camp.model';

@Component({
  selector: 'app-camp-registration-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  template: `
    <h2 mat-dialog-title>Register for {{ data.camp.title }}</h2>
    
    <mat-dialog-content>
      <form [formGroup]="registrationForm">
        <mat-form-field class="full-width">
          <mat-label>Age</mat-label>
          <input matInput type="number" formControlName="age" required>
          <mat-error *ngIf="registrationForm.get('age')?.hasError('required')">
            Age is required
          </mat-error>
          <mat-error *ngIf="registrationForm.get('age')?.hasError('min')">
            Age must be at least 1
          </mat-error>
        </mat-form-field>
        
        <mat-form-field class="full-width">
          <mat-label>Gender</mat-label>
          <mat-select formControlName="gender" required>
            <mat-option value="Male">Male</mat-option>
            <mat-option value="Female">Female</mat-option>
            <mat-option value="Other">Other</mat-option>
          </mat-select>
          <mat-error *ngIf="registrationForm.get('gender')?.hasError('required')">
            Gender is required
          </mat-error>
        </mat-form-field>
        
        <mat-form-field class="full-width">
          <mat-label>Phone</mat-label>
          <input matInput formControlName="phone" required>
          <mat-error *ngIf="registrationForm.get('phone')?.hasError('required')">
            Phone is required
          </mat-error>
        </mat-form-field>
        
        <mat-form-field class="full-width">
          <mat-label>Email</mat-label>
          <input matInput type="email" formControlName="email" required>
          <mat-error *ngIf="registrationForm.get('email')?.hasError('required')">
            Email is required
          </mat-error>
          <mat-error *ngIf="registrationForm.get('email')?.hasError('email')">
            Please enter a valid email
          </mat-error>
        </mat-form-field>
        
        <mat-form-field class="full-width">
          <mat-label>Symptoms (Optional)</mat-label>
          <textarea matInput formControlName="symptoms" rows="3"></textarea>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="primary" 
              [disabled]="!registrationForm.valid"
              (click)="onSubmit()">
        Register
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .full-width {
      width: 100%;
      margin-bottom: 16px;
    }
    
    mat-dialog-content {
      min-width: 400px;
    }
  `]
})
export class CampRegistrationDialogComponent {
  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CampRegistrationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { camp: MedicalCamp }
  ) {
    this.registrationForm = this.fb.group({
      age: ['', [Validators.required, Validators.min(1)]],
      gender: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      symptoms: ['']
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const formValue = this.registrationForm.value;
      const registrationData = {
        ...formValue,
        campId: this.data.camp.id
      };
      this.dialogRef.close(registrationData);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
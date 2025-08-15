// frontend/src/app/features/admin/camps/camp-form-dialog.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { CampService } from '../../../core/services/camp.service';
import { MedicalCamp, CampCategory, MedicalSpecialty } from '../../../core/models/camp.model';

@Component({
  selector: 'app-camp-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule
  ],
  template: `
    <h2 mat-dialog-title>{{ data.camp ? 'Edit Camp' : 'Create Camp' }}</h2>
    <mat-dialog-content>
      <form [formGroup]="campForm" class="camp-form">
        <mat-form-field>
          <mat-label>Title</mat-label>
          <input matInput formControlName="title" required>
        </mat-form-field>

        <mat-form-field>
          <mat-label>Description</mat-label>
          <textarea matInput formControlName="description" rows="3" required></textarea>
        </mat-form-field>

        <mat-form-field>
          <mat-label>Date</mat-label>
          <input matInput [matDatepicker]="picker" formControlName="date" required>
          <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
        </mat-form-field>

        <mat-form-field>
          <mat-label>Time</mat-label>
          <input matInput type="time" formControlName="time" required>
        </mat-form-field>

        <mat-form-field>
          <mat-label>Location</mat-label>
          <input matInput formControlName="location" required>
        </mat-form-field>

        <mat-form-field>
          <mat-label>Total Seats</mat-label>
          <input matInput type="number" formControlName="totalSeats" required min="1">
        </mat-form-field>

        <mat-form-field>
          <mat-label>Category</mat-label>
          <mat-select formControlName="categoryId" required>
            <mat-option *ngFor="let category of categories" [value]="category.id">
              {{ category.name }}
            </mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field>
          <mat-label>Specialty</mat-label>
          <mat-select formControlName="specialtyId" required>
            <mat-option *ngFor="let specialty of specialties" [value]="specialty.id">
              {{ specialty.name }}
            </mat-option>
          </mat-select>
        </mat-form-field>

        <div class="image-upload-section">
          <label class="image-upload-label">Banner Image</label>
          <div class="image-upload-container">
            <input type="file" #fileInput (change)="onFileSelected($event)" accept="image/*" style="display: none;">
            <button mat-stroked-button type="button" (click)="fileInput.click()">
              <mat-icon>cloud_upload</mat-icon>
              Choose Image
            </button>
            <span class="file-name" *ngIf="selectedFileName">{{ selectedFileName }}</span>
          </div>
          <div class="image-preview" *ngIf="imagePreview">
            <img [src]="imagePreview" alt="Preview" class="preview-image">
            <button mat-icon-button (click)="removeImage()" class="remove-btn">
              <mat-icon>close</mat-icon>
            </button>
          </div>
        </div>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="primary" (click)="onSave()" [disabled]="!campForm.valid || categories.length === 0 || specialties.length === 0">
        {{ data.camp ? 'Update' : 'Create' }}
      </button>
      <div *ngIf="campForm.invalid" style="font-size: 12px; color: red; margin-top: 8px;">
        Form errors: {{ getFormErrors() }}
      </div>
    </mat-dialog-actions>
  `,
  styles: [`
    .camp-form { display: flex; flex-direction: column; gap: 16px; min-width: 500px; }
    mat-form-field { width: 100%; }
    .image-upload-section { margin-top: 16px; }
    .image-upload-label { font-weight: 500; color: rgba(0,0,0,0.6); font-size: 14px; }
    .image-upload-container { display: flex; align-items: center; gap: 12px; margin-top: 8px; }
    .file-name { color: #666; font-size: 14px; }
    .image-preview { position: relative; margin-top: 12px; }
    .preview-image { max-width: 200px; max-height: 120px; border-radius: 4px; }
    .remove-btn { position: absolute; top: -8px; right: -8px; background: #f44336; color: white; }
  `]
})
export class CampFormDialogComponent implements OnInit {
  campForm: FormGroup;
  categories: CampCategory[] = [];
  specialties: MedicalSpecialty[] = [];
  selectedFile: File | null = null;
  selectedFileName: string = '';
  imagePreview: string | null = null;

  constructor(
    private fb: FormBuilder,
    private campService: CampService,
    private dialogRef: MatDialogRef<CampFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { camp?: MedicalCamp }
  ) {
    this.campForm = this.fb.group({
      title: [data.camp?.title || '', Validators.required],
      description: [data.camp?.description || '', Validators.required],
      date: [data.camp?.date || '', Validators.required],
      time: [data.camp?.time || '', Validators.required],
      location: [data.camp?.location || '', Validators.required],
      totalSeats: [data.camp?.totalSeats || '', [Validators.required, Validators.min(1)]],
      categoryId: [data.camp?.categoryId || '', Validators.required],
      specialtyId: [data.camp?.specialtyId || '', Validators.required]
    });
  }

  ngOnInit() {
    this.loadCategories();
    this.loadSpecialties();
  }

  loadCategories() {
    this.campService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  loadSpecialties() {
    this.campService.getSpecialties().subscribe(specialties => {
      this.specialties = specialties;
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.selectedFileName = file.name;
      
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.selectedFile = null;
    this.selectedFileName = '';
    this.imagePreview = null;
  }

  getFormErrors(): string {
    const errors: string[] = [];
    Object.keys(this.campForm.controls).forEach(key => {
      const control = this.campForm.get(key);
      if (control && control.invalid) {
        errors.push(key);
      }
    });
    return errors.join(', ');
  }

  onSave() {
    if (this.campForm.valid) {
      const formData = new FormData();
      const formValue = this.campForm.value;
      
      Object.keys(formValue).forEach(key => {
        if (formValue[key] !== null && formValue[key] !== '') {
          let value = formValue[key];
          if (key === 'date' && value instanceof Date) {
            value = value.toISOString().split('T')[0];
          }
          formData.append(key, value);
        }
      });

      if (this.selectedFile) {
        formData.append('bannerImage', this.selectedFile);
      }

      this.dialogRef.close(formData);
    }
  }
}
// frontend/src/app/features/admin/specialties/admin-specialties.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CampService } from '../../../core/services/camp.service';
import { MedicalSpecialty } from '../../../core/models/camp.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog.component';

@Component({
  selector: 'app-admin-specialties',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  template: `
    <div class="admin-specialties-container">
      <div class="page-header">
        <mat-icon class="page-icon">medical_services</mat-icon>
        <h1>Manage Specialties</h1>
      </div>
      
      <div class="content-grid">
        <mat-card class="form-card">
          <mat-card-header>
            <mat-card-title>{{ editingSpecialty ? 'Edit Specialty' : 'Add Specialty' }}</mat-card-title>
          </mat-card-header>
          
          <mat-card-content>
            <form [formGroup]="specialtyForm" (ngSubmit)="onSubmit()">
              <mat-form-field class="full-width">
                <mat-label>Name</mat-label>
                <input matInput formControlName="name" required>
              </mat-form-field>
              
              <mat-form-field class="full-width">
                <mat-label>Description</mat-label>
                <textarea matInput formControlName="description" rows="3" required></textarea>
              </mat-form-field>
              
              <div class="form-actions">
                <button mat-raised-button color="primary" type="submit" [disabled]="!specialtyForm.valid">
                  {{ editingSpecialty ? 'Update' : 'Create' }}
                </button>
                <button mat-button type="button" (click)="cancelEdit()" *ngIf="editingSpecialty">
                  Cancel
                </button>
              </div>
            </form>
          </mat-card-content>
        </mat-card>
        
        <mat-card class="list-card">
          <mat-card-header>
            <mat-card-title>Specialties</mat-card-title>
          </mat-card-header>
          
          <mat-card-content>
            <mat-list>
              <mat-list-item *ngFor="let specialty of specialties">
                <div matListItemTitle>{{ specialty.name }}</div>
                <div matListItemLine>{{ specialty.description }}</div>
                <div matListItemMeta>
                  <button mat-icon-button (click)="editSpecialty(specialty)">
                    <mat-icon>edit</mat-icon>
                  </button>
                  <button mat-icon-button color="warn" (click)="deleteSpecialty(specialty)">
                    <mat-icon>delete</mat-icon>
                  </button>
                </div>
              </mat-list-item>
            </mat-list>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .admin-specialties-container {
      padding: 20px;
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
    
    .content-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
    
    .full-width {
      width: 100%;
      margin-bottom: 16px;
    }
    
    .form-actions {
      display: flex;
      gap: 10px;
    }
    
    @media (max-width: 768px) {
      .content-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AdminSpecialtiesComponent implements OnInit {
  specialties: MedicalSpecialty[] = [];
  specialtyForm: FormGroup;
  editingSpecialty: MedicalSpecialty | null = null;

  constructor(
    private fb: FormBuilder,
    private campService: CampService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.specialtyForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadSpecialties();
  }

  loadSpecialties() {
    this.campService.getSpecialties().subscribe(specialties => {
      this.specialties = specialties;
    });
  }

  onSubmit() {
    if (this.specialtyForm.valid) {
      const formValue = this.specialtyForm.value;
      
      if (this.editingSpecialty) {
        this.campService.updateSpecialty(this.editingSpecialty.id, formValue).subscribe({
          next: () => {
            this.snackBar.open('Specialty updated successfully!', 'Close', { duration: 3000 });
            this.loadSpecialties();
            this.cancelEdit();
          },
          error: () => {
            this.snackBar.open('Failed to update specialty', 'Close', { duration: 3000 });
          }
        });
      } else {
        this.campService.createSpecialty(formValue).subscribe({
          next: () => {
            this.snackBar.open('Specialty created successfully!', 'Close', { duration: 3000 });
            this.loadSpecialties();
            this.specialtyForm.reset();
          },
          error: () => {
            this.snackBar.open('Failed to create specialty', 'Close', { duration: 3000 });
          }
        });
      }
    }
  }

  editSpecialty(specialty: MedicalSpecialty) {
    this.editingSpecialty = specialty;
    this.specialtyForm.patchValue({
      name: specialty.name,
      description: specialty.description
    });
  }

  cancelEdit() {
    this.editingSpecialty = null;
    this.specialtyForm.reset();
  }

  deleteSpecialty(specialty: MedicalSpecialty) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Specialty',
        message: `Are you sure you want to delete "${specialty.name}"?`,
        details: 'This action cannot be undone.',
        confirmText: 'Delete',
        cancelText: 'Cancel',
        type: 'warn'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.campService.deleteSpecialty(specialty.id).subscribe({
          next: () => {
            this.snackBar.open('Specialty deleted successfully!', 'Close', { duration: 3000 });
            this.loadSpecialties();
          },
          error: (error) => {
            this.snackBar.open(error.error?.message || 'Failed to delete specialty', 'Close', { duration: 3000 });
          }
        });
      }
    });
  }
}
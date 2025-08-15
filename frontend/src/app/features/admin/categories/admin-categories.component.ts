// frontend/src/app/features/admin/categories/admin-categories.component.ts
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
import { CampCategory } from '../../../core/models/camp.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog.component';

@Component({
  selector: 'app-admin-categories',
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
    <div class="admin-categories-container">
      <div class="page-header">
        <mat-icon class="page-icon">category</mat-icon>
        <h1>Manage Categories</h1>
      </div>
      
      <div class="content-grid">
        <mat-card class="form-card">
          <mat-card-header>
            <mat-card-title>{{ editingCategory ? 'Edit Category' : 'Add Category' }}</mat-card-title>
          </mat-card-header>
          
          <mat-card-content>
            <form [formGroup]="categoryForm" (ngSubmit)="onSubmit()">
              <mat-form-field class="full-width">
                <mat-label>Name</mat-label>
                <input matInput formControlName="name" required>
              </mat-form-field>
              
              <mat-form-field class="full-width">
                <mat-label>Description</mat-label>
                <textarea matInput formControlName="description" rows="3" required></textarea>
              </mat-form-field>
              
              <div class="form-actions">
                <button mat-raised-button color="primary" type="submit" [disabled]="!categoryForm.valid">
                  {{ editingCategory ? 'Update' : 'Create' }}
                </button>
                <button mat-button type="button" (click)="cancelEdit()" *ngIf="editingCategory">
                  Cancel
                </button>
              </div>
            </form>
          </mat-card-content>
        </mat-card>
        
        <mat-card class="list-card">
          <mat-card-header>
            <mat-card-title>Categories</mat-card-title>
          </mat-card-header>
          
          <mat-card-content>
            <mat-list>
              <mat-list-item *ngFor="let category of categories">
                <div matListItemTitle>{{ category.name }}</div>
                <div matListItemLine>{{ category.description }}</div>
                <div matListItemMeta>
                  <button mat-icon-button (click)="editCategory(category)">
                    <mat-icon>edit</mat-icon>
                  </button>
                  <button mat-icon-button color="warn" (click)="deleteCategory(category)">
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
    .admin-categories-container {
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
export class AdminCategoriesComponent implements OnInit {
  categories: CampCategory[] = [];
  categoryForm: FormGroup;
  editingCategory: CampCategory | null = null;

  constructor(
    private fb: FormBuilder,
    private campService: CampService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.campService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      const formValue = this.categoryForm.value;
      
      if (this.editingCategory) {
        this.campService.updateCategory(this.editingCategory.id, formValue).subscribe({
          next: () => {
            this.snackBar.open('Category updated successfully!', 'Close', { duration: 3000 });
            this.loadCategories();
            this.cancelEdit();
          },
          error: () => {
            this.snackBar.open('Failed to update category', 'Close', { duration: 3000 });
          }
        });
      } else {
        this.campService.createCategory(formValue).subscribe({
          next: () => {
            this.snackBar.open('Category created successfully!', 'Close', { duration: 3000 });
            this.loadCategories();
            this.categoryForm.reset();
          },
          error: () => {
            this.snackBar.open('Failed to create category', 'Close', { duration: 3000 });
          }
        });
      }
    }
  }

  editCategory(category: CampCategory) {
    this.editingCategory = category;
    this.categoryForm.patchValue({
      name: category.name,
      description: category.description
    });
  }

  cancelEdit() {
    this.editingCategory = null;
    this.categoryForm.reset();
  }

  deleteCategory(category: CampCategory) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Category',
        message: `Are you sure you want to delete "${category.name}"?`,
        details: 'This action cannot be undone.',
        confirmText: 'Delete',
        cancelText: 'Cancel',
        type: 'warn'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.campService.deleteCategory(category.id).subscribe({
          next: () => {
            this.snackBar.open('Category deleted successfully!', 'Close', { duration: 3000 });
            this.loadCategories();
          },
          error: (error) => {
            this.snackBar.open(error.error?.message || 'Failed to delete category', 'Close', { duration: 3000 });
          }
        });
      }
    });
  }
}
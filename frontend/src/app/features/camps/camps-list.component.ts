// frontend/src/app/features/camps/camps-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { CampService } from '../../core/services/camp.service';
import { RegistrationService } from '../../core/services/registration.service';
import { MedicalCamp, CampCategory, MedicalSpecialty } from '../../core/models/camp.model';
import { CampRegistrationDialogComponent } from './camp-registration-dialog.component';

@Component({
  selector: 'app-camps-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    MatIconModule,
    MatChipsModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  template: `
    <div class="camps-container">
      <div class="page-header">
        <mat-icon class="page-icon">medical_services</mat-icon>
        <h1>Medical Camps</h1>
      </div>
      
      <div class="filters">
        <mat-form-field>
          <mat-label>Search</mat-label>
          <input matInput [formControl]="searchControl" placeholder="Search camps...">
          <mat-icon matSuffix>search</mat-icon>
        </mat-form-field>
        
        <mat-form-field>
          <mat-label>Category</mat-label>
          <mat-select [formControl]="categoryControl">
            <mat-option value="">All Categories</mat-option>
            <mat-option *ngFor="let category of categories" [value]="category.id">
              {{ category.name }}
            </mat-option>
          </mat-select>
        </mat-form-field>
        
        <mat-form-field>
          <mat-label>Specialty</mat-label>
          <mat-select [formControl]="specialtyControl">
            <mat-option value="">All Specialties</mat-option>
            <mat-option *ngFor="let specialty of specialties" [value]="specialty.id">
              {{ specialty.name }}
            </mat-option>
          </mat-select>
        </mat-form-field>
      </div>
      
      <div class="camps-grid" *ngIf="camps.length > 0">
        <mat-card *ngFor="let camp of camps" class="camp-card">
          <mat-card-header>
            <mat-card-title>{{ camp.title }}</mat-card-title>
            <mat-card-subtitle>{{ camp.location }}</mat-card-subtitle>
          </mat-card-header>
          
          <div class="banner-container">
            <img mat-card-image [src]="getImageUrl(camp.bannerImagePath)" [alt]="camp.title" 
                 (error)="onImageError($event)">
          </div>
          
          <mat-card-content>
            <p>{{ camp.description }}</p>
            
            <div class="camp-details">
              <div class="detail-item">
                <mat-icon>event</mat-icon>
                <span>{{ camp.date | date:'mediumDate' }}</span>
              </div>
              <div class="detail-item">
                <mat-icon>schedule</mat-icon>
                <span>{{ formatTime(camp.time) }}</span>
              </div>
              <div class="detail-item">
                <mat-icon>people</mat-icon>
                <span>{{ camp.remainingSeats }}/{{ camp.totalSeats }} seats available</span>
              </div>
            </div>
            
            <div class="camp-tags">
              <mat-chip>{{ camp.categoryName }}</mat-chip>
              <mat-chip>{{ camp.specialtyName }}</mat-chip>
            </div>
          </mat-card-content>
          
          <mat-card-actions>
            <button mat-raised-button 
                    [color]="camp.isRegistered ? 'accent' : 'primary'"
                    [disabled]="camp.remainingSeats <= 0 || camp.isRegistered"
                    (click)="registerForCamp(camp)">
              <mat-icon *ngIf="camp.isRegistered">check_circle</mat-icon>
              {{ getButtonText(camp) }}
            </button>
          </mat-card-actions>
        </mat-card>
      </div>
      
      <div *ngIf="camps.length === 0" class="no-camps">
        <p>No medical camps found.</p>
      </div>
      
      <mat-paginator 
        [length]="totalCount"
        [pageSize]="pageSize"
        [pageSizeOptions]="[5, 10, 25, 100]"
        (page)="onPageChange($event)">
      </mat-paginator>
    </div>
  `,
  styles: [`
    .camps-container {
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
    
    .filters {
      display: flex;
      gap: 16px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }
    
    .filters mat-form-field {
      min-width: 200px;
    }
    
    .camps-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 20px;
      margin-bottom: 20px;
    }
    
    .camp-card {
      height: fit-content;
    }
    
    .camp-details {
      margin: 16px 0;
    }
    
    .detail-item {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
    }
    
    .detail-item mat-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
      color: #666;
    }
    
    .camp-tags {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-top: 16px;
    }
    
    .no-camps {
      text-align: center;
      padding: 40px;
      color: #666;
    }
    
    .banner-container {
      height: 200px;
      overflow: hidden;
      position: relative;
    }
    
    .banner-container img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .debug-info {
      position: absolute;
      top: 5px;
      left: 5px;
      background: rgba(0,0,0,0.7);
      color: white;
      padding: 2px 5px;
      font-size: 10px;
    }
  `]
})
export class CampsListComponent implements OnInit {
  camps: MedicalCamp[] = [];
  categories: CampCategory[] = [];
  specialties: MedicalSpecialty[] = [];
  
  searchControl = new FormControl('');
  categoryControl = new FormControl('');
  specialtyControl = new FormControl('');
  
  currentPage = 1;
  pageSize = 10;
  totalCount = 0;

  constructor(
    private campService: CampService,
    private registrationService: RegistrationService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadCategories();
    this.loadSpecialties();
    this.loadCamps();
    this.setupFilters();
  }

  loadCamps() {
    const search = this.searchControl.value || undefined;
    const categoryId = this.categoryControl.value ? +this.categoryControl.value : undefined;
    const specialtyId = this.specialtyControl.value ? +this.specialtyControl.value : undefined;

    this.campService.getCamps(this.currentPage, this.pageSize, search, categoryId, specialtyId)
      .subscribe(result => {
        this.camps = result.items;
        this.totalCount = result.totalCount;
      });
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

  setupFilters() {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        this.currentPage = 1;
        this.loadCamps();
      });

    this.categoryControl.valueChanges.subscribe(() => {
      this.currentPage = 1;
      this.loadCamps();
    });

    this.specialtyControl.valueChanges.subscribe(() => {
      this.currentPage = 1;
      this.loadCamps();
    });
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadCamps();
  }

  getImageUrl(imagePath: string | undefined): string {
    if (!imagePath) {
      return this.getDefaultImage();
    }
    // Handle both absolute and relative paths
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    return `http://localhost:5000${imagePath.startsWith('/') ? imagePath : '/' + imagePath}`;
  }

  getDefaultImage(): string {
    return 'data:image/svg+xml;base64,' + btoa(`
      <svg width="400" height="200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#1e3c72;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#2a5298;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad)"/>
        <circle cx="200" cy="80" r="25" fill="white" opacity="0.8"/>
        <rect x="190" y="75" width="20" height="4" fill="#dc3545"/>
        <rect x="198" y="67" width="4" height="20" fill="#dc3545"/>
        <text x="50%" y="140" font-family="Arial, sans-serif" font-size="16" fill="white" text-anchor="middle" font-weight="bold">MEDICAL CAMP</text>
        <text x="50%" y="165" font-family="Arial, sans-serif" font-size="12" fill="white" text-anchor="middle" opacity="0.8">No Image Available</text>
      </svg>
    `);
  }

  onImageError(event: any) {
    event.target.src = this.getDefaultImage();
  }

  formatTime(time: string): string {
    if (!time) return '';
    return time.substring(0, 5); // Format HH:MM
  }

  getButtonText(camp: MedicalCamp): string {
    if (camp.isRegistered) return 'Registered';
    if (camp.remainingSeats <= 0) return 'Full';
    return 'Register';
  }

  registerForCamp(camp: MedicalCamp) {
    if (camp.isRegistered) {
      this.snackBar.open('You are already registered for this camp', 'Close', { duration: 3000 });
      return;
    }

    const dialogRef = this.dialog.open(CampRegistrationDialogComponent, {
      width: '500px',
      data: { camp }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.registrationService.registerForCamp(result).subscribe({
          next: () => {
            this.snackBar.open('Registration successful!', 'Close', { duration: 3000 });
            this.loadCamps(); // Refresh to update seat count and registration status
          },
          error: (error) => {
            this.snackBar.open(error.error?.message || 'Registration failed', 'Close', { duration: 3000 });
          }
        });
      }
    });
  }
}
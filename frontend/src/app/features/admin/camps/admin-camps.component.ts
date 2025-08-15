// frontend/src/app/features/admin/camps/admin-camps.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { CampService } from '../../../core/services/camp.service';
import { RegistrationService } from '../../../core/services/registration.service';
import { UploadService } from '../../../core/services/upload.service';
import { MedicalCamp, CampCategory, MedicalSpecialty } from '../../../core/models/camp.model';
import { CampFormDialogComponent } from './camp-form-dialog.component';

@Component({
  selector: 'app-admin-camps',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatPaginatorModule,
    MatTabsModule
  ],
  template: `
    <div class="admin-camps-container">
      <div class="header">
        <div class="page-title">
          <mat-icon class="page-icon">medical_services</mat-icon>
          <h1>Manage Medical Camps</h1>
        </div>
        <button mat-raised-button color="primary" (click)="createCamp()">
          <mat-icon>add</mat-icon>
          Add Camp
        </button>
      </div>
      
      <mat-tab-group>
        <mat-tab label="Card View">
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
                    <span>{{ camp.remainingSeats }}/{{ camp.totalSeats }} seats</span>
                  </div>
                </div>
                
                <div class="camp-tags">
                  <mat-chip>{{ camp.categoryName }}</mat-chip>
                  <mat-chip>{{ camp.specialtyName }}</mat-chip>
                </div>
              </mat-card-content>
              
              <mat-card-actions class="admin-actions">
                <button mat-icon-button (click)="editCamp(camp)" matTooltip="Edit Camp">
                  <mat-icon>edit</mat-icon>
                </button>
                <button mat-icon-button (click)="viewRegistrations(camp)" matTooltip="View Registrations">
                  <mat-icon>people</mat-icon>
                </button>
                <button mat-icon-button (click)="exportPdf(camp)" matTooltip="Export PDF">
                  <mat-icon>picture_as_pdf</mat-icon>
                </button>
                <button mat-icon-button color="warn" (click)="deleteCamp(camp)" matTooltip="Delete Camp">
                  <mat-icon>delete</mat-icon>
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
        </mat-tab>
        
        <mat-tab label="Table View">
          <table mat-table [dataSource]="camps" class="camps-table">
            <ng-container matColumnDef="title">
              <th mat-header-cell *matHeaderCellDef>Title</th>
              <td mat-cell *matCellDef="let camp">{{ camp.title }}</td>
            </ng-container>
            
            <ng-container matColumnDef="date">
              <th mat-header-cell *matHeaderCellDef>Date</th>
              <td mat-cell *matCellDef="let camp">{{ camp.date | date:'mediumDate' }}</td>
            </ng-container>
            
            <ng-container matColumnDef="location">
              <th mat-header-cell *matHeaderCellDef>Location</th>
              <td mat-cell *matCellDef="let camp">{{ camp.location }}</td>
            </ng-container>
            
            <ng-container matColumnDef="seats">
              <th mat-header-cell *matHeaderCellDef>Seats</th>
              <td mat-cell *matCellDef="let camp">{{ camp.remainingSeats }}/{{ camp.totalSeats }}</td>
            </ng-container>
            
            <ng-container matColumnDef="category">
              <th mat-header-cell *matHeaderCellDef>Category</th>
              <td mat-cell *matCellDef="let camp">{{ camp.categoryName }}</td>
            </ng-container>
            
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let camp">
                <button mat-icon-button (click)="editCamp(camp)" matTooltip="Edit">
                  <mat-icon>edit</mat-icon>
                </button>
                <button mat-icon-button (click)="viewRegistrations(camp)" matTooltip="Manage Registrations">
                  <mat-icon>people</mat-icon>
                </button>
                <button mat-icon-button (click)="exportPdf(camp)" matTooltip="Export Report">
                  <mat-icon>picture_as_pdf</mat-icon>
                </button>
                <button mat-icon-button color="warn" (click)="deleteCamp(camp)" matTooltip="Delete">
                  <mat-icon>delete</mat-icon>
                </button>
              </td>
            </ng-container>
            
            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .admin-camps-container {
      padding: 20px;
    }
    
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      padding-bottom: 15px;
      border-bottom: 3px solid #1e3c72;
    }
    
    .page-title {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .page-icon {
      font-size: 32px;
      color: #1e3c72;
    }
    
    .header h1 {
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
      margin: 20px 0;
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
    
    .admin-actions {
      display: flex;
      justify-content: space-around;
      padding: 8px 16px;
    }
    
    .no-camps {
      text-align: center;
      padding: 40px;
      color: #666;
    }
    
    .camps-table {
      width: 100%;
      margin-top: 20px;
    }
  `]
})
export class AdminCampsComponent implements OnInit {
  camps: MedicalCamp[] = [];
  categories: CampCategory[] = [];
  specialties: MedicalSpecialty[] = [];
  displayedColumns = ['title', 'date', 'location', 'seats', 'category', 'actions'];
  
  searchControl = new FormControl('');
  categoryControl = new FormControl('');
  specialtyControl = new FormControl('');
  
  currentPage = 1;
  pageSize = 10;
  totalCount = 0;

  constructor(
    private campService: CampService,
    private registrationService: RegistrationService,
    private uploadService: UploadService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
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
    return time.substring(0, 5);
  }

  createCamp() {
    const dialogRef = this.dialog.open(CampFormDialogComponent, {
      width: '600px',
      data: { camp: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.campService.createCamp(result).subscribe({
          next: () => {
            this.snackBar.open('Camp created successfully!', 'Close', { duration: 3000 });
            this.loadCamps();
          },
          error: (error: any) => {
            this.snackBar.open('Failed to create camp', 'Close', { duration: 3000 });
          }
        });
      }
    });
  }

  editCamp(camp: MedicalCamp) {
    const dialogRef = this.dialog.open(CampFormDialogComponent, {
      width: '600px',
      data: { camp }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.campService.updateCamp(camp.id, result).subscribe({
          next: () => {
            this.snackBar.open('Camp updated successfully!', 'Close', { duration: 3000 });
            this.loadCamps();
          },
          error: (error: any) => {
            this.snackBar.open('Failed to update camp', 'Close', { duration: 3000 });
          }
        });
      }
    });
  }

  deleteCamp(camp: MedicalCamp) {
    if (confirm(`Delete camp: ${camp.title}?`)) {
      this.campService.deleteCamp(camp.id).subscribe({
        next: () => {
          this.snackBar.open('Camp deleted successfully!', 'Close', { duration: 3000 });
          this.loadCamps();
        },
        error: (error: any) => {
          this.snackBar.open('Failed to delete camp', 'Close', { duration: 3000 });
        }
      });
    }
  }

  viewRegistrations(camp: MedicalCamp) {
    this.router.navigate(['/admin/registrations', camp.id]);
  }

  exportPdf(camp: MedicalCamp) {
    this.registrationService.getCampRegistrations(camp.id).subscribe({
      next: (registrations: any[]) => {
        this.generatePdf(registrations, camp);
      },
      error: (error: any) => {
        this.snackBar.open('Failed to export PDF', 'Close', { duration: 3000 });
      }
    });
  }

  private async generatePdf(registrations: any[], camp: MedicalCamp) {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF();
    
    // Header background
    doc.setFillColor(30, 60, 114);
    doc.rect(0, 0, 210, 40, 'F');
    
    // Medical cross icon
    doc.setFillColor(255, 255, 255);
    doc.circle(20, 20, 8, 'F');
    
    // Draw medical cross - perfectly centered
    doc.setFillColor(220, 53, 69); // Red cross
    doc.rect(16, 19, 8, 2, 'F'); // horizontal bar
    doc.rect(19, 16, 2, 8, 'F'); // vertical bar
    
    // Title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.text('MEDICAL CAMP MANAGEMENT SYSTEM', 40, 18);
    doc.setFontSize(14);
    doc.text('Registration Report', 40, 28);
    
    // Camp details box
    doc.setFillColor(248, 249, 250);
    doc.rect(15, 50, 180, 35, 'F');
    doc.setDrawColor(30, 60, 114);
    doc.rect(15, 50, 180, 35, 'S');
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.text(camp.title, 20, 60);
    doc.setFontSize(9);
    doc.text(`Date: ${new Date(camp.date).toLocaleDateString()}`, 20, 68);
    doc.text(`Time: ${camp.time}`, 20, 74);
    doc.text(`Location: ${camp.location}`, 20, 80);
    doc.text(`Category: ${camp.categoryName} | Specialty: ${camp.specialtyName}`, 110, 68);
    doc.text(`Total Seats: ${camp.totalSeats} | Remaining: ${camp.remainingSeats}`, 110, 74);
    doc.text(`Generated: ${new Date().toLocaleDateString('en-US', { 
      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' 
    })}`, 110, 80);
    
    // Table header
    let y = 100;
    doc.setFillColor(30, 60, 114);
    doc.rect(15, y - 5, 180, 12, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.text('No', 18, y);
    doc.text('Name', 35, y);
    doc.text('Age', 75, y);
    doc.text('Gender', 90, y);
    doc.text('Phone', 110, y);
    doc.text('Email', 140, y);
    doc.text('Symptoms', 170, y);
    
    // Table data
    y += 15;
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(8);
    
    registrations.forEach((reg, index) => {
      if (y > 270) {
        doc.addPage();
        y = 30;
        // Repeat header on new page
        doc.setFillColor(30, 60, 114);
        doc.rect(15, y - 5, 180, 12, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(9);
        doc.text('No', 18, y);
        doc.text('Name', 35, y);
        doc.text('Age', 75, y);
        doc.text('Gender', 90, y);
        doc.text('Phone', 110, y);
        doc.text('Email', 140, y);
        doc.text('Symptoms', 170, y);
        y += 15;
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(8);
      }
      
      // Alternate row colors
      if (index % 2 === 0) {
        doc.setFillColor(250, 250, 250);
        doc.rect(15, y - 4, 180, 8, 'F');
      }
      
      doc.text((index + 1).toString(), 18, y);
      doc.text((reg.userName || 'N/A').substring(0, 15), 35, y);
      doc.text(reg.age?.toString() || 'N/A', 75, y);
      doc.text((reg.gender || 'N/A').substring(0, 6), 90, y);
      doc.text((reg.phone || 'N/A').substring(0, 12), 110, y);
      doc.text((reg.email || 'N/A').substring(0, 18), 140, y);
      doc.text((reg.symptoms || 'None').substring(0, 15), 170, y);
      y += 8;
    });
    
    // Summary box
    y += 10;
    doc.setFillColor(30, 60, 114);
    doc.rect(15, y, 180, 15, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.text(`Total Registrations: ${registrations.length}`, 20, y + 10);
    
    // Footer
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setTextColor(128, 128, 128);
      doc.setFontSize(8);
      doc.text(`Page ${i} of ${pageCount}`, 180, 285);
      doc.text('Medical Camp Management System', 20, 285);
    }
    
    // Save PDF
    doc.save(`${camp.title.replace(/[^a-zA-Z0-9]/g, '_')}-registrations.pdf`);
    this.snackBar.open('PDF downloaded successfully!', 'Close', { duration: 3000 });
  }
}
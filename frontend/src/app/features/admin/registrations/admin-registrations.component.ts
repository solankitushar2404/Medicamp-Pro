// frontend/src/app/features/admin/registrations/admin-registrations.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RegistrationService } from '../../../core/services/registration.service';
import { CampService } from '../../../core/services/camp.service';
import { CampRegistration } from '../../../core/models/registration.model';
import { MedicalCamp } from '../../../core/models/camp.model';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog.component';

@Component({
  selector: 'app-admin-registrations',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  template: `
    <div class="registrations-container">
      <div class="page-header">
        <mat-icon class="page-icon">assignment</mat-icon>
        <h1>Camp Registrations</h1>
      </div>
      
      <mat-card *ngIf="camp">
        <mat-card-header>
          <mat-card-title>{{ camp.title }} - Registrations</mat-card-title>
          <mat-card-subtitle>{{ camp.location }} | {{ camp.date | date:'mediumDate' }}</mat-card-subtitle>
        </mat-card-header>
        
        <mat-card-actions>
          <button mat-raised-button color="primary" (click)="exportPdf()">
            <mat-icon>picture_as_pdf</mat-icon>
            Export Report
          </button>
        </mat-card-actions>
      </mat-card>
      
      <table mat-table [dataSource]="registrations" class="registrations-table">
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Name</th>
          <td mat-cell *matCellDef="let registration">{{ registration.userName }}</td>
        </ng-container>
        
        <ng-container matColumnDef="age">
          <th mat-header-cell *matHeaderCellDef>Age</th>
          <td mat-cell *matCellDef="let registration">{{ registration.age }}</td>
        </ng-container>
        
        <ng-container matColumnDef="gender">
          <th mat-header-cell *matHeaderCellDef>Gender</th>
          <td mat-cell *matCellDef="let registration">{{ registration.gender }}</td>
        </ng-container>
        
        <ng-container matColumnDef="phone">
          <th mat-header-cell *matHeaderCellDef>Phone</th>
          <td mat-cell *matCellDef="let registration">{{ registration.phone }}</td>
        </ng-container>
        
        <ng-container matColumnDef="email">
          <th mat-header-cell *matHeaderCellDef>Email</th>
          <td mat-cell *matCellDef="let registration">{{ registration.email }}</td>
        </ng-container>
        
        <ng-container matColumnDef="symptoms">
          <th mat-header-cell *matHeaderCellDef>Symptoms</th>
          <td mat-cell *matCellDef="let registration">{{ registration.symptoms || 'N/A' }}</td>
        </ng-container>
        
        <ng-container matColumnDef="registeredAt">
          <th mat-header-cell *matHeaderCellDef>Registered At</th>
          <td mat-cell *matCellDef="let registration">{{ registration.registeredAt | date:'medium' }}</td>
        </ng-container>
        
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Actions</th>
          <td mat-cell *matCellDef="let registration">
            <button mat-icon-button color="warn" (click)="removeRegistration(registration)" matTooltip="Remove Registration">
              <mat-icon>delete</mat-icon>
            </button>
          </td>
        </ng-container>
        
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
      
      <div *ngIf="registrations.length === 0" class="no-registrations">
        <p>No registrations found for this camp.</p>
      </div>
    </div>
  `,
  styles: [`
    .registrations-container {
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
    
    .registrations-table {
      width: 100%;
      margin-top: 20px;
    }
    
    .no-registrations {
      text-align: center;
      padding: 40px;
      color: #666;
    }
  `]
})
export class AdminRegistrationsComponent implements OnInit {
  registrations: CampRegistration[] = [];
  camp: MedicalCamp | null = null;
  campId: number = 0;
  displayedColumns = ['name', 'age', 'gender', 'phone', 'email', 'symptoms', 'registeredAt', 'actions'];

  constructor(
    private route: ActivatedRoute,
    private registrationService: RegistrationService,
    private campService: CampService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.campId = +params['campId'];
      this.loadCamp();
      this.loadRegistrations();
    });
  }

  loadCamp() {
    this.campService.getCamp(this.campId).subscribe(camp => {
      this.camp = camp;
    });
  }

  loadRegistrations() {
    this.registrationService.getCampRegistrations(this.campId).subscribe(registrations => {
      this.registrations = registrations;
    });
  }

  removeRegistration(registration: CampRegistration) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Remove Registration',
        message: `Are you sure you want to remove the registration for ${registration.userName}?`,
        details: 'This action will free up 1 seat in the camp and cannot be undone.',
        confirmText: 'Remove',
        cancelText: 'Cancel',
        type: 'warn'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.registrationService.removeRegistration(registration.id).subscribe({
          next: () => {
            this.snackBar.open('Registration removed successfully!', 'Close', { duration: 3000 });
            this.loadRegistrations();
            this.loadCamp();
          },
          error: (error) => {
            const message = error.error?.message || `Failed to remove registration`;
            this.snackBar.open(message, 'Close', { duration: 3000 });
          }
        });
      }
    });
  }

  exportPdf() {
    this.registrationService.exportCampRegistrationsPdf(this.campId).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${this.camp?.title || 'camp'}-registrations.html`;
        a.click();
        window.URL.revokeObjectURL(url);
        this.snackBar.open('Report exported successfully!', 'Close', { duration: 3000 });
      },
      error: (error) => {
        this.snackBar.open('Failed to export report', 'Close', { duration: 3000 });
      }
    });
  }
}
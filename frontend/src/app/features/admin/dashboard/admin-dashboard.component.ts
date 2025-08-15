// frontend/src/app/features/admin/dashboard/admin-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CampService } from '../../../core/services/camp.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, RouterModule],
  template: `
    <div class="dashboard-container">
      <div class="page-header">
        <mat-icon class="page-icon">dashboard</mat-icon>
        <h1>Admin Dashboard</h1>
      </div>
      
      <div class="stats-grid">
        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <mat-icon class="stat-icon">medical_services</mat-icon>
              <div class="stat-info">
                <h2>{{ totalCamps }}</h2>
                <p>Total Camps</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
        
        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <mat-icon class="stat-icon">category</mat-icon>
              <div class="stat-info">
                <h2>{{ totalCategories }}</h2>
                <p>Categories</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
        
        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <mat-icon class="stat-icon">medical_services</mat-icon>
              <div class="stat-info">
                <h2>{{ totalSpecialties }}</h2>
                <p>Specialties</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
      
      <div class="quick-actions">
        <div class="section-header">
          <mat-icon class="section-icon">flash_on</mat-icon>
          <h2>Quick Actions</h2>
        </div>
        <div class="actions-grid">
          <mat-card class="action-card" routerLink="/admin/camps">
            <mat-card-content>
              <mat-icon>medical_services</mat-icon>
              <h3>Manage Camps</h3>
              <p>Create, edit, and delete medical camps</p>
            </mat-card-content>
          </mat-card>
          
          <mat-card class="action-card" routerLink="/admin/categories">
            <mat-card-content>
              <mat-icon>category</mat-icon>
              <h3>Manage Categories</h3>
              <p>Organize camps by categories</p>
            </mat-card-content>
          </mat-card>
          
          <mat-card class="action-card" routerLink="/admin/specialties">
            <mat-card-content>
              <mat-icon>medical_services</mat-icon>
              <h3>Manage Specialties</h3>
              <p>Manage medical specialties</p>
            </mat-card-content>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
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
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 40px;
    }
    
    .stat-card {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
    
    .stat-content {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    
    .stat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
    }
    
    .stat-info h2 {
      margin: 0;
      font-size: 2rem;
    }
    
    .stat-info p {
      margin: 0;
      opacity: 0.8;
    }
    
    .actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
    }
    
    .action-card {
      cursor: pointer;
      transition: transform 0.2s;
    }
    
    .action-card:hover {
      transform: translateY(-2px);
    }
    
    .action-card mat-card-content {
      text-align: center;
      padding: 30px;
    }
    
    .section-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 20px;
    }
    
    .section-icon {
      font-size: 24px;
      color: #1e3c72;
    }
    
    .section-header h2 {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-weight: 600;
      font-size: 20px;
      color: #2c3e50;
      margin: 0;
    }
    
    .action-card mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      color: #1e3c72;
      margin-bottom: 16px;
    }
  `]
})
export class AdminDashboardComponent implements OnInit {
  totalCamps = 0;
  totalCategories = 0;
  totalSpecialties = 0;

  constructor(private campService: CampService) {}

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.campService.getCamps(1, 1).subscribe(result => {
      this.totalCamps = result.totalCount;
    });

    this.campService.getCategories().subscribe(categories => {
      this.totalCategories = categories.length;
    });

    this.campService.getSpecialties().subscribe(specialties => {
      this.totalSpecialties = specialties.length;
    });
  }
}
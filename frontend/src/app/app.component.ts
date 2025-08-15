// frontend/src/app/app.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, RouterModule } from '@angular/router';
import { UserService } from './core/services/user.service';
import { MatSidenav } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from './core/services/auth.service';
import { User } from './core/models/user.model';
import { MedicampLogoComponent } from './shared/components/medicamp-logo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MedicampLogoComponent
  ],
  template: `
    <div class="app-container">
      <mat-toolbar color="primary" *ngIf="currentUser">
        <button mat-icon-button (click)="drawer.toggle()">
          <mat-icon>menu</mat-icon>
        </button>
        
        <div class="app-title">
          <app-medicamp-logo [size]="32"></app-medicamp-logo>
          <span>MediCamp Pro</span>
        </div>
        
        <span class="spacer"></span>
        
        <div class="user-profile">
          <span class="user-name">{{ currentUser.name }}</span>
          <button mat-icon-button [matMenuTriggerFor]="userMenu" class="profile-btn">
            <img *ngIf="currentUser.profileImagePath" 
                 [src]="getImageUrl(currentUser.profileImagePath)" 
                 alt="Profile" class="profile-avatar">
            <mat-icon *ngIf="!currentUser.profileImagePath" class="default-avatar">account_circle</mat-icon>
          </button>
          
          <mat-menu #userMenu="matMenu" class="user-dropdown">
            <button mat-menu-item routerLink="/profile">
              <mat-icon>person</mat-icon>
              View Profile
            </button>
            <button mat-menu-item routerLink="/admin/users" *ngIf="isAdmin">
              <mat-icon>people</mat-icon>
              Manage Users
            </button>
            <mat-divider *ngIf="isAdmin"></mat-divider>
            <button mat-menu-item (click)="logout()">
              <mat-icon>logout</mat-icon>
              Logout
            </button>
          </mat-menu>
        </div>
      </mat-toolbar>

      <mat-sidenav-container class="sidenav-container" *ngIf="currentUser">
        <mat-sidenav #drawer mode="over" class="sidebar">
          <div class="sidebar-header">
            <div class="sidebar-title">
              <app-medicamp-logo [size]="24"></app-medicamp-logo>
              <h3>Dashboard</h3>
            </div>
          </div>
          <mat-nav-list>
            <div *ngIf="!isAdmin">
              <a mat-list-item routerLink="/camps" routerLinkActive="active" (click)="closeDrawer()">
                <mat-icon matListItemIcon>medical_services</mat-icon>
                <span matListItemTitle>Medical Camps</span>
              </a>
              <a mat-list-item routerLink="/profile" routerLinkActive="active" (click)="closeDrawer()">
                <mat-icon matListItemIcon>person</mat-icon>
                <span matListItemTitle>My Profile</span>
              </a>
            </div>
            <div *ngIf="isAdmin">
              <a mat-list-item routerLink="/admin" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="closeDrawer()">
                <mat-icon matListItemIcon>dashboard</mat-icon>
                <span matListItemTitle>Dashboard</span>
              </a>
              <a mat-list-item routerLink="/admin/camps" routerLinkActive="active" (click)="closeDrawer()">
                <mat-icon matListItemIcon>medical_services</mat-icon>
                <span matListItemTitle>Manage Camps</span>
              </a>
              <a mat-list-item routerLink="/admin/categories" routerLinkActive="active" (click)="closeDrawer()">
                <mat-icon matListItemIcon>category</mat-icon>
                <span matListItemTitle>Categories</span>
              </a>
              <a mat-list-item routerLink="/admin/specialties" routerLinkActive="active" (click)="closeDrawer()">
                <mat-icon matListItemIcon>medical_services</mat-icon>
                <span matListItemTitle>Specialties</span>
              </a>
              <a mat-list-item routerLink="/admin/users" routerLinkActive="active" (click)="closeDrawer()">
                <mat-icon matListItemIcon>people</mat-icon>
                <span matListItemTitle>Manage Users</span>
              </a>
              <mat-divider></mat-divider>
              <a mat-list-item routerLink="/profile" routerLinkActive="active" (click)="closeDrawer()">
                <mat-icon matListItemIcon>person</mat-icon>
                <span matListItemTitle>Profile</span>
              </a>
            </div>
          </mat-nav-list>
        </mat-sidenav>

        <mat-sidenav-content>
          <router-outlet></router-outlet>
        </mat-sidenav-content>
      </mat-sidenav-container>

      <div class="main-content" *ngIf="!currentUser">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .app-container {
      height: 100vh;
      display: flex;
      flex-direction: column;
    }
    
    mat-toolbar {
      background: linear-gradient(135deg, #1e3c72, #2a5298) !important;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      z-index: 1000;
    }
    
    .app-title {
      display: flex;
      align-items: center;
      gap: 12px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-weight: 600;
      font-size: 20px;
      color: white;
    }
    
    .app-title app-medicamp-logo {
      flex-shrink: 0;
      display: flex;
      align-items: center;
    }
    
    .spacer {
      flex: 1 1 auto;
    }
    
    .user-profile {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .user-name {
      color: white;
      font-weight: 500;
      font-size: 14px;
    }
    
    .profile-btn {
      padding: 4px;
    }
    
    .profile-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid rgba(255,255,255,0.3);
    }
    
    .default-avatar {
      font-size: 36px;
      color: rgba(255,255,255,0.8);
    }
    
    .sidenav-container {
      flex: 1;
    }
    
    mat-sidenav {
      width: 280px;
      background: #f8f9fa;
      border-right: 1px solid #e9ecef;
      transition: all 0.3s ease;
    }
    
    .sidebar-header {
      padding: 20px 16px;
      background: linear-gradient(135deg, #1e3c72, #2a5298);
      color: white;
      border-bottom: 1px solid #e9ecef;
    }
    
    .sidebar-title {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .sidebar-title app-medicamp-logo {
      margin-right: 10px;
    }
    
    .sidebar-header h3 {
      margin: 0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-size: 16px;
      font-weight: 600;
      color: white;
    }
    
    mat-nav-list {
      padding-top: 0;
    }
    
    .mat-mdc-list-item {
      height: 48px !important;
      margin: 4px 8px;
      border-radius: 8px;
      transition: all 0.2s ease;
    }
    
    .mat-mdc-list-item:hover {
      background-color: rgba(30, 60, 114, 0.08);
    }
    
    .mat-mdc-list-item.active {
      background-color: rgba(30, 60, 114, 0.12) !important;
      border-left: 4px solid #1e3c72;
      color: #1e3c72;
    }
    
    .mat-mdc-list-item.active mat-icon {
      color: #1e3c72;
    }
    
    .main-content {
      flex: 1;
      padding: 20px;
    }
    
    @media (max-width: 768px) {
      .user-name {
        display: none;
      }
      
      mat-sidenav {
        width: 240px;
      }
    }
  `]
})
export class AppComponent implements OnInit {
  @ViewChild('drawer') drawer!: MatSidenav;
  currentUser: User | null = null;
  isAdmin = false;
  private hasCheckedProfile = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.isAdmin = user?.role === 'Admin';
      if (user && this.authService.getToken() && !this.hasCheckedProfile) {
        this.hasCheckedProfile = true;
        this.userService.getProfile().subscribe({
          next: (profile) => {
            this.authService.updateCurrentUser(profile);
          },
          error: (error) => {
            console.error('Failed to fetch user profile:', error);
            // If token is invalid or backend is down, logout
            if (error.status === 401 || error.status === 0) {
              this.authService.logout();
              this.router.navigate(['/auth/login']);
            }
          }
        });
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  closeDrawer() {
    this.drawer.close();
  }

  getImageUrl(imagePath: string | undefined): string {
    if (!imagePath) return '';
    return `http://localhost:5000${imagePath}`;
  }


}
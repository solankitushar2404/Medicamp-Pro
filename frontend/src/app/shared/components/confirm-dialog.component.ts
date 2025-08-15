import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface ConfirmDialogData {
  title: string;
  message: string;
  details?: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'primary' | 'warn' | 'accent';
}

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="confirm-dialog">
      <div class="dialog-header" [ngClass]="data.type || 'primary'">
        <mat-icon class="dialog-icon">
          {{ getIcon() }}
        </mat-icon>
        <h2 mat-dialog-title>{{ data.title }}</h2>
      </div>
      
      <mat-dialog-content class="dialog-content">
        <p class="message">{{ data.message }}</p>
        <p class="details" *ngIf="data.details">{{ data.details }}</p>
      </mat-dialog-content>
      
      <mat-dialog-actions class="dialog-actions">
        <button mat-button (click)="onCancel()">
          {{ data.cancelText || 'Cancel' }}
        </button>
        <button mat-raised-button 
                [color]="data.type === 'warn' ? 'warn' : 'primary'"
                (click)="onConfirm()">
          {{ data.confirmText || 'Confirm' }}
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .confirm-dialog {
      min-width: 350px;
    }
    
    .dialog-header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 20px 24px 16px;
      border-bottom: 1px solid #e0e0e0;
    }
    
    .dialog-icon {
      font-size: 28px;
      width: 28px;
      height: 28px;
    }
    
    .primary .dialog-icon {
      color: #1e3c72;
    }
    
    .warn .dialog-icon {
      color: #f44336;
    }
    
    .accent .dialog-icon {
      color: #ff9800;
    }
    
    h2[mat-dialog-title] {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-weight: 600;
      font-size: 18px;
      color: #2c3e50;
      margin: 0;
    }
    
    .dialog-content {
      padding: 20px 24px;
    }
    
    .message {
      font-size: 16px;
      color: #333;
      margin: 0 0 12px 0;
      line-height: 1.4;
    }
    
    .details {
      font-size: 14px;
      color: #666;
      margin: 0;
      line-height: 1.3;
    }
    
    .dialog-actions {
      padding: 16px 24px 20px;
      justify-content: flex-end;
      gap: 12px;
    }
    
    .dialog-actions button {
      min-width: 80px;
    }
  `]
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {}

  getIcon(): string {
    switch (this.data.type) {
      case 'warn':
        return 'warning';
      case 'accent':
        return 'info';
      default:
        return 'help_outline';
    }
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
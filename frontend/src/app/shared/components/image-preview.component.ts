// frontend/src/app/shared/components/image-preview.component.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-image-preview',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  template: `
    <div class="image-upload-container">
      <input #fileInput type="file" accept="image/*" (change)="onFileSelected($event)" hidden>
      
      <div *ngIf="!imagePreview" class="upload-placeholder" (click)="fileInput.click()">
        <mat-icon>cloud_upload</mat-icon>
        <p>{{ placeholder }}</p>
      </div>
      
      <div *ngIf="imagePreview" class="image-preview-container">
        <img [src]="imagePreview" [alt]="altText" class="image-preview">
        <div class="image-actions">
          <button mat-icon-button (click)="fileInput.click()" matTooltip="Change Image">
            <mat-icon>edit</mat-icon>
          </button>
          <button mat-icon-button color="warn" (click)="removeImage()" matTooltip="Remove Image">
            <mat-icon>delete</mat-icon>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .image-upload-container {
      border: 2px dashed #ccc;
      border-radius: 8px;
      padding: 20px;
      text-align: center;
      cursor: pointer;
      transition: border-color 0.3s;
    }
    
    .image-upload-container:hover {
      border-color: #3f51b5;
    }
    
    .upload-placeholder mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      color: #666;
    }
    
    .image-preview-container {
      position: relative;
    }
    
    .image-preview {
      max-width: 100%;
      max-height: 200px;
      border-radius: 8px;
    }
    
    .image-actions {
      margin-top: 10px;
    }
  `]
})
export class ImagePreviewComponent implements OnInit {
  @Input() placeholder = 'Click to upload image';
  @Input() altText = 'Preview';
  @Input() existingImageUrl: string | null = null;
  @Output() fileSelected = new EventEmitter<File>();
  @Output() fileRemoved = new EventEmitter<void>();

  imagePreview: string | null = null;

  ngOnInit() {
    if (this.existingImageUrl) {
      this.imagePreview = this.existingImageUrl;
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
      this.fileSelected.emit(file);
    }
  }

  removeImage() {
    this.imagePreview = null;
    this.fileRemoved.emit();
  }
}
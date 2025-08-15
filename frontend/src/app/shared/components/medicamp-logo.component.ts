// frontend/src/app/shared/components/medicamp-logo.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-medicamp-logo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="logo-container" [style.width.px]="size" [style.height.px]="size">
      <svg [attr.width]="size" [attr.height]="size" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Background Circle -->
        <circle cx="40" cy="40" r="40" fill="url(#medicamp-gradient)" stroke="none" />
        
        <!-- Medical Cross -->
        <rect x="35" y="20" width="10" height="40" rx="2" fill="white" stroke="none" />
        <rect x="20" y="35" width="40" height="10" rx="2" fill="white" stroke="none" />
        
        <!-- Inner Circle for depth -->
        <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1" />
        
        <!-- Gradient Definition -->
        <defs>
          <linearGradient id="medicamp-gradient" x1="0%" y1="0%" x2="100%" y2="100%" gradientUnits="objectBoundingBox">
            <stop offset="0%" [attr.style]="'stop-color:' + primaryColor + ';stop-opacity:1'" />
            <stop offset="100%" [attr.style]="'stop-color:' + secondaryColor + ';stop-opacity:1'" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  `,
  styles: [`
    .logo-container {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      vertical-align: middle;
      position: relative;
    }
    
    svg {
      filter: drop-shadow(0 2px 8px rgba(0,0,0,0.15));
      transition: transform 0.3s ease;
      display: block;
      width: 100%;
      height: 100%;
    }
    
    .logo-container:hover svg {
      transform: scale(1.05);
    }
  `]
})
export class MedicampLogoComponent {
  @Input() size: number = 80;
  @Input() primaryColor: string = '#1e3c72';
  @Input() secondaryColor: string = '#2a5298';
}
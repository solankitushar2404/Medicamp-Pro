// frontend/src/app/features/landing/landing.routes.ts
import { Routes } from '@angular/router';

export const landingRoutes: Routes = [
  {
    path: 'find-camps',
    loadComponent: () => import('./find-camps.component').then(m => m.FindCampsComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./about.component').then(m => m.AboutComponent)
  },
  {
    path: 'help',
    loadComponent: () => import('./help.component').then(m => m.HelpComponent)
  },
  { path: '', redirectTo: 'find-camps', pathMatch: 'full' }
];
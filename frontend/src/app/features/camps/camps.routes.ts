// frontend/src/app/features/camps/camps.routes.ts
import { Routes } from '@angular/router';

export const campsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./camps-list.component').then(m => m.CampsListComponent)
  }
];
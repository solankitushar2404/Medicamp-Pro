// frontend/src/app/features/admin/admin.routes.ts
import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
  },
  {
    path: 'camps',
    loadComponent: () => import('./camps/admin-camps.component').then(m => m.AdminCampsComponent)
  },
  {
    path: 'categories',
    loadComponent: () => import('./categories/admin-categories.component').then(m => m.AdminCategoriesComponent)
  },
  {
    path: 'specialties',
    loadComponent: () => import('./specialties/admin-specialties.component').then(m => m.AdminSpecialtiesComponent)
  },
  {
    path: 'registrations/:campId',
    loadComponent: () => import('./registrations/admin-registrations.component').then(m => m.AdminRegistrationsComponent)
  },
  {
    path: 'users',
    loadComponent: () => import('./users/users.component').then(m => m.UsersComponent)
  }
];
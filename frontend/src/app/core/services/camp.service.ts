// frontend/src/app/core/services/camp.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { 
  MedicalCamp, 
  CreateCampRequest, 
  UpdateCampRequest, 
  CampCategory, 
  CreateCategoryRequest,
  MedicalSpecialty,
  CreateSpecialtyRequest,
  PagedResult 
} from '../models/camp.model';

@Injectable({
  providedIn: 'root'
})
export class CampService {
  constructor(private http: HttpClient) {}

  getCamps(page: number = 1, pageSize: number = 10, search?: string, categoryId?: number, specialtyId?: number): Observable<PagedResult<MedicalCamp>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    
    if (search) params = params.set('search', search);
    if (categoryId) params = params.set('categoryId', categoryId.toString());
    if (specialtyId) params = params.set('specialtyId', specialtyId.toString());

    return this.http.get<PagedResult<MedicalCamp>>(`${environment.apiBaseUrl}/camps`, { params });
  }

  // Admin methods
  getAdminCamps(page: number = 1, pageSize: number = 10): Observable<PagedResult<MedicalCamp>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<PagedResult<MedicalCamp>>(`${environment.apiBaseUrl}/admin/camps`, { params });
  }

  getCamp(id: number): Observable<MedicalCamp> {
    return this.http.get<MedicalCamp>(`${environment.apiBaseUrl}/camps/${id}`);
  }

  createCamp(formData: FormData): Observable<MedicalCamp> {
    return this.http.post<MedicalCamp>(`${environment.apiBaseUrl}/admin/camps`, formData);
  }

  updateCamp(id: number, formData: FormData): Observable<void> {
    return this.http.put<void>(`${environment.apiBaseUrl}/admin/camps/${id}`, formData);
  }

  deleteCamp(id: number, force: boolean = false): Observable<void> {
    const params = force ? '?force=true' : '';
    return this.http.delete<void>(`${environment.apiBaseUrl}/admin/camps/${id}${params}`);
  }

  getCategories(): Observable<CampCategory[]> {
    return this.http.get<CampCategory[]>(`${environment.apiBaseUrl}/categories`);
  }

  createCategory(request: CreateCategoryRequest): Observable<CampCategory> {
    return this.http.post<CampCategory>(`${environment.apiBaseUrl}/categories`, request);
  }

  updateCategory(id: number, request: CreateCategoryRequest): Observable<void> {
    return this.http.put<void>(`${environment.apiBaseUrl}/categories/${id}`, request);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/categories/${id}`);
  }

  getSpecialties(): Observable<MedicalSpecialty[]> {
    return this.http.get<MedicalSpecialty[]>(`${environment.apiBaseUrl}/specialties`);
  }

  createSpecialty(request: CreateSpecialtyRequest): Observable<MedicalSpecialty> {
    return this.http.post<MedicalSpecialty>(`${environment.apiBaseUrl}/specialties`, request);
  }

  updateSpecialty(id: number, request: CreateSpecialtyRequest): Observable<void> {
    return this.http.put<void>(`${environment.apiBaseUrl}/specialties/${id}`, request);
  }

  deleteSpecialty(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/specialties/${id}`);
  }
}
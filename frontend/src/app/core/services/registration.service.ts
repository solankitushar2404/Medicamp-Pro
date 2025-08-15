// frontend/src/app/core/services/registration.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CampRegistration, CreateRegistrationRequest } from '../models/registration.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  constructor(private http: HttpClient) {}

  registerForCamp(request: CreateRegistrationRequest): Observable<CampRegistration> {
    return this.http.post<CampRegistration>(`${environment.apiBaseUrl}/registrations`, request);
  }

  getCampRegistrations(campId: number): Observable<CampRegistration[]> {
    return this.http.get<CampRegistration[]>(`${environment.apiBaseUrl}/registrations/camp/${campId}`);
  }

  removeRegistration(registrationId: number): Observable<any> {
    return this.http.delete(`${environment.apiBaseUrl}/registrations/${registrationId}`);
  }

  exportCampRegistrationsPdf(campId: number): Observable<Blob> {
    return this.http.get(`${environment.apiBaseUrl}/registrations/camp/${campId}/export-pdf`, {
      responseType: 'blob'
    });
  }
}
// frontend/src/app/core/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User, UpdateProfileRequest, ChangePasswordRequest } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getProfile(): Observable<User> {
    return this.http.get<User>(`${environment.apiBaseUrl}/users/me`);
  }

  updateProfile(request: UpdateProfileRequest): Observable<void> {
    return this.http.put<void>(`${environment.apiBaseUrl}/users/profile`, request);
  }

  changePassword(request: ChangePasswordRequest): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${environment.apiBaseUrl}/users/change-password`, request);
  }

  requestPasswordChangeOtp(): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${environment.apiBaseUrl}/users/request-password-change-otp`, {});
  }

  verifyOtpAndChangePassword(request: { email: string; otp: string; newPassword: string }): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${environment.apiBaseUrl}/users/verify-otp-and-change-password`, request);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiBaseUrl}/admin/users`);
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/admin/users/${userId}`);
  }

  createUser(userData: any): Observable<User> {
    return this.http.post<User>(`${environment.apiBaseUrl}/admin/users`, userData);
  }

  updateUser(userId: number, userData: any): Observable<User> {
    return this.http.put<User>(`${environment.apiBaseUrl}/admin/users/${userId}`, userData);
  }
}
// frontend/src/app/core/models/camp.model.ts
export interface MedicalCamp {
  id: number;
  title: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  totalSeats: number;
  remainingSeats: number;
  bannerImagePath?: string;
  categoryId: number;
  categoryName: string;
  specialtyId: number;
  specialtyName: string;
  createdAt: Date;
  isRegistered?: boolean;
}

export interface CreateCampRequest {
  title: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  totalSeats: number;
  categoryId: number;
  specialtyId: number;
}

export interface UpdateCampRequest {
  title: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  totalSeats: number;
  categoryId: number;
  specialtyId: number;
}

export interface CampCategory {
  id: number;
  name: string;
  description: string;
}

export interface CreateCategoryRequest {
  name: string;
  description: string;
}

export interface MedicalSpecialty {
  id: number;
  name: string;
  description: string;
}

export interface CreateSpecialtyRequest {
  name: string;
  description: string;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
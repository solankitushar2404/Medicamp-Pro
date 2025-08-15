// frontend/src/app/core/models/registration.model.ts
export interface CampRegistration {
  id: number;
  userId: number;
  userName: string;
  userEmail: string;
  campId: number;
  campTitle: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  symptoms?: string;
  registeredAt: Date;
}

export interface CreateRegistrationRequest {
  campId: number;
  age: number;
  gender: string;
  phone: string;
  email: string;
  symptoms?: string;
}
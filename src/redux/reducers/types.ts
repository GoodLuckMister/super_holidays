export type TypeUserRole = 'super' | 'admin' | 'user';

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: TypeUserRole;
  isBlocked: boolean;
  total_vacations: number;
  total_sick_leaves: number;
  dates: TypeUserDates[];
}

export type Token = string;

export interface Auth {
  accessToken: string;
  refreshToken: string;
  sid: string;
}

export interface TypeUserState {
  isLoggedIn: boolean;
  user: User | null;
  auth: Auth | null;
  isLoading: boolean;
  error: string | null;
}

export enum VacationType {
  SICK_LEAVE = 'sick leave',
  VACATION = 'vacation',
  OWN_EXPENSE = 'own expense'
}

export enum Status {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

export interface TypeUserDates {
  id: number;
  start_day: Date;
  end_day: Date;
  type: VacationType;
  status: Status;
  userId: number;
}

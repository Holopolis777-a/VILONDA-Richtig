export type UserRole = 'admin' | 'broker' | 'member' | 'employer' | 'employee' | 'salary-employee';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  employerId?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  profileImage: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfileImage: (imageUrl: string) => void;
  updateProfile: (updates: Partial<{ name: string; email: string }>) => Promise<void>;
}

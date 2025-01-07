import { Database } from '../../lib/database.types';

export type Profile = Database['public']['Tables']['profiles']['Row'];

export interface UserWithProfile {
  id: string;
  email: string;
  role: Profile['role'];
  firstName: string | null;
  lastName: string | null;
  avatarUrl: string | null;
}

export type UserRole = Profile['role'];

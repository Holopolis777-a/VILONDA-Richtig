import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { AuthState, UserRole } from '../types/auth';

export const useAuthStore = create<AuthState>((set) => {
  // Initialize auth state
  const initAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      const role = session.user.user_metadata.role as UserRole;
      set({
        user: {
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata.name || 'User',
          role: role,
          createdAt: new Date(session.user.created_at)
        },
        isAuthenticated: true
      });
    }
  };

  // Set up auth state listener
  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN' && session?.user) {
      const role = session.user.user_metadata.role as UserRole;
      set({
        user: {
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata.name || 'User',
          role: role,
          createdAt: new Date(session.user.created_at)
        },
        isAuthenticated: true
      });
    } else if (event === 'SIGNED_OUT') {
      set({ user: null, isAuthenticated: false, profileImage: null });
    }
  });

  // Initialize
  initAuth();

  return {
    user: null,
    isAuthenticated: false,
    profileImage: null,

    login: async (email: string, password: string, role: UserRole) => {
      try {
        const { data: { user }, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) throw error;

        if (user) {
          // Update user metadata with role
          const { error: updateError } = await supabase.auth.updateUser({
            data: { role }
          });

          if (updateError) throw updateError;

          set({ 
            user: {
              id: user.id,
              email: user.email!,
              name: user.user_metadata.name || 'User',
              role: role,
              createdAt: new Date(user.created_at)
            },
            isAuthenticated: true 
          });
        }
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    },

    logout: async () => {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        set({ user: null, isAuthenticated: false, profileImage: null });
      } catch (error) {
        console.error('Logout error:', error);
      }
    },

    updateProfileImage: (imageUrl: string) => {
      set({ profileImage: imageUrl });
    },

    updateProfile: async (updates: Partial<{ name: string; email: string }>) => {
      try {
        const { data: { user }, error } = await supabase.auth.updateUser({
          email: updates.email,
          data: { name: updates.name }
        });

        if (error) throw error;

        if (user) {
          set((state) => ({
            user: state.user ? {
              ...state.user,
              email: updates.email || state.user.email,
              name: updates.name || state.user.name
            } : null
          }));
        }
      } catch (error) {
        console.error('Update profile error:', error);
        throw error;
      }
    }
  };
});

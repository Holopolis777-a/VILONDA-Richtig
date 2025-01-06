import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { AuthState, UserRole } from '../types/auth';

export const useAuthStore = create<AuthState>((set) => {
  // Initialize auth state
  // Helper function to get user data with profile
  const getUserWithProfile = async (sessionUser: any) => {
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role, first_name, last_name')
      .eq('id', sessionUser.id)
      .single();

    if (profileError) {
      console.error('Error fetching profile:', profileError);
      return null;
    }

    if (!profile) {
      console.error('No profile found for user');
      return null;
    }

    return {
      id: sessionUser.id,
      email: sessionUser.email!,
      name: profile.first_name && profile.last_name 
        ? `${profile.first_name} ${profile.last_name}`
        : 'User',
      role: profile.role,
      createdAt: new Date(sessionUser.created_at)
    };
  };

  const initAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      const userData = await getUserWithProfile(session.user);
      if (userData) {
        set({
          user: userData,
          isAuthenticated: true
        });
      }
    }
  };

  // Set up auth state listener
  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN' && session?.user) {
      const userData = await getUserWithProfile(session.user);
      if (userData) {
        set({
          user: userData,
          isAuthenticated: true
        });
      }
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

    login: async (email: string, password: string) => {
      try {
        const { data: { user }, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) throw error;

        if (user) {
          // Fetch user profile to get role
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role, first_name, last_name')
            .eq('id', user.id)
            .single();

          if (profileError) throw profileError;

          set({ 
            user: {
              id: user.id,
              email: user.email!,
              name: profile.first_name && profile.last_name 
                ? `${profile.first_name} ${profile.last_name}`
                : 'User',
              role: profile.role,
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

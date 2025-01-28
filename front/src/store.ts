import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  user: string | null;
  token: string | null;
  setUser: (user: string | null, token: string | null) => void;
  clearUser: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  setUser: async (user, token) => {
    if (token !== null) {
      await AsyncStorage.setItem('token', token); 
    }
    set({ user, token });
  },
  clearUser: async () => {
    await AsyncStorage.removeItem('token'); 
    set({ user: null, token: null });
  },
}));

export default useAuthStore;

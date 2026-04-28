import { create } from 'zustand';

interface AppState {
  // Location State
  location: string | null;
  isLocationModalOpen: boolean;
  setLocation: (loc: string) => void;
  setLocationModalOpen: (isOpen: boolean) => void;

  // Search State
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Auth State
  isAuthenticated: boolean;
  user: any | null;
  isAuthModalOpen: boolean;
  setAuthenticated: (status: boolean, user?: any) => void;
  setAuthModalOpen: (isOpen: boolean) => void;

  // Global UI
  isCartDrawerOpen: boolean;
  setCartDrawerOpen: (isOpen: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Location
  location: null,
  isLocationModalOpen: false, // Will be set to true on mount if location is null
  setLocation: (loc) => set({ location: loc, isLocationModalOpen: false }),
  setLocationModalOpen: (isOpen) => set({ isLocationModalOpen: isOpen }),

  // Search
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),

  // Auth
  isAuthenticated: false,
  user: null,
  isAuthModalOpen: false,
  setAuthenticated: (status, user = null) => set({ isAuthenticated: status, user, isAuthModalOpen: false }),
  setAuthModalOpen: (isOpen) => set({ isAuthModalOpen: isOpen }),

  // UI
  isCartDrawerOpen: false,
  setCartDrawerOpen: (isOpen) => set({ isCartDrawerOpen: isOpen }),
}));

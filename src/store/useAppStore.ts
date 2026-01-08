import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';
import type { AppState, Language, Theme } from '../types';

// Get system theme preference
const getSystemTheme = (): 'dark' | 'light' => {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Resolve theme based on preference
const resolveTheme = (theme: Theme): 'dark' | 'light' => {
  if (theme === 'system') {
    return getSystemTheme();
  }
  return theme;
};

export const useAppStore = create<AppState>()(
  subscribeWithSelector(
    persist(
      (set) => ({
        language: 'es',
        theme: 'dark',
        resolvedTheme: 'dark',
        scrollProgress: 0,
        activeSection: 'hero',
        isMenuOpen: false,
        setLanguage: (lang: Language) => set({ language: lang }),
        setTheme: (theme: Theme) => set({
          theme,
          resolvedTheme: resolveTheme(theme),
        }),
        setScrollProgress: (progress: number) => set({ scrollProgress: progress }),
        setActiveSection: (section: string) => set({ activeSection: section }),
        setMenuOpen: (open: boolean) => set({ isMenuOpen: open }),
      }),
      {
        name: 'portfolio-storage',
        partialize: (state) => ({
          language: state.language,
          theme: state.theme,
        }),
        onRehydrateStorage: () => (state) => {
          // Update resolved theme after rehydration
          if (state) {
            state.resolvedTheme = resolveTheme(state.theme);
          }
        },
      }
    )
  )
);

// Listen for system theme changes
if (typeof window !== 'undefined') {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', (e) => {
    const state = useAppStore.getState();
    if (state.theme === 'system') {
      useAppStore.setState({
        resolvedTheme: e.matches ? 'dark' : 'light',
      });
    }
  });
}

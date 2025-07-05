"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ThemeMode = 'light' | 'dark' | 'system';
type Theme = 'light' | 'dark';

interface ThemeContextType {
  themeMode: ThemeMode;
  actualTheme: Theme;
  setThemeMode: (mode: ThemeMode) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');
  const [actualTheme, setActualTheme] = useState<Theme>('dark');

  // Get system preference
  const getSystemTheme = (): Theme => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  };

  // Update actual theme based on mode
  const updateActualTheme = (mode: ThemeMode) => {
    let newTheme: Theme;
    
    if (mode === 'system') {
      newTheme = getSystemTheme();
    } else {
      newTheme = mode;
    }
    
    setActualTheme(newTheme);
    
    // Update document class for Tailwind dark mode
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Load saved theme from localStorage
  useEffect(() => {
    const savedThemeMode = localStorage.getItem('poketrade-theme-mode') as ThemeMode;
    if (savedThemeMode && ['light', 'dark', 'system'].includes(savedThemeMode)) {
      setThemeModeState(savedThemeMode);
      updateActualTheme(savedThemeMode);
    } else {
      // Default to system
      setThemeModeState('system');
      updateActualTheme('system');
    }

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = () => {
      if (themeMode === 'system') {
        updateActualTheme('system');
      }
    };
    
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, []);

  // Set theme mode and save to localStorage
  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    localStorage.setItem('poketrade-theme-mode', mode);
    updateActualTheme(mode);
  };

  // Update when themeMode changes
  useEffect(() => {
    updateActualTheme(themeMode);
  }, [themeMode]);

  const isDark = actualTheme === 'dark';

  return (
    <ThemeContext.Provider value={{
      themeMode,
      actualTheme,
      setThemeMode,
      isDark
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Helper function to get theme-aware class names
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
} 
export interface Project {
  id: string;
  title: {
    es: string;
    en: string;
  };
  description: {
    es: string;
    en: string;
  };
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface Technology {
  id: string;
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'cloud';
  color: string;
}

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: string;
}

export interface PersonalInfo {
  name: string;
  title: {
    es: string;
    en: string;
  };
  bio: {
    es: string;
    en: string;
  };
  email: string;
  location: string;
  cvUrl?: string;
  socialLinks: SocialLink[];
}

export type Language = 'es' | 'en';
export type Theme = 'dark' | 'light' | 'system';

export interface AppState {
  language: Language;
  theme: Theme;
  resolvedTheme: 'dark' | 'light';
  scrollProgress: number;
  activeSection: string;
  isMenuOpen: boolean;
  setLanguage: (lang: Language) => void;
  setTheme: (theme: Theme) => void;
  setScrollProgress: (progress: number) => void;
  setActiveSection: (section: string) => void;
  setMenuOpen: (open: boolean) => void;
}

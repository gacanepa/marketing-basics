import { createContext } from 'react';
import type { Language } from '../i18n';
import type { ThemeMode } from './types';

export interface AppConfig {
  lang: Language;
  theme: ThemeMode;
  toggleLang: () => void;
  toggleTheme: () => void;
  setLang: (lang: Language) => void;
  setTheme: (theme: ThemeMode) => void;
}

export const AppConfigContext = createContext<AppConfig | undefined>(undefined);

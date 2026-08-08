import { useState, useEffect, type ReactNode } from 'react';
import type { Language } from '../i18n';
import { AppConfigContext } from './appConfigContextObject';
import type { ThemeMode } from './types';

const LANG_KEY = 'marketing-basics-lang';
const THEME_KEY = 'marketing-basics-theme';

const readStored = <T extends string>(key: string, fallback: T, allowed: readonly T[]): T => {
  try {
    const value = localStorage.getItem(key);
    if (value && (allowed as readonly string[]).includes(value)) return value as T;
  } catch {
    /* ignore */
  }
  return fallback;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Language>(() =>
    readStored(LANG_KEY, 'en-US', ['en-US', 'es-419'] as const),
  );
  const [theme, setThemeState] = useState<ThemeMode>(() =>
    readStored(THEME_KEY, 'light', ['light', 'dark'] as const),
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.lang = lang === 'es-419' ? 'es' : 'en';
    try {
      localStorage.setItem(THEME_KEY, theme);
      localStorage.setItem(LANG_KEY, lang);
    } catch {
      /* ignore */
    }
  }, [theme, lang]);

  const setLang = (next: Language) => setLangState(next);
  const setTheme = (next: ThemeMode) => setThemeState(next);
  const toggleLang = () => setLangState((prev) => (prev === 'en-US' ? 'es-419' : 'en-US'));
  const toggleTheme = () => setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <AppConfigContext.Provider
      value={{ lang, theme, toggleLang, toggleTheme, setLang, setTheme }}
    >
      {children}
    </AppConfigContext.Provider>
  );
};

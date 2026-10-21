"use client";

import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";
import { lp, trAny, type Locale } from "./locales";

export type { Locale };

type I18nContextValue = {
  locale: Locale;
  t: <T>(zh: T, en: T) => T;
  p: (path: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const t = useCallback(<T,>(zh: T, en: T) => trAny(locale, zh, en), [locale]);
  const p = useCallback((path: string) => lp(locale, path), [locale]);
  const value = useMemo(() => ({ locale, t, p }), [locale, t, p]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

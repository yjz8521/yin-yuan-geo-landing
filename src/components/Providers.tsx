"use client";

import { I18nProvider } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";
import type { ReactNode } from "react";

export function Providers({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <I18nProvider locale={locale}>{children}</I18nProvider>;
}

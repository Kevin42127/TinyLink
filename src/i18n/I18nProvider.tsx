"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import en from "./messages/en";
import zh from "./messages/zh";

type Locale = "en" | "zh";

type Messages = Record<string, string>;

const ALL_MESSAGES: Record<Locale, Messages> = {
  en,
  zh,
};

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, fallback?: string) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function getInitialLocale(): Locale {
  try {
    const cookieMatch = document.cookie.match(/(?:^|; )locale=([^;]+)/);
    if (cookieMatch) {
      const val = decodeURIComponent(cookieMatch[1]);
      if (val === "en" || val === "zh") return val;
    }
  } catch {}
  if (typeof navigator !== "undefined") {
    const lang = navigator.language.toLowerCase();
    if (lang.startsWith("en")) return "en";
    return "zh";
  }
  return "zh";
}

export function I18nProvider({ children, initialLocale }: { children: React.ReactNode; initialLocale?: Locale }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale ?? getInitialLocale());

  const setLocale = (loc: Locale) => {
    setLocaleState(loc);
    try {
      document.cookie = `locale=${loc}; path=/; max-age=31536000`;
    } catch {}
  };

  const t = useMemo(() => {
    const messages = ALL_MESSAGES[locale] || {};
    const fallbackMessages = ALL_MESSAGES.zh || {};
    return (key: string, fallback?: string) => {
      if (key in messages) return messages[key];
      if (fallback) return fallback;
      if (key in fallbackMessages) return fallbackMessages[key];
      return key;
    };
  }, [locale]);

  // Ensure cookie reflects state on mount
  useEffect(() => {
    try {
      document.cookie = `locale=${locale}; path=/; max-age=31536000`;
    } catch {}
  }, [locale]);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
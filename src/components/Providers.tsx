"use client";

import React from "react";
import { I18nProvider } from "@/i18n/I18nProvider";

export default function Providers({ children, initialLocale }: { children: React.ReactNode; initialLocale?: "en" | "zh" }) {
  return <I18nProvider initialLocale={initialLocale}>{children}</I18nProvider>;
}
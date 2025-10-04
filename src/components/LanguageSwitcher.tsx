"use client";

import { useI18n } from "@/i18n/I18nProvider";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  return (
    <div className="relative">
      <label htmlFor="language-select" className="sr-only">Switch language</label>
      <select
        id="language-select"
        aria-label="Switch language"
        value={locale}
        onChange={(e) => setLocale(e.target.value as "en" | "zh")}
        className="px-3 py-1 rounded-md text-sm border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
      >
        <option value="zh">中文</option>
        <option value="en">English</option>
      </select>
    </div>
  );
}
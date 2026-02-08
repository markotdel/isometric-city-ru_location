// src/lib/gt.ts
// Lightweight i18n layer on top of gt-next locale selection.
// We keep gt-next for locale storage/switching, but translate by English source strings.
//
// NOTE: English is the source language (identity). Russian is provided via src/locales/ru.json.

import * as GT from "gt-next";
import { useLocale as useLocaleClient } from "gt-next/client";

import en from "@/locales/en.json";
import ru from "@/locales/ru.json";

export * from "gt-next";

// In this codebase, msg() is used as a marker for translatable strings.
// We treat the English string itself as the key.
export function msg(s: string): string {
  return s;
}

// Return a formatter similar to gt-next's useMessages(), but keyed by English source strings.
export function useMessages(): (x: any) => string {
  const locale = useLocaleClient();
  const dict: Record<string, string> = locale === "ru" ? (ru as any) : (en as any);

  return (x: any) => {
    if (typeof x === "string") return dict[x] ?? x;
    if (x === null || x === undefined) return "";
    const key = String(x);
    return dict[key] ?? key;
  };
}

// Convenience re-export
export { useLocaleClient as useLocale };

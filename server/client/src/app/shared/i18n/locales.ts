export const SUPPORTED_LOCALES = [
  'en-GB',
  'de-DE',
  'bg-BG',
  'fr-FR',
  'es-ES'
] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en-GB';

export const TRANSLATION_NAMESPACES = [
  'common',
  'validation',
  'errors'
] as const;

const LOCALE_ALIASES: Record<string, Locale> = {
  en: 'en-GB',
  de: 'de-DE',
  bg: 'bg-BG',
  fr: 'fr-FR',
  es: 'es-ES'
};

const LOCALE_MAP: Record<string, Locale> = SUPPORTED_LOCALES.reduce(
  (acc, locale) => {
    acc[locale.toLowerCase()] = locale;
    return acc;
  },
  {} as Record<string, Locale>
);

export function normalizeLocale(
  input: string | null | undefined
): Locale | null {
  if (!input) {
    return null;
  }

  const normalized = input.trim().toLowerCase();
  if (!normalized) {
    return null;
  }

  if (LOCALE_MAP[normalized]) {
    return LOCALE_MAP[normalized];
  }

  if (LOCALE_ALIASES[normalized]) {
    return LOCALE_ALIASES[normalized];
  }

  const primaryTag = normalized.split('-')[0];
  return LOCALE_ALIASES[primaryTag] || null;
}

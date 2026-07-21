// Re-exports the site's own locale dictionaries for use in assertions, so
// tests track copy changes automatically instead of hand-copying strings
// that would silently drift out of sync with the real content.
import { siteLocale as en } from '../../src/i18n/site_locale/en';
import { siteLocale as fr } from '../../src/i18n/site_locale/fr';
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from '../../src/i18n/locales';
import type { Locale } from '../../src/i18n/locales';
import type { SiteLocale } from '../../src/i18n/site_locale/types';

export { SUPPORTED_LOCALES, DEFAULT_LOCALE };
export type { Locale, SiteLocale };

export const localeContent: Record<Locale, SiteLocale> = { en, fr };

export function pathFor(locale: Locale): string {
    return locale === DEFAULT_LOCALE ? '/' : `/${locale}/`;
}


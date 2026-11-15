import type { Locale } from '@/lib/i18n/translations';

/**
 * Returns the localized text for a frontmatter field based on the active locale.
 *
 * Checks field_ar for Arabic, field_fr for French, and falls back
 * deterministically to the base field (English). Never returns undefined.
 */
export function getLocalizedField<T extends Record<string, unknown>>(
  frontmatter: T,
  field: string,
  locale: Locale
): string {
  if (locale === 'ar') {
    const arVal = frontmatter[`${field}_ar`];
    if (typeof arVal === 'string' && arVal.trim().length > 0) {
      return arVal;
    }
  }
  if (locale === 'fr') {
    const frVal = frontmatter[`${field}_fr`];
    if (typeof frVal === 'string' && frVal.trim().length > 0) {
      return frVal;
    }
  }
  const defaultVal = frontmatter[field];
  return typeof defaultVal === 'string' ? defaultVal : '';
}

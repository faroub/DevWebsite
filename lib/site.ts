/**
 * Single source of truth for site identity: author, domain, contact address,
 * and social links. Every component and document that names the site, its
 * owner, or its contact address reads from here.
 *
 * The contact email is read from the public env var NEXT_PUBLIC_NOTIFY_EMAIL.
 * It falls back to the site address when unset, so every page carries a real
 * address without requiring an env file to resolve.
 */

/** Public fallback email used when NEXT_PUBLIC_NOTIFY_EMAIL is unset. */
export const SITE_DEFAULT_EMAIL = 'mzilab03dz@gmail.com';

/** The site contact address: env var first, public fallback otherwise. */
export const SITE_CONTACT_EMAIL_VALUE =
  process.env.NEXT_PUBLIC_NOTIFY_EMAIL || SITE_DEFAULT_EMAIL;

export const SITE = {
  name: 'mzilab',
  domain: 'mzilab.de',
  url: 'https://mzilab.de',
  author: 'Farid Oubbati',
  /** Shorthand attribution used where the full name is too long. */
  authorShort: 'mzilab',
  contactEmail: SITE_CONTACT_EMAIL_VALUE,
  location: 'Laghouat, Algeria',
  github: 'https://github.com/mzilab',
  defaultLocale: 'en',
} as const;

export const NOTIFY_EMAIL = SITE.contactEmail;
export const SITE_CONTACT_EMAIL = SITE.contactEmail;
export const CONTACT_EMAIL = SITE.contactEmail;
export const SITE_URL = SITE.url;

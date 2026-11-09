/**
 * Single source of truth for site identity: author, domain, contact address,
 * and social links. Every component and document that names the site, its
 * owner, or its contact address reads from here.
 */
export const SITE = {
  name: 'mzilab',
  domain: 'mzilab.de',
  url: 'https://mzilab.de',
  author: 'Farid Oubbati',
  /** Shorthand attribution used where the full name is too long. */
  authorShort: 'mzilab',
  contactEmail: 'mzilab03dz@gmail.com',
  location: 'Laghouat, Algeria',
  github: 'https://github.com/mzilab',
  defaultLocale: 'en',
} as const;

export const NOTIFY_EMAIL = SITE.contactEmail;
export const SITE_CONTACT_EMAIL = SITE.contactEmail;

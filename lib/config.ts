/**
 * Private feedback form configuration. The recipient comes from lib/site.ts
 * (single source of truth); the Web3Forms access key is a public,
 * domain-allowlisted identifier and comes from NEXT_PUBLIC_WEB3FORMS_KEY
 * (see .env.example).
 */
import { SITE } from './site';

export const FEEDBACK_RECIPIENT_EMAIL = SITE.contactEmail;

export const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

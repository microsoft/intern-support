import config from "../config/config";

/** Whitelisted email addresses loaded from config (sourced from env). */
const WHITELISTED_EMAILS: ReadonlySet<string> = new Set(
  config.whitelistedEmails,
);

/** Returns true if the email is on the whitelist (case-insensitive). */
export const isWhitelisted = (email: string): boolean =>
  WHITELISTED_EMAILS.has(email.toLowerCase().trim());

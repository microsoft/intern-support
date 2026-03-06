import config from "../config/config";

/** Whitelisted email addresses loaded from config (sourced from env). */
const WHITELISTED_EMAILS: ReadonlySet<string> = new Set(
  config.whitelistedEmails,
);

/** Whitelisted aliases (the part before @) for cross-tenant matching. */
const WHITELISTED_ALIASES: ReadonlySet<string> = new Set(
  config.whitelistedEmails.map((e) => e.split("@")[0]!),
);

/**
 * Returns true if the email is on the whitelist (case-insensitive).
 * Also matches by alias prefix to handle cross-tenant UPNs
 * (e.g. t-aryanshah@contoso.onmicrosoft.com matches t-aryanshah@microsoft.com).
 */
export const isWhitelisted = (email: string): boolean => {
  const normalized = email.toLowerCase().trim();
  if (WHITELISTED_EMAILS.has(normalized)) return true;
  const alias = normalized.split("@")[0]!;
  return WHITELISTED_ALIASES.has(alias);
};

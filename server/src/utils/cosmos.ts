import { CosmosClient, Container } from "@azure/cosmos";
import crypto from "crypto";
import config from "../config/config";

const client = new CosmosClient({
  endpoint: config.cosmos.endpoint,
  key: config.cosmos.key,
});

const database = client.database(config.cosmos.database);
const container: Container = database.container(config.cosmos.container);

/** How long a verification code stays valid (ms). */
const CODE_TTL_MS = 60 * 60 * 1000; // 1 hour

/** Cosmos DB document shape for a verification code. */
interface AuthCodeDoc {
  id: string;
  email: string;
  code: string;
  expiresAt: number; // epoch ms
  ttl: number; // Cosmos TTL in seconds
}

/**
 * Generate a cryptographically-random 6-digit code, persist it in Cosmos DB
 * with a 1-hour TTL, and return the code string.
 */
export const createVerificationCode = async (
  email: string,
): Promise<string> => {
  const code = crypto.randomInt(100_000, 999_999).toString();
  const now = Date.now();

  const doc: AuthCodeDoc = {
    id: `${email}:${now}`,
    email: email.toLowerCase().trim(),
    code,
    expiresAt: now + CODE_TTL_MS,
    ttl: 3600, // Cosmos auto-deletes after 1 hour
  };

  await container.items.create(doc);
  return code;
};

/**
 * Validate a verification code for the given email.
 * If valid the code document is deleted and `true` is returned.
 */
export const validateVerificationCode = async (
  email: string,
  code: string,
): Promise<boolean> => {
  const normalizedEmail = email.toLowerCase().trim();

  const { resources } = await container.items
    .query({
      query:
        "SELECT * FROM c WHERE c.email = @email AND c.code = @code AND c.expiresAt > @now",
      parameters: [
        { name: "@email", value: normalizedEmail },
        { name: "@code", value: code },
        { name: "@now", value: Date.now() },
      ],
    })
    .fetchAll();

  if (resources.length === 0) return false;

  // Clean up used code
  const doc = resources[0] as AuthCodeDoc;
  await container.item(doc.id, doc.email).delete();

  return true;
};

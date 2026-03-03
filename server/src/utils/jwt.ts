import jwt from "jsonwebtoken";
import config from "../config/config";

export interface JwtPayload {
  email: string;
}

const JWT_EXPIRY = "7d";

/** Sign a JWT containing the user's email. */
export const signToken = (email: string): string =>
  jwt.sign({ email } satisfies JwtPayload, config.jwtSecret, {
    expiresIn: JWT_EXPIRY,
  });

/**
 * Verify and decode a JWT.
 * Returns the payload on success, or `null` if the token is invalid / expired.
 */
export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, config.jwtSecret) as JwtPayload;
  } catch {
    return null;
  }
};

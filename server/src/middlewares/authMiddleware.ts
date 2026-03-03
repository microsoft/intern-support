import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

/**
 * Express middleware that verifies the JWT in the Authorization header.
 * Attaches `req.user` with the decoded email on success.
 * Returns 401 if the token is missing, malformed, or expired.
 */
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    res.status(401).json({ message: "Missing or malformed authorization header" });
    return;
  }

  const token = header.slice(7); // strip "Bearer "
  const payload = verifyToken(token);

  if (!payload) {
    res.status(401).json({ message: "Invalid or expired token" });
    return;
  }

  // Attach the authenticated user to the request
  (req as Request & { user: { email: string } }).user = {
    email: payload.email,
  };

  next();
};

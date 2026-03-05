import { Router, Request, Response } from "express";
import { interns } from "../data/interns";

const router = Router();

/**
 * GET /api/interns
 * Returns the static list of Belgium interns.
 */
router.get("/", (_req: Request, res: Response) => {
  res.json(interns);
});

export default router;

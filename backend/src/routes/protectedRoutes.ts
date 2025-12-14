import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();

router.get("/", verifyToken, (_req, res) => {
  res.json({ ok: true });
});

export default router;

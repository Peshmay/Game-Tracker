import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();

/**
 * @openapi
 * /api/protected:
 *   get:
 *     summary: Protected test route (requires Bearer token)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Authorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *       401:
 *         description: Unauthorized
 */
router.get("/", verifyToken, (_req, res) => {
  res.json({ ok: true });
});

export default router;

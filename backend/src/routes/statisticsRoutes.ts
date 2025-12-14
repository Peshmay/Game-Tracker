import { Router } from "express";
import { getStatistics } from "../controllers/statisticsController";

const router = Router();

/**
 * @openapi
 * /api/statistics:
 *   get:
 *     summary: Get statistics (games/users/week/leaderboard)
 *     tags: [Statistics]
 *     responses:
 *       200:
 *         description: Statistics payload
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StatisticsResponse'
 */
router.get("/", getStatistics);

export default router;

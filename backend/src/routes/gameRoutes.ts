import { Router } from "express";
import { listGames, createGame } from "../controllers/gameController";

const router = Router();

/**
 * @openapi
 * /api/games:
 *   get:
 *     summary: List all games
 *     tags: [Games]
 *     responses:
 *       200:
 *         description: Array of games
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Game'
 */
router.get("/", listGames);

/**
 * @openapi
 * /api/games:
 *   post:
 *     summary: Create a new game
 *     tags: [Games]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 1
 *     responses:
 *       200:
 *         description: Created game
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 *       400:
 *         description: Invalid data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/", createGame);

export default router;

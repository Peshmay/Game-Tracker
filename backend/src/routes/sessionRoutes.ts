import { Router } from "express";
import { startSession, stopSession } from "../controllers/sessionController";

const router = Router();

/**
 * @openapi
 * /api/sessions/start:
 *   post:
 *     summary: Start a session
 *     tags: [Sessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userId, gameId]
 *             properties:
 *               userId:
 *                 type: integer
 *                 minimum: 1
 *               gameId:
 *                 type: integer
 *                 minimum: 1
 *     responses:
 *       200:
 *         description: Session created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Session'
 *       400:
 *         description: Invalid data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/start", startSession);

/**
 * @openapi
 * /api/sessions/stop:
 *   patch:
 *     summary: Stop a session (body id)
 *     tags: [Sessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id]
 *             properties:
 *               id:
 *                 type: integer
 *                 minimum: 1
 *     responses:
 *       200:
 *         description: Updated session
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Session'
 *       404:
 *         description: Session not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       400:
 *         description: Invalid data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.patch("/stop", stopSession);

/**
 * @openapi
 * /api/sessions/{id}/stop:
 *   patch:
 *     summary: Stop a session (URL param id)
 *     tags: [Sessions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *     responses:
 *       200:
 *         description: Updated session
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Session'
 *       404:
 *         description: Session not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.patch("/:id/stop", stopSession);

export default router;

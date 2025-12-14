import { Router } from "express";
import { getWeather } from "../controllers/weatherController";

const router = Router();

/**
 * @openapi
 * /api/weather:
 *   get:
 *     summary: Get weather by city (OpenWeatherMap)
 *     tags: [Weather]
 *     parameters:
 *       - in: query
 *         name: city
 *         required: false
 *         schema:
 *           type: string
 *         example: Uddevalla
 *     responses:
 *       200:
 *         description: Weather payload
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Weather'
 *       500:
 *         description: Missing API key or fetch failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/", getWeather);

export default router;

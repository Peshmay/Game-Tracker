import express from "express";
import cors from "cors";
import helmet from "helmet";
import { logger } from "./utils/logger";
import * as swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger";

import userRoutes from "./routes/userRoutes";
import gameRoutes from "./routes/gameRoutes";
import sessionRoutes from "./routes/sessionRoutes";
import statisticsRoutes from "./routes/statisticsRoutes";
import weatherRoutes from "./routes/weatherRoutes";
import protectedRoutes from "./routes/protectedRoutes";
import { verifyToken } from "./middleware/verifyToken";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(
  helmet({
    contentSecurityPolicy: false, // ✅ allow Swagger
  })
);

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/health", (_req, res) => {
  logger.info("health check");
  res.json({ ok: true });
});

app.use("/api/users", verifyToken, userRoutes);
app.use("/api/statistics", verifyToken, statisticsRoutes);
app.use("/api/protected", verifyToken, protectedRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/weather", weatherRoutes);

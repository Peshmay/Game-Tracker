import express from "express";
import cors from "cors";
import { logger } from "./utils/logger";

import statisticsRoutes from "./routes/statisticsRoutes";
import userRoutes from "./routes/userRoutes";
import protectedRoutes from "./routes/protectedRoutes";
import { verifyToken } from "./middleware/verifyToken";

export const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  logger.info("health check");
  res.json({ ok: true });
});

app.use("/api/users", verifyToken, userRoutes);
app.use("/api/statistics", verifyToken, statisticsRoutes);
app.use("/api/protected", verifyToken, protectedRoutes);

import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import userRoutes from "./routes/userRoutes";
import gameRoutes from "./routes/gameRoutes";
import sessionRoutes from "./routes/sessionRoutes";
import statisticsRoutes from "./routes/statisticsRoutes";
import weatherRoutes from "./routes/weatherRoutes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/users", userRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/statistics", statisticsRoutes);
app.use("/api/weather", weatherRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});

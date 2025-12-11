import { Router } from "express";
import { startSession, stopSession } from "../controllers/sessionController";

const router = Router();

router.post("/start", startSession);
router.patch("/stop", stopSession);
router.patch("/:id/stop", stopSession);

export default router;

import { Router } from "express";
import { listGames, createGame } from "../controllers/gameController";

const router = Router();

router.get("/", listGames);
router.post("/", createGame);

export default router;

import type { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../utils/prisma";

const gameSchema = z.object({ name: z.string().min(1) });

export async function listGames(_req: Request, res: Response) {
  const games = await prisma.game.findMany({ orderBy: { id: "asc" } });
  res.json(games);
}

export async function createGame(req: Request, res: Response) {
  try {
    const data = gameSchema.parse(req.body);
    const game = await prisma.game.create({ data });
    res.json(game);
  } catch (e: any) {
    res.status(400).json({ error: e.message || "Invalid data" });
  }
}

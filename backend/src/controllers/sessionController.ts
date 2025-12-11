import type { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../utils/prisma";

const startSchema = z.object({
  userId: z.number().int().positive(),
  gameId: z.number().int().positive()
});

const stopSchema = z.object({
  id: z.number().int().positive()
});

function computeMinutes(startedAt: Date, endedAt: Date) {
  const seconds = Math.round((endedAt.getTime() - startedAt.getTime()) / 1000);
  return Math.max(1, seconds);
}

export async function startSession(req: Request, res: Response) {
  try {
    const { userId, gameId } = startSchema.parse(req.body);
    const session = await prisma.session.create({
      data: { userId, gameId, startedAt: new Date() }
    });
    res.json(session);
  } catch (e: any) {
    res.status(400).json({ error: e.message || "Invalid data" });
  }
}

export async function stopSession(req: Request, res: Response) {
  try {
    const { id } = stopSchema.parse(req.body);
    const existing = await prisma.session.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ message: "Session not found" });

    const endedAt = new Date();
    const minutes = computeMinutes(existing.startedAt, endedAt);

    const updated = await prisma.session.update({
      where: { id },
      data: { endedAt, minutes }
    });
    res.json(updated);
  } catch (e: any) {
    res.status(400).json({ error: e.message || "Invalid data" });
  }
}

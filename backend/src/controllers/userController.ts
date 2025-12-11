import type { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../utils/prisma";

const userSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  profilePic: z.string().optional()
});

export async function createUser(req: Request, res: Response) {
  try {
    const parsed = userSchema.parse({
      ...req.body,
      profilePic: req.body.profilePic
    });

    const profilePic = req.file
      ? `/uploads/${req.file.filename}`
      : parsed.profilePic || "/uploads/default.png";

    const user = await prisma.user.create({
      data: {
        email: parsed.email,
        firstName: parsed.firstName,
        lastName: parsed.lastName,
        profilePic
      }
    });

    res.json(user);
  } catch (e: any) {
    res.status(400).json({ message: e.message || "Invalid data" });
  }
}

export async function getUsers(_req: Request, res: Response) {
  const users = await prisma.user.findMany({ orderBy: { id: "asc" } });
  res.json(users);
}

export async function getUserById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      sessions: { include: { game: true }, orderBy: { startedAt: "desc" } }
    }
  });
  if (!user) return res.status(404).json({ message: "Not found" });
  res.json(user);
}

export async function deleteUser(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    await prisma.session.deleteMany({ where: { userId: id } });
    await prisma.user.delete({ where: { id } });
    res.json({ message: "User deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Error deleting user" });
  }
}

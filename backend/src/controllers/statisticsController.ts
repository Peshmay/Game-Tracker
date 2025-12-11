import type { Request, Response } from "express";
import { prisma } from "../utils/prisma";

export async function getStatistics(_req: Request, res: Response) {
  const sessions = await prisma.session.findMany({
    where: { minutes: { not: null } },
    include: { user: true, game: true }
  });

  const gameMap = new Map<string, number>();
  sessions.forEach((s) => {
    if (!s.minutes) return;
    gameMap.set(s.game.name, (gameMap.get(s.game.name) || 0) + s.minutes);
  });
  const games = [...gameMap.entries()].map(([name, minutes]) => ({ name, minutes }));

  const userMap = new Map<string, number>();
  sessions.forEach((s) => {
    if (!s.minutes) return;
    const name = `${s.user.firstName}`;
    userMap.set(name, (userMap.get(name) || 0) + s.minutes);
  });
  const users = [...userMap.entries()].map(([user, minutes]) => ({ user, minutes }));

  const now = new Date();
  const days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(now);
    d.setDate(now.getDate() - (6 - i));
    d.setHours(0, 0, 0, 0);
    return d;
  });

  const week = days.map((d, idx) => {
    const next = new Date(d);
    next.setDate(d.getDate() + 1);
    const total = sessions
      .filter((s) => s.startedAt >= d && s.startedAt < next && s.minutes)
      .reduce((acc, s) => acc + (s.minutes || 0), 0);
    return { day: `D${idx + 1}`, minutes: total };
  });

  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - 6);
  weekStart.setHours(0, 0, 0, 0);
  const leaderboardMap = new Map<string, number>();
  sessions
    .filter((s) => s.startedAt >= weekStart && s.minutes)
    .forEach((s) => {
      const key = `${s.user.firstName} ${s.user.lastName}`;
      leaderboardMap.set(key, (leaderboardMap.get(key) || 0) + (s.minutes || 0));
    });
  const leaderboard = [...leaderboardMap.entries()]
    .map(([user, minutes]) => ({ user, minutes }))
    .sort((a, b) => b.minutes - a.minutes)
    .slice(0, 10);

  res.json({ games, users, week, leaderboard });
}

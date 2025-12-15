jest.mock("../../utils/prisma");

import request from "supertest";
import { prisma } from "../../utils/prisma";
import { app } from "../../app";

describe("Sessions API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("POST /api/sessions/start starts a session", async () => {
    (prisma.session.create as jest.Mock).mockResolvedValue({
      id: 10,
      userId: 1,
      gameId: 2,
      startedAt: new Date("2025-01-01T10:00:00Z"),
    });

    const res = await request(app)
      .post("/api/sessions/start")
      .send({ userId: 1, gameId: 2 });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", 10);
    expect(prisma.session.create).toHaveBeenCalled();
  });

  it("PATCH /api/sessions/stop stops a session and returns updated session", async () => {
    const startedAt = new Date(Date.now() - 10_000); // 10 seconds ago

    (prisma.session.findUnique as jest.Mock).mockResolvedValue({
      id: 10,
      startedAt,
      endedAt: null,
      minutes: null,
    });

    (prisma.session.update as jest.Mock).mockResolvedValue({
      id: 10,
      startedAt,
      endedAt: new Date(),
      minutes: 10, // your controller uses seconds->minutes-ish (min 1), so any number is fine
    });

    const res = await request(app).patch("/api/sessions/stop").send({ id: 10 });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", 10);
    expect(res.body).toHaveProperty("minutes");
    expect(prisma.session.findUnique).toHaveBeenCalledWith({
      where: { id: 10 },
    });
    expect(prisma.session.update).toHaveBeenCalled();
  });

  it("PATCH /api/sessions/stop returns 404 if session not found", async () => {
    (prisma.session.findUnique as jest.Mock).mockResolvedValue(null);

    const res = await request(app)
      .patch("/api/sessions/stop")
      .send({ id: 999 });

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message", "Session not found");
    expect(prisma.session.update).not.toHaveBeenCalled();
  });

  it("PATCH /api/sessions/stop returns 400 if id is invalid", async () => {
    const res = await request(app)
      .patch("/api/sessions/stop")
      .send({ id: "bad" });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
});

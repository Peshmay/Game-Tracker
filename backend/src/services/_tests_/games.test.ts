jest.mock("../../utils/prisma");

import request from "supertest";
import { prisma } from "../../utils/prisma";
import { app } from "../../app";

describe("Games API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("GET /api/games returns a list of games", async () => {
    (prisma.game.findMany as jest.Mock).mockResolvedValue([
      { id: 1, name: "Minecraft" },
      { id: 2, name: "Fortnite" },
    ]);

    const res = await request(app).get("/api/games");

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
    expect(prisma.game.findMany).toHaveBeenCalled();
  });

  it("POST /api/games creates a game", async () => {
    (prisma.game.create as jest.Mock).mockResolvedValue({
      id: 3,
      name: "Portal 2",
    });

    const res = await request(app)
      .post("/api/games")
      .send({ name: "Portal 2" });

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ id: 3, name: "Portal 2" });
    expect(prisma.game.create).toHaveBeenCalledWith({
      data: { name: "Portal 2" },
    });
  });

  it("POST /api/games returns 400 when name is missing", async () => {
    const res = await request(app).post("/api/games").send({});

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(prisma.game.create).not.toHaveBeenCalled();
  });
});

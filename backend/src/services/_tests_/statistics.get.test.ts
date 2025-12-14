// ✅ use __mocks__/prisma.ts
jest.mock("../../utils/prisma");
import request from "supertest";
import { prisma } from "../../utils/prisma";
import { app } from "../../app";

describe("GET /api/statistics", () => {
  it("returns games/users/week/leaderboard from sessions", async () => {
    (prisma.session.findMany as jest.Mock).mockResolvedValue([
      {
        minutes: 30,
        startedAt: new Date(),
        user: { firstName: "Pat", lastName: "One" },
        game: { name: "Minecraft" },
      },
      {
        minutes: 50,
        startedAt: new Date(),
        user: { firstName: "Pat", lastName: "One" },
        game: { name: "Minecraft" },
      },
      {
        minutes: 20,
        startedAt: new Date(),
        user: { firstName: "Alex", lastName: "Two" },
        game: { name: "Fortnite" },
      },
    ]);

    const res = await request(app)
      .get("/api/statistics")
      .set("Authorization", "Bearer test-token");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("games");
    expect(res.body).toHaveProperty("users");
    expect(res.body).toHaveProperty("week");
    expect(res.body).toHaveProperty("leaderboard");

    expect(res.body.games).toEqual(
      expect.arrayContaining([
        { name: "Minecraft", minutes: 80 },
        { name: "Fortnite", minutes: 20 },
      ])
    );

    expect(res.body.users).toEqual(
      expect.arrayContaining([
        { user: "Pat", minutes: 80 },
        { user: "Alex", minutes: 20 },
      ])
    );

    expect(res.body.week).toHaveLength(7);
    expect(res.body.leaderboard[0]).toMatchObject({
      user: "Pat One",
      minutes: 80,
    });
  });
});

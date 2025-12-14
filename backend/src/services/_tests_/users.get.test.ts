// ✅ use __mocks__/prisma.ts
jest.mock("../../utils/prisma");

import request from "supertest";
import { prisma } from "../../utils/prisma";
import { app } from "../../app";

describe("GET /api/users", () => {
  it("returns a list of users", async () => {
    (prisma.user.findMany as jest.Mock).mockResolvedValue([
      {
        id: 1,
        email: "a@test.com",
        firstName: "A",
        lastName: "One",
        profilePic: "/avatars/fox.png",
      },
    ]);

    const res = await request(app)
      .get("/api/users")
      .set("Authorization", "Bearer test-token");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].email).toBe("a@test.com");
  });
});

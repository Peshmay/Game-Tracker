import request from "supertest";
import { app } from "../../app";

describe("Auth middleware (verifyToken)", () => {
  it("rejects without Authorization header", async () => {
    const res = await request(app).get("/api/protected");
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message");
  });

  it("rejects with invalid token", async () => {
    const res = await request(app)
      .get("/api/protected")
      .set("Authorization", "Bearer wrong");

    expect(res.status).toBe(401);
  });

  it("allows with valid token", async () => {
    const res = await request(app)
      .get("/api/protected")
      .set("Authorization", "Bearer test-token");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
  });
});

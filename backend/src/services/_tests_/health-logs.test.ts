import request from "supertest";

jest.mock("../../utils/logger", () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
  },
}));

import { logger } from "../../utils/logger";
import { app } from "../../app";

describe("GET /health logging", () => {
  it("logs 'health check'", async () => {
    await request(app).get("/health");

    expect(logger.info).toHaveBeenCalledWith("health check");
  });
});

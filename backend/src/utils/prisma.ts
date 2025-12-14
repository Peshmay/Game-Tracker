import { PrismaClient } from "@prisma/client";

export const prisma =
  process.env.NODE_ENV === "test"
    ? ({
        // mocked in tests
      } as any)
    : new PrismaClient({
        log: ["warn", "error"],
      });

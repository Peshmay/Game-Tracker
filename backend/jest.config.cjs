module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",

  // You keep tests inside src/**
  roots: ["<rootDir>/src"],

  // Finds: src/**/__tests__/*.test.ts or *.spec.ts
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.ts$",

  moduleFileExtensions: ["ts", "js", "json"],

  clearMocks: true,

  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/*.d.ts",
    "!src/**/__tests__/**",
    "!src/server.ts",
    "!src/index.ts",
    "!src/utils/prisma.ts",
  ],

  coverageThreshold: {
    global: {
      branches: 1,
      functions: 1,
      lines: 1,
      statements: 1,
    },
  },

  // 👇 optional: keep OFF while developing (turn ON later if you want)
  // silent: true,
};

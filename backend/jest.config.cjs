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
      branches: 10,
      functions: 10,
      lines: 10,
      statements: 10,
    },
  },

};

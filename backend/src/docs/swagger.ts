import swaggerJSdoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSdoc({
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Game Tracker API",
      version: "1.0.0",
      description: "Backend API documentation for Game Tracker",
    },
    servers: [{ url: "http://localhost:4000" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Game: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
          },
        },
        User: {
          type: "object",
          properties: {
            id: { type: "integer" },
            email: { type: "string" },
            firstName: { type: "string" },
            lastName: { type: "string" },
            profilePic: { type: "string" },
          },
        },
        Session: {
          type: "object",
          properties: {
            id: { type: "integer" },
            userId: { type: "integer" },
            gameId: { type: "integer" },
            startedAt: { type: "string", format: "date-time" },
            endedAt: { type: "string", format: "date-time", nullable: true },
            minutes: { type: "integer", nullable: true },
          },
        },
        Weather: {
          type: "object",
          properties: {
            city: { type: "string" },
            temp: { type: "number", nullable: true },
            date: { type: "string", format: "date-time" },
          },
        },
        StatisticsResponse: {
          type: "object",
          properties: {
            games: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  minutes: { type: "integer" },
                },
              },
            },
            users: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  user: { type: "string" },
                  minutes: { type: "integer" },
                },
              },
            },
            week: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  day: { type: "string" },
                  minutes: { type: "integer" },
                },
              },
            },
            leaderboard: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  user: { type: "string" },
                  minutes: { type: "integer" },
                },
              },
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            error: { type: "string" },
            message: { type: "string" },
            details: { type: "string" },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"],
});

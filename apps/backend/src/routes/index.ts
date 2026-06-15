import { FastifyInstance } from "fastify";

import { healthController } from "../controllers/health.controller";
import { requireAuth } from "../middlewares/require-auth";
import { parseBody } from "../middlewares/validate-body";
import { loginBodySchema } from "../schemas/auth.schema";
import { echoBodySchema } from "../schemas/echo.schema";

const healthResponseSchema = {
  type: "object",
  properties: {
    status: { type: "string" },
    service: { type: "string" }
  },
  required: ["status", "service"]
} as const;

const rootResponseSchema = {
  type: "object",
  properties: {
    message: { type: "string" }
  },
  required: ["message"]
} as const;

const echoRequestSchema = {
  type: "object",
  properties: {
    message: { type: "string", minLength: 1 }
  },
  required: ["message"]
} as const;

const echoResponseSchema = {
  type: "object",
  properties: {
    message: { type: "string" }
  },
  required: ["message"]
} as const;

const loginRequestSchema = {
  type: "object",
  properties: {
    username: { type: "string" },
    password: { type: "string" }
  },
  required: ["username", "password"]
} as const;

const loginResponseSchema = {
  type: "object",
  properties: {
    token: { type: "string" }
  },
  required: ["token"]
} as const;

const badRequestSchema = {
  type: "object",
  properties: {
    error: {
      anyOf: [
        {
          type: "string"
        },
        {
          type: "array",
          items: {
            type: "object",
            properties: {
              path: { type: "string" },
              message: { type: "string" }
            },
            required: ["path", "message"]
          }
        }
      ]
    }
  },
  required: ["error"]
} as const;

const unauthorizedSchema = {
  type: "object",
  properties: {
    error: { type: "string" }
  },
  required: ["error"]
} as const;

export const registerRoutes = (app: FastifyInstance) => {
  app.get("/", {
    schema: {
      tags: ["health"],
      summary: "Root route",
      response: {
        200: rootResponseSchema
      }
    }
  }, async () => healthController.root());

  app.get("/health", {
    schema: {
      tags: ["health"],
      summary: "Health check",
      response: {
        200: healthResponseSchema
      }
    }
  }, async () => healthController.health());

  app.post("/auth/login", {
    schema: {
      tags: ["auth"],
      summary: "Create JWT token",
      body: loginRequestSchema,
      response: {
        200: loginResponseSchema,
        401: unauthorizedSchema,
        400: badRequestSchema
      }
    }
  }, async (request, reply) => {
    const body = parseBody(loginBodySchema, request.body);
    const validUser = process.env.AUTH_USER || "admin";
    const validPass = process.env.AUTH_PASS || "admin123";

    if (body.username !== validUser || body.password !== validPass) {
      reply.status(401).send({ error: "Invalid credentials" });
      return;
    }

    const token = await reply.jwtSign({ sub: body.username });
    return { token };
  });

  app.post("/echo", {
    preHandler: requireAuth,
    schema: {
      tags: ["utils"],
      summary: "Echo payload message",
      security: [{ bearerAuth: [] }],
      body: echoRequestSchema,
      response: {
        200: echoResponseSchema,
        400: badRequestSchema,
        401: unauthorizedSchema
      }
    }
  }, async (request) => {
    const body = parseBody(echoBodySchema, request.body);
    return healthController.echo(body.message);
  });
};

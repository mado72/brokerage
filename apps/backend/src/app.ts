import Fastify from "fastify";
import cors from "@fastify/cors";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import jwt from "@fastify/jwt";

import { registerErrorHandler } from "./middlewares/error-handler";
import { registerRoutes } from "./routes";

export const buildApp = async () => {
  const app = Fastify({ logger: false });

  await app.register(cors, {
    origin: true
  });

  await app.register(jwt, {
    secret: process.env.JWT_SECRET || "dev_jwt_secret_change_me"
  });

  await app.register(swagger, {
    openapi: {
      info: {
        title: "Arts Backend API",
        description: "Monorepo backend API documentation",
        version: "1.0.0"
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT"
          }
        }
      }
    }
  });

  await app.register(swaggerUI, {
    routePrefix: "/docs"
  });

  registerErrorHandler(app);
  registerRoutes(app);

  return app;
};

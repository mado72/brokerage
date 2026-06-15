import { FastifyError, FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { HttpError } from "../types/http-error";

export const registerErrorHandler = (app: FastifyInstance) => {
  app.setErrorHandler(
    (error: FastifyError | Error, _request: FastifyRequest, reply: FastifyReply) => {
      if (error instanceof HttpError) {
        try {
          const parsedMessage = JSON.parse(error.message);
          reply.status(error.statusCode).send({ error: parsedMessage });
          return;
        } catch {
          reply.status(error.statusCode).send({ error: error.message });
          return;
        }
      }

      reply.status(500).send({ error: "Internal server error" });
    }
  );
};

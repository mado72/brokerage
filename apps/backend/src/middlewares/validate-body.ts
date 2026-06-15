import { AnyZodObject, ZodError, infer as zInfer } from "zod";

import { HttpError } from "../types/http-error";

export const parseBody = <TSchema extends AnyZodObject>(
  schema: TSchema,
  payload: unknown
): zInfer<TSchema> => {
  try {
    return schema.parse(payload);
  } catch (error) {
    if (error instanceof ZodError) {
      const issues = error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message
      }));
      throw new HttpError(400, JSON.stringify(issues));
    }

    throw error;
  }
};

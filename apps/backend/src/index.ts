import dotenv from "dotenv";

import { buildApp } from "./app";

dotenv.config();

const port = Number(process.env.PORT || 3000);

const start = async () => {
  const app = await buildApp();
  try {
    await app.listen({ port, host: "0.0.0.0" });
    console.log(`Backend listening on port ${port}`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

void start();

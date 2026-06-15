import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { buildApp } from "../../src/app";

describe("routes integration", () => {
  let app: Awaited<ReturnType<typeof buildApp>>;

  beforeAll(async () => {
    app = await buildApp();
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("returns health status", async () => {
    const response = await app.inject({ method: "GET", url: "/health" });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ status: "ok", service: "backend" });
  });

  it("rejects login with invalid credentials", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/auth/login",
      payload: { username: "admin", password: "wrong" }
    });

    expect(response.statusCode).toBe(401);
    expect(response.json()).toEqual({ error: "Invalid credentials" });
  });

  it("returns jwt token with valid credentials", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/auth/login",
      payload: { username: "admin", password: "admin123" }
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toHaveProperty("token");
  });

  it("requires auth on /echo", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/echo",
      payload: { message: "hi" }
    });

    expect(response.statusCode).toBe(401);
    expect(response.json()).toEqual({ error: "Unauthorized" });
  });

  it("echoes message when authorized", async () => {
    const loginResponse = await app.inject({
      method: "POST",
      url: "/auth/login",
      payload: { username: "admin", password: "admin123" }
    });

    const { token } = loginResponse.json<{ token: string }>();

    const response = await app.inject({
      method: "POST",
      url: "/echo",
      headers: { Authorization: `Bearer ${token}` },
      payload: { message: "from test" }
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ message: "from test" });
  });
});

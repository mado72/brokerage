import { describe, expect, it } from "vitest";

import { healthService } from "../../src/services/health.service";

describe("healthService", () => {
  it("returns backend root message", () => {
    expect(healthService.getRootMessage()).toEqual({ message: "API backend online" });
  });

  it("returns health status payload", () => {
    expect(healthService.getHealthStatus()).toEqual({ status: "ok", service: "backend" });
  });

  it("echoes the provided message", () => {
    expect(healthService.echo("hello")).toEqual({ message: "hello" });
  });
});

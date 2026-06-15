import { describe, expect, it } from "vitest";

import { colors } from "../../../theme/colors";

describe("theme colors", () => {
  it("exposes required semantic tokens", () => {
    expect(colors).toHaveProperty("bgWarmWhite");
    expect(colors).toHaveProperty("textCharcoal");
    expect(colors).toHaveProperty("accentSand");
  });

  it("keeps color values in hex format", () => {
    expect(colors.bgWarmWhite).toMatch(/^#[0-9a-f]{6}$/i);
    expect(colors.textCharcoal).toMatch(/^#[0-9a-f]{6}$/i);
    expect(colors.errorSoft).toMatch(/^#[0-9a-f]{6}$/i);
  });
});

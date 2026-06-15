import { describe, expect, it } from "vitest";

import {
  formatCapacityValue,
  formatPercentFromFraction,
  getCapacityRatio,
  prospectRankTierLabels,
  prospectingContactStatusLabels
} from "../../../src/utils/activeDealFormatters";

describe("active deal formatters", () => {
  it("formats BRL and percentage capacity values", () => {
    expect(formatCapacityValue(1200000, "BRL")).toMatch(/^R\$\s?1\.200\.000$/);
    expect(formatCapacityValue(58, "PERCENTAGE")).toBe("58%");
  });

  it("formats desagio rate stored as a fraction", () => {
    expect(formatPercentFromFraction(0.15)).toBe("15%");
  });

  it("clamps capacity ratio between zero and one", () => {
    expect(getCapacityRatio(700000, 1200000)).toBeCloseTo(0.5833, 3);
    expect(getCapacityRatio(130, 100)).toBe(1);
    expect(getCapacityRatio(10, 0)).toBe(0);
  });

  it("exposes Portuguese prospecting labels", () => {
    expect(prospectRankTierLabels.PREFERRED).toBe("Preferido");
    expect(prospectingContactStatusLabels.NO_RESPONSE).toBe("Sem retorno");
  });
});

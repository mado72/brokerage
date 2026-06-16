import { describe, expect, it } from "vitest";

import type { ActiveDealSummary, AssetType } from "../../../src/types/activeDeals";
import {
  ALL_ASSET_TYPES,
  ALL_PARTNERS,
  defaultActiveDealFilters,
  filterActiveDeals,
  getAssetTypeFilterOptions,
  getPartnerFilterOptions
} from "../../../src/utils/activeDealFilters";

function makeDeal(overrides: {
  id: string;
  type: AssetType;
  createdAt: string;
  disclosingPartner?: ActiveDealSummary["asset"]["disclosingPartner"];
  restrictedFieldsRedacted?: boolean;
  contacted?: ActiveDealSummary["prospecting"]["contacted"];
}): ActiveDealSummary {
  return {
    asset: {
      id: overrides.id,
      code: overrides.id,
      type: overrides.type,
      grossValue: 100000,
      createdAt: overrides.createdAt,
      capacity: {
        total: 100000,
        allocated: 0,
        remaining: 100000,
        unit: "BRL"
      },
      disclosingPartner: overrides.disclosingPartner ?? null,
      restrictedFieldsRedacted: overrides.restrictedFieldsRedacted ?? false
    },
    prospecting: {
      contacted: overrides.contacted ?? [],
      recommendations: []
    }
  };
}

const deals: ActiveDealSummary[] = [
  makeDeal({
    id: "deal-icms",
    type: "ICMS_EXPORT",
    createdAt: "2026-06-14T13:00:00.000Z",
    disclosingPartner: {
      id: "partner-alpha",
      name: "Alfa Capital"
    },
    contacted: [
      {
        partnerId: "partner-beta",
        partnerName: "Beta Partners",
        status: "INTERESTED",
        sentAt: "2026-06-13T14:20:00.000Z"
      }
    ]
  }),
  makeDeal({
    id: "deal-precatory",
    type: "PRECATORY",
    createdAt: "2026-06-10T16:15:00.000Z",
    disclosingPartner: {
      id: "partner-restricted",
      name: "Origem Restrita"
    },
    restrictedFieldsRedacted: true,
    contacted: [
      {
        partnerId: "partner-delta",
        partnerName: "Delta Jurídico",
        status: "PROSPECTED",
        sentAt: "2026-06-11T12:00:00.000Z"
      }
    ]
  }),
  makeDeal({
    id: "deal-credit-right",
    type: "CREDIT_RIGHT",
    createdAt: "2026-06-08T19:40:00.000Z",
    disclosingPartner: {
      id: "partner-vetor",
      name: "Vetor Originação"
    }
  })
];

describe("active deal filters", () => {
  it("builds asset type options from available deals", () => {
    const options = getAssetTypeFilterOptions(deals);

    expect(options[0]).toEqual({ value: ALL_ASSET_TYPES, label: "Todos os tipos" });
    expect(options.map((option) => option.label)).toEqual([
      "Todos os tipos",
      "Direito creditório",
      "ICMS de exportação",
      "Precatório"
    ]);
  });

  it("builds partner options from disclosing and contacted partners", () => {
    const options = getPartnerFilterOptions(deals);

    expect(options[0]).toEqual({ value: ALL_PARTNERS, label: "Todos os parceiros" });
    expect(options.map((option) => option.label)).toContain("Alfa Capital");
    expect(options.map((option) => option.label)).toContain("Beta Partners");
    expect(options.map((option) => option.label)).toContain("Delta Jurídico");
  });

  it("does not expose redacted disclosing partners as filter options", () => {
    const options = getPartnerFilterOptions(deals);

    expect(options.map((option) => option.label)).not.toContain("Origem Restrita");
  });

  it("filters by asset type", () => {
    const result = filterActiveDeals(deals, {
      ...defaultActiveDealFilters,
      assetType: "ICMS_EXPORT"
    });

    expect(result.map((deal) => deal.asset.id)).toEqual(["deal-icms"]);
  });

  it("filters by disclosing partner", () => {
    const result = filterActiveDeals(deals, {
      ...defaultActiveDealFilters,
      partnerId: "partner-alpha"
    });

    expect(result.map((deal) => deal.asset.id)).toEqual(["deal-icms"]);
  });

  it("filters by prospected partner", () => {
    const result = filterActiveDeals(deals, {
      ...defaultActiveDealFilters,
      partnerId: "partner-delta"
    });

    expect(result.map((deal) => deal.asset.id)).toEqual(["deal-precatory"]);
  });

  it("filters by inclusive asset creation date range", () => {
    const result = filterActiveDeals(deals, {
      ...defaultActiveDealFilters,
      startDate: "10/06/2026",
      endDate: "14/06/2026"
    });

    expect(result.map((deal) => deal.asset.id)).toEqual(["deal-icms", "deal-precatory"]);
  });

  it("composes asset type, partner, and date range filters", () => {
    const result = filterActiveDeals(deals, {
      ...defaultActiveDealFilters,
      assetType: "ICMS_EXPORT",
      partnerId: "partner-beta",
      startDate: "14/06/2026",
      endDate: "14/06/2026"
    });

    expect(result.map((deal) => deal.asset.id)).toEqual(["deal-icms"]);
  });
});

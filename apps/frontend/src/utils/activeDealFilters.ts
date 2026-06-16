import type { ActiveDealSummary, AssetType } from "../types/activeDeals";
import { assetTypeLabels } from "./activeDealFormatters";

export const ALL_ASSET_TYPES = "ALL_ASSET_TYPES";
export const ALL_PARTNERS = "ALL_PARTNERS";

export type AssetTypeFilterValue = AssetType | typeof ALL_ASSET_TYPES;
export type PartnerFilterValue = string | typeof ALL_PARTNERS;

export type ActiveDealFilters = {
  assetType: AssetTypeFilterValue;
  partnerId: PartnerFilterValue;
  startDate: string;
  endDate: string;
};

export type ActiveDealFilterOption<TValue extends string = string> = {
  value: TValue;
  label: string;
};

export const defaultActiveDealFilters: ActiveDealFilters = {
  assetType: ALL_ASSET_TYPES,
  partnerId: ALL_PARTNERS,
  startDate: "",
  endDate: ""
};

const saoPauloDateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "2-digit",
  month: "2-digit",
  timeZone: "America/Sao_Paulo",
  year: "numeric"
});

export function getAssetTypeFilterOptions(
  deals: ActiveDealSummary[]
): ActiveDealFilterOption<AssetTypeFilterValue>[] {
  const assetTypes = Array.from(new Set(deals.map((deal) => deal.asset.type))).sort((left, right) =>
    assetTypeLabels[left].localeCompare(assetTypeLabels[right], "pt-BR")
  );

  return [
    {
      value: ALL_ASSET_TYPES,
      label: "Todos os tipos"
    },
    ...assetTypes.map((assetType) => ({
      value: assetType,
      label: assetTypeLabels[assetType]
    }))
  ];
}

export function getPartnerFilterOptions(
  deals: ActiveDealSummary[]
): ActiveDealFilterOption<PartnerFilterValue>[] {
  const partners = new Map<string, string>();

  for (const deal of deals) {
    if (!deal.asset.restrictedFieldsRedacted && deal.asset.disclosingPartner) {
      partners.set(deal.asset.disclosingPartner.id, deal.asset.disclosingPartner.name);
    }

    for (const partner of deal.prospecting.contacted) {
      partners.set(partner.partnerId, partner.partnerName);
    }
  }

  const partnerOptions = Array.from(partners, ([value, label]) => ({ value, label })).sort((left, right) =>
    left.label.localeCompare(right.label, "pt-BR")
  );

  return [
    {
      value: ALL_PARTNERS,
      label: "Todos os parceiros"
    },
    ...partnerOptions
  ];
}

export function filterActiveDeals(
  deals: ActiveDealSummary[],
  filters: ActiveDealFilters
): ActiveDealSummary[] {
  const startDateKey = parseBrazilianDateInput(filters.startDate);
  const endDateKey = parseBrazilianDateInput(filters.endDate);

  return deals.filter((deal) => {
    if (filters.assetType !== ALL_ASSET_TYPES && deal.asset.type !== filters.assetType) {
      return false;
    }

    if (filters.partnerId !== ALL_PARTNERS && !dealHasPartner(deal, filters.partnerId)) {
      return false;
    }

    const createdAtDateKey = getSaoPauloDateKey(deal.asset.createdAt);

    if (startDateKey && createdAtDateKey < startDateKey) {
      return false;
    }

    if (endDateKey && createdAtDateKey > endDateKey) {
      return false;
    }

    return true;
  });
}

export function hasActiveDealFilters(filters: ActiveDealFilters): boolean {
  return (
    filters.assetType !== ALL_ASSET_TYPES ||
    filters.partnerId !== ALL_PARTNERS ||
    filters.startDate.trim().length > 0 ||
    filters.endDate.trim().length > 0
  );
}

function dealHasPartner(deal: ActiveDealSummary, partnerId: string): boolean {
  const disclosingPartnerMatches =
    !deal.asset.restrictedFieldsRedacted && deal.asset.disclosingPartner?.id === partnerId;
  const contactedPartnerMatches = deal.prospecting.contacted.some((partner) => partner.partnerId === partnerId);

  return disclosingPartnerMatches || contactedPartnerMatches;
}

function getSaoPauloDateKey(value: string): number {
  const parts = saoPauloDateFormatter.formatToParts(new Date(value));
  const day = parts.find((part) => part.type === "day")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const year = parts.find((part) => part.type === "year")?.value;

  return Number(`${year}${month}${day}`);
}

function parseBrazilianDateInput(value: string): number | null {
  const match = value.trim().match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

  if (!match) {
    return null;
  }

  const [, dayValue, monthValue, yearValue] = match;
  const day = Number(dayValue);
  const month = Number(monthValue);
  const year = Number(yearValue);
  const date = new Date(Date.UTC(year, month - 1, day));

  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) {
    return null;
  }

  return year * 10000 + month * 100 + day;
}

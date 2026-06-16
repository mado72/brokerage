import { useMemo, useState } from "react";

import type { ActiveDealSummary } from "../types/activeDeals";
import {
  defaultActiveDealFilters,
  filterActiveDeals,
  getAssetTypeFilterOptions,
  getPartnerFilterOptions,
  hasActiveDealFilters,
  type ActiveDealFilters
} from "../utils/activeDealFilters";

export function useActiveDealFilters(deals: ActiveDealSummary[]) {
  const [filters, setFilters] = useState<ActiveDealFilters>(defaultActiveDealFilters);

  const assetTypeOptions = useMemo(() => getAssetTypeFilterOptions(deals), [deals]);
  const partnerOptions = useMemo(() => getPartnerFilterOptions(deals), [deals]);
  const filteredDeals = useMemo(() => filterActiveDeals(deals, filters), [deals, filters]);
  const hasActiveFilters = useMemo(() => hasActiveDealFilters(filters), [filters]);

  function updateFilters(nextFilters: Partial<ActiveDealFilters>) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      ...nextFilters
    }));
  }

  function resetFilters() {
    setFilters(defaultActiveDealFilters);
  }

  return {
    assetTypeOptions,
    filteredDeals,
    filters,
    hasActiveFilters,
    partnerOptions,
    resetFilters,
    updateFilters
  };
}

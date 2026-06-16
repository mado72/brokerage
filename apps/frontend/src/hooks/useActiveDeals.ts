import { useEffect, useMemo, useState } from "react";

import { listActiveDeals } from "../infrastructure/api/activeDealsApi";
import type { ActiveDealSummary, ActiveDealsDashboardMetric } from "../types/activeDeals";
import { formatCapacityValue } from "../utils/activeDealFormatters";

type ActiveDealsState = {
  deals: ActiveDealSummary[];
  metrics: ActiveDealsDashboardMetric[];
  isLoading: boolean;
  error: string | null;
};

export function useActiveDeals(): ActiveDealsState {
  const [deals, setDeals] = useState<ActiveDealSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadDeals() {
      try {
        const activeDeals = await listActiveDeals();

        if (isMounted) {
          setDeals(activeDeals);
          setError(null);
        }
      } catch {
        if (isMounted) {
          setError("Não foi possível carregar os negócios ativos.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadDeals();

    return () => {
      isMounted = false;
    };
  }, []);

  const metrics = useMemo<ActiveDealsDashboardMetric[]>(() => {
    const allocatedCurrencyDeals = deals.filter((deal) => deal.asset.capacity.unit === "BRL");
    const allocatedCapacity = allocatedCurrencyDeals.reduce(
      (total, deal) => total + deal.asset.capacity.allocated,
      0
    );
    const interestCount = deals.reduce(
      (total, deal) =>
        total + deal.prospecting.contacted.filter((partner) => partner.status === "INTERESTED").length,
      0
    );
    const noResponseCount = deals.reduce(
      (total, deal) =>
        total + deal.prospecting.contacted.filter((partner) => partner.status === "NO_RESPONSE").length,
      0
    );

    return [
      {
        id: "activeAssets",
        label: "Ativos ativos",
        value: String(deals.length),
        helper: "com prospecção em acompanhamento"
      },
      {
        id: "reservedCapacity",
        label: "Capacidade alocada",
        value: formatCapacityValue(allocatedCapacity, "BRL"),
        helper: "em negociações ativas"
      },
      {
        id: "overdueFollowUps",
        label: "Follow-ups vencidos",
        value: String(noResponseCount),
        helper: "parceiros sem retorno"
      },
      {
        id: "stalledNegotiations",
        label: "Negociações paradas",
        value: String(interestCount),
        helper: "interesses aguardando avanço"
      }
    ];
  }, [deals]);

  return {
    deals,
    metrics,
    isLoading,
    error
  };
}

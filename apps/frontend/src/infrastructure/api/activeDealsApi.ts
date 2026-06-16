import type { ActiveDealSummary } from "../../types/activeDeals";

const activeDealSummaries: ActiveDealSummary[] = [
  {
    asset: {
      id: "asset-icms-2026-014",
      code: "ICMS-2026-014",
      description: "Crédito acumulado de ICMS com execução em tranches",
      type: "ICMS_EXPORT",
      grossValue: 1200000,
      createdAt: "2026-06-14T13:00:00.000Z",
      capacity: {
        total: 1200000,
        allocated: 700000,
        remaining: 500000,
        unit: "BRL"
      },
      disclosingPartner: {
        id: "partner-alpha",
        name: "Alfa Capital"
      },
      restrictedFieldsRedacted: false
    },
    commercialSummary: {
      desagioRate: 0.15,
      netValue: 1020000,
      validUntil: "2026-06-28"
    },
    commissionSummary: {
      status: "PROPOSED",
      lineCount: 3
    },
    prospecting: {
      contacted: [
        {
          partnerId: "partner-beta",
          partnerName: "Beta Partners",
          status: "NO_RESPONSE",
          sentAt: "2026-06-12T18:30:00.000Z",
          channel: "WHATSAPP"
        },
        {
          partnerId: "partner-gama",
          partnerName: "Gama Invest",
          status: "INTERESTED",
          sentAt: "2026-06-13T14:20:00.000Z",
          channel: "WHATSAPP"
        }
      ],
      recommendations: [
        {
          partnerId: "partner-omega",
          partnerName: "Omega FIDC",
          prospectingScore: 84,
          prospectRankTier: "PREFERRED"
        },
        {
          partnerId: "partner-norte",
          partnerName: "Norte Capital",
          prospectingScore: 72,
          prospectRankTier: "RECOMMENDED"
        }
      ]
    }
  },
  {
    asset: {
      id: "asset-prec-2026-002",
      code: "PREC-2026-002",
      description: "Precatório estadual com interesse paralelo",
      type: "PRECATORY",
      grossValue: 850000,
      createdAt: "2026-06-10T16:15:00.000Z",
      capacity: {
        total: 100,
        allocated: 40,
        remaining: 60,
        unit: "PERCENTAGE"
      },
      disclosingPartner: null,
      restrictedFieldsRedacted: true
    },
    commercialSummary: {
      desagioRate: 0.22,
      netValue: 663000,
      validUntil: "2026-06-21"
    },
    commissionSummary: {
      status: "AGREED",
      lineCount: 2
    },
    prospecting: {
      contacted: [
        {
          partnerId: "partner-delta",
          partnerName: "Delta Jurídico",
          status: "CONVERTED",
          sentAt: "2026-06-11T12:00:00.000Z",
          channel: "EMAIL"
        },
        {
          partnerId: "partner-serra",
          partnerName: "Serra Asset",
          status: "PROSPECTED",
          sentAt: "2026-06-12T11:10:00.000Z",
          channel: "PHONE"
        }
      ],
      recommendations: [
        {
          partnerId: "partner-matriz",
          partnerName: "Matriz Capital",
          prospectingScore: 58,
          prospectRankTier: "NEUTRAL"
        }
      ]
    }
  },
  {
    asset: {
      id: "asset-cr-2026-031",
      code: "DC-2026-031",
      description: "Direito creditório com capacidade disponível",
      type: "CREDIT_RIGHT",
      grossValue: 430000,
      createdAt: "2026-06-08T19:40:00.000Z",
      capacity: {
        total: 430000,
        allocated: 0,
        remaining: 430000,
        unit: "BRL"
      },
      disclosingPartner: {
        id: "partner-vetor",
        name: "Vetor Originação"
      },
      restrictedFieldsRedacted: false
    },
    prospecting: {
      contacted: [],
      recommendations: [
        {
          partnerId: "partner-lume",
          partnerName: "Lume Investimentos",
          prospectingScore: 81,
          prospectRankTier: "PREFERRED"
        },
        {
          partnerId: "partner-porto",
          partnerName: "Porto Intermediação",
          prospectingScore: 64,
          prospectRankTier: "RECOMMENDED"
        }
      ]
    }
  }
];

export async function listActiveDeals(): Promise<ActiveDealSummary[]> {
  return activeDealSummaries;
}

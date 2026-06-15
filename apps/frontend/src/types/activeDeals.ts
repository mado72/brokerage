export type AssetType = "CREDIT_RIGHT" | "PRECATORY" | "ICMS_EXPORT" | "IPI_CREDIT" | "OTHER";

export type CapacityUnit = "BRL" | "PERCENTAGE";

export type ProspectRankTier = "PREFERRED" | "RECOMMENDED" | "NEUTRAL" | "LOW_PRIORITY";

export type ProspectingContactStatus =
  | "PROSPECTED"
  | "INTERESTED"
  | "NO_RESPONSE"
  | "CONVERTED";

export type ProspectingChannel = "WHATSAPP" | "PHONE" | "EMAIL" | "MEETING" | "OTHER";

export type CommissionStatus = "PROPOSED" | "AGREED";

export type ActiveDealSummary = {
  asset: {
    id: string;
    code?: string;
    description?: string;
    type: AssetType;
    grossValue: number;
    createdAt: string;
    capacity: {
      total: number;
      allocated: number;
      remaining: number;
      unit: CapacityUnit;
    };
    disclosingPartner?: {
      id: string;
      name: string;
    } | null;
    restrictedFieldsRedacted: boolean;
  };
  commercialSummary?: {
    desagioRate?: number;
    netValue?: number;
    validUntil?: string;
  };
  commissionSummary?: {
    status: CommissionStatus;
    lineCount: number;
  };
  prospecting: {
    contacted: ActiveDealContactedPartner[];
    recommendations: ActiveDealRecommendedPartner[];
  };
};

export type ActiveDealContactedPartner = {
  partnerId: string;
  partnerName: string;
  status: ProspectingContactStatus;
  sentAt?: string;
  channel?: ProspectingChannel;
};

export type ActiveDealRecommendedPartner = {
  partnerId: string;
  partnerName: string;
  prospectingScore: number;
  prospectRankTier: ProspectRankTier;
};

export type ActiveDealsDashboardMetric = {
  id: "activeAssets" | "reservedCapacity" | "overdueFollowUps" | "stalledNegotiations";
  label: string;
  value: string;
  helper: string;
};

import type {
  AssetType,
  CapacityUnit,
  CommissionStatus,
  ProspectRankTier,
  ProspectingChannel,
  ProspectingContactStatus
} from "../types/activeDeals";

const brlFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0
});

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  timeZone: "America/Sao_Paulo"
});

export const assetTypeLabels: Record<AssetType, string> = {
  CREDIT_RIGHT: "Direito creditório",
  PRECATORY: "Precatório",
  ICMS_EXPORT: "ICMS de exportação",
  IPI_CREDIT: "Crédito de IPI",
  OTHER: "Outro"
};

export const prospectRankTierLabels: Record<ProspectRankTier, string> = {
  PREFERRED: "Preferido",
  RECOMMENDED: "Recomendado",
  NEUTRAL: "Neutro",
  LOW_PRIORITY: "Baixa prioridade"
};

export const prospectingContactStatusLabels: Record<ProspectingContactStatus, string> = {
  PROSPECTED: "Prospectado",
  INTERESTED: "Com interesse",
  NO_RESPONSE: "Sem retorno",
  CONVERTED: "Convertido"
};

export const commissionStatusLabels: Record<CommissionStatus, string> = {
  PROPOSED: "Proposta",
  AGREED: "Acordada"
};

export const prospectingChannelLabels: Record<ProspectingChannel, string> = {
  WHATSAPP: "WhatsApp",
  PHONE: "Telefone",
  EMAIL: "E-mail",
  MEETING: "Reunião",
  OTHER: "Outro"
};

export function formatCurrency(value: number): string {
  return brlFormatter.format(value);
}

export function formatDate(value: string): string {
  return dateFormatter.format(new Date(value));
}

export function formatPercentFromFraction(value: number): string {
  return `${Math.round(value * 100)}%`;
}

export function formatCapacityValue(value: number, unit: CapacityUnit): string {
  return unit === "BRL" ? formatCurrency(value) : `${Math.round(value)}%`;
}

export function getCapacityRatio(allocated: number, total: number): number {
  if (total <= 0) {
    return 0;
  }

  return Math.min(Math.max(allocated / total, 0), 1);
}

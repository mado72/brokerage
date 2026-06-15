import { StyleSheet, Text, View } from "react-native";

import { colors } from "../../../theme/colors";
import type { ActiveDealSummary } from "../../types/activeDeals";
import {
  assetTypeLabels,
  commissionStatusLabels,
  formatCurrency,
  formatDate,
  formatPercentFromFraction
} from "../../utils/activeDealFormatters";
import { CapacitySummary } from "./CapacitySummary";
import { ProspectingTrail } from "./ProspectingTrail";

type ActiveDealCardProps = {
  deal: ActiveDealSummary;
};

export function ActiveDealCard({ deal }: ActiveDealCardProps) {
  const assetTitle = deal.asset.code || deal.asset.description || "Ativo sem código";
  const disclosingPartner = deal.asset.restrictedFieldsRedacted
    ? "Informação restrita"
    : deal.asset.disclosingPartner?.name || "Parceiro não informado";
  const commercialLabel = deal.commercialSummary?.desagioRate
    ? `Deságio ${formatPercentFromFraction(deal.commercialSummary.desagioRate)}`
    : "Condições comerciais pendentes";
  const netValueLabel = deal.commercialSummary?.netValue
    ? `Líquido ${formatCurrency(deal.commercialSummary.netValue)}`
    : null;
  const commissionLabel = deal.commissionSummary
    ? `${commissionStatusLabels[deal.commissionSummary.status]} | Escritório + ${
        Math.max(deal.commissionSummary.lineCount - 1, 0)
      } parceiro(s)`
    : "Comissão pendente";

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleGroup}>
          <Text style={styles.assetCode}>{assetTitle}</Text>
          <Text style={styles.assetType}>{assetTypeLabels[deal.asset.type]}</Text>
        </View>
        <View style={styles.valuePill}>
          <Text style={styles.valueLabel}>Valor bruto</Text>
          <Text style={styles.valueText}>{formatCurrency(deal.asset.grossValue)}</Text>
        </View>
      </View>

      <View style={styles.metaGrid}>
        <View style={styles.metaBlock}>
          <Text style={styles.metaLabel}>Parceiro divulgador</Text>
          <Text style={styles.metaValue}>{disclosingPartner}</Text>
          {deal.asset.restrictedFieldsRedacted ? (
            <Text style={styles.restrictedHelper}>Você não tem permissão para visualizar esta informação.</Text>
          ) : null}
        </View>
        <View style={styles.metaBlock}>
          <Text style={styles.metaLabel}>Registrado em</Text>
          <Text style={styles.metaValue}>{formatDate(deal.asset.createdAt)}</Text>
        </View>
      </View>

      <CapacitySummary capacity={deal.asset.capacity} />

      <View style={styles.summaryGrid}>
        <View style={styles.summaryBlock}>
          <Text style={styles.metaLabel}>Comercial</Text>
          <Text style={styles.metaValue}>{commercialLabel}</Text>
          {netValueLabel ? <Text style={styles.summaryHelper}>{netValueLabel}</Text> : null}
        </View>
        <View style={styles.summaryBlock}>
          <Text style={styles.metaLabel}>Comissionamento</Text>
          <Text style={styles.metaValue}>{commissionLabel}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <ProspectingTrail prospecting={deal.prospecting} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.borderSoft,
    borderRadius: 22,
    borderWidth: 1,
    gap: 18,
    padding: 18
  },
  header: {
    alignItems: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
    justifyContent: "space-between"
  },
  titleGroup: {
    flex: 1,
    minWidth: 190
  },
  assetCode: {
    color: colors.textCharcoal,
    fontSize: 21,
    fontWeight: "700",
    lineHeight: 26,
    marginBottom: 5
  },
  assetType: {
    color: colors.textMutedBrown,
    fontSize: 13,
    fontWeight: "600"
  },
  valuePill: {
    alignItems: "flex-start",
    backgroundColor: colors.bgWarmWhite,
    borderColor: colors.borderSoft,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  valueLabel: {
    color: colors.textMutedBrown,
    fontSize: 11,
    fontWeight: "600",
    marginBottom: 3
  },
  valueText: {
    color: colors.textCharcoal,
    fontSize: 15,
    fontWeight: "700"
  },
  metaGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12
  },
  metaBlock: {
    flex: 1,
    minWidth: 180
  },
  metaLabel: {
    color: colors.textMutedBrown,
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 5
  },
  metaValue: {
    color: colors.textCharcoal,
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 19
  },
  restrictedHelper: {
    color: colors.textMutedBrown,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 4
  },
  summaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12
  },
  summaryBlock: {
    backgroundColor: colors.bgWarmWhite,
    borderColor: colors.borderSoft,
    borderRadius: 16,
    borderWidth: 1,
    flex: 1,
    minWidth: 180,
    padding: 12
  },
  summaryHelper: {
    color: colors.textMutedBrown,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 4
  },
  divider: {
    backgroundColor: colors.borderSoft,
    height: 1
  }
});

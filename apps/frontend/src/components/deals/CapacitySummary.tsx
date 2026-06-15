import { StyleSheet, Text, View } from "react-native";

import { colors } from "../../../theme/colors";
import type { ActiveDealSummary } from "../../types/activeDeals";
import { formatCapacityValue, getCapacityRatio } from "../../utils/activeDealFormatters";

type CapacitySummaryProps = {
  capacity: ActiveDealSummary["asset"]["capacity"];
};

export function CapacitySummary({ capacity }: CapacitySummaryProps) {
  const ratio = getCapacityRatio(capacity.allocated, capacity.total);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>Capacidade</Text>
        <Text style={styles.ratio}>{Math.round(ratio * 100)}% alocada</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${ratio * 100}%` }]} />
      </View>
      <View style={styles.values}>
        <Text style={styles.value}>Total {formatCapacityValue(capacity.total, capacity.unit)}</Text>
        <Text style={styles.value}>Alocado {formatCapacityValue(capacity.allocated, capacity.unit)}</Text>
        <Text style={styles.value}>Disponível {formatCapacityValue(capacity.remaining, capacity.unit)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  label: {
    color: colors.textCharcoal,
    fontSize: 13,
    fontWeight: "700"
  },
  ratio: {
    color: colors.textMutedBrown,
    fontSize: 12,
    fontWeight: "600"
  },
  track: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 999,
    height: 8,
    overflow: "hidden"
  },
  fill: {
    backgroundColor: colors.accentSand,
    borderRadius: 999,
    height: "100%"
  },
  values: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8
  },
  value: {
    color: colors.textMutedBrown,
    fontSize: 12,
    lineHeight: 16
  }
});

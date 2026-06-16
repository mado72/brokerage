import { StyleSheet, Text, View } from "react-native";

import { colors } from "../../../theme/colors";
import type { ActiveDealsDashboardMetric } from "../../types/activeDeals";

type MetricCardProps = {
  metric: ActiveDealsDashboardMetric;
};

export function MetricCard({ metric }: MetricCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{metric.label}</Text>
      <Text style={styles.value}>{metric.value}</Text>
      <Text style={styles.helper}>{metric.helper}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexBasis: "48%",
    flexGrow: 1,
    minWidth: 148,
    backgroundColor: colors.surface,
    borderColor: colors.borderSoft,
    borderRadius: 16,
    borderWidth: 1,
    padding: 14
  },
  label: {
    color: colors.textMutedBrown,
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 8
  },
  value: {
    color: colors.textCharcoal,
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 4
  },
  helper: {
    color: colors.textMutedBrown,
    fontSize: 12,
    lineHeight: 16
  }
});

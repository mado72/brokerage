import { ScrollView, StyleSheet, Text, View } from "react-native";

import { colors } from "../../../theme/colors";
import type { ActiveDealSummary } from "../../types/activeDeals";
import {
  formatDate,
  prospectRankTierLabels,
  prospectingChannelLabels,
  prospectingContactStatusLabels
} from "../../utils/activeDealFormatters";

type ProspectingTrailProps = {
  prospecting: ActiveDealSummary["prospecting"];
};

export function ProspectingTrail({ prospecting }: ProspectingTrailProps) {
  return (
    <View style={styles.container}>
      <View style={styles.group}>
        <Text style={styles.groupTitle}>Prospectados</Text>
        {prospecting.contacted.length > 0 ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
            {prospecting.contacted.map((partner) => (
              <View key={partner.partnerId} style={styles.contactChip}>
                <Text style={styles.partnerName}>{partner.partnerName}</Text>
                <Text style={styles.partnerMeta}>
                  {partner.channel ? `${prospectingChannelLabels[partner.channel]} | ` : ""}
                  {partner.sentAt ? `${formatDate(partner.sentAt)} | ` : ""}
                  {prospectingContactStatusLabels[partner.status]}
                </Text>
              </View>
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.emptyText}>Nenhum parceiro foi prospectado para este ativo.</Text>
        )}
      </View>

      <View style={styles.group}>
        <Text style={styles.groupTitle}>Recomendados para próxima abordagem</Text>
        {prospecting.recommendations.length > 0 ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
            {prospecting.recommendations.map((partner) => (
              <View key={partner.partnerId} style={styles.recommendationChip}>
                <Text style={styles.partnerName}>{partner.partnerName}</Text>
                <Text style={styles.partnerMeta}>
                  {prospectRankTierLabels[partner.prospectRankTier]} | Score {partner.prospectingScore}
                </Text>
              </View>
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.emptyText}>Nenhum parceiro elegível para prospecção.</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 14
  },
  group: {
    gap: 8
  },
  groupTitle: {
    color: colors.textCharcoal,
    fontSize: 13,
    fontWeight: "700"
  },
  chipRow: {
    gap: 8,
    paddingRight: 4
  },
  contactChip: {
    backgroundColor: colors.surfaceAlt,
    borderColor: colors.borderSoft,
    borderRadius: 14,
    borderWidth: 1,
    minWidth: 168,
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  recommendationChip: {
    backgroundColor: colors.bgParchment,
    borderColor: colors.borderSoft,
    borderRadius: 14,
    borderWidth: 1,
    minWidth: 168,
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  partnerName: {
    color: colors.textCharcoal,
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 4
  },
  partnerMeta: {
    color: colors.textMutedBrown,
    fontSize: 12,
    lineHeight: 16
  },
  emptyText: {
    color: colors.textMutedBrown,
    fontSize: 12,
    lineHeight: 18
  }
});

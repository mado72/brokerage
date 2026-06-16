import { ScrollView, StyleSheet, Text, View } from "react-native";

import { colors } from "../../../../theme/colors";
import { FilterChip } from "./FilterChip";

const statusFilters = ["Todos", "Com interesse", "Com proposta", "Com comissão", "Sem retorno", "Capacidade disponível"];
const activeStatusFilter = statusFilters[0];

export function StatusFilter() {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Status</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.optionRow}>
        {statusFilters.map((filter) => (
          <FilterChip key={filter} label={filter} isActive={filter === activeStatusFilter} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8
  },
  label: {
    color: colors.textMutedBrown,
    fontSize: 12,
    fontWeight: "700"
  },
  optionRow: {
    gap: 8,
    paddingRight: 4
  }
});

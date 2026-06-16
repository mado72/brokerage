import { ScrollView, StyleSheet, Text, View } from "react-native";

import { colors } from "../../../../theme/colors";
import type { ActiveDealFilterOption, AssetTypeFilterValue } from "../../../utils/activeDealFilters";
import { FilterChip } from "./FilterChip";

type AssetTypeFilterProps = {
  options: ActiveDealFilterOption<AssetTypeFilterValue>[];
  value: AssetTypeFilterValue;
  onChange: (value: AssetTypeFilterValue) => void;
};

export function AssetTypeFilter({ options, value, onChange }: AssetTypeFilterProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tipo de ativo</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.optionRow}>
        {options.map((option) => (
          <FilterChip
            key={option.value}
            label={option.label}
            isActive={option.value === value}
            onPress={() => onChange(option.value)}
          />
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

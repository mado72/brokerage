import { ScrollView, StyleSheet, Text, View } from "react-native";

import { colors } from "../../../../theme/colors";
import type { ActiveDealFilterOption, PartnerFilterValue } from "../../../utils/activeDealFilters";
import { FilterChip } from "./FilterChip";

type PartnerFilterProps = {
  options: ActiveDealFilterOption<PartnerFilterValue>[];
  value: PartnerFilterValue;
  onChange: (value: PartnerFilterValue) => void;
};

export function PartnerFilter({ options, value, onChange }: PartnerFilterProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Parceiro</Text>
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

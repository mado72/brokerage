import { StyleSheet, Text, TextInput, View } from "react-native";

import { colors } from "../../../../theme/colors";

type DateRangeFilterProps = {
  startDate: string;
  endDate: string;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
};

export function DateRangeFilter({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange
}: DateRangeFilterProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Cadastro do ativo</Text>
      <View style={styles.inputRow}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Data inicial</Text>
          <TextInput
            keyboardType="numbers-and-punctuation"
            maxLength={10}
            onChangeText={onStartDateChange}
            placeholder="DD/MM/AAAA"
            placeholderTextColor={colors.textMutedBrown}
            style={styles.input}
            value={startDate}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Data final</Text>
          <TextInput
            keyboardType="numbers-and-punctuation"
            maxLength={10}
            onChangeText={onEndDateChange}
            placeholder="DD/MM/AAAA"
            placeholderTextColor={colors.textMutedBrown}
            style={styles.input}
            value={endDate}
          />
        </View>
      </View>
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
  inputRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10
  },
  inputGroup: {
    flex: 1,
    minWidth: 150
  },
  inputLabel: {
    color: colors.textMutedBrown,
    fontSize: 11,
    fontWeight: "600",
    marginBottom: 5
  },
  input: {
    backgroundColor: colors.surface,
    borderColor: colors.borderSoft,
    borderRadius: 14,
    borderWidth: 1,
    color: colors.textCharcoal,
    fontSize: 14,
    minHeight: 44,
    paddingHorizontal: 12,
    paddingVertical: 10
  }
});

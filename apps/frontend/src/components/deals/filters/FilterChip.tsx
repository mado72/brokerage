import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "../../../../theme/colors";

type FilterChipProps = {
  label: string;
  isActive: boolean;
  onPress?: () => void;
};

export function FilterChip({ label, isActive, onPress }: FilterChipProps) {
  const content = <Text style={[styles.text, isActive && styles.activeText]}>{label}</Text>;

  if (!onPress) {
    return <View style={[styles.chip, isActive && styles.activeChip]}>{content}</View>;
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: isActive }}
      onPress={onPress}
      style={[styles.chip, isActive && styles.activeChip]}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: colors.surface,
    borderColor: colors.borderSoft,
    borderRadius: 999,
    borderWidth: 1,
    minHeight: 44,
    paddingHorizontal: 14,
    paddingVertical: 10
  },
  activeChip: {
    backgroundColor: colors.accentSand
  },
  text: {
    color: colors.textMutedBrown,
    fontSize: 13,
    fontWeight: "600"
  },
  activeText: {
    color: colors.textCharcoal
  }
});

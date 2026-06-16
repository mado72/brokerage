import { StatusBar } from "expo-status-bar";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

import { colors } from "../../theme/colors";
import { ActiveDealCard } from "../components/deals/ActiveDealCard";
import { AssetTypeFilter } from "../components/deals/filters/AssetTypeFilter";
import { DateRangeFilter } from "../components/deals/filters/DateRangeFilter";
import { PartnerFilter } from "../components/deals/filters/PartnerFilter";
import { MetricCard } from "../components/deals/MetricCard";
import { useActiveDealFilters } from "../hooks/useActiveDealFilters";
import { useActiveDeals } from "../hooks/useActiveDeals";

const statusFilters = ["Todos", "Com interesse", "Com proposta", "Com comissão", "Sem retorno", "Capacidade disponível"];

export function ActiveDealsScreen() {
  const { deals, metrics, isLoading, error } = useActiveDeals();
  const {
    assetTypeOptions,
    filteredDeals,
    filters,
    hasActiveFilters,
    partnerOptions,
    resetFilters,
    updateFilters
  } = useActiveDealFilters(deals);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>Início</Text>
          <Text style={styles.title}>Negócios ativos</Text>
          <Text style={styles.subtitle}>
            Acompanhe ativos, parceiros prospectados, condições comerciais e comissões em andamento.
          </Text>
        </View>

        <View style={styles.metricsGrid}>
          {metrics.map((metric) => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </View>

        <View style={styles.controls}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
            {statusFilters.map((filter, index) => (
              <View key={filter} style={[styles.filterChip, index === 0 && styles.activeFilterChip]}>
                <Text style={[styles.filterText, index === 0 && styles.activeFilterText]}>{filter}</Text>
              </View>
            ))}
          </ScrollView>
          <View style={styles.advancedFilters}>
            <AssetTypeFilter
              options={assetTypeOptions}
              value={filters.assetType}
              onChange={(assetType) => updateFilters({ assetType })}
            />
            <PartnerFilter
              options={partnerOptions}
              value={filters.partnerId}
              onChange={(partnerId) => updateFilters({ partnerId })}
            />
            <DateRangeFilter
              startDate={filters.startDate}
              endDate={filters.endDate}
              onStartDateChange={(startDate) => updateFilters({ startDate })}
              onEndDateChange={(endDate) => updateFilters({ endDate })}
            />
          </View>
          <View style={styles.controlFooter}>
            <Text style={styles.sortLabel}>
              Ordenação: Mais recentes | Exibindo {filteredDeals.length} de {deals.length}
            </Text>
            {hasActiveFilters ? (
              <Pressable accessibilityRole="button" onPress={resetFilters} style={styles.clearFiltersButton}>
                <Text style={styles.clearFiltersText}>Limpar filtros</Text>
              </Pressable>
            ) : null}
          </View>
        </View>

        {isLoading ? (
          <View style={styles.stateCard}>
            <Text style={styles.stateTitle}>Carregando negócios ativos...</Text>
            <Text style={styles.stateText}>Preparando a visão de ativos e prospecções do escritório.</Text>
          </View>
        ) : null}

        {!isLoading && error ? (
          <View style={styles.stateCard}>
            <Text style={styles.stateTitle}>Não foi possível carregar</Text>
            <Text style={styles.stateText}>{error}</Text>
            <Text style={styles.stateAction}>Tentar novamente</Text>
          </View>
        ) : null}

        {!isLoading && !error && deals.length === 0 ? (
          <View style={styles.stateCard}>
            <Text style={styles.stateTitle}>Nenhum negócio ativo encontrado.</Text>
            <Text style={styles.stateText}>Cadastre um ativo para iniciar prospecção e negociação.</Text>
            <Text style={styles.stateAction}>Cadastrar ativo</Text>
          </View>
        ) : null}

        {!isLoading && !error && deals.length > 0 && filteredDeals.length === 0 ? (
          <View style={styles.stateCard}>
            <Text style={styles.stateTitle}>Nenhum negócio encontrado com os filtros selecionados.</Text>
            <Text style={styles.stateText}>Ajuste os filtros para ampliar a lista de negócios ativos.</Text>
            <Pressable accessibilityRole="button" onPress={resetFilters}>
              <Text style={styles.stateAction}>Limpar filtros</Text>
            </Pressable>
          </View>
        ) : null}

        {!isLoading && !error && filteredDeals.length > 0 ? (
          <View style={styles.dealList}>
            {filteredDeals.map((deal) => (
              <ActiveDealCard key={deal.asset.id} deal={deal} />
            ))}
          </View>
        ) : null}
      </ScrollView>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.bgWarmWhite,
    flex: 1
  },
  container: {
    gap: 22,
    padding: 20,
    paddingBottom: 40
  },
  header: {
    maxWidth: 760
  },
  eyebrow: {
    color: colors.textMutedBrown,
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 8
  },
  title: {
    color: colors.textCharcoal,
    fontSize: 32,
    fontWeight: "700",
    letterSpacing: -0.4,
    lineHeight: 38,
    marginBottom: 8
  },
  subtitle: {
    color: colors.textMutedBrown,
    fontSize: 15,
    lineHeight: 22
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12
  },
  controls: {
    gap: 12
  },
  advancedFilters: {
    gap: 14
  },
  controlFooter: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "space-between"
  },
  filterRow: {
    gap: 8,
    paddingRight: 4
  },
  filterChip: {
    backgroundColor: colors.surface,
    borderColor: colors.borderSoft,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 9
  },
  activeFilterChip: {
    backgroundColor: colors.accentSand
  },
  filterText: {
    color: colors.textMutedBrown,
    fontSize: 13,
    fontWeight: "600"
  },
  activeFilterText: {
    color: colors.textCharcoal
  },
  sortLabel: {
    color: colors.textMutedBrown,
    fontSize: 13,
    fontWeight: "600"
  },
  clearFiltersButton: {
    backgroundColor: colors.surface,
    borderColor: colors.borderSoft,
    borderRadius: 999,
    borderWidth: 1,
    minHeight: 40,
    paddingHorizontal: 13,
    paddingVertical: 9
  },
  clearFiltersText: {
    color: colors.textCharcoal,
    fontSize: 13,
    fontWeight: "700"
  },
  stateCard: {
    backgroundColor: colors.surface,
    borderColor: colors.borderSoft,
    borderRadius: 20,
    borderWidth: 1,
    padding: 18
  },
  stateTitle: {
    color: colors.textCharcoal,
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 6
  },
  stateText: {
    color: colors.textMutedBrown,
    fontSize: 14,
    lineHeight: 20
  },
  stateAction: {
    color: colors.textCharcoal,
    fontSize: 14,
    fontWeight: "700",
    marginTop: 14
  },
  dealList: {
    gap: 16
  }
});

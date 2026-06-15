import { StatusBar } from "expo-status-bar";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

import { colors } from "../../theme/colors";
import { ActiveDealCard } from "../components/deals/ActiveDealCard";
import { MetricCard } from "../components/deals/MetricCard";
import { useActiveDeals } from "../hooks/useActiveDeals";

const filters = ["Todos", "Com interesse", "Com proposta", "Com comissão", "Sem retorno", "Capacidade disponível"];

export function ActiveDealsScreen() {
  const { deals, metrics, isLoading, error } = useActiveDeals();

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
            {filters.map((filter, index) => (
              <View key={filter} style={[styles.filterChip, index === 0 && styles.activeFilterChip]}>
                <Text style={[styles.filterText, index === 0 && styles.activeFilterText]}>{filter}</Text>
              </View>
            ))}
          </ScrollView>
          <Text style={styles.sortLabel}>Ordenação: Mais recentes</Text>
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

        {!isLoading && !error && deals.length > 0 ? (
          <View style={styles.dealList}>
            {deals.map((deal) => (
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

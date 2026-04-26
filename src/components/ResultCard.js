import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { formatBRL } from '../utils/formatters';

export default function ResultCard({ result, dismissalType }) {
  if (!result) return null;

  const rows = [
    { label: 'Saldo de salário', value: result.saldo },
    { label: '13º proporcional', value: result.decimoTerceiro },
    { label: 'Férias proporcionais + 1/3', value: result.ferias },
    { label: 'FGTS acumulado (na Caixa)', value: result.fgts, info: true },
  ];

  if (result.multaFgts > 0) {
    rows.push({ label: 'Multa de 40% do FGTS', value: result.multaFgts });
  }

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Resultado estimado</Text>

      {rows.map((row) => (
        <View key={row.label} style={styles.row}>
          <Text style={[styles.rowLabel, row.info && styles.rowInfo]}>
            {row.label}
          </Text>
          <Text style={[styles.rowValue, row.info && styles.rowInfo]}>
            {formatBRL(row.value)}
          </Text>
        </View>
      ))}

      <View style={styles.divider} />

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total da rescisão</Text>
        <Text style={styles.totalValue}>{formatBRL(result.total)}</Text>
      </View>

      <Text style={styles.disclaimer}>
        * Valores aproximados, sem caráter jurídico. O FGTS acumulado fica na
        Caixa e não é pago direto pelo empregador na rescisão.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    marginTop: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  rowLabel: { fontSize: 15, color: colors.textPrimary },
  rowValue: { fontSize: 15, color: colors.textPrimary, fontWeight: '600' },
  rowInfo: { color: colors.textSecondary, fontStyle: 'italic' },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    marginTop: 4,
  },
  totalLabel: { color: '#fff', fontSize: 16, fontWeight: '700' },
  totalValue: { color: '#fff', fontSize: 22, fontWeight: '800' },
  disclaimer: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 14,
    lineHeight: 16,
  },
});

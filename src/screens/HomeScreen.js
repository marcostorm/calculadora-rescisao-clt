// Tela principal — única tela do app.
// Reúne inputs, seleção do tipo de rescisão, botão de calcular e resultado.

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import InputField from '../components/InputField';
import DateInput from '../components/DateInput';
import PrimaryButton from '../components/PrimaryButton';
import ResultCard from '../components/ResultCard';
import AdBanner from '../components/AdBanner';

import { useInterstitialAd } from '../hooks/useInterstitialAd';
import { calculateRescision, DISMISSAL_TYPES } from '../utils/calculations';
import { maskCurrency, parseBRLInput } from '../utils/formatters';
import { colors } from '../theme/colors';

export default function HomeScreen() {
  const [salary, setSalary] = useState('');
  const [admission, setAdmission] = useState(null);
  const [dismissal, setDismissal] = useState(null);
  const [type, setType] = useState(DISMISSAL_TYPES.SEM_JUSTA_CAUSA);
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  const { show: showInterstitial } = useInterstitialAd();

  // Validação simples dos campos antes de calcular
  function validate() {
    const e = {};
    const salaryValue = parseBRLInput(salary);
    if (!salaryValue || salaryValue <= 0) e.salary = 'Informe o salário';
    if (!admission) e.admission = 'Informe a data de admissão';
    if (!dismissal) e.dismissal = 'Informe a data de desligamento';
    if (admission && dismissal && dismissal < admission)
      e.dismissal = 'A data de desligamento deve ser após a admissão';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleCalculate() {
    Keyboard.dismiss();
    if (!validate()) return;

    const r = calculateRescision({
      salary: parseBRLInput(salary),
      admission,
      dismissal,
      type,
    });
    setResult(r);

    // Exibe intersticial após calcular (só faz efeito em build nativo)
    showInterstitial();
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{ flex: 1 }}>
            <ScrollView
              contentContainerStyle={styles.content}
              keyboardShouldPersistTaps="handled"
            >
              <Text style={styles.title}>Calculadora de Rescisão</Text>
              <Text style={styles.subtitle}>CLT • Brasil</Text>

              <InputField
                label="Salário bruto mensal"
                value={salary ? maskCurrency(salary) : ''}
                onChangeText={(t) => setSalary(t)}
                placeholder="R$ 0,00"
                keyboardType="numeric"
                error={errors.salary}
              />

              <DateInput
                label="Data de admissão"
                value={admission}
                onChange={setAdmission}
                error={errors.admission}
              />

              <DateInput
                label="Data de desligamento"
                value={dismissal}
                onChange={setDismissal}
                error={errors.dismissal}
              />

              <Text style={styles.sectionLabel}>Tipo de rescisão</Text>
              <View style={styles.typeRow}>
                <TypeOption
                  label="Sem justa causa"
                  selected={type === DISMISSAL_TYPES.SEM_JUSTA_CAUSA}
                  onPress={() => setType(DISMISSAL_TYPES.SEM_JUSTA_CAUSA)}
                />
                <TypeOption
                  label="Pedido de demissão"
                  selected={type === DISMISSAL_TYPES.PEDIDO_DEMISSAO}
                  onPress={() => setType(DISMISSAL_TYPES.PEDIDO_DEMISSAO)}
                />
              </View>

              <PrimaryButton title="Calcular" onPress={handleCalculate} />

              <ResultCard result={result} dismissalType={type} />
            </ScrollView>

            <AdBanner />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Botão de seleção de tipo (segmented)
function TypeOption({ label, selected, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.typeOption, selected && styles.typeOptionSelected]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.typeText, selected && styles.typeTextSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingBottom: 40 },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.primary,
    marginTop: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 8,
    marginTop: 4,
  },
  typeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  typeOption: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  typeOptionSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  typeText: { color: colors.textPrimary, fontWeight: '600', fontSize: 14 },
  typeTextSelected: { color: '#FFFFFF' },
});

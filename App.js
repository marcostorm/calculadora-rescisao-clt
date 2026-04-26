// Entry point do app.
// Mantém tudo simples: SafeAreaProvider + StatusBar + tela principal.

import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Constants from 'expo-constants';

import HomeScreen from './src/screens/HomeScreen';

// Inicializa o SDK do AdMob (apenas em build nativo).
const isExpoGo = Constants.appOwnership === 'expo';
let mobileAds = null;
if (!isExpoGo) {
  try {
    mobileAds = require('react-native-google-mobile-ads').default;
  } catch (e) {
    // Sem módulo nativo → ignora
  }
}

export default function App() {
  useEffect(() => {
    if (mobileAds) {
      mobileAds()
        .initialize()
        .catch(() => {});
    }
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <HomeScreen />
    </SafeAreaProvider>
  );
}

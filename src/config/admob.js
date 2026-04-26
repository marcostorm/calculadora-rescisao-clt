// ============================================================
// CONFIGURAÇÃO DO GOOGLE ADMOB
// ============================================================
// Em DEV: usa IDs de teste do Google (seguros, não geram receita
// nem violam políticas do AdMob).
// Em produção: usa os IDs reais cadastrados no painel do AdMob
// (Publisher ID: pub-8851204005683746).
// https://admob.google.com/
// ------------------------------------------------------------

import { Platform } from 'react-native';

// 👉 Banner — ID DA UNIDADE DE ANÚNCIO
const BANNER_AD_UNIT = Platform.select({
  android: __DEV__
    ? 'ca-app-pub-3940256099942544/6300978111' // Banner de teste (Android)
    : 'ca-app-pub-8851204005683746/8724918423', // Banner real (Android)
  ios: __DEV__
    ? 'ca-app-pub-3940256099942544/2934735716' // Banner de teste (iOS)
    : 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX', // <-- TROCAR se publicar iOS
});

// 👉 Intersticial — ID DA UNIDADE DE ANÚNCIO
const INTERSTITIAL_AD_UNIT = Platform.select({
  android: __DEV__
    ? 'ca-app-pub-3940256099942544/1033173712' // Intersticial de teste (Android)
    : 'ca-app-pub-8851204005683746/9535122581', // Intersticial real (Android)
  ios: __DEV__
    ? 'ca-app-pub-3940256099942544/4411468910' // Intersticial de teste (iOS)
    : 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX', // <-- TROCAR se publicar iOS
});

export const ADMOB = {
  bannerUnitId: BANNER_AD_UNIT,
  interstitialUnitId: INTERSTITIAL_AD_UNIT,
};

// ============================================================
// CONFIGURAÇÃO DO GOOGLE ADMOB
// ============================================================
// IDs de teste do Google (seguros para usar em desenvolvimento).
// Quando publicar, troque pelos IDs reais criados no painel do AdMob.
// https://admob.google.com/
// ------------------------------------------------------------

import { Platform } from 'react-native';

// ⚠️ ID do APP (vai em app.json -> plugins -> react-native-google-mobile-ads)
// Android teste:  ca-app-pub-3940256099942544~3347511713
// iOS teste:      ca-app-pub-3940256099942544~1458002511

// 👉 Banner — ID DA UNIDADE DE ANÚNCIO
const BANNER_AD_UNIT = Platform.select({
  android: __DEV__
    ? 'ca-app-pub-3940256099942544/6300978111' // Banner de teste (Android)
    : 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX', // <-- TROCAR pelo seu ID real
  ios: __DEV__
    ? 'ca-app-pub-3940256099942544/2934735716' // Banner de teste (iOS)
    : 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX', // <-- TROCAR pelo seu ID real
});

// 👉 Intersticial — ID DA UNIDADE DE ANÚNCIO
const INTERSTITIAL_AD_UNIT = Platform.select({
  android: __DEV__
    ? 'ca-app-pub-3940256099942544/1033173712' // Intersticial de teste (Android)
    : 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX', // <-- TROCAR pelo seu ID real
  ios: __DEV__
    ? 'ca-app-pub-3940256099942544/4411468910' // Intersticial de teste (iOS)
    : 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX', // <-- TROCAR pelo seu ID real
});

export const ADMOB = {
  bannerUnitId: BANNER_AD_UNIT,
  interstitialUnitId: INTERSTITIAL_AD_UNIT,
};

// Banner do AdMob com fallback visual quando rodando em Expo Go.
// Em Expo Go o módulo nativo não existe → mostramos um placeholder.
// No build nativo (prebuild + expo run:android) o banner real é exibido.

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { colors } from '../theme/colors';
import { ADMOB } from '../config/admob';

const isExpoGo = Constants.appOwnership === 'expo';

let BannerAd = null;
let BannerAdSize = null;

if (!isExpoGo) {
  try {
    const ads = require('react-native-google-mobile-ads');
    BannerAd = ads.BannerAd;
    BannerAdSize = ads.BannerAdSize;
  } catch (e) {
    // Pacote não instalado ou build sem suporte → cai no placeholder
  }
}

export default function AdBanner() {
  if (!BannerAd) {
    return (
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>
          [ Banner AdMob aparece aqui em build nativo ]
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BannerAd
        unitId={ADMOB.bannerUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{ requestNonPersonalizedAdsOnly: true }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
  placeholder: {
    width: '100%',
    height: 60,
    backgroundColor: '#EDEDED',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  placeholderText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});

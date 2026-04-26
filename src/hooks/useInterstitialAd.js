// Hook para exibir um anúncio intersticial.
// Em Expo Go ele simplesmente não faz nada (não há módulo nativo).
// No build nativo, carrega e mostra o anúncio quando `show()` é chamado.

import { useEffect, useRef, useCallback } from 'react';
import Constants from 'expo-constants';
import { ADMOB } from '../config/admob';

const isExpoGo = Constants.appOwnership === 'expo';

let InterstitialAd = null;
let AdEventType = null;

if (!isExpoGo) {
  try {
    const ads = require('react-native-google-mobile-ads');
    InterstitialAd = ads.InterstitialAd;
    AdEventType = ads.AdEventType;
  } catch (e) {
    // Sem módulo nativo → no-op
  }
}

export function useInterstitialAd() {
  const adRef = useRef(null);
  const loadedRef = useRef(false);

  const load = useCallback(() => {
    if (!InterstitialAd) return;
    const ad = InterstitialAd.createForAdRequest(ADMOB.interstitialUnitId, {
      requestNonPersonalizedAdsOnly: true,
    });

    ad.addAdEventListener(AdEventType.LOADED, () => {
      loadedRef.current = true;
    });
    ad.addAdEventListener(AdEventType.CLOSED, () => {
      loadedRef.current = false;
      load(); // pré-carrega o próximo
    });
    ad.addAdEventListener(AdEventType.ERROR, () => {
      loadedRef.current = false;
    });

    ad.load();
    adRef.current = ad;
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const show = useCallback(() => {
    if (adRef.current && loadedRef.current) {
      try {
        adRef.current.show();
      } catch (e) {
        // ignora
      }
    }
  }, []);

  return { show };
}

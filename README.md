# Calculadora de Rescisão Trabalhista CLT (Brasil)

App mobile simples (MVP) que calcula a rescisão trabalhista CLT no Brasil.
Foco em monetização rápida via Google AdMob — sem backend, sem login, lógica 100% local.

## Stack

- **React Native** + **Expo SDK 52**
- **Google AdMob** via `react-native-google-mobile-ads` (banner + intersticial)
- **DateTimePicker** nativo
- Sem backend, sem auth, sem dependências supérfluas

## Estrutura

```
calculadora-rescisao-clt/
├── App.js                          # Entry point
├── app.json                        # Config Expo + plugin AdMob
├── eas.json                        # Config de builds (EAS)
├── package.json
├── babel.config.js
├── README.md
├── assets/                         # Ícone e splash (substituir!)
└── src/
    ├── screens/
    │   └── HomeScreen.js           # Tela única
    ├── components/
    │   ├── InputField.js
    │   ├── DateInput.js
    │   ├── PrimaryButton.js
    │   ├── ResultCard.js
    │   └── AdBanner.js             # Banner AdMob
    ├── hooks/
    │   └── useInterstitialAd.js    # Hook do anúncio intersticial
    ├── utils/
    │   ├── calculations.js         # Cálculos da rescisão
    │   └── formatters.js           # Máscara R$ + datas
    ├── theme/
    │   └── colors.js               # Paleta (estilo Nubank)
    └── config/
        └── admob.js                # IDs do AdMob (TROCAR depois)
```

## Como rodar

```bash
# 1. Instalar dependências
npm install

# 2. Subir o app no Expo Go (UI funciona; ads aparecem como placeholder)
npx expo start
```

> **Importante:** o pacote `react-native-google-mobile-ads` requer build nativo
> (não roda em Expo Go). Por isso, no Expo Go, o banner aparece como um
> placeholder cinza e o intersticial não dispara — é esperado. Para testar
> os anúncios reais, faça um build de desenvolvimento:
>
> ```bash
> npx expo prebuild
> npx expo run:android   # precisa Android Studio + emulador OU device USB
> ```

## Onde trocar os IDs do AdMob

Há **dois lugares** que precisam dos seus IDs reais:

1. **`app.json`** → `plugins → react-native-google-mobile-ads`
   Substitua `androidAppId` e `iosAppId` pelo **App ID** criado no AdMob.

2. **`src/config/admob.js`**
   Substitua os placeholders `ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX` pelos
   **IDs das unidades de anúncio** (banner e intersticial). Os IDs de teste do
   Google ficam ativos enquanto `__DEV__` for `true` — em produção, ele usa
   automaticamente os IDs reais.

## Cálculos implementados

Regras simplificadas (sem garantia jurídica):

| Verba                       | Fórmula                                              |
|-----------------------------|------------------------------------------------------|
| Saldo de salário            | `(salário / 30) × dias trabalhados no mês`           |
| 13º proporcional            | `(salário / 12) × meses no ano da rescisão`          |
| Férias proporcionais + 1/3  | `salário × (meses no ano / 12) × (1 + 1/3)`          |
| FGTS acumulado              | `8% × salário × meses totais` (informativo)          |
| Multa de 40% do FGTS        | `40% × FGTS` (apenas demissão sem justa causa)       |
| **Total da rescisão**       | saldo + 13º + férias + multa de 40%                  |

> O FGTS acumulado fica depositado na Caixa, então **não entra no total** —
> só aparece como informativo.

## Próximos passos (roadmap rápido de monetização)

1. Trocar IDs de teste pelos reais do AdMob.
2. Substituir `assets/icon.png` e `assets/splash.png` por arte definitiva.
3. `eas build -p android --profile production` → gera `.aab`.
4. Subir `.aab` no Google Play Console (conta US$25, pagamento único).
5. Aguardar revisão (~2 a 5 dias).

## Licença

MIT — use, modifique e ganhe seu dinheiro.

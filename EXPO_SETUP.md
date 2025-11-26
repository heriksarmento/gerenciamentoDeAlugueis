# 📱 Configuração Expo - Passo a Passo

## 1️⃣ Criar Projeto Expo

```bash
# Na pasta raiz do projeto
cd gerenciamentoDeAlugueis

# Backup da pasta atual
mv mobile-react-native mobile-react-native-cli-backup

# Criar projeto Expo
npx create-expo-app@latest mobile-react-native --template blank-typescript

cd mobile-react-native
```

## 2️⃣ Instalar Dependências

```bash
# Navegação
npm install @react-navigation/native @react-navigation/native-stack

# Dependências do React Navigation para Expo
npx expo install react-native-screens react-native-safe-area-context

# Storage e HTTP
npx expo install @react-native-async-storage/async-storage
npm install axios
```

## 3️⃣ Copiar Arquivos do Backup

```bash
# Copiar pasta src
cp -r ../mobile-react-native-cli-backup/src ./

# Copiar App.tsx
cp ../mobile-react-native-cli-backup/App.tsx ./
```

## 4️⃣ Atualizar app.json

Edite o arquivo `app.json` e adicione:

```json
{
  "expo": {
    "name": "Gerenciamento de Aluguéis",
    "slug": "rental-management",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#4F46E5"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.rental.management"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#4F46E5"
      },
      "package": "com.rental.management"
    },
    "web": {
      "favicon": "./assets/favicon.png"
    }
  }
}
```

## 5️⃣ Configurar URL da API

Edite `src/services/api.ts` e configure a URL:

```typescript
// Para testar no celular, use o IP da sua máquina
// Descubra seu IP: ipconfig (Windows) ou ifconfig (Mac/Linux)
const BASE_URL = 'http://SEU_IP_AQUI:8000';  // Ex: http://192.168.1.100:8000
```

## 6️⃣ Iniciar o Projeto

```bash
# Inicie o Expo
npx expo start

# Ou com limpeza de cache
npx expo start -c
```

## 7️⃣ Testar no Celular

### Android:
1. Instale o app "Expo Go" da Play Store
2. Escaneie o QR code que aparece no terminal
3. O app abrirá automaticamente!

### iOS:
1. Instale o app "Expo Go" da App Store
2. Abra a câmera e escaneie o QR code
3. Toque na notificação para abrir

## 🔧 Troubleshooting

### Erro de conexão com API
- Certifique-se que o backend está rodando
- Use o IP da sua máquina, não localhost
- Verifique se estão na mesma rede WiFi

### Erro ao instalar dependências
```bash
# Limpe o cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### App não carrega
```bash
# Reinicie com cache limpo
npx expo start -c
```

## 📱 Comandos Úteis

```bash
# Iniciar Expo
npx expo start

# Abrir no Android
npx expo start --android

# Abrir no iOS
npx expo start --ios

# Abrir no navegador
npx expo start --web

# Limpar cache
npx expo start -c
```

## 🎯 Próximos Passos

1. ✅ Configure a URL da API com seu IP
2. ✅ Inicie o backend: `cd backend-python && uv run uvicorn main:app --reload`
3. ✅ Inicie o Expo: `npx expo start`
4. ✅ Escaneie o QR code no celular
5. ✅ Teste o app!

## 🌟 Vantagens do Expo

- ✅ Não precisa Android Studio ou Xcode
- ✅ Testa direto no celular físico
- ✅ Hot reload automático
- ✅ Fácil de compartilhar (QR code)
- ✅ Build na nuvem (EAS Build)

## 📚 Recursos

- [Expo Docs](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Expo Go App](https://expo.dev/client)

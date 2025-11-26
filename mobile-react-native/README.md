# Mobile - Sistema de Gerenciamento de Aluguéis

App mobile nativo desenvolvido com React Native CLI e TypeScript.

## 🚀 Tecnologias

- React Native 0.73 (CLI, não Expo)
- TypeScript
- React Navigation
- AsyncStorage
- Axios

## 📦 Pré-requisitos

### Android
- Node.js 18+
- JDK 17
- Android Studio
- Android SDK

### iOS (apenas macOS)
- Node.js 18+
- Xcode 14+
- CocoaPods

## 🔧 Instalação

```bash
# Instalar dependências
npm install

# iOS: Instalar pods
cd ios && pod install && cd ..
```

## ⚙️ Configuração

**IMPORTANTE**: Edite o arquivo `src/services/api.ts` e configure a URL do backend:

```typescript
// Para iOS (simulador):
const BASE_URL = 'http://localhost:8000';

// Para Android (emulador):
const BASE_URL = 'http://10.0.2.2:8000';

// Para dispositivo físico:
const BASE_URL = 'http://SEU_IP:8000';  // Ex: http://192.168.1.100:8000
```

Para descobrir seu IP:
- **Windows**: `ipconfig`
- **Mac/Linux**: `ifconfig` ou `ip addr`

## ▶️ Executar

```bash
# Android
npm run android

# iOS (apenas macOS)
npm run ios
```

## 📱 Funcionalidades

### Telas

1. **LoginScreen** - Autenticação com usuários de teste
2. **HomeScreen** - Lista de imóveis com pull-to-refresh
3. **ImovelScreen** - Detalhes do imóvel com unidades e locatários
4. **NovoImovelScreen** - Formulário para criar imóvel
5. **NovaUnidadeScreen** - Formulário para criar unidade
6. **NovoLocatarioScreen** - Formulário para criar locatário

### Recursos

- ✅ Autenticação JWT persistente
- ✅ Pull to refresh em todas as listas
- ✅ Navegação entre telas
- ✅ Badges coloridos para status
- ✅ FAB (Floating Action Button)
- ✅ Confirmações antes de deletar
- ✅ Tratamento de erros
- ✅ Loading states

## 👤 Usuários de Teste

- **Email**: usuario1@email.com | **Senha**: usuario1
- **Email**: usuario2@email.com | **Senha**: usuario2

## 🗂️ Estrutura de Arquivos

```
mobile-react-native/
├── App.tsx                          # Navegação principal
├── src/
│   ├── services/
│   │   └── api.ts                   # Configuração Axios
│   └── screens/
│       ├── LoginScreen.tsx          # Tela de login
│       ├── HomeScreen.tsx           # Lista de imóveis
│       ├── ImovelScreen.tsx         # Detalhes do imóvel
│       ├── NovoImovelScreen.tsx     # Criar imóvel
│       ├── NovaUnidadeScreen.tsx    # Criar unidade
│       └── NovoLocatarioScreen.tsx  # Criar locatário
└── package.json
```

## 🐛 Troubleshooting

### Erro de conexão com API
- Verifique se o backend está rodando
- Confirme a URL em `src/services/api.ts`
- Para Android, use `10.0.2.2` (emulador) ou IP da máquina (dispositivo físico)

### Erro ao instalar dependências
```bash
# Limpar cache
npm cache clean --force
rm -rf node_modules
npm install
```

### Erro no Android
```bash
cd android
./gradlew clean
cd ..
npm run android
```

### Erro no iOS
```bash
cd ios
pod deintegrate
pod install
cd ..
npm run ios
```

## 📚 Documentação

- [React Native](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)

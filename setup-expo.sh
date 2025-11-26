#!/bin/bash

echo "🚀 Configurando Projeto Expo..."
echo ""

# Cores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar se está na pasta correta
if [ ! -d "mobile-react-native" ]; then
    echo "❌ Erro: Execute este script na pasta raiz do projeto"
    exit 1
fi

# Backup da pasta atual
echo "${BLUE}📦 Fazendo backup da pasta mobile-react-native...${NC}"
if [ -d "mobile-react-native-cli-backup" ]; then
    rm -rf mobile-react-native-cli-backup
fi
mv mobile-react-native mobile-react-native-cli-backup
echo "${GREEN}✅ Backup criado${NC}"
echo ""

# Criar projeto Expo
echo "${BLUE}🎨 Criando projeto Expo...${NC}"
npx create-expo-app@latest mobile-react-native --template blank-typescript
echo ""

# Entrar na pasta
cd mobile-react-native

# Instalar dependências
echo "${BLUE}📚 Instalando dependências...${NC}"
npm install @react-navigation/native @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context
npx expo install @react-native-async-storage/async-storage
npm install axios
echo "${GREEN}✅ Dependências instaladas${NC}"
echo ""

# Copiar arquivos
echo "${BLUE}📋 Copiando arquivos do backup...${NC}"
cp -r ../mobile-react-native-cli-backup/src ./
cp ../mobile-react-native-cli-backup/App.tsx ./
echo "${GREEN}✅ Arquivos copiados${NC}"
echo ""

# Mensagem final
echo "${GREEN}🎉 Configuração concluída!${NC}"
echo ""
echo "${YELLOW}📝 Próximos passos:${NC}"
echo "1. Configure a URL da API em src/services/api.ts"
echo "   - Descubra seu IP: ipconfig (Windows) ou ifconfig (Mac/Linux)"
echo "   - Altere BASE_URL para: http://SEU_IP:8000"
echo ""
echo "2. Inicie o backend:"
echo "   cd ../backend-python"
echo "   uv run uvicorn main:app --reload"
echo ""
echo "3. Inicie o Expo:"
echo "   cd ../mobile-react-native"
echo "   npx expo start"
echo ""
echo "4. Escaneie o QR code com o app Expo Go no celular"
echo ""
echo "${GREEN}✨ Divirta-se!${NC}"

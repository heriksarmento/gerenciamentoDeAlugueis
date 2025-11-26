# 🚀 Quick Start - Gerenciamento de Aluguéis

Guia rápido para executar o projeto em 5 minutos.

## ⚡ Início Rápido

### 1️⃣ Backend (Terminal 1)

```bash
cd backend-python
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python init_db.py
uvicorn main:app --reload
```

✅ Backend rodando em: http://localhost:8000
📚 Documentação: http://localhost:8000/docs

### 2️⃣ Frontend (Terminal 2)

```bash
cd frontend
npm install
npm run dev
```

✅ Frontend rodando em: http://localhost:5173

### 3️⃣ Login

Acesse http://localhost:5173 e use:

- **Email**: usuario1@email.com
- **Senha**: usuario1

## 📱 Mobile (Opcional)

### Android

```bash
cd mobile-react-native
npm install

# Edite src/services/api.ts:
# - Emulador: http://10.0.2.2:8000
# - Dispositivo: http://SEU_IP:8000

npm run android
```

### iOS (macOS apenas)

```bash
cd mobile-react-native
npm install
cd ios && pod install && cd ..
npm run ios
```

## 🎯 Fluxo de Uso

1. **Login** → Use usuario1@email.com / usuario1
2. **Criar Imóvel** → Clique em "+ Novo Imóvel"
3. **Adicionar Unidade** → Clique no imóvel → "+ Unidade"
4. **Adicionar Locatário** → Na unidade → "+ Adicionar Locatário"

## 🆘 Problemas?

- Backend não inicia? Verifique se Python 3.11+ está instalado
- Frontend não carrega? Verifique se Node.js 18+ está instalado
- Erro de conexão? Certifique-se que o backend está rodando

## 📖 Documentação Completa

Consulte `GUIA_COMPLETO.txt` para instruções detalhadas.

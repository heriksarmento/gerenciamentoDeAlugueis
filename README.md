# Sistema de Gerenciamento de Aluguéis

Sistema completo para gerenciar imóveis, unidades e locatários com backend Python/FastAPI, frontend React e app mobile React Native.

## 🚀 Stack Tecnológica

- **Backend**: Python + FastAPI + SQLAlchemy + SQLite + JWT
- **Frontend**: React 18 + Vite + Tailwind CSS
- **Mobile**: React Native CLI + TypeScript

## 📁 Estrutura do Projeto

```
rental-management/
├── backend-python/     # API REST com FastAPI
├── frontend/           # Web app com React + Vite
├── mobile-react-native/ # App nativo com React Native
└── README.md
```

## 🎯 Funcionalidades

- ✅ Autenticação JWT
- ✅ CRUD completo de imóveis, unidades e locatários
- ✅ Relacionamentos em cascata
- ✅ Interface web moderna e responsiva
- ✅ App mobile nativo (Android/iOS)
- ✅ Documentação automática da API (Swagger)

## 🏃 Como Executar

### Backend
```bash
cd backend-python
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python init_db.py
uvicorn main:app --reload
```
Acesse: http://localhost:8000/docs

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Acesse: http://localhost:5173

### Mobile
```bash
cd mobile-react-native
npm install
# Edite src/services/api.ts com o IP do seu backend
npm run android  # ou npm run ios
```

## 👤 Usuários de Teste

- **Usuário 1**: usuario1@email.com / usuario1
- **Usuário 2**: usuario2@email.com / usuario2

## 📚 Documentação Detalhada

Consulte os README.md específicos em cada pasta para mais detalhes.

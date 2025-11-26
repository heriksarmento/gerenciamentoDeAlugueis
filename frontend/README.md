# Frontend - Sistema de Gerenciamento de Aluguéis

Interface web moderna desenvolvida com React 18, Vite e Tailwind CSS.

## 🚀 Tecnologias

- React 18
- Vite (build tool)
- Tailwind CSS
- Axios
- localStorage para persistência

## 📦 Instalação

```bash
npm install
```

## ▶️ Executar

```bash
npm run dev
```

Acesse: http://localhost:5173

## 🎨 Funcionalidades

### Tela de Login
- Campos de email e senha
- Botões para preencher usuários de teste
- Validação de formulário
- Feedback de erros

### Dashboard
- **Lista de Imóveis**: Cards clicáveis em 2 colunas
- **Painel de Detalhes**: Informações completas do imóvel selecionado
- **Gerenciamento de Unidades**: 
  - Lista de unidades com badges de status
  - Adicionar/remover unidades
  - Status colorido (verde=disponível, vermelho=alugado)
- **Gerenciamento de Locatários**:
  - Adicionar locatário à unidade
  - Visualizar informações do locatário
  - Remover locatário
- **Modais**: Formulários para criar imóvel, unidade e locatário
- **Logout**: Botão no header

## 👤 Usuários de Teste

- **Email**: usuario1@email.com | **Senha**: usuario1
- **Email**: usuario2@email.com | **Senha**: usuario2

## 🎨 Estilização

- Tailwind CSS para estilização
- Design moderno e limpo
- Cards com shadow e hover effects
- Badges coloridos para status
- Layout responsivo (mobile-first)
- Gradiente no login
- Modais com overlay

## 🔐 Autenticação

- Token JWT armazenado no localStorage
- Interceptor Axios adiciona token automaticamente
- Logout automático em caso de token inválido (401)

## 📁 Estrutura de Arquivos

```
frontend/
├── src/
│   ├── components/
│   │   ├── Login.jsx       # Tela de login
│   │   └── Dashboard.jsx   # Dashboard principal
│   ├── services/
│   │   └── api.js          # Cliente Axios configurado
│   ├── App.jsx             # Componente raiz
│   ├── main.jsx            # Entry point
│   └── index.css           # Estilos globais + Tailwind
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🔧 Configuração da API

O frontend se conecta ao backend em `http://localhost:8000` por padrão.

Para alterar, edite `src/services/api.js`:

```javascript
const api = axios.create({
  baseURL: 'http://seu-backend-url:porta',
});
```

## 🏗️ Build para Produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

## 📦 Deploy

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### GitHub Pages
```bash
npm run build
# Faça deploy da pasta dist/
```

## 🐛 Troubleshooting

### Erro de conexão com API
- Verifique se o backend está rodando em http://localhost:8000
- Verifique o console do navegador para erros de CORS
- Confirme que o backend tem CORS configurado

### Erro ao instalar dependências
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Porta 5173 já em uso
```bash
npm run dev -- --port 3000
```

## 📚 Recursos

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Axios Documentation](https://axios-http.com/)

# 🏗️ Arquitetura do Sistema

## 📊 Visão Geral

```
┌─────────────────┐
│   Frontend Web  │ (React + Vite + Tailwind)
│  localhost:5173 │
└────────┬────────┘
         │
         │ HTTP/REST
         │
┌────────▼────────┐
│   Mobile App    │ (React Native + TypeScript)
│  Android / iOS  │
└────────┬────────┘
         │
         │ HTTP/REST + JWT
         │
┌────────▼────────┐
│   Backend API   │ (FastAPI + Python)
│  localhost:8000 │
└────────┬────────┘
         │
         │ SQLAlchemy ORM
         │
┌────────▼────────┐
│   Database      │ (SQLite)
│   rental.db     │
└─────────────────┘
```

## 🔧 Stack Tecnológica

### Backend
- **FastAPI**: Framework web moderno e rápido
- **SQLAlchemy**: ORM para manipulação do banco
- **SQLite**: Banco de dados leve e portátil
- **Pydantic**: Validação de dados
- **JWT**: Autenticação stateless
- **Bcrypt**: Hash seguro de senhas
- **Uvicorn**: Servidor ASGI

### Frontend Web
- **React 18**: Biblioteca UI com hooks
- **Vite**: Build tool rápido
- **Tailwind CSS**: Framework CSS utility-first
- **Axios**: Cliente HTTP
- **localStorage**: Persistência do token

### Mobile
- **React Native 0.73**: Framework mobile nativo
- **TypeScript**: Tipagem estática
- **React Navigation**: Navegação entre telas
- **AsyncStorage**: Persistência local
- **Axios**: Cliente HTTP

## 🗄️ Modelo de Dados

### Relacionamentos

```
Usuario (1) ──────< (N) Imovel
                         │
                         │ (1)
                         │
                         ▼
                      (N) Unidade
                         │
                         │ (1)
                         │
                         ▼
                      (1) Locatario
```

### Regras de Negócio

1. **Cascade Delete**: Deletar imóvel remove unidades e locatários
2. **Unique Constraint**: Número de unidade único por imóvel
3. **One-to-One**: Uma unidade pode ter apenas um locatário
4. **Status Automático**: 
   - Adicionar locatário → status = "alugado"
   - Remover locatário → status = "disponivel"

## 🔐 Autenticação

### Fluxo JWT

```
1. Login
   Cliente → POST /api/auth/login {email, senha}
   Servidor → Valida credenciais
   Servidor → Gera JWT token
   Servidor → {access_token, token_type}

2. Requisições Autenticadas
   Cliente → GET /api/imoveis
   Header: Authorization: Bearer <token>
   Servidor → Valida token
   Servidor → Retorna dados do usuário

3. Token Inválido
   Servidor → 401 Unauthorized
   Cliente → Redireciona para login
```

### Segurança

- Senhas hasheadas com Bcrypt (salt rounds)
- Token JWT com expiração de 7 dias
- CORS configurado para aceitar origens específicas
- Validação de propriedade (usuário só acessa seus dados)

## 📡 API REST

### Padrões

- **RESTful**: Recursos e verbos HTTP semânticos
- **JSON**: Formato de dados
- **Status Codes**: 200, 201, 400, 401, 403, 404, 500
- **Validação**: Pydantic schemas
- **Documentação**: Swagger/OpenAPI automática

### Estrutura de Resposta

```json
// Sucesso
{
  "id": 1,
  "nome": "Edifício Central",
  "endereco": "Rua das Flores, 123"
}

// Erro
{
  "detail": "Imóvel não encontrado"
}
```

## 🎨 Frontend Architecture

### Componentes

```
App.jsx
├── Login.jsx (não autenticado)
└── Dashboard.jsx (autenticado)
    ├── Lista de Imóveis
    ├── Painel de Detalhes
    └── Modais (Formulários)
```

### Estado

- **Local State**: useState para formulários e UI
- **Persistência**: localStorage para token
- **API Calls**: Axios com interceptors

### Fluxo de Dados

```
Componente → Ação do Usuário
         ↓
    API Call (Axios)
         ↓
    Backend (FastAPI)
         ↓
    Database (SQLite)
         ↓
    Resposta JSON
         ↓
    Atualiza Estado
         ↓
    Re-render UI
```

## 📱 Mobile Architecture

### Navegação

```
Stack Navigator
├── Login Screen (não autenticado)
└── Authenticated Stack
    ├── Home Screen
    ├── Imovel Screen
    ├── Novo Imovel Screen
    ├── Nova Unidade Screen
    └── Novo Locatario Screen
```

### Persistência

- **AsyncStorage**: Token JWT e dados do usuário
- **Verificação**: Ao iniciar app, verifica token
- **Logout**: Remove token e redireciona

## 🚀 Performance

### Backend
- **Async/Await**: Operações não-bloqueantes
- **Connection Pooling**: SQLAlchemy gerencia conexões
- **Lazy Loading**: Relacionamentos carregados sob demanda

### Frontend
- **Code Splitting**: Vite divide código automaticamente
- **Tree Shaking**: Remove código não utilizado
- **Minificação**: Build otimizado para produção

### Mobile
- **FlatList**: Renderização eficiente de listas
- **Memoization**: Evita re-renders desnecessários
- **Image Optimization**: Lazy loading de imagens

## 🧪 Testes (Sugestões)

### Backend
```python
# pytest
def test_criar_imovel():
    response = client.post("/api/imoveis", json={...})
    assert response.status_code == 201
```

### Frontend
```javascript
// Jest + React Testing Library
test('renderiza login', () => {
  render(<Login />);
  expect(screen.getByText('Entrar')).toBeInTheDocument();
});
```

### Mobile
```typescript
// Jest + React Native Testing Library
test('renderiza home screen', () => {
  render(<HomeScreen />);
  expect(screen.getByText('Meus Imóveis')).toBeTruthy();
});
```

## 📦 Deploy

### Backend
- **Railway**: Deploy automático via Git
- **Render**: Free tier com PostgreSQL
- **Heroku**: Fácil configuração

### Frontend
- **Vercel**: Deploy automático, CDN global
- **Netlify**: CI/CD integrado
- **GitHub Pages**: Gratuito para projetos públicos

### Mobile
- **Google Play**: Android App Bundle (.aab)
- **App Store**: Xcode Archive (.ipa)
- **TestFlight**: Beta testing iOS

## 🔄 CI/CD (Sugestão)

```yaml
# .github/workflows/ci.yml
name: CI
on: [push]
jobs:
  backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Test Backend
        run: |
          cd backend-python
          pip install -r requirements.txt
          pytest
  
  frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Test Frontend
        run: |
          cd frontend
          npm install
          npm test
```

## 📈 Escalabilidade

### Melhorias Futuras

1. **Cache**: Redis para sessões e queries frequentes
2. **CDN**: CloudFlare para assets estáticos
3. **Load Balancer**: Nginx para múltiplas instâncias
4. **Database**: Migrar para PostgreSQL em produção
5. **Microservices**: Separar autenticação, pagamentos, etc.
6. **Message Queue**: RabbitMQ/Celery para tarefas assíncronas

## 🛡️ Segurança

### Checklist

- [x] Senhas hasheadas
- [x] JWT com expiração
- [x] CORS configurado
- [x] Validação de entrada
- [x] SQL Injection protegido (ORM)
- [ ] Rate limiting (implementar)
- [ ] HTTPS em produção
- [ ] Logs de auditoria
- [ ] 2FA (implementar)

## 📚 Recursos

- [FastAPI Best Practices](https://fastapi.tiangolo.com/tutorial/)
- [React Patterns](https://reactpatterns.com/)
- [React Native Performance](https://reactnative.dev/docs/performance)
- [REST API Design](https://restfulapi.net/)

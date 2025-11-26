# 🚀 Guia de Deploy

Instruções para fazer deploy do sistema em produção.

## 📋 Checklist Pré-Deploy

- [ ] Testes passando
- [ ] Variáveis de ambiente configuradas
- [ ] SECRET_KEY alterado
- [ ] CORS configurado para domínio de produção
- [ ] Banco de dados de produção configurado
- [ ] HTTPS habilitado
- [ ] Logs configurados
- [ ] Backup configurado

## 🐍 Backend (FastAPI)

### Railway

1. **Criar conta**: https://railway.app
2. **Novo Projeto**: New Project → Deploy from GitHub
3. **Configurar variáveis**:
   ```
   SECRET_KEY=seu-secret-key-super-seguro-aqui
   DATABASE_URL=postgresql://...
   ```
4. **Deploy automático** via Git push

### Render

1. **Criar conta**: https://render.com
2. **New Web Service** → Connect GitHub
3. **Configurações**:
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. **Variáveis de ambiente**:
   ```
   SECRET_KEY=seu-secret-key
   DATABASE_URL=postgresql://...
   ```

### Heroku

```bash
# Instalar Heroku CLI
curl https://cli-assets.heroku.com/install.sh | sh

# Login
heroku login

# Criar app
cd backend-python
heroku create meu-app-rental

# Adicionar PostgreSQL
heroku addons:create heroku-postgresql:mini

# Deploy
git push heroku main

# Configurar variáveis
heroku config:set SECRET_KEY=seu-secret-key

# Ver logs
heroku logs --tail
```

### Dockerfile (Opcional)

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Migrar para PostgreSQL

```python
# database.py
import os

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "sqlite:///./rental.db"
).replace("postgres://", "postgresql://")  # Heroku fix

engine = create_engine(DATABASE_URL)
```

```bash
# Instalar driver PostgreSQL
pip install psycopg2-binary
```

## 🌐 Frontend (React)

### Vercel

1. **Criar conta**: https://vercel.com
2. **Import Project** → GitHub
3. **Configurações**:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. **Variáveis de ambiente**:
   ```
   VITE_API_URL=https://seu-backend.railway.app
   ```
5. **Deploy automático** via Git push

### Netlify

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
cd frontend
npm run build
netlify deploy --prod --dir=dist
```

### GitHub Pages

```bash
# Instalar gh-pages
npm install --save-dev gh-pages

# package.json
{
  "homepage": "https://seu-usuario.github.io/rental-management",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}

# Deploy
npm run deploy
```

### Configurar API URL

```javascript
// src/services/api.js
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
});
```

```bash
# .env.production
VITE_API_URL=https://seu-backend.railway.app
```

## 📱 Mobile (React Native)

### Android (Google Play)

1. **Gerar Keystore**:
```bash
cd android/app
keytool -genkeypair -v -storetype PKCS12 -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

2. **Configurar gradle**:
```gradle
// android/app/build.gradle
android {
    signingConfigs {
        release {
            storeFile file('my-release-key.keystore')
            storePassword 'senha'
            keyAlias 'my-key-alias'
            keyPassword 'senha'
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
        }
    }
}
```

3. **Gerar APK/AAB**:
```bash
cd android
./gradlew bundleRelease  # AAB (recomendado)
# ou
./gradlew assembleRelease  # APK
```

4. **Upload**: Google Play Console

### iOS (App Store)

1. **Configurar Xcode**:
   - Abra `ios/RentalManagement.xcworkspace`
   - Configure Team e Bundle ID
   - Configure versão e build number

2. **Archive**:
   - Product → Archive
   - Distribute App → App Store Connect

3. **Upload**: App Store Connect

### CodePush (Updates OTA)

```bash
# Instalar CodePush
npm install -g appcenter-cli
appcenter login

# Criar apps
appcenter apps create -d RentalManagement-Android -o Android -p React-Native
appcenter apps create -d RentalManagement-iOS -o iOS -p React-Native

# Deploy update
appcenter codepush release-react -a seu-usuario/RentalManagement-Android
```

## 🗄️ Banco de Dados

### PostgreSQL (Produção)

#### Railway
```bash
# Criar PostgreSQL
railway add postgresql

# Obter URL
railway variables
```

#### Supabase (Gratuito)
1. Criar conta: https://supabase.com
2. New Project
3. Copiar DATABASE_URL
4. Configurar no backend

#### Backup Automático

```bash
# Backup diário
0 2 * * * pg_dump $DATABASE_URL > backup-$(date +\%Y\%m\%d).sql

# Restaurar
psql $DATABASE_URL < backup-20240101.sql
```

## 🔒 Segurança

### HTTPS

```python
# main.py
from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware

if os.getenv("ENVIRONMENT") == "production":
    app.add_middleware(HTTPSRedirectMiddleware)
```

### CORS Produção

```python
# main.py
origins = [
    "https://seu-frontend.vercel.app",
    "https://seu-dominio.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Rate Limiting

```bash
pip install slowapi
```

```python
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter

@app.post("/api/auth/login")
@limiter.limit("5/minute")
async def login(request: Request, ...):
    pass
```

### Variáveis de Ambiente

```bash
# .env.production
SECRET_KEY=chave-super-segura-gerada-aleatoriamente
DATABASE_URL=postgresql://...
ENVIRONMENT=production
ALLOWED_ORIGINS=https://seu-frontend.com
```

## 📊 Monitoramento

### Sentry (Erros)

```bash
pip install sentry-sdk[fastapi]
```

```python
import sentry_sdk

sentry_sdk.init(
    dsn="https://...@sentry.io/...",
    traces_sample_rate=1.0,
)
```

### Logs

```python
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('app.log'),
        logging.StreamHandler()
    ]
)
```

## 🔄 CI/CD

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Railway
        run: |
          npm install -g @railway/cli
          railway up
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        run: |
          npm install -g vercel
          vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

## 🌍 Domínio Customizado

### Backend
1. Railway/Render: Settings → Custom Domain
2. Adicionar CNAME: `api.seudominio.com` → `seu-app.railway.app`

### Frontend
1. Vercel: Settings → Domains
2. Adicionar domínio: `seudominio.com`
3. Configurar DNS conforme instruções

## 📈 Performance

### CDN
- Cloudflare (gratuito)
- AWS CloudFront
- Vercel Edge Network (automático)

### Cache
```python
from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend

@app.on_event("startup")
async def startup():
    redis = aioredis.from_url("redis://localhost")
    FastAPICache.init(RedisBackend(redis), prefix="fastapi-cache")
```

## 🧪 Ambiente de Staging

```bash
# Criar ambiente de staging
railway environment create staging

# Deploy para staging
railway up --environment staging
```

## 📝 Checklist Final

- [ ] Backend deployado e acessível
- [ ] Frontend deployado e acessível
- [ ] Mobile publicado nas lojas
- [ ] Banco de dados em produção
- [ ] HTTPS configurado
- [ ] Domínio customizado (opcional)
- [ ] Monitoramento ativo
- [ ] Backups configurados
- [ ] CI/CD funcionando
- [ ] Documentação atualizada

## 🆘 Troubleshooting

### Backend não inicia
- Verifique logs: `railway logs` ou `heroku logs --tail`
- Confirme variáveis de ambiente
- Teste localmente com variáveis de produção

### Frontend não conecta ao backend
- Verifique CORS no backend
- Confirme URL da API no frontend
- Teste endpoint diretamente

### Build falha
- Limpe cache: `railway run --service backend bash -c "rm -rf __pycache__"`
- Verifique versões de dependências
- Teste build localmente

## 📚 Recursos

- [Railway Docs](https://docs.railway.app/)
- [Vercel Docs](https://vercel.com/docs)
- [React Native Publishing](https://reactnative.dev/docs/publishing-to-app-store)
- [FastAPI Deployment](https://fastapi.tiangolo.com/deployment/)

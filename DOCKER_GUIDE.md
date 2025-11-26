# 🐳 Guia Docker - Sistema de Gerenciamento de Aluguéis

## 📋 Pré-requisitos

- Docker 20.10+
- Docker Compose 2.0+

## 🚀 Início Rápido

### Desenvolvimento

```bash
# Copiar variáveis de ambiente
cp .env.example .env

# Iniciar todos os serviços
docker-compose -f docker-compose.dev.yml up -d

# Ver logs
docker-compose -f docker-compose.dev.yml logs -f

# Parar serviços
docker-compose -f docker-compose.dev.yml down
```

**Acessar:**
- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- API Docs: http://localhost:8000/docs
- PostgreSQL: localhost:5432

### Produção

```bash
# Build e iniciar
docker-compose up -d --build

# Ver logs
docker-compose logs -f

# Parar
docker-compose down
```

**Acessar:**
- Frontend: http://localhost
- Backend: http://localhost:8000
- API Docs: http://localhost:8000/docs

## 📦 Serviços

### 1. PostgreSQL (db)
- **Imagem**: postgres:15-alpine
- **Porta**: 5432
- **Database**: rental_db
- **User**: rental_user
- **Password**: rental_password (mude em produção!)

### 2. Backend (backend)
- **Porta**: 8000
- **Framework**: FastAPI
- **Hot Reload**: Sim (dev)
- **Healthcheck**: Sim

### 3. Frontend (frontend)
- **Porta**: 80 (prod) / 5173 (dev)
- **Framework**: React + Vite
- **Server**: Nginx (prod) / Vite (dev)

## 🔧 Comandos Úteis

### Gerenciar Containers

```bash
# Listar containers
docker-compose ps

# Ver logs de um serviço específico
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f db

# Reiniciar um serviço
docker-compose restart backend

# Rebuild um serviço
docker-compose up -d --build backend

# Parar e remover tudo (incluindo volumes)
docker-compose down -v
```

### Acessar Containers

```bash
# Backend
docker exec -it rental-backend bash

# Frontend
docker exec -it rental-frontend sh

# Database
docker exec -it rental-db psql -U rental_user -d rental_db
```

### Database

```bash
# Backup
docker exec rental-db pg_dump -U rental_user rental_db > backup.sql

# Restore
docker exec -i rental-db psql -U rental_user rental_db < backup.sql

# Acessar psql
docker exec -it rental-db psql -U rental_user -d rental_db

# Ver tabelas
docker exec rental-db psql -U rental_user -d rental_db -c "\dt"
```

### Logs

```bash
# Todos os serviços
docker-compose logs -f

# Últimas 100 linhas
docker-compose logs --tail=100

# Desde tempo específico
docker-compose logs --since 30m
```

## 🔄 Workflow de Desenvolvimento

### 1. Primeira vez

```bash
# Clone o repositório
git clone <repo-url>
cd rental-management

# Configure variáveis
cp .env.example .env

# Inicie os serviços
docker-compose -f docker-compose.dev.yml up -d

# Aguarde inicialização (30s)
docker-compose -f docker-compose.dev.yml logs -f backend
```

### 2. Desenvolvimento diário

```bash
# Iniciar
docker-compose -f docker-compose.dev.yml up -d

# Trabalhar normalmente (hot reload ativo)
# Edite arquivos em backend-python/ ou frontend/

# Ver logs se necessário
docker-compose -f docker-compose.dev.yml logs -f

# Parar ao final do dia
docker-compose -f docker-compose.dev.yml down
```

### 3. Resetar banco de dados

```bash
# Parar e remover volumes
docker-compose -f docker-compose.dev.yml down -v

# Reiniciar
docker-compose -f docker-compose.dev.yml up -d
```

## 🚀 Deploy em Produção

### Preparação

1. **Altere as senhas** em `.env`:
```env
POSTGRES_PASSWORD=senha-super-segura-aqui
SECRET_KEY=chave-jwt-super-segura-aqui
```

2. **Configure CORS** no backend (`main.py`):
```python
allow_origins=["https://seu-dominio.com"]
```

3. **Build**:
```bash
docker-compose build
```

### Deploy

```bash
# Iniciar em produção
docker-compose up -d

# Verificar status
docker-compose ps

# Ver logs
docker-compose logs -f
```

### Backup Automático

Crie um cron job:
```bash
# Editar crontab
crontab -e

# Adicionar backup diário às 2h
0 2 * * * docker exec rental-db pg_dump -U rental_user rental_db > /backups/rental-$(date +\%Y\%m\%d).sql
```

## 🐛 Troubleshooting

### Backend não inicia

```bash
# Ver logs
docker-compose logs backend

# Verificar se DB está pronto
docker-compose ps db

# Reiniciar
docker-compose restart backend
```

### Frontend não conecta ao backend

1. Verifique se backend está rodando:
```bash
curl http://localhost:8000
```

2. Verifique CORS no backend

3. Verifique URL da API no frontend

### Database connection error

```bash
# Verificar se PostgreSQL está rodando
docker-compose ps db

# Ver logs do database
docker-compose logs db

# Testar conexão
docker exec rental-db pg_isready -U rental_user
```

### Porta já em uso

```bash
# Verificar portas em uso
sudo lsof -i :8000
sudo lsof -i :5173
sudo lsof -i :5432

# Matar processo
sudo kill -9 <PID>

# Ou mudar porta no docker-compose.yml
ports:
  - "8001:8000"  # Usar porta 8001 no host
```

## 📊 Monitoramento

### Recursos

```bash
# Ver uso de recursos
docker stats

# Ver uso de disco
docker system df

# Limpar recursos não usados
docker system prune -a
```

### Health Checks

```bash
# Backend
curl http://localhost:8000/

# Frontend
curl http://localhost:5173/

# Database
docker exec rental-db pg_isready -U rental_user
```

## 🔐 Segurança

### Checklist Produção

- [ ] Alterar POSTGRES_PASSWORD
- [ ] Alterar SECRET_KEY
- [ ] Configurar CORS corretamente
- [ ] Usar HTTPS (nginx + certbot)
- [ ] Limitar acesso ao PostgreSQL
- [ ] Configurar firewall
- [ ] Backups automáticos
- [ ] Monitoramento de logs

### Exemplo com HTTPS

```yaml
# docker-compose.yml
services:
  nginx:
    image: nginx:alpine
    ports:
      - "443:443"
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
```

## 📚 Recursos

- [Docker Docs](https://docs.docker.com/)
- [Docker Compose Docs](https://docs.docker.com/compose/)
- [PostgreSQL Docker](https://hub.docker.com/_/postgres)
- [FastAPI Docker](https://fastapi.tiangolo.com/deployment/docker/)

## 🎯 Próximos Passos

1. Configure CI/CD (GitHub Actions)
2. Adicione testes automatizados
3. Configure monitoramento (Prometheus + Grafana)
4. Implemente cache (Redis)
5. Configure CDN para assets estáticos

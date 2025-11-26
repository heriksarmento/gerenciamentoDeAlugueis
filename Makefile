.PHONY: help dev prod build up down logs clean restart backup

help: ## Mostrar ajuda
	@echo "Comandos disponíveis:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

dev: ## Iniciar ambiente de desenvolvimento
	docker-compose -f docker-compose.dev.yml up -d
	@echo "✅ Ambiente de desenvolvimento iniciado!"
	@echo "Frontend: http://localhost:5173"
	@echo "Backend: http://localhost:8000"
	@echo "API Docs: http://localhost:8000/docs"

prod: ## Iniciar ambiente de produção
	docker-compose up -d --build
	@echo "✅ Ambiente de produção iniciado!"
	@echo "Frontend: http://localhost"
	@echo "Backend: http://localhost:8000"

build: ## Build das imagens
	docker-compose build

up: ## Subir containers
	docker-compose up -d

down: ## Parar containers
	docker-compose down

down-dev: ## Parar containers de desenvolvimento
	docker-compose -f docker-compose.dev.yml down

logs: ## Ver logs
	docker-compose logs -f

logs-backend: ## Ver logs do backend
	docker-compose logs -f backend

logs-frontend: ## Ver logs do frontend
	docker-compose logs -f frontend

logs-db: ## Ver logs do database
	docker-compose logs -f db

clean: ## Limpar tudo (incluindo volumes)
	docker-compose down -v
	docker system prune -f

restart: ## Reiniciar todos os serviços
	docker-compose restart

restart-backend: ## Reiniciar backend
	docker-compose restart backend

restart-frontend: ## Reiniciar frontend
	docker-compose restart frontend

backup: ## Fazer backup do banco
	@mkdir -p backups
	docker exec rental-db pg_dump -U rental_user rental_db > backups/backup-$$(date +%Y%m%d-%H%M%S).sql
	@echo "✅ Backup criado em backups/"

restore: ## Restaurar backup (use: make restore FILE=backup.sql)
	@if [ -z "$(FILE)" ]; then echo "❌ Use: make restore FILE=backup.sql"; exit 1; fi
	docker exec -i rental-db psql -U rental_user rental_db < $(FILE)
	@echo "✅ Backup restaurado!"

shell-backend: ## Acessar shell do backend
	docker exec -it rental-backend bash

shell-frontend: ## Acessar shell do frontend
	docker exec -it rental-frontend sh

shell-db: ## Acessar PostgreSQL
	docker exec -it rental-db psql -U rental_user -d rental_db

ps: ## Listar containers
	docker-compose ps

stats: ## Ver estatísticas de recursos
	docker stats

install: ## Primeira instalação
	@echo "🚀 Instalando Sistema de Gerenciamento de Aluguéis..."
	@cp -n .env.example .env || true
	@echo "✅ Arquivo .env criado"
	@make dev
	@echo ""
	@echo "✅ Instalação concluída!"
	@echo ""
	@echo "Usuários de teste:"
	@echo "  - usuario1@email.com / usuario1"
	@echo "  - usuario2@email.com / usuario2"

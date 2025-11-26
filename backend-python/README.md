# Backend - Sistema de Gerenciamento de Aluguéis

API REST desenvolvida com FastAPI para gerenciar imóveis, unidades e locatários.

## 🚀 Tecnologias

- Python 3.11+
- FastAPI
- SQLAlchemy (ORM)
- SQLite (banco de dados)
- JWT (autenticação)
- Bcrypt (hash de senhas)
- Pydantic (validação)

## 📦 Instalação

```bash
# Criar ambiente virtual
python -m venv venv

# Ativar ambiente virtual
# Linux/Mac:
source venv/bin/activate
# Windows:
venv\Scripts\activate

# Instalar dependências
pip install -r requirements.txt

# Inicializar banco de dados
python init_db.py
```

## ▶️ Executar

```bash
uvicorn main:app --reload
```

Acesse a documentação interativa em: http://localhost:8000/docs

## 👤 Usuários de Teste

Após executar `init_db.py`, dois usuários estarão disponíveis:

- **Email**: usuario1@email.com | **Senha**: usuario1
- **Email**: usuario2@email.com | **Senha**: usuario2

## 📚 Endpoints

### Autenticação
- `POST /api/auth/registro` - Criar novo usuário
- `POST /api/auth/login` - Login (retorna JWT)

### Imóveis (requer autenticação)
- `GET /api/imoveis` - Listar imóveis do usuário
- `GET /api/imoveis/{id}` - Detalhes do imóvel com unidades
- `POST /api/imoveis` - Criar imóvel
- `PUT /api/imoveis/{id}` - Atualizar imóvel
- `DELETE /api/imoveis/{id}` - Deletar imóvel

### Unidades (requer autenticação)
- `POST /api/unidades` - Criar unidade
- `PUT /api/unidades/{id}` - Atualizar unidade
- `DELETE /api/unidades/{id}` - Deletar unidade

### Locatários (requer autenticação)
- `POST /api/locatarios` - Criar locatário (muda status da unidade para "alugado")
- `PUT /api/locatarios/{id}` - Atualizar locatário
- `DELETE /api/locatarios/{id}` - Remover locatário (muda status para "disponivel")

## 🔐 Autenticação

Todas as rotas (exceto login e registro) requerem token JWT no header:

```
Authorization: Bearer <seu_token_jwt>
```

## 🗄️ Estrutura do Banco de Dados

- **usuarios**: id, nome, email, senha_hash
- **imoveis**: id, nome, endereco, cidade, estado, cep, usuario_id (FK)
- **unidades**: id, imovel_id (FK), numero, valor_aluguel, status
- **locatarios**: id, unidade_id (FK), nome, cpf, telefone, email, data_inicio_contrato, data_fim_contrato

Relacionamentos em cascata: deletar imóvel remove suas unidades e locatários.

## 📁 Estrutura de Arquivos

```
backend-python/
├── main.py              # Aplicação principal
├── database.py          # Configuração do banco
├── models.py            # Modelos SQLAlchemy
├── schemas.py           # Schemas Pydantic
├── auth.py              # Autenticação JWT
├── init_db.py           # Script de inicialização
├── requirements.txt     # Dependências
└── routers/
    ├── auth.py          # Rotas de autenticação
    ├── imoveis.py       # Rotas de imóveis
    ├── unidades.py      # Rotas de unidades
    └── locatarios.py    # Rotas de locatários
```

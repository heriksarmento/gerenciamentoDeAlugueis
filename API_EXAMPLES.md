# 📡 Exemplos de Uso da API

Exemplos práticos de como usar a API REST do sistema.

## 🔐 Autenticação

### Registrar Novo Usuário

```bash
curl -X POST http://localhost:8000/api/auth/registro \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao@email.com",
    "senha": "senha123"
  }'
```

**Resposta:**
```json
{
  "id": 3,
  "nome": "João Silva",
  "email": "joao@email.com"
}
```

### Login

```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario1@email.com",
    "senha": "usuario1"
  }'
```

**Resposta:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

## 🏢 Imóveis

### Listar Imóveis

```bash
curl -X GET http://localhost:8000/api/imoveis \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

**Resposta:**
```json
[
  {
    "id": 1,
    "nome": "Edifício Central",
    "endereco": "Rua das Flores, 123",
    "cidade": "São Paulo",
    "estado": "SP",
    "cep": "01234-567",
    "usuario_id": 1
  }
]
```

### Criar Imóvel

```bash
curl -X POST http://localhost:8000/api/imoveis \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Residencial Jardim",
    "endereco": "Av. Paulista, 1000",
    "cidade": "São Paulo",
    "estado": "SP",
    "cep": "01310-100"
  }'
```

**Resposta:**
```json
{
  "id": 2,
  "nome": "Residencial Jardim",
  "endereco": "Av. Paulista, 1000",
  "cidade": "São Paulo",
  "estado": "SP",
  "cep": "01310-100",
  "usuario_id": 1
}
```

### Obter Detalhes do Imóvel

```bash
curl -X GET http://localhost:8000/api/imoveis/1 \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

**Resposta:**
```json
{
  "id": 1,
  "nome": "Edifício Central",
  "endereco": "Rua das Flores, 123",
  "cidade": "São Paulo",
  "estado": "SP",
  "cep": "01234-567",
  "usuario_id": 1,
  "unidades": [
    {
      "id": 1,
      "imovel_id": 1,
      "numero": "101",
      "valor_aluguel": 1500.0,
      "status": "alugado",
      "locatario": {
        "id": 1,
        "unidade_id": 1,
        "nome": "Maria Santos",
        "cpf": "123.456.789-00",
        "telefone": "(11) 98765-4321",
        "email": "maria@email.com",
        "data_inicio_contrato": "2024-01-01",
        "data_fim_contrato": "2025-01-01"
      }
    },
    {
      "id": 2,
      "imovel_id": 1,
      "numero": "102",
      "valor_aluguel": 1600.0,
      "status": "disponivel",
      "locatario": null
    }
  ]
}
```

### Atualizar Imóvel

```bash
curl -X PUT http://localhost:8000/api/imoveis/1 \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Edifício Central Premium",
    "endereco": "Rua das Flores, 123",
    "cidade": "São Paulo",
    "estado": "SP",
    "cep": "01234-567"
  }'
```

### Deletar Imóvel

```bash
curl -X DELETE http://localhost:8000/api/imoveis/1 \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

**Resposta:**
```json
{
  "message": "Imóvel deletado com sucesso"
}
```

## 🏠 Unidades

### Criar Unidade

```bash
curl -X POST http://localhost:8000/api/unidades \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "imovel_id": 1,
    "numero": "103",
    "valor_aluguel": 1700.50,
    "status": "disponivel"
  }'
```

**Resposta:**
```json
{
  "id": 3,
  "imovel_id": 1,
  "numero": "103",
  "valor_aluguel": 1700.5,
  "status": "disponivel"
}
```

### Atualizar Unidade

```bash
curl -X PUT http://localhost:8000/api/unidades/3 \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "numero": "103",
    "valor_aluguel": 1800.0,
    "status": "disponivel"
  }'
```

### Deletar Unidade

```bash
curl -X DELETE http://localhost:8000/api/unidades/3 \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

## 👤 Locatários

### Criar Locatário

```bash
curl -X POST http://localhost:8000/api/locatarios \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "unidade_id": 2,
    "nome": "Pedro Oliveira",
    "cpf": "987.654.321-00",
    "telefone": "(11) 91234-5678",
    "email": "pedro@email.com",
    "data_inicio_contrato": "2024-02-01",
    "data_fim_contrato": "2025-02-01"
  }'
```

**Resposta:**
```json
{
  "id": 2,
  "unidade_id": 2,
  "nome": "Pedro Oliveira",
  "cpf": "987.654.321-00",
  "telefone": "(11) 91234-5678",
  "email": "pedro@email.com",
  "data_inicio_contrato": "2024-02-01",
  "data_fim_contrato": "2025-02-01"
}
```

**Nota:** O status da unidade é automaticamente alterado para "alugado".

### Atualizar Locatário

```bash
curl -X PUT http://localhost:8000/api/locatarios/2 \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Pedro Oliveira Silva",
    "cpf": "987.654.321-00",
    "telefone": "(11) 91234-5678",
    "email": "pedro.silva@email.com",
    "data_inicio_contrato": "2024-02-01",
    "data_fim_contrato": "2026-02-01"
  }'
```

### Remover Locatário

```bash
curl -X DELETE http://localhost:8000/api/locatarios/2 \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

**Resposta:**
```json
{
  "message": "Locatário removido com sucesso"
}
```

**Nota:** O status da unidade é automaticamente alterado para "disponivel".

## 🐍 Exemplos em Python

### Usando requests

```python
import requests

BASE_URL = "http://localhost:8000"

# Login
response = requests.post(f"{BASE_URL}/api/auth/login", json={
    "email": "usuario1@email.com",
    "senha": "usuario1"
})
token = response.json()["access_token"]

# Headers com autenticação
headers = {"Authorization": f"Bearer {token}"}

# Listar imóveis
imoveis = requests.get(f"{BASE_URL}/api/imoveis", headers=headers).json()
print(imoveis)

# Criar imóvel
novo_imovel = requests.post(
    f"{BASE_URL}/api/imoveis",
    headers=headers,
    json={
        "nome": "Meu Imóvel",
        "endereco": "Rua Teste, 123",
        "cidade": "São Paulo",
        "estado": "SP"
    }
).json()
print(novo_imovel)
```

## 🟢 Exemplos em JavaScript

### Usando fetch

```javascript
const BASE_URL = 'http://localhost:8000';

// Login
const login = async () => {
  const response = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'usuario1@email.com',
      senha: 'usuario1'
    })
  });
  const data = await response.json();
  return data.access_token;
};

// Listar imóveis
const listarImoveis = async (token) => {
  const response = await fetch(`${BASE_URL}/api/imoveis`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await response.json();
};

// Criar imóvel
const criarImovel = async (token) => {
  const response = await fetch(`${BASE_URL}/api/imoveis`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      nome: 'Meu Imóvel',
      endereco: 'Rua Teste, 123',
      cidade: 'São Paulo',
      estado: 'SP'
    })
  });
  return await response.json();
};

// Uso
(async () => {
  const token = await login();
  const imoveis = await listarImoveis(token);
  console.log(imoveis);
})();
```

### Usando Axios

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000'
});

// Login e configurar token
const login = async () => {
  const { data } = await api.post('/api/auth/login', {
    email: 'usuario1@email.com',
    senha: 'usuario1'
  });
  
  // Configurar token para próximas requisições
  api.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
  
  return data.access_token;
};

// Listar imóveis
const listarImoveis = async () => {
  const { data } = await api.get('/api/imoveis');
  return data;
};

// Criar imóvel
const criarImovel = async (imovel) => {
  const { data } = await api.post('/api/imoveis', imovel);
  return data;
};
```

## ❌ Tratamento de Erros

### Erro 400 - Bad Request

```json
{
  "detail": "Já existe uma unidade com este número neste imóvel"
}
```

### Erro 401 - Unauthorized

```json
{
  "detail": "Credenciais inválidas"
}
```

### Erro 403 - Forbidden

```json
{
  "detail": "Você não tem permissão para acessar este imóvel"
}
```

### Erro 404 - Not Found

```json
{
  "detail": "Imóvel não encontrado"
}
```

### Erro 422 - Validation Error

```json
{
  "detail": [
    {
      "loc": ["body", "email"],
      "msg": "value is not a valid email address",
      "type": "value_error.email"
    }
  ]
}
```

## 🧪 Testando com Postman

1. Importe a coleção (criar arquivo `postman_collection.json`)
2. Configure variável de ambiente `base_url` = `http://localhost:8000`
3. Configure variável `token` após login
4. Use `{{base_url}}` e `{{token}}` nas requisições

## 📚 Documentação Interativa

Acesse http://localhost:8000/docs para testar todos os endpoints diretamente no navegador com interface Swagger.

## 🔍 Dicas

- Use `jq` para formatar JSON no terminal: `curl ... | jq`
- Salve o token em variável: `TOKEN=$(curl ... | jq -r .access_token)`
- Use Postman/Insomnia para testes mais complexos
- Consulte logs do backend para debug: `uvicorn main:app --reload --log-level debug`

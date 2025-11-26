# 🤝 Contribuindo

Obrigado por considerar contribuir com o Sistema de Gerenciamento de Aluguéis!

## 🚀 Como Contribuir

### 1. Fork o Projeto

```bash
# Clone seu fork
git clone https://github.com/seu-usuario/rental-management.git
cd rental-management

# Adicione o repositório original como upstream
git remote add upstream https://github.com/original/rental-management.git
```

### 2. Crie uma Branch

```bash
# Atualize sua main
git checkout main
git pull upstream main

# Crie uma branch para sua feature
git checkout -b feature/minha-feature
```

### 3. Faça suas Alterações

- Escreva código limpo e bem documentado
- Siga os padrões de código do projeto
- Adicione testes se aplicável
- Atualize a documentação

### 4. Commit suas Mudanças

```bash
git add .
git commit -m "feat: adiciona funcionalidade X"
```

#### Padrão de Commits

Use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação
- `refactor:` Refatoração
- `test:` Testes
- `chore:` Manutenção

### 5. Push e Pull Request

```bash
git push origin feature/minha-feature
```

Abra um Pull Request no GitHub com:
- Descrição clara das mudanças
- Screenshots se aplicável
- Referência a issues relacionadas

## 🐛 Reportando Bugs

Ao reportar bugs, inclua:

- **Descrição**: O que aconteceu?
- **Passos para Reproduzir**: Como reproduzir o bug?
- **Comportamento Esperado**: O que deveria acontecer?
- **Screenshots**: Se aplicável
- **Ambiente**: OS, versões do Python/Node, etc.

## 💡 Sugerindo Melhorias

Sugestões são bem-vindas! Abra uma issue com:

- **Descrição**: O que você gostaria de ver?
- **Motivação**: Por que isso seria útil?
- **Alternativas**: Outras soluções consideradas?

## 📋 Checklist para Pull Requests

- [ ] Código segue os padrões do projeto
- [ ] Testes passam localmente
- [ ] Documentação atualizada
- [ ] Commits seguem o padrão
- [ ] Branch está atualizada com main
- [ ] Sem conflitos de merge

## 🧪 Executando Testes

### Backend
```bash
cd backend-python
pytest
```

### Frontend
```bash
cd frontend
npm test
```

### Mobile
```bash
cd mobile-react-native
npm test
```

## 📝 Padrões de Código

### Python (Backend)
- PEP 8
- Type hints quando possível
- Docstrings para funções públicas

```python
def criar_imovel(imovel: ImovelCreate, db: Session) -> Imovel:
    """
    Cria um novo imóvel no banco de dados.
    
    Args:
        imovel: Dados do imóvel a ser criado
        db: Sessão do banco de dados
        
    Returns:
        Imóvel criado com ID
    """
    pass
```

### JavaScript/TypeScript
- ESLint + Prettier
- Componentes funcionais com hooks
- Props tipadas (TypeScript)

```typescript
interface Props {
  imovel: Imovel;
  onDelete: (id: number) => void;
}

const ImovelCard: React.FC<Props> = ({ imovel, onDelete }) => {
  // ...
};
```

## 🎨 Estilo de Código

### Backend
```bash
# Formatar código
black .
isort .

# Lint
flake8
mypy .
```

### Frontend/Mobile
```bash
# Formatar código
npm run format

# Lint
npm run lint
```

## 📚 Documentação

Ao adicionar novas funcionalidades:

1. Atualize o README.md
2. Adicione exemplos em API_EXAMPLES.md
3. Documente arquitetura em ARCHITECTURE.md
4. Atualize GUIA_COMPLETO.txt

## 🌟 Boas Práticas

### Commits
- Commits pequenos e focados
- Mensagens descritivas
- Um commit por mudança lógica

### Código
- DRY (Don't Repeat Yourself)
- KISS (Keep It Simple, Stupid)
- YAGNI (You Aren't Gonna Need It)
- Código auto-explicativo

### Testes
- Teste casos de sucesso e erro
- Mocks para dependências externas
- Coverage mínimo de 80%

## 🤔 Dúvidas?

- Abra uma issue com a tag `question`
- Entre em contato via email
- Consulte a documentação

## 📜 Código de Conduta

- Seja respeitoso e inclusivo
- Aceite críticas construtivas
- Foque no que é melhor para a comunidade
- Mostre empatia com outros membros

## 🎉 Reconhecimento

Contribuidores serão listados no README.md e terão nosso agradecimento!

## 📄 Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a mesma licença do projeto (MIT).

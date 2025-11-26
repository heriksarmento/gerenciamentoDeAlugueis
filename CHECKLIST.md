# ✅ Checklist de Verificação

Use este checklist para garantir que tudo está funcionando corretamente.

## 🔧 Instalação

### Backend
- [ ] Python 3.11+ instalado
- [ ] Ambiente virtual criado
- [ ] Dependências instaladas (`pip install -r requirements.txt`)
- [ ] Banco de dados inicializado (`python init_db.py`)
- [ ] Servidor iniciado (`uvicorn main:app --reload`)
- [ ] Documentação acessível em http://localhost:8000/docs

### Frontend
- [ ] Node.js 18+ instalado
- [ ] Dependências instaladas (`npm install`)
- [ ] Servidor iniciado (`npm run dev`)
- [ ] Aplicação acessível em http://localhost:5173

### Mobile (Opcional)
- [ ] React Native CLI instalado
- [ ] Android Studio/Xcode configurado
- [ ] Dependências instaladas (`npm install`)
- [ ] URL da API configurada em `src/services/api.ts`
- [ ] App rodando no emulador/dispositivo

## 🧪 Testes Funcionais

### Autenticação
- [ ] Login com usuario1@email.com / usuario1 funciona
- [ ] Login com usuario2@email.com / usuario2 funciona
- [ ] Login com credenciais inválidas mostra erro
- [ ] Logout funciona corretamente
- [ ] Token é salvo no localStorage/AsyncStorage
- [ ] Requisições incluem token no header

### Imóveis
- [ ] Listar imóveis funciona
- [ ] Criar novo imóvel funciona
- [ ] Visualizar detalhes do imóvel funciona
- [ ] Atualizar imóvel funciona
- [ ] Deletar imóvel funciona
- [ ] Deletar imóvel remove unidades e locatários (cascade)

### Unidades
- [ ] Criar unidade funciona
- [ ] Unidade aparece na lista do imóvel
- [ ] Atualizar unidade funciona
- [ ] Deletar unidade funciona
- [ ] Não permite número duplicado no mesmo imóvel
- [ ] Status inicial é "disponivel"

### Locatários
- [ ] Adicionar locatário funciona
- [ ] Status da unidade muda para "alugado"
- [ ] Informações do locatário aparecem corretamente
- [ ] Atualizar locatário funciona
- [ ] Remover locatário funciona
- [ ] Status da unidade volta para "disponivel"
- [ ] Não permite locatário duplicado na mesma unidade

## 🎨 Interface

### Frontend Web
- [ ] Design está responsivo (mobile, tablet, desktop)
- [ ] Cards de imóveis são clicáveis
- [ ] Modais abrem e fecham corretamente
- [ ] Formulários validam campos obrigatórios
- [ ] Badges de status têm cores corretas (verde/vermelho)
- [ ] Botões têm hover effects
- [ ] Loading states aparecem durante requisições
- [ ] Mensagens de erro são exibidas

### Mobile
- [ ] Navegação entre telas funciona
- [ ] Pull to refresh funciona
- [ ] FAB está visível e funcional
- [ ] Teclado não sobrepõe inputs (KeyboardAvoidingView)
- [ ] Loading indicators aparecem
- [ ] Confirmações antes de deletar funcionam
- [ ] Badges de status estão visíveis

## 🔐 Segurança

- [ ] Senhas não aparecem em logs
- [ ] Token JWT expira após 7 dias
- [ ] Rotas protegidas requerem autenticação
- [ ] Usuário só acessa seus próprios dados
- [ ] CORS está configurado
- [ ] SQL Injection está protegido (ORM)
- [ ] Validação de entrada funciona

## 📊 API

- [ ] Swagger docs acessível em /docs
- [ ] Todos os endpoints retornam JSON
- [ ] Status codes corretos (200, 201, 400, 401, 404)
- [ ] Mensagens de erro são descritivas
- [ ] Validação Pydantic funciona
- [ ] Relacionamentos em cascata funcionam

## 🗄️ Banco de Dados

- [ ] Arquivo rental.db foi criado
- [ ] Tabelas foram criadas corretamente
- [ ] Usuários de teste existem
- [ ] Relacionamentos funcionam
- [ ] Constraints são respeitadas
- [ ] Cascade delete funciona

## 📱 Mobile Específico

### Android
- [ ] App instala no emulador
- [ ] App instala em dispositivo físico
- [ ] Conexão com API funciona (10.0.2.2 ou IP)
- [ ] AsyncStorage persiste dados
- [ ] Navegação funciona
- [ ] Não há crashes

### iOS
- [ ] App instala no simulador
- [ ] App instala em dispositivo físico
- [ ] Conexão com API funciona (localhost ou IP)
- [ ] AsyncStorage persiste dados
- [ ] Navegação funciona
- [ ] Não há crashes

## 🐛 Tratamento de Erros

- [ ] Erro 401 redireciona para login
- [ ] Erro 404 mostra mensagem apropriada
- [ ] Erro 400 mostra detalhes da validação
- [ ] Erro de rede mostra mensagem
- [ ] Erros não quebram a aplicação

## 📚 Documentação

- [ ] README.md está completo
- [ ] QUICK_START.md tem instruções claras
- [ ] GUIA_COMPLETO.txt está formatado
- [ ] API_EXAMPLES.md tem exemplos funcionais
- [ ] Cada pasta tem seu README
- [ ] Comentários no código são claros

## 🚀 Performance

- [ ] Backend responde rapidamente (<100ms)
- [ ] Frontend carrega rápido
- [ ] Mobile é fluido (60fps)
- [ ] Listas grandes não travam
- [ ] Imagens carregam eficientemente

## 🔄 Fluxo Completo

### Cenário 1: Novo Usuário
- [ ] 1. Acessa aplicação
- [ ] 2. Faz login com usuário teste
- [ ] 3. Vê dashboard vazio
- [ ] 4. Cria primeiro imóvel
- [ ] 5. Adiciona unidade
- [ ] 6. Adiciona locatário
- [ ] 7. Vê status "alugado"

### Cenário 2: Gerenciar Imóveis
- [ ] 1. Login
- [ ] 2. Vê lista de imóveis
- [ ] 3. Clica em imóvel
- [ ] 4. Vê detalhes e unidades
- [ ] 5. Edita informações
- [ ] 6. Deleta unidade
- [ ] 7. Remove locatário

### Cenário 3: Mobile
- [ ] 1. Abre app
- [ ] 2. Login automático (se token válido)
- [ ] 3. Pull to refresh atualiza lista
- [ ] 4. Navega para detalhes
- [ ] 5. Adiciona nova unidade
- [ ] 6. Volta para home
- [ ] 7. Logout

## 🎯 Casos Extremos

- [ ] Login com email inválido
- [ ] Criar imóvel sem campos obrigatórios
- [ ] Adicionar unidade com número duplicado
- [ ] Adicionar locatário em unidade ocupada
- [ ] Deletar imóvel com unidades
- [ ] Token expirado
- [ ] Backend offline
- [ ] Conexão lenta

## 📦 Build

### Frontend
- [ ] `npm run build` funciona
- [ ] Pasta `dist/` é criada
- [ ] Build pode ser servido estaticamente

### Mobile
- [ ] Android: `./gradlew assembleRelease` funciona
- [ ] iOS: Archive funciona no Xcode
- [ ] APK/IPA pode ser instalado

## 🌐 Deploy (Opcional)

- [ ] Backend deployado e acessível
- [ ] Frontend deployado e acessível
- [ ] HTTPS configurado
- [ ] Variáveis de ambiente configuradas
- [ ] CORS configurado para domínio de produção
- [ ] Banco de dados de produção funciona

## ✨ Extras

- [ ] .gitignore está configurado
- [ ] LICENSE está incluída
- [ ] CONTRIBUTING.md está completo
- [ ] Código está formatado
- [ ] Não há console.log desnecessários
- [ ] Não há TODOs pendentes críticos

## 🎉 Pronto para Produção?

Se todos os itens acima estão marcados, seu sistema está pronto para uso!

### Checklist Final
- [ ] Todos os testes funcionais passam
- [ ] Documentação está completa
- [ ] Código está limpo
- [ ] Segurança está implementada
- [ ] Performance é aceitável
- [ ] Deploy está funcionando (se aplicável)

---

**Parabéns! 🎊 Seu sistema está completo e funcional!**

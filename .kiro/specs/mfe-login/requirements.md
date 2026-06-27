# MFE Login — Requirements

## Descrição

Microfrontend de autenticação que renderiza um formulário de login completo como Web Component (`<mfe-login>`). Carregado pelo shell via import maps. Dados mockados inicialmente, mas com arquitetura preparada para integração real futura.

## Requisitos Funcionais

### RF-001 — Formulário de Login
- DEVE renderizar campos de Email e Senha
- DEVE renderizar botão "Entrar"
- DEVE renderizar link "Esqueci minha senha"
- DEVE renderizar link "Cadastre-se"

### RF-002 — Validação de Campos
- Email DEVE ser obrigatório (required)
- Email DEVE validar formato (regex padrão)
- Senha DEVE ser obrigatória (required)
- Senha DEVE ter mínimo 6 caracteres
- DEVE exibir mensagens de erro inline por campo
- DEVE bloquear submit enquanto houver erros

### RF-003 — Submit
- AO clicar "Entrar" com dados válidos, DEVE chamar o AuthService
- DEVE exibir estado de loading durante a chamada
- SE sucesso: DEVE emitir Custom Event `mfe-login:success` com dados do usuário
- SE erro: DEVE exibir mensagem de erro genérica ("Credenciais inválidas")

### RF-004 — Links de Navegação
- Link "Esqueci minha senha": DEVE emitir Custom Event `mfe-login:forgot-password`
- Link "Cadastre-se": DEVE emitir Custom Event `mfe-login:register`
- O shell decide como tratar esses eventos (navegação, modal, etc.)

## Requisitos Não-Funcionais

### RNF-001 — Encapsulamento
- Componente usa Shadow DOM (Lit padrão)
- CSS não vaza para fora nem sofre interferência externa
- Theming via CSS Custom Properties herdadas do shell

### RNF-002 — Acessibilidade
- Labels associados aos inputs (for/id)
- Mensagens de erro com aria-live
- Navegação por teclado funcional (Tab, Enter para submit)
- Contraste mínimo AA (WCAG 2.1)

### RNF-003 — Preparação para API Real
- Interface AuthService como contrato
- Implementação mock hoje
- Troca para HTTP sem alterar componentes

### RNF-004 — Cobertura de Testes
- 100% de cobertura em domínio (entities, validators, services)
- Testes de componente para interações principais

## Dados Mock

```typescript
// Credencial válida para mock
{ email: "admin@mfe.dev", password: "123456" }

// Resposta de sucesso
{ user: { id: "1", name: "Admin", email: "admin@mfe.dev" }, token: "mock-jwt-token" }
```

## Fora de Escopo

- Backend real / API de autenticação
- Tela de cadastro (futuro MFE separado)
- Tela de recuperação de senha (futuro MFE separado)
- Persistência de sessão (localStorage/cookie)

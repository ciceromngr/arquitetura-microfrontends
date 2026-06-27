# MFE Login — Design

## Arquitetura

```
apps/mfe-login/
├── src/
│   ├── domain/
│   │   ├── entities/
│   │   │   └── credentials.ts          ← Value Object (email + password)
│   │   ├── services/
│   │   │   └── auth-service.ts          ← Interface do contrato de auth
│   │   └── validators/
│   │       └── credential-validator.ts  ← Regras de validação
│   ├── infrastructure/
│   │   └── auth-service-mock.ts         ← Mock (implementa AuthService)
│   ├── components/
│   │   ├── mfe-login.ts                 ← Custom Element principal
│   │   ├── login-form.ts               ← Formulário (inputs + botão)
│   │   └── login-links.ts              ← Links navegação
│   ├── styles/
│   │   └── login.styles.ts             ← Estilos Lit (css tagged template)
│   ├── index.ts                         ← Entry point
│   └── __tests__/
│       ├── credentials.spec.ts
│       ├── credential-validator.spec.ts
│       ├── auth-service-mock.spec.ts
│       └── mfe-login.spec.ts
├── package.json
├── project.json
├── tsconfig.json
└── vite.config.ts
```

## Domain Model

### Entities

```typescript
// credentials.ts — Value Object
export interface Credentials {
  email: string;
  password: string;
}

export interface AuthResult {
  success: boolean;
  user?: { id: string; name: string; email: string };
  token?: string;
  error?: string;
}
```

### Services (Interface)

```typescript
// auth-service.ts — Contrato
export interface AuthService {
  login(credentials: Credentials): Promise<AuthResult>;
}
```

### Validators

```typescript
// credential-validator.ts
export interface ValidationResult {
  valid: boolean;
  errors: { field: string; message: string }[];
}

export function validateCredentials(credentials: Credentials): ValidationResult;
```

## Component Design

### `<mfe-login>` — Orquestrador

- Instancia AuthService (mock por default)
- Gerencia estado global (loading, error)
- Escuta eventos dos sub-componentes
- Emite Custom Events para o shell

### `<login-form>` — Formulário

- @property: `loading` (boolean), `errors` (ValidationError[])
- Renderiza inputs (email, password) + botão
- Emite evento `login-form:submit` com { email, password }
- Exibe erros inline por campo

### `<login-links>` — Links

- Renderiza "Esqueci minha senha" e "Cadastre-se"
- Emite `login-links:forgot` e `login-links:register`

## Custom Events (API Pública)

| Evento | Detail | Quando |
|--------|--------|--------|
| `mfe-login:success` | `{ user, token }` | Login bem-sucedido |
| `mfe-login:error` | `{ message }` | Erro de autenticação |
| `mfe-login:forgot-password` | `{}` | Click em "Esqueci senha" |
| `mfe-login:register` | `{}` | Click em "Cadastre-se" |

## Estilização

- CSS Custom Properties do shell para cores, fontes, espaçamentos
- Estilos locais via `static styles` (Shadow DOM)
- Layout: card centralizado (flexbox), responsivo
- Estados visuais: default, focus, error, loading (disabled + spinner)

## Decisões de Design

1. **Sub-componentes internos** (`login-form`, `login-links`) NÃO são expostos como custom elements públicos — são internos ao MFE
2. **AuthService injetado** no `mfe-login` via propriedade — permite trocar implementação
3. **Validação síncrona** no client — sem round-trip para validar formato
4. **Eventos bubbles + composed** — para atravessar Shadow DOM e chegar no shell

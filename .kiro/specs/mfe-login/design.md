# MFE Login — Design

## Arquitetura

```
apps/mfe-login/
├── src/
│   ├── domain/
│   │   ├── entities/
│   │   │   └── credentials.js          ← Factory + constantes
│   │   ├── services/
│   │   │   └── auth-service.js          ← Classe base (contrato)
│   │   └── validators/
│   │       └── credential-validator.js  ← Regras de validação
│   ├── infrastructure/
│   │   └── auth-service-mock.js         ← Mock (extends AuthService)
│   ├── components/
│   │   ├── mfe-login.js                 ← Custom Element principal
│   │   ├── login-form.js               ← Formulário (inputs + botão)
│   │   └── login-links.js              ← Links navegação
│   ├── styles/
│   │   └── login.styles.js             ← Estilos Lit (css tagged template)
│   ├── index.js                         ← Entry point
│   └── __tests__/
│       ├── credentials.spec.js
│       ├── credential-validator.spec.js
│       ├── auth-service-mock.spec.js
│       └── mfe-login.spec.js
├── package.json
├── project.json
└── vite.config.js
```

## Domain Model

### Entities

```javascript
// credentials.js — Factory function
/**
 * @param {string} email
 * @param {string} password
 * @returns {{ email: string, password: string }}
 */
export function createCredentials(email, password) {
  return { email, password };
}

/**
 * @typedef {Object} AuthResult
 * @property {boolean} success
 * @property {{ id: string, name: string, email: string }} [user]
 * @property {string} [token]
 * @property {string} [error]
 */
```

### Services (Classe Base)

```javascript
// auth-service.js — Contrato (classe abstrata simulada)
export class AuthService {
  /**
   * @param {{ email: string, password: string }} credentials
   * @returns {Promise<AuthResult>}
   */
  async login(credentials) {
    throw new Error('AuthService.login() must be implemented');
  }
}
```

### Validators

```javascript
// credential-validator.js
/**
 * @param {{ email: string, password: string }} credentials
 * @returns {{ valid: boolean, errors: Array<{ field: string, message: string }> }}
 */
export function validateCredentials(credentials) { ... }
```

## Component Design (Lit + JS puro)

### `<mfe-login>` — Orquestrador

```javascript
import { LitElement, html } from 'lit';

export class MfeLogin extends LitElement {
  static properties = {
    loading: { type: Boolean },
    error: { type: String },
  };
  // ...
}
customElements.define('mfe-login', MfeLogin);
```

### `<login-form>` — Formulário

- `static properties`: `loading` (Boolean), `errors` (Array)
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

1. **JavaScript puro** — sem TypeScript, usando JSDoc para documentação de tipos
2. **Lit com static properties** — em vez de decorators (@property, @state)
3. **Sub-componentes internos** (`login-form`, `login-links`) NÃO são expostos publicamente
4. **AuthService como classe base** — extends para implementações (mock, HTTP futuro)
5. **Validação síncrona** no client — sem round-trip
6. **Eventos bubbles + composed** — para atravessar Shadow DOM

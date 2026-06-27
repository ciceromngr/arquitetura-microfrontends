# MFE Login — Tasks

## Task 1: Setup do app + domínio

**Branch**: `task/mfe-login-domain`

**Arquivos** (9):
1. `apps/mfe-login/package.json` — Package do MFE (@mfe/login)
2. `apps/mfe-login/project.json` — Config NX (targets: dev, build, test)
3. `apps/mfe-login/tsconfig.json` — Extends tsconfig.base.json
4. `apps/mfe-login/vite.config.ts` — Extends vite.config.base.ts + entry
5. `apps/mfe-login/src/index.ts` — Entry point (registra custom element)
6. `apps/mfe-login/src/domain/entities/credentials.ts` — Interfaces Credentials + AuthResult
7. `apps/mfe-login/src/domain/services/auth-service.ts` — Interface AuthService
8. `apps/mfe-login/src/domain/validators/credential-validator.ts` — validateCredentials()
9. `apps/mfe-login/src/infrastructure/auth-service-mock.ts` — AuthServiceMock (implements AuthService)

**Critérios de aceite**:
- [ ] Domínio modelado com tipos explícitos
- [ ] Validador cobre: email required, email formato, senha required, senha min 6
- [ ] Mock retorna sucesso para admin@mfe.dev/123456 e erro para qualquer outro
- [ ] `bun install` funciona sem erros no workspace

---

## Task 2: Componentes UI

**Branch**: `task/mfe-login-components`

**Arquivos** (6):
1. `apps/mfe-login/src/styles/login.styles.ts` — CSS (card centralizado, responsivo, estados)
2. `apps/mfe-login/src/components/login-form.ts` — Formulário com validação inline
3. `apps/mfe-login/src/components/login-links.ts` — Links "esqueci senha" + "cadastro"
4. `apps/mfe-login/src/components/mfe-login.ts` — Orquestrador (usa AuthService, gerencia estado)
5. `apps/mfe-login/src/index.ts` — Atualizar imports/exports
6. `apps/shell/index.html` — Adicionar `<mfe-login>` + import map entry

**Critérios de aceite**:
- [ ] `<mfe-login>` renderiza formulário completo
- [ ] Validação inline funciona (erro aparece ao tentar submit com campos inválidos)
- [ ] Loading state visível durante submit
- [ ] Custom Events disparados corretamente (success, error, forgot, register)
- [ ] Acessibilidade: labels, aria-live, Tab navigation, Enter submit
- [ ] CSS Custom Properties do shell aplicadas (cores, fontes)

---

## Task 3: Testes 100% cobertura

**Branch**: `task/mfe-login-tests`

**Arquivos** (5):
1. `apps/mfe-login/vitest.config.ts` — Config de testes (coverage threshold 100%)
2. `apps/mfe-login/src/__tests__/credentials.spec.ts` — Testes de tipo/criação
3. `apps/mfe-login/src/__tests__/credential-validator.spec.ts` — Testes de validação (happy + edge)
4. `apps/mfe-login/src/__tests__/auth-service-mock.spec.ts` — Testes do mock (sucesso + erro)
5. `apps/mfe-login/src/__tests__/mfe-login.spec.ts` — Testes de componente (render, submit, events)

**Critérios de aceite**:
- [ ] 100% coverage em domínio (entities, validators, services)
- [ ] Testes de componente cobrem: render, validação, submit sucesso, submit erro, eventos
- [ ] `nx run mfe-login:test` passa sem erros
- [ ] Coverage report gerado

---

## Ordem de Execução

1. Task 1 (domínio) → merge na feature
2. Task 2 (componentes) → merge na feature
3. Task 3 (testes) → merge na feature
4. Feature completa → merge na developer

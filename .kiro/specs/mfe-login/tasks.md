# MFE Login — Tasks

## Task 1: Setup do app + domínio

**Branch**: `task/mfe-login-domain`

**Arquivos** (9):
1. `apps/mfe-login/package.json` — Package do MFE (@mfe/login)
2. `apps/mfe-login/project.json` — Config NX (targets: dev, build, test)
3. `apps/mfe-login/vite.config.js` — Config Vite (entry point)
4. `apps/mfe-login/src/index.js` — Entry point (registra custom element)
5. `apps/mfe-login/src/domain/entities/credentials.js` — Factory createCredentials + JSDoc types
6. `apps/mfe-login/src/domain/services/auth-service.js` — Classe base AuthService (contrato)
7. `apps/mfe-login/src/domain/validators/credential-validator.js` — validateCredentials()
8. `apps/mfe-login/src/infrastructure/auth-service-mock.js` — AuthServiceMock (extends AuthService)
9. `apps/mfe-login/src/styles/login.styles.js` — CSS do componente (Lit css template)

**Critérios de aceite**:
- [x] Domínio modelado com JSDoc para documentação de tipos
- [x] Validador cobre: email required, email formato, senha required, senha min 6
- [x] Mock retorna sucesso para admin@mfe.dev/123456 e erro para qualquer outro
- [x] `bun install` funciona sem erros no workspace

---

## Task 2: Componentes UI

**Branch**: `task/mfe-login-components`

**Arquivos** (5):
1. `apps/mfe-login/src/components/login-form.js` — Formulário com validação inline
2. `apps/mfe-login/src/components/login-links.js` — Links "esqueci senha" + "cadastro"
3. `apps/mfe-login/src/components/mfe-login.js` — Orquestrador (usa AuthService, gerencia estado)
4. `apps/mfe-login/src/index.js` — Atualizar imports/exports
5. `apps/shell/index.html` — Adicionar `<mfe-login>` + import map entry

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
1. `apps/mfe-login/vitest.config.js` — Config de testes (coverage threshold 100%)
2. `apps/mfe-login/src/__tests__/credentials.spec.js` — Testes de factory/criação
3. `apps/mfe-login/src/__tests__/credential-validator.spec.js` — Testes de validação (happy + edge)
4. `apps/mfe-login/src/__tests__/auth-service-mock.spec.js` — Testes do mock (sucesso + erro)
5. `apps/mfe-login/src/__tests__/mfe-login.spec.js` — Testes de componente (render, submit, events)

**Critérios de aceite**:
- [ ] 100% coverage em domínio (entities, validators, services)
- [ ] Testes de componente cobrem: render, validação, submit sucesso, submit erro, eventos
- [ ] `nx run mfe-login:test` passa sem erros
- [ ] Coverage report gerado

---

## Ordem de Execução

1. Task 1 (domínio + estilos) → merge na feature
2. Task 2 (componentes) → merge na feature
3. Task 3 (testes) → merge na feature
4. Feature completa → merge na developer

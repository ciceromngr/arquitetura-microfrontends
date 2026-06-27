---
inclusion: auto
description: Contexto do projeto (stack, arquitetura, convenções). Use para qualquer decisão técnica que dependa de conhecer o projeto.
---

# Contexto do Projeto

Referências relacionadas: [dev-flow.md](./dev-flow.md), [quality-rules.md](./quality-rules.md), [ecosystem-map.md](./ecosystem-map.md)

## Instruções

- USE estas informações como base para todas as decisões técnicas
- NÃO assuma stack/padrões diferentes dos listados aqui
- SE alguma informação estiver faltando, PERGUNTE antes de prosseguir
- RESPEITE as convenções listadas — não introduza padrões novos sem justificativa

## Stack Técnica

- **Linguagem**: TypeScript 5.x (strict mode)
- **UI Framework**: Lit 3.x (Web Components nativos)
- **Runtime**: Bun (package manager + runtime)
- **Bundler**: Vite 6.x (dev server + build)
- **Monorepo**: NX 20.x com @nx/web
- **Testes**: Vitest 2.x (100% cobertura obrigatória)
- **Lint/Format**: EditorConfig (indent 2 spaces, LF, UTF-8)
- **CSS**: CSS puro com Custom Properties (variáveis) — sem preprocessador
- **Composição MFE**: Import Maps nativos do browser

## Arquitetura

- **Padrão**: Microfrontends com Web Components (Lit) em monorepo NX
- **Shell**: index.html puro que orquestra MFEs via import maps + script tags
- **Microfrontends**: Cada MFE é um custom element autônomo (ex: `<mfe-header>`)
- **Shared libs**: Design tokens e utils em `libs/` compartilhados via path aliases
- **Encapsulamento**: Shadow DOM (estilo do Lit) — cada componente isola seu CSS
- **Comunicação entre MFEs**: Custom Events do DOM (zero acoplamento)
- **DDD**: Domain-Driven Design — modelar domínio antes de implementar

## Estrutura do Monorepo

```
├── apps/
│   ├── shell/          ← App host (index.html + import maps)
│   └── [mfe-name]/    ← Cada microfrontend
├── libs/
│   ├── tokens/        ← Design tokens (CSS custom properties)
│   └── utils/         ← Utilitários compartilhados
├── package.json       ← Workspace root (@mfe/root)
├── nx.json            ← Config NX (defaultBase: developer)
├── tsconfig.base.json ← TS base compartilhado
└── vite.config.base.ts← Vite base para MFEs
```

## Convenções

- **Branch naming**: `developer` → `feature/nome` → `task/descricao`
- **Commit style**: Conventional Commits (`feat:`, `fix:`, `docs:`, `refactor:`)
- **PR flow**: task → merge na feature → feature completa → merge na developer
- **Estrutura de pastas MFE**: `apps/[mfe]/src/{components,domain,services}`
- **Naming code**: camelCase funções/variáveis, PascalCase classes/componentes, kebab-case arquivos
- **Naming componentes**: prefixo `mfe-` para custom elements (ex: `mfe-header`)
- **Package naming**: scope `@mfe/` (ex: `@mfe/shell`, `@mfe/tokens`)
- **Max arquivos por commit**: 10

## Regras de Negócio Críticas

- Portfolio enterprise-grade — qualidade e padrões devem refletir projetos profissionais
- Inspirado no padrão Alterdata (import maps + Lit + Bun)
- 100% de cobertura de testes em toda task

## Áreas Sensíveis

- `apps/shell/index.html` — Orquestrador central de MFEs, alteração impacta todos
- `libs/tokens/` — Design tokens globais, mudança afeta visual de todos os MFEs
- `vite.config.base.ts` — Config compartilhada, mudança afeta build de todos
- `tsconfig.base.json` — TypeScript base, mudança afeta compilação de todos

## Dependências Externas Relevantes

- **Lit**: Framework de Web Components (Google) — versão 3.x
- **Vite**: Bundler e dev server com HMR
- **NX**: Orquestrador de monorepo com cache e graph de dependências
- **Vitest**: Test runner compatível com Vite (mesma config)

## Ambientes

| Ambiente | URL/Host | Observações |
|----------|----------|-------------|
| Local | localhost:5173 | `bun run dev` via Vite |
| Staging | — | A definir |
| Produção | — | A definir |

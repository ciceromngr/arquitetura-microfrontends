---
inclusion: auto
description: Decisões arquiteturais vigentes (ADR light). Consolida decisões já tomadas para que não sejam questionadas repetidamente.
---

# Decisões Arquiteturais Vigentes (ADR)

Referências: [project-context.md](./project-context.md), [quality-rules.md](./quality-rules.md)

## Instruções

- RESPEITE estas decisões — elas já foram avaliadas e aceitas
- NÃO proponha alternativas sem que o desenvolvedor peça explicitamente
- SE uma decisão parece conflitar com o que está sendo feito, SINALIZE — mas não mude
- NOVAS decisões devem ser adicionadas aqui quando consolidadas (promovidas do autoaprendizado)

## Formato

Cada decisão segue:

```
### ADR-[NNN] — Título curto

- **Status**: Vigente | Substituída por ADR-XXX | Em revisão
- **Data**: YYYY-MM-DD
- **Contexto**: O que motivou a decisão
- **Decisão**: O que foi decidido
- **Consequências**: Trade-offs aceitos
- **Alternativas descartadas**: O que foi considerado e por quê não
```

## Decisões Registradas

### ADR-001 — Monorepo NX com microfrontends via Web Components

- **Status**: Vigente
- **Data**: 2026-06-27
- **Contexto**: Necessidade de uma arquitetura escalável para portfolio enterprise-grade que demonstre domínio de microfrontends, inspirada no padrão utilizado na Alterdata.
- **Decisão**: Monorepo NX com @nx/web, microfrontends como Web Components (Lit), composição via import maps nativos, shell HTML puro.
- **Consequências**: Cada MFE é independente (build, deploy, test). Sem framework pesado. Maior controle sobre carregamento. NX gerencia dependências e cache.
- **Alternativas descartadas**: Module Federation (complexidade desnecessária para import maps), React/Vue (peso extra, vendor lock-in), repos separados (perda de shared libs e graph de dependências)

---

### ADR-002 — Lit como framework de Web Components

- **Status**: Vigente
- **Data**: 2026-06-27
- **Contexto**: Precisava de uma lib para Web Components que seja leve, tipada e com DX moderna (decorators, reactive properties, tagged templates).
- **Decisão**: Lit 3.x como framework de UI. Cada componente é um custom element com Shadow DOM.
- **Consequências**: Componentes encapsulados nativamente. Sem virtual DOM. Bundle pequeno (~5KB por componente). Suporte nativo a decorators TypeScript.
- **Alternativas descartadas**: Vanilla Web Components (DX ruim, muito boilerplate), Stencil (mais pesado, focado em design systems), FAST (menos ecossistema)

---

### ADR-003 — Bun como runtime + Vite como bundler

- **Status**: Vigente
- **Data**: 2026-06-27
- **Contexto**: Precisava de ferramentas rápidas e modernas para dev experience no monorepo.
- **Decisão**: Bun para package management e runtime. Vite 6.x para dev server (HMR) e build de produção.
- **Consequências**: Install ~10x mais rápido que npm. Vite tem suporte nativo a Lit e TypeScript. Vitest compartilha config com Vite.
- **Alternativas descartadas**: npm/pnpm (mais lento), Webpack (config complexa), Bun bundler puro (ainda experimental para produção)

---

### ADR-004 — Import Maps para composição de microfrontends

- **Status**: Vigente
- **Data**: 2026-06-27
- **Contexto**: Precisava de um mecanismo para o shell carregar MFEs sem acoplamento de build.
- **Decisão**: Import Maps nativos do browser no `index.html`. Cada MFE é carregado como módulo ES via `<script type="module">`.
- **Consequências**: Zero overhead de runtime. Browser resolve as dependências. MFEs podem ser deployados independentemente. Funciona sem framework de orquestração.
- **Alternativas descartadas**: Module Federation (overhead de webpack runtime), single-spa (abstração desnecessária sobre custom elements), iframes (isolamento excessivo, UX ruim)

---

### ADR-005 — CSS Custom Properties para design tokens

- **Status**: Vigente
- **Data**: 2026-06-27
- **Contexto**: Precisava de theming global que atravesse Shadow DOM dos Web Components.
- **Decisão**: CSS Custom Properties definidas em `:root` no shell. Cada componente consome as variáveis internamente.
- **Consequências**: Theming dinâmico (dark mode por troca de variáveis). Custom Properties penetram Shadow DOM nativamente. Zero preprocessador necessário.
- **Alternativas descartadas**: CSS-in-JS (overhead, não nativo), Sass (compilação extra, não atravessa Shadow DOM), CSS Modules (não funciona com Shadow DOM)

## Regras de Governança

- Decisões só são adicionadas com aprovação explícita do desenvolvedor
- Promova entradas do `lessons-learned.md` quando virarem regra permanente
- Decisões substituídas NÃO são removidas — marcam-se como "Substituída por ADR-XXX"
- Revisão semestral: verificar se decisões antigas ainda fazem sentido
- Kairon pode SUGERIR nova ADR quando perceber padrão consolidado, mas NUNCA cria sem permissão

---
inclusion: auto
description: Regras de qualidade, nomenclatura, segurança e performance para código. Use em toda operação de escrita ou revisão de código.
---

# Regras de Qualidade

Referências relacionadas: [dev-flow.md](./dev-flow.md), [project-context.md](./project-context.md), [ecosystem-map.md](./ecosystem-map.md)

## Instruções

APLIQUE estas regras em toda operação de escrita de código:

### Nomenclatura
- USE nomes descritivos sem abreviações crípticas
- SIGA convenções já estabelecidas no projeto (ver project-context.md)
- USE kebab-case para arquivos ou o padrão existente

### Estrutura
- MANTENHA funções com responsabilidade única
- LIMITE aninhamento a 3 níveis máximo
- SEPARE lógica de negócio de infraestrutura
- ORGANIZE imports: externos → internos → relativos

### Segurança
- NUNCA exponha segredos em código
- VALIDE inputs de usuário
- USE queries parametrizadas (nunca concatenar SQL)
- TRATE erros explicitamente (nunca engolir exceções)
- SANITIZE dados antes de renderizar

### Performance
- EVITE loops desnecessários e chamadas de rede dentro de loops
- CONSIDERE lazy loading quando aplicável

### Manutenibilidade
- ESCREVA código legível sem comentários excessivos
- USE comentários apenas para "porquê", nunca para "o quê"
- SUBSTITUA magic numbers por constantes nomeadas
- PREFIRA composição sobre herança
- NÃO force DRY — duplicação local é melhor que abstração prematura

## Proibições

- NÃO adicione dependências sem justificativa
- NÃO crie abstrações "para o futuro"
- NÃO refatore fora do escopo da tarefa
- NÃO ignore warnings do linter/compiler
- NÃO deixe console.log/print de debug no código final
- NÃO use React/Vue/Angular — apenas Lit (Web Components nativos)
- NÃO quebre o encapsulamento do Shadow DOM de outro componente
- NÃO use CSS global para estilizar componentes — use Custom Properties

## Web Components / Lit

### Estrutura de Componente
- PREFIXE custom elements com `mfe-` (ex: `mfe-header`, `mfe-sidebar`)
- USE `@customElement('mfe-nome')` decorator para registrar
- MANTENHA um componente por arquivo
- NOMEIE o arquivo igual ao tag: `mfe-header.ts` → `<mfe-header>`

### Estilização
- USE CSS Custom Properties (`:root` vars) para theming global
- ESTILOS locais ficam dentro do `static styles` do Lit (Shadow DOM)
- NUNCA use `!important` — resolva especificidade corretamente
- PREFIRA `css` tagged template do Lit sobre inline styles

### Propriedades e Estado
- USE `@property()` para inputs públicos do componente
- USE `@state()` para estado interno (não exposto)
- DEFINA tipos explícitos em todas as properties
- USE valores default sensatos (nunca undefined sem motivo)

### Comunicação entre Componentes
- USE Custom Events (`new CustomEvent('nome', { detail, bubbles: true, composed: true })`)
- NUNCA importe ou referencie outro MFE diretamente
- USE import maps para dependências compartilhadas (@mfe/tokens, @mfe/utils)

### Ciclo de Vida
- PREFIRA `connectedCallback` para setup e `disconnectedCallback` para cleanup
- EVITE lógica pesada em `render()` — compute antes, renderize depois
- USE `willUpdate()` para reações a mudanças de propriedade

## Alertas Obrigatórios

ALERTE o desenvolvedor quando:
- Alteração pode quebrar contrato de API
- Padrão existente está sendo violado
- Decisão tem implicação de segurança
- Escopo está crescendo além do planejado

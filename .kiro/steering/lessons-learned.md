---
inclusion: auto
description: Lições aprendidas, armadilhas e padrões do projeto. Consultado em análises, debugging e decisões técnicas.
---

# Lições Aprendidas

Referências relacionadas: [adr.md](./adr.md), [quality-rules.md](./quality-rules.md), [project-context.md](./project-context.md)

> Nenhum registro é criado sem autorização explícita do desenvolvedor.

---

## Decisões Técnicas

### 2026-06-14 — Simplificação da estrutura do ecossistema Kiro

**Contexto**: Ao montar o ecossistema de configuração do workspace (steering, skills, hooks, autoaprendizado), a proposta inicial tinha ~30 arquivos com muita fragmentação (agents separados, templates de hooks, pasta de prompts, glossário isolado, etc).

**Decisão**: Consolidar para ~12 arquivos com intenção clara. Um AGENTS.md forte na raiz + 3 steerings auto-incluídos + 3 skills sob demanda + 3 hooks + 4 arquivos de autoaprendizado.

**Trade-offs**:
- Ganho: menos ruído, mais foco, cada arquivo tem propósito real e é efetivamente lido
- Ganho: manutenção mais simples — menos lugares para atualizar
- Custo: se o projeto crescer muito, pode precisar adicionar mais skills/steerings depois

**Alternativas descartadas**:
- Estrutura com 6 agents separados — fragmentação excessiva, difícil manter consistência
- Pasta `prompts/` separada — Skills já cumprem esse papel, seria duplicação
- Templates de hooks como markdown — hooks são JSON com schema definido, templates não agregam
- `glossario.md` e `regras-de-negocio.md` separados — `project-context.md` já centraliza esse contexto

**Princípio aplicado**: "Documentação útil antes de documentação excessiva" — menos arquivos que são realmente usados > muitos arquivos que viram lixo.

---

## Padrões Aprendidos

### 2026-06-14 — Steerings com alta instrução usam verbos imperativos

**Contexto**: Análise cognitiva apontou signal-to-noise de 15% nos steerings. Após reescrever com verbos imperativos, a densidade instrucional subiu significativamente.

**Padrão**: Steerings eficazes usam verbos de comando (USE, NUNCA, LISTE, IDENTIFIQUE, SE...ENTÃO, NÃO) em vez de prosa explicativa.

**Aplicação**: Ao criar ou editar qualquer steering, escrever em formato imperativo. Evitar parágrafos descritivos. Cada linha deve ser uma instrução executável.

---

### 2026-06-14 — Steerings com inclusion: auto exigem campo description

**Contexto**: Ao recarregar o workspace, o Kiro mostrou warning "Progressive steering file missing description" para steerings sem o campo `description` no frontmatter.

**Padrão**: Steerings com `inclusion: auto` obrigatoriamente precisam de `description` no frontmatter YAML. O Kiro usa essa descrição para decidir quando carregar o steering automaticamente.

**Aplicação**: Todo steering novo com `inclusion: auto` DEVE ter description clara indicando quando usar. Sem isso: warning + steering nunca é carregado automaticamente.

---

### 2026-06-14 — Cross-references entre steerings resolvem isolamento

**Contexto**: Análise cognitiva marcou 3 steerings como "isolados". A ferramenta espera conexões explícitas entre arquivos para construir o grafo de contexto.

**Padrão**: Adicionar uma linha de referências cruzadas no topo de cada steering cria conectividade e resolve o problema de "Isolated Files" na análise.

**Aplicação**: Todo steering novo deve referenciar pelo menos 1-2 steerings relacionados no topo.

---

### 2026-06-14 — Hooks só falam quando têm algo a dizer

**Contexto**: Hooks que reportam "tudo certo" em toda interação geram fadiga — o dev começa a ignorar tudo, inclusive alertas reais.

**Padrão**: Automações (hooks) devem operar no princípio do silêncio por padrão: se não há problema, não há output.

**Aplicação**: Ao criar qualquer hook futuro, a instrução final deve ser "se não encontrou nada relevante, não diga nada".

---

## Bugs e Armadilhas

### 2026-06-14 — MCP com ${VAR} no mcp.json não carrega .env automaticamente

**Sintoma**: MCP server não sobe porque a variável de ambiente está undefined, mesmo tendo arquivo `.env`.

**Causa raiz**: O Kiro expande `${VAR}` no `mcp.json` a partir das variáveis de ambiente do SISTEMA, não de arquivos `.env` locais.

**Solução**: Setar a variável no sistema (`setx` no Windows, `export` em Linux/Mac) ou colocar o valor direto no `mcp.json`.

**Prevenção**: Ao criar MCP servers que dependem de segredos, documentar no `.env.example` E instruir o dev a setar a variável no sistema.

---

### 2026-06-14 — MCP server com node_modules não é portável entre projetos

**Sintoma**: Ao copiar o ecossistema para outro projeto, o MCP server não funciona porque `node_modules/` não é commitado.

**Causa raiz**: Usar SDK externo (`@modelcontextprotocol/sdk`) cria dependência que precisa ser instalada em cada clone.

**Solução**: Reescrever MCP servers simples (1-2 tools) como implementação pura sem dependências externas. Node.js 18+ tem `fetch` nativo e `readline` built-in.

**Prevenção**: Para MCP servers com 1-3 tools simples, preferir implementação zero-dependency. Só usar SDK para servers complexos.

---

### 2026-06-14 — MCP stdio usa newline-delimited JSON + server deve ficar vivo

**Sintoma**: Server MCP dá "Connection closed" ou "Request timed out" ao conectar no Kiro.

**Causa raiz**: O protocolo MCP stdio espera uma linha JSON por mensagem (newline-delimited), NÃO o formato `Content-Length` do LSP. E o server deve ficar permanentemente vivo enquanto o stdin estiver aberto.

**Solução**: Usar `readline` com `crlfDelay: Infinity` para ler linha a linha, e `process.stdin.resume()` para manter o processo vivo.

**Prevenção**: Todo MCP server stdio zero-dependency deve: ler stdin linha a linha, responder com `JSON.stringify(msg) + "\n"`, nunca encerrar o process por conta própria, só `process.exit(0)` quando stdin fechar.

---

### 2026-06-27 — Migração de hooks .kiro.hook (legado) para v2 .json tem mapeamento de triggers não-óbvio

**Sintoma**: Ao migrar hooks do formato legado para v2, os triggers não têm correspondência 1:1 e usar o nome errado faz o hook nunca disparar.

**Causa raiz**: Formato legado usa nomes como `fileEdited`, `preToolUse`, `postTaskExecution`, `agentStop`. Formato v2 usa PascalCase diferente e semântica diferente.

**Mapeamento**:
| Legado | v2 | Observação |
|--------|-----|-----|
| `fileEdited` | `PostToolUse` + matcher | Precisa de matcher para filtrar tools de escrita |
| `preToolUse` + toolTypes:["write"] | `PreToolUse` + matcher regex | matcher regex substitui toolTypes |
| `postTaskExecution` | `PostTaskExec` | Nome encurtado |
| `agentStop` | `Stop` | Nome totalmente diferente |
| (não existia) | `SessionStart` | Novo no v2 |

**Prevenção**: Sempre usar PascalCase nos triggers v2. Matchers são regex (não arrays de toolTypes).

---

## Manutenção

### Quando documentar aqui

- Descoberta de padrão recorrente no código
- Decisão técnica com trade-off importante
- Bug cuja causa raiz é não-óbvia
- Armadilha em lib/framework usado
- Convenção não documentada do projeto

### Revisão periódica

A cada ~20 entradas ou 2 meses:
1. REMOVA o que virou óbvio ou já não se aplica
2. CONSOLIDE entradas redundantes
3. PROMOVA para `adr.md` o que virou decisão permanente
4. MARQUE com `[REVISADO: YYYY-MM-DD]` ao final de cada ciclo

### Critérios de promoção para ADR

- Referenciada 3+ vezes em sessões diferentes
- Impacta decisões futuras de forma recorrente
- Virou regra implícita que todos seguem

---

### 2026-06-27 — Workflow de desenvolvimento: Specs + DDD + limites de commit

**Contexto**: Definição do padrão de trabalho para o projeto de microfrontends, alinhado com a prática da empresa.

**Decisão**: O projeto adota:
1. **Specs mode** — toda feature/bugfix passa por: Requirements → Design → Tasks
2. **Domain-Driven Design** — sempre modelar o domínio antes de implementar
3. **100% de cobertura de testes** — nenhuma task é considerada concluída sem cobertura total
4. **Máximo 10 arquivos por commit** — commits granulares e revisáveis

**Trade-offs**:
- Ganho: rastreabilidade total, PRs menores e mais fáceis de revisar, domínio bem definido
- Custo: mais commits por feature, disciplina na divisão de tasks

**Aplicação**: Toda task deve ser planejada para gerar no máximo 10 arquivos modificados. Se ultrapassar, dividir em sub-tasks.

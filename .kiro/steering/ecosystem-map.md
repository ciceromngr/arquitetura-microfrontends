---
inclusion: auto
description: Mapa de navegação do ecossistema. Use para localizar rapidamente onde encontrar cada tipo de informação.
---

# Mapa do Ecossistema

Referências relacionadas: [dev-flow.md](./dev-flow.md), [quality-rules.md](./quality-rules.md), [project-context.md](./project-context.md)

## Instruções

- CONSULTE a tabela abaixo ANTES de buscar informação no código
- SE a resposta já existe em um steering, USE o steering — NÃO leia código desnecessariamente
- SE precisar de informação não mapeada, PERGUNTE ao desenvolvedor
- AO criar novo steering/skill/hook → ATUALIZE este mapa imediatamente
- NUNCA duplique informação — REFERENCIE o arquivo correto

## Onde Encontrar Cada Informação

| Preciso de... | Olho em... |
|---|---|
| Stack, arquitetura, convenções do projeto | `project-context.md` |
| Como executar o fluxo de trabalho | `dev-flow.md` |
| Regras de qualidade e código | `quality-rules.md` |
| Decisões arquiteturais vigentes | `adr.md` |
| Regras para banco de dados e migrations | `database-rules.md` |
| Regras para APIs e endpoints | `api-rules.md` |
| Regras para infra, Docker e CI/CD | `infra-rules.md` |
| Contratos de API (OpenAPI, GraphQL, Protobuf) | `api-contracts.md` |
| Como analisar uma demanda nova | Skill: `analise-demanda` |
| Como fazer code review | Skill: `code-review` |
| Como planejar testes | Skill: `roteiro-testes` |
| Como refatorar com segurança | Skill: `refatoracao-controlada` |
| Lições aprendidas, padrões e armadilhas | `steering/lessons-learned.md` |

## Steering — Regras Contextuais

| Steering | Tipo | Quando ativa |
|---|---|---|
| `project-context.md` | auto | Sempre |
| `dev-flow.md` | auto | Sempre |
| `quality-rules.md` | auto | Sempre |
| `adr.md` | auto | Sempre |
| `ecosystem-map.md` | auto | Sempre |
| `lessons-learned.md` | auto | Sempre |
| `database-rules.md` | fileMatch | Ao tocar `*.sql`, `migrations/`, `schema/`, `seeds/` |
| `api-rules.md` | fileMatch | Ao tocar `controllers/`, `routes/`, `handlers/`, `api/` |
| `infra-rules.md` | fileMatch | Ao tocar `Dockerfile`, `docker-compose`, `*.tf`, `infra/`, `deploy/`, CI/CD |
| `api-contracts.md` | fileMatch | Ao tocar `controllers/`, `routes/`, `services/`, `handlers/` |

## Hooks — Automações Ativas

| Hook | Trigger | Descrição |
|---|---|---|
| `session-context-start` | SessionStart | Injeta contexto de continuidade (branch, commits, tarefas) |
| `validacao-pre-escrita` | PreToolUse (write) | Valida escopo e convenções antes de escrever |
| `code-review-3p` | PostToolUse (write) | Self-review em 3 perspectivas após edição |
| `review-pos-task` | PostTaskExec | Revisão final de qualidade pós-task |
| `parecer-google-chat` | PostTaskExec | Gera e envia parecer ao Google Chat |
| `self-learning-filtrado` | Stop | Avalia se houve aprendizado relevante para documentar |

## Skills — Habilidades Sob Demanda

| Skill | Quando ativar |
|---|---|
| `analise-demanda` | Recebeu task/feature/bug nova — ANALISE antes de codar |
| `code-review` | Precisa de revisão técnica — USE o checklist de 3 perspectivas |
| `roteiro-testes` | Precisa planejar testes — ESTRUTURE cenários antes de implementar |
| `refatoracao-controlada` | Precisa reestruturar código — JUSTIFIQUE, ESCOPIE e VALIDE antes de mexer |

## MCP — Integrações Externas

| Servidor | Função |
|---|---|
| `google-chat` | Envio de pareceres e notificações ao time via webhook |

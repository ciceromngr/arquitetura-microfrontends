---
inclusion: fileMatch
fileMatchPattern: "**/*.sql,**/migrations/**,**/migrate/**,**/schema/**,**/seeds/**,**/fixtures/**"
description: Regras para alterações em banco de dados e migrations. Ativado ao tocar arquivos SQL ou de migração.
---

# Regras de Banco de Dados & Migrations

Referências: [quality-rules.md](./quality-rules.md), [project-context.md](./project-context.md)

## Instruções

APLIQUE estas regras ao trabalhar com SQL, migrations ou schemas:

### Migrations

- NUNCA altere uma migration já executada em produção — crie uma nova
- SEMPRE inclua rollback (down/revert) na migration
- NOMEIE migrations com timestamp + descrição: `20250115_add_user_email_index`
- TESTE migration ida E volta antes de commitar
- VERIFIQUE se a migration é idempotente quando possível

### Queries

- USE queries parametrizadas — NUNCA concatene valores em SQL
- PREFIRA queries explícitas (SELECT campo1, campo2) sobre SELECT *
- INCLUA índices para colunas usadas em WHERE/JOIN frequente
- CONSIDERE impacto em tabelas grandes (locks, tempo de execução)

### Schema Changes

- DOCUMENTE o motivo da alteração no commit/PR
- AVALIE impacto em queries existentes
- SE remover coluna: verifique que NENHUM código a referencia
- SE adicionar NOT NULL: garanta default ou backfill
- PREFIRA alterações aditivas (adicionar coluna) sobre destrutivas (remover/renomear)

### Dados Sensíveis

- NUNCA armazene senhas em texto plano
- IDENTIFIQUE campos PII (nome, email, CPF) e trate com cuidado em logs/exports
- CONSIDERE criptografia em repouso para dados financeiros/médicos

### Alertas Obrigatórios

SINALIZE quando:
- Migration pode travar tabela grande (ALTER TABLE em tabela com milhões de registros)
- Remoção de índice pode degradar performance
- Alteração afeta múltiplos serviços/módulos
- Dados de produção podem ser perdidos sem rollback

---
inclusion: auto
description: Fluxo de trabalho obrigatório para alterações de código. Use em toda tarefa que envolva análise, implementação, revisão ou testes.
---

# Fluxo de Desenvolvimento

Referências relacionadas: [quality-rules.md](./quality-rules.md), [project-context.md](./project-context.md), [ecosystem-map.md](./ecosystem-map.md)

## Instruções

ANTES de qualquer alteração de código, execute este ciclo:

### 1. Análise
- IDENTIFIQUE o problema real (comportamento atual vs esperado)
- LISTE arquivos/módulos impactados
- SEPARE fatos de hipóteses
- SINALIZE riscos e dúvidas

### 2. Plano
- PROPONHA o menor caminho seguro
- LISTE passos com justificativa
- IDENTIFIQUE dependências e efeitos colaterais
- SE houver ambiguidade, PERGUNTE antes de prosseguir

### 3. Implementação
- IMPLEMENTE um passo por vez
- VERIFIQUE cada etapa antes de avançar
- NÃO refatore fora do escopo

### 4. Revisão
- VERIFIQUE aderência aos padrões (ver quality-rules.md)
- IDENTIFIQUE edge cases não tratados
- CONFIRME que testes existentes não quebram

### 5. Testes
- CUBRA happy path, erros esperados e edge cases
- VERIFIQUE regressão em funcionalidades adjacentes

### 6. Parecer
- RESUMA o que foi feito
- SINALIZE riscos residuais
- SUGIRA próximos passos

## Regras

- SE tarefa é simples e isolada → ciclo pode ser resumido
- SE tarefa é complexa ou toca múltiplos módulos → ciclo DEVE ser completo
- NUNCA assuma contexto não fornecido — pergunte
- SEMPRE explique o "porquê" das decisões
- DIFERENCIE explicitamente hipótese de fato

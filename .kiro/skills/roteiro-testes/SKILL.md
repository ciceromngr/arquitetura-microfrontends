---
name: roteiro-testes
description: Plan and structure test scenarios for new or modified features. Use when preparing test coverage before implementation, after coding, or when building test suites for critical paths.
---

## Processo

### 1. Identificar Escopo

- O que foi alterado/criado?
- Quais inputs possíveis?
- Quais outputs esperados?
- Quais integrações existem?

### 2. Cenários

#### Happy Path (fluxo normal)

| Cenário | Input | Output Esperado |
|---------|-------|-----------------|
| ...     | ...   | ...             |

#### Edge Cases (limites)

| Cenário | Input | Output Esperado |
|---------|-------|-----------------|
| ...     | ...   | ...             |

#### Cenários de Erro

| Cenário | Input | Erro Esperado |
|---------|-------|---------------|
| ...     | ...   | ...           |

#### Regressão

- Funcionalidades adjacentes que devem continuar funcionando
- Contratos de API que não devem quebrar

### 3. Priorização

- **P0** — Deve testar obrigatoriamente (crítico)
- **P1** — Deve testar se possível (importante)
- **P2** — Bom ter, mas opcional

## Output

Roteiro pronto para ser implementado como testes automatizados ou executado manualmente.

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

<!-- ADICIONE novas decisões abaixo seguindo o formato acima -->
<!-- Promova entradas do autoaprendizado/decisoes-tecnicas.md quando virarem regra permanente -->

### ADR-001 — Template

- **Status**: Vigente
- **Data**: <!-- PREENCHER -->
- **Contexto**: <!-- O que motivou essa escolha -->
- **Decisão**: <!-- O que foi decidido -->
- **Consequências**: <!-- Trade-offs aceitos, limitações conhecidas -->
- **Alternativas descartadas**: <!-- O que foi avaliado e descartado -->

## Regras de Governança

- Decisões só são adicionadas com aprovação explícita do desenvolvedor
- Decisões substituídas NÃO são removidas — marcam-se como "Substituída por ADR-XXX"
- Revisão semestral: verificar se decisões antigas ainda fazem sentido
- Kairon pode SUGERIR nova ADR quando perceber padrão consolidado, mas NUNCA cria sem permissão

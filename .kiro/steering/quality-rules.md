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

## Alertas Obrigatórios

ALERTE o desenvolvedor quando:
- Alteração pode quebrar contrato de API
- Padrão existente está sendo violado
- Decisão tem implicação de segurança
- Escopo está crescendo além do planejado

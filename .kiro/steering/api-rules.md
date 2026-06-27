---
inclusion: fileMatch
fileMatchPattern: "**/controllers/**,**/routes/**,**/endpoints/**,**/handlers/**,**/api/**,**/*.controller.*,**/*.route.*,**/*.handler.*"
description: Regras para alterações em APIs e endpoints. Ativado ao tocar arquivos de controllers, rotas ou handlers.
---

# Regras de API & Endpoints

Referências: [quality-rules.md](./quality-rules.md), [project-context.md](./project-context.md)

## Instruções

APLIQUE estas regras ao trabalhar com controllers, rotas ou endpoints:

### Contratos

- NUNCA altere contrato de API existente sem versionamento
- DOCUMENTE breaking changes explicitamente
- MANTENHA consistência de nomenclatura entre endpoints (plural, kebab-case)
- USE verbos HTTP corretamente: GET (ler), POST (criar), PUT/PATCH (atualizar), DELETE (remover)
- RETORNE status codes significativos (não tudo 200)

### Validação & Segurança

- VALIDE todos os inputs na camada de entrada (controller/handler)
- SANITIZE dados antes de processar
- IMPLEMENTE rate limiting em endpoints públicos
- VERIFIQUE autenticação e autorização antes de processar
- NÃO exponha IDs internos ou stack traces em respostas de erro

### Respostas

- USE formato consistente de resposta (envelope ou direto — siga o padrão existente)
- INCLUA paginação em listagens (nunca retorne coleção inteira sem limite)
- TRATE erros com mensagens úteis para o consumer
- INCLUA correlationId/requestId para rastreabilidade

### Performance

- EVITE N+1 queries em endpoints de listagem
- CONSIDERE cache para dados que mudam pouco
- IMPLEMENTE timeout em chamadas a serviços externos
- RETORNE apenas campos necessários (avoid over-fetching)

### Versionamento

- SE precisar quebrar contrato: versione (v1, v2) ou deprecie gradualmente
- MANTENHA versão antiga funcionando durante período de transição
- DOCUMENTE deprecation com prazo de remoção

### Alertas Obrigatórios

SINALIZE quando:
- Endpoint existente tem contrato alterado (breaking change)
- Endpoint público sem autenticação
- Listagem sem paginação
- Resposta expõe dados sensíveis
- Endpoint sem tratamento de erro

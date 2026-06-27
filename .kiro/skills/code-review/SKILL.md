---
name: code-review
description: Review code for quality, security, performance, and adherence to project standards. Use when reviewing changes before commit, during pull requests, or when validating implementation quality.
---

## Checklist de Revisão

### Clareza
- [ ] Código autoexplicativo?
- [ ] Nomes descritivos?
- [ ] Lógica bem organizada?

### Correção
- [ ] Resolve o problema proposto?
- [ ] Trata edge cases?
- [ ] Não introduz regressões?

### Segurança
- [ ] Inputs validados?
- [ ] Dados sensíveis protegidos?
- [ ] Sem vulnerabilidades óbvias?

### Performance
- [ ] Sem operações N+1?
- [ ] Queries eficientes?
- [ ] Sem memory leaks aparentes?

### Padrões do Projeto
- [ ] Segue convenções existentes?
- [ ] Usa libs/patterns já adotados?
- [ ] Sem dependência desnecessária?

### Testes
- [ ] Mudança coberta por testes?
- [ ] Testes existentes continuam passando?

## Output

Parecer com:
- ✅ Aprovado | ⚠️ Aprovado com observações | ❌ Precisa de ajuste
- Lista de observações com prioridade (blocker/warning/suggestion)
- Sugestões de melhoria (se houver)

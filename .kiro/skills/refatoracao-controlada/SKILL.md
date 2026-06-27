---
name: refatoracao-controlada
description: Plan and execute safe refactoring with justification, scoped boundaries, and behavior preservation validation. Use when restructuring code, renaming, extracting, or reorganizing modules.
---

## Quando Ativar

- Reestruturação de módulos ou camadas
- Extração de função/classe/componente
- Renomeação significativa (não trivial)
- Reorganização de pastas/arquivos
- Remoção de código morto
- Simplificação de lógica complexa

## Pré-Condições Obrigatórias

ANTES de qualquer refatoração, responda:

### 1. Justificativa
- [ ] Por que refatorar agora? (não "porque ficaria melhor")
- [ ] Qual problema concreto resolve?
- [ ] Está dentro do escopo da tarefa atual?
- [ ] Qual o custo de NÃO refatorar?

### 2. Escopo Fechado
- [ ] Quais arquivos serão tocados? (listar todos)
- [ ] Quais arquivos NÃO devem ser tocados?
- [ ] Existe dependência externa afetada?
- [ ] O escopo está crescendo? (se sim, pare e reavalie)

### 3. Snapshot de Comportamento
- [ ] Testes existentes passam ANTES da refatoração?
- [ ] Se não há testes, qual é o comportamento esperado documentado?
- [ ] Como validar que nada mudou após refatorar?

## Execução

### Regras Durante a Refatoração

- UM passo por vez — nunca refatore e adicione feature ao mesmo tempo
- COMMIT separado para refatoração (não misture com feature/fix)
- MANTENHA testes passando a cada passo
- SE um passo quebra algo, DESFAÇA antes de tentar diferente
- NUNCA altere interface pública sem sinalizar breaking change
- PREFIRA rename automático (IDE/tooling) sobre busca manual

### Padrões Seguros

| Refatoração | Risco | Cuidado |
|-------------|-------|---------|
| Rename variável/função | Baixo | Use rename semântico, nunca find-replace cego |
| Extract function | Baixo | Garanta mesmos params e retorno |
| Move arquivo | Médio | Atualize todos os imports |
| Mudar assinatura | Alto | Verifique todos os callers |
| Mudar estrutura de dados | Alto | Verifique serialização, DB, API |
| Remover código | Médio | Confirme que não é usado (grep + testes) |

## Checklist Pós-Refatoração

- [ ] Todos os testes passam?
- [ ] Comportamento idêntico ao anterior?
- [ ] Imports atualizados em todos os consumidores?
- [ ] Nenhum arquivo órfão deixado para trás?
- [ ] Code review dos arquivos alterados?
- [ ] Diff final faz sentido como unidade lógica?

## Alertas

PARE e pergunte ao desenvolvedor quando:
- Escopo cresceu além do planejado (mais de 2 arquivos extras)
- Teste quebrou e a causa não é óbvia
- Refatoração requer mudança de interface pública
- Encontrou código que parece morto mas não tem certeza
- Decisão de design está implícita no código legado

## Output

Parecer com:
- **Justificativa**: Por que foi feito
- **Escopo**: Arquivos tocados vs planejados
- **Validação**: Testes antes/depois, comportamento preservado
- **Riscos residuais**: O que pode dar problema depois
- **Próximos passos**: Se a refatoração abre portas para melhorias futuras

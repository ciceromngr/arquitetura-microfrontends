---
inclusion: fileMatch
fileMatchPattern: "**/controllers/**,**/routes/**,**/endpoints/**,**/handlers/**,**/api/**,**/*.controller.*,**/*.route.*,**/*.handler.*,**/services/**,**/*.service.*"
description: Referência a specs externas (OpenAPI, GraphQL, Protobuf). Ativado ao trabalhar em código que implementa contratos de API.
---

# Contratos & Specs Externas

Referências: [api-rules.md](./api-rules.md), [project-context.md](./project-context.md)

## Instruções

- AO implementar ou modificar endpoints, VALIDE contra o contrato definido abaixo
- SE o contrato e o código divergem, SINALIZE — não assuma que um está certo
- NÃO altere o contrato sem autorização explícita do desenvolvedor
- SE não houver spec cadastrada, PERGUNTE se existe documentação de API

## Specs do Projeto

<!-- CADASTRE aqui as specs externas do projeto. -->
<!-- Use a sintaxe #[[file:caminho/relativo]] para referenciar arquivos de spec. -->
<!-- O Kiro carregará automaticamente o conteúdo quando este steering for ativado. -->

### OpenAPI / Swagger

<!-- Descomente e ajuste quando houver spec OpenAPI no projeto: -->
<!-- #[[file:docs/openapi.yaml]] -->

### GraphQL Schema

<!-- Descomente e ajuste quando houver schema GraphQL: -->
<!-- #[[file:src/schema.graphql]] -->

### Protobuf / gRPC

<!-- Descomente e ajuste quando houver .proto: -->
<!-- #[[file:proto/service.proto]] -->

### Outros Contratos

<!-- Postman collection, JSON Schema, AsyncAPI, etc: -->
<!-- #[[file:docs/async-api.yaml]] -->

## Como Usar

1. Adicione o caminho relativo do arquivo de spec nos blocos acima (descomentando)
2. O Kiro incluirá o conteúdo da spec no contexto automaticamente ao editar controllers/routes
3. Ao implementar um endpoint, compare sua implementação com o contrato
4. Se encontrar divergência: sinalize com o campo esperado vs implementado

## Regras de Validação

Ao comparar implementação vs spec, verifique:
- [ ] Path/rota corresponde ao definido na spec
- [ ] Método HTTP correto
- [ ] Request body com campos e tipos esperados
- [ ] Response body com estrutura documentada
- [ ] Status codes mapeados (sucesso, erro, validação)
- [ ] Headers obrigatórios (auth, content-type, etc)
- [ ] Query params com tipos e validações corretos

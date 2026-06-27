---
inclusion: fileMatch
fileMatchPattern: "**/Dockerfile*,**/docker-compose*,**/*.tf,**/*.tfvars,**/terraform/**,**/infra/**,**/deploy/**,**/.github/workflows/**,**/.gitlab-ci*,**/Jenkinsfile,**/k8s/**,**/helm/**"
description: Regras para alterações de infraestrutura, containers e CI/CD. Ativado ao tocar arquivos de infra.
---

# Regras de Infraestrutura & Deploy

Referências: [quality-rules.md](./quality-rules.md), [project-context.md](./project-context.md)

## Instruções

APLIQUE estas regras ao trabalhar com Docker, Terraform, CI/CD ou configs de deploy:

### Docker

- USE imagens base oficiais e com tag fixa (nunca `:latest` em produção)
- MINIMIZE camadas e tamanho da imagem (multi-stage build quando possível)
- NÃO copie segredos para a imagem — use env vars ou secrets manager
- INCLUA healthcheck no Dockerfile de produção
- RODE como non-root quando possível

### Terraform / IaC

- SEMPRE faça `plan` antes de `apply`
- USE módulos para recursos reutilizáveis
- VERSIONE providers e módulos com pinning exato
- NUNCA hardcode credenciais — use variables ou data sources
- DOCUMENTE resources com `description` ou comentários

### CI/CD

- MANTENHA pipelines rápidos (cache de dependências)
- SEPARE jobs de lint/test/build/deploy
- NUNCA exponha secrets em logs (mask variables)
- INCLUA rollback strategy em deploys de produção
- TESTE a pipeline em branch antes de merge

### Segurança

- REVISE portas expostas — minimize superfície de ataque
- USE TLS/HTTPS para toda comunicação externa
- ROTACIONE secrets periodicamente
- LIMITE permissões IAM/RBAC ao mínimo necessário

### Alertas Obrigatórios

SINALIZE quando:
- Alteração afeta ambiente de produção
- Recurso será destruído e recriado (downtime potencial)
- Permissões estão sendo ampliadas
- Secret está exposto em plain text
- Não há rollback definido

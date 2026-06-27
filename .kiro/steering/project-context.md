---
inclusion: auto
description: Contexto do projeto (stack, arquitetura, convenções). Use para qualquer decisão técnica que dependa de conhecer o projeto.
---

# Contexto do Projeto

Referências relacionadas: [dev-flow.md](./dev-flow.md), [quality-rules.md](./quality-rules.md), [ecosystem-map.md](./ecosystem-map.md)

## Instruções

- USE estas informações como base para todas as decisões técnicas
- NÃO assuma stack/padrões diferentes dos listados aqui
- SE alguma informação estiver faltando, PERGUNTE antes de prosseguir
- RESPEITE as convenções listadas — não introduza padrões novos sem justificativa

## Stack Técnica

<!-- PREENCHA com a stack real do projeto. Exemplos entre parênteses. -->

- **Linguagem**: <!-- Ex: TypeScript 5.x, Python 3.11, C# .NET 8, Delphi 12 -->
- **Framework**: <!-- Ex: Next.js 14, FastAPI, Angular 17, ASP.NET Core -->
- **Banco de dados**: <!-- Ex: PostgreSQL 16, SQL Server, MongoDB, Firebird -->
- **ORM/Data access**: <!-- Ex: Prisma, Sequelize, Entity Framework, queries manuais -->
- **Infra**: <!-- Ex: AWS (ECS + RDS), Azure, Docker Compose local, VPS -->
- **CI/CD**: <!-- Ex: GitHub Actions, GitLab CI, Jenkins, manual -->
- **Testes**: <!-- Ex: Vitest, Jest, pytest, xUnit, DUnit -->
- **Lint/Format**: <!-- Ex: ESLint + Prettier, Ruff, editorconfig only -->
- **Gerenciador de pacotes**: <!-- Ex: pnpm, npm, pip, NuGet -->

## Arquitetura

- **Padrão**: <!-- Ex: Monolito modular, Microserviços, Clean Architecture, MVC clássico -->
- **Camadas**: <!-- Ex: Controller → Service → Repository → DB -->
- **Comunicação entre módulos**: <!-- Ex: REST interno, eventos (RabbitMQ), chamadas diretas -->
- **Frontend/Backend split**: <!-- Ex: Monorepo, repos separados, fullstack em um repo -->

## Convenções

- **Branch naming**: <!-- Ex: feature/JIRA-123-descricao, fix/descricao-curta -->
- **Commit style**: <!-- Ex: Conventional Commits, livre mas descritivo, prefixo [tipo] -->
- **PR flow**: <!-- Ex: PR → 1 review → merge, PR → CI green → auto-merge -->
- **Estrutura de pastas**: <!-- Ex: src/modules/[modulo]/{controller,service,repository} -->
- **Naming code**: <!-- Ex: camelCase funções, PascalCase classes, kebab-case arquivos -->

## Regras de Negócio Críticas

<!-- Regras que Kairon deve SEMPRE considerar ao tomar decisões. -->
<!-- Ex: -->
<!-- - Usuário pode ter múltiplos perfis no mesmo tenant -->
<!-- - Exclusão é sempre soft-delete (campo deleted_at) -->
<!-- - Toda operação financeira precisa de audit trail -->

## Áreas Sensíveis

<!-- Módulos que requerem cuidado extra — NUNCA alterar sem review explícito. -->
<!-- Ex: -->
<!-- - `src/auth/` — Autenticação e autorização -->
<!-- - `src/billing/` — Cobrança e pagamentos -->
<!-- - `migrations/` — Schemas de banco em produção -->
<!-- - `infra/` — Terraform/Docker de produção -->

## Dependências Externas Relevantes

<!-- Integrações que impactam decisões técnicas. -->
<!-- Ex: -->
<!-- - API de pagamento: Stripe (webhook para confirmar) -->
<!-- - Email: SendGrid (template IDs no .env) -->
<!-- - Storage: S3 (uploads via presigned URL) -->

## Ambientes

| Ambiente | URL/Host | Observações |
|----------|----------|-------------|
| Local | <!-- Ex: localhost:3000 --> | <!-- Ex: Docker compose up --> |
| Staging | <!-- Ex: staging.app.com --> | <!-- Ex: Deploy automático em push p/ develop --> |
| Produção | <!-- Ex: app.com --> | <!-- Ex: Deploy manual via tag --> |

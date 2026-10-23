# Fundação local-first do Prata

Documentação da fundação de dados e sync do Prata, decidida em sessão de design.
Vale para os três frontends (app Expo, TUI em Go, web em Go) e para o servidor.

## Índice

| Documento | Assunto |
|---|---|
| [01-arquitetura.md](./01-arquitetura.md) | Princípios, topologia, o que foi decidido e por quê |
| [02-schema.md](./02-schema.md) | Atributos de todas as tabelas, cliente e servidor |
| [03-sync.md](./03-sync.md) | Formato da op, contrato push/pull, conflito, migração, poda |
| [04-dados-derivados.md](./04-dados-derivados.md) | Views SQL, expansão de recorrência, golden fixtures |
| [05-camada-de-dados-no-app.md](./05-camada-de-dados-no-app.md) | TanStack Query como cache, `mutate()`, onde o sync vive |
| [06-implementacao.md](./06-implementacao.md) | Ordem de implementação e o que sai |

## Resumo das decisões

| Tema | Decisão |
|---|---|
| Engine de sync | Oplog próprio. Nenhuma engine de terceiro. Turso fora dos três repos |
| Modos de operação | Um só. Local-first sempre; "offline isolado" é o mesmo código sem destino de sync |
| Leitura | Nunca vai à rede. Toda tela lê do SQLite local |
| Conta | Um arquivo de banco é uma conta. `account_id` mora em `app_state` |
| Identidade | Fora do oplog e fora do banco de domínio. Token no keychain do sistema |
| Conflito | LWW por linha, consequência da ordem total do servidor. `owner_id` por linha |
| Compartilhamento | União somente-leitura. Só o dono muta a linha. v2 |
| Recorrência | Projeção pura. Vira linha só quando o usuário confirma. Nenhum cron |
| Regra derivada | Views num `.sql` compartilhado entre app, TUI e servidor |
| Servidor | `prata-api` reescrito, mesmo schema dos clientes, web em templ no mesmo binário |
| Banco do app | `expo-sqlite` |
| Cache de leitura | TanStack Query, com `staleTime` infinito e sem persister |
| Ordem de entrega | App completo offline primeiro. Servidor e sync depois |

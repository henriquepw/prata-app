# 02. Schema

Um arquivo `.sql` canônico, consumido pelo app (expo-sqlite), pelo TUI (Go) e pelo servidor (Go).
Datas são texto ISO-8601 em UTC. Valores monetários são inteiros em centavos.

## Convenções das tabelas sincronizáveis

Toda tabela de domínio carrega estas colunas, e as regras valem para todas:

| Coluna | Tipo | Nulo | Descrição |
|---|---|---|---|
| `id` | TEXT | não | ULID gerado no cliente. Chave primária |
| `owner_id` | TEXT | não | Quem pode mutar a linha. Só o dono |
| `created_at` | TEXT | não | Relógio local. Informativo, **nunca usado para ordenar** |
| `updated_at` | TEXT | não | Relógio local. Informativo |
| `deleted_at` | TEXT | sim | Tombstone. Delete nunca remove linha |
| `server_seq` | INTEGER | sim | Última op do servidor aplicada nesta linha. NULL = nunca confirmada |

**Sem `REFERENCES` nas tabelas sincronizáveis.** Op chega fora de ordem causal, e FK faria o insert estourar quando a transação chegar antes da categoria. Validação fica na aplicação, e categoria ausente é lida como "sem categoria".

**Sem `account_id` nas linhas.** Um arquivo de banco é uma conta. O `account_id` vive em `app_state`. Duas contas no mesmo device são dois arquivos.

## Cliente (app e TUI)

### `app_state`

Estado local do device. Não sincroniza.

| Coluna | Tipo | Nulo | Descrição |
|---|---|---|---|
| `key` | TEXT | não | Chave primária |
| `value` | TEXT | não | Valor serializado |

Chaves conhecidas:

| Chave | Descrição |
|---|---|
| `account_id` | ULID da conta. Gerado local no modo sem conta, substituído pelo id do servidor ao criar conta |
| `device_id` | ULID gerado no primeiro launch |
| `owner_id` | ULID do usuário atual. Local no modo sem conta |
| `protocol_version` | Versão do protocolo de sync que este cliente fala |
| `sync_cursor` | Último `server_seq` recebido no pull |
| `last_sync_at` | Timestamp do último sync bem-sucedido |

### `categories`

| Coluna | Tipo | Nulo | Descrição |
|---|---|---|---|
| `id` | TEXT | não | ULID, PK |
| `owner_id` | TEXT | não | Sempre o `OWNER` da conta |
| `name` | TEXT | não | |
| `color` | TEXT | não | `CHECK (color IN ('GRAY','RED','YELLOW','BLUE','GREEN'))` |
| `monthly_limit` | INTEGER | não | Centavos. `DEFAULT 0`, zero significa sem limite |
| `created_at` | TEXT | não | |
| `updated_at` | TEXT | não | |
| `deleted_at` | TEXT | sim | |
| `server_seq` | INTEGER | sim | |

O nome da coluna é `monthly_limit` e não `limit`, que é palavra reservada em SQL e exigia aspas em toda query no schema anterior.

### `tags`

| Coluna | Tipo | Nulo | Descrição |
|---|---|---|---|
| `id` | TEXT | não | ULID, PK |
| `owner_id` | TEXT | não | Sempre o `OWNER` da conta |
| `name` | TEXT | não | |
| `start_at` | TEXT | não | Início da vigência |
| `end_at` | TEXT | sim | Fim da vigência. NULL = aberta |
| `created_at` | TEXT | não | |
| `updated_at` | TEXT | não | |
| `deleted_at` | TEXT | sim | |
| `server_seq` | INTEGER | sim | |

### `transactions`

| Coluna | Tipo | Nulo | Descrição |
|---|---|---|---|
| `id` | TEXT | não | ULID, PK |
| `owner_id` | TEXT | não | Quem lançou. Só ele muta |
| `category_id` | TEXT | sim | Sem FK. Ausente é lido como "sem categoria" |
| `tag_id` | TEXT | sim | Sem FK |
| `kind` | TEXT | não | `CHECK (kind IN ('INCOME','OUTCOME'))` |
| `amount` | INTEGER | não | Centavos, sempre positivo. O sinal vem de `kind` |
| `description` | TEXT | sim | |
| `occurred_at` | TEXT | não | Quando o fato aconteceu, informado pelo usuário |
| `recurrence_id` | TEXT | sim | Preenchido quando esta linha confirma uma ocorrência projetada |
| `occurrence_date` | TEXT | sim | A data projetada que esta linha confirma |
| `created_at` | TEXT | não | |
| `updated_at` | TEXT | não | |
| `deleted_at` | TEXT | sim | |
| `server_seq` | INTEGER | sim | |

Índices:

```sql
CREATE UNIQUE INDEX transactions_occurrence_unique
  ON transactions (recurrence_id, occurrence_date)
  WHERE recurrence_id IS NOT NULL;

CREATE INDEX transactions_occurred_at ON transactions (occurred_at) WHERE deleted_at IS NULL;
CREATE INDEX transactions_category ON transactions (category_id) WHERE deleted_at IS NULL;
```

O índice único parcial dá idempotência à confirmação de recorrência. Dois aparelhos confirmando a mesma ocorrência produzem a mesma linha, não duas.

### `recurrences`

| Coluna | Tipo | Nulo | Descrição |
|---|---|---|---|
| `id` | TEXT | não | ULID, PK |
| `owner_id` | TEXT | não | |
| `category_id` | TEXT | sim | Sem FK |
| `kind` | TEXT | não | `CHECK (kind IN ('INCOME','OUTCOME'))` |
| `amount` | INTEGER | não | Centavos |
| `description` | TEXT | sim | |
| `rule` | TEXT | não | Regra de repetição. Ver [04-dados-derivados.md](./04-dados-derivados.md) |
| `start_at` | TEXT | não | Primeira ocorrência possível |
| `end_at` | TEXT | sim | Última ocorrência possível. NULL = indefinida |
| `created_at` | TEXT | não | |
| `updated_at` | TEXT | não | |
| `deleted_at` | TEXT | sim | |
| `server_seq` | INTEGER | sim | |

### `sync_operations`

O oplog local. Acumula desde o primeiro commit, mesmo sem servidor.

| Coluna | Tipo | Nulo | Descrição |
|---|---|---|---|
| `local_seq` | INTEGER | não | `PRIMARY KEY AUTOINCREMENT`. Ordena as ops locais pendentes |
| `id` | TEXT | não | ULID. `UNIQUE`. Chave de idempotência no servidor |
| `server_seq` | INTEGER | sim | Atribuído pelo servidor no ack. NULL = pendente |
| `entity` | TEXT | não | `CHECK (entity IN ('CATEGORY','TAG','TRANSACTION','RECURRENCE'))` |
| `entity_id` | TEXT | não | Id da linha afetada |
| `kind` | TEXT | não | `CHECK (kind IN ('CREATE','UPDATE','DELETE'))` |
| `payload` | TEXT | não | JSON com os campos alterados. Ver regra de preservação em [03-sync.md](./03-sync.md) |
| `protocol_version` | INTEGER | não | Versão do protocolo que produziu esta op |
| `device_id` | TEXT | não | De onde a op saiu |
| `owner_id` | TEXT | não | Quem escreveu |
| `created_at` | TEXT | não | Relógio local. Informativo |

```sql
CREATE INDEX sync_operations_pending ON sync_operations (local_seq) WHERE server_seq IS NULL;
```

`payload` é TEXT com JSON, não BLOB. Isso é requisito da regra de migração: cliente antigo precisa **preservar** campo que não conhece, e struct fechado descarta.

### `sync_checksums`

Detecção de divergência. Reservada agora, implementada com o servidor.

| Coluna | Tipo | Nulo | Descrição |
|---|---|---|---|
| `period` | TEXT | não | PK. Ex: `2026-08` |
| `checksum` | TEXT | não | Hash das linhas do período |
| `computed_at` | TEXT | não | |

## Servidor

O servidor tem as **mesmas quatro tabelas de domínio**, com uma diferença. Elas ganham `account_id`, porque um banco de servidor guarda todas as contas. As demais colunas e a ausência de `REFERENCES` são idênticas.

Além delas, o servidor tem o que não existe no cliente.

### `users`

| Coluna | Tipo | Nulo | Descrição |
|---|---|---|---|
| `id` | TEXT | não | ULID, PK |
| `email` | TEXT | não | `UNIQUE` |
| `secret` | TEXT | não | Hash da senha. Só aqui, nunca em cliente |
| `created_at` | TEXT | não | |
| `updated_at` | TEXT | não | |
| `deleted_at` | TEXT | sim | |

### `sessions`

| Coluna | Tipo | Nulo | Descrição |
|---|---|---|---|
| `id` | TEXT | não | ULID, PK |
| `user_id` | TEXT | não | |
| `refresh_token` | TEXT | não | |
| `expires_at` | TEXT | não | |
| `created_at` | TEXT | não | |

### `accounts`

| Coluna | Tipo | Nulo | Descrição |
|---|---|---|---|
| `id` | TEXT | não | ULID, PK |
| `name` | TEXT | não | |
| `created_by` | TEXT | não | `users.id` |
| `created_at` | TEXT | não | |
| `updated_at` | TEXT | não | |
| `deleted_at` | TEXT | sim | |

### `account_users`

| Coluna | Tipo | Nulo | Descrição |
|---|---|---|---|
| `id` | TEXT | não | ULID, PK |
| `account_id` | TEXT | não | |
| `user_id` | TEXT | não | |
| `role` | TEXT | não | `CHECK (role IN ('OWNER','MEMBER'))` |
| `created_at` | TEXT | não | |

`UNIQUE (account_id, user_id)`. No v1 o servidor recusa inserir um segundo membro por conta. A tabela existe para o v2 não exigir migração.

### `devices`

| Coluna | Tipo | Nulo | Descrição |
|---|---|---|---|
| `id` | TEXT | não | ULID gerado no cliente, PK |
| `user_id` | TEXT | não | |
| `account_id` | TEXT | não | |
| `name` | TEXT | sim | Rótulo para o usuário reconhecer |
| `cursor` | INTEGER | não | Último `server_seq` que este device confirmou ter recebido. `DEFAULT 0` |
| `last_seen_at` | TEXT | sim | Base da política de 30 dias |
| `created_at` | TEXT | não | |

### `sync_operations` (servidor)

O oplog autoritativo. É aqui que a ordem total nasce.

| Coluna | Tipo | Nulo | Descrição |
|---|---|---|---|
| `seq` | INTEGER | não | `PRIMARY KEY AUTOINCREMENT`. **A versão global.** É o cursor do pull |
| `id` | TEXT | não | ULID vindo do cliente |
| `account_id` | TEXT | não | |
| `device_id` | TEXT | não | |
| `owner_id` | TEXT | não | |
| `entity` | TEXT | não | |
| `entity_id` | TEXT | não | |
| `kind` | TEXT | não | |
| `payload` | TEXT | não | JSON, repassado sem reinterpretação |
| `protocol_version` | INTEGER | não | |
| `received_at` | TEXT | não | Relógio do servidor |

```sql
CREATE UNIQUE INDEX server_ops_idempotency ON sync_operations (device_id, id);
CREATE INDEX server_ops_pull ON sync_operations (account_id, seq);
```

O `UNIQUE (device_id, id)` torna reenvio um no-op em vez de duplicação. O SQLite atribui o `AUTOINCREMENT` no commit e serializa a escrita, então a ordem total sai sem código adicional.

O contador é global e não por conta, o que deixa o cursor de cada conta esparso. Isso é irrelevante. O pull filtra por `account_id` e ordena por `seq`, e a monotonicidade dentro da conta está preservada.

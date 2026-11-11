# Ecommerce-B2B-API

API REST do projeto **Ecommerce B2B**, uma loja de equipamentos de TI para comércio entre empresas.
O front-end (React + TypeScript) que consome esta API está em: [Ecommerce-B2B](https://github.com/P-adua/Ecommerce-B2B).

## Stack

- Node.js + TypeScript
- Express (servidor e rotas) e CORS
- Prisma 6 (ORM, schema e migrations)
- SQL Server 2022 rodando em container Docker

## Rotas

| Método | Rota        | Descrição                       |
|--------|-------------|---------------------------------|
| GET    | `/products` | Lista os produtos, por ordem de nome |

## Como rodar

**Pré-requisitos:** Node.js (versão LTS recente) e Docker Desktop.

1. Clone o repositório e instale as dependências:
   ```bash
   npm install
   ```

2. Suba o SQL Server em um container (use a mesma senha no passo seguinte):
   ```bash
   docker run -d --name sqlserver -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=SuaSenhaForte@123" -p 1433:1433 mcr.microsoft.com/mssql/server:2022-latest
   ```

3. Crie o arquivo `.env` a partir do exemplo e coloque a senha escolhida:
   ```bash
   copy .env.example .env
   ```
   (no Linux/Mac: `cp .env.example .env`)

4. Crie as tabelas e popule o banco com dados de teste:
   ```bash
   npx prisma migrate dev
   npx tsx prisma/seed.ts
   ```

5. Inicie a API:
   ```bash
   npm run dev
   ```
   Teste em `http://localhost:3333/products`.

## Estrutura

```
prisma/
  schema.prisma    # modelo das tabelas
  migrations/      # histórico de alterações do banco
  seed.ts          # dados iniciais de teste
src/
  server.ts        # servidor Express e rotas
```

## Decisões técnicas

- **Preço em centavos (Int):** evita problemas de arredondamento com decimais. A conversão para reais acontece só no front.
- **Specs em colunas fixas:** o Prisma não suporta o tipo JSON no SQL Server, e o formato das especificações é sempre o mesmo.
- **CORS com lista de origens:** a API libera apenas os endereços do front em desenvolvimento.

## Roadmap

- [ ] Autenticação com JWT e perfis (empresa compradora e admin)
- [ ] Pedidos e itens do pedido
- [ ] Preços por volume (regras de desconto no servidor)
- [ ] Testes automatizados
- [ ] Deploy
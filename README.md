# Learning 1

Projeto de aprendizado construído com Next.js e PostgreSQL, focado em gerenciamento de migrações de banco de dados via API.

## 📋 Descrição

Este projeto implementa uma API RESTful para gerenciar migrações de banco de dados PostgreSQL utilizando `node-pg-migrate`. Inclui endpoints para verificar status do banco de dados e gerenciar migrações através de requisições HTTP.

## 🚀 Tecnologias

- **Next.js** - Framework React para aplicações web
- **PostgreSQL** - Banco de dados relacional
- **node-pg-migrate** - Ferramenta de migração de banco de dados
- **Docker Compose** - Orquestração de containers
- **Jest** - Framework de testes
- **pg** - Cliente PostgreSQL para Node.js

## 📦 Pré-requisitos

- Node.js (versão 18 ou superior)
- Docker e Docker Compose
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd learning1
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env.development` na raiz do projeto com as seguintes variáveis:

```env
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=seu_usuario
POSTGRES_PASSWORD=sua_senha
POSTGRES_DB=nome_do_banco
```

## 🏃 Executando o Projeto

### Iniciar serviços (PostgreSQL via Docker):

```bash
npm run services:up
```

### Parar serviços:

```bash
npm run services:stop
```

### Remover serviços:

```bash
npm run services:down
```

### Executar em modo de desenvolvimento:

```bash
npm run dev
```

Este comando inicia os serviços Docker e o servidor Next.js.

### Executar migrações:

```bash
npm run migration:up
```

### Criar nova migração:

```bash
npm run migration:create nome-da-migracao
```

## 🧪 Testes

### Executar todos os testes:

```bash
npm test
```

### Executar testes em modo watch:

```bash
npm run test:watch
```

## 📡 Endpoints da API

### GET `/api/v1/status`

Retorna informações sobre o status do banco de dados, incluindo:

- Versão do PostgreSQL
- Número máximo de conexões
- Conexões abertas
- Timestamp de atualização

**Resposta de exemplo:**

```json
{
  "updated_at": "2024-01-01T00:00:00.000Z",
  "dependencies": {
    "database": {
      "version": "16.0",
      "max_connections": "100",
      "opened_connections": 1
    }
  }
}
```

### GET `/api/v1/migrations`

Lista todas as migrações pendentes (dry run).

**Resposta de exemplo:**

```json
[
  {
    "name": "001-initial-schema",
    "path": "infra/migrations/001-initial-schema.sql"
  }
]
```

### POST `/api/v1/migrations`

Executa todas as migrações pendentes.

**Resposta de sucesso (201):**

```json
[
  {
    "name": "001-initial-schema",
    "path": "infra/migrations/001-initial-schema.sql"
  }
]
```

## 📁 Estrutura do Projeto

```
learning1/
├── infra/
│   ├── compose.yaml       # Configuração Docker Compose
│   ├── database.js         # Cliente de banco de dados
│   └── migrations/         # Diretório de migrações (gerado automaticamente)
├── pages/
│   ├── api/
│   │   └── v1/
│   │       ├── migrations/
│   │       │   └── index.js  # Endpoint de migrações
│   │       └── status/
│   │           └── index.js  # Endpoint de status
│   └── index.js             # Página inicial
├── tests/
│   └── integration/
│       └── api/
│           └── v1/
│               ├── migrations/
│               │   ├── get.test.js
│               │   └── post.test.js
│               └── status/
│                   └── get.test.js
├── jest.config.js          # Configuração Jest
├── package.json
└── README.md
```

## 🐳 Docker

O projeto utiliza Docker Compose para facilitar o setup do ambiente de desenvolvimento. O arquivo `infra/compose.yaml` define um serviço PostgreSQL que é iniciado automaticamente com o comando `npm run dev`.

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia os serviços Docker e o servidor Next.js em modo de desenvolvimento
- `npm run services:up` - Inicia os serviços Docker (PostgreSQL)
- `npm run services:stop` - Para os serviços Docker
- `npm run services:down` - Remove os containers Docker
- `npm test` - Executa todos os testes
- `npm run test:watch` - Executa testes em modo watch
- `npm run migration:create` - Cria uma nova migração
- `npm run migration:up` - Executa migrações pendentes

## 🔒 Segurança

- As variáveis de ambiente sensíveis devem ser armazenadas no arquivo `.env.development` (não versionado)
- O arquivo `.env.development` está no `.gitignore` e não deve ser commitado

## 📄 Licença

ISC

## 👤 Autor

JLucas

---

**Status do Projeto:** 🚧 Em desenvolvimento

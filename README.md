### NestJS Task List API

Este é um projeto de estudo desenvolvido para aprender e aplicar os conceitos do NestJS, um framework Node.js progressivo para a construção de aplicações server-side eficientes e escaláveis.

A aplicação consiste em uma API REST para um gerenciador de tarefas (To-Do List), onde é possível gerenciar usuários, autenticação e as tarefas associadas a cada um.

## Funcionalidades Principais

Gerenciamento de Usuários (CRUD): Criação, leitura, atualização e exclusão de usuários (src/users/users.controller.ts).

Gerenciamento de Tarefas (CRUD): Criação, leitura, atualização e exclusão de tarefas (src/tasks/tasks.controller.ts).

Autenticação de Usuários: Sistema de login baseado em username e password (src/auth/auth.service.ts).

Autorização com JWT: Proteção de rotas utilizando JSON Web Tokens (JWT) para garantir que apenas usuários autenticados possam acessar e manipular seus próprios recursos (src/auth/auth.guard.ts).

## Tecnologias Utilizadas

Framework: NestJS

Linguagem: TypeScript

Banco de Dados: MySQL com TypeORM

Autenticação: Passport.js com estratégias passport-local e passport-jwt.

Validação de Dados: class-validator.

Variáveis de Ambiente: @nestjs/config.

## Pré-requisitos

Node.js (versão 18 ou superior)

NPM

Um servidor de banco de dados MySQL em execução.

## Instalação e Configuração

Clone o repositório:

```
git clone https://github.com/thiagodotjpeg/task-list.git
cd task-list/backend

Instale as dependências:

npm install
```

Configure as variáveis de ambiente:
Crie um arquivo .env na raiz do diretório backend, baseado no seu ficheiro existente:

# Configurações da Aplicação

PORT=3000

# Chave secreta para o JWT (use um valor forte e aleatório)

JWT_SECRET=ADCIONE_UM_SEGREDO_PARA_SEU_JWT

# Configurações do Banco de Dados

```
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=admin123
DB_DATABASE=task_management
```

Certifique-se de que os dados de conexão com o seu banco de dados MySQL estão corretos.

## Executando a Aplicação

Para iniciar a aplicação em modo de desenvolvimento com hot-reload:

```
npm run start:dev
```

A aplicação estará disponível em http://localhost:3000.

## Outros Scripts

Iniciar em modo de produção:

```
npm run build
npm run start:prod

Rodar os testes unitários:

npm run test

Verificar a cobertura de testes:

npm run test:cov
```

## Estrutura da API

A API expõe os seguintes endpoints principais:

```
POST /users - Cria um novo usuário.

POST /auth/login - Autentica um usuário e retorna um token JWT.

GET /auth/profile - (Rota Protegida) Retorna os dados do usuário autenticado.

POST /tasks - (Rota Protegida) Cria uma nova tarefa.

GET /tasks - (Rota Protegida) Lista todas as tarefas do usuário.
```

... e outros endpoints para gerenciar tarefas e usuários.

Para aceder às rotas protegidas, é necessário enviar o token JWT no cabeçalho Authorization:

Authorization: Bearer <seu_token_jwt>

Este projeto foi criado como parte de um processo de aprendizagem do NestJS.

<p align="center">
    <img src="https://github.com/RosyProgramming/Brev.ly/blob/main/web/src/assets/Logo.svg" alt="Logo do Projeto"  width="300"/>
</p>

# Brev.ly - Encurtador de Links

Projeto desenvolvido durante a Pós-Graduação da FTR, com o objetivo de transformar conhecimento em ação e adquirir novas habilidades.

O objetivo desse projeto é criar uma aplicação que permita o cadastro, listagem e remoção de links encurtados, geração de relatório dos acessos de cada link e também o redirecionamento correto do link encurtado para o link original.

## 🚀 Tecnologias

### Backend

- **Linguagem:** TypeScript
- **Framework:** Fastify
- **ORM:** Drizzle
- **Banco de Dados:** PostgreSQL
- **Testes:** Vitest
- **Outros:** Node.js, Docker, AWS S3

### Frontend

- **Framework:** React com Vite
- **Linguagem:** TypeScript
- **Estilização:** TailwindCSS
- **Formulários:** React Hook Form + Zod
- **Estado:** React Query
- **Roteamento:** React Router
- **HTTP Client:** Axios
- **Ícones:** Lucide, Phosphor Icons


## 📋 Pré-requisitos

- Node.js (versão LTS recomendada)
- PNPM
- Docker e Docker Compose
- Cloudflare (R2)

## 🛠️ Configuração do Ambiente

### Backend

1. Entre no diretório do servidor:

```bash
cd server
```

2. Instale as dependências:

```bash
pnpm install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

4. Inicie o banco de dados com Docker:

```bash
docker-compose up -d
```

5. Execute as migrações:

```bash
pnpm db:migrate
```

6. Inicie o servidor em modo de desenvolvimento:

```bash
pnpm dev
```

### Frontend

1. Entre no diretório web:

```bash
cd web
```

2. Instale as dependências:

```bash
pnpm install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

4. Inicie o servidor de desenvolvimento:

```bash
pnpm dev
```

## 🧪 Testes

Para executar os testes do backend:

```bash
cd server
pnpm test
```

Para executar os testes em modo watch:

```bash
pnpm test:watch
```

## 📦 Scripts Disponíveis

### Backend

- `pnpm dev`: Inicia o servidor em modo de desenvolvimento
- `pnpm build`: Compila o projeto
- `pnpm start`: Inicia o servidor em produção
- `pnpm test`: Executa os testes
- `pnpm db:generate`: Gera as migrações do banco de dados
- `pnpm db:migrate`: Executa as migrações do banco de dados
- `pnpm db:studio`: Abre o Drizzle Studio para gerenciamento do banco

### Frontend

- `pnpm dev`: Inicia o servidor de desenvolvimento
- `pnpm build`: Compila o projeto para produção
- `pnpm preview`: Visualiza a versão de produção localmente
- `pnpm lint`: Executa o linter

## 🐳 Docker

O projeto inclui configurações Docker para facilitar o desenvolvimento e deploy:

```bash
docker-compose up -d
```

## 🎨 Design do projeto

O visual deste projeto foi criado no [Figma](https://www.figma.com/community/file/1477335071553579816), com atenção especial à experiência do usuário e à identidade visual da aplicação. O design guiou toda a construção do frontend, garantindo uma interface bonita, intuitiva e responsiva.

Agradecimentos especiais aos criadores do protótipo que inspirou este projeto. 💜


## 📄 Licença

Este projeto está licenciado sob a licença MIT.

---

Desenvolvido com ❤️ por [Rosana Oliveira](https://github.com/RosyProgramming/)




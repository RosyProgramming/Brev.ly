# Usa uma imagem mais segura e atualizada
FROM node:22.14.1

# Define o diretório de trabalho
WORKDIR /app

# Copia apenas os arquivos essenciais primeiro
COPY package.json pnpm-lock.yaml ./

# Instala o pnpm
RUN npm install -g pnpm

# Instala as dependências
RUN pnpm install

# Copia o restante do código
COPY . .

# Gera o build do projeto
RUN pnpm build

# Expõe a porta 3333
EXPOSE 3333

# Comando de inicialização
CMD ["pnpm", "dev"]

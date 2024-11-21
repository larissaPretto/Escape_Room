# Use uma imagem base do Node.js
FROM node:18

# Configure o diretório de trabalho
WORKDIR /usr/src/app

# Copie apenas o package.json e yarn.lock para instalar as dependências
COPY package.json yarn.lock ./ 

# Instale as dependências
RUN yarn install

# Copie o restante do código, incluindo os arquivos TypeScript
COPY . .

# Copie o script wait-for-it.sh para o container
COPY ./scripts/wait-for-it.sh /usr/local/bin/wait-for-it.sh

# Dê permissão de execução ao script
RUN chmod +x /usr/local/bin/wait-for-it.sh

# Compile o TypeScript para JavaScript
RUN yarn run build

# Exponha a porta usada pela API
EXPOSE 3000

# Comando para aguardar o banco de dados e rodar a aplicação em produção
CMD ["wait-for-it.sh", "db-escape:3306", "--", "node", "dist/server.js"]

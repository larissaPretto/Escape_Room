# Use uma imagem base do Node.js para construção
FROM node:18 as build

# Configure o diretório de trabalho para a construção
WORKDIR /usr/src/app

# Copie os arquivos essenciais
COPY package.json yarn.lock ./

# Instale as dependências
RUN yarn install

# Copie o restante do código
COPY . .

# Construa o projeto para produção
RUN yarn run build

# Use uma imagem leve do Nginx para servir os arquivos estáticos
FROM nginx:1.25-alpine

# Copie os arquivos da build para a pasta padrão do Nginx
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Copie a configuração personalizada do Nginx
COPY default.conf /etc/nginx/conf.d/default.conf

# Exponha a porta 80
EXPOSE 80

# Inicie o Nginx
CMD ["nginx", "-g", "daemon off;"]

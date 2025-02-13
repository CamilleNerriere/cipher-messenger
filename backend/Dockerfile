FROM node:lts-alpine3.20
WORKDIR /usr/src/app
RUN npm install -g pnpm
COPY /package.json  ./
RUN pnpm install 
COPY . .
EXPOSE 3000
CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"production\" ]; then pnpm start; else pnpm run dev --host 0.0.0.0; fi"]


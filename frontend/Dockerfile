FROM node:lts-alpine3.20
WORKDIR /usr/src/app
RUN npm install -g pnpm
COPY /package.json ./
RUN pnpm install 
COPY . .
EXPOSE 5173
CMD ["sh", "-c", "pnpm exec vite --host 0.0.0.0"]
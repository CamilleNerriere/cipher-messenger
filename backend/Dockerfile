FROM node:lts-alpine3.20
WORKDIR /usr/src/app
RUN npm install -g pnpm
COPY ../package.json ../pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
EXPOSE 3000
CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"production\" ]; then npm start; else npm run dev --host 0.0.0.0; fi"]


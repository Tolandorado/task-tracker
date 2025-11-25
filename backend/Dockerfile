FROM node:20-alpine AS development

WORKDIR /app

COPY package*.json ./ 

RUN npm install --omit=dev
RUN npm install -g @nestjs/cli

COPY . . 

RUN npm run build || exit 1
RUN ls -lR dist

FROM node:20-alpine AS production

WORKDIR /app

COPY --from=development /app/package*.json ./
COPY --from=development /app/node_modules/ ./node_modules/
COPY --from=development /app/dist ./dist

RUN ls -lR dist

# CMD ["sh", "-c", "node dist/src/database/run-migrations.js && node dist/src/main"]
CMD ["node", "dist/src/main"]
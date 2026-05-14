FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY unimercs-backend/ ./unimercs-backend/

COPY .env* ./

RUN mkdir -p uploads

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
RUN chown -R appuser:appgroup /app

USER appuser

EXPOSE 5000

CMD ["node", "unimercs-backend/server.js"]

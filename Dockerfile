# the builder stage installs dependencies and dev dependencies(needed for building)
# and then builds the dist (for ts to js)
FROM node:18.19.1-alpine3.19 AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM node:18.19.1-alpine3.19 AS final
WORKDIR /app
COPY --from=builder ./app/dist ./dist
COPY --from=builder ./app/prisma ./prisma
COPY --from=builder ./app/package*.json ./
RUN npm install --omit=dev
# RUN chown -R node /usr/src/app
# USER node
# and also deploys any pending migrations
CMD ["npm", "run", "production"]

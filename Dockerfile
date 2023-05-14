# Install dependencies only when needed
FROM node:16-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:16-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN apk add --no-cache libc6-compat nasm autoconf automake bash

RUN addgroup --system --gid 1001 storegroup
RUN adduser --system --uid 1001 storeuser

COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

# COPY --from=builder --chown=storeuser:storegroup /app ./

USER storeuser

EXPOSE 3000

ENV PORT 3000

CMD ["yarn", "start"]

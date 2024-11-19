# Install dependencies only when needed
FROM node:20-buster-slim AS deps
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package*.json ./
RUN npm ci


# Rebuild the source code only when needed
FROM node:20-buster-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build


# Production image, copy all the files and run next
FROM node:20-buster-slim AS runner
WORKDIR /app
ENV NODE_ENV production

COPY package*.json ./

# Disable husky
RUN npm pkg delete scripts.prepare

# Install only production dependencies
RUN npm ci --only=production

# Copy from build stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/tsconfig.json ./tsconfig.json

CMD ["node", "dist/main"]
# Stage 1: Install dependencies
FROM node:20-buster-slim AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Stage 2: Build the application
FROM node:20-buster-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: Production image
FROM node:20-buster-slim AS runner
WORKDIR /app

ENV NODE_ENV production
EXPOSE 3100

# Copy only the necessary files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Start the application
CMD ["npm", "run", "start"]

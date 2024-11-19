# Stage 1: Install dependencies
FROM node:20-buster-slim AS deps
WORKDIR /app

# Copy only package files to install dependencies
COPY package*.json ./
RUN npm ci

# Stage 2: Build the application
FROM node:20-buster-slim AS builder
WORKDIR /app

# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 3: Production image
FROM node:20-buster-slim AS runner
WORKDIR /app

# Set environment to production
ENV NODE_ENV production

# Copy only the necessary files
COPY --from=builder /app/.next ./next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Expose default Next.js port
EXPOSE 3800

# Start the application
CMD ["npm", "run", "start"]

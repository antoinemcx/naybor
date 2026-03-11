# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Production stage
FROM node:22-alpine AS production

# Install system dependencies for discord-player
RUN apk add --no-cache ffmpeg dumb-init

# Create non-root user for security
RUN addgroup -S nodejs && adduser -S naybor -G nodejs

WORKDIR /app

# Copy node_modules from builder stage
COPY --from=builder --chown=naybor:nodejs /app/node_modules ./node_modules
COPY --chown=naybor:nodejs . .

USER naybor

EXPOSE 3000

# Run database migrations with retry logic before starting the application
CMD ["sh", "-c", "echo '🚀 Starting Naybor bot...' && echo '🔧 Running migrations...' && until npm run migration; do echo 'Migration failed, retrying in 5s...'; sleep 5; done && echo '✅ Migrations completed! Starting bot...' && exec dumb-init npm start"]
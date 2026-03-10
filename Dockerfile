# Build stage
FROM node:22-bookworm-slim AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Production stage  
FROM node:22-bookworm-slim AS production

# Install system dependencies for discord-player
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        ffmpeg \
        python3 \
        make \
        g++ \
        libopus0 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get autoremove -y

# Create non-root user for security
RUN addgroup --gid 1001 --system nodejs && \
    adduser --system --uid 1001 naybor

WORKDIR /app

# Copy node_modules from builder stage
COPY --from=builder --chown=naybor:nodejs /app/node_modules ./node_modules
COPY --chown=naybor:nodejs . .

USER naybor

EXPOSE 3000
# Run database migrations with retry logic before starting the application
CMD ["sh", "-c", "echo '🚀 Starting bot...' && echo '🔧 Running migrations...' && until npm run migration; do echo 'Migration failed, retrying in 5s...'; sleep 5; done && echo '✅ Migrations completed! Starting bot...' && npm start"]
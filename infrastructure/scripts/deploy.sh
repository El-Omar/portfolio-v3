#!/bin/bash
set -e

# Define colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting deployment process...${NC}"

# Get the project root (assuming this script is in infrastructure/scripts/)
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd $PROJECT_ROOT

# Path to the docker-compose file
DOCKER_COMPOSE_FILE="./infrastructure/docker/production/docker-compose.yml"

# Check for production .env files
if [ ! -f "./backend/.env.production" ]; then
  echo -e "${RED}No backend/.env.production file found!${NC}"
  echo -e "${YELLOW}Please create a backend/.env.production file for production deployment${NC}"
  exit 1
fi

if [ ! -f "./frontend/.env.production" ]; then
  echo -e "${RED}No frontend/.env.production file found!${NC}"
  echo -e "${YELLOW}Please create a frontend/.env.production file for production deployment${NC}"
  exit 1
fi

# Source environment variables from backend .env file
source <(grep -v '^#' ./backend/.env.production | sed 's/^/export /')

# Create Traefik configuration directory if it doesn't exist
if [ ! -d "./infrastructure/traefik" ]; then
  echo -e "${YELLOW}Creating Traefik configuration directory...${NC}"
  mkdir -p ./infrastructure/traefik/config
  
  # Create traefik.yml if it doesn't exist
  if [ ! -f "./infrastructure/traefik/traefik.yml" ]; then
    echo -e "${YELLOW}Creating Traefik configuration...${NC}"
    cat > ./infrastructure/traefik/traefik.yml << EOL
## Traefik Static Configuration
entryPoints:
  web:
    address: ":80"
    http:
      redirections:
        entryPoint:
          to: websecure
          scheme: https
  
  websecure:
    address: ":443"

# API and dashboard
api:
  insecure: false
  dashboard: true

# Docker provider configuration
providers:
  docker:
    endpoint: "unix:///var/run/docker.sock"
    exposedByDefault: false
  file:
    directory: "/etc/traefik/config"
    watch: true

# SSL certificate resolver
certificatesResolvers:
  letsencrypt:
    acme:
      email: ${CMS_ADMIN_USERNAME}
      storage: /letsencrypt/acme.json
      httpChallenge:
        entryPoint: web

# Log level
log:
  level: INFO
EOL
  fi
fi

# Make sure production Dockerfiles exist
if [ ! -f "./infrastructure/docker/production/backend.Dockerfile" ]; then
  echo -e "${YELLOW}Creating production backend Dockerfile...${NC}"
  cat > ./infrastructure/docker/production/backend.Dockerfile << EOL
# Build stage
FROM node:22-alpine AS builder

WORKDIR /usr/src/app

# Copy root package.json and workspace files
COPY package.json yarn.lock ./
COPY shared/package.json ./shared/
COPY backend/package.json ./backend/

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY shared ./shared
COPY backend ./backend

# Build shared package
RUN yarn workspace @portfolio-v3/shared build

# Build backend
RUN yarn workspace backend build

# Production stage
FROM node:22-alpine

WORKDIR /usr/src/app

# Copy package files
COPY package.json yarn.lock ./
COPY shared/package.json ./shared/
COPY backend/package.json ./backend/

# Install production dependencies only
RUN yarn install --frozen-lockfile --production

# Copy built files from builder stage
COPY --from=builder /usr/src/app/shared/dist ./shared/dist
COPY --from=builder /usr/src/app/backend/dist ./backend/dist

# Set environment to production
ENV NODE_ENV production

# Expose the port the app runs on
EXPOSE 5000

# Start the server
CMD ["node", "backend/dist/index.js"]
EOL
fi

if [ ! -f "./infrastructure/docker/production/frontend.Dockerfile" ]; then
  echo -e "${YELLOW}Creating production frontend Dockerfile...${NC}"
  cat > ./infrastructure/docker/production/frontend.Dockerfile << EOL
# Build stage
FROM node:22-alpine AS builder

WORKDIR /usr/src/app

# Copy root package.json and workspace files
COPY package.json yarn.lock ./
COPY shared/package.json ./shared/
COPY frontend/package.json ./frontend/

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY shared ./shared
COPY frontend ./frontend

# Build shared package
RUN yarn workspace @portfolio-v3/shared build

# Build frontend
WORKDIR /usr/src/app/frontend
RUN yarn workspace frontend build

# Production stage - using a smaller image for serving Next.js
FROM node:22-alpine

WORKDIR /usr/src/app

# Copy package files for production
COPY package.json yarn.lock ./
COPY frontend/package.json ./frontend/

# Install production dependencies only
RUN yarn install --frozen-lockfile --production

# Copy built files from builder stage
COPY --from=builder /usr/src/app/frontend/.next ./frontend/.next
COPY --from=builder /usr/src/app/frontend/public ./frontend/public
COPY --from=builder /usr/src/app/frontend/next.config.js ./frontend/

# Set environment to production
ENV NODE_ENV production

# Expose the port the app runs on
EXPOSE 3000

# Start the server
WORKDIR /usr/src/app/frontend
CMD ["yarn", "start"]
EOL
fi

# Start services in the correct order
echo -e "${YELLOW}Starting Traefik...${NC}"
docker-compose -f $DOCKER_COMPOSE_FILE up -d traefik
echo -e "${GREEN}Traefik started.${NC}"

echo -e "${YELLOW}Starting MongoDB...${NC}"
docker-compose -f $DOCKER_COMPOSE_FILE up -d mongodb
echo -e "${GREEN}MongoDB started.${NC}"

# Wait for MongoDB to be healthy
echo -e "${YELLOW}Waiting for MongoDB to be healthy...${NC}"
ATTEMPTS=0
MAX_ATTEMPTS=30
until docker-compose -f $DOCKER_COMPOSE_FILE exec -T mongodb mongosh --quiet --eval "db.adminCommand('ping')" || [ $ATTEMPTS -eq $MAX_ATTEMPTS ]; do
  echo -e "${YELLOW}Waiting for MongoDB to be ready... ($ATTEMPTS/$MAX_ATTEMPTS)${NC}"
  ATTEMPTS=$((ATTEMPTS+1))
  sleep 2
done

if [ $ATTEMPTS -eq $MAX_ATTEMPTS ]; then
  echo -e "${RED}MongoDB did not become healthy in time. Deployment failed.${NC}"
  exit 1
fi
echo -e "${GREEN}MongoDB is healthy.${NC}"

# Start backend
echo -e "${YELLOW}Building and starting backend...${NC}"
docker-compose -f $DOCKER_COMPOSE_FILE up -d --build backend
echo -e "${GREEN}Backend started.${NC}"

# Wait for backend to be ready (assuming health endpoint at /api/v1/health)
echo -e "${YELLOW}Waiting for backend to be ready...${NC}"
ATTEMPTS=0
MAX_ATTEMPTS=30
BACKEND_URL="http://localhost:5000${API_PREFIX}/health"
until curl -s $BACKEND_URL > /dev/null || [ $ATTEMPTS -eq $MAX_ATTEMPTS ]; do
  echo -e "${YELLOW}Waiting for backend to be ready... ($ATTEMPTS/$MAX_ATTEMPTS)${NC}"
  ATTEMPTS=$((ATTEMPTS+1))
  sleep 2
done

if [ $ATTEMPTS -eq $MAX_ATTEMPTS ]; then
  echo -e "${RED}Backend did not become ready in time. Deployment failed.${NC}"
  docker-compose -f $DOCKER_COMPOSE_FILE logs backend
  exit 1
fi
echo -e "${GREEN}Backend is ready.${NC}"

# Now build and start frontend
echo -e "${YELLOW}Building and starting frontend...${NC}"
docker-compose -f $DOCKER_COMPOSE_FILE up -d --build frontend
echo -e "${GREEN}Frontend started.${NC}"

echo -e "${GREEN}Deployment completed successfully!${NC}"
DOMAIN=$(echo $FRONTEND_URL | sed 's/^http[s]*:\/\///')
echo -e "${YELLOW}Your application should now be available at https://${DOMAIN}${NC}"
echo -e "${YELLOW}Traefik is automatically managing SSL certificates via Let's Encrypt${NC}"

# Output service status
echo -e "${YELLOW}Service status:${NC}"
docker-compose -f $DOCKER_COMPOSE_FILE ps
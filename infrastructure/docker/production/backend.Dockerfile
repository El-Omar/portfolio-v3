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

# Start backend
CMD ["node", "backend/dist/server.js"] 
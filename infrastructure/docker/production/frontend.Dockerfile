# Build stage
FROM node:22-alpine AS builder

WORKDIR /usr/src/app

# Copy root package.json and workspace files
COPY package.json yarn.lock ./
COPY shared/package.json ./shared/
COPY frontend/package.json ./frontend/

# Install dependencies
RUN yarn install

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
COPY shared/package.json ./shared/
COPY frontend/package.json ./frontend/

# Copy shared package build from builder stage
COPY --from=builder /usr/src/app/shared/dist ./shared/dist

# Install production dependencies only
RUN yarn install

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
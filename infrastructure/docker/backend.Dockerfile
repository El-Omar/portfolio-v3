FROM node:22-alpine

WORKDIR /usr/src/app

# Copy root package.json and workspace files
COPY package.json ./
COPY yarn.lock ./
COPY shared/package.json ./shared/
COPY backend/package.json ./backend/

# Install all dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY shared ./shared
COPY backend ./backend

# Build shared package
RUN yarn workspace @portfolio-v3/shared build

# Start the server (from backend directory)
WORKDIR /usr/src/app/backend
CMD ["yarn", "workspace", "backend", "dev"]
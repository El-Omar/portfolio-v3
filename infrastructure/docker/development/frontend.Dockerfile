FROM node:22-alpine

WORKDIR /usr/src/app

# Copy root package.json and workspace files
COPY package.json yarn.lock ./
COPY shared/package.json ./shared/
COPY frontend/package.json ./frontend/

# Install all dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY shared ./shared
COPY frontend ./frontend

# Build shared package
RUN yarn workspace @portfolio-v3/shared build

# Start the development server (from frontend directory)
WORKDIR /usr/src/app/frontend
CMD ["yarn", "workspace", "frontend", "dev"]
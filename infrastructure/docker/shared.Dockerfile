FROM node:22-alpine

WORKDIR /usr/src/app

# Copy only what's needed for the shared package
COPY package.json yarn.lock ./
COPY shared/package.json ./shared/

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy shared source code
COPY shared ./shared

# Start TypeScript in watch mode
CMD ["yarn", "workspace", "@portfolio-v3/shared", "watch"]
# Use Node.js as base image
FROM node:22-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy app files
COPY . .

# Expose port
EXPOSE 3000

# Start development server
CMD ["yarn", "dev"]
FROM node:20-alpine

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Copy package files first for better caching
COPY package.json yarn.lock .yarnrc.yml ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy environment file
ARG ENV_FILE
COPY ${ENV_FILE} .env

# Copy the rest of the application
COPY . .

# Build the application
RUN yarn build

# Copy env to medusa server directory
COPY .env .medusa/server/.env

# Switch to medusa server directory
WORKDIR /app/.medusa/server

# Install server dependencies
RUN yarn install --frozen-lockfile

# Set production environment
ENV NODE_ENV=production

# Start the application
CMD ["yarn", "start"] 
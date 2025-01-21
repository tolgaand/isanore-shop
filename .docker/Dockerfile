FROM node:20-alpine

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Copy package files first for better caching
COPY package.json yarn.lock .yarnrc.yml ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy environment file first
ARG ENV_FILE
COPY ${ENV_FILE} .env

# Copy the rest of the application
COPY . .

# Build the application
RUN yarn build

# Expose the port the app runs on
ARG PORT=9000
ENV PORT=$PORT
EXPOSE $PORT

# Start the application
CMD ["yarn", "start"] 
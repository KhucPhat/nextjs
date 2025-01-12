# Stage 1: Install Dependencies
FROM node:21.7.3-alpine3.18 AS dependencies

ENV YARN_VERSION=4.5.1

RUN yarn policies set-version $YARN_VERSION

# Set environment to production
ENV NODE_ENV=production

# Set working directory in the container
WORKDIR /app

# Copy only the package files to install dependencies
COPY . .

# Install dependencies
RUN yarn

# Stage 2: Build the Next.js app
FROM node:21.7.3-alpine3.18 AS builder

# Set working directory in the container
WORKDIR /app

# Copy the installed dependencies from the dependencies stage
COPY --from=dependencies /app .

# Build the Next.js application
RUN yarn build

# Stage 3: Create the production image
FROM node:21.7.3-alpine3.18 AS production

# Set working directory in the container
WORKDIR /app

# Copy only the necessary files for production from the builder stage
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.env ./

# Expose the port Next.js will run on
EXPOSE 3000

# Start Next.js in production mode
CMD ["yarn", "start"]

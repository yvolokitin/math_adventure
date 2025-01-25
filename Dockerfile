# Use official Node.js image as base
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy project files and build the app
COPY . .
RUN yarn build

# Use a lightweight web server for serving static files
FROM nginx:alpine

# Copy built files to the Nginx web server
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

# Stage 1: Build Vite React application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package manifests and install dependencies
COPY package*.json ./
RUN npm ci || npm install

# Copy application sources
COPY . .

# Build for production
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:1.27-alpine

RUN apk add --no-cache curl
RUN rm -rf /usr/share/nginx/html/*

# Copy compiled SPA assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD curl -fsS http://localhost:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]

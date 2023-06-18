# Aufruf:   docker buildx build --tag swe-ss23-a2/vite:2023.6.0 .
# Stage 1: BUILD
FROM node:14.17.0 AS builder

WORKDIR /app

COPY package.json .

COPY . .

CMD ["npm", "run", "build"]

# Stage 2: NGINX
FROM nginx:1.21.0-alpine

# Copy custom nginx configuration file
COPY .extras/nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]
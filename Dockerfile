ARG NODE_VERSION=22.14.0-alpine
ARG NGINX_VERSION=alpine3.21

# Etapa 1: Build (Construcción)
FROM node:${NODE_VERSION} AS builder
WORKDIR /front
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Run (Ejecución)
FROM nginxinc/nginx-unprivileged:${NGINX_VERSION} AS runner
WORKDIR /front
USER nginx
COPY --chown=nginx:nginx --from=builder /front/dist/*/browser /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx", "-c", "/etc/nginx/nginx.conf"]
CMD ["-g", "daemon off;"]

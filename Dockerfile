FROM registry.access.redhat.com/ubi9/nodejs-20 AS builder

USER root

WORKDIR /usr/share/builder

COPY package.json package-lock.json tsconfig.json config-overrides.js ./
COPY src ./src
COPY public ./public
COPY packages/common ./packages/common

RUN npm i

FROM registry.access.redhat.com/ubi9/nginx-124

WORKDIR /usr/share/nginx

COPY --from=builder /usr/share/builder/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;", "-c", "/etc/nginx/nginx.conf"]

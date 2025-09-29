FROM registry.access.redhat.com/ubi9/nodejs-20 AS builder

USER root

WORKDIR /usr/share/builder

COPY package.json package-lock.json tsconfig.json next.config.ts .eslintrc.json prettier.config.js proxy.mjs ./
COPY src ./src
COPY public ./public
COPY packages ./packages

# Secrety se montují jen v rámci RUN
RUN --mount=type=secret,id=api-documentation-frontend-sitemap/PROD_CLIENT_ID \
    --mount=type=secret,id=api-documentation-frontend-sitemap/PROD_CLIENT_SECRET \
    --mount=type=secret,id=api-documentation-frontend-sitemap/PROD_INDEX_URL \
    --mount=type=secret,id=api-documentation-frontend-sitemap/PROD_JWT_FETCH_URL \
    bash -c '\
      echo "PROD_CLIENT_ID=$(cat /run/secrets/api-documentation-frontend-sitemap/PROD_CLIENT_ID)" >> /env_secrets && \
      echo "PROD_CLIENT_SECRET=$(cat /run/secrets/api-documentation-frontend-sitemap/PROD_CLIENT_SECRET)" >> /env_secrets && \
      echo "PROD_INDEX_URL=$(cat /run/secrets/api-documentation-frontend-sitemap/PROD_INDEX_URL)" >> /env_secrets && \
      echo "PROD_JWT_FETCH_URL=$(cat /run/secrets/api-documentation-frontend-sitemap/PROD_JWT_FETCH_URL)" >> /env_secrets \
    '

# Nahrajeme env proměnné jako default
ENV $(cat /env_secrets | xargs)

# Teď už jsou k dispozici ve všech dalších RUN krocích
RUN echo "Client ID je: $PROD_CLIENT_ID"

RUN echo ==========
RUN --mount=type=secret,id=api-documentation-frontend-sitemap/PROD_CLIENT_ID sh -c BAR=$(cat /run/secrets/api-documentation-frontend-sitemap/PROD_CLIENT_ID);echo $BAR
RUN --mount=type=secret,id=api-documentation-frontend-sitemap sh -c FOO=$(cat /run/secrets/api-documentation-frontend-sitemap/PROD_CLIENT_ID);echo $FOO
RUN --mount=type=secret,id=api-documentation-frontend-sitemap sh -c ls /run/secrets/api-documentation-frontend-sitemap
RUN echo =========

RUN npm i

RUN --mount=type=secret,id=api-documentation-frontend-sitemap/PROD_JWT_FETCH_URL \
    --mount=type=secret,id=api-documentation-frontend-sitemap/PROD_CLIENT_ID \
    --mount=type=secret,id=api-documentation-frontend-sitemap/PROD_CLIENT_SECRET \
    --mount=type=secret,id=api-documentation-frontend-sitemap/PROD_INDEX_URL \
    --mount=type=secret,id=api-documentation-frontend-sitemap/sitemap-base-url \
    sh -c 'HYDRA_SYNC_ACTIVE=true \
           JWT_FETCH_URL=$(cat /run/secrets/api-documentation-frontend-sitemap/PROD_JWT_FETCH_URL) \
           CLIENT_ID=$(cat /run/secrets/api-documentation-frontend-sitemap/PROD_CLIENT_ID) \
           CLIENT_SECRET=$(cat /run/secrets/api-documentation-frontend-sitemap/PROD_CLIENT_SECRET) \
           INDEX_URL=$(cat /run/secrets/api-documentation-frontend-sitemap/PROD_INDEX_URL) \
           SITEMAP_BASE_URL=https://developers.redhat.com/api-catalog \
           npm run sitemap'

RUN npm run build

FROM registry.access.redhat.com/ubi9/nginx-124

WORKDIR /usr/share/nginx

COPY --from=builder /usr/share/builder/out /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;", "-c", "/etc/nginx/nginx.conf"]

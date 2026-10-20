FROM registry.access.redhat.com/ubi9/nodejs-22@sha256:724b994feda13753bdc8dcb38dbf2ab14decb5105d18021b8a2b092f7e3b4c69 AS builder

USER root

WORKDIR /usr/share/builder

COPY package.json package-lock.json tsconfig.json next.config.ts .eslintrc.json prettier.config.js proxy.mjs ./
COPY src ./src
COPY public ./public
COPY packages ./packages

RUN npm ci

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

FROM registry.access.redhat.com/ubi9/nginx-124@sha256:f414eb6c23a501c921542b75e30032979640682d8eaa37b500d7d34f4048e5ec

WORKDIR /usr/share/nginx

COPY --from=builder /usr/share/builder/out /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;", "-c", "/etc/nginx/nginx.conf"]

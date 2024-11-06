import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const proxyMiddleware = createProxyMiddleware({
  target: 'https://developers.redhat.com/modules',
  changeOrigin: true,
  logger: console,
  secure: false,
  changeOrigin: true,
})

const app = express();

app.use('/modules', proxyMiddleware)

app.listen(3001, () => {
  console.log('Proxy server is running on http://localhost:3001');
});

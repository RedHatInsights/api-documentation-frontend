import type { NextConfig } from 'next';
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  images: {
    unoptimized: true,
  },
  ...(process.env.DEV === 'true'
    ? {
        async rewrites() {
          // proxy to get the assets from developers.redhat.com
          return [
            {
              source: '/modules/:path*',
              destination: 'http://localhost:3001/modules/:path*',
            },
          ];
        },
        basePath: '',
      }
    : {
        basePath: '/api-catalog',
      }),
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(
        new MonacoWebpackPlugin({
          languages: ['go', 'python', 'java', 'javascript', 'shell', 'cpp', 'ruby', 'json'],
          filename: 'static/[name].worker.js',
        }),
      );
    }
    return config;
  },
};

export default nextConfig;

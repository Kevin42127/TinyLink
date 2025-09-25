/** @type {import('next').NextConfig} */
const nextConfig = {
  // 環境變數配置
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  },
  
  // SQLite 相關配置
  experimental: {
    serverComponentsExternalPackages: ['sqlite3'],
  },
  
  // Webpack 配置
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('sqlite3');
    }
    return config;
  },
  
  // 圖片優化
  images: {
    domains: [],
    formats: ['image/webp', 'image/avif'],
  },
  
  // 安全標頭
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig

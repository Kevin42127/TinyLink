# TinyLink - Vercel 部署指南

## 📋 部署概述

本指南將幫助您將 TinyLink 短網址服務部署到 Vercel 平台。

## 🚀 快速部署

### 方法一：一鍵部署 (推薦)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/tinylink)

1. 點擊上方按鈕
2. 登入 Vercel 帳戶
3. 配置環境變數
4. 點擊部署

### 方法二：手動部署

#### 1. 準備代碼倉庫

```bash
# 克隆或上傳您的代碼到 GitHub
git clone https://github.com/your-username/tinylink.git
cd tinylink
```

#### 2. 連接 Vercel

1. 訪問 [vercel.com](https://vercel.com)
2. 點擊 "New Project"
3. 選擇您的 GitHub 倉庫
4. 點擊 "Import"

#### 3. 配置項目設置

**Framework Preset**: Next.js
**Root Directory**: `./`
**Build Command**: `npm run build`
**Output Directory**: `.next`

## ⚙️ 環境變數配置

在 Vercel 項目設置中添加以下環境變數：

### 必需環境變數

```env
# 數據庫配置
DATABASE_URL=file:./data/shorturls.db

# 郵件配置 (可選)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### 自動環境變數

Vercel 會自動提供以下變數：
- `NEXT_PUBLIC_BASE_URL` - 部署的域名
- `VERCEL_URL` - Vercel 提供的 URL
- `RAILWAY_PUBLIC_DOMAIN` - 如果使用 Railway
- `RENDER_EXTERNAL_URL` - 如果使用 Render

## 🗄️ 數據庫配置

### SQLite 數據庫

TinyLink 使用 SQLite 作為數據庫，部署時會自動創建：

```bash
# 數據庫文件位置
./data/shorturls.db

# 數據庫表結構
CREATE TABLE short_urls (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  short_code TEXT UNIQUE NOT NULL,
  original_url TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  expires_at DATETIME,
  click_count INTEGER DEFAULT 0,
  title TEXT,
  description TEXT
);
```

### 數據持久化

⚠️ **重要**: Vercel 的免費計劃不支援持久化存儲，每次部署都會重置數據庫。

**解決方案**:
1. 升級到 Pro 計劃
2. 使用外部數據庫服務 (如 PlanetScale, Supabase)
3. 使用 Vercel KV 或 Vercel Postgres

## 📁 項目結構

```
tinylink/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── shorten/route.ts
│   │   │   ├── [code]/route.ts
│   │   │   ├── history/route.ts
│   │   │   ├── delete/[code]/route.ts
│   │   │   ├── delete-all/route.ts
│   │   │   └── preview/route.ts
│   │   ├── batch/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── history/page.tsx
│   │   ├── privacy/page.tsx
│   │   ├── terms/page.tsx
│   │   ├── [code]/page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── UrlForm.tsx
│   │   ├── UrlResult.tsx
│   │   └── BatchUrlForm.tsx
│   └── lib/
│       ├── database.ts
│       ├── shortcode.ts
│       ├── validation.ts
│       └── url.ts
├── public/
│   ├── favicon.ico
│   ├── logo1.png
│   └── ... (其他圖標)
├── package.json
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

## 🔧 構建配置

### package.json 腳本

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

### next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['sqlite3'],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('sqlite3');
    }
    return config;
  },
};

module.exports = nextConfig;
```

## 🌐 域名配置

### 自定義域名

1. 在 Vercel 項目設置中點擊 "Domains"
2. 添加您的域名
3. 配置 DNS 記錄：
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   
   Type: A
   Name: @
   Value: 76.76.19.61
   ```

### SSL 證書

Vercel 自動提供免費的 SSL 證書，無需額外配置。

## 📊 監控和分析

### Vercel Analytics

1. 在項目設置中啟用 Analytics
2. 查看訪問統計和性能指標

### 錯誤監控

```javascript
// 可以集成 Sentry 或其他錯誤監控服務
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
});
```

## 🔄 自動部署

### GitHub 集成

1. 連接 GitHub 倉庫
2. 每次推送到主分支會自動觸發部署
3. 支持預覽部署 (Pull Request)

### 部署預設

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

## 🛠️ 故障排除

### 常見問題

#### 1. 構建失敗

```bash
# 檢查 Node.js 版本
node --version  # 應該 >= 18.0.0

# 清理依賴
rm -rf node_modules package-lock.json
npm install
```

#### 2. 數據庫問題

```bash
# 確保 data 目錄存在
mkdir -p data
```

#### 3. 環境變數未生效

- 檢查變數名稱是否正確
- 確保已重新部署
- 檢查 Vercel 控制台的環境變數設置

#### 4. 重定向不工作

檢查 `src/lib/url.ts` 中的域名配置：

```typescript
export function generateShortUrl(shortCode: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                  process.env.VERCEL_URL || 
                  'http://localhost:3000';
  
  return `${baseUrl}/${shortCode}`;
}
```

## 📈 性能優化

### 圖片優化

```javascript
// next.config.js
const nextConfig = {
  images: {
    domains: ['your-domain.com'],
    formats: ['image/webp', 'image/avif'],
  },
};
```

### 緩存策略

```javascript
// API 路由緩存
export async function GET() {
  return new Response(data, {
    headers: {
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
```

## 🔐 安全配置

### 安全標頭

```javascript
// next.config.js
const nextConfig = {
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
        ],
      },
    ];
  },
};
```

### 環境變數安全

- 不要在代碼中硬編碼敏感信息
- 使用 Vercel 的環境變數管理
- 定期輪換 API 密鑰

## 📝 部署檢查清單

- [ ] 代碼已推送到 GitHub
- [ ] 環境變數已配置
- [ ] 自定義域名已設置 (可選)
- [ ] SSL 證書已生效
- [ ] 數據庫初始化正常
- [ ] API 路由測試通過
- [ ] 前端頁面正常加載
- [ ] 重定向功能正常
- [ ] 錯誤監控已配置 (可選)
- [ ] Analytics 已啟用 (可選)

## 🆘 獲取幫助

- [Vercel 文檔](https://vercel.com/docs)
- [Next.js 部署指南](https://nextjs.org/docs/deployment)
- [項目 Issues](https://github.com/your-username/tinylink/issues)

---

## 📞 聯繫支持

如有部署問題，請通過以下方式聯繫：

- 郵件: tyouxipindao@gmail.com
- 項目 Issues: [GitHub Issues](https://github.com/your-username/tinylink/issues)

---

**祝您部署順利！** 🚀

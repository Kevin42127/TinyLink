# 🚀 部署指南 - URL 短網址生成器

## 📋 環境變量配置

### 本地開發
```bash
# 創建 .env.local 文件
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 生產環境部署

#### 1. Vercel 部署
```bash
# 環境變量設置
NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app
```

**自動檢測**: 如果不設置環境變量，系統會自動使用 `VERCEL_URL` 環境變量。

#### 2. Railway 部署
```bash
# 環境變量設置
NEXT_PUBLIC_BASE_URL=https://your-app.railway.app
```

#### 3. Render 部署
```bash
# 環境變量設置
NEXT_PUBLIC_BASE_URL=https://your-app.onrender.com
```

#### 4. 自定義域名部署
```bash
# 環境變量設置
NEXT_PUBLIC_BASE_URL=https://your-custom-domain.com
```

## 🔄 短網址 URL 行為

### ✅ 智能 URL 生成
系統會根據部署環境自動生成正確的短網址：

1. **優先級順序**:
   - 環境變量 `NEXT_PUBLIC_BASE_URL`
   - Vercel: `VERCEL_URL`
   - Railway: `RAILWAY_PUBLIC_DOMAIN`
   - Render: `RENDER_EXTERNAL_URL`
   - 默認: `http://localhost:3000`

2. **示例**:
   ```javascript
   // 本地開發
   http://localhost:3000/abc123
   
   // Vercel 部署
   https://my-app.vercel.app/abc123
   
   // 自定義域名
   https://short.ly/abc123
   ```

### 📊 數據庫兼容性
- **短碼不變**: 無論部署到哪裡，短碼（如 `abc123`）保持不變
- **完整 URL 會變**: 只有基礎 URL 部分會根據部署環境改變
- **數據庫無需遷移**: 所有短網址數據在部署後仍然有效

## 🛠️ 部署步驟

### Vercel 部署
```bash
# 1. 推送代碼到 GitHub
git add .
git commit -m "Deploy URL shortener"
git push origin main

# 2. 在 Vercel 中導入項目
# 3. 設置環境變量（可選）
NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app

# 4. 部署完成
```

### Docker 部署
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
ENV NEXT_PUBLIC_BASE_URL=https://your-domain.com
CMD ["npm", "start"]
```

## 🔧 自定義域名設置

### 1. 購買域名
- 推薦: Cloudflare, Namecheap, GoDaddy

### 2. 配置 DNS
```
# A 記錄指向部署平台 IP
@ -> 部署平台 IP

# CNAME 記錄（推薦）
www -> your-app.vercel.app
```

### 3. 設置環境變量
```bash
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

## 📈 性能優化

### 1. CDN 配置
```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['your-domain.com'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
```

### 2. 數據庫優化
- 使用 PostgreSQL（生產環境）
- 設置適當的索引
- 定期清理過期短網址

## 🔒 安全配置

### 1. HTTPS 強制
```javascript
// next.config.js
module.exports = {
  async redirects() {
    return [
      {
        source: '/(.*)',
        has: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http',
          },
        ],
        destination: 'https://your-domain.com/$1',
        permanent: true,
      },
    ];
  },
};
```

### 2. 環境變量安全
```bash
# 生產環境
NODE_ENV=production
NEXT_PUBLIC_BASE_URL=https://your-domain.com

# 不要暴露敏感信息
# ❌ 不要設置
DATABASE_PASSWORD=secret
API_SECRET=secret
```

## 📊 監控和分析

### 1. Vercel Analytics
```bash
npm install @vercel/analytics
```

### 2. 自定義分析
```javascript
// 添加點擊追蹤
export function trackClick(shortCode, referrer) {
  // 發送到分析服務
  analytics.track('short_url_clicked', {
    shortCode,
    referrer,
    timestamp: new Date().toISOString(),
  });
}
```

## 🚨 故障排除

### 常見問題

1. **短網址不工作**
   - 檢查環境變量設置
   - 確認域名配置正確
   - 檢查 DNS 傳播

2. **重定向失敗**
   - 檢查數據庫連接
   - 確認短碼存在
   - 檢查過期時間

3. **統計不準確**
   - 檢查點擊追蹤代碼
   - 確認數據庫更新正常
   - 檢查時區設置

### 調試命令
```bash
# 檢查環境變量
echo $NEXT_PUBLIC_BASE_URL

# 測試 API
curl https://your-domain.com/api/shorten \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com"}'

# 檢查數據庫
# 查看 short_urls 表數據
```

## 📞 支援

如果遇到問題，請檢查：
1. 環境變量配置
2. 域名 DNS 設置
3. 部署平台狀態
4. 數據庫連接

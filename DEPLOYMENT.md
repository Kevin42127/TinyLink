# 部署指南

## 🚀 快速部署

### 1. 本地開發

```bash
# 安裝依賴
npm install

# 啟動開發服務器
npm run dev

# 訪問 http://localhost:3000
```

### 2. Vercel 部署

1. 將代碼推送到 GitHub
2. 在 [Vercel](https://vercel.com) 中導入項目
3. 設置環境變量：
   - `NEXT_PUBLIC_BASE_URL`: 你的域名 (例如: https://your-domain.com)
4. 點擊部署

### 3. Docker 部署

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
# 構建 Docker 鏡像
docker build -t url-shortener .

# 運行容器
docker run -p 3000:3000 -e NEXT_PUBLIC_BASE_URL=http://localhost:3000 url-shortener
```

## 📋 環境變量

| 變量名 | 描述 | 默認值 |
|--------|------|--------|
| `NEXT_PUBLIC_BASE_URL` | 應用基礎 URL | `http://localhost:3000` |

## 🔧 數據庫

- **開發環境**: SQLite (自動創建 `data/shorturls.db`)
- **生產環境**: 可以替換為 PostgreSQL、MySQL 等

### 替換為 PostgreSQL

1. 安裝 `pg` 包：
```bash
npm install pg @types/pg
```

2. 修改 `src/lib/database.ts` 使用 PostgreSQL 連接

## 📊 性能優化

- 使用 Next.js 的 SSR/SSG
- 數據庫索引優化
- 圖片和靜態資源優化
- CDN 加速

## 🔒 安全配置

- 設置 CORS 策略
- 添加速率限制
- 配置 HTTPS
- 定期備份數據庫

## 📈 監控

- 使用 Vercel Analytics
- 添加錯誤追蹤 (Sentry)
- 性能監控
- 數據庫查詢監控

# TinyLink

一個現代化的、功能豐富的 URL 短網址生成服務，使用 Next.js、React、TypeScript、Tailwind CSS 和 Framer Motion 構建。

## ✨ 功能特點

- 🚀 **快速生成** - 一鍵生成短網址，支持自定義短碼
- 🎨 **現代化 UI** - 美觀的用戶界面，流暢的動畫效果
- 🔒 **安全可靠** - URL 驗證、黑名單過濾、過期機制
- 📱 **響應式設計** - 完美適配桌面和移動設備
- ⚡ **高性能** - 基於 SQLite 的輕量級數據庫

## 🛠️ 技術棧

- **前端**: Next.js 14, React 18, TypeScript
- **樣式**: Tailwind CSS
- **動畫**: Framer Motion
- **數據庫**: SQLite (better-sqlite3)
- **圖標**: Lucide React
- **驗證**: Zod

## 🚀 快速開始

### 安裝依賴

```bash
npm install
```

### 環境配置

創建 `.env.local` 文件：

```env
# 本地開發
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# 生產環境示例
# NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

**注意**: 如果不設置環境變量，系統會自動檢測部署平台並生成正確的短網址 URL。

### 啟動開發服務器

```bash
npm run dev
```

打開 [http://localhost:3000](http://localhost:3000) 查看應用。

## 📁 項目結構

```
src/
├── app/
│   ├── api/
│   │   ├── shorten/route.ts      # 短網址生成 API
│   │   └── [code]/route.ts       # 重定向 API
│   ├── [code]/page.tsx           # 重定向頁面
│   ├── globals.css               # 全局樣式
│   ├── layout.tsx                # 根布局
│   └── page.tsx                  # 首頁
├── components/
│   ├── UrlForm.tsx               # URL 輸入表單
│   └── UrlResult.tsx             # 結果顯示組件
└── lib/
    ├── database.ts               # 數據庫配置
    ├── shortcode.ts              # 短碼生成邏輯
    └── validation.ts             # 數據驗證
```

## 🔧 API 接口

### 生成短網址

```http
POST /api/shorten
Content-Type: application/json

{
  "url": "https://example.com/very-long-url",
  "customCode": "my-code",  // 可選
  "expiresIn": 30,          // 可選，天數
  "title": "標題",          // 可選
  "description": "描述"     // 可選
}
```

### 重定向

```http
GET /api/{code}
```

## 🎨 功能展示

### 主要功能
- ✅ URL 輸入和驗證
- ✅ 自定義短碼
- ✅ 過期時間設置
- ✅ 標題和描述
- ✅ 一鍵複製

### 安全特性
- ✅ URL 格式驗證
- ✅ 危險域名過濾
- ✅ 短碼格式檢查
- ✅ 過期機制
- ✅ 速率限制

## 📊 數據庫結構

```sql
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

## 🚀 部署

### 智能 URL 處理

系統會根據部署環境自動生成正確的短網址：

- **本地開發**: `http://localhost:3000/abc123`
- **Vercel 部署**: `https://your-app.vercel.app/abc123`
- **自定義域名**: `https://your-domain.com/abc123`

### Vercel 部署

1. 將代碼推送到 GitHub
2. 在 Vercel 中導入項目
3. 設置環境變量（可選）：
   ```env
   NEXT_PUBLIC_BASE_URL=https://your-domain.com
   ```
4. 部署完成

**自動檢測**: 如果不設置環境變量，系統會自動使用 Vercel 提供的 `VERCEL_URL`。

### Docker 部署

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

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

## 📄 許可證

MIT License

## 🙏 致謝

感謝所有開源項目的貢獻者！

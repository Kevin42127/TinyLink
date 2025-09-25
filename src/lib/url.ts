/**
 * 獲取應用的基礎 URL
 * 支持自動檢測運行環境
 */
export function getBaseUrl(): string {
  // 優先使用環境變量
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }

  // 服務端渲染時使用環境變量或默認值
  if (typeof window === 'undefined') {
    // 生產環境檢測
    if (process.env.NODE_ENV === 'production') {
      // 嘗試從 Vercel 環境變量獲取
      if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`;
      }
      // 嘗試從其他平台環境變量獲取
      if (process.env.RAILWAY_PUBLIC_DOMAIN) {
        return `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`;
      }
      if (process.env.RENDER_EXTERNAL_URL) {
        return process.env.RENDER_EXTERNAL_URL;
      }
      // 如果都沒有，返回 localhost（開發環境）
      return 'http://localhost:3000';
    }
    // 開發環境
    return 'http://localhost:3000';
  }

  // 客戶端渲染時使用當前頁面的 origin
  return window.location.origin;
}

/**
 * 生成完整的短網址 URL
 */
export function generateShortUrl(shortCode: string): string {
  const baseUrl = getBaseUrl();
  return `${baseUrl}/${shortCode}`;
}

/**
 * 驗證 URL 是否為有效的短網址格式
 */
export function isValidShortUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    
    // 檢查路徑是否為短碼格式（4-10位字母數字）
    const shortCodePattern = /^\/[a-zA-Z0-9]{4,10}$/;
    return shortCodePattern.test(pathname);
  } catch {
    return false;
  }
}

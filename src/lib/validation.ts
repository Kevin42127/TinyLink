import { z } from 'zod';

// URL 驗證 schema
export const urlSchema = z.string().url('請輸入有效的 URL');

// 短網址創建 schema
export const createShortUrlSchema = z.object({
  url: urlSchema,
  customCode: z.string().optional().refine(
    (code) => {
      if (!code) return true;
      return /^[0-9a-zA-Z]{4,10}$/.test(code);
    },
    { message: '自定義短碼必須是 4-10 位的字母數字組合' }
  ),
  expiresIn: z.number().optional().refine(
    (days) => {
      if (!days) return true;
      return days > 0 && days <= 365;
    },
    { message: '過期時間必須在 1-365 天之間' }
  ),
  title: z.string().optional(),
  description: z.string().optional()
});

// 危險域名黑名單
const dangerousDomains = [
  'malware.com',
  'phishing-site.com',
  'suspicious-domain.com'
];

export function validateUrl(url: string): { isValid: boolean; error?: string } {
  try {
    const parsedUrl = new URL(url);
    
    // 檢查協議
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return { isValid: false, error: '只支持 HTTP 和 HTTPS 協議' };
    }
    
    // 檢查域名長度
    if (parsedUrl.hostname.length > 253) {
      return { isValid: false, error: '域名過長' };
    }
    
    // 檢查是否在黑名單中
    const hostname = parsedUrl.hostname.toLowerCase();
    if (dangerousDomains.some(domain => hostname.includes(domain))) {
      return { isValid: false, error: '該域名被列入黑名單' };
    }
    
    return { isValid: true };
  } catch {
    return { isValid: false, error: '無效的 URL 格式' };
  }
}

export function sanitizeUrl(url: string): string {
  try {
    const parsedUrl = new URL(url);
    // 移除不必要的參數
    parsedUrl.search = '';
    return parsedUrl.toString();
  } catch {
    return url;
  }
}

export function getDomainFromUrl(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return '';
  }
}

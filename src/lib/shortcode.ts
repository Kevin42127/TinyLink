import { customAlphabet } from 'nanoid';

// 使用 Base62 字符集 (0-9, a-z, A-Z)
const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const generateShortCode = customAlphabet(alphabet, 6);

export function createShortCode(): string {
  return generateShortCode();
}

export function validateShortCode(code: string): boolean {
  // 檢查長度 (4-10 字符)
  if (code.length < 4 || code.length > 10) {
    return false;
  }
  
  // 檢查是否只包含允許的字符
  const validChars = /^[0-9a-zA-Z]+$/;
  return validChars.test(code);
}

export function generateCustomCode(url: string, length: number = 6): string {
  // 基於URL生成更可預測的短碼
  let hash = 0;
  for (let i = 0; i < url.length; i++) {
    const char = url.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // 轉換為32位整數
  }
  
  // 將哈希轉換為 Base62
  let result = '';
  const absHash = Math.abs(hash);
  
  for (let i = 0; i < length; i++) {
    result = alphabet[absHash % alphabet.length] + result;
    hash = Math.floor(absHash / alphabet.length);
  }
  
  return result;
}

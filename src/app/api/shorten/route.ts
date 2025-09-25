import { NextRequest, NextResponse } from 'next/server';
import { createShortCode, validateShortCode } from '@/lib/shortcode';
import { validateUrl, sanitizeUrl, createShortUrlSchema } from '@/lib/validation';
import { getDatabase } from '@/lib/database-selector';
import { generateShortUrl } from '@/lib/url';

export const dynamic = 'force-dynamic'; // 強制動態渲染

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 驗證輸入數據
    const validationResult = createShortUrlSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: '輸入數據無效', details: validationResult.error.errors },
        { status: 400 }
      );
    }

    const { url, customCode, expiresIn, title, description } = validationResult.data;

    // 進一步驗證 URL
    const urlValidation = validateUrl(url);
    if (!urlValidation.isValid) {
      return NextResponse.json(
        { error: urlValidation.error },
        { status: 400 }
      );
    }

    // 清理 URL
    const cleanUrl = sanitizeUrl(url);

    // 獲取數據庫實例
    const dbQueries = await getDatabase();

    // 確定短碼
    let shortCode: string;
    
    if (customCode) {
      // 檢查自定義短碼是否已存在
      const existing = await dbQueries.checkCodeExists(customCode);
      if (existing) {
        return NextResponse.json(
          { error: '該自定義短碼已被使用' },
          { status: 409 }
        );
      }
      
      if (!validateShortCode(customCode)) {
        return NextResponse.json(
          { error: '自定義短碼格式無效' },
          { status: 400 }
        );
      }
      
      shortCode = customCode;
    } else {
      // 生成隨機短碼
      let attempts = 0;
      do {
        shortCode = createShortCode();
        attempts++;
      } while (await dbQueries.checkCodeExists(shortCode) && attempts < 10);
      
      if (attempts >= 10) {
        return NextResponse.json(
          { error: '無法生成唯一短碼，請稍後重試' },
          { status: 500 }
        );
      }
    }

    // 計算過期時間
    let expiresAt: string | null = null;
    if (expiresIn) {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + expiresIn);
      // 使用 UTC 時間並格式化為 SQLite 兼容的格式
      expiresAt = expirationDate.toISOString().replace('T', ' ').replace('Z', '');
    }

    // 存儲數據到數據庫
    try {
      await dbQueries.insertShortUrl(
        shortCode,
        cleanUrl,
        expiresAt,
        title || null,
        description || null
      );
    } catch (error) {
      console.error('數據庫插入錯誤:', error);
      return NextResponse.json(
        { error: '創建短網址失敗' },
        { status: 500 }
      );
    }

    // 返回結果
    const shortUrl = generateShortUrl(shortCode);

    return NextResponse.json({
      success: true,
      data: {
        shortUrl,
        originalUrl: cleanUrl,
        shortCode,
        expiresAt,
        title,
        description
      }
    });

  } catch (error) {
    console.error('API 錯誤:', error);
    return NextResponse.json(
      { error: '服務器內部錯誤' },
      { status: 500 }
    );
  }
}

// 處理 OPTIONS 請求 (CORS)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

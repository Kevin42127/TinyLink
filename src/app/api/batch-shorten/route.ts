import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sanitizeUrl, validateUrl } from '@/lib/validation';
import { createShortCode, validateShortCode } from '@/lib/shortcode';
import { dbQueries } from '@/lib/database';
import { generateShortUrl } from '@/lib/url';

// 批量短網址 schema
const batchShortenSchema = z.object({
  urls: z.array(z.object({
    url: z.string().min(1, 'URL 不能為空'),
    customCode: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
  })).min(1, '至少需要一個 URL').max(10, '最多只能批量處理 10 個 URL'),
  expiresIn: z.number().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { urls, expiresIn } = batchShortenSchema.parse(body);

    const results = [];
    const errors = [];

    // 計算過期時間
    let expiresAt: string | null = null;
    if (expiresIn) {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + expiresIn);
      expiresAt = expirationDate.toISOString().replace('T', ' ').replace('Z', '');
    }

    for (let i = 0; i < urls.length; i++) {
      const { url, customCode, title, description } = urls[i];
      
      try {
        // 清理和驗證 URL
        const cleanUrl = sanitizeUrl(url);
        if (!validateUrl(cleanUrl)) {
          errors.push({
            index: i,
            url: url,
            error: '無效的 URL 格式'
          });
          continue;
        }

        // 確定短碼
        let shortCode: string;

        if (customCode) {
          // 檢查自定義短碼是否已存在
          const existing = await dbQueries.checkCodeExists(customCode);
          if (existing) {
            errors.push({
              index: i,
              url: url,
              error: '該自定義短碼已被使用'
            });
            continue;
          }

          if (!validateShortCode(customCode)) {
            errors.push({
              index: i,
              url: url,
              error: '自定義短碼格式無效'
            });
            continue;
          }

          shortCode = customCode;
        } else {
          // 生成隨機短碼
          let attempts = 0;
          do {
            shortCode = createShortCode();
            attempts++;
          } while ((await dbQueries.checkCodeExists(shortCode)) && attempts < 10);

          if (attempts >= 10) {
            errors.push({
              index: i,
              url: url,
              error: '無法生成唯一短碼'
            });
            continue;
          }
        }

        // 存儲到數據庫
        try {
          await dbQueries.insertShortUrl(
            shortCode,
            cleanUrl,
            expiresAt,
            title || null,
            description || null
          );
        } catch (error) {
          errors.push({
            index: i,
            url: url,
            error: '數據庫插入失敗'
          });
          continue;
        }

        // 添加到結果
        results.push({
          index: i,
          originalUrl: cleanUrl,
          shortUrl: generateShortUrl(shortCode),
          shortCode,
          title: title || null,
          description: description || null,
        });

      } catch (error) {
        errors.push({
          index: i,
          url: url,
          error: '處理失敗'
        });
      }
    }

    return NextResponse.json({
      success: true,
      results,
      errors,
      summary: {
        total: urls.length,
        success: results.length,
        failed: errors.length
      }
    });

  } catch (error) {
    console.error('批量短網址生成錯誤:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: '請求數據驗證失敗',
        details: error.errors
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      error: '批量生成失敗'
    }, { status: 500 });
  }
}

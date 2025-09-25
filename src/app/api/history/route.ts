import { NextRequest, NextResponse } from 'next/server';
import { dbQueries } from '@/lib/database';
import { generateShortUrl } from '@/lib/url';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    // 驗證參數
    if (limit > 100) {
      return NextResponse.json(
        { error: '一次最多只能獲取 100 條記錄' },
        { status: 400 }
      );
    }

    // 獲取最近的短網址記錄
    const history = await dbQueries.getRecentUrls(limit, offset);

    // 格式化數據，添加短網址
    const formattedHistory = history.map((item: any) => ({
      shortCode: item.short_code,
      shortUrl: generateShortUrl(item.short_code),
      originalUrl: item.original_url,
      title: item.title,
      description: item.description,
      createdAt: item.created_at,
      expiresAt: item.expires_at,
      clickCount: item.click_count || 0,
    }));

    // 獲取總數
    const totalCount = await dbQueries.getTotalUrlCount();

    return NextResponse.json({
      success: true,
      data: {
        history: formattedHistory,
        pagination: {
          limit,
          offset,
          total: totalCount,
          hasMore: offset + limit < totalCount,
        },
      },
    });

  } catch (error) {
    console.error('獲取歷史記錄錯誤:', error);
    return NextResponse.json(
      { error: '服務器內部錯誤' },
      { status: 500 }
    );
  }
}

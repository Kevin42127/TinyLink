import { NextRequest, NextResponse } from 'next/server';
import { dbQueries } from '@/lib/database';
import { generateShortUrl } from '@/lib/url';

export const dynamic = 'force-dynamic'; // 強制動態渲染

export async function GET(request: NextRequest) {
  try {
    console.log('History API called');
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');
    
    console.log('Parameters:', { limit, offset });

    // 驗證參數
    if (limit > 100) {
      return NextResponse.json(
        { error: '一次最多只能獲取 100 條記錄' },
        { status: 400 }
      );
    }

    // 獲取最近的短網址記錄
    console.log('Fetching history from database...');
    const history = await dbQueries.getRecentUrls(limit, offset);
    console.log('History fetched:', history.length, 'items');

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
    console.log('Fetching total count...');
    const totalCount = await dbQueries.getTotalUrlCount();
    console.log('Total count:', totalCount);

    const response = {
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
    };
    
    console.log('Returning response:', response);
    return NextResponse.json(response);

  } catch (error) {
    console.error('獲取歷史記錄錯誤:', error);
    return NextResponse.json(
      { error: '服務器內部錯誤' },
      { status: 500 }
    );
  }
}

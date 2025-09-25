import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
      return NextResponse.json({ error: 'URL 參數缺失' }, { status: 400 });
    }

    // 驗證 URL 格式
    try {
      new URL(url);
    } catch {
      return NextResponse.json({ error: '無效的 URL 格式' }, { status: 400 });
    }

    // 發送 HEAD 請求檢查 URL 是否可訪問
    const response = await fetch(url, {
      method: 'HEAD',
      headers: {
        'User-Agent': 'TinyLink Preview Bot 1.0',
      },
      signal: AbortSignal.timeout(5000), // 5秒超時
    });

    if (response.ok) {
      return NextResponse.json({
        success: true,
        status: response.status,
        contentType: response.headers.get('content-type'),
        title: response.headers.get('x-title') || '網站預覽',
      });
    } else {
      return NextResponse.json({
        success: false,
        status: response.status,
      }, { status: response.status });
    }

  } catch (error) {
    console.error('URL 預覽檢查失敗:', error);
    return NextResponse.json({
      success: false,
      error: '無法檢查 URL 狀態'
    }, { status: 500 });
  }
}

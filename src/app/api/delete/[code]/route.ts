import { NextRequest, NextResponse } from 'next/server';
import { dbQueries } from '@/lib/database';
import { validateShortCode } from '@/lib/shortcode';

export const dynamic = 'force-dynamic'; // 強制動態渲染

export async function DELETE(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const { code } = params;

    // 驗證短碼格式
    if (!validateShortCode(code)) {
      return NextResponse.json(
        { error: '無效的短碼格式' },
        { status: 400 }
      );
    }

    // 檢查短碼是否存在
    const urlData = await dbQueries.getUrlByCode(code);
    
    if (!urlData) {
      return NextResponse.json(
        { error: '短網址不存在' },
        { status: 404 }
      );
    }

    // 刪除短網址
    await dbQueries.deleteUrl(code);

    return NextResponse.json({
      success: true,
      message: '短網址已成功刪除',
    });

  } catch (error) {
    console.error('刪除短網址錯誤:', error);
    return NextResponse.json(
      { error: '服務器內部錯誤' },
      { status: 500 }
    );
  }
}

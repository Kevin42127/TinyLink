import { NextRequest, NextResponse } from 'next/server';
import { dbQueries } from '@/lib/database';

export async function DELETE(request: NextRequest) {
  try {
    // 獲取刪除前的總數
    const totalCount = await dbQueries.getTotalUrlCount();
    
    if (totalCount === 0) {
      return NextResponse.json({
        success: true,
        message: '沒有可刪除的記錄',
        deletedCount: 0,
      });
    }

    // 刪除所有短網址
    await dbQueries.deleteAllUrls();

    return NextResponse.json({
      success: true,
      message: `成功刪除 ${totalCount} 條記錄`,
      deletedCount: totalCount,
    });

  } catch (error) {
    console.error('批量刪除錯誤:', error);
    return NextResponse.json(
      { error: '服務器內部錯誤' },
      { status: 500 }
    );
  }
}

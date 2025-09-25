import { NextRequest, NextResponse } from 'next/server';
import { dbQueries } from '@/lib/database';
import { validateShortCode } from '@/lib/shortcode';

export const dynamic = 'force-dynamic'; // 強制動態渲染

export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const { code } = params;

    // 驗證短碼格式
    if (!validateShortCode(code)) {
      return NextResponse.json(
        { error: '無效的短網址格式' },
        { status: 400 }
      );
    }

    // 查找短網址
    const urlData = await dbQueries.getUrlByCode(code) as any;
    
    if (!urlData) {
      return NextResponse.json(
        { error: '短網址不存在' },
        { status: 404 }
      );
    }

    // 檢查是否過期
    if (urlData.expires_at) {
      const now = new Date();
      const expirationDate = new Date(urlData.expires_at);
      
      if (now > expirationDate) {
        return NextResponse.json(
          { error: '短網址已過期' },
          { status: 410 }
        );
      }
    }

    // 增加點擊次數
    await dbQueries.incrementClickCount(code);

    // 檢查是否為移動設備
    const userAgent = request.headers.get('user-agent') || '';
    const isMobile = /Mobile|Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/.test(userAgent);
    
    // 對於移動設備，返回 HTML 頁面而不是重定向
    if (isMobile) {
      const html = `
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>正在跳轉...</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            background: white;
            border-radius: 12px;
            padding: 30px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            max-width: 400px;
            width: 100%;
        }
        .loading {
            width: 40px;
            height: 40px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #3498db;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .btn {
            display: inline-block;
            padding: 12px 24px;
            margin: 8px;
            background: #3498db;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            border: none;
            cursor: pointer;
            font-size: 16px;
        }
        .btn:hover {
            background: #2980b9;
        }
        .btn-secondary {
            background: #95a5a6;
        }
        .btn-secondary:hover {
            background: #7f8c8d;
        }
        .url {
            word-break: break-all;
            font-size: 14px;
            color: #666;
            margin: 15px 0;
            padding: 10px;
            background: #f8f9fa;
            border-radius: 6px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="loading"></div>
        <h2>正在跳轉...</h2>
        <div class="url">${urlData.original_url}</div>
        
        <button class="btn" onclick="redirect()">立即跳轉</button>
        <button class="btn btn-secondary" onclick="openNewTab()">新視窗打開</button>
        <button class="btn btn-secondary" onclick="copyUrl()">複製網址</button>
        
        <p style="margin-top: 20px; font-size: 14px; color: #666;">
            如果無法自動跳轉，請手動點擊按鈕
        </p>
    </div>

    <script>
        const targetUrl = "${urlData.original_url}";
        
        function redirect() {
            window.location.href = targetUrl;
        }
        
        function openNewTab() {
            window.open(targetUrl, '_blank');
        }
        
        function copyUrl() {
            if (navigator.clipboard) {
                navigator.clipboard.writeText(targetUrl).then(() => {
                    alert('已複製到剪貼板');
                });
            } else {
                // 降級方案
                const textArea = document.createElement('textarea');
                textArea.value = targetUrl;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                alert('已複製到剪貼板');
            }
        }
        
        // 自動跳轉
        setTimeout(() => {
            redirect();
        }, 2000);
    </script>
</body>
</html>`;
      
      return new NextResponse(html, {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      });
    }

    // 對於桌面設備，直接重定向
    return NextResponse.redirect(urlData.original_url, {
      status: 302,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'X-Robots-Tag': 'noindex, nofollow',
      },
    });

  } catch (error) {
    console.error('重定向錯誤:', error);
    return NextResponse.json(
      { error: '服務器內部錯誤' },
      { status: 500 }
    );
  }
}

// 處理 OPTIONS 請求
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

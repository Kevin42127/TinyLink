'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, ExternalLink, Calendar, Eye } from 'lucide-react';

interface UrlResultProps {
  data: {
    shortUrl: string;
    originalUrl: string;
    shortCode: string;
    expiresAt?: string;
    title?: string;
    description?: string;
  };
}

export default function UrlResult({ data }: UrlResultProps) {
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewError, setPreviewError] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(data.shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('複製失敗:', err);
    }
  };


  // URL 預覽功能
  const handlePreview = async () => {
    if (showPreview) {
      setShowPreview(false);
      return;
    }

    setPreviewLoading(true);
    setPreviewError(false);

    try {
      // 使用 meta-tags-scraper 或類似的服務來獲取網站預覽
      // 這裡使用一個簡單的方法：檢查 URL 是否可訪問
      const response = await fetch(`/api/preview?url=${encodeURIComponent(data.originalUrl)}`);
      
      if (response.ok) {
        setShowPreview(true);
      } else {
        setPreviewError(true);
      }
    } catch (error) {
      console.error('預覽失敗:', error);
      setPreviewError(true);
    } finally {
      setPreviewLoading(false);
    }
  };


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
      className="card p-8 max-w-2xl mx-auto mt-6"
    >
      <div className="text-center mb-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4"
        >
          <Check className="w-8 h-8 text-green-600" />
        </motion.div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          短網址生成成功！
        </h2>
        {data.title && (
          <p className="text-lg text-gray-700 font-medium">{data.title}</p>
        )}
        {data.description && (
          <p className="text-gray-600 mt-1">{data.description}</p>
        )}
      </div>

      {/* 短網址顯示 */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-700 mb-1">短網址</p>
            <p className="text-lg font-mono text-primary-600 break-all">
              {data.shortUrl}
            </p>
          </div>
                  <motion.button
                    onClick={copyToClipboard}
                    className="ml-4 flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                已複製
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                複製
              </>
            )}
          </motion.button>
        </div>
      </div>

      {/* 原鏈接 */}
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 mb-2">原始鏈接</p>
        <div className="flex items-center justify-between bg-white border rounded-lg p-3">
          <p className="text-gray-600 break-all flex-1 min-w-0 mr-3">
            {data.originalUrl}
          </p>
          <a
            href={data.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-primary-600 hover:text-primary-700 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* 過期時間 */}
      {data.expiresAt && (
        <div className="mb-6">
          <div className="flex items-center text-orange-600 bg-orange-50 rounded-lg p-3">
            <Calendar className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">
              將於 {formatDate(data.expiresAt)} 過期
            </span>
          </div>
        </div>
      )}


      {/* URL 預覽 */}
      <div className="mb-6">
        <div className="flex items-center justify-between bg-white border rounded-lg p-3">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-700 mb-1">URL 預覽</p>
            <p className="text-sm text-gray-600">
              {showPreview ? '點擊查看目標網站' : '點擊預覽目標網站'}
            </p>
          </div>
                  <motion.button
                    onClick={handlePreview}
                    disabled={previewLoading}
                    className="flex items-center px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors disabled:opacity-50"
                  >
            {previewLoading ? (
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2" />
            ) : (
              <Eye className="w-4 h-4 mr-2" />
            )}
            {previewLoading ? '檢查中...' : showPreview ? '隱藏預覽' : '預覽'}
          </motion.button>
        </div>
        
        {showPreview && !previewError && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-3 p-4 bg-green-50 border border-green-200 rounded-lg"
          >
            <p className="text-green-800 text-sm">
              ✅ 目標網站可正常訪問
            </p>
            <a
              href={data.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center mt-2 text-green-700 hover:text-green-800"
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              在新視窗中打開
            </a>
          </motion.div>
        )}

        {previewError && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-3 p-4 bg-red-50 border border-red-200 rounded-lg"
          >
            <p className="text-red-800 text-sm">
              ⚠️ 無法預覽目標網站，請手動檢查鏈接
            </p>
          </motion.div>
        )}
      </div>

      {/* 操作按鈕 */}
      <div className="flex justify-center">
        <motion.button
          onClick={() => window.open(data.shortUrl, '_blank')}
          className="btn-primary flex items-center justify-center py-3 px-6"
        >
          <ExternalLink className="w-5 h-5 mr-2" />
          測試短網址
        </motion.button>
      </div>
    </motion.div>
  );
}

'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Copy, Calendar, Clock, Eye, RefreshCw, ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface HistoryItem {
  shortCode: string;
  shortUrl: string;
  originalUrl: string;
  title?: string;
  description?: string;
  createdAt: string;
  expiresAt?: string;
  clickCount: number;
}

interface HistoryResponse {
  success: boolean;
  data: {
    history: HistoryItem[];
    pagination: {
      limit: number;
      offset: number;
      total: number;
      hasMore: boolean;
    };
  };
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    limit: 20,
    offset: 0,
    total: 0,
    hasMore: false,
  });
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [deletingItems, setDeletingItems] = useState<Set<string>>(new Set());
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = useState(false);
  const [bulkDeleting, setBulkDeleting] = useState(false);

  const fetchHistory = useCallback(async (offset = 0, append = false) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/history?limit=${pagination.limit}&offset=${offset}`);
      const data: HistoryResponse = await response.json();

      if (data.success) {
        if (append) {
          setHistory(prev => [...prev, ...data.data.history]);
        } else {
          setHistory(data.data.history);
        }
        setPagination(data.data.pagination);
      } else {
        setError('獲取歷史記錄失敗');
      }
    } catch (err) {
      console.error('獲取歷史記錄錯誤:', err);
      setError('網路錯誤，請稍後再試');
    } finally {
      setLoading(false);
    }
  }, [pagination.limit]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const loadMore = () => {
    if (pagination.hasMore && !loading) {
      fetchHistory(pagination.offset + pagination.limit, true);
    }
  };

  const refreshHistory = () => {
    fetchHistory();
  };

  const toggleExpanded = (shortCode: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(shortCode)) {
      newExpanded.delete(shortCode);
    } else {
      newExpanded.add(shortCode);
    }
    setExpandedItems(newExpanded);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // 可以在這裡添加 toast 提示
    } catch (err) {
      console.error('複製失敗:', err);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('zh-TW', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatRelativeTime = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return '剛剛';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} 分鐘前`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} 小時前`;
    return `${Math.floor(diffInSeconds / 86400)} 天前`;
  };

  const isExpired = (expiresAt?: string) => {
    if (!expiresAt) return false;
    return new Date() > new Date(expiresAt);
  };

  const deleteUrl = async (shortCode: string) => {
    try {
      setDeletingItems(prev => new Set([...prev, shortCode]));
      setShowDeleteConfirm(null);

      const response = await fetch(`/api/delete/${shortCode}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        // 從列表中移除已刪除的項目
        setHistory(prev => prev.filter(item => item.shortCode !== shortCode));
        setPagination(prev => ({
          ...prev,
          total: prev.total - 1,
        }));
      } else {
        setError(data.error || '刪除失敗');
      }
    } catch (err) {
      console.error('刪除錯誤:', err);
      setError('網路錯誤，刪除失敗');
    } finally {
      setDeletingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(shortCode);
        return newSet;
      });
    }
  };

  const confirmDelete = (shortCode: string) => {
    setShowDeleteConfirm(shortCode);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(null);
  };

  const deleteAllUrls = async () => {
    try {
      setBulkDeleting(true);
      setShowBulkDeleteConfirm(false);

      const response = await fetch('/api/delete-all', {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        // 清空歷史記錄列表
        setHistory([]);
        setPagination(prev => ({
          ...prev,
          total: 0,
          hasMore: false,
        }));
        // 可以在這裡添加成功提示
      } else {
        setError(data.error || '批量刪除失敗');
      }
    } catch (err) {
      console.error('批量刪除錯誤:', err);
      setError('網路錯誤，批量刪除失敗');
    } finally {
      setBulkDeleting(false);
    }
  };

  const confirmBulkDelete = () => {
    setShowBulkDeleteConfirm(true);
  };

  const cancelBulkDelete = () => {
    setShowBulkDeleteConfirm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          返回首頁
        </Link>

        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4"
          >
            <Clock className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            短網址歷史記錄
          </h1>
          <p className="text-gray-600">
            查看最近生成的短網址記錄
          </p>
        </div>

        {/* 操作欄 */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-gray-600">
            共 {pagination.total} 條記錄
          </div>
          <div className="flex items-center space-x-3">
            <motion.button
              onClick={confirmBulkDelete}
              disabled={bulkDeleting || pagination.total === 0}
              className="flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              刪除全部
            </motion.button>
            <motion.button
              onClick={refreshHistory}
              disabled={loading}
              className="flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              刷新
            </motion.button>
          </div>
        </div>

        {/* 錯誤提示 */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6"
          >
            {error}
          </motion.div>
        )}

        {/* 歷史記錄列表 */}
        <div className="space-y-4">
          {history.map((item, index) => (
            <motion.div
              key={item.shortCode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  {/* 標題和描述 */}
                  <div className="mb-3">
                    {item.title && (
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {item.title}
                      </h3>
                    )}
                    {item.description && (
                      <p className="text-gray-600 text-sm">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* 短網址 */}
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-700 mb-1">短網址</p>
                      <p className="font-mono text-blue-600 break-all">
                        {item.shortUrl}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <motion.button
                        onClick={() => copyToClipboard(item.shortUrl)}
                        className="flex items-center px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        onClick={() => confirmDelete(item.shortCode)}
                        disabled={deletingItems.has(item.shortCode)}
                        className="flex items-center px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>

                  {/* 原始網址 */}
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-700 mb-1">原始網址</p>
                    <div className="flex items-center space-x-3">
                      <p className="text-gray-600 break-all flex-1 min-w-0">
                        {item.originalUrl}
                      </p>
                      <a
                        href={item.originalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* 統計信息 */}
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {item.clickCount} 次點擊
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatRelativeTime(item.createdAt)}
                    </div>
                    {item.expiresAt && (
                      <div className={`flex items-center ${isExpired(item.expiresAt) ? 'text-red-500' : 'text-orange-500'}`}>
                        <Clock className="w-4 h-4 mr-1" />
                        {isExpired(item.expiresAt) ? '已過期' : formatRelativeTime(item.expiresAt) + ' 過期'}
                      </div>
                    )}
                  </div>
                </div>

                {/* 展開/收起按鈕 */}
                <motion.button
                  onClick={() => toggleExpanded(item.shortCode)}
                  className="ml-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {expandedItems.has(item.shortCode) ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </motion.button>
              </div>

              {/* 展開的詳細信息 */}
              {expandedItems.has(item.shortCode) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-4 border-t border-gray-200"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-gray-700 mb-1">創建時間</p>
                      <p className="text-gray-600">{formatDate(item.createdAt)}</p>
                    </div>
                    {item.expiresAt && (
                      <div>
                        <p className="font-medium text-gray-700 mb-1">過期時間</p>
                        <p className="text-gray-600">{formatDate(item.expiresAt)}</p>
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-gray-700 mb-1">短碼</p>
                      <p className="text-gray-600 font-mono">{item.shortCode}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-700 mb-1">狀態</p>
                      <p className={`${isExpired(item.expiresAt) ? 'text-red-600' : 'text-green-600'}`}>
                        {isExpired(item.expiresAt) ? '已過期' : '有效'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* 加載更多 */}
        {pagination.hasMore && (
          <div className="text-center mt-8">
            <motion.button
              onClick={loadMore}
              disabled={loading}
              className="btn-primary px-8 py-3 disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center">
                  <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                  加載中...
                </div>
              ) : (
                '加載更多'
              )}
            </motion.button>
          </div>
        )}

        {/* 空狀態 */}
        {!loading && history.length === 0 && (
          <div className="text-center py-12">
            <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">暫無歷史記錄</h3>
            <p className="text-gray-600 mb-6">開始創建你的第一個短網址吧！</p>
            <Link href="/" className="btn-primary">
              創建短網址
            </Link>
          </div>
        )}

        {/* 刪除確認對話框 */}
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={cancelDelete}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full"
            >
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-4">
                  <Trash2 className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  確認刪除
                </h3>
                <p className="text-gray-600 mb-6">
                  確定要刪除這個短網址嗎？此操作無法撤銷。
                </p>
                <div className="flex space-x-3">
                  <motion.button
                    onClick={cancelDelete}
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    取消
                  </motion.button>
                  <motion.button
                    onClick={() => deleteUrl(showDeleteConfirm)}
                    disabled={deletingItems.has(showDeleteConfirm)}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                  >
                    {deletingItems.has(showDeleteConfirm) ? (
                      <div className="flex items-center justify-center">
                        <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                        刪除中...
                      </div>
                    ) : (
                      '確認刪除'
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* 批量刪除確認對話框 */}
        {showBulkDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={cancelBulkDelete}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full"
            >
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-4">
                  <Trash2 className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  確認刪除所有記錄
                </h3>
                <p className="text-gray-600 mb-4">
                  確定要刪除所有 {pagination.total} 條歷史記錄嗎？
                </p>
                <p className="text-sm text-red-600 mb-6">
                  ⚠️ 此操作無法撤銷，所有短網址將永久失效！
                </p>
                <div className="flex space-x-3">
                  <motion.button
                    onClick={cancelBulkDelete}
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    取消
                  </motion.button>
                  <motion.button
                    onClick={deleteAllUrls}
                    disabled={bulkDeleting}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                  >
                    {bulkDeleting ? (
                      <div className="flex items-center justify-center">
                        <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                        刪除中...
                      </div>
                    ) : (
                      '確認刪除全部'
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

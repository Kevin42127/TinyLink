'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Upload, Download, Copy, Check, ExternalLink } from 'lucide-react';

interface BatchUrl {
  url: string;
  customCode?: string;
  title?: string;
  description?: string;
}

interface BatchResult {
  index: number;
  originalUrl: string;
  shortUrl: string;
  shortCode: string;
  title?: string;
  description?: string;
}

interface BatchError {
  index: number;
  url: string;
  error: string;
}

export default function BatchUrlForm() {
  const [urls, setUrls] = useState<BatchUrl[]>([
    { url: '', customCode: '', title: '', description: '' }
  ]);
  const [expiresIn, setExpiresIn] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [results, setResults] = useState<BatchResult[]>([]);
  const [errors, setErrors] = useState<BatchError[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const addUrl = () => {
    if (urls.length < 10) {
      setUrls([...urls, { url: '', customCode: '', title: '', description: '' }]);
    }
  };

  const removeUrl = (index: number) => {
    if (urls.length > 1) {
      setUrls(urls.filter((_, i) => i !== index));
    }
  };

  const updateUrl = (index: number, field: keyof BatchUrl, value: string) => {
    const newUrls = [...urls];
    newUrls[index] = { ...newUrls[index], [field]: value };
    setUrls(newUrls);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResults([]);
    setErrors([]);

    try {
      // 過濾掉空的 URL
      const validUrls = urls.filter(item => item.url.trim());
      
      if (validUrls.length === 0) {
        alert('請至少輸入一個有效的 URL');
        setIsSubmitting(false);
        return;
      }

      const response = await fetch('/api/batch-shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          urls: validUrls,
          expiresIn: expiresIn ? parseInt(expiresIn) : undefined,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setResults(result.results);
        setErrors(result.errors);
      } else {
        alert('批量生成失敗: ' + result.error);
      }
    } catch (error) {
      console.error('批量生成錯誤:', error);
      alert('批量生成失敗，請稍後再試');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('複製失敗:', err);
    }
  };

  const downloadResults = () => {
    const csvContent = [
      ['原始 URL', '短網址', '短碼', '標題', '描述'],
      ...results.map(result => [
        result.originalUrl,
        result.shortUrl,
        result.shortCode,
        result.title || '',
        result.description || ''
      ])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `tinylink-batch-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card p-8 max-w-4xl mx-auto"
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4"
        >
          <Upload className="w-8 h-8 text-white" />
        </motion.div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          批量生成短網址
        </h1>
        <p className="text-gray-600">
          一次最多可生成 10 個短網址
        </p>
      </div>

      {results.length === 0 ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* URL 列表 */}
          <div className="space-y-4">
            {urls.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-700">URL #{index + 1}</h3>
                  {urls.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeUrl(index)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      原始 URL *
                    </label>
                    <input
                      type="url"
                      value={item.url}
                      onChange={(e) => updateUrl(index, 'url', e.target.value)}
                      placeholder="https://example.com/very-long-url"
                      className="input-field"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      自定義短碼 (可選)
                    </label>
                    <input
                      type="text"
                      value={item.customCode}
                      onChange={(e) => updateUrl(index, 'customCode', e.target.value.replace(/[^a-zA-Z0-9]/g, ''))}
                      placeholder="my-custom-code"
                      className="input-field"
                      maxLength={10}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      標題 (可選)
                    </label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => updateUrl(index, 'title', e.target.value)}
                      placeholder="為這個鏈接添加標題"
                      className="input-field"
                      maxLength={100}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      描述 (可選)
                    </label>
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => updateUrl(index, 'description', e.target.value)}
                      placeholder="簡短描述"
                      className="input-field"
                      maxLength={200}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 添加 URL 按鈕 */}
          {urls.length < 10 && (
            <div className="flex justify-center">
              <motion.button
                type="button"
                onClick={addUrl}
                className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                添加 URL
              </motion.button>
            </div>
          )}

          {/* 過期時間 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              過期時間 (可選)
            </label>
            <select
              value={expiresIn}
              onChange={(e) => setExpiresIn(e.target.value)}
              className="input-field"
            >
              <option value="">永久</option>
              <option value="1">1 天後過期</option>
              <option value="7">7 天後過期</option>
              <option value="30">30 天後過期</option>
              <option value="90">90 天後過期</option>
              <option value="365">1 年後過期</option>
            </select>
          </div>

          {/* 提交按鈕 */}
          <motion.button
            type="submit"
            className="btn-primary w-full py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? '生成中...' : `生成 ${urls.filter(item => item.url.trim()).length} 個短網址`}
          </motion.button>
        </form>
      ) : (
        /* 結果顯示 */
        <div className="space-y-6">
          {/* 摘要 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">生成摘要</h3>
            <p className="text-blue-800">
              成功生成 {results.length} 個短網址
              {errors.length > 0 && `，${errors.length} 個失敗`}
            </p>
          </div>

          {/* 成功結果 */}
          {results.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">生成結果</h3>
                <motion.button
                  onClick={downloadResults}
                  className="flex items-center px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  下載 CSV
                </motion.button>
              </div>

              <div className="space-y-3">
                {results.map((result, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-green-50 border border-green-200 rounded-lg p-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-green-900 mb-1">短網址</p>
                        <p className="font-mono text-green-800 break-all">{result.shortUrl}</p>
                        {result.title && (
                          <p className="text-sm text-green-700 mt-1">{result.title}</p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <motion.button
                          onClick={() => copyToClipboard(result.shortUrl, index)}
                          className="flex items-center px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                        >
                          {copiedIndex === index ? (
                            <Check className="w-4 h-4 mr-2" />
                          ) : (
                            <Copy className="w-4 h-4 mr-2" />
                          )}
                          {copiedIndex === index ? '已複製' : '複製'}
                        </motion.button>
                        <motion.button
                          onClick={() => window.open(result.shortUrl, '_blank')}
                          className="flex items-center px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                    <p className="text-sm text-green-600 mt-2 break-all">
                      原始: {result.originalUrl}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* 錯誤結果 */}
          {errors.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-red-900 mb-4">處理失敗</h3>
              <div className="space-y-3">
                {errors.map((error, index) => (
                  <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-sm font-medium text-red-900">URL #{error.index + 1}</p>
                    <p className="text-sm text-red-800 break-all">{error.url}</p>
                    <p className="text-sm text-red-600 mt-1">錯誤: {error.error}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 重新生成按鈕 */}
          <div className="flex justify-center">
            <motion.button
              onClick={() => {
                setResults([]);
                setErrors([]);
                setUrls([{ url: '', customCode: '', title: '', description: '' }]);
              }}
              className="btn-primary px-6 py-3"
            >
              重新生成
            </motion.button>
          </div>
        </div>
      )}
    </motion.div>
  );
}

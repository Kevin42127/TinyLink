'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Link, Calendar, FileText, Sparkles } from 'lucide-react';
import Image from 'next/image';

interface UrlFormProps {
  onSuccess: (data: any) => void;
}

export default function UrlForm({ onSuccess }: UrlFormProps) {
  const [formData, setFormData] = useState({
    url: '',
    customCode: '',
    expiresIn: '',
    title: '',
    description: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const requestData: any = {
        url: formData.url
      };

      if (formData.customCode) {
        requestData.customCode = formData.customCode;
      }

      if (formData.expiresIn) {
        requestData.expiresIn = parseInt(formData.expiresIn);
      }

      if (formData.title) {
        requestData.title = formData.title;
      }

      if (formData.description) {
        requestData.description = formData.description;
      }

      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();

      if (result.success) {
        onSuccess(result.data);
        setFormData({
          url: '',
          customCode: '',
          expiresIn: '',
          title: '',
          description: ''
        });
      } else {
        setError(result.error || '創建短網址失敗');
      }
    } catch (err) {
      setError('網絡錯誤，請稍後重試');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card p-8 max-w-2xl mx-auto"
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
        >
          <Image 
            src="/logo1.png" 
            alt="TinyLink Logo" 
            width={64}
            height={64}
            className="rounded-full"
          />
        </motion.div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          TinyLink
        </h1>
        <p className="text-gray-600">
          簡潔、快速、私密的短網址服務
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* URL 輸入 */}
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
            原始 URL *
          </label>
          <div className="relative">
            <input
              type="url"
              id="url"
              value={formData.url}
              onChange={(e) => handleInputChange('url', e.target.value)}
              placeholder="https://example.com/very-long-url"
              className="input-field pl-12"
              required
            />
            <Link className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* 自定義短碼 */}
        <div>
          <label htmlFor="customCode" className="block text-sm font-medium text-gray-700 mb-2">
            自定義短碼 (可選)
          </label>
          <div className="relative">
            <input
              type="text"
              id="customCode"
              value={formData.customCode}
              onChange={(e) => handleInputChange('customCode', e.target.value.replace(/[^a-zA-Z0-9]/g, ''))}
              placeholder="my-custom-code"
              className="input-field pl-12"
              maxLength={10}
            />
            <Sparkles className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            4-10 位字母數字組合，留空則自動生成
          </p>
        </div>

        {/* 過期時間 */}
        <div className="mt-2">
          <label htmlFor="expiresIn" className="block text-sm font-medium text-gray-700 mb-2">
            過期時間 (可選)
          </label>
          <div className="relative">
            <select
              id="expiresIn"
              value={formData.expiresIn}
              onChange={(e) => handleInputChange('expiresIn', e.target.value)}
              className="input-field pl-12"
            >
              <option value="">永久</option>
              <option value="1">1 天後過期</option>
              <option value="7">7 天後過期</option>
              <option value="30">30 天後過期</option>
              <option value="90">90 天後過期</option>
              <option value="365">1 年後過期</option>
            </select>
            <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* 標題 */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            標題 (可選)
          </label>
          <div className="relative">
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="為這個鏈接添加標題"
              className="input-field pl-12"
              maxLength={100}
            />
            <FileText className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* 描述 */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            描述 (可選)
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="添加鏈接描述..."
            className="input-field pl-4 pt-3 resize-none"
            rows={3}
            maxLength={500}
          />
        </div>

        {/* 錯誤信息 */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
          >
            {error}
          </motion.div>
        )}

        {/* 提交按鈕 */}
        <motion.button
          type="submit"
          disabled={isLoading}
          className="w-full btn-primary py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              生成中...
            </div>
          ) : (
            '生成短網址'
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}

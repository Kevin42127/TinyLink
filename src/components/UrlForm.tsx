'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Link, Calendar, FileText, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { useI18n } from '@/i18n/I18nProvider';

interface UrlFormProps {
  onSuccess: (data: any) => void;
}

export default function UrlForm({ onSuccess }: UrlFormProps) {
  const { t } = useI18n();
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
        setError(result.error || t('form.error.createFailed'));
      }
    } catch (err) {
      setError(t('form.error.network'));
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
          {t('app.title')}
        </h1>
        <p className="text-gray-600">
          {t('app.tagline')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* URL 輸入 */}
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
            {t('form.url.label')}
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
            {t('form.customCode.label')}
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
            {t('form.customCode.hint')}
          </p>
        </div>

        {/* 過期時間 */}
        <div className="mt-2">
          <label htmlFor="expiresIn" className="block text-sm font-medium text-gray-700 mb-2">
            {t('form.expires.label')}
          </label>
          <div className="relative">
            <select
              id="expiresIn"
              value={formData.expiresIn}
              onChange={(e) => handleInputChange('expiresIn', e.target.value)}
              className="input-field pl-12"
            >
              <option value="">{t('form.expires.permanent')}</option>
              <option value="1">{t('form.expires.1d')}</option>
              <option value="7">{t('form.expires.7d')}</option>
              <option value="30">{t('form.expires.30d')}</option>
              <option value="90">{t('form.expires.90d')}</option>
              <option value="365">{t('form.expires.365d')}</option>
            </select>
            <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* 標題 */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            {t('form.title.label')}
          </label>
          <div className="relative">
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder={t('form.title.placeholder')}
              className="input-field pl-12"
              maxLength={100}
            />
            <FileText className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* 描述 */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            {t('form.description.label')}
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder={t('form.description.placeholder')}
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
              {t('form.submit.loading')}
            </div>
          ) : (
            t('form.submit')
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}

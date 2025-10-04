'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import UrlForm from '@/components/UrlForm';
import UrlResult from '@/components/UrlResult';
import { RefreshCw } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useI18n } from '@/i18n/I18nProvider';

export default function HomePage() {
  const [result, setResult] = useState(null);
  const { t } = useI18n();

  const handleSuccess = (data: any) => {
    setResult(data);
  };

  const resetForm = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen">
      {/* 導航欄 */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity duration-200"
              >
                <Image 
                  src="/logo1.png" 
                  alt="TinyLink Logo" 
                  width={32}
                  height={32}
                  className="rounded-lg"
                />
                <span className="text-xl font-bold text-gray-900">TinyLink</span>
              </motion.div>
            </Link>

            <div className="flex items-center space-x-4">
              <Link href="/batch">
                <button className="flex items-center px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <span className="text-sm font-medium">{t('nav.batch')}</span>
                </button>
              </Link>
              <Link href="/history">
                <button className="flex items-center px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                  <span className="text-sm font-medium">{t('nav.history')}</span>
                </button>
              </Link>
              <LanguageSwitcher />
              {result && (
                <motion.button
                  onClick={resetForm}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  {t('nav.new')}
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* 主內容 */}
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        {!result ? (
          <UrlForm onSuccess={handleSuccess} />
        ) : (
          <UrlResult data={result} />
        )}
      </main>

      {/* 頁腳 */}
      <footer className="bg-white/50 backdrop-blur-sm border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">©2025 TinyLink.</p>
            <div className="flex justify-center space-x-6 text-sm">
              <Link href="/privacy" className="hover:text-primary-600 transition-colors">
                {t('footer.privacy')}
              </Link>
              <Link href="/terms" className="hover:text-primary-600 transition-colors">
                {t('footer.terms')}
              </Link>
              <Link href="/contact" className="hover:text-primary-600 transition-colors">
                {t('footer.contact')}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

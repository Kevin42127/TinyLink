'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2, AlertCircle, ExternalLink } from 'lucide-react';

export default function RedirectPage() {
  const params = useParams();
  const [status, setStatus] = useState<'loading' | 'redirecting' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const code = params.code as string;
    
    if (!code) {
      setStatus('error');
      setErrorMessage('無效的短網址');
      return;
    }

    // 直接重定向到 API 路由
    window.location.href = `/api/${code}`;
  }, [params.code]);

  if (status === 'loading' || status === 'redirecting') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full mx-auto mb-6"
          />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            正在跳轉...
          </h2>
          <p className="text-gray-600">
            請稍候，即將為您跳轉到目標頁面
          </p>
        </motion.div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto px-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <AlertCircle className="w-10 h-10 text-red-600" />
          </motion.div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            短網址無效
          </h1>
          
          <p className="text-gray-600 mb-8">
            {errorMessage || '抱歉，找不到您要訪問的頁面。該短網址可能已過期或不存在。'}
          </p>
          
          <div className="space-y-4">
            <motion.a
              href="/"
              className="inline-flex items-center btn-primary px-6 py-3"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              返回首頁
            </motion.a>
            
            <div className="text-sm text-gray-500">
              <p>如果您認為這是個錯誤，請檢查鏈接是否正確</p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return null;
}

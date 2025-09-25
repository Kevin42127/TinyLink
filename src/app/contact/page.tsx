'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Mail, MessageSquare, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  const email = 'tyouxipindao@gmail.com';
  
  const handleEmailClick = () => {
    const subject = encodeURIComponent('TinyLink 聯繫');
    const body = encodeURIComponent(`您好，

我想聯繫關於 TinyLink 短網址服務的問題：

[請在此輸入您的問題或建議]

謝謝！`);
    
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          返回首頁
        </Link>

        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6"
          >
            <MessageSquare className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            聯繫 TinyLink
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            有任何問題或建議？我們很樂意聽到您的聲音。TinyLink 服務完全免費，無廣告，不收集個人信息。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:items-stretch">
          {/* 聯繫信息 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex"
          >
            <div className="bg-white rounded-xl shadow-lg p-8 w-full flex flex-col">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">聯繫方式</h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">電子郵件</h3>
                    <motion.button
                      onClick={handleEmailClick}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      發送郵件
                    </motion.button>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-lg">🆓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">服務特色</h3>
                    <p className="text-gray-600 mb-2">完全免費使用</p>
                    <p className="text-sm text-gray-500">無廣告、無註冊、保護隱私</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">回覆時間</h3>
                    <p className="text-gray-600 mb-2">我們會在 24 小時內回覆</p>
                    <p className="text-sm text-gray-500">工作日時間</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-blue-50 rounded-lg mt-auto">
                <h3 className="font-semibold text-blue-900 mb-2">💡 提示</h3>
                <p className="text-blue-800 text-sm">
                  點擊「發送郵件」按鈕會自動打開您的郵件應用程式，並預填主題和內容模板。
                </p>
              </div>
            </div>
          </motion.div>

          {/* 常見問題 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex"
          >
            <div className="bg-white rounded-xl shadow-lg p-8 w-full flex flex-col">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">常見問題</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">如何刪除我的短網址？</h3>
                  <p className="text-gray-600 text-sm">
                    您可以在「歷史記錄」頁面中刪除您的短網址。每條記錄都有刪除按鈕，您也可以使用「刪除全部」功能一次性清除所有記錄。刪除操作無法撤銷，請謹慎操作。
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">短網址會過期嗎？</h3>
                  <p className="text-gray-600 text-sm">
                    您可以設置過期時間，也可以選擇永久有效。過期的短網址會自動失效。
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">是否收費？</h3>
                  <p className="text-gray-600 text-sm">
                    <strong>完全免費！</strong>所有功能都免費使用，無需付費訂閱。
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">有使用限制嗎？</h3>
                  <p className="text-gray-600 text-sm">
                    沒有嚴格限制，但請合理使用。我們保留防止濫用的權利。
                  </p>
                </div>
              </div>

              <div className="mt-10 p-4 bg-green-50 rounded-lg mt-auto">
                <h3 className="font-semibold text-green-900 mb-2">🚀 立即開始</h3>
                <p className="text-green-800 text-sm mb-3">
                  開始使用 TinyLink 創建您的第一個短網址！
                </p>
                <Link 
                  href="/"
                  className="inline-flex items-center text-green-700 hover:text-green-800 font-medium"
                >
                  前往首頁
                  <ArrowLeft className="w-4 h-4 ml-1 rotate-180" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
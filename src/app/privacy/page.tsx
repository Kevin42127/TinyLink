'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Eye, Lock, Database, UserCheck } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* 導航 */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link 
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            返回首頁
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* 標題 */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6"
            >
              <Shield className="w-8 h-8 text-green-600" />
            </motion.div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              TinyLink 隱私政策
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              TinyLink 承諾保護您的隱私。本短網址服務不收集任何個人信息，不追蹤用戶行為，完全免費且無廣告。
            </p>
            <p className="text-sm text-gray-500 mt-4">
              最後更新：2025年9月
            </p>
          </div>

          {/* 內容 */}
          <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
            {/* 信息收集 */}
            <section>
              <div className="flex items-center mb-4">
                <Eye className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">信息收集</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>我們不收集任何個人信息。</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>URL 數據</strong>：僅存儲您提供的原始 URL 和生成的短網址</li>
                  <li><strong>不收集</strong>：IP 地址、瀏覽器信息、用戶身份等</li>
                  <li><strong>不追蹤</strong>：用戶行為、點擊數據、訪問時間等</li>
                  <li><strong>可選信息</strong>：標題和描述僅用於顯示，不會用於其他目的</li>
                </ul>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                  <p className="text-green-800 font-medium">
                    ✅ 我們不會收集、存儲或分析任何可以用來識別您身份的個人信息。
                  </p>
                </div>
              </div>
            </section>

            {/* 信息使用 */}
            <section>
              <div className="flex items-center mb-4">
                <Database className="w-6 h-6 text-green-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">信息使用</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p><strong>我們不使用任何個人信息。</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>僅用於提供短網址生成和重定向服務</li>
                  <li>不會用於廣告投放或營銷</li>
                  <li>不會分享給第三方</li>
                  <li>不會用於用戶行為分析</li>
                  <li>不會用於建立用戶檔案</li>
                </ul>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <p className="text-blue-800 font-medium">
                    🚫 我們不投放廣告，不收集數據用於營銷，完全免費使用。
                  </p>
                </div>
              </div>
            </section>

            {/* 數據保護 */}
            <section>
              <div className="flex items-center mb-4">
                <Lock className="w-6 h-6 text-purple-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">數據保護</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p><strong>我們採取以下措施保護您的數據：</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>使用加密技術保護數據傳輸</li>
                  <li>定期進行安全審計和更新</li>
                  <li>建立數據備份和恢復機制</li>
                  <li>最小化數據收集原則</li>
                </ul>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <p className="text-blue-800 font-medium">
                    🔐 由於不收集個人信息，數據保護主要針對短網址數據本身。
                  </p>
                </div>
              </div>
            </section>

            {/* 數據共享 */}
            <section>
              <div className="flex items-center mb-4">
                <UserCheck className="w-6 h-6 text-orange-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">數據共享</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>我們不與任何人分享任何數據。</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>不向第三方出售或分享數據</li>
                  <li>不與廣告商或營銷公司合作</li>
                  <li>不向政府機構提供用戶數據（除非法律強制要求）</li>
                  <li>不與其他服務提供商分享信息</li>
                </ul>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                  <p className="text-green-800 font-medium">
                    🔒 您的數據完全屬於您，我們不會與任何人分享。
                  </p>
                </div>
              </div>
            </section>

            {/* 數據保留 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">數據保留</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>我們只保留必要的短網址數據。</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>短網址數據：根據您設置的過期時間或永久保留</li>
                  <li>不保留：用戶身份、IP 地址、瀏覽器信息等</li>
                  <li>不保留：訪問日誌、用戶行為數據等</li>
                  <li>不保留：任何可以用來識別您的個人信息</li>
                </ul>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <p className="text-blue-800 font-medium">
                    ⏰ 我們只保留短網址本身，不保留任何個人信息。
                  </p>
                </div>
              </div>
            </section>

            {/* 用戶權利 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">您的權利</h2>
              <div className="space-y-4 text-gray-700">
                <p><strong>由於我們不收集個人信息，您的權利包括：</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>隨時刪除您創建的短網址</li>
                  <li>設置短網址的過期時間</li>
                  <li>完全匿名使用服務</li>
                  <li>不受任何廣告或營銷干擾</li>
                  <li>免費使用所有功能</li>
                </ul>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                  <p className="text-green-800 font-medium">
                    🆓 完全免費使用，無需註冊，無需提供個人信息。
                  </p>
                </div>
              </div>
            </section>

            {/* 聯繫我們 */}
            <section className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">聯繫我們</h2>
              <p className="text-gray-700 mb-4">
                如果您對本隱私政策有任何疑問或需要行使您的權利，請通過以下方式聯繫我們：
              </p>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <strong>電子郵件</strong>：
                  <a 
                    href="mailto:tyouxipindao@gmail.com?subject=TinyLink 隱私政策相關問題"
                    className="text-blue-600 hover:text-blue-800 underline ml-1"
                  >
                    tyouxipindao@gmail.com
                  </a>
                </p>
                <p className="text-gray-700">
                  <strong>聯繫頁面</strong>：<Link href="/contact" className="text-blue-600 hover:text-blue-800">點擊這裡</Link>
                </p>
              </div>
            </section>

            {/* 政策更新 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">政策更新</h2>
              <p className="text-gray-700">
                我們可能會不時更新本隱私政策。重大變更將通過電子郵件或網站通知您。
                建議您定期查看本政策以了解最新變更。
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

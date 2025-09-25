'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, FileText, AlertTriangle, Shield, Ban, Users } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
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
              className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6"
            >
              <FileText className="w-8 h-8 text-blue-600" />
            </motion.div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              TinyLink 服務條款
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              TinyLink 服務完全免費，無廣告，不收集個人信息。請仔細閱讀以下服務條款。
            </p>
            <p className="text-sm text-gray-500 mt-4">
              最後更新：2025年9月
            </p>
          </div>

          {/* 內容 */}
          <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
            {/* 服務描述 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">服務描述</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>本服務完全免費，無廣告，不收集個人信息。</strong>提供以下功能：
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>將長 URL 轉換為短網址</li>
                  <li>自定義短碼生成</li>
                  <li>設置鏈接過期時間</li>
                  <li>鏈接重定向服務</li>
                </ul>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                  <p className="text-green-800 font-medium">
                    🆓 完全免費使用，無需註冊，無廣告干擾，保護您的隱私。
                  </p>
                </div>
              </div>
            </section>

            {/* 使用條款 */}
            <section>
              <div className="flex items-center mb-4">
                <Users className="w-6 h-6 text-green-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">使用條款</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <h3 className="text-xl font-semibold text-gray-900">允許的使用</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>個人和商業用途的合法鏈接</li>
                  <li>社交媒體分享</li>
                  <li>電子郵件營銷（符合反垃圾郵件法規）</li>
                  <li>網站內部導航</li>
                  <li>完全免費使用所有功能</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-gray-900 mt-6">禁止的使用</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>惡意軟件分發</li>
                  <li>釣魚網站</li>
                  <li>成人內容（除非符合法律要求）</li>
                  <li>侵犯版權的內容</li>
                  <li>垃圾郵件或未經請求的通信</li>
                </ul>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
                  <p className="text-red-800 font-medium">
                    ⚠️ 違反使用條款的短網址將被立即刪除，不另行通知。
                  </p>
                </div>
              </div>
            </section>

            {/* 用戶責任 */}
            <section>
              <div className="flex items-center mb-4">
                <Shield className="w-6 h-6 text-purple-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">用戶責任</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p><strong>作為服務用戶，您同意：</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>遵守所有適用的法律法規</li>
                  <li>不濫用或過度使用服務</li>
                  <li>對您創建的鏈接內容負責</li>
                  <li>尊重其他用戶的隱私權</li>
                  <li>不嘗試破壞服務的安全性</li>
                </ul>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <p className="text-blue-800 font-medium">
                    ℹ️ 無需註冊帳戶，您可以完全匿名使用本服務。
                  </p>
                </div>
              </div>
            </section>

            {/* 服務限制 */}
            <section>
              <div className="flex items-center mb-4">
                <Ban className="w-6 h-6 text-red-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">服務限制</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p><strong>我們保留以下權利：</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>刪除違反條款的鏈接</li>
                  <li>修改或終止服務</li>
                  <li>實施技術限制以保護服務</li>
                  <li>防止服務濫用</li>
                </ul>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                  <p className="text-yellow-800 font-medium">
                    ⚠️ 服務完全免費，但我們保留維護服務質量的權利。
                  </p>
                </div>
              </div>
            </section>

            {/* 免責聲明 */}
            <section>
              <div className="flex items-center mb-4">
                <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">免責聲明</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>本服務按"現狀"免費提供，我們不保證：</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>服務的連續性或無中斷性</li>
                  <li>數據的絕對安全性</li>
                  <li>第三方內容的準確性</li>
                  <li>服務的完全無錯誤性</li>
                </ul>
                <p className="mt-4">
                  我們不對因使用本服務而造成的任何直接、間接、偶然或後果性損害承擔責任。
                  由於服務完全免費，我們無法提供商業級別的服務保證。
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <p className="text-blue-800 font-medium">
                    💡 免費服務，請合理使用。如有問題請聯繫我們。
                  </p>
                </div>
              </div>
            </section>

            {/* 隱私和數據 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">隱私和數據</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  您的隱私對我們很重要。請查看我們的 
                  <Link href="/privacy" className="text-blue-600 hover:text-blue-800 underline">隱私政策</Link> 
                  了解我們如何處理您的數據。
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>我們不收集任何個人信息</strong></li>
                  <li><strong>我們不會出售您的個人信息</strong>（因為我們沒有收集）</li>
                  <li><strong>您可以隨時刪除您的短網址</strong></li>
                  <li><strong>我們會保護您的數據安全</strong></li>
                </ul>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                  <p className="text-green-800 font-medium">
                    🔒 我們不收集、不追蹤、不出售任何個人信息。您的隱私得到完全保護。
                  </p>
                </div>
              </div>
            </section>

            {/* 服務變更 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">服務變更</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  我們保留隨時修改、暫停或終止服務的權利。重大變更將提前通知用戶。
                  繼續使用服務即表示您接受變更後的條款。
                </p>
              </div>
            </section>

            {/* 爭議解決 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">爭議解決</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  任何與本服務相關的爭議應通過友好協商解決。如果無法解決，
                  將提交至有管轄權的法院進行裁決。
                </p>
              </div>
            </section>

            {/* 聯繫信息 */}
            <section className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">聯繫我們</h2>
              <p className="text-gray-700 mb-4">
                如果您對本服務條款有任何疑問，請通過以下方式聯繫我們：
              </p>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <strong>電子郵件</strong>：
                  <a 
                    href="mailto:tyouxipindao@gmail.com?subject=TinyLink 服務條款相關問題"
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
          </div>
        </motion.div>
      </div>
    </div>
  );
}

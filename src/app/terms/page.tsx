'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, FileText, AlertTriangle, Shield, Ban, Users } from 'lucide-react';
import Link from 'next/link';
import { useI18n } from '@/i18n/I18nProvider';

export default function TermsPage() {
  const { t } = useI18n();
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
            {t('common.backHome')}
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('terms.title')}</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t('terms.subtitle')}</p>
            <p className="text-sm text-gray-500 mt-4">{t('terms.lastUpdated')}</p>
          </div>

          {/* 內容 */}
          <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
            {/* 服務描述 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('terms.desc.title')}</h2>
              <div className="space-y-4 text-gray-700">
                <p><strong>{t('terms.desc.p1')}</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>{t('terms.desc.bullets.shorten')}</li>
                  <li>{t('terms.desc.bullets.custom')}</li>
                  <li>{t('terms.desc.bullets.expire')}</li>
                  <li>{t('terms.desc.bullets.redirect')}</li>
                </ul>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                  <p className="text-green-800 font-medium">{t('terms.desc.note')}</p>
                </div>
              </div>
            </section>

            {/* 使用條款 */}
            <section>
              <div className="flex items-center mb-4">
                <Users className="w-6 h-6 text-green-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">{t('terms.use.title')}</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <h3 className="text-xl font-semibold text-gray-900">{t('terms.use.allowed.title')}</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>{t('terms.use.allowed.bullets.legal')}</li>
                  <li>{t('terms.use.allowed.bullets.social')}</li>
                  <li>{t('terms.use.allowed.bullets.email')}</li>
                  <li>{t('terms.use.allowed.bullets.navigation')}</li>
                  <li>{t('terms.use.allowed.bullets.free')}</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-gray-900 mt-6">{t('terms.use.prohibited.title')}</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>{t('terms.use.prohibited.bullets.malware')}</li>
                  <li>{t('terms.use.prohibited.bullets.phishing')}</li>
                  <li>{t('terms.use.prohibited.bullets.adult')}</li>
                  <li>{t('terms.use.prohibited.bullets.copyright')}</li>
                  <li>{t('terms.use.prohibited.bullets.spam')}</li>
                </ul>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
                  <p className="text-red-800 font-medium">{t('terms.use.note')}</p>
                </div>
              </div>
            </section>

            {/* 用戶責任 */}
            <section>
              <div className="flex items-center mb-4">
                <Shield className="w-6 h-6 text-purple-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">{t('terms.resp.title')}</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p><strong>{t('terms.resp.p1')}</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>{t('terms.resp.bullets.law')}</li>
                  <li>{t('terms.resp.bullets.noAbuse')}</li>
                  <li>{t('terms.resp.bullets.content')}</li>
                  <li>{t('terms.resp.bullets.privacy')}</li>
                  <li>{t('terms.resp.bullets.security')}</li>
                </ul>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <p className="text-blue-800 font-medium">{t('terms.resp.note')}</p>
                </div>
              </div>
            </section>

            {/* 服務限制 */}
            <section>
              <div className="flex items-center mb-4">
                <Ban className="w-6 h-6 text-red-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">{t('terms.limit.title')}</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p><strong>{t('terms.limit.p1')}</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>{t('terms.limit.bullets.delete')}</li>
                  <li>{t('terms.limit.bullets.modify')}</li>
                  <li>{t('terms.limit.bullets.tech')}</li>
                  <li>{t('terms.limit.bullets.abuse')}</li>
                </ul>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                  <p className="text-yellow-800 font-medium">{t('terms.limit.note')}</p>
                </div>
              </div>
            </section>

            {/* 免責聲明 */}
            <section>
              <div className="flex items-center mb-4">
                <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">{t('terms.disclaimer.title')}</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p><strong>{t('terms.disclaimer.p1')}</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>{t('terms.disclaimer.bullets.continuity')}</li>
                  <li>{t('terms.disclaimer.bullets.security')}</li>
                  <li>{t('terms.disclaimer.bullets.thirdParty')}</li>
                  <li>{t('terms.disclaimer.bullets.noError')}</li>
                </ul>
                <p className="mt-4">{t('terms.disclaimer.p2')}</p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <p className="text-blue-800 font-medium">{t('terms.disclaimer.note')}</p>
                </div>
              </div>
            </section>

            {/* 隱私和數據 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('terms.privacy.title')}</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  {t('terms.privacy.p1')} 
                  <Link href="/privacy" className="text-blue-600 hover:text-blue-800 underline">{t('terms.privacy.linkText')}</Link> 
                  {t('terms.privacy.p2')}
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>{t('terms.privacy.bullets.noCollect')}</strong></li>
                  <li><strong>{t('terms.privacy.bullets.noSell')}</strong></li>
                  <li><strong>{t('terms.privacy.bullets.delete')}</strong></li>
                  <li><strong>{t('terms.privacy.bullets.protect')}</strong></li>
                </ul>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                  <p className="text-green-800 font-medium">{t('terms.privacy.note')}</p>
                </div>
              </div>
            </section>

            {/* 服務變更 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('terms.change.title')}</h2>
              <div className="space-y-4 text-gray-700">
                <p>{t('terms.change.p1')}</p>
              </div>
            </section>

            {/* 爭議解決 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('terms.dispute.title')}</h2>
              <div className="space-y-4 text-gray-700">
                <p>{t('terms.dispute.p1')}</p>
              </div>
            </section>

            {/* 聯繫信息 */}
            <section className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('terms.contact.title')}</h2>
              <p className="text-gray-700 mb-4">{t('terms.contact.p1')}</p>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <strong>{t('terms.contact.email.label')}</strong>：
                  <a 
                    href={`mailto:${t('terms.contact.email.address')}?subject=${t('terms.contact.email.subject')}`}
                    className="text-blue-600 hover:text-blue-800 underline ml-1"
                  >
                    {t('terms.contact.email.address')}
                  </a>
                </p>
                <p className="text-gray-700">
                  <strong>{t('terms.contact.link.title')}</strong>：<Link href="/contact" className="text-blue-600 hover:text-blue-800">{t('terms.contact.link.text')}</Link>
                </p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Eye, Lock, Database, UserCheck } from 'lucide-react';
import Link from 'next/link';
import { useI18n } from '@/i18n/I18nProvider';

export default function PrivacyPage() {
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
              className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6"
            >
              <Shield className="w-8 h-8 text-green-600" />
            </motion.div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('privacy.title')}</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t('privacy.subtitle')}</p>
            <p className="text-sm text-gray-500 mt-4">{t('privacy.lastUpdated')}</p>
          </div>

          {/* 內容 */}
          <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
            {/* 信息收集 */}
            <section>
              <div className="flex items-center mb-4">
                <Eye className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">{t('privacy.collect.title')}</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>{t('privacy.collect.p1')}</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>{t('privacy.collect.bullets.urlData')}</li>
                  <li>{t('privacy.collect.bullets.noCollect')}</li>
                  <li>{t('privacy.collect.bullets.noTrack')}</li>
                  <li>{t('privacy.collect.bullets.optional')}</li>
                </ul>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                  <p className="text-green-800 font-medium">{t('privacy.collect.note')}</p>
                </div>
              </div>
            </section>

            {/* 信息使用 */}
            <section>
              <div className="flex items-center mb-4">
                <Database className="w-6 h-6 text-green-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">{t('privacy.use.title')}</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p><strong>{t('privacy.use.p1')}</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>{t('privacy.use.bullets.onlyService')}</li>
                  <li>{t('privacy.use.bullets.noAds')}</li>
                  <li>{t('privacy.use.bullets.noShare')}</li>
                  <li>{t('privacy.use.bullets.noAnalysis')}</li>
                  <li>{t('privacy.use.bullets.noProfile')}</li>
                </ul>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <p className="text-blue-800 font-medium">{t('privacy.use.note')}</p>
                </div>
              </div>
            </section>

            {/* 數據保護 */}
            <section>
              <div className="flex items-center mb-4">
                <Lock className="w-6 h-6 text-purple-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">{t('privacy.protect.title')}</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p><strong>{t('privacy.protect.p1')}</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>{t('privacy.protect.bullets.encrypt')}</li>
                  <li>{t('privacy.protect.bullets.audit')}</li>
                  <li>{t('privacy.protect.bullets.backup')}</li>
                  <li>{t('privacy.protect.bullets.minimize')}</li>
                </ul>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <p className="text-blue-800 font-medium">{t('privacy.protect.note')}</p>
                </div>
              </div>
            </section>

            {/* 數據共享 */}
            <section>
              <div className="flex items-center mb-4">
                <UserCheck className="w-6 h-6 text-orange-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">{t('privacy.share.title')}</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p><strong>{t('privacy.share.p1')}</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>{t('privacy.share.bullets.noSell')}</li>
                  <li>{t('privacy.share.bullets.noAds')}</li>
                  <li>{t('privacy.share.bullets.noGov')}</li>
                  <li>{t('privacy.share.bullets.noProviders')}</li>
                </ul>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                  <p className="text-green-800 font-medium">{t('privacy.share.note')}</p>
                </div>
              </div>
            </section>

            {/* 數據保留 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.retention.title')}</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>{t('privacy.retention.p1')}</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>{t('privacy.retention.bullets.keepShort')}</li>
                  <li>{t('privacy.retention.bullets.noIdentity')}</li>
                  <li>{t('privacy.retention.bullets.noLogs')}</li>
                  <li>{t('privacy.retention.bullets.noPII')}</li>
                </ul>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <p className="text-blue-800 font-medium">{t('privacy.retention.note')}</p>
                </div>
              </div>
            </section>

            {/* 用戶權利 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.rights.title')}</h2>
              <div className="space-y-4 text-gray-700">
                <p><strong>{t('privacy.rights.p1')}</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>{t('privacy.rights.bullets.delete')}</li>
                  <li>{t('privacy.rights.bullets.expire')}</li>
                  <li>{t('privacy.rights.bullets.anonymous')}</li>
                  <li>{t('privacy.rights.bullets.noAds')}</li>
                  <li>{t('privacy.rights.bullets.free')}</li>
                </ul>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                  <p className="text-green-800 font-medium">{t('privacy.rights.note')}</p>
                </div>
              </div>
            </section>

            {/* 聯繫我們 */}
            <section className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.contact.title')}</h2>
              <p className="text-gray-700 mb-4">{t('privacy.contact.p1')}</p>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <strong>{t('privacy.contact.email.label')}</strong>：
                  <a 
                    href={`mailto:${t('privacy.contact.email.address')}?subject=${t('privacy.contact.email.subject')}`}
                    className="text-blue-600 hover:text-blue-800 underline ml-1"
                  >
                    {t('privacy.contact.email.address')}
                  </a>
                </p>
                <p className="text-gray-700">
                  <strong>{t('privacy.contact.link.title')}</strong>：<Link href="/contact" className="text-blue-600 hover:text-blue-800">{t('privacy.contact.link.text')}</Link>
                </p>
              </div>
            </section>

            {/* 政策更新 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.update.title')}</h2>
              <p className="text-gray-700">{t('privacy.update.p1')}</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

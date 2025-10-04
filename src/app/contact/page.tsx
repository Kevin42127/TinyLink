'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Mail, MessageSquare, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useI18n } from '@/i18n/I18nProvider';

export default function ContactPage() {
  const email = 'tyouxipindao@gmail.com';
  const { t } = useI18n();
  
  const handleEmailClick = () => {
    const subject = encodeURIComponent(t('contact.emailSubject'));
    const body = encodeURIComponent(t('contact.emailBodyTemplate'));
    
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
          {t('common.backHome')}
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('contact.title')}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t('contact.subtitle')}</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('contact.contactInfo.title')}</h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">{t('contact.contactInfo.email.label')}</h3>
                    <motion.button
                      onClick={handleEmailClick}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {t('contact.contactInfo.email.send')}
                    </motion.button>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-lg">🆓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{t('contact.features.title')}</h3>
                    <p className="text-gray-600 mb-2">{t('contact.features.free')}</p>
                    <p className="text-sm text-gray-500">{t('contact.features.privacy')}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{t('contact.reply.title')}</h3>
                    <p className="text-gray-600 mb-2">{t('contact.reply.detail')}</p>
                    <p className="text-sm text-gray-500">{t('contact.reply.note')}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-blue-50 rounded-lg mt-auto">
                <h3 className="font-semibold text-blue-900 mb-2">💡 {t('contact.tip.title')}</h3>
                <p className="text-blue-800 text-sm">{t('contact.tip.desc')}</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('contact.faq.title')}</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{t('contact.faq.delete.title')}</h3>
                  <p className="text-gray-600 text-sm">{t('contact.faq.delete.answer')}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{t('contact.faq.expire.title')}</h3>
                  <p className="text-gray-600 text-sm">{t('contact.faq.expire.answer')}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{t('contact.faq.pricing.title')}</h3>
                  <p className="text-gray-600 text-sm"><strong>{t('contact.features.free')}</strong> {t('contact.faq.pricing.answer')}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{t('contact.faq.limits.title')}</h3>
                  <p className="text-gray-600 text-sm">{t('contact.faq.limits.answer')}</p>
                </div>
              </div>

              <div className="mt-10 p-4 bg-green-50 rounded-lg mt-auto">
                <h3 className="font-semibold text-green-900 mb-2">🚀 {t('contact.cta.title')}</h3>
                <p className="text-green-800 text-sm mb-3">{t('contact.cta.subtitle')}</p>
                <Link 
                  href="/"
                  className="inline-flex items-center text-green-700 hover:text-green-800 font-medium"
                >
                  {t('contact.cta.homeLink')}
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
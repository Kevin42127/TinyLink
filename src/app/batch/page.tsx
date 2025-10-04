'use client';

import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import BatchUrlForm from '@/components/BatchUrlForm';
import { useI18n } from '@/i18n/I18nProvider';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function BatchPage() {
  const { t } = useI18n();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="w-5 h-5 mr-2" />
            {t('common.backHome')}
          </Link>
          <LanguageSwitcher />
        </div>

        <BatchUrlForm />
      </motion.div>
    </div>
  );
}

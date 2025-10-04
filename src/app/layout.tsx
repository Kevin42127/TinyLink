import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/components/Providers'
import { cookies } from 'next/headers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TinyLink',
  description: '快速、安全、免費的 URL 短網址生成服務',
  keywords: '短網址,URL縮短,鏈接縮短',
  authors: [{ name: 'URL Shortener' }],
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: '/apple-touch-icon.png',
    other: [
      { rel: 'android-chrome', url: '/android-chrome-192x192.png', sizes: '192x192' },
      { rel: 'android-chrome', url: '/android-chrome-512x512.png', sizes: '512x512' }
    ]
  },
  openGraph: {
    title: 'TinyLink',
    description: '快速、安全、免費的 URL 短網址生成服務',
    type: 'website',
    images: ['/logo1.png']
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies();
  const cookieLocale = cookieStore.get('locale')?.value;
  const initialLocale = cookieLocale === 'en' || cookieLocale === 'zh' ? cookieLocale : 'en';
  const htmlLang = initialLocale === 'en' ? 'en' : 'zh-TW';
  return (
    <html lang={htmlLang}>
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
          <Providers initialLocale={initialLocale}>
            {children}
          </Providers>
        </div>
      </body>
    </html>
  )
}

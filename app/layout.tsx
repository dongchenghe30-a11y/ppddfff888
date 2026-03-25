import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { FavoritesProvider } from '@/contexts/FavoritesContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'CalcHub - Free Online Calculator & Unit Converter | 免费在线计算器',
  description: 'Free online calculators and conversion tools. 50+ tools including scientific calculator, loan calculator, BMI calculator, unit converter and more. 免费在线计算器大全，包含科学计算器、贷款计算器、BMI计算器、单位换算等50+工具。',
  keywords: 'calculator, unit converter, BMI calculator, loan calculator, compound interest, scientific calculator, 计算器, 单位换算, 贷款计算器, BMI计算器, 复利计算器',
  openGraph: {
    title: 'CalcHub - Free Online Calculator Hub',
    description: '50+ free online calculators and conversion tools',
    type: 'website',
    locale: 'zh_CN',
    alternateLocale: 'en_US',
  },
  alternates: {
    canonical: 'https://calchub.app',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            try {
              const theme = localStorage.getItem('theme');
              const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches;
              if (theme === 'dark' || (!theme && prefers)) {
                document.documentElement.classList.add('dark');
              }
            } catch(e) {}
          `
        }} />
        <meta name="google-adsense-account" content="ca-pub-62370889" />
      </head>
      <body className="font-sans bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen">
        <ThemeProvider>
          <LanguageProvider>
            <FavoritesProvider>
              <Navbar />
              <main>{children}</main>
              <Footer />
            </FavoritesProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

'use client'

import { useLanguage } from '@/contexts/LanguageContext'

interface ToolLayoutProps {
  titleZh: string
  titleEn: string
  descZh: string
  descEn: string
  icon: string
  tags?: string[]
  children: React.ReactNode
  introZh?: string
  introEn?: string
  useCaseZh?: string
  useCaseEn?: string
  faqZh?: { q: string; a: string }[]
  faqEn?: { q: string; a: string }[]
}

export default function ToolLayout({
  titleZh, titleEn, descZh, descEn, icon, tags = [],
  children, introZh, introEn, useCaseZh, useCaseEn, faqZh, faqEn
}: ToolLayoutProps) {
  const { locale, t } = useLanguage()

  const title = locale === 'zh' ? titleZh : titleEn
  const desc = locale === 'zh' ? descZh : descEn
  const intro = locale === 'zh' ? introZh : introEn
  const useCase = locale === 'zh' ? useCaseZh : useCaseEn
  const faqs = locale === 'zh' ? faqZh : faqEn

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-start gap-4">
            <span className="text-5xl">{icon}</span>
            <div>
              <h1 className="text-3xl font-bold mb-2">{title}</h1>
              <p className="text-blue-100 text-lg">{desc}</p>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {tags.map(tag => (
                    <span key={tag} className="text-xs bg-white/20 text-white px-2.5 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Tool */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              {children}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Intro */}
            {intro && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
                <h2 className="font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                  <span>📖</span> {t.common.toolIntro}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{intro}</p>
              </div>
            )}

            {/* Use Case */}
            {useCase && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
                <h2 className="font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                  <span>💡</span> {t.common.useCase}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">{useCase}</p>
              </div>
            )}

            {/* FAQ */}
            {faqs && faqs.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
                <h2 className="font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                  <span>❓</span> {t.common.faq}
                </h2>
                <div className="space-y-4">
                  {faqs.map((faq, i) => (
                    <div key={i}>
                      <p className="font-medium text-sm text-gray-800 dark:text-gray-200 mb-1">Q: {faq.q}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">A: {faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

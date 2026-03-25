'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function AboutPage() {
  const { locale, t } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <div className="text-6xl mb-4">🧮</div>
          <h1 className="text-4xl font-extrabold mb-3">CalcHub</h1>
          <p className="text-purple-100 text-lg">{t.about.intro}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Mission */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t.about.mission}</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">{t.about.missionText}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { value: '50+', label: locale === 'zh' ? '工具数量' : 'Tools' },
            { value: '50+', label: locale === 'zh' ? '深度文章' : 'Articles' },
            { value: '100%', label: locale === 'zh' ? '永久免费' : 'Free Forever' },
            { value: '2', label: locale === 'zh' ? '支持语言' : 'Languages' },
          ].map(stat => (
            <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 text-center">
              <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">{stat.value}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">{locale === 'zh' ? '我们的价值观' : 'Our Values'}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: '🎯', zh: '精准可靠', en: 'Accuracy First', descZh: '所有计算基于标准数学公式，确保结果的准确性和可靠性', descEn: 'All calculations are based on standard mathematical formulas for accuracy and reliability' },
              { icon: '🔒', zh: '隐私安全', en: 'Privacy First', descZh: '计算在本地进行，不收集用户数据，保护用户隐私', descEn: 'Calculations run locally, no data collection, protecting user privacy' },
              { icon: '🌍', zh: '全球服务', en: 'Global Service', descZh: '支持中英文双语，服务全球各地的用户', descEn: 'Supporting Chinese and English to serve users worldwide' },
              { icon: '💡', zh: '持续创新', en: 'Continuous Innovation', descZh: '不断添加新工具，改进用户体验，满足不断变化的需求', descEn: 'Continuously adding new tools and improving the user experience' },
            ].map(v => (
              <div key={v.zh} className="flex gap-4">
                <span className="text-3xl shrink-0">{v.icon}</span>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">{locale === 'zh' ? v.zh : v.en}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{locale === 'zh' ? v.descZh : v.descEn}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-4 justify-center">
          {[
            { href: '/about/privacy', label: t.about.privacy },
            { href: '/about/terms', label: t.about.terms },
            { href: '/about/contact', label: t.about.contact },
          ].map(link => (
            <a key={link.href} href={link.href}
              className="px-6 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

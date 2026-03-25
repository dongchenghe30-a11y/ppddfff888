'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { categories, getPopularTools } from '@/lib/tools'
import { articles } from '@/lib/articles'
import ToolCard from '@/components/ToolCard'
import { ArrowRight, Zap, BookOpen, Shield, Star } from 'lucide-react'

const faqs = [
  { zh: { q: '这些工具是免费的吗？', a: '是的！所有工具永久免费，无需注册账号。' }, en: { q: 'Are these tools free?', a: 'Yes! All tools are permanently free with no account required.' } },
  { zh: { q: '计算结果准确吗？', a: '所有计算均基于标准数学公式，结果高度准确。如有精密计算需求，建议核实关键数据。' }, en: { q: 'Are the calculation results accurate?', a: 'All calculations are based on standard mathematical formulas and are highly accurate. For critical calculations, we recommend verifying key data.' } },
  { zh: { q: '支持手机使用吗？', a: '完全支持！网站采用响应式设计，在手机、平板、电脑上都有良好体验。' }, en: { q: 'Does it work on mobile?', a: 'Absolutely! The site uses responsive design and works great on phones, tablets, and computers.' } },
  { zh: { q: '数据会被保存吗？', a: '所有计算均在本地进行，我们不收集您的计算数据，确保隐私安全。' }, en: { q: 'Is my data saved?', a: 'All calculations happen locally. We do not collect your calculation data, ensuring your privacy.' } },
]

export default function HomePage() {
  const { t, locale } = useLanguage()

  const popularTools = getPopularTools()

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-8xl">🔢</div>
          <div className="absolute top-20 right-20 text-6xl">📐</div>
          <div className="absolute bottom-10 left-1/4 text-7xl">💰</div>
          <div className="absolute bottom-20 right-1/3 text-5xl">📊</div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white text-sm px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
            <Zap size={14} /> {locale === 'zh' ? '50+ 免费工具，立即使用' : '50+ Free Tools, Use Now'}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
            {t.home.hero.title}
          </h1>
          <p className="text-xl sm:text-2xl text-blue-100 mb-4 max-w-3xl mx-auto">
            {t.home.hero.subtitle}
          </p>
          <p className="text-blue-200 mb-10 max-w-2xl mx-auto">
            {t.home.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/calculator/basic"
              className="w-full sm:w-auto bg-white text-blue-600 font-bold px-8 py-3.5 rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
            >
              {t.home.hero.startBtn}
            </Link>
            <Link href="/tools"
              className="w-full sm:w-auto border-2 border-white/60 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-colors"
            >
              {t.home.hero.browseBtn}
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="relative border-t border-white/20 bg-white/10 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {[
                { label: t.home.stats.tools, desc: t.home.stats.toolsDesc },
                { label: t.home.stats.articles, desc: t.home.stats.articlesDesc },
                { label: t.home.stats.free, desc: t.home.stats.freeDesc },
                { label: locale === 'zh' ? '多语言' : 'Multi-lingual', desc: locale === 'zh' ? '中英文支持' : 'EN & ZH' },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-2xl font-extrabold text-white">{stat.label}</div>
                  <div className="text-blue-200 text-sm">{stat.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">{t.home.categories.title}</h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg">{t.home.categories.subtitle}</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map(cat => (
            <Link key={cat.id} href={`/${cat.id}`}
              className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all text-center"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{cat.icon}</div>
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {locale === 'zh' ? cat.nameZh : cat.nameEn}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                {locale === 'zh' ? cat.descZh : cat.descEn}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Tools */}
      <section className="bg-gray-100 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{t.home.popular.title}</h2>
              <p className="text-gray-500 dark:text-gray-400">{t.home.popular.subtitle}</p>
            </div>
            <Link href="/tools" className="hidden sm:flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:underline">
              {locale === 'zh' ? '全部工具' : 'All Tools'} <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {popularTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">{t.home.features.title}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <Zap className="text-yellow-500" size={28} />, title: t.home.features.f1Title, desc: t.home.features.f1Desc },
            { icon: <Star className="text-blue-500" size={28} />, title: t.home.features.f2Title, desc: t.home.features.f2Desc },
            { icon: <BookOpen className="text-green-500" size={28} />, title: t.home.features.f3Title, desc: t.home.features.f3Desc },
            { icon: <Shield className="text-purple-500" size={28} />, title: t.home.features.f4Title, desc: t.home.features.f4Desc },
          ].map((feat, i) => (
            <div key={i} className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
              <div className="flex justify-center mb-4">{feat.icon}</div>
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">{feat.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Articles */}
      <section className="bg-gray-100 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{t.home.latestArticles.title}</h2>
              <p className="text-gray-500 dark:text-gray-400">{t.home.latestArticles.subtitle}</p>
            </div>
            <Link href="/blog" className="hidden sm:flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:underline">
              {t.home.latestArticles.viewAll} <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.slice(0, 3).map(article => (
              <Link key={article.id} href={`/blog/${article.slug}`}
                className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500 transition-all"
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      article.category === 'finance' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                      article.category === 'math' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400' :
                      article.category === 'tech' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
                      'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
                    }`}>
                      {locale === 'zh' ? {finance:'财务',math:'数学',tech:'技术',tutorial:'教程',review:'评测'}[article.category] : article.category}
                    </span>
                    <span className="text-xs text-gray-400">
                      {locale === 'zh' ? article.readTimeZh : article.readTimeEn} {t.common.minute}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {locale === 'zh' ? article.titleZh : article.titleEn}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
                    {locale === 'zh' ? article.summaryZh : article.summaryEn}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-4">
                    {article.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">{t.home.faqSection.title}</h2>
          <p className="text-gray-500 dark:text-gray-400">{t.home.faqSection.subtitle}</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const item = locale === 'zh' ? faq.zh : faq.en
            return (
              <details key={i} className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400">
                  {item.q}
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="px-5 pb-4 text-gray-600 dark:text-gray-400">{item.a}</p>
              </details>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {locale === 'zh' ? '立即开始使用，完全免费！' : 'Start Using Now, Completely Free!'}
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            {locale === 'zh' ? '50+专业工具，无需注册，随时使用' : '50+ professional tools, no registration, use anytime'}
          </p>
          <Link href="/calculator/basic"
            className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold px-8 py-3.5 rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
          >
            {locale === 'zh' ? '开始计算' : 'Start Calculating'} <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  )
}

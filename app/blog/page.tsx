'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { articles } from '@/lib/articles'
import { Clock, Tag } from 'lucide-react'

export default function BlogPage() {
  const { locale, t } = useLanguage()
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [
    { id: 'all', zh: '全部', en: 'All' },
    { id: 'tutorial', zh: '使用教程', en: 'Tutorials' },
    { id: 'math', zh: '数学知识', en: 'Math' },
    { id: 'finance', zh: '财务知识', en: 'Finance' },
    { id: 'tech', zh: '技术分享', en: 'Tech' },
    { id: 'review', zh: '工具评测', en: 'Reviews' },
  ]

  const filtered = activeCategory === 'all' ? articles : articles.filter(a => a.category === activeCategory)

  const categoryColors: Record<string, string> = {
    finance: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
    math: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
    tech: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
    tutorial: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
    review: 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400',
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <h1 className="text-4xl font-extrabold mb-3">{t.blog.title}</h1>
          <p className="text-indigo-100 text-lg max-w-2xl mx-auto">{t.blog.subtitle}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === cat.id ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-blue-400'}`}
            >
              {locale === 'zh' ? cat.zh : cat.en}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(article => (
            <Link key={article.id} href={`/blog/${article.slug}`}
              className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg hover:border-blue-400 dark:hover:border-blue-500 transition-all"
            >
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${categoryColors[article.category]}`}>
                    {locale === 'zh' ? {finance:'财务',math:'数学',tech:'技术',tutorial:'教程',review:'评测'}[article.category] : article.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock size={12} /> {locale === 'zh' ? article.readTimeZh : article.readTimeEn} {t.common.minute}
                  </span>
                </div>

                <h2 className="font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 text-lg">
                  {locale === 'zh' ? article.titleZh : article.titleEn}
                </h2>

                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 mb-4">
                  {locale === 'zh' ? article.summaryZh : article.summaryEn}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {article.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="flex items-center gap-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded">
                        <Tag size={10} /> {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">{article.publishDate}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-500 dark:text-gray-400">
            {locale === 'zh' ? '该分类暂无文章' : 'No articles in this category'}
          </div>
        )}
      </div>
    </div>
  )
}

'use client'

import { useFavorites } from '@/contexts/FavoritesContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { tools } from '@/lib/tools'
import ToolCard from '@/components/ToolCard'
import Link from 'next/link'

export default function FavoritesPage() {
  const { favorites } = useFavorites()
  const { locale, t } = useLanguage()
  const favTools = tools.filter(t2 => favorites.includes(t2.id))

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{t.nav.favorites}</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          {locale === 'zh' ? `已收藏 ${favTools.length} 个工具` : `${favTools.length} tools saved`}
        </p>

        {favTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {favTools.map(tool => <ToolCard key={tool.id} tool={tool} />)}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">⭐</div>
            <h2 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-3">
              {locale === 'zh' ? '还没有收藏任何工具' : 'No favorites yet'}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              {locale === 'zh' ? '浏览工具时点击星形图标即可收藏' : 'Click the star icon on any tool to add to favorites'}
            </p>
            <Link href="/tools" className="bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 transition-colors font-medium">
              {locale === 'zh' ? '浏览所有工具' : 'Browse All Tools'}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

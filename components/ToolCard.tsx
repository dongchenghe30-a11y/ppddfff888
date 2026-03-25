'use client'

import Link from 'next/link'
import { useFavorites } from '@/contexts/FavoritesContext'
import { useLanguage } from '@/contexts/LanguageContext'
import type { Tool } from '@/lib/tools'
import { Star } from 'lucide-react'

interface ToolCardProps {
  tool: Tool
  showCategory?: boolean
}

export default function ToolCard({ tool, showCategory = false }: ToolCardProps) {
  const { locale, t } = useLanguage()
  const { toggleFavorite, isFavorite } = useFavorites()
  const fav = isFavorite(tool.id)

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md dark:hover:shadow-blue-900/20 transition-all duration-200 overflow-hidden">
      <Link href={tool.href} className="block p-5">
        <div className="flex items-start gap-3">
          <span className="text-3xl shrink-0">{tool.icon}</span>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
              {locale === 'zh' ? tool.titleZh : tool.titleEn}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
              {locale === 'zh' ? tool.descZh : tool.descEn}
            </p>
            {showCategory && (
              <span className="inline-block mt-2 text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full">
                {tool.category}
              </span>
            )}
          </div>
        </div>
      </Link>
      <button
        onClick={(e) => { e.preventDefault(); toggleFavorite(tool.id) }}
        className={`absolute top-3 right-3 p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-all ${fav ? 'opacity-100 text-yellow-500' : 'text-gray-400 hover:text-yellow-500'}`}
        title={fav ? t.common.unfavorite : t.common.favorite}
      >
        <Star size={16} fill={fav ? 'currentColor' : 'none'} />
      </button>
    </div>
  )
}

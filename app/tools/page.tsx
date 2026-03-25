'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { tools, categories } from '@/lib/tools'
import ToolCard from '@/components/ToolCard'

export default function AllToolsPage() {
  const { locale } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-4xl font-extrabold mb-3">{locale === 'zh' ? '所有工具' : 'All Tools'}</h1>
          <p className="text-blue-100 text-lg">{locale === 'zh' ? `共 ${tools.length} 个免费在线工具` : `${tools.length}+ free online tools`}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {categories.map(cat => {
          const catTools = tools.filter(t => t.category === cat.id)
          return (
            <div key={cat.id} id={cat.id} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{cat.icon}</span>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {locale === 'zh' ? cat.nameZh : cat.nameEn}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {locale === 'zh' ? cat.descZh : cat.descEn}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {catTools.map(tool => <ToolCard key={tool.id} tool={tool} />)}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

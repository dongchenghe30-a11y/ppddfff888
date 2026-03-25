'use client'
import { useLanguage } from '@/contexts/LanguageContext'
import { tools } from '@/lib/tools'
import ToolCard from '@/components/ToolCard'

export default function MathIndexPage() {
  const { locale } = useLanguage()
  const mathTools = tools.filter(t => t.category === 'math')
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">{locale === 'zh' ? '数学工具' : 'Math Tools'}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mathTools.map(tool => <ToolCard key={tool.id} tool={tool} />)}
      </div>
    </div>
  )
}

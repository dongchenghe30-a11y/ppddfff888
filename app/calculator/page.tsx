'use client'
import { useLanguage } from '@/contexts/LanguageContext'
import { tools } from '@/lib/tools'
import ToolCard from '@/components/ToolCard'

export default function CalculatorIndexPage() {
  const { locale } = useLanguage()
  const calcTools = tools.filter(t => t.category === 'calculator')
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">{locale === 'zh' ? '计算器工具' : 'Calculator Tools'}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {calcTools.map(tool => <ToolCard key={tool.id} tool={tool} />)}
      </div>
    </div>
  )
}

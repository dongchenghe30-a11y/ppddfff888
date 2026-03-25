'use client'

import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'
import { useLanguage } from '@/contexts/LanguageContext'

export default function CaseConverterPage() {
  const { locale, t } = useLanguage()
  const [input, setInput] = useState('Hello World Example Text')
  const [copied, setCopied] = useState('')

  const toUpperCase = (s: string) => s.toUpperCase()
  const toLowerCase = (s: string) => s.toLowerCase()
  const toTitleCase = (s: string) => s.replace(/\b\w/g, c => c.toUpperCase())
  const toCamelCase = (s: string) => s.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase())
  const toSnakeCase = (s: string) => s.replace(/\s+/g, '_').replace(/([A-Z])/g, (c, i) => (i ? '_' : '') + c).toLowerCase()
  const toKebabCase = (s: string) => s.replace(/\s+/g, '-').replace(/([A-Z])/g, (c, i) => (i ? '-' : '') + c).toLowerCase()

  const conversions = [
    { key: 'upper', zh: '全大写 (UPPER CASE)', en: 'UPPER CASE', fn: toUpperCase },
    { key: 'lower', zh: '全小写 (lower case)', en: 'lower case', fn: toLowerCase },
    { key: 'title', zh: '首字母大写 (Title Case)', en: 'Title Case', fn: toTitleCase },
    { key: 'camel', zh: '驼峰命名 (camelCase)', en: 'camelCase', fn: toCamelCase },
    { key: 'snake', zh: '下划线命名 (snake_case)', en: 'snake_case', fn: toSnakeCase },
    { key: 'kebab', zh: '连字符命名 (kebab-case)', en: 'kebab-case', fn: toKebabCase },
  ]

  const copy = (val: string, key: string) => {
    navigator.clipboard.writeText(val).then(() => { setCopied(key); setTimeout(() => setCopied(''), 2000) })
  }

  return (
    <ToolLayout
      titleZh={t.text.caseConverter.title} titleEn="Case Converter"
      descZh={t.text.caseConverter.desc} descEn="Convert text between uppercase, lowercase, title case, camelCase and more"
      icon="Aa" tags={['case', 'uppercase', 'lowercase', 'camelCase', '大小写']}
      introZh="大小写转换工具支持全大写、全小写、首字母大写（Title Case）、驼峰命名（camelCase）、下划线命名（snake_case）、连字符命名（kebab-case）等多种格式转换，是程序员和内容创作者的实用工具。"
      introEn="Case converter supports UPPERCASE, lowercase, Title Case, camelCase, snake_case and kebab-case transformations. Essential for programmers and content creators."
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{locale==='zh'?'输入文本':'Input Text'}</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} rows={3}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
        </div>
        <div className="space-y-2">
          {conversions.map(c => {
            const result = c.fn(input)
            return (
              <div key={c.key} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors group">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-gray-500 dark:text-gray-400">{locale==='zh'?c.zh:c.en}</span>
                  <div className="flex gap-2">
                    <button onClick={() => setInput(result)} className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">{locale==='zh'?'用作输入':'Use as input'}</button>
                    <button onClick={() => copy(result, c.key)} className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                      {copied===c.key?(locale==='zh'?'✓ 已复制':'✓ Copied'):(locale==='zh'?'复制':'Copy')}
                    </button>
                  </div>
                </div>
                <div className="font-mono text-sm text-gray-800 dark:text-gray-200 break-all">{result}</div>
              </div>
            )
          })}
        </div>
      </div>
    </ToolLayout>
  )
}

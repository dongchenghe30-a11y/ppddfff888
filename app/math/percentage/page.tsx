'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import ToolLayout from '@/components/ToolLayout'

export default function PercentagePage() {
  const { locale, t } = useLanguage()
  const [mode, setMode] = useState(0)
  const [a, setA] = useState('')
  const [b, setB] = useState('')
  const [result, setResult] = useState<string | null>(null)

  const modes = [
    { zh: 'A是B的百分之几', en: 'What % is A of B?', calc: () => ((parseFloat(a) / parseFloat(b)) * 100).toFixed(4) + '%' },
    { zh: 'B的A%是多少', en: 'What is A% of B?', calc: () => ((parseFloat(a) / 100) * parseFloat(b)).toFixed(6) },
    { zh: '从A到B增长了多少%', en: 'What % increase from A to B?', calc: () => (((parseFloat(b) - parseFloat(a)) / parseFloat(a)) * 100).toFixed(4) + '%' },
    { zh: '从A到B减少了多少%', en: 'What % decrease from A to B?', calc: () => (((parseFloat(a) - parseFloat(b)) / parseFloat(a)) * 100).toFixed(4) + '%' },
    { zh: 'A加上B%', en: 'A plus B%', calc: () => (parseFloat(a) * (1 + parseFloat(b) / 100)).toFixed(6) },
    { zh: 'A减去B%', en: 'A minus B%', calc: () => (parseFloat(a) * (1 - parseFloat(b) / 100)).toFixed(6) },
  ]

  const calculate = () => {
    try {
      setResult(modes[mode].calc())
    } catch {
      setResult(locale === 'zh' ? '输入无效' : 'Invalid input')
    }
  }

  return (
    <ToolLayout
      titleZh="百分比计算器"
      titleEn="Percentage Calculator"
      descZh="多种百分比计算模式，轻松处理百分比、增减率、折扣等问题"
      descEn="Multiple percentage calculation modes for percentages, growth rates, discounts and more"
      icon="%"
      tags={['percentage', 'percent', 'growth rate', '百分比', '增长率', '折扣']}
      introZh="百分比计算器提供6种常见的百分比计算模式，涵盖基本百分比、增减率、折扣计算等，适合各种日常计算需求。"
      introEn="The percentage calculator provides 6 common calculation modes covering basic percentages, growth/decline rates, discount calculations and more for everyday needs."
      faqZh={[{ q: '如何计算两数之间的增长率？', a: '选择"从A到B增长了多少%"模式，A填入原始值，B填入新值，点击计算即可。' }]}
      faqEn={[{ q: 'How do I calculate the growth rate between two numbers?', a: 'Select "What % increase from A to B?" mode, enter the original value as A and new value as B, then click Calculate.' }]}
    >
      <div className="space-y-4">
        {/* Mode selector */}
        <div className="grid grid-cols-2 gap-2">
          {modes.map((m, i) => (
            <button key={i} onClick={() => { setMode(i); setResult(null) }}
              className={`text-left p-3 rounded-xl text-sm transition-colors ${mode === i ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
            >
              {locale === 'zh' ? m.zh : m.en}
            </button>
          ))}
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">A</label>
            <input type="number" value={a} onChange={e => setA(e.target.value)} placeholder="0"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">B</label>
            <input type="number" value={b} onChange={e => setB(e.target.value)} placeholder="0"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>

        <button onClick={calculate} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors">
          {t.common.calculate}
        </button>

        {result !== null && (
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5 text-center">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              {locale === 'zh' ? modes[mode].zh : modes[mode].en}
            </div>
            <div className="text-4xl font-extrabold text-blue-700 dark:text-blue-300">{result}</div>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}

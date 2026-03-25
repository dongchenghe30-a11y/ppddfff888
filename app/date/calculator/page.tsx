'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import ToolLayout from '@/components/ToolLayout'

export default function DateCalculatorPage() {
  const { locale, t } = useLanguage()
  const [date1, setDate1] = useState('')
  const [date2, setDate2] = useState('')
  const [result, setResult] = useState<{ days: number; months: number; years: number; weeks: number } | null>(null)

  const calculate = () => {
    const d1 = new Date(date1)
    const d2 = new Date(date2)
    if (!isNaN(d1.getTime()) && !isNaN(d2.getTime())) {
      const diffMs = Math.abs(d2.getTime() - d1.getTime())
      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))
      const weeks = Math.floor(days / 7)
      const months = Math.round(days / 30.44)
      const years = Math.round(days / 365.25 * 100) / 100
      setResult({ days, weeks, months, years })
    }
  }

  return (
    <ToolLayout
      titleZh="日期计算器"
      titleEn="Date Calculator"
      descZh="计算两个日期之间的天数、周数、月数和年数"
      descEn="Calculate the number of days, weeks, months, and years between two dates"
      icon="📅"
      tags={['date calculator', 'days between dates', '日期计算', '天数计算']}
      introZh="日期计算器可以精确计算两个日期之间的时间间隔，结果以天数、周数、月数和年数显示，广泛用于项目期限、年龄计算、纪念日等场景。"
      introEn="The date calculator accurately computes the time interval between two dates, displayed in days, weeks, months, and years. Widely used for project deadlines, age calculations, anniversaries, and more."
      faqZh={[{ q: '日期计算准确吗？', a: '天数和周数计算精确，月份计算基于30.44天/月的平均值，年数基于365.25天/年（含闰年修正）。' }]}
      faqEn={[{ q: 'Are the date calculations accurate?', a: 'Days and weeks are exact. Months are based on an average of 30.44 days/month, and years are based on 365.25 days/year (accounting for leap years).' }]}
    >
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t.date.calculator.startDate}</label>
            <input type="date" value={date1} onChange={e => setDate1(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t.date.calculator.endDate}</label>
            <input type="date" value={date2} onChange={e => setDate2(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>

        <button onClick={calculate} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors">
          {t.common.calculate}
        </button>

        {result && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: t.date.calculator.days, value: result.days, icon: '📅' },
              { label: locale === 'zh' ? '周数' : 'Weeks', value: result.weeks, icon: '📆' },
              { label: t.date.calculator.months, value: result.months, icon: '🗓️' },
              { label: t.date.calculator.years, value: result.years, icon: '🗒️' },
            ].map(item => (
              <div key={item.label} className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-center">
                <div className="text-2xl mb-1">{item.icon}</div>
                <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">{item.value}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{item.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Quick presets */}
        <div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{locale === 'zh' ? '快速设置' : 'Quick Set'}</h3>
          <div className="flex flex-wrap gap-2">
            {[
              { zh: '今天到年底', en: 'Today to Year End', set: () => { const d = new Date(); const e = new Date(d.getFullYear(), 11, 31); setDate1(d.toISOString().slice(0,10)); setDate2(e.toISOString().slice(0,10)) } },
              { zh: '本月', en: 'This Month', set: () => { const d = new Date(); setDate1(new Date(d.getFullYear(), d.getMonth(), 1).toISOString().slice(0,10)); setDate2(new Date(d.getFullYear(), d.getMonth()+1, 0).toISOString().slice(0,10)) } },
              { zh: '近30天', en: 'Last 30 Days', set: () => { const d = new Date(); const s = new Date(d); s.setDate(s.getDate()-30); setDate1(s.toISOString().slice(0,10)); setDate2(d.toISOString().slice(0,10)) } },
            ].map(p => (
              <button key={p.zh} onClick={() => { p.set(); setTimeout(calculate, 100) }}
                className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {locale === 'zh' ? p.zh : p.en}
              </button>
            ))}
          </div>
        </div>
      </div>
    </ToolLayout>
  )
}

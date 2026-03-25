'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import ToolLayout from '@/components/ToolLayout'

export default function WorkdaysPage() {
  const { locale } = useLanguage()
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [includeEndDate, setIncludeEndDate] = useState(true)
  const [result, setResult] = useState<{
    workdays: number
    weekends: number
    total: number
    saturdays: number
    sundays: number
  } | null>(null)

  const calculate = () => {
    if (!startDate || !endDate) return
    const start = new Date(startDate)
    const end = new Date(endDate)
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return
    if (start > end) return

    let workdays = 0
    let saturdays = 0
    let sundays = 0
    const current = new Date(start)
    const limit = includeEndDate ? end : new Date(end.getTime() - 86400000)

    while (current <= limit) {
      const day = current.getDay()
      if (day === 0) sundays++
      else if (day === 6) saturdays++
      else workdays++
      current.setDate(current.getDate() + 1)
    }

    const total = workdays + saturdays + sundays
    setResult({ workdays, weekends: saturdays + sundays, total, saturdays, sundays })
  }

  const setPreset = (type: string) => {
    const now = new Date()
    const y = now.getFullYear()
    const m = now.getMonth()
    if (type === 'thisMonth') {
      setStartDate(new Date(y, m, 1).toISOString().slice(0, 10))
      setEndDate(new Date(y, m + 1, 0).toISOString().slice(0, 10))
    } else if (type === 'thisYear') {
      setStartDate(`${y}-01-01`)
      setEndDate(`${y}-12-31`)
    } else if (type === 'nextMonth') {
      setStartDate(new Date(y, m + 1, 1).toISOString().slice(0, 10))
      setEndDate(new Date(y, m + 2, 0).toISOString().slice(0, 10))
    } else if (type === 'next30') {
      setStartDate(now.toISOString().slice(0, 10))
      const d = new Date(now)
      d.setDate(d.getDate() + 30)
      setEndDate(d.toISOString().slice(0, 10))
    }
  }

  const zh = locale === 'zh'

  return (
    <ToolLayout
      titleZh="工作日计算器"
      titleEn="Working Days Calculator"
      descZh="计算两个日期之间的工作日数量，自动排除周末"
      descEn="Calculate the number of working days between two dates, automatically excluding weekends"
      icon="💼"
      tags={['working days calculator', 'workday counter', '工作日计算', '上班天数']}
      introZh="工作日计算器帮助您快速统计两个日期区间内的工作日数量（周一至周五），并同时显示周末天数。常用于项目排期、工期计算、薪资核算等场景。"
      introEn="The working days calculator helps you quickly count weekdays (Monday–Friday) between two dates, while also showing weekend days. Commonly used for project scheduling, deadline estimation, and payroll calculations."
      faqZh={[
        { q: '工作日计算包含节假日吗？', a: '本工具仅自动排除周六和周日，不包含法定节假日调整。如需排除节假日，请在结果基础上手动减去相应天数。' },
        { q: '包含结束日期是什么意思？', a: '开启后，计算范围包含结束日期当天；关闭则不统计最后一天（常用于计算"还剩多少个完整工作日"）。' },
      ]}
      faqEn={[
        { q: 'Does this include public holidays?', a: 'This tool only excludes Saturdays and Sundays automatically. It does not account for public holidays. Please subtract those manually from the result.' },
        { q: 'What does "include end date" mean?', a: 'When enabled, the end date itself is counted. When disabled, the last day is excluded — useful for calculating "how many full working days remain".' },
      ]}
    >
      <div className="space-y-5">
        {/* Date inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              {zh ? '开始日期' : 'Start Date'}
            </label>
            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              {zh ? '结束日期' : 'End Date'}
            </label>
            <input
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Toggle: include end date */}
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <div
            onClick={() => setIncludeEndDate(v => !v)}
            className={`relative w-11 h-6 rounded-full transition-colors ${includeEndDate ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}
          >
            <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${includeEndDate ? 'translate-x-5' : ''}`} />
          </div>
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {zh ? '包含结束日期' : 'Include end date'}
          </span>
        </label>

        <button
          onClick={calculate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors"
        >
          {zh ? '计算工作日' : 'Calculate Working Days'}
        </button>

        {/* Results */}
        {result && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: zh ? '工作日' : 'Working Days', value: result.workdays, icon: '💼', color: 'blue' },
                { label: zh ? '周末天数' : 'Weekend Days', value: result.weekends, icon: '🏖️', color: 'orange' },
                { label: zh ? '周六' : 'Saturdays', value: result.saturdays, icon: '🌅', color: 'purple' },
                { label: zh ? '周日' : 'Sundays', value: result.sundays, icon: '☀️', color: 'yellow' },
              ].map(item => (
                <div key={item.label} className={`bg-${item.color}-50 dark:bg-${item.color}-900/20 rounded-xl p-4 text-center`}>
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <div className={`text-2xl font-bold text-${item.color}-700 dark:text-${item.color}-300`}>{item.value}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.label}</div>
                </div>
              ))}
            </div>

            {/* Summary bar */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {zh ? '工作日占比' : 'Weekday Ratio'}
                </span>
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                  {result.total > 0 ? Math.round((result.workdays / result.total) * 100) : 0}%
                </span>
              </div>
              <div className="h-2.5 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all"
                  style={{ width: result.total > 0 ? `${(result.workdays / result.total) * 100}%` : '0%' }}
                />
              </div>
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-right">
                {zh ? `共 ${result.total} 天` : `Total ${result.total} days`}
              </div>
            </div>
          </div>
        )}

        {/* Quick presets */}
        <div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            {zh ? '快速预设' : 'Quick Presets'}
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'thisMonth', zh: '本月', en: 'This Month' },
              { key: 'nextMonth', zh: '下月', en: 'Next Month' },
              { key: 'thisYear', zh: '今年', en: 'This Year' },
              { key: 'next30', zh: '未来30天', en: 'Next 30 Days' },
            ].map(p => (
              <button
                key={p.key}
                onClick={() => { setPreset(p.key); setTimeout(calculate, 50) }}
                className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {zh ? p.zh : p.en}
              </button>
            ))}
          </div>
        </div>
      </div>
    </ToolLayout>
  )
}

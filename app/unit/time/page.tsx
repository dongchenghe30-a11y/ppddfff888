'use client'

import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'
import { useLanguage } from '@/contexts/LanguageContext'

const units = [
  { key: 's', zhName: '秒 (s)', enName: 'Second (s)', factor: 1 },
  { key: 'min', zhName: '分钟 (min)', enName: 'Minute (min)', factor: 60 },
  { key: 'h', zhName: '小时 (h)', enName: 'Hour (h)', factor: 3600 },
  { key: 'd', zhName: '天 (d)', enName: 'Day (d)', factor: 86400 },
  { key: 'week', zhName: '周 (week)', enName: 'Week (week)', factor: 604800 },
  { key: 'month', zhName: '月 (month)', enName: 'Month (month)', factor: 2592000 },
  { key: 'year', zhName: '年 (year)', enName: 'Year (year)', factor: 31536000 },
  { key: 'ms', zhName: '毫秒 (ms)', enName: 'Millisecond (ms)', factor: 0.001 },
  { key: 'us', zhName: '微秒 (μs)', enName: 'Microsecond (μs)', factor: 0.000001 },
]

export default function TimeConverterPage() {
  const { locale } = useLanguage()
  const [value, setValue] = useState('')
  const [fromUnit, setFromUnit] = useState('h')
  const [toUnit, setToUnit] = useState('min')

  const result = (() => {
    const v = parseFloat(value)
    if (isNaN(v)) return ''
    const ff = units.find(u => u.key === fromUnit)?.factor || 1
    const tf = units.find(u => u.key === toUnit)?.factor || 1
    return String(Math.round(v * ff / tf * 1000000) / 1000000)
  })()

  const swap = () => { setFromUnit(toUnit); setToUnit(fromUnit) }

  return (
    <ToolLayout
      titleZh="时间换算" titleEn="Time Converter"
      descZh="秒、分、时、天、周、月、年等时间单位互转" descEn="Convert seconds, minutes, hours, days, weeks, months, years"
      icon="⏱️" tags={['time', 'seconds', 'hours', '时间', '单位换算']}
      introZh="时间换算支持秒、毫秒、微秒、分钟、小时、天、周、月、年等时间单位互转，是物理计算、项目管理、日程规划的必备工具。"
      introEn="Time converter supports seconds, milliseconds, microseconds, minutes, hours, days, weeks, months and years. Useful for physics calculations, project management and scheduling."
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{locale==='zh'?'输入数值':'Enter Value'}</label>
          <input type="number" value={value} onChange={e => setValue(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg" />
        </div>
        <div className="grid grid-cols-5 gap-2 items-center">
          <div className="col-span-2">
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">{locale==='zh'?'从':'From'}</label>
            <select value={fromUnit} onChange={e => setFromUnit(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
              {units.map(u => <option key={u.key} value={u.key}>{locale==='zh'?u.zhName:u.enName}</option>)}
            </select>
          </div>
          <div className="flex justify-center"><button onClick={swap} className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 transition-colors text-xl">⇄</button></div>
          <div className="col-span-2">
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">{locale==='zh'?'到':'To'}</label>
            <select value={toUnit} onChange={e => setToUnit(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
              {units.map(u => <option key={u.key} value={u.key}>{locale==='zh'?u.zhName:u.enName}</option>)}
            </select>
          </div>
        </div>
        {result && (
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-center">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">{value} {locale==='zh'?units.find(u=>u.key===fromUnit)?.zhName:units.find(u=>u.key===fromUnit)?.enName}</div>
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">= {result}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{locale==='zh'?units.find(u=>u.key===toUnit)?.zhName:units.find(u=>u.key===toUnit)?.enName}</div>
          </div>
        )}
        {value && !isNaN(parseFloat(value)) && (
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{locale==='zh'?'全部单位':'All Units'}</h3>
            <div className="grid gap-1.5">
              {units.map(u => {
                const v = parseFloat(value)
                const ff = units.find(x => x.key === fromUnit)?.factor || 1
                const res = Math.round(v * ff / u.factor * 1000000) / 1000000
                return (
                  <div key={u.key} className={`flex justify-between items-center px-3 py-1.5 rounded-lg text-sm ${u.key===toUnit?'bg-blue-100 dark:bg-blue-900/30':'bg-gray-50 dark:bg-gray-700/30'}`}>
                    <span className="text-gray-600 dark:text-gray-400">{locale==='zh'?u.zhName:u.enName}</span>
                    <span className="font-mono font-medium text-gray-900 dark:text-gray-100">{res}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}

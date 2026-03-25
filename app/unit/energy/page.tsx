'use client'

import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'
import { useLanguage } from '@/contexts/LanguageContext'

const units = [
  { key: 'J', zhName: '焦耳 (J)', enName: 'Joule (J)', factor: 1 },
  { key: 'kJ', zhName: '千焦 (kJ)', enName: 'Kilojoule (kJ)', factor: 1000 },
  { key: 'cal', zhName: '卡路里 (cal)', enName: 'Calorie (cal)', factor: 4.184 },
  { key: 'kcal', zhName: '千卡 (kcal)', enName: 'Kilocalorie (kcal)', factor: 4184 },
  { key: 'Wh', zhName: '瓦时 (Wh)', enName: 'Watt-hour (Wh)', factor: 3600 },
  { key: 'kWh', zhName: '千瓦时 (kWh)', enName: 'Kilowatt-hour (kWh)', factor: 3600000 },
  { key: 'eV', zhName: '电子伏特 (eV)', enName: 'Electronvolt (eV)', factor: 1.602e-19 },
  { key: 'BTU', zhName: '英热单位 (BTU)', enName: 'BTU (BTU)', factor: 1055.06 },
  { key: 'therm', zhName: '撒姆 (therm)', enName: 'Therm (therm)', factor: 1.055e8 },
]

export default function EnergyConverterPage() {
  const { locale } = useLanguage()
  const [value, setValue] = useState('')
  const [fromUnit, setFromUnit] = useState('kcal')
  const [toUnit, setToUnit] = useState('kJ')

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
      titleZh="能量换算" titleEn="Energy Converter"
      descZh="焦耳、卡路里、千瓦时等能量单位互转" descEn="Convert joules, calories, kilowatt-hours and more"
      icon="⚡" tags={['energy', 'joule', 'calorie', '能量', '单位换算']}
      introZh="能量换算支持焦耳(J)、千焦(kJ)、卡路里(cal)、千卡(kcal)、瓦时(Wh)、千瓦时(kWh)、BTU等常见能量单位互转，适用于营养学、物理、电力等多种场景。"
      introEn="Energy converter supports joules, kilojoules, calories, kilocalories, watt-hours, kilowatt-hours, BTU and more. Useful for nutrition, physics and electricity applications."
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
                const res = v * ff / u.factor
                const display = res < 0.0001 || res > 1e10 ? res.toExponential(4) : String(Math.round(res * 1000000) / 1000000)
                return (
                  <div key={u.key} className={`flex justify-between items-center px-3 py-1.5 rounded-lg text-sm ${u.key===toUnit?'bg-blue-100 dark:bg-blue-900/30':'bg-gray-50 dark:bg-gray-700/30'}`}>
                    <span className="text-gray-600 dark:text-gray-400">{locale==='zh'?u.zhName:u.enName}</span>
                    <span className="font-mono font-medium text-gray-900 dark:text-gray-100">{display}</span>
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

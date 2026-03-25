'use client'

import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'
import { useLanguage } from '@/contexts/LanguageContext'

const units = [
  { key: 'Pa', zhName: '帕斯卡 (Pa)', enName: 'Pascal (Pa)', factor: 1 },
  { key: 'kPa', zhName: '千帕 (kPa)', enName: 'Kilopascal (kPa)', factor: 1000 },
  { key: 'MPa', zhName: '兆帕 (MPa)', enName: 'Megapascal (MPa)', factor: 1000000 },
  { key: 'bar', zhName: '巴 (bar)', enName: 'Bar (bar)', factor: 100000 },
  { key: 'atm', zhName: '标准大气压 (atm)', enName: 'Atmosphere (atm)', factor: 101325 },
  { key: 'psi', zhName: '磅/平方英寸 (psi)', enName: 'PSI (psi)', factor: 6894.76 },
  { key: 'mmHg', zhName: '毫米汞柱 (mmHg)', enName: 'mmHg (mmHg)', factor: 133.322 },
  { key: 'torr', zhName: '托 (Torr)', enName: 'Torr (Torr)', factor: 133.322 },
]

export default function PressureConverterPage() {
  const { locale } = useLanguage()
  const [value, setValue] = useState('')
  const [fromUnit, setFromUnit] = useState('atm')
  const [toUnit, setToUnit] = useState('Pa')

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
      titleZh="压力换算" titleEn="Pressure Converter"
      descZh="帕斯卡、大气压、巴、PSI等压力单位互转" descEn="Convert Pascal, atmosphere, bar, PSI and more"
      icon="🌪️" tags={['pressure', 'pascal', 'psi', '压力', '单位换算']}
      introZh="压力换算支持帕斯卡(Pa)、千帕(kPa)、巴(bar)、标准大气压(atm)、PSI、毫米汞柱(mmHg)等常见压力单位互转，广泛应用于工程、医学、气象等领域。"
      introEn="Pressure converter supports Pascal, kilopascal, bar, atmosphere, PSI, mmHg and more. Widely used in engineering, medical and meteorological applications."
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

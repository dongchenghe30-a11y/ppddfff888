'use client'

import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'
import { useLanguage } from '@/contexts/LanguageContext'

const units = [
  { key: 'L', zhName: '升 (L)', enName: 'Liter (L)', factor: 1 },
  { key: 'mL', zhName: '毫升 (mL)', enName: 'Milliliter (mL)', factor: 0.001 },
  { key: 'm3', zhName: '立方米 (m³)', enName: 'Cubic Meter (m³)', factor: 1000 },
  { key: 'cm3', zhName: '立方厘米 (cm³)', enName: 'Cubic Centimeter (cm³)', factor: 0.001 },
  { key: 'ft3', zhName: '立方英尺 (ft³)', enName: 'Cubic Foot (ft³)', factor: 28.3168 },
  { key: 'galUS', zhName: '美制加仑 (gal)', enName: 'US Gallon (gal)', factor: 3.78541 },
  { key: 'galUK', zhName: '英制加仑 (gal)', enName: 'UK Gallon (gal)', factor: 4.54609 },
  { key: 'cup', zhName: '杯 (cup)', enName: 'Cup (cup)', factor: 0.236588 },
  { key: 'tsp', zhName: '茶匙 (tsp)', enName: 'Teaspoon (tsp)', factor: 0.00492892 },
  { key: 'tbsp', zhName: '汤匙 (tbsp)', enName: 'Tablespoon (tbsp)', factor: 0.0147868 },
]

export default function VolumeConverterPage() {
  const { locale } = useLanguage()
  const [value, setValue] = useState('')
  const [fromUnit, setFromUnit] = useState('L')
  const [toUnit, setToUnit] = useState('galUS')

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
      titleZh="体积换算" titleEn="Volume Converter"
      descZh="升、加仑、立方米、毫升等体积单位互转" descEn="Convert liters, gallons, cubic meters, milliliters and more"
      icon="🧊" tags={['volume', 'liter', 'gallon', '体积', '单位换算']}
      introZh="体积换算支持升(L)、毫升(mL)、立方米(m³)、美制加仑、英制加仑、茶匙、汤匙等常见体积单位互转，广泛用于烹饪、化学实验、工业生产等场景。"
      introEn="Volume converter supports liters, milliliters, cubic meters, US gallons, UK gallons, teaspoons, tablespoons and more. Useful for cooking, chemistry and industrial applications."
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

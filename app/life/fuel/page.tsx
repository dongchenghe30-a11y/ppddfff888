'use client'

import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'
import { useLanguage } from '@/contexts/LanguageContext'

export default function FuelCalculatorPage() {
  const { locale, t } = useLanguage()
  const [distance, setDistance] = useState('100')
  const [fuelUsed, setFuelUsed] = useState('8')
  const [fuelPrice, setFuelPrice] = useState('7.5')

  const dist = parseFloat(distance) || 0
  const fuel = parseFloat(fuelUsed) || 0
  const price = parseFloat(fuelPrice) || 0

  const consumption = dist > 0 ? (fuel / dist * 100) : 0
  const totalCost = fuel * price
  const costPerKm = dist > 0 ? totalCost / dist : 0
  const costPerHundredKm = dist > 0 ? (fuel / dist * 100) * price : 0

  return (
    <ToolLayout
      titleZh={t.life.fuel.title} titleEn="Fuel Cost Calculator"
      descZh={t.life.fuel.desc} descEn="Calculate fuel consumption and cost per kilometer"
      icon="⛽" tags={['fuel', 'car', 'cost', '油耗', '汽车']}
      introZh="油耗计算器帮助您计算每次行程的实际油耗（升/百公里）、总油费和每公里费用。输入行驶距离、实际加油量和当前油价，即可得出精确的燃油效率数据。"
      introEn="The fuel cost calculator helps you calculate actual fuel consumption (L/100km), total fuel cost and cost per kilometer for each trip."
    >
      <div className="space-y-5">
        {[
          { label: t.life.fuel.distance, value: distance, set: setDistance, unit: 'km' },
          { label: t.life.fuel.fuelUsed, value: fuelUsed, set: setFuelUsed, unit: 'L' },
          { label: t.life.fuel.fuelPrice, value: fuelPrice, set: setFuelPrice, unit: locale==='zh'?'元/L':'¥/L' },
        ].map(f => (
          <div key={f.label}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{f.label}</label>
            <div className="flex items-center gap-2">
              <input type="number" value={f.value} onChange={e => f.set(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg" />
              <span className="text-sm text-gray-500 dark:text-gray-400 w-16 text-center">{f.unit}</span>
            </div>
          </div>
        ))}
        <div className="grid grid-cols-2 gap-3 pt-2">
          {[
            { label: t.life.fuel.fuelConsumption, value: `${consumption.toFixed(2)} L/100km`, bg: 'bg-blue-50 dark:bg-blue-900/20', color: 'text-blue-700 dark:text-blue-300' },
            { label: t.life.fuel.totalCost, value: `¥${totalCost.toFixed(2)}`, bg: 'bg-orange-50 dark:bg-orange-900/20', color: 'text-orange-700 dark:text-orange-300' },
            { label: t.life.fuel.costPerKm, value: `¥${costPerKm.toFixed(3)}/km`, bg: 'bg-green-50 dark:bg-green-900/20', color: 'text-green-700 dark:text-green-300' },
            { label: locale==='zh'?'百公里油费':'Cost/100km', value: `¥${costPerHundredKm.toFixed(2)}/100km`, bg: 'bg-purple-50 dark:bg-purple-900/20', color: 'text-purple-700 dark:text-purple-300' },
          ].map(r => (
            <div key={r.label} className={`${r.bg} rounded-xl p-4 text-center`}>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{r.label}</div>
              <div className={`text-lg font-bold ${r.color}`}>{r.value}</div>
            </div>
          ))}
        </div>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4 text-sm text-yellow-800 dark:text-yellow-200">
          💡 {locale==='zh' ? `该车辆油耗评级：${consumption < 6 ? '省油 🟢' : consumption < 9 ? '正常 🟡' : '偏高 🔴'}（${consumption.toFixed(1)} L/100km）` : `Fuel efficiency rating: ${consumption < 6 ? 'Excellent 🟢' : consumption < 9 ? 'Average 🟡' : 'High 🔴'} (${consumption.toFixed(1)} L/100km)`}
        </div>
      </div>
    </ToolLayout>
  )
}

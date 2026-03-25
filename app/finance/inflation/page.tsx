'use client'

import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'
import { useLanguage } from '@/contexts/LanguageContext'

export default function InflationCalculatorPage() {
  const { locale, t } = useLanguage()
  const [amount, setAmount] = useState('10000')
  const [rate, setRate] = useState('3')
  const [years, setYears] = useState('10')

  const A = parseFloat(amount) || 0
  const r = parseFloat(rate) / 100
  const n = parseFloat(years) || 1
  const futureValue = A * Math.pow(1 + r, n)
  const realValue = A / Math.pow(1 + r, n)
  const loss = A - realValue
  const lossPct = A > 0 ? (loss / A * 100) : 0

  return (
    <ToolLayout
      titleZh={t.finance.inflation.title} titleEn="Inflation Calculator"
      descZh={t.finance.inflation.desc} descEn="Calculate the future value and real purchasing power after inflation"
      icon="📉" tags={['inflation', 'money', 'purchasing power', '通货膨胀', '购买力']}
      introZh="通货膨胀是货币购买力随时间下降的现象。本计算器帮助您了解：当前¥10000，在年通胀率3%的情况下，10年后需要多少钱才能维持相同的购买力？"
      introEn="Inflation is the decline of purchasing power over time. This calculator shows how much money you'll need in the future to maintain the same purchasing power as today."
    >
      <div className="space-y-5">
        {[
          { label: `${t.finance.inflation.currentAmount} (¥)`, value: amount, set: setAmount },
          { label: t.finance.inflation.inflationRate, value: rate, set: setRate },
          { label: t.finance.inflation.years, value: years, set: setYears },
        ].map(f => (
          <div key={f.label}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{f.label}</label>
            <input type="number" value={f.value} onChange={e => f.set(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg" />
          </div>
        ))}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: t.finance.inflation.futureValue, value: `¥${futureValue.toFixed(2)}`, hint: locale==='zh'?`${n}年后相同购买力需要`:`Need in ${n} years`, color: 'text-orange-700 dark:text-orange-300', bg: 'bg-orange-50 dark:bg-orange-900/20' },
            { label: t.finance.inflation.realValue, value: `¥${realValue.toFixed(2)}`, hint: locale==='zh'?`现在¥${A}在${n}年后等效`:`Value of ¥${A} in ${n} years`, color: 'text-blue-700 dark:text-blue-300', bg: 'bg-blue-50 dark:bg-blue-900/20' },
            { label: t.finance.inflation.purchasePowerLoss, value: `¥${loss.toFixed(2)}`, hint: locale==='zh'?'购买力损失金额':'Purchasing power lost', color: 'text-red-700 dark:text-red-300', bg: 'bg-red-50 dark:bg-red-900/20' },
            { label: locale==='zh'?'购买力损失率':'Power Loss Rate', value: `${lossPct.toFixed(1)}%`, hint: locale==='zh'?`${n}年贬值比例`:`Devaluation over ${n} years`, color: 'text-purple-700 dark:text-purple-300', bg: 'bg-purple-50 dark:bg-purple-900/20' },
          ].map(r => (
            <div key={r.label} className={`${r.bg} rounded-xl p-4 text-center`}>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{r.label}</div>
              <div className={`text-xl font-bold ${r.color}`}>{r.value}</div>
              <div className="text-xs text-gray-400 mt-1">{r.hint}</div>
            </div>
          ))}
        </div>
      </div>
    </ToolLayout>
  )
}

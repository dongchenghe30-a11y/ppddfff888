'use client'

import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'
import { useLanguage } from '@/contexts/LanguageContext'

export default function TipCalculatorPage() {
  const { t } = useLanguage()
  const [bill, setBill] = useState('100')
  const [tip, setTip] = useState('15')
  const [people, setPeople] = useState('2')

  const billAmt = parseFloat(bill) || 0
  const tipPct = parseFloat(tip) || 0
  const numPeople = parseInt(people) || 1
  const tipAmt = billAmt * tipPct / 100
  const total = billAmt + tipAmt
  const perPerson = total / numPeople

  const presets = [10, 15, 18, 20, 25]

  return (
    <ToolLayout
      titleZh={t.life.tip.title} titleEn="Tip Calculator"
      descZh={t.life.tip.desc} descEn="Calculate restaurant tips and split the bill among multiple people"
      icon="🍽️" tags={['tip', 'restaurant', 'bill', '小费', '餐厅']}
      introZh="小费计算器帮助您快速计算餐厅、酒店等场所的小费金额，并支持多人平摊账单。输入账单金额和小费比例，立即得出每人应付金额。"
      introEn="The tip calculator helps you quickly calculate tips at restaurants, hotels and more. Enter the bill amount and tip percentage to instantly get the amount per person."
    >
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t.life.tip.billAmount}</label>
          <input type="number" value={bill} onChange={e => setBill(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t.life.tip.tipPercent}</label>
          <div className="flex gap-2 flex-wrap mb-2">
            {presets.map(p => (
              <button key={p} onClick={() => setTip(String(p))}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${tip === String(p) ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20'}`}
              >{p}%</button>
            ))}
          </div>
          <input type="number" value={tip} onChange={e => setTip(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t.life.tip.people}</label>
          <div className="flex items-center gap-3">
            <button onClick={() => setPeople(String(Math.max(1, numPeople - 1)))} className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center">-</button>
            <span className="text-xl font-bold text-gray-900 dark:text-white w-8 text-center">{numPeople}</span>
            <button onClick={() => setPeople(String(numPeople + 1))} className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xl font-bold hover:bg-blue-200 transition-colors flex items-center justify-center">+</button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 pt-2">
          {[
            { label: t.life.tip.tipAmount, value: `¥${tipAmt.toFixed(2)}`, color: 'text-orange-700 dark:text-orange-300', bg: 'bg-orange-50 dark:bg-orange-900/20' },
            { label: t.life.tip.totalAmount, value: `¥${total.toFixed(2)}`, color: 'text-blue-700 dark:text-blue-300', bg: 'bg-blue-50 dark:bg-blue-900/20' },
            { label: t.life.tip.perPerson, value: `¥${perPerson.toFixed(2)}`, color: 'text-green-700 dark:text-green-300', bg: 'bg-green-50 dark:bg-green-900/20' },
          ].map(r => (
            <div key={r.label} className={`${r.bg} rounded-xl p-3 text-center`}>
              <div className="text-xs text-gray-500 dark:text-gray-400">{r.label}</div>
              <div className={`text-lg font-bold mt-1 ${r.color}`}>{r.value}</div>
            </div>
          ))}
        </div>
      </div>
    </ToolLayout>
  )
}

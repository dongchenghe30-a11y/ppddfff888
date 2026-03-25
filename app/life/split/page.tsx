'use client'

import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'
import { useLanguage } from '@/contexts/LanguageContext'

export default function SplitCalculatorPage() {
  const { locale, t } = useLanguage()
  const [total, setTotal] = useState('300')
  const [people, setPeople] = useState('3')
  const [names, setNames] = useState<string[]>(['', '', ''])

  const totalAmt = parseFloat(total) || 0
  const numPeople = Math.max(1, parseInt(people) || 1)
  const perPerson = totalAmt / numPeople

  const handlePeopleChange = (v: string) => {
    const n = Math.max(1, parseInt(v) || 1)
    setPeople(String(n))
    setNames(prev => {
      if (n > prev.length) return [...prev, ...Array(n - prev.length).fill('')]
      return prev.slice(0, n)
    })
  }

  return (
    <ToolLayout
      titleZh={t.life.split.title} titleEn="Bill Splitter"
      descZh={t.life.split.desc} descEn="Split bills evenly or by custom amount among multiple people"
      icon="👥" tags={['split', 'aa', 'bill', '分摊', 'AA制']}
      introZh="分摊计算器支持AA制费用分摊，输入总金额和人数，立即计算每人应付金额。还可以为每个人设置名称，方便识别。"
      introEn="The bill splitter supports AA-style bill splitting. Enter the total amount and number of people to instantly calculate each person's share."
    >
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t.life.split.totalAmount}</label>
          <input type="number" value={total} onChange={e => setTotal(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl font-bold" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t.life.split.numPeople}</label>
          <div className="flex items-center gap-4">
            <button onClick={() => handlePeopleChange(String(numPeople - 1))} className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 text-xl font-bold hover:bg-gray-200 transition-colors flex items-center justify-center">-</button>
            <span className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 w-12 text-center">{numPeople}</span>
            <button onClick={() => handlePeopleChange(String(numPeople + 1))} className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xl font-bold hover:bg-blue-200 transition-colors flex items-center justify-center">+</button>
          </div>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-center">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">{t.life.split.perPersonAmount}</div>
          <div className="text-4xl font-extrabold text-blue-700 dark:text-blue-300">¥{perPerson.toFixed(2)}</div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">{locale==='zh'?'人员明细':'People Breakdown'}</p>
          <div className="space-y-2">
            {Array.from({ length: numPeople }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-2.5">
                <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold flex items-center justify-center shrink-0">{i+1}</div>
                <input type="text" placeholder={locale==='zh'?`人员 ${i+1}`:`Person ${i+1}`} value={names[i] || ''} onChange={e => { const n = [...names]; n[i] = e.target.value; setNames(n) }}
                  className="flex-1 bg-transparent text-sm text-gray-700 dark:text-gray-300 outline-none" />
                <span className="font-bold text-gray-900 dark:text-white">¥{perPerson.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToolLayout>
  )
}

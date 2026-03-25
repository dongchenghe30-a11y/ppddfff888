'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import ToolLayout from '@/components/ToolLayout'

export default function CompoundInterestPage() {
  const { locale, t } = useLanguage()
  const [principal, setPrincipal] = useState('')
  const [rate, setRate] = useState('')
  const [years, setYears] = useState('')
  const [freq, setFreq] = useState('12')
  const [result, setResult] = useState<{ final: number; interest: number; multiple: number; chart: { year: number; amount: number }[] } | null>(null)

  const calculate = () => {
    const P = parseFloat(principal)
    const r = parseFloat(rate) / 100
    const t2 = parseInt(years)
    const n = parseInt(freq)
    if (!P || !r || !t2) return
    const final = P * Math.pow(1 + r / n, n * t2)
    const chart = Array.from({ length: t2 }, (_, i) => ({
      year: i + 1,
      amount: P * Math.pow(1 + r / n, n * (i + 1)),
    }))
    setResult({ final, interest: final - P, multiple: final / P, chart })
  }

  const fmt = (n: number) => n.toLocaleString('en-US', { maximumFractionDigits: 2 })

  const freqOptions = [
    { value: '1', zh: '每年', en: 'Annually' },
    { value: '2', zh: '每半年', en: 'Semi-annually' },
    { value: '4', zh: '每季度', en: 'Quarterly' },
    { value: '12', zh: '每月', en: 'Monthly' },
    { value: '365', zh: '每天', en: 'Daily' },
  ]

  return (
    <ToolLayout
      titleZh="复利计算器"
      titleEn="Compound Interest Calculator"
      descZh="计算投资复利增长，直观展示长期投资的惊人威力"
      descEn="Calculate compound interest growth and see the remarkable power of long-term investing"
      icon="📈"
      tags={['compound interest', 'investment', 'savings', '复利', '投资', '理财']}
      introZh="复利被称为'世界第八大奇迹'——利息再生利息，让财富呈指数级增长。本工具帮助你直观感受复利效应，合理规划长期投资。"
      introEn="Compound interest is called the 'eighth wonder of the world' — interest earns interest, growing wealth exponentially. This tool helps you visualize the compound effect and plan long-term investments."
      faqZh={[
        { q: '复利频率越高越好吗？', a: '理论上复利频率越高（如每日复利）最终金额略高于年复利，但差距随时间增大。重要的是尽早开始投资。' },
        { q: '如何理解72法则？', a: '72除以年利率≈本金翻倍所需年数。例如年利率8%，约需72÷8=9年翻倍。' },
      ]}
      faqEn={[
        { q: 'Is higher compound frequency better?', a: 'In theory, higher frequency (like daily compounding) yields slightly more than annual compounding, with the difference growing over time. But starting early is what matters most.' },
        { q: 'What is the Rule of 72?', a: '72 divided by the annual interest rate ≈ years needed to double your money. E.g., at 8% annual rate, 72÷8=9 years to double.' },
      ]}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t.finance.compound.principal}</label>
          <input type="number" value={principal} onChange={e => setPrincipal(e.target.value)} placeholder="e.g. 100000"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t.finance.compound.annualRate}</label>
            <input type="number" step="0.1" value={rate} onChange={e => setRate(e.target.value)} placeholder="e.g. 8"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t.finance.compound.years}</label>
            <input type="number" value={years} onChange={e => setYears(e.target.value)} placeholder="e.g. 10"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t.finance.compound.compoundFreq}</label>
          <select value={freq} onChange={e => setFreq(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            {freqOptions.map(o => <option key={o.value} value={o.value}>{locale === 'zh' ? o.zh : o.en}</option>)}
          </select>
        </div>
        <button onClick={calculate} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors">
          {t.common.calculate}
        </button>

        {result && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: t.finance.compound.finalAmount, value: fmt(result.final), color: 'text-blue-600' },
                { label: t.finance.compound.totalInterest, value: fmt(result.interest), color: 'text-green-600' },
                { label: t.finance.compound.growthMultiple, value: result.multiple.toFixed(2) + 'x', color: 'text-purple-600' },
              ].map(item => (
                <div key={item.label} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3 text-center">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{item.label}</div>
                  <div className={`text-lg font-bold ${item.color}`}>{item.value}</div>
                </div>
              ))}
            </div>

            {/* Visual chart */}
            <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">{locale === 'zh' ? '增长趋势' : 'Growth Trend'}</h3>
              <div className="flex items-end gap-1 h-32">
                {result.chart.map((d, i) => {
                  const maxAmount = result.chart[result.chart.length - 1].amount
                  const pct = (d.amount / maxAmount) * 100
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full bg-blue-500 dark:bg-blue-600 rounded-t transition-all hover:bg-blue-600 dark:hover:bg-blue-500 relative group"
                        style={{ height: `${pct}%` }}>
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-10">
                          {fmt(d.amount)}
                        </div>
                      </div>
                      {(i + 1) % Math.ceil(result.chart.length / 5) === 0 && (
                        <span className="text-xs text-gray-400">{d.year}y</span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}

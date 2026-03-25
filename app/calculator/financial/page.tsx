'use client'

import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'
import { useLanguage } from '@/contexts/LanguageContext'

export default function FinancialCalcPage() {
  const { locale } = useLanguage()
  const [mode, setMode] = useState<'loan'|'compound'|'roi'>('loan')
  // Loan
  const [principal, setPrincipal] = useState('100000')
  const [rate, setRate] = useState('4.5')
  const [months, setMonths] = useState('120')
  // Compound
  const [cPrincipal, setCPrincipal] = useState('10000')
  const [cRate, setCRate] = useState('7')
  const [cYears, setCYears] = useState('10')
  // ROI
  const [invest, setInvest] = useState('10000')
  const [returnAmt, setReturnAmt] = useState('15000')

  const loanMonthly = (() => {
    const P = parseFloat(principal), r = parseFloat(rate) / 100 / 12, n = parseInt(months)
    if (!P || !r || !n) return 0
    return P * r * Math.pow(1+r,n) / (Math.pow(1+r,n)-1)
  })()
  const totalPay = loanMonthly * parseInt(months||'0')
  const totalInterest = totalPay - parseFloat(principal||'0')

  const compoundFinal = (() => {
    const P = parseFloat(cPrincipal), r = parseFloat(cRate)/100, n = parseInt(cYears)
    if (!P || !r || !n) return 0
    return P * Math.pow(1+r, n)
  })()

  const roi = (() => {
    const i = parseFloat(invest), r = parseFloat(returnAmt)
    if (!i) return 0
    return (r - i) / i * 100
  })()

  const modes = [
    { key: 'loan', zh: '贷款月供', en: 'Loan Payment' },
    { key: 'compound', zh: '复利计算', en: 'Compound Interest' },
    { key: 'roi', zh: '投资回报', en: 'ROI' },
  ]

  return (
    <ToolLayout
      titleZh="财务计算器" titleEn="Financial Calculator"
      descZh="快速计算贷款月供、复利增长、投资回报率等财务数值" descEn="Calculate loan payments, compound interest, and ROI"
      icon="💰" tags={['finance', 'loan', 'compound', '贷款', '复利', '财务']}
      introZh="财务计算器集成了三种最常用的财务计算场景：贷款月供计算（等额本息）、复利增长计算、投资回报率(ROI)计算。帮助您快速做出理财决策。"
      introEn="Financial calculator integrates three most common financial scenarios: loan monthly payment (equal installment), compound interest growth, and ROI calculation."
    >
      <div className="space-y-5">
        <div className="flex gap-2 flex-wrap">
          {modes.map(m => (
            <button key={m.key} onClick={() => setMode(m.key as typeof mode)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${mode === m.key ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-50'}`}
            >{locale === 'zh' ? m.zh : m.en}</button>
          ))}
        </div>

        {mode === 'loan' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: locale==='zh'?'贷款本金 (元)':'Principal', value: principal, set: setPrincipal },
                { label: locale==='zh'?'年利率 (%)':'Annual Rate (%)', value: rate, set: setRate },
                { label: locale==='zh'?'还款月数':'Months', value: months, set: setMonths },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">{f.label}</label>
                  <input type="number" value={f.value} onChange={e => f.set(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: locale==='zh'?'月供':'Monthly', value: `¥${loanMonthly.toFixed(2)}` },
                { label: locale==='zh'?'总利息':'Total Interest', value: `¥${totalInterest.toFixed(2)}` },
                { label: locale==='zh'?'还款总额':'Total Payment', value: `¥${totalPay.toFixed(2)}` },
              ].map(r => (
                <div key={r.label} className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 text-center">
                  <div className="text-xs text-gray-500 dark:text-gray-400">{r.label}</div>
                  <div className="text-lg font-bold text-blue-700 dark:text-blue-300 mt-1">{r.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {mode === 'compound' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: locale==='zh'?'初始本金 (元)':'Principal', value: cPrincipal, set: setCPrincipal },
                { label: locale==='zh'?'年利率 (%)':'Annual Rate (%)', value: cRate, set: setCRate },
                { label: locale==='zh'?'投资年限 (年)':'Years', value: cYears, set: setCYears },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">{f.label}</label>
                  <input type="number" value={f.value} onChange={e => f.set(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: locale==='zh'?'最终金额':'Final Amount', value: `¥${compoundFinal.toFixed(2)}` },
                { label: locale==='zh'?'净收益':'Net Gain', value: `¥${(compoundFinal-parseFloat(cPrincipal||'0')).toFixed(2)}` },
                { label: locale==='zh'?'增长倍数':'Growth', value: `${(compoundFinal/parseFloat(cPrincipal||'1')).toFixed(2)}x` },
              ].map(r => (
                <div key={r.label} className="bg-green-50 dark:bg-green-900/20 rounded-xl p-3 text-center">
                  <div className="text-xs text-gray-500 dark:text-gray-400">{r.label}</div>
                  <div className="text-lg font-bold text-green-700 dark:text-green-300 mt-1">{r.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {mode === 'roi' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: locale==='zh'?'投资金额 (元)':'Investment Amount', value: invest, set: setInvest },
                { label: locale==='zh'?'回报金额 (元)':'Return Amount', value: returnAmt, set: setReturnAmt },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">{f.label}</label>
                  <input type="number" value={f.value} onChange={e => f.set(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'ROI', value: `${roi.toFixed(2)}%`, color: roi >= 0 ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300', bg: roi >= 0 ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20' },
                { label: locale==='zh'?'净利润':'Net Profit', value: `¥${(parseFloat(returnAmt||'0')-parseFloat(invest||'0')).toFixed(2)}`, color: 'text-blue-700 dark:text-blue-300', bg: 'bg-blue-50 dark:bg-blue-900/20' },
                { label: locale==='zh'?'投资金额':'Investment', value: `¥${parseFloat(invest||'0').toFixed(2)}`, color: 'text-gray-700 dark:text-gray-300', bg: 'bg-gray-50 dark:bg-gray-800' },
              ].map(r => (
                <div key={r.label} className={`${r.bg} rounded-xl p-3 text-center`}>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{r.label}</div>
                  <div className={`text-lg font-bold mt-1 ${r.color}`}>{r.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}

'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import ToolLayout from '@/components/ToolLayout'

export default function LoanCalculatorPage() {
  const { locale, t } = useLanguage()
  const [principal, setPrincipal] = useState('')
  const [rate, setRate] = useState('')
  const [months, setMonths] = useState('')
  const [type, setType] = useState<'equal' | 'principal'>('equal')
  const [result, setResult] = useState<{monthly: number; totalInterest: number; total: number; schedule: {month: number; payment: number; principal: number; interest: number; balance: number}[]} | null>(null)

  const calculate = () => {
    const P = parseFloat(principal)
    const r = parseFloat(rate) / 100 / 12
    const n = parseInt(months)
    if (!P || !r || !n) return

    if (type === 'equal') {
      const monthly = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
      const total = monthly * n
      const totalInterest = total - P
      const schedule = Array.from({ length: Math.min(n, 12) }, (_, i) => {
        const interest = P * r * Math.pow(1 + r, i) - (monthly * (Math.pow(1 + r, i) - 1)) > 0
          ? (P - (monthly - P * r) * (Math.pow(1 + r, i) - 1) / r) * r
          : 0
        const principalPaid = monthly - interest
        const balance = P - principalPaid * (i + 1)
        return { month: i + 1, payment: monthly, principal: principalPaid, interest, balance: Math.max(0, balance) }
      })
      setResult({ monthly, totalInterest, total, schedule })
    } else {
      const monthlyPrincipal = P / n
      const schedule = Array.from({ length: Math.min(n, 12) }, (_, i) => {
        const remaining = P - monthlyPrincipal * i
        const interest = remaining * r
        const payment = monthlyPrincipal + interest
        return { month: i + 1, payment, principal: monthlyPrincipal, interest, balance: remaining - monthlyPrincipal }
      })
      const totalInterest = Array.from({ length: n }, (_, i) => (P - monthlyPrincipal * i) * r).reduce((a, b) => a + b, 0)
      setResult({ monthly: schedule[0]?.payment || 0, totalInterest, total: P + totalInterest, schedule })
    }
  }

  const fmt = (n: number) => n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  return (
    <ToolLayout
      titleZh="贷款计算器"
      titleEn="Loan Calculator"
      descZh="精确计算贷款月供、总利息，提供完整还款计划表"
      descEn="Accurately calculate loan payments, total interest, and provide a complete repayment schedule"
      icon="🏦"
      tags={['loan', 'mortgage', 'interest', '贷款', '月供', '利率']}
      introZh="贷款计算器支持等额本息（每月还款金额固定）和等额本金（每月偿还相同本金）两种还款方式，帮助您在申请贷款前做出最优决策。"
      introEn="The loan calculator supports both equal installment (fixed monthly payment) and equal principal (fixed monthly principal repayment) methods to help you make the best decision before applying for a loan."
      useCaseZh={`• 购房贷款月供计算\n• 购车分期还款规划\n• 比较不同贷款方案\n• 了解总利息负担`}
      useCaseEn={`• Home mortgage payment calculation\n• Car loan installment planning\n• Comparing different loan options\n• Understanding total interest burden`}
      faqZh={[
        { q: '等额本息和等额本金哪个划算？', a: '等额本金总利息较少，但前期月供较高；等额本息月供固定，便于财务规划。收入较高建议等额本金，收入一般建议等额本息。' },
        { q: '提前还款有什么影响？', a: '提前还款可以减少总利息，但部分贷款有违约金。建议还款前咨询银行了解相关条款。' },
      ]}
      faqEn={[
        { q: 'Which is better: equal installment or equal principal?', a: 'Equal principal has lower total interest but higher initial payments. Equal installment has fixed payments which is easier for financial planning. Higher earners may prefer equal principal.' },
        { q: 'What happens if I repay early?', a: 'Early repayment reduces total interest, but some loans have prepayment penalties. Consult your bank for specific terms before repaying early.' },
      ]}
    >
      <div className="space-y-5">
        {/* Inputs */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t.finance.loan.principal}</label>
          <input type="number" value={principal} onChange={e => setPrincipal(e.target.value)} placeholder="e.g. 1000000"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t.finance.loan.annualRate}</label>
            <input type="number" step="0.01" value={rate} onChange={e => setRate(e.target.value)} placeholder="e.g. 4.5"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t.finance.loan.months}</label>
            <input type="number" value={months} onChange={e => setMonths(e.target.value)} placeholder="e.g. 360"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>

        {/* Type */}
        <div className="flex rounded-xl border border-gray-300 dark:border-gray-600 overflow-hidden">
          <button onClick={() => setType('equal')}
            className={`flex-1 py-2.5 text-sm font-medium transition-colors ${type === 'equal' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'}`}
          >{t.finance.loan.equalInstallment}</button>
          <button onClick={() => setType('principal')}
            className={`flex-1 py-2.5 text-sm font-medium transition-colors ${type === 'principal' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'}`}
          >{t.finance.loan.equalPrincipal}</button>
        </div>

        <button onClick={calculate} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors">
          {t.common.calculate}
        </button>

        {result && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: t.finance.loan.monthlyPayment, value: fmt(result.monthly), color: 'text-blue-600' },
                { label: t.finance.loan.totalInterest, value: fmt(result.totalInterest), color: 'text-red-500' },
                { label: t.finance.loan.totalAmount, value: fmt(result.total), color: 'text-gray-900 dark:text-gray-100' },
              ].map(item => (
                <div key={item.label} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3 text-center">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{item.label}</div>
                  <div className={`text-lg font-bold ${item.color}`}>{item.value}</div>
                </div>
              ))}
            </div>

            {/* Schedule */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{t.finance.loan.paymentSchedule} ({locale === 'zh' ? '前12期' : 'First 12 months'})</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700">
                      {[t.finance.loan.month, t.finance.loan.payment, t.finance.loan.principal2, t.finance.loan.interest, t.finance.loan.balance].map(h => (
                        <th key={h} className="px-2 py-2 text-left text-gray-600 dark:text-gray-400 font-medium">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.schedule.map(row => (
                      <tr key={row.month} className="border-b border-gray-100 dark:border-gray-700">
                        <td className="px-2 py-1.5 text-gray-700 dark:text-gray-300">{row.month}</td>
                        <td className="px-2 py-1.5 text-blue-600 dark:text-blue-400">{fmt(row.payment)}</td>
                        <td className="px-2 py-1.5 text-gray-700 dark:text-gray-300">{fmt(row.principal)}</td>
                        <td className="px-2 py-1.5 text-red-500">{fmt(row.interest)}</td>
                        <td className="px-2 py-1.5 text-gray-700 dark:text-gray-300">{fmt(row.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}

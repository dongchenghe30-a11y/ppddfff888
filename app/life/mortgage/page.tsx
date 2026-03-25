'use client'

import { useState, useMemo } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import ToolLayout from '@/components/ToolLayout'

interface MonthlyRow {
  month: number
  payment: number
  principal: number
  interest: number
  balance: number
}

export default function MortgagePage() {
  const { locale } = useLanguage()
  const zh = locale === 'zh'

  const [loanAmount, setLoanAmount] = useState('')
  const [annualRate, setAnnualRate] = useState('')
  const [loanYears, setLoanYears] = useState('')
  const [payType, setPayType] = useState<'equal' | 'principal'>('equal')
  const [showSchedule, setShowSchedule] = useState(false)
  const [calculated, setCalculated] = useState(false)

  const inputs = useMemo(() => {
    const amount = parseFloat(loanAmount)
    const rate = parseFloat(annualRate) / 100 / 12
    const months = parseInt(loanYears) * 12
    return { amount, rate, months }
  }, [loanAmount, annualRate, loanYears])

  const result = useMemo(() => {
    if (!calculated) return null
    const { amount, rate, months } = inputs
    if (!amount || !rate || !months || amount <= 0 || rate <= 0 || months <= 0) return null

    if (payType === 'equal') {
      // Equal payment (等额还款)
      const monthlyPayment = (amount * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1)
      const totalPayment = monthlyPayment * months
      const totalInterest = totalPayment - amount

      const schedule: MonthlyRow[] = []
      let balance = amount
      for (let m = 1; m <= months; m++) {
        const interest = balance * rate
        const principal = monthlyPayment - interest
        balance -= principal
        schedule.push({ month: m, payment: monthlyPayment, principal, interest, balance: Math.max(0, balance) })
      }

      return {
        monthlyPayment,
        totalPayment,
        totalInterest,
        firstMonthInterest: schedule[0].interest,
        schedule,
      }
    } else {
      // Equal principal (等额本金)
      const principalPerMonth = amount / months
      let totalInterest = 0
      const schedule: MonthlyRow[] = []
      let balance = amount
      for (let m = 1; m <= months; m++) {
        const interest = balance * rate
        const payment = principalPerMonth + interest
        totalInterest += interest
        balance -= principalPerMonth
        schedule.push({ month: m, payment, principal: principalPerMonth, interest, balance: Math.max(0, balance) })
      }
      return {
        monthlyPayment: schedule[0].payment,
        totalPayment: amount + totalInterest,
        totalInterest,
        firstMonthInterest: schedule[0].interest,
        schedule,
      }
    }
  }, [calculated, inputs, payType])

  const fmt = (n: number) => n.toLocaleString(zh ? 'zh-CN' : 'en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  return (
    <ToolLayout
      titleZh="房贷计算器"
      titleEn="Mortgage Calculator"
      descZh="计算房贷月供、总利息、还款总额，支持等额还款和等额本金两种方式"
      descEn="Calculate monthly mortgage payments, total interest, and total repayment. Supports both equal payment and equal principal methods."
      icon="🏠"
      tags={['mortgage calculator', 'home loan', '房贷计算', '月供计算', '贷款利率']}
      introZh="房贷计算器支持两种常见还款方式：等额还款（每月还相同金额，前期利息高）和等额本金（每月本金相同，利息递减，总利息更少）。根据贷款金额、年利率和年限，精确计算月供和还款计划。"
      introEn="The mortgage calculator supports two common repayment methods: Equal Payment (fixed monthly amount, more interest early on) and Equal Principal (fixed principal each month, decreasing interest, less total interest). Get precise monthly payments and full amortization schedules."
      useCaseZh={`• 购房前评估自己的还款能力\n• 比较不同贷款年限的总成本差异\n• 了解等额还款与等额本金的优劣\n• 提前还款决策参考`}
      useCaseEn={`• Assess your repayment capacity before buying a home\n• Compare total costs across different loan terms\n• Understand the pros and cons of each repayment method\n• Inform early repayment decisions`}
      faqZh={[
        { q: '等额还款和等额本金哪个更合算？', a: '等额本金总利息更少（因为本金还得更快），但前期月供较高。等额还款每月固定，压力均匀，适合收入稳定的家庭。' },
        { q: '贷款利率如何填写？', a: '填写年利率即可，例如中国商业贷款基准利率 3.95%，则填 3.95。计算器会自动换算为月利率。' },
      ]}
      faqEn={[
        { q: 'Which method saves more money?', a: 'Equal Principal pays less total interest since you pay off principal faster, but early monthly payments are higher. Equal Payment offers consistent, predictable payments — better for fixed-income households.' },
        { q: 'How do I enter the interest rate?', a: 'Enter the annual interest rate (e.g., 3.95 for 3.95%). The calculator automatically converts it to a monthly rate.' },
      ]}
    >
      <div className="space-y-5">
        {/* Repayment type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {zh ? '还款方式' : 'Repayment Method'}
          </label>
          <div className="grid grid-cols-2 gap-3">
            {([
              { key: 'equal', zh: '等额还款', en: 'Equal Payment', desc: zh ? '每月还相同金额' : 'Fixed monthly amount' },
              { key: 'principal', zh: '等额本金', en: 'Equal Principal', desc: zh ? '每月本金相同，利息递减' : 'Fixed principal, decreasing interest' },
            ] as const).map(opt => (
              <button
                key={opt.key}
                onClick={() => { setPayType(opt.key); setCalculated(false) }}
                className={`p-3 rounded-xl border-2 text-left transition-colors ${payType === opt.key ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-600 hover:border-blue-200'}`}
              >
                <div className={`text-sm font-semibold ${payType === opt.key ? 'text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'}`}>
                  {zh ? opt.zh : opt.en}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{opt.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: zh ? '贷款金额 (元)' : 'Loan Amount (¥)', value: loanAmount, set: setLoanAmount, placeholder: '1000000' },
            { label: zh ? '年利率 (%)' : 'Annual Rate (%)', value: annualRate, set: setAnnualRate, placeholder: '3.95' },
            { label: zh ? '贷款年限 (年)' : 'Loan Term (years)', value: loanYears, set: setLoanYears, placeholder: '30' },
          ].map(f => (
            <div key={f.label}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{f.label}</label>
              <input
                type="number"
                value={f.value}
                onChange={e => { f.set(e.target.value); setCalculated(false) }}
                placeholder={f.placeholder}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>

        {/* Quick presets */}
        <div className="flex flex-wrap gap-2">
          {[
            { zh: '100万/20年', en: '¥1M / 20yr', amount: '1000000', rate: '3.95', years: '20' },
            { zh: '200万/30年', en: '¥2M / 30yr', amount: '2000000', rate: '3.95', years: '30' },
            { zh: '50万/10年', en: '¥500K / 10yr', amount: '500000', rate: '3.95', years: '10' },
          ].map(p => (
            <button
              key={p.zh}
              onClick={() => { setLoanAmount(p.amount); setAnnualRate(p.rate); setLoanYears(p.years); setCalculated(false) }}
              className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {zh ? p.zh : p.en}
            </button>
          ))}
        </div>

        <button
          onClick={() => setCalculated(true)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors"
        >
          {zh ? '计算月供' : 'Calculate Payment'}
        </button>

        {/* Results */}
        {result && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: payType === 'equal' ? (zh ? '月供' : 'Monthly Payment') : (zh ? '首月月供' : '1st Month Payment'), value: fmt(result.monthlyPayment), icon: '💳', color: 'blue' },
                { label: zh ? '总利息' : 'Total Interest', value: fmt(result.totalInterest), icon: '📊', color: 'orange' },
                { label: zh ? '还款总额' : 'Total Payment', value: fmt(result.totalPayment), icon: '💰', color: 'green' },
              ].map(item => (
                <div key={item.label} className={`bg-${item.color}-50 dark:bg-${item.color}-900/20 rounded-xl p-4 text-center`}>
                  <div className="text-xl mb-1">{item.icon}</div>
                  <div className={`text-lg font-bold text-${item.color}-700 dark:text-${item.color}-300 break-all`}>
                    {zh ? '¥' : '¥'}{item.value}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.label}</div>
                </div>
              ))}
            </div>

            {/* Interest ratio bar */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600 dark:text-gray-400">{zh ? '本金占比' : 'Principal'}</span>
                <span className="text-gray-600 dark:text-gray-400">{zh ? '利息占比' : 'Interest'}</span>
              </div>
              <div className="h-3 rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-blue-500"
                  style={{ width: `${(parseFloat(loanAmount) / result.totalPayment) * 100}%` }}
                />
                <div className="h-full bg-orange-400 flex-1" />
              </div>
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1.5">
                <span>{Math.round((parseFloat(loanAmount) / result.totalPayment) * 100)}%</span>
                <span>{Math.round((result.totalInterest / result.totalPayment) * 100)}%</span>
              </div>
            </div>

            {/* Amortization schedule toggle */}
            <button
              onClick={() => setShowSchedule(v => !v)}
              className="w-full py-2.5 text-sm font-medium text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-700 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
              {showSchedule ? (zh ? '▲ 隐藏还款计划' : '▲ Hide Schedule') : (zh ? '▼ 查看完整还款计划' : '▼ View Full Amortization Schedule')}
            </button>

            {showSchedule && (
              <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-700">
                      {[zh ? '月份' : 'Month', zh ? '月供' : 'Payment', zh ? '本金' : 'Principal', zh ? '利息' : 'Interest', zh ? '剩余本金' : 'Balance'].map(h => (
                        <th key={h} className="px-3 py-2.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.schedule.slice(0, 60).map((row, i) => (
                      <tr key={row.month} className={i % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-750'}>
                        <td className="px-3 py-2 text-gray-700 dark:text-gray-300">{row.month}</td>
                        <td className="px-3 py-2 text-gray-700 dark:text-gray-300">{fmt(row.payment)}</td>
                        <td className="px-3 py-2 text-blue-600 dark:text-blue-400">{fmt(row.principal)}</td>
                        <td className="px-3 py-2 text-orange-600 dark:text-orange-400">{fmt(row.interest)}</td>
                        <td className="px-3 py-2 text-gray-700 dark:text-gray-300">{fmt(row.balance)}</td>
                      </tr>
                    ))}
                    {result.schedule.length > 60 && (
                      <tr>
                        <td colSpan={5} className="px-3 py-2 text-center text-xs text-gray-500 dark:text-gray-400">
                          {zh ? `... 共 ${result.schedule.length} 期，显示前 60 期` : `... ${result.schedule.length} total rows, showing first 60`}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </ToolLayout>
  )
}

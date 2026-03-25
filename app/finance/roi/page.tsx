'use client'

import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ROICalculatorPage() {
  const { locale, t } = useLanguage()
  const [invest, setInvest] = useState('10000')
  const [returnAmt, setReturnAmt] = useState('15000')
  const [years, setYears] = useState('3')

  const I = parseFloat(invest) || 0
  const R = parseFloat(returnAmt) || 0
  const Y = parseFloat(years) || 1
  const netProfit = R - I
  const roi = I > 0 ? (netProfit / I * 100) : 0
  const annualizedRoi = I > 0 && Y > 0 ? (Math.pow(R / I, 1 / Y) - 1) * 100 : 0

  return (
    <ToolLayout
      titleZh={t.finance.roi.title} titleEn="ROI Calculator"
      descZh={t.finance.roi.desc} descEn="Calculate Return on Investment and annualized returns"
      icon="💹" tags={['roi', 'investment', 'return', '投资回报', '理财']}
      introZh="投资回报率(ROI)是评估投资效益的重要指标。计算公式为：ROI = (回报金额 - 投资金额) / 投资金额 × 100%。本工具还支持计算年化收益率。"
      introEn="ROI (Return on Investment) is a key metric for evaluating investment performance. Formula: ROI = (Return - Investment) / Investment × 100%. This tool also calculates annualized returns."
    >
      <div className="space-y-5">
        {[
          { label: `${t.finance.roi.investAmount} (¥)`, value: invest, set: setInvest },
          { label: `${t.finance.roi.returnAmount} (¥)`, value: returnAmt, set: setReturnAmt },
          { label: locale==='zh'?'持有年数 (年)':'Holding Period (years)', value: years, set: setYears },
        ].map(f => (
          <div key={f.label}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{f.label}</label>
            <input type="number" value={f.value} onChange={e => f.set(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg" />
          </div>
        ))}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: t.finance.roi.roi, value: `${roi.toFixed(2)}%`, color: roi>=0?'text-green-700 dark:text-green-300':'text-red-700 dark:text-red-300', bg: roi>=0?'bg-green-50 dark:bg-green-900/20':'bg-red-50 dark:bg-red-900/20' },
            { label: t.finance.roi.netProfit, value: `¥${netProfit.toFixed(2)}`, color: netProfit>=0?'text-blue-700 dark:text-blue-300':'text-red-700 dark:text-red-300', bg: 'bg-blue-50 dark:bg-blue-900/20' },
            { label: locale==='zh'?'年化收益率':'Annualized ROI', value: `${annualizedRoi.toFixed(2)}%/yr`, color: 'text-purple-700 dark:text-purple-300', bg: 'bg-purple-50 dark:bg-purple-900/20' },
            { label: locale==='zh'?'投资倍数':'Return Multiple', value: `${I>0?(R/I).toFixed(2):'—'}x`, color: 'text-orange-700 dark:text-orange-300', bg: 'bg-orange-50 dark:bg-orange-900/20' },
          ].map(r => (
            <div key={r.label} className={`${r.bg} rounded-xl p-4 text-center`}>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{r.label}</div>
              <div className={`text-xl font-bold ${r.color}`}>{r.value}</div>
            </div>
          ))}
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-sm text-gray-600 dark:text-gray-400">
          <p className="font-medium mb-1">{locale==='zh'?'计算公式':'Formula'}</p>
          <p>ROI = (¥{R.toFixed(0)} - ¥{I.toFixed(0)}) / ¥{I.toFixed(0)} × 100% = <strong className="text-blue-600 dark:text-blue-400">{roi.toFixed(2)}%</strong></p>
        </div>
      </div>
    </ToolLayout>
  )
}

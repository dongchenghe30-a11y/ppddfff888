'use client'

import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'
import { useLanguage } from '@/contexts/LanguageContext'

export default function StockReturnCalculatorPage() {
  const { locale, t } = useLanguage()
  const [buyPrice, setBuyPrice] = useState('10')
  const [sellPrice, setSellPrice] = useState('15')
  const [shares, setShares] = useState('1000')
  const [dividend, setDividend] = useState('500')

  const buy = parseFloat(buyPrice) || 0
  const sell = parseFloat(sellPrice) || 0
  const sh = parseFloat(shares) || 0
  const div = parseFloat(dividend) || 0

  const capitalGain = (sell - buy) * sh
  const totalProfit = capitalGain + div
  const investAmount = buy * sh
  const profitRate = investAmount > 0 ? totalProfit / investAmount * 100 : 0
  const capitalGainRate = investAmount > 0 ? capitalGain / investAmount * 100 : 0

  return (
    <ToolLayout
      titleZh={t.finance.stock.title} titleEn="Stock Return Calculator"
      descZh={t.finance.stock.desc} descEn="Calculate stock investment returns including capital gains and dividends"
      icon="📊" tags={['stock', 'investment', 'dividend', '股票', '收益', '投资']}
      introZh="股票收益计算器帮助您计算股票投资的总收益，包括资本利得（买卖差价）和股息收入两部分。帮助您全面评估股票投资的实际回报。"
      introEn="The stock return calculator helps you calculate total stock investment returns, including capital gains and dividend income, giving a complete picture of your investment performance."
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: `${t.finance.stock.buyPrice} (¥)`, value: buyPrice, set: setBuyPrice },
            { label: `${t.finance.stock.sellPrice} (¥)`, value: sellPrice, set: setSellPrice },
          ].map(f => (
            <div key={f.label}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{f.label}</label>
              <input type="number" value={f.value} onChange={e => f.set(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          ))}
        </div>
        {[
          { label: `${t.finance.stock.shares} (${locale==='zh'?'股':'shares'})`, value: shares, set: setShares },
          { label: `${t.finance.stock.dividend} (¥)`, value: dividend, set: setDividend },
        ].map(f => (
          <div key={f.label}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{f.label}</label>
            <input type="number" value={f.value} onChange={e => f.set(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        ))}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: locale==='zh'?'资本利得':'Capital Gain', value: `¥${capitalGain.toFixed(2)}`, color: capitalGain>=0?'text-green-700 dark:text-green-300':'text-red-700 dark:text-red-300', bg: capitalGain>=0?'bg-green-50 dark:bg-green-900/20':'bg-red-50 dark:bg-red-900/20' },
            { label: locale==='zh'?'股息收入':'Dividend Income', value: `¥${div.toFixed(2)}`, color: 'text-blue-700 dark:text-blue-300', bg: 'bg-blue-50 dark:bg-blue-900/20' },
            { label: t.finance.stock.profit, value: `¥${totalProfit.toFixed(2)}`, color: totalProfit>=0?'text-teal-700 dark:text-teal-300':'text-red-700 dark:text-red-300', bg: totalProfit>=0?'bg-teal-50 dark:bg-teal-900/20':'bg-red-50 dark:bg-red-900/20' },
            { label: t.finance.stock.profitRate, value: `${profitRate.toFixed(2)}%`, color: profitRate>=0?'text-orange-700 dark:text-orange-300':'text-red-700 dark:text-red-300', bg: 'bg-orange-50 dark:bg-orange-900/20' },
          ].map(r => (
            <div key={r.label} className={`${r.bg} rounded-xl p-4 text-center`}>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{r.label}</div>
              <div className={`text-xl font-bold ${r.color}`}>{r.value}</div>
            </div>
          ))}
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <div className="flex justify-between"><span>{locale==='zh'?'买入总额':'Total Investment'}</span><span className="font-medium">¥{investAmount.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>{locale==='zh'?'卖出总额':'Total Sale'}</span><span className="font-medium">¥{(sell*sh).toFixed(2)}</span></div>
          <div className="flex justify-between"><span>{locale==='zh'?'资本利得率':'Capital Gain Rate'}</span><span className={`font-medium ${capitalGainRate>=0?'text-green-600':'text-red-600'}`}>{capitalGainRate.toFixed(2)}%</span></div>
        </div>
      </div>
    </ToolLayout>
  )
}

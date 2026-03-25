'use client'

import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'
import { useLanguage } from '@/contexts/LanguageContext'

export default function DiscountCalculatorPage() {
  const { locale, t } = useLanguage()
  const [mode, setMode] = useState<'discount'|'reverse'|'compare'>('discount')
  const [originalPrice, setOriginalPrice] = useState('299')
  const [discountRate, setDiscountRate] = useState('20')
  const [finalPrice, setFinalPrice] = useState('239')
  const [price1, setPrice1] = useState('299')
  const [price2, setPrice2] = useState('199')

  const discountedPrice = parseFloat(originalPrice) * (1 - parseFloat(discountRate) / 100)
  const savings = parseFloat(originalPrice) - discountedPrice
  const reverseDiscount = ((parseFloat(originalPrice) - parseFloat(finalPrice)) / parseFloat(originalPrice) * 100)
  const priceDiff = parseFloat(price1) - parseFloat(price2)
  const priceSavePct = (priceDiff / parseFloat(price1) * 100)

  const modes = [
    { key: 'discount', zh: '折扣计算', en: 'Discount Calc' },
    { key: 'reverse', zh: '反推折扣', en: 'Find Discount' },
    { key: 'compare', zh: '价格对比', en: 'Compare Prices' },
  ]

  return (
    <ToolLayout
      titleZh={t.life.discount.title} titleEn="Discount Calculator"
      descZh={t.life.discount.desc} descEn="Calculate discounted price, savings amount and discount percentage"
      icon="🏷️" tags={['discount', 'sale', 'shopping', '折扣', '打折', '省钱']}
      introZh="折扣计算器支持三种模式：已知原价和折扣率求折后价、已知原价和折后价求折扣率、以及两个价格的对比分析。是购物时的必备工具。"
      introEn="The discount calculator supports three modes: calculate final price from discount rate, find discount percentage from original and final price, and compare two prices."
    >
      <div className="space-y-5">
        <div className="flex gap-2 flex-wrap">
          {modes.map(m => (
            <button key={m.key} onClick={() => setMode(m.key as typeof mode)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${mode === m.key ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-50'}`}
            >{locale==='zh'?m.zh:m.en}</button>
          ))}
        </div>

        {mode === 'discount' && (
          <div className="space-y-4">
            {[
              { label: t.life.discount.originalPrice, value: originalPrice, set: setOriginalPrice, prefix: '¥' },
              { label: t.life.discount.discountRate, value: discountRate, set: setDiscountRate, prefix: '', suffix: '%' },
            ].map(f => (
              <div key={f.label}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{f.label}</label>
                <div className="flex items-center gap-2">
                  {f.prefix && <span className="text-gray-500 font-medium">{f.prefix}</span>}
                  <input type="number" value={f.value} onChange={e => f.set(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg" />
                  {f.suffix && <span className="text-gray-500 font-medium">{f.suffix}</span>}
                </div>
              </div>
            ))}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-center">
                <div className="text-xs text-gray-500 mb-1">{t.life.discount.finalPrice}</div>
                <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">¥{isNaN(discountedPrice)?'—':discountedPrice.toFixed(2)}</div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 text-center">
                <div className="text-xs text-gray-500 mb-1">{t.life.discount.savings}</div>
                <div className="text-2xl font-bold text-green-700 dark:text-green-300">¥{isNaN(savings)?'—':savings.toFixed(2)}</div>
              </div>
            </div>
          </div>
        )}

        {mode === 'reverse' && (
          <div className="space-y-4">
            {[
              { label: t.life.discount.originalPrice, value: originalPrice, set: setOriginalPrice },
              { label: locale==='zh'?'实付金额':'Final Price', value: finalPrice, set: setFinalPrice },
            ].map(f => (
              <div key={f.label}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{f.label}</label>
                <input type="number" value={f.value} onChange={e => f.set(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg" />
              </div>
            ))}
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4 text-center">
              <div className="text-sm text-gray-500 mb-1">{locale==='zh'?'折扣力度':'Discount Rate'}</div>
              <div className="text-3xl font-bold text-orange-700 dark:text-orange-300">{isNaN(reverseDiscount)?'—':reverseDiscount.toFixed(1)}%</div>
              <div className="text-sm text-gray-500 mt-1">{locale==='zh'?`相当于打${(10-reverseDiscount/10).toFixed(1)}折`:`Save ${reverseDiscount.toFixed(1)}% off`}</div>
            </div>
          </div>
        )}

        {mode === 'compare' && (
          <div className="space-y-4">
            {[
              { label: locale==='zh'?'价格A (原价)':'Price A (Original)', value: price1, set: setPrice1 },
              { label: locale==='zh'?'价格B (促销价)':'Price B (Sale Price)', value: price2, set: setPrice2 },
            ].map(f => (
              <div key={f.label}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{f.label}</label>
                <input type="number" value={f.value} onChange={e => f.set(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg" />
              </div>
            ))}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 text-center">
                <div className="text-xs text-gray-500 mb-1">{locale==='zh'?'省了多少钱':'Savings'}</div>
                <div className="text-2xl font-bold text-green-700 dark:text-green-300">¥{isNaN(priceDiff)?'—':priceDiff.toFixed(2)}</div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-center">
                <div className="text-xs text-gray-500 mb-1">{locale==='zh'?'省了多少':'Saved %'}</div>
                <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">{isNaN(priceSavePct)?'—':priceSavePct.toFixed(1)}%</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}

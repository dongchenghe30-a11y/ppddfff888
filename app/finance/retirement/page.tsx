'use client'

import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'
import { useLanguage } from '@/contexts/LanguageContext'

export default function RetirementCalculatorPage() {
  const { locale, t } = useLanguage()
  const [currentAge, setCurrentAge] = useState('30')
  const [retireAge, setRetireAge] = useState('60')
  const [currentSavings, setCurrentSavings] = useState('50000')
  const [retirementGoal, setRetirementGoal] = useState('2000000')
  const [annualReturn, setAnnualReturn] = useState('7')

  const cAge = parseFloat(currentAge) || 30
  const rAge = parseFloat(retireAge) || 60
  const cSav = parseFloat(currentSavings) || 0
  const goal = parseFloat(retirementGoal) || 0
  const ret = parseFloat(annualReturn) / 100 || 0.07
  const yearsLeft = Math.max(0, rAge - cAge)
  const monthlyRate = ret / 12
  const months = yearsLeft * 12

  // FV of current savings
  const fvCurrentSavings = cSav * Math.pow(1 + ret, yearsLeft)
  const remaining = Math.max(0, goal - fvCurrentSavings)

  // Monthly payment needed
  const monthlyNeeded = months > 0 && monthlyRate > 0
    ? remaining * monthlyRate / (Math.pow(1 + monthlyRate, months) - 1)
    : remaining / (months || 1)

  return (
    <ToolLayout
      titleZh={t.finance.retirement.title} titleEn="Retirement Savings Calculator"
      descZh={t.finance.retirement.desc} descEn="Calculate how much you need to save monthly to reach your retirement goal"
      icon="🌴" tags={['retirement', 'savings', 'planning', '退休', '储蓄', '养老']}
      introZh="退休储蓄计算器帮助您规划退休目标。基于您当前年龄、退休年龄、现有储蓄、目标金额和预期年化收益率，计算出每月需要存入多少钱才能在退休时达到目标。"
      introEn="The retirement savings calculator helps you plan for retirement. Based on your current age, retirement age, existing savings, goal and expected returns, it calculates the monthly savings needed."
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: t.finance.retirement.currentAge, value: currentAge, set: setCurrentAge },
            { label: t.finance.retirement.retirementAge, value: retireAge, set: setRetireAge },
          ].map(f => (
            <div key={f.label}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{f.label}</label>
              <input type="number" value={f.value} onChange={e => f.set(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          ))}
        </div>
        {[
          { label: `${t.finance.retirement.currentSavings} (¥)`, value: currentSavings, set: setCurrentSavings },
          { label: `${t.finance.retirement.retirementGoal} (¥)`, value: retirementGoal, set: setRetirementGoal },
          { label: t.finance.retirement.annualReturn, value: annualReturn, set: setAnnualReturn },
        ].map(f => (
          <div key={f.label}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{f.label}</label>
            <input type="number" value={f.value} onChange={e => f.set(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        ))}
        <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-xl p-5 text-center">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">{t.finance.retirement.monthlyContribution}</div>
          <div className="text-4xl font-extrabold text-green-700 dark:text-green-300">¥{monthlyNeeded.toFixed(2)}</div>
          <div className="text-sm text-gray-500 mt-2">{locale==='zh'?`距离退休还有 ${yearsLeft} 年 (${months} 个月)`:`${yearsLeft} years (${months} months) until retirement`}</div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 text-center">
            <div className="text-xs text-gray-500 mb-1">{locale==='zh'?'现有储蓄到退休':'Savings at retirement'}</div>
            <div className="text-lg font-bold text-blue-700 dark:text-blue-300">¥{fvCurrentSavings.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-3 text-center">
            <div className="text-xs text-gray-500 mb-1">{locale==='zh'?'还需积累':'Still needed'}</div>
            <div className="text-lg font-bold text-orange-700 dark:text-orange-300">¥{remaining.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
          </div>
        </div>
      </div>
    </ToolLayout>
  )
}

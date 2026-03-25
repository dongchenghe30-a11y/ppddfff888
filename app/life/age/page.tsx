'use client'

import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'
import { useLanguage } from '@/contexts/LanguageContext'

export default function AgeCalculatorPage() {
  const { locale, t } = useLanguage()
  const today = new Date()
  const defaultBirth = `${today.getFullYear() - 25}-06-15`
  const [birthDate, setBirthDate] = useState(defaultBirth)

  const calc = () => {
    if (!birthDate) return null
    const birth = new Date(birthDate)
    const now = new Date()
    let years = now.getFullYear() - birth.getFullYear()
    let months = now.getMonth() - birth.getMonth()
    let days = now.getDate() - birth.getDate()
    if (days < 0) { months--; days += new Date(now.getFullYear(), now.getMonth(), 0).getDate() }
    if (months < 0) { years--; months += 12 }
    const totalDays = Math.floor((now.getTime() - birth.getTime()) / 86400000)
    // Next birthday
    const nextBirthday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate())
    if (nextBirthday <= now) nextBirthday.setFullYear(now.getFullYear() + 1)
    const daysToNext = Math.ceil((nextBirthday.getTime() - now.getTime()) / 86400000)
    return { years, months, days, totalDays, daysToNext, nextBirthday }
  }

  const result = calc()

  return (
    <ToolLayout
      titleZh={t.life.age.title} titleEn="Age Calculator"
      descZh={t.life.age.desc} descEn="Calculate your exact age and how many days until your next birthday"
      icon="🎂" tags={['age', 'birthday', 'date', '年龄', '生日']}
      introZh="年龄计算器可以精确计算您的年龄（年、月、天），显示您已经活了多少天，以及距离下次生日还有多少天。输入出生日期即可立即查看。"
      introEn="The age calculator precisely calculates your age in years, months and days, shows how many days you've been alive, and counts down to your next birthday."
    >
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t.life.age.birthDate}</label>
          <input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} max={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg" />
        </div>
        {result && (
          <>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-5 text-center">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">{t.life.age.currentAge}</div>
              <div className="text-4xl font-extrabold text-blue-700 dark:text-blue-300">
                {result.years} <span className="text-lg">{locale==='zh'?'岁':'years'}</span>{' '}
                {result.months} <span className="text-lg">{locale==='zh'?'月':'months'}</span>{' '}
                {result.days} <span className="text-lg">{locale==='zh'?'天':'days'}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{locale==='zh'?'已活了':'Days alive'}</div>
                <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">{result.totalDays.toLocaleString()}</div>
                <div className="text-xs text-gray-500 mt-1">{locale==='zh'?'天':'days'}</div>
              </div>
              <div className="bg-pink-50 dark:bg-pink-900/20 rounded-xl p-4 text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t.life.age.nextBirthday}</div>
                <div className="text-2xl font-bold text-pink-700 dark:text-pink-300">{result.daysToNext}</div>
                <div className="text-xs text-gray-500 mt-1">{t.life.age.days}</div>
              </div>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-3 text-sm text-center text-yellow-800 dark:text-yellow-200">
              🎂 {locale==='zh' ? `下次生日：${result.nextBirthday.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' })}` : `Next birthday: ${result.nextBirthday.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`}
            </div>
          </>
        )}
      </div>
    </ToolLayout>
  )
}

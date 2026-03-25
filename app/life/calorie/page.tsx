'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import ToolLayout from '@/components/ToolLayout'

const ACTIVITY_FACTORS = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  veryActive: 1.9,
}

export default function CaloriePage() {
  const { locale } = useLanguage()
  const zh = locale === 'zh'

  const [age, setAge] = useState('')
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [heightCm, setHeightCm] = useState('')
  const [weightKg, setWeightKg] = useState('')
  const [activity, setActivity] = useState<keyof typeof ACTIVITY_FACTORS>('moderate')
  const [result, setResult] = useState<{ bmr: number; tdee: number } | null>(null)

  const calculate = () => {
    const a = parseInt(age)
    const h = parseFloat(heightCm)
    const w = parseFloat(weightKg)
    if (!a || !h || !w || a <= 0 || h <= 0 || w <= 0) return

    // Mifflin-St Jeor Equation
    const bmr = gender === 'male'
      ? 10 * w + 6.25 * h - 5 * a + 5
      : 10 * w + 6.25 * h - 5 * a - 161

    const tdee = bmr * ACTIVITY_FACTORS[activity]
    setResult({ bmr: Math.round(bmr), tdee: Math.round(tdee) })
  }

  const activityOptions = [
    { key: 'sedentary', zh: '久坐不动', en: 'Sedentary', desc: zh ? '办公室工作，几乎不运动' : 'Office work, little or no exercise' },
    { key: 'light', zh: '轻度活动', en: 'Lightly Active', desc: zh ? '每周轻度运动 1-3 天' : 'Light exercise 1-3 days/week' },
    { key: 'moderate', zh: '中度活动', en: 'Moderately Active', desc: zh ? '每周中度运动 3-5 天' : 'Moderate exercise 3-5 days/week' },
    { key: 'active', zh: '积极活动', en: 'Very Active', desc: zh ? '每周重度运动 6-7 天' : 'Hard exercise 6-7 days/week' },
    { key: 'veryActive', zh: '非常活跃', en: 'Extra Active', desc: zh ? '体力劳动或每天高强度训练' : 'Physical job or twice/day training' },
  ] as const

  return (
    <ToolLayout
      titleZh="卡路里计算器"
      titleEn="Calorie Calculator"
      descZh="基于 Mifflin-St Jeor 公式计算基础代谢率(BMR)和每日总消耗(TDEE)"
      descEn="Calculate your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) using the Mifflin-St Jeor equation"
      icon="🔥"
      tags={['calorie calculator', 'BMR', 'TDEE', '卡路里', '基础代谢', '热量计算']}
      introZh="卡路里计算器基于 Mifflin-St Jeor 公式，这是目前最准确的 BMR 计算方法之一。BMR 是您在完全静止状态下维持生命体征所需的最低热量；TDEE 是结合您的日常活动量后估算的每日总热量消耗，是制定饮食计划的重要参考。"
      introEn="This calculator uses the Mifflin-St Jeor equation, one of the most accurate BMR formulas available. BMR is the minimum calories your body needs at complete rest. TDEE factors in your activity level to estimate total daily calorie needs — the key number for diet planning."
      useCaseZh={`• 制定减肥饮食计划，确定热量缺口\n• 增肌期确定每日热量盈余\n• 了解自身基础代谢水平\n• 营养师和健身教练参考数据`}
      useCaseEn={`• Plan a weight loss diet with a calorie deficit\n• Set a calorie surplus for muscle building\n• Understand your baseline metabolism\n• Reference data for nutritionists and fitness coaches`}
      faqZh={[
        { q: 'BMR 和 TDEE 有什么区别？', a: 'BMR（基础代谢率）是您完全静止时维持生命所需的最低热量。TDEE（每日总消耗）= BMR × 活动系数，反映了日常活动消耗的实际热量需求。' },
        { q: '如何利用这个数据减肥？', a: '减肥的基本原理是热量缺口：每日摄入热量 < TDEE。通常建议每日少摄入 300-500 千卡，每周可减重约 0.3-0.5 kg。' },
      ]}
      faqEn={[
        { q: 'What is the difference between BMR and TDEE?', a: 'BMR (Basal Metabolic Rate) is the minimum calories needed at complete rest. TDEE (Total Daily Energy Expenditure) = BMR × activity factor, reflecting your actual daily calorie needs.' },
        { q: 'How do I use this data for weight loss?', a: 'The basic principle of weight loss is a calorie deficit: daily intake < TDEE. A deficit of 300–500 kcal/day typically results in about 0.3–0.5 kg of weight loss per week.' },
      ]}
    >
      <div className="space-y-5">
        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            {zh ? '性别' : 'Gender'}
          </label>
          <div className="grid grid-cols-2 gap-3">
            {(['male', 'female'] as const).map(g => (
              <button
                key={g}
                onClick={() => setGender(g)}
                className={`py-2.5 rounded-xl border-2 font-medium transition-colors ${gender === g ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-300'}`}
              >
                {g === 'male' ? (zh ? '♂ 男' : '♂ Male') : (zh ? '♀ 女' : '♀ Female')}
              </button>
            ))}
          </div>
        </div>

        {/* Age, height, weight */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: zh ? '年龄 (岁)' : 'Age (yr)', value: age, set: setAge, placeholder: '25' },
            { label: zh ? '身高 (cm)' : 'Height (cm)', value: heightCm, set: setHeightCm, placeholder: '170' },
            { label: zh ? '体重 (kg)' : 'Weight (kg)', value: weightKg, set: setWeightKg, placeholder: '65' },
          ].map(f => (
            <div key={f.label}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{f.label}</label>
              <input
                type="number"
                value={f.value}
                onChange={e => f.set(e.target.value)}
                placeholder={f.placeholder}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>

        {/* Activity level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {zh ? '活动水平' : 'Activity Level'}
          </label>
          <div className="space-y-2">
            {activityOptions.map(opt => (
              <button
                key={opt.key}
                onClick={() => setActivity(opt.key)}
                className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-colors text-left ${activity === opt.key ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-600 hover:border-blue-200 dark:hover:border-blue-700'}`}
              >
                <div>
                  <div className={`text-sm font-medium ${activity === opt.key ? 'text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'}`}>
                    {zh ? opt.zh : opt.en}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{opt.desc}</div>
                </div>
                <span className="text-xs text-gray-400 ml-2">×{ACTIVITY_FACTORS[opt.key]}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={calculate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors"
        >
          {zh ? '计算热量' : 'Calculate Calories'}
        </button>

        {/* Results */}
        {result && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-5 text-center">
                <div className="text-3xl mb-1">🔥</div>
                <div className="text-3xl font-extrabold text-orange-600 dark:text-orange-400">{result.bmr}</div>
                <div className="text-sm font-medium text-orange-700 dark:text-orange-300 mt-1">BMR</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {zh ? '基础代谢率 (kcal/天)' : 'Basal Metabolic Rate (kcal/day)'}
                </div>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-5 text-center">
                <div className="text-3xl mb-1">⚡</div>
                <div className="text-3xl font-extrabold text-red-600 dark:text-red-400">{result.tdee}</div>
                <div className="text-sm font-medium text-red-700 dark:text-red-300 mt-1">TDEE</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {zh ? '每日总消耗 (kcal/天)' : 'Total Daily Expenditure (kcal/day)'}
                </div>
              </div>
            </div>

            {/* Goal guide */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                {zh ? '热量目标参考' : 'Calorie Goal Guide'}
              </h4>
              <div className="space-y-2">
                {[
                  { icon: '📉', label: zh ? '减肥 (缺口 500 kcal)' : 'Weight Loss (−500 kcal)', value: result.tdee - 500, color: 'text-blue-600 dark:text-blue-400' },
                  { icon: '⚖️', label: zh ? '维持体重' : 'Maintain Weight', value: result.tdee, color: 'text-green-600 dark:text-green-400' },
                  { icon: '📈', label: zh ? '增肌 (盈余 300 kcal)' : 'Muscle Gain (+300 kcal)', value: result.tdee + 300, color: 'text-orange-600 dark:text-orange-400' },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{item.icon} {item.label}</span>
                    <span className={`text-sm font-bold ${item.color}`}>{item.value} kcal</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}

'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import ToolLayout from '@/components/ToolLayout'

export default function BMIPage() {
  const { locale, t } = useLanguage()
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [bmi, setBmi] = useState<number | null>(null)

  const calculate = () => {
    const h = parseFloat(height) / 100
    const w = parseFloat(weight)
    if (h > 0 && w > 0) {
      setBmi(Math.round((w / (h * h)) * 10) / 10)
    }
  }

  const getCategory = (bmi: number) => {
    if (bmi < 18.5) return { zh: '体重过轻', en: 'Underweight', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' }
    if (bmi < 25) return { zh: '正常体重', en: 'Normal Weight', color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20' }
    if (bmi < 30) return { zh: '超重', en: 'Overweight', color: 'text-yellow-600', bg: 'bg-yellow-50 dark:bg-yellow-900/20' }
    return { zh: '肥胖', en: 'Obese', color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-900/20' }
  }

  const bmiPercent = bmi ? Math.min(((bmi - 10) / 30) * 100, 100) : 0

  return (
    <ToolLayout
      titleZh="BMI 计算器"
      titleEn="BMI Calculator"
      descZh="计算身体质量指数，了解您的健康状态，支持国际标准"
      descEn="Calculate Body Mass Index and understand your health status with international standards"
      icon="⚖️"
      tags={['BMI', 'health', 'body mass index', '健康', '体重指数']}
      introZh="BMI（身体质量指数）是衡量体重是否健康的常用指标，由体重（千克）除以身高（米）的平方计算而来。WHO标准：低于18.5为体重过轻，18.5-24.9为正常，25-29.9为超重，30及以上为肥胖。"
      introEn="BMI (Body Mass Index) is a common measure of healthy body weight, calculated by dividing weight (kg) by height (m) squared. WHO standards: below 18.5 is underweight, 18.5-24.9 is normal, 25-29.9 is overweight, 30+ is obese."
      useCaseZh={`• 健身锻炼前评估基准体重\n• 监测减肥进度\n• 了解自己的健康状态\n• 儿童青少年生长发育参考`}
      useCaseEn={`• Assess baseline weight before fitness training\n• Monitor weight loss progress\n• Understand your health status\n• Reference for child and adolescent growth`}
      faqZh={[
        { q: 'BMI计算是否精确？', a: 'BMI是粗略的健康评估工具，不能区分肌肉和脂肪，运动员可能偏高。建议结合腰围等其他指标综合评估。' },
        { q: '亚洲人的BMI标准是否不同？', a: '是的，亚洲人在较低BMI时患代谢疾病风险更高。部分亚洲国家建议23以上为超重，27.5以上为肥胖。' },
      ]}
      faqEn={[
        { q: 'Is BMI an accurate measurement?', a: 'BMI is a rough health assessment tool that cannot distinguish muscle from fat. Athletes may have a high BMI but be perfectly healthy. It is best used alongside other metrics like waist circumference.' },
        { q: 'Are BMI standards different for Asians?', a: 'Yes, Asians face higher metabolic disease risk at lower BMI values. Some Asian countries recommend 23+ as overweight and 27.5+ as obese.' },
      ]}
    >
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t.life.bmi.height}</label>
            <input
              type="number"
              value={height}
              onChange={e => setHeight(e.target.value)}
              placeholder="e.g. 170"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t.life.bmi.weight}</label>
            <input
              type="number"
              value={weight}
              onChange={e => setWeight(e.target.value)}
              placeholder="e.g. 65"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button onClick={calculate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors"
        >
          {t.common.calculate}
        </button>

        {bmi !== null && (() => {
          const cat = getCategory(bmi)
          return (
            <div className={`${cat.bg} rounded-xl p-5`}>
              <div className="text-center mb-4">
                <div className={`text-5xl font-extrabold ${cat.color}`}>{bmi}</div>
                <div className={`text-lg font-semibold mt-1 ${cat.color}`}>
                  {locale === 'zh' ? cat.zh : cat.en}
                </div>
              </div>

              {/* BMI Gauge */}
              <div className="relative h-4 bg-gradient-to-r from-blue-400 via-green-400 via-yellow-400 to-red-500 rounded-full overflow-hidden mb-1">
                <div className="absolute top-0 h-full w-1 bg-white shadow-md transition-all"
                  style={{ left: `${bmiPercent}%` }} />
              </div>
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                <span>10</span><span>18.5</span><span>25</span><span>30</span><span>40</span>
              </div>

              {/* Categories */}
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                {[
                  { range: '< 18.5', zh: '过轻', en: 'Underweight', c: 'text-blue-600' },
                  { range: '18.5-24.9', zh: '正常', en: 'Normal', c: 'text-green-600' },
                  { range: '25-29.9', zh: '超重', en: 'Overweight', c: 'text-yellow-600' },
                  { range: '≥ 30', zh: '肥胖', en: 'Obese', c: 'text-red-600' },
                ].map(c => (
                  <div key={c.range} className={c.c}>
                    <div className="font-semibold">{locale === 'zh' ? c.zh : c.en}</div>
                    <div className="text-gray-500 dark:text-gray-400">{c.range}</div>
                  </div>
                ))}
              </div>
            </div>
          )
        })()}
      </div>
    </ToolLayout>
  )
}

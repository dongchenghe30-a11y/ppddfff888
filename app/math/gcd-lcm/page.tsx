'use client'

import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'
import { useLanguage } from '@/contexts/LanguageContext'

function gcd(a: number, b: number): number { return b === 0 ? Math.abs(a) : gcd(Math.abs(b), Math.abs(a) % Math.abs(b)) }
function lcm(a: number, b: number): number { return a === 0 || b === 0 ? 0 : Math.abs(a * b) / gcd(a, b) }
function gcdArr(nums: number[]): number { return nums.reduce((a, b) => gcd(a, b)) }
function lcmArr(nums: number[]): number { return nums.reduce((a, b) => lcm(a, b)) }

export default function GcdLcmPage() {
  const { locale, t } = useLanguage()
  const [input, setInput] = useState('12, 18, 24')

  const nums = input.split(/[,，\s]+/).map(s => parseInt(s.trim())).filter(n => !isNaN(n) && n > 0)
  const gcdVal = nums.length >= 2 ? gcdArr(nums) : null
  const lcmVal = nums.length >= 2 ? lcmArr(nums) : null

  // Prime factorization
  const primeFactors = (n: number): number[] => {
    const factors: number[] = []
    for (let d = 2; d * d <= n; d++) { while (n % d === 0) { factors.push(d); n /= d } }
    if (n > 1) factors.push(n)
    return factors
  }

  return (
    <ToolLayout
      titleZh={t.math.gcdLcm.title} titleEn="GCD & LCM Calculator"
      descZh={t.math.gcdLcm.desc} descEn="Calculate the Greatest Common Divisor and Least Common Multiple"
      icon="🔢" tags={['gcd', 'lcm', 'math', '最大公约数', '最小公倍数']}
      introZh="最大公约数(GCD)是多个整数共有约数中最大的数，最小公倍数(LCM)是多个整数的公倍数中最小的正整数。两者在分数化简、分数通分等场景中广泛应用。"
      introEn="GCD is the largest number that divides all given numbers. LCM is the smallest positive number divisible by all given numbers. Both are widely used in fraction simplification and more."
    >
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t.math.gcdLcm.numbers}</label>
          <input type="text" value={input} onChange={e => setInput(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            placeholder="12, 18, 24" />
          <p className="text-xs text-gray-400 mt-1">{locale==='zh'?'用逗号或空格分隔多个数字':'Separate numbers with commas or spaces'}</p>
        </div>
        {nums.length >= 2 ? (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5 text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t.math.gcdLcm.gcd}</div>
                <div className="text-4xl font-extrabold text-blue-700 dark:text-blue-300">{gcdVal}</div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-5 text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t.math.gcdLcm.lcm}</div>
                <div className="text-4xl font-extrabold text-green-700 dark:text-green-300">{lcmVal}</div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{locale==='zh'?'质因数分解':'Prime Factorization'}</p>
              <div className="space-y-1">
                {nums.map((n, i) => (
                  <div key={i} className="text-sm text-gray-700 dark:text-gray-300">
                    <span className="font-mono font-bold">{n}</span> = {primeFactors(n).join(' × ') || '1'}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-400 py-8">{locale==='zh'?'请至少输入两个正整数':'Please enter at least 2 positive integers'}</div>
        )}
      </div>
    </ToolLayout>
  )
}

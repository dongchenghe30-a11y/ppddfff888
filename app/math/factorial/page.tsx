'use client'

import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'
import { useLanguage } from '@/contexts/LanguageContext'

function factorial(n: number): bigint {
  if (n < 0) return BigInt(-1)
  if (n > 170) return BigInt(-2)
  let r = BigInt(1)
  for (let i = 2; i <= n; i++) r *= BigInt(i)
  return r
}

function permutation(n: number, r: number): bigint {
  if (r > n) return BigInt(0)
  const fn = factorial(n), fmr = factorial(n - r)
  return fn / fmr
}

function combination(n: number, r: number): bigint {
  if (r > n) return BigInt(0)
  const fn = factorial(n), fr = factorial(r), fmr = factorial(n - r)
  return fn / fr / fmr
}

export default function FactorialCalculatorPage() {
  const { locale, t } = useLanguage()
  const [n, setN] = useState('10')
  const [r, setR] = useState('3')

  const nV = parseInt(n) || 0
  const rV = parseInt(r) || 0
  const fact = factorial(nV)
  const perm = permutation(nV, rV)
  const comb = combination(nV, rV)

  const display = (v: bigint) => {
    if (v === BigInt(-1)) return locale==='zh'?'不支持负数':'Negative not supported'
    if (v === BigInt(-2)) return locale==='zh'?'数字太大':'Number too large'
    const s = v.toString()
    return s.length > 20 ? `${s.slice(0,10)}...×10^${s.length-1}` : s
  }

  return (
    <ToolLayout
      titleZh={t.math.factorial.title} titleEn="Factorial Calculator"
      descZh={t.math.factorial.desc} descEn="Calculate factorials, permutations (P) and combinations (C)"
      icon="!" tags={['factorial', 'permutation', 'combination', '阶乘', '排列', '组合']}
      introZh="阶乘计算器支持阶乘(n!)、排列数P(n,r)和组合数C(n,r)的计算。阶乘是离散数学的基础，在概率论、统计学、密码学等领域有广泛应用。"
      introEn="The factorial calculator supports factorial (n!), permutations P(n,r) and combinations C(n,r). Factorials are fundamental in discrete mathematics, probability theory and statistics."
    >
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t.math.factorial.number} (n, 0-170)</label>
            <input type="number" value={n} onChange={e => setN(e.target.value)} min="0" max="170"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t.math.factorial.r} (r ≤ n)</label>
            <input type="number" value={r} onChange={e => setR(e.target.value)} min="0"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg" />
          </div>
        </div>
        <div className="space-y-3">
          {[
            { label: `${t.math.factorial.factorial}  n! = ${nV}!`, value: display(fact), bg: 'bg-blue-50 dark:bg-blue-900/20', color: 'text-blue-700 dark:text-blue-300' },
            { label: `${t.math.factorial.permutation}  P(${nV},${rV})`, value: display(perm), bg: 'bg-green-50 dark:bg-green-900/20', color: 'text-green-700 dark:text-green-300' },
            { label: `${t.math.factorial.combination}  C(${nV},${rV})`, value: display(comb), bg: 'bg-purple-50 dark:bg-purple-900/20', color: 'text-purple-700 dark:text-purple-300' },
          ].map(r => (
            <div key={r.label} className={`${r.bg} rounded-xl p-4`}>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{r.label}</div>
              <div className={`font-mono font-bold text-lg break-all ${r.color}`}>{r.value}</div>
            </div>
          ))}
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <p className="font-medium">{locale==='zh'?'公式说明':'Formulas'}</p>
          <p>n! = n × (n-1) × ... × 1</p>
          <p>P(n,r) = n! / (n-r)!</p>
          <p>C(n,r) = n! / (r! × (n-r)!)</p>
        </div>
      </div>
    </ToolLayout>
  )
}

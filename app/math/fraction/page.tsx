'use client'

import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'
import { useLanguage } from '@/contexts/LanguageContext'

function gcd(a: number, b: number): number { return b === 0 ? a : gcd(b, a % b) }

function calcFraction(n1: number, d1: number, op: string, n2: number, d2: number) {
  if (d1 === 0 || d2 === 0) return null
  let rn: number, rd: number
  switch (op) {
    case '+': rn = n1 * d2 + n2 * d1; rd = d1 * d2; break
    case '-': rn = n1 * d2 - n2 * d1; rd = d1 * d2; break
    case '×': rn = n1 * n2; rd = d1 * d2; break
    case '÷': if (n2 === 0) return null; rn = n1 * d2; rd = d1 * n2; break
    default: return null
  }
  const g = gcd(Math.abs(rn), Math.abs(rd))
  const sign = rd < 0 ? -1 : 1
  return { n: sign * rn / g, d: sign * rd / g }
}

export default function FractionCalculatorPage() {
  const { locale, t } = useLanguage()
  const [n1, setN1] = useState('1')
  const [d1, setD1] = useState('2')
  const [op, setOp] = useState('+')
  const [n2, setN2] = useState('1')
  const [d2, setD2] = useState('3')

  const result = calcFraction(parseInt(n1)||0, parseInt(d1)||1, op, parseInt(n2)||0, parseInt(d2)||1)
  const decimal = result ? result.n / result.d : null

  return (
    <ToolLayout
      titleZh={t.math.fraction.title} titleEn="Fraction Calculator"
      descZh={t.math.fraction.desc} descEn="Add, subtract, multiply and divide fractions with automatic simplification"
      icon="½" tags={['fraction', 'math', 'arithmetic', '分数', '数学']}
      introZh="分数计算器支持分数的加、减、乘、除四种运算，并自动约分化简结果。同时显示小数等值，帮助您理解分数的大小。"
      introEn="The fraction calculator supports addition, subtraction, multiplication and division of fractions with automatic simplification. Also shows decimal equivalents."
    >
      <div className="space-y-5">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Fraction 1 */}
          <div className="flex flex-col items-center gap-1">
            <input type="number" value={n1} onChange={e => setN1(e.target.value)} className="w-20 px-2 py-2 text-center rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg font-bold" />
            <div className="w-20 h-0.5 bg-gray-400 dark:bg-gray-500" />
            <input type="number" value={d1} onChange={e => setD1(e.target.value)} className="w-20 px-2 py-2 text-center rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg font-bold" />
          </div>
          {/* Operator */}
          <div className="flex gap-1">
            {['+','-','×','÷'].map(o => (
              <button key={o} onClick={() => setOp(o)} className={`w-10 h-10 rounded-lg text-lg font-bold transition-colors ${op===o?'bg-blue-600 text-white':'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-50'}`}>{o}</button>
            ))}
          </div>
          {/* Fraction 2 */}
          <div className="flex flex-col items-center gap-1">
            <input type="number" value={n2} onChange={e => setN2(e.target.value)} className="w-20 px-2 py-2 text-center rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg font-bold" />
            <div className="w-20 h-0.5 bg-gray-400 dark:bg-gray-500" />
            <input type="number" value={d2} onChange={e => setD2(e.target.value)} className="w-20 px-2 py-2 text-center rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg font-bold" />
          </div>
          <span className="text-2xl text-gray-500">=</span>
          {/* Result */}
          {result ? (
            <div className="flex flex-col items-center gap-1">
              <div className="w-20 text-center text-2xl font-extrabold text-blue-700 dark:text-blue-300">{result.n}</div>
              <div className="w-20 h-0.5 bg-blue-400" />
              <div className="w-20 text-center text-2xl font-extrabold text-blue-700 dark:text-blue-300">{result.d}</div>
            </div>
          ) : <span className="text-red-500">{locale==='zh'?'错误':'Error'}</span>}
        </div>
        {result && decimal !== null && (
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
            <div className="text-sm text-gray-500 mb-2">{locale==='zh'?'计算过程':'Calculation'}</div>
            <div className="text-lg font-mono text-gray-800 dark:text-gray-200">{n1}/{d1} {op} {n2}/{d2} = {result.n}/{result.d} ≈ <strong>{decimal.toFixed(6)}</strong></div>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}

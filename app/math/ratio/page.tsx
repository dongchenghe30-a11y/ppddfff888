'use client'

import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'
import { useLanguage } from '@/contexts/LanguageContext'

export default function RatioCalculatorPage() {
  const { locale, t } = useLanguage()
  const [a, setA] = useState('3')
  const [b, setB] = useState('4')
  const [c, setC] = useState('6')

  const aV = parseFloat(a)||0, bV = parseFloat(b)||0, cV = parseFloat(c)||0
  // A:B = C:D => D = B*C/A
  const dV = aV !== 0 ? (bV * cV / aV) : 0

  // Simplify ratio A:B
  function gcd(x: number, y: number): number { return y === 0 ? x : gcd(y, x % y) }
  const g = gcd(Math.abs(Math.round(aV)), Math.abs(Math.round(bV)))
  const simA = g ? Math.round(aV) / g : aV
  const simB = g ? Math.round(bV) / g : bV

  return (
    <ToolLayout
      titleZh={t.math.ratio.title} titleEn="Ratio Calculator"
      descZh={t.math.ratio.desc} descEn="Calculate ratios and solve for unknown values in proportions"
      icon="↔️" tags={['ratio', 'proportion', 'math', '比例', '数学']}
      introZh="比例计算器支持两种功能：（1）求解比例中的未知量（A:B = C:D，已知A、B、C求D）；（2）化简比例到最简整数形式。"
      introEn="The ratio calculator supports two functions: (1) Solve for unknown values in proportions (A:B = C:D, given A, B, C find D); (2) Simplify ratios to their simplest integer form."
    >
      <div className="space-y-5">
        {/* Proportion solver */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">{locale==='zh'?'比例求解 A:B = C:D':'Proportion Solver A:B = C:D'}</h3>
          <div className="flex items-center gap-2 flex-wrap">
            {[
              { label: 'A', value: a, set: setA },
              { label: ':', value: null, set: null },
              { label: 'B', value: b, set: setB },
              { label: '=', value: null, set: null },
              { label: 'C', value: c, set: setC },
              { label: ':', value: null, set: null },
              { label: 'D', value: String(dV.toFixed(4)), set: null, readonly: true },
            ].map((f, i) => f.value === null ? (
              <span key={i} className="text-xl font-bold text-gray-400">{f.label}</span>
            ) : f.readonly ? (
              <div key={i} className="flex flex-col items-center gap-1">
                <span className="text-xs text-gray-400">{f.label}</span>
                <div className="w-20 px-2 py-2 text-center rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-lg font-bold border border-blue-200 dark:border-blue-800">{dV.toFixed(4)}</div>
              </div>
            ) : (
              <div key={i} className="flex flex-col items-center gap-1">
                <span className="text-xs text-gray-400">{f.label}</span>
                <input type="number" value={f.value!} onChange={e => f.set!(e.target.value)}
                  className="w-20 px-2 py-2 text-center rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg font-bold" />
              </div>
            ))}
          </div>
          <div className="mt-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg px-4 py-2 text-sm text-blue-700 dark:text-blue-300">
            {locale==='zh'?`D = B × C / A = ${bV} × ${cV} / ${aV} = ${dV.toFixed(6)}`:`D = B × C / A = ${bV} × ${cV} / ${aV} = ${dV.toFixed(6)}`}
          </div>
        </div>

        {/* Ratio simplifier */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-5">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">{locale==='zh'?'比例化简':'Ratio Simplifier'}</h3>
          <div className="flex items-center gap-3">
            <div>
              <span className="text-xs text-gray-400 block mb-1">A</span>
              <input type="number" value={a} onChange={e => setA(e.target.value)} className="w-20 px-2 py-2 text-center rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold" />
            </div>
            <span className="text-xl font-bold text-gray-400 mt-4">:</span>
            <div>
              <span className="text-xs text-gray-400 block mb-1">B</span>
              <input type="number" value={b} onChange={e => setB(e.target.value)} className="w-20 px-2 py-2 text-center rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold" />
            </div>
            <span className="text-xl text-gray-400 mt-4">=</span>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl px-4 py-2 mt-4 text-center">
              <span className="text-lg font-bold text-green-700 dark:text-green-300">{simA} : {simB}</span>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {locale==='zh'?`${a}:${b} 化简为 ${simA}:${simB}（最简整数比）`:`${a}:${b} simplified to ${simA}:${simB} (simplest form)`}
          </div>
        </div>
      </div>
    </ToolLayout>
  )
}

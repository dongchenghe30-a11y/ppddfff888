'use client'

import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'
import { useLanguage } from '@/contexts/LanguageContext'

export default function RandomNumberGeneratorPage() {
  const { locale, t } = useLanguage()
  const [min, setMin] = useState('1')
  const [max, setMax] = useState('100')
  const [count, setCount] = useState('1')
  const [unique, setUnique] = useState(false)
  const [results, setResults] = useState<number[]>([])
  const [history, setHistory] = useState<number[][]>([])

  const generate = () => {
    const mn = parseInt(min)||1, mx = parseInt(max)||100, cnt = Math.min(parseInt(count)||1, 100)
    if (mn > mx) return
    const range = mx - mn + 1
    let nums: number[] = []
    if (unique) {
      if (cnt > range) { alert(locale==='zh'?'不重复数量超过范围':'Count exceeds range for unique numbers'); return }
      const pool = Array.from({ length: range }, (_, i) => mn + i)
      for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i+1)); [pool[i], pool[j]] = [pool[j], pool[i]] }
      nums = pool.slice(0, cnt)
    } else {
      nums = Array.from({ length: cnt }, () => Math.floor(Math.random() * range) + mn)
    }
    setResults(nums)
    setHistory(prev => [nums, ...prev.slice(0, 4)])
  }

  return (
    <ToolLayout
      titleZh={t.math.random.title} titleEn="Random Number Generator"
      descZh={t.math.random.desc} descEn="Generate random numbers within a specified range, with optional uniqueness"
      icon="🎲" tags={['random', 'generator', 'number', '随机数', '抽签']}
      introZh="随机数生成器可以在指定范围内生成随机数，支持批量生成和不重复模式。常用于抽奖、随机抽签、数据测试、游戏等场景。"
      introEn="The random number generator can generate random numbers within a specified range, supporting batch generation and unique mode. Useful for lottery, random selection, testing and games."
    >
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: t.math.random.min, value: min, set: setMin },
            { label: t.math.random.max, value: max, set: setMax },
          ].map(f => (
            <div key={f.label}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{f.label}</label>
              <input type="number" value={f.value} onChange={e => f.set(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg" />
            </div>
          ))}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t.math.random.count} (1-100)</label>
          <input type="number" value={count} onChange={e => setCount(e.target.value)} min="1" max="100"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg" />
        </div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={unique} onChange={e => setUnique(e.target.checked)} className="w-4 h-4 rounded text-blue-600" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.math.random.unique}</span>
        </label>
        <button onClick={generate} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors text-lg">
          🎲 {t.math.random.generate}
        </button>
        {results.length > 0 && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-5">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">{locale==='zh'?'生成结果':'Results'}</div>
            <div className="flex flex-wrap gap-2">
              {results.map((n, i) => (
                <span key={i} className="bg-white dark:bg-gray-700 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-bold text-lg px-3 py-1.5 rounded-lg shadow-sm">{n}</span>
              ))}
            </div>
          </div>
        )}
        {history.length > 0 && (
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{locale==='zh'?'历史记录':'History'}</p>
            {history.slice(1).map((h, i) => (
              <div key={i} className="text-xs text-gray-400 dark:text-gray-500 py-1 border-b border-gray-100 dark:border-gray-800">{h.join(', ')}</div>
            ))}
          </div>
        )}
      </div>
    </ToolLayout>
  )
}

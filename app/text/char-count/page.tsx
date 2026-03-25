'use client'

import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'
import { useLanguage } from '@/contexts/LanguageContext'

export default function CharCountPage() {
  const { locale, t } = useLanguage()
  const [input, setInput] = useState('Hello World! 你好世界！')
  const [showAll, setShowAll] = useState(false)
  const [sortBy, setSortBy] = useState<'count'|'char'>('count')
  const [ignoreSpaces, setIgnoreSpaces] = useState(false)
  const [caseSensitive, setCaseSensitive] = useState(false)

  const getFrequency = () => {
    let text = input
    if (ignoreSpaces) text = text.replace(/\s/g, '')
    if (!caseSensitive) text = text.toLowerCase()
    const freq: Record<string, number> = {}
    for (const c of text) {
      freq[c] = (freq[c] || 0) + 1
    }
    return Object.entries(freq)
      .sort((a, b) => sortBy === 'count' ? b[1] - a[1] : a[0].localeCompare(b[0]))
  }

  const freq = getFrequency()
  const total = freq.reduce((s, [, c]) => s + c, 0)
  const displayed = showAll ? freq : freq.slice(0, 20)

  return (
    <ToolLayout
      titleZh={t.text.charCount.title} titleEn="Character Frequency Counter"
      descZh={t.text.charCount.desc} descEn="Count the frequency of each character in your text"
      icon="📊" tags={['frequency', 'statistics', 'text', '频率', '字符统计']}
      introZh="字符频率统计工具可以分析文本中每个字符出现的次数和频率，支持忽略空格、大小写不敏感等选项。适用于语言分析、密码学、文本研究等场景。"
      introEn="The character frequency counter analyzes how often each character appears in your text, with options to ignore spaces and case. Useful for language analysis, cryptography and text research."
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t.text.charCount.inputText}</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} rows={4}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={ignoreSpaces} onChange={e => setIgnoreSpaces(e.target.checked)} className="w-4 h-4 rounded text-blue-600" />
            <span className="text-gray-700 dark:text-gray-300">{locale==='zh'?'忽略空格':'Ignore spaces'}</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={caseSensitive} onChange={e => setCaseSensitive(e.target.checked)} className="w-4 h-4 rounded text-blue-600" />
            <span className="text-gray-700 dark:text-gray-300">{locale==='zh'?'区分大小写':'Case sensitive'}</span>
          </label>
          <select value={sortBy} onChange={e => setSortBy(e.target.value as typeof sortBy)}
            className="text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 focus:outline-none">
            <option value="count">{locale==='zh'?'按频率排序':'Sort by count'}</option>
            <option value="char">{locale==='zh'?'按字符排序':'Sort by char'}</option>
          </select>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">{locale==='zh'?`共 ${total} 个字符，${freq.length} 种不同字符`:`${total} total characters, ${freq.length} unique`}</div>
          <div className="grid gap-1.5">
            <div className="grid grid-cols-4 text-xs font-bold text-gray-500 dark:text-gray-400 px-2">
              <span>{t.text.charCount.char}</span>
              <span>{locale==='zh'?'类型':'Type'}</span>
              <span className="text-right">{t.text.charCount.count}</span>
              <span className="text-right">{t.text.charCount.frequency}</span>
            </div>
            {displayed.map(([ch, cnt]) => {
              const pct = total > 0 ? (cnt / total * 100) : 0
              const type = /[\u4e00-\u9fa5]/.test(ch) ? (locale==='zh'?'汉字':'Chinese') : /[a-zA-Z]/.test(ch) ? (locale==='zh'?'字母':'Letter') : /\d/.test(ch) ? (locale==='zh'?'数字':'Digit') : /\s/.test(ch) ? (locale==='zh'?'空白':'Space') : (locale==='zh'?'符号':'Symbol')
              return (
                <div key={ch} className="grid grid-cols-4 items-center bg-white dark:bg-gray-900/50 rounded-lg px-2 py-1.5 text-sm">
                  <span className="font-mono font-bold text-gray-800 dark:text-gray-200 text-base">{ch === ' ' ? '·' : ch}</span>
                  <span className="text-xs text-gray-400">{type}</span>
                  <span className="text-right font-medium text-gray-700 dark:text-gray-300">{cnt}</span>
                  <span className="text-right text-blue-600 dark:text-blue-400">{pct.toFixed(1)}%</span>
                </div>
              )
            })}
          </div>
          {freq.length > 20 && (
            <button onClick={() => setShowAll(!showAll)} className="mt-3 text-sm text-blue-600 dark:text-blue-400 hover:underline w-full text-center">
              {showAll ? (locale==='zh'?'收起':'Show less') : (locale==='zh'?`展开全部 ${freq.length} 种字符`:`Show all ${freq.length} characters`)}
            </button>
          )}
        </div>
      </div>
    </ToolLayout>
  )
}

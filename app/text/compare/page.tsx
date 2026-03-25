'use client'

import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'
import { useLanguage } from '@/contexts/LanguageContext'

export default function TextComparePage() {
  const { locale, t } = useLanguage()
  const [text1, setText1] = useState('The quick brown fox\njumps over the lazy dog\nHello World')
  const [text2, setText2] = useState('The quick brown fox\njumps over the lazy cat\nHello World!')

  const lines1 = text1.split('\n')
  const lines2 = text2.split('\n')
  const maxLen = Math.max(lines1.length, lines2.length)

  const diffs = Array.from({ length: maxLen }, (_, i) => {
    const l1 = lines1[i] ?? ''
    const l2 = lines2[i] ?? ''
    if (l1 === l2) return { type: 'same', l1, l2 }
    if (!lines1[i]) return { type: 'added', l1: '', l2 }
    if (!lines2[i]) return { type: 'removed', l1, l2: '' }
    return { type: 'changed', l1, l2 }
  })

  const diffCount = diffs.filter(d => d.type !== 'same').length
  const isIdentical = diffCount === 0

  const diffColors: Record<string, string> = {
    same: '',
    added: 'bg-green-50 dark:bg-green-900/20',
    removed: 'bg-red-50 dark:bg-red-900/20',
    changed: 'bg-yellow-50 dark:bg-yellow-900/20',
  }

  return (
    <ToolLayout
      titleZh={t.text.compareText.title} titleEn="Text Comparator"
      descZh={t.text.compareText.desc} descEn="Compare two texts line by line and highlight differences"
      icon="🔀" tags={['compare', 'diff', 'text', '对比', '文本比较']}
      introZh="文本比较工具逐行对比两段文本，并高亮显示差异：绿色表示新增行，红色表示删除行，黄色表示修改行。常用于代码审查、文档校对等场景。"
      introEn="The text comparator compares two texts line by line and highlights differences: green for added, red for removed, yellow for changed lines. Useful for code review and document proofreading."
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t.text.compareText.text1}</label>
            <textarea value={text1} onChange={e => setText1(e.target.value)} rows={6}
              className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-xs resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t.text.compareText.text2}</label>
            <textarea value={text2} onChange={e => setText2(e.target.value)} rows={6}
              className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-xs resize-none" />
          </div>
        </div>

        {isIdentical ? (
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 text-center text-green-700 dark:text-green-300 font-medium">
            ✅ {t.text.compareText.identical}
          </div>
        ) : (
          <>
            <div className="flex gap-3 text-xs">
              {[
                { color: 'bg-yellow-100 dark:bg-yellow-900/30', label: locale==='zh'?'修改行':'Changed', count: diffs.filter(d=>d.type==='changed').length },
                { color: 'bg-red-100 dark:bg-red-900/30', label: locale==='zh'?'删除行':'Removed', count: diffs.filter(d=>d.type==='removed').length },
                { color: 'bg-green-100 dark:bg-green-900/30', label: locale==='zh'?'新增行':'Added', count: diffs.filter(d=>d.type==='added').length },
              ].map(s => (
                <span key={s.label} className={`${s.color} px-2 py-1 rounded-lg text-gray-700 dark:text-gray-300 font-medium`}>{s.label}: {s.count}</span>
              ))}
            </div>
            <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
              {diffs.map((d, i) => d.type === 'same' ? null : (
                <div key={i} className={`${diffColors[d.type]} grid grid-cols-2 divide-x divide-gray-200 dark:divide-gray-700`}>
                  <div className="px-3 py-1.5 font-mono text-xs text-red-700 dark:text-red-300 overflow-hidden">
                    {d.type === 'added' ? <span className="text-gray-300">—</span> : <span>- {d.l1}</span>}
                  </div>
                  <div className="px-3 py-1.5 font-mono text-xs text-green-700 dark:text-green-300 overflow-hidden">
                    {d.type === 'removed' ? <span className="text-gray-300">—</span> : <span>+ {d.l2}</span>}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </ToolLayout>
  )
}

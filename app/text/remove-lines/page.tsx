'use client'

import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'
import { useLanguage } from '@/contexts/LanguageContext'

export default function RemoveLinesPage() {
  const { locale, t } = useLanguage()
  const [input, setInput] = useState('Line 1\n\nLine 2\n\n\nLine 3\n   \nLine 4')
  const [trimSpaces, setTrimSpaces] = useState(true)
  const [removeDups, setRemoveDups] = useState(false)
  const [copied, setCopied] = useState(false)

  const process = (text: string) => {
    let lines = text.split('\n')
    if (trimSpaces) lines = lines.map(l => l.trim())
    lines = lines.filter(l => l.length > 0)
    if (removeDups) lines = Array.from(new Set(lines))
    return lines.join('\n')
  }

  const output = process(input)
  const inputLines = input.split('\n').length
  const outputLines = output ? output.split('\n').length : 0
  const removed = inputLines - outputLines

  const copy = () => {
    navigator.clipboard.writeText(output).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) })
  }

  return (
    <ToolLayout
      titleZh={t.text.removeLines.title} titleEn="Remove Empty Lines"
      descZh={t.text.removeLines.desc} descEn="Remove blank lines and excess whitespace from text"
      icon="🗑️" tags={['text', 'clean', 'empty lines', '空行', '文本清理']}
      introZh="去除空行工具可以快速删除文本中的空行、只含空格的行，以及可选的重复行。适用于代码格式化、文本整理等场景。"
      introEn="The empty line remover quickly removes blank lines, whitespace-only lines, and optionally duplicate lines from text. Useful for code formatting and text cleanup."
    >
      <div className="space-y-4">
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={trimSpaces} onChange={e => setTrimSpaces(e.target.checked)} className="w-4 h-4 rounded text-blue-600" />
            <span className="text-sm text-gray-700 dark:text-gray-300">{t.text.removeLines.trimSpaces}</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={removeDups} onChange={e => setRemoveDups(e.target.checked)} className="w-4 h-4 rounded text-blue-600" />
            <span className="text-sm text-gray-700 dark:text-gray-300">{locale==='zh'?'删除重复行':'Remove duplicate lines'}</span>
          </label>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t.text.removeLines.inputText}</label>
            <textarea value={input} onChange={e => setInput(e.target.value)} rows={10}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm resize-none" />
            <p className="text-xs text-gray-400 mt-1">{inputLines} {locale==='zh'?'行':'lines'}</p>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.text.removeLines.outputText}</label>
              <button onClick={copy} className="text-xs text-blue-600 dark:text-blue-400 hover:underline">{copied?(locale==='zh'?'✓ 已复制':'✓ Copied'):(locale==='zh'?'复制':'Copy')}</button>
            </div>
            <div className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 font-mono text-sm text-gray-800 dark:text-gray-200 min-h-[250px] whitespace-pre-wrap overflow-auto">
              {output || <span className="text-gray-300">{locale==='zh'?'输入文本后自动处理':'Result will appear here'}</span>}
            </div>
            <p className="text-xs text-gray-400 mt-1">
              {outputLines} {locale==='zh'?'行':'lines'}
              {removed > 0 && <span className="ml-2 text-green-600 dark:text-green-400">(-{removed} {locale==='zh'?'行':'lines removed'})</span>}
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  )
}

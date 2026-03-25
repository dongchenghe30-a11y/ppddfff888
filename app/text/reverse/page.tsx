'use client'

import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ReverseTextPage() {
  const { locale, t } = useLanguage()
  const [input, setInput] = useState('Hello World! 你好世界！')
  const [mode, setMode] = useState<'chars'|'words'|'lines'>('chars')
  const [copied, setCopied] = useState(false)

  const reverse = () => {
    if (mode === 'chars') return input.split('').reverse().join('')
    if (mode === 'words') return input.split(/\s+/).reverse().join(' ')
    return input.split('\n').reverse().join('\n')
  }

  const output = reverse()
  const copy = () => {
    navigator.clipboard.writeText(output).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) })
  }

  const modes = [
    { key: 'chars', zh: '字符倒序', en: 'Reverse Characters' },
    { key: 'words', zh: '单词倒序', en: 'Reverse Words' },
    { key: 'lines', zh: '行倒序', en: 'Reverse Lines' },
  ]

  return (
    <ToolLayout
      titleZh={t.text.reverseText.title} titleEn="Reverse Text"
      descZh={t.text.reverseText.desc} descEn="Reverse text by characters, words or lines"
      icon="🔄" tags={['reverse', 'text', 'fun', '倒序', '文本']}
      introZh="文本倒序工具支持三种模式：按字符倒序（每个字符反转顺序）、按单词倒序（保持每个单词不变，颠倒单词顺序）、按行倒序（颠倒每行的顺序）。"
      introEn="The reverse text tool supports three modes: character reversal (reverse every character), word reversal (keep words intact but reverse order), and line reversal (reverse the order of lines)."
    >
      <div className="space-y-4">
        <div className="flex gap-2">
          {modes.map(m => (
            <button key={m.key} onClick={() => setMode(m.key as typeof mode)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${mode===m.key?'bg-blue-600 text-white':'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-50'}`}>
              {locale==='zh'?m.zh:m.en}
            </button>
          ))}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{locale==='zh'?'输入文本':'Input Text'}</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} rows={4}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{locale==='zh'?'倒序结果':'Result'}</label>
            <button onClick={copy} className="text-xs text-blue-600 dark:text-blue-400 hover:underline">{copied?(locale==='zh'?'✓ 已复制':'✓ Copied'):(locale==='zh'?'复制':'Copy')}</button>
          </div>
          <div className="w-full px-4 py-3 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 min-h-16 whitespace-pre-wrap break-all">{output}</div>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center text-sm">
          {[
            { label: locale==='zh'?'字符数':'Chars', val: input.length },
            { label: locale==='zh'?'单词数':'Words', val: input.split(/\s+/).filter(Boolean).length },
            { label: locale==='zh'?'行数':'Lines', val: input.split('\n').length },
          ].map(s => (
            <div key={s.label} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2">
              <div className="text-gray-400 text-xs">{s.label}</div>
              <div className="font-bold text-gray-700 dark:text-gray-300">{s.val}</div>
            </div>
          ))}
        </div>
      </div>
    </ToolLayout>
  )
}

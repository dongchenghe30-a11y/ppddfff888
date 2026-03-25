'use client'

import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'
import { useLanguage } from '@/contexts/LanguageContext'

export default function UrlEncoderPage() {
  const { locale, t } = useLanguage()
  const [mode, setMode] = useState<'encode'|'decode'>('encode')
  const [input, setInput] = useState('https://example.com/search?q=你好世界&lang=zh')
  const [copied, setCopied] = useState(false)

  const output = (() => {
    try {
      return mode === 'encode' ? encodeURIComponent(input) : decodeURIComponent(input)
    } catch {
      return locale === 'zh' ? '⚠️ 解码失败，请检查输入' : '⚠️ Decode failed, please check input'
    }
  })()

  const copy = () => {
    navigator.clipboard.writeText(output).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) })
  }

  return (
    <ToolLayout
      titleZh={t.dev.url.title} titleEn="URL Encoder / Decoder"
      descZh={t.dev.url.desc} descEn="Encode and decode URLs to handle special characters safely"
      icon="🔗" tags={['url', 'encode', 'decode', 'web', 'HTTP', 'URL编码']}
      introZh="URL编码将URL中的特殊字符（中文、空格、标点等）转换为%XX格式，确保URL在网络传输中安全有效。URL解码则还原被编码的URL。"
      introEn="URL encoding converts special characters (Chinese, spaces, punctuation) to %XX format for safe transmission. URL decoding reverses the process."
    >
      <div className="space-y-4">
        <div className="flex gap-2">
          {[
            { key: 'encode', zh: '编码', en: 'Encode' },
            { key: 'decode', zh: '解码', en: 'Decode' },
          ].map(m => (
            <button key={m.key} onClick={() => setMode(m.key as typeof mode)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-colors ${mode===m.key?'bg-blue-600 text-white':'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-50'}`}>
              {locale==='zh'?m.zh:m.en}
            </button>
          ))}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{locale==='zh'?'输入内容':'Input'}</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} rows={4}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm resize-none" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{locale==='zh'?'输出结果':'Output'}</label>
            <button onClick={copy} className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
              {copied ? (locale==='zh'?'✓ 已复制':'✓ Copied') : (locale==='zh'?'复制':'Copy')}
            </button>
          </div>
          <div className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 font-mono text-sm text-gray-800 dark:text-gray-200 break-all min-h-16">{output}</div>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm text-gray-500 dark:text-gray-400">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
            <p className="font-medium mb-1">{locale==='zh'?'输入长度':'Input length'}</p>
            <p>{input.length} {locale==='zh'?'字符':'chars'}</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
            <p className="font-medium mb-1">{locale==='zh'?'输出长度':'Output length'}</p>
            <p>{output.length} {locale==='zh'?'字符':'chars'}</p>
          </div>
        </div>
      </div>
    </ToolLayout>
  )
}

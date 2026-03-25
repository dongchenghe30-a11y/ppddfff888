'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import ToolLayout from '@/components/ToolLayout'
import { Copy } from 'lucide-react'

export default function Base64Page() {
  const { locale, t } = useLanguage()
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const process = () => {
    setError('')
    try {
      if (mode === 'encode') {
        setOutput(btoa(unescape(encodeURIComponent(input))))
      } else {
        setOutput(decodeURIComponent(escape(atob(input))))
      }
    } catch {
      setError(locale === 'zh' ? '解码失败，请检查输入是否为有效的Base64字符串' : 'Decoding failed. Please ensure the input is valid Base64.')
    }
  }

  const copy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <ToolLayout
      titleZh="Base64 编解码"
      titleEn="Base64 Encoder/Decoder"
      descZh="Base64文本编码和解码，支持Unicode字符"
      descEn="Base64 text encoding and decoding with Unicode support"
      icon="🔐"
      tags={['base64', 'encode', 'decode', 'encoding', 'Base64编解码']}
      introZh="Base64是一种将二进制数据编码为ASCII字符的方法，常用于电子邮件附件、网页中的图像嵌入和API数据传输。本工具支持包含中文在内的所有Unicode字符。"
      introEn="Base64 is a method of encoding binary data as ASCII characters, commonly used for email attachments, image embedding in web pages, and API data transmission. This tool supports all Unicode characters including Chinese."
    >
      <div className="space-y-4">
        <div className="flex rounded-xl border border-gray-300 dark:border-gray-600 overflow-hidden">
          {(['encode', 'decode'] as const).map(m => (
            <button key={m} onClick={() => { setMode(m); setOutput(''); setError('') }}
              className={`flex-1 py-2.5 text-sm font-medium transition-colors ${mode === m ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'}`}
            >
              {locale === 'zh' ? (m === 'encode' ? '编码' : '解码') : (m === 'encode' ? 'Encode' : 'Decode')}
            </button>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t.dev.base64.inputText}</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} rows={5}
            placeholder={mode === 'encode' ? (locale === 'zh' ? '输入文本进行Base64编码...' : 'Enter text to Base64 encode...') : (locale === 'zh' ? '输入Base64字符串进行解码...' : 'Enter Base64 string to decode...')}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm resize-none"
          />
        </div>

        <button onClick={process} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors">
          {locale === 'zh' ? (mode === 'encode' ? '编码' : '解码') : (mode === 'encode' ? 'Encode' : 'Decode')}
        </button>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        {output && (
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.dev.base64.outputText}</label>
              <button onClick={copy} className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline">
                <Copy size={12} /> {copied ? (locale === 'zh' ? '已复制!' : 'Copied!') : t.common.copy}
              </button>
            </div>
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl font-mono text-sm text-gray-800 dark:text-gray-200 break-all select-all">
              {output}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}

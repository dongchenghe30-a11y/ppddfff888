'use client'

import { useState, useEffect } from 'react'
import ToolLayout from '@/components/ToolLayout'
import { useLanguage } from '@/contexts/LanguageContext'

// Simple hash implementations using Web Crypto API
async function hashText(text: string, algo: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(text)
  const hashBuffer = await crypto.subtle.digest(algo, data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

export default function HashCalculatorPage() {
  const { locale, t } = useLanguage()
  const [input, setInput] = useState('Hello, World!')
  const [hashes, setHashes] = useState({ md5: '', sha1: '', sha256: '', sha512: '' })
  const [copied, setCopied] = useState('')

  useEffect(() => {
    const compute = async () => {
      if (!input) { setHashes({ md5: '', sha1: '', sha256: '', sha512: '' }); return }
      const [sha1, sha256, sha512] = await Promise.all([
        hashText(input, 'SHA-1'),
        hashText(input, 'SHA-256'),
        hashText(input, 'SHA-512'),
      ])
      // Simple MD5-like display (Web Crypto doesn't support MD5 natively)
      const md5like = sha256.slice(0, 32) // Note: This is NOT real MD5
      setHashes({ md5: md5like, sha1, sha256, sha512 })
    }
    compute()
  }, [input])

  const copy = (val: string, key: string) => {
    navigator.clipboard.writeText(val).then(() => { setCopied(key); setTimeout(() => setCopied(''), 2000) })
  }

  const hashItems = [
    { key: 'sha1', label: 'SHA-1', value: hashes.sha1 },
    { key: 'sha256', label: 'SHA-256', value: hashes.sha256 },
    { key: 'sha512', label: 'SHA-512', value: hashes.sha512 },
  ]

  return (
    <ToolLayout
      titleZh={t.dev.hash.title} titleEn="Hash Calculator"
      descZh={t.dev.hash.desc} descEn="Calculate SHA-1, SHA-256, SHA-512 hash values for any text"
      icon="#️⃣" tags={['hash', 'sha256', 'sha1', 'security', '哈希', '加密']}
      introZh="哈希计算器可以计算文本的SHA-1、SHA-256、SHA-512哈希值。哈希函数是单向的，常用于密码验证、数据完整性校验、数字签名等安全场景。"
      introEn="The hash calculator computes SHA-1, SHA-256 and SHA-512 hash values for any text. Hash functions are one-way and widely used for password verification, data integrity and digital signatures."
    >
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t.dev.hash.inputText}</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} rows={3}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm resize-none" />
        </div>
        <div className="space-y-3">
          {hashItems.map(h => (
            <div key={h.key} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{h.label}</span>
                <button onClick={() => copy(h.value, h.key)} className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                  {copied===h.key?(locale==='zh'?'✓ 已复制':'✓ Copied'):(locale==='zh'?'复制':'Copy')}
                </button>
              </div>
              <div className="font-mono text-xs text-gray-600 dark:text-gray-400 break-all bg-white dark:bg-gray-900 rounded-lg px-3 py-2 border border-gray-200 dark:border-gray-700">
                {h.value || <span className="text-gray-300 dark:text-gray-600">{locale==='zh'?'请输入文本':'Enter text above'}</span>}
              </div>
              <div className="text-xs text-gray-400 mt-1">{h.value.length} {locale==='zh'?'位十六进制':'hex characters'}</div>
            </div>
          ))}
        </div>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4 text-sm text-yellow-800 dark:text-yellow-200">
          ⚠️ {locale==='zh'?'注意：哈希值会随输入内容变化而完全改变，即使只修改一个字符。':'Note: Hash values change completely with even a single character change in input.'}
        </div>
      </div>
    </ToolLayout>
  )
}

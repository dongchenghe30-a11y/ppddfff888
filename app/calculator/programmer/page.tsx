'use client'

import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'
import { useLanguage } from '@/contexts/LanguageContext'

const BASES = [
  { key: 2, label: '二进制', labelEn: 'Binary', prefix: '0b', chars: '01' },
  { key: 8, label: '八进制', labelEn: 'Octal', prefix: '0o', chars: '01234567' },
  { key: 10, label: '十进制', labelEn: 'Decimal', prefix: '', chars: '0123456789' },
  { key: 16, label: '十六进制', labelEn: 'Hex', prefix: '0x', chars: '0123456789abcdef' },
]

export default function ProgrammerCalcPage() {
  const { locale } = useLanguage()
  const [value, setValue] = useState('0')
  const [currentBase, setCurrentBase] = useState(10)

  const numValue = parseInt(value || '0', currentBase)
  const safe = isNaN(numValue) ? 0 : numValue

  const convert = (toBase: number) => {
    if (isNaN(numValue)) return '错误'
    return safe.toString(toBase).toUpperCase()
  }

  const handleInput = (v: string) => {
    const allowed = BASES.find(b => b.key === currentBase)?.chars || ''
    const filtered = v.toLowerCase().split('').filter(c => allowed.includes(c)).join('')
    setValue(filtered || '0')
  }

  const bitwiseOps = [
    { label: 'NOT', value: (~safe >>> 0).toString(2) },
    { label: 'AND 0xFF', value: (safe & 0xFF).toString(16).toUpperCase() },
    { label: 'OR 0xFF', value: (safe | 0xFF).toString(16).toUpperCase() },
    { label: 'XOR 0xFF', value: (safe ^ 0xFF).toString(16).toUpperCase() },
    { label: 'Left Shift <<1', value: (safe << 1).toString() },
    { label: 'Right Shift >>1', value: (safe >> 1).toString() },
  ]

  return (
    <ToolLayout
      titleZh="编程计算器" titleEn="Programmer Calculator"
      descZh="支持二进制、八进制、十六进制和位运算的专业计算器" descEn="Professional calculator with binary, octal, hex and bitwise operations"
      icon="💻" tags={['binary', 'hex', 'bitwise', '进制转换', '位运算']}
      introZh="编程计算器是程序员的必备工具，支持二进制（Binary）、八进制（Octal）、十进制（Decimal）、十六进制（Hex）四种进制之间的实时转换，并支持常用的位运算操作（AND、OR、XOR、NOT、移位）。"
      introEn="Programmer calculator is an essential tool for developers, supporting real-time conversion between binary, octal, decimal, and hexadecimal, plus bitwise operations (AND, OR, XOR, NOT, shift)."
    >
      <div className="space-y-5">
        {/* Base selector */}
        <div className="flex gap-2 flex-wrap">
          {BASES.map(b => (
            <button key={b.key} onClick={() => { setCurrentBase(b.key); setValue('0') }}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${currentBase === b.key ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20'}`}
            >
              {locale === 'zh' ? b.label : b.labelEn} ({b.key})
            </button>
          ))}
        </div>

        {/* Input */}
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1.5">
            {locale === 'zh' ? '输入数值' : 'Enter Value'} ({locale === 'zh' ? BASES.find(b => b.key === currentBase)?.label : BASES.find(b => b.key === currentBase)?.labelEn})
          </label>
          <input
            type="text" value={value}
            onChange={e => handleInput(e.target.value)}
            className="w-full px-4 py-3 text-xl font-mono rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Conversions */}
        <div className="grid gap-3">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">{locale === 'zh' ? '进制转换结果' : 'Base Conversions'}</h3>
          {BASES.map(b => (
            <div key={b.key} className={`flex items-center justify-between px-4 py-3 rounded-xl ${b.key === currentBase ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800' : 'bg-gray-50 dark:bg-gray-800'}`}>
              <span className="text-sm text-gray-500 dark:text-gray-400 w-24">{locale === 'zh' ? b.label : b.labelEn} ({b.key})</span>
              <span className="font-mono font-bold text-gray-900 dark:text-white text-right flex-1">{b.prefix}{convert(b.key)}</span>
            </div>
          ))}
        </div>

        {/* Binary display */}
        <div className="bg-gray-900 rounded-xl p-4">
          <p className="text-xs text-gray-400 mb-2">{locale === 'zh' ? '32位二进制表示' : '32-bit Binary Representation'}</p>
          <p className="font-mono text-green-400 text-sm break-all">{(safe >>> 0).toString(2).padStart(32, '0').match(/.{4}/g)?.join(' ')}</p>
        </div>

        {/* Bitwise ops */}
        <div>
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">{locale === 'zh' ? '位运算结果' : 'Bitwise Operations'}</h3>
          <div className="grid grid-cols-2 gap-2">
            {bitwiseOps.map(op => (
              <div key={op.label} className="bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2">
                <span className="text-xs text-gray-500 dark:text-gray-400 block">{op.label}</span>
                <span className="font-mono text-sm text-blue-600 dark:text-blue-400 font-bold">{op.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToolLayout>
  )
}

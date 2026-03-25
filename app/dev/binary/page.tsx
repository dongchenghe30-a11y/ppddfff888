'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import ToolLayout from '@/components/ToolLayout'
import { Copy } from 'lucide-react'

export default function BinaryConverterPage() {
  const { locale, t } = useLanguage()
  const [values, setValues] = useState({ decimal: '', binary: '', octal: '', hex: '' })
  const [copied, setCopied] = useState('')

  const fromDecimal = (dec: number) => {
    if (isNaN(dec) || !isFinite(dec)) return { decimal: '', binary: '', octal: '', hex: '' }
    return {
      decimal: String(dec),
      binary: dec.toString(2),
      octal: dec.toString(8),
      hex: dec.toString(16).toUpperCase(),
    }
  }

  const handleChange = (field: string, val: string) => {
    try {
      let dec: number
      if (field === 'decimal') dec = parseInt(val, 10)
      else if (field === 'binary') dec = parseInt(val, 2)
      else if (field === 'octal') dec = parseInt(val, 8)
      else dec = parseInt(val, 16)
      setValues(isNaN(dec) ? { ...values, [field]: val } : fromDecimal(dec))
    } catch {
      setValues({ ...values, [field]: val })
    }
  }

  const copy = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopied(field)
    setTimeout(() => setCopied(''), 2000)
  }

  const fields = [
    { key: 'decimal', label: t.dev.binary.decimal, prefix: 'Dec', placeholder: '42', pattern: '[0-9]*' },
    { key: 'binary', label: t.dev.binary.binary, prefix: 'Bin', placeholder: '101010', pattern: '[01]*' },
    { key: 'octal', label: t.dev.binary.octal, prefix: 'Oct', placeholder: '52', pattern: '[0-7]*' },
    { key: 'hex', label: t.dev.binary.hex, prefix: 'Hex', placeholder: '2A', pattern: '[0-9a-fA-F]*' },
  ]

  return (
    <ToolLayout
      titleZh="进制转换器"
      titleEn="Number Base Converter"
      descZh="二进制、八进制、十进制、十六进制实时互转"
      descEn="Real-time conversion between binary, octal, decimal and hexadecimal"
      icon="0️⃣"
      tags={['binary', 'hexadecimal', 'octal', 'decimal', '进制转换', 'programming']}
      introZh="进制转换器支持二进制（Base-2）、八进制（Base-8）、十进制（Base-10）和十六进制（Base-16）之间的实时互转。在任何一个输入框输入数字，其他进制会自动更新。"
      introEn="The number base converter supports real-time conversion between binary (Base-2), octal (Base-8), decimal (Base-10), and hexadecimal (Base-16). Enter a number in any field and the others update automatically."
      useCaseZh={`• 调试计算机程序\n• 了解内存地址（十六进制）\n• 计算机网络和子网掩码\n• 位运算和权限设置（八进制）\n• CSS颜色代码转换`}
      useCaseEn={`• Debugging computer programs\n• Understanding memory addresses (hexadecimal)\n• Computer networking and subnet masks\n• Bit operations and permissions (octal)\n• CSS color code conversion`}
      faqZh={[
        { q: '最大可以转换多大的数？', a: '受限于JavaScript的整数精度，建议转换不超过2^53的整数以确保精确度。' },
        { q: '十六进制字母区分大小写吗？', a: '不区分，输入a和A都代表10，本工具输出统一使用大写字母。' },
      ]}
      faqEn={[
        { q: 'What is the maximum number that can be converted?', a: 'Limited by JavaScript integer precision, it is recommended to convert integers not exceeding 2^53 for accuracy.' },
        { q: 'Are hexadecimal letters case-sensitive?', a: 'No, both a and A represent 10. This tool outputs uppercase letters consistently.' },
      ]}
    >
      <div className="space-y-4">
        {fields.map(f => (
          <div key={f.key}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{f.label}</label>
            <div className="flex items-center gap-2">
              <span className="shrink-0 text-xs font-mono bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-3 py-2.5 rounded-l-xl border border-r-0 border-gray-300 dark:border-gray-600 w-14 text-center">
                {f.prefix}
              </span>
              <input
                type="text"
                value={values[f.key as keyof typeof values]}
                onChange={e => handleChange(f.key, e.target.value.toUpperCase())}
                placeholder={f.placeholder}
                pattern={f.pattern}
                className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-lg"
              />
              <button onClick={() => copy(values[f.key as keyof typeof values], f.key)}
                className="shrink-0 p-2.5 rounded-r-xl border border-l-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-500 transition-colors"
              >
                <Copy size={16} className={copied === f.key ? 'text-green-500' : ''} />
              </button>
            </div>
          </div>
        ))}

        {/* Quick reference */}
        <div className="mt-6 bg-gray-50 dark:bg-gray-700/30 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            {locale === 'zh' ? '快速参考表' : 'Quick Reference'}
          </h3>
          <div className="grid grid-cols-4 gap-2 text-xs font-mono">
            <div className="font-semibold text-gray-600 dark:text-gray-400">Dec</div>
            <div className="font-semibold text-gray-600 dark:text-gray-400">Bin</div>
            <div className="font-semibold text-gray-600 dark:text-gray-400">Oct</div>
            <div className="font-semibold text-gray-600 dark:text-gray-400">Hex</div>
            {[0,1,2,4,8,10,15,16,255].map(n => [
              <div key={`d${n}`} className="text-gray-800 dark:text-gray-200">{n}</div>,
              <div key={`b${n}`} className="text-blue-600 dark:text-blue-400">{n.toString(2)}</div>,
              <div key={`o${n}`} className="text-green-600 dark:text-green-400">{n.toString(8)}</div>,
              <div key={`h${n}`} className="text-purple-600 dark:text-purple-400">{n.toString(16).toUpperCase()}</div>,
            ])}
          </div>
        </div>
      </div>
    </ToolLayout>
  )
}

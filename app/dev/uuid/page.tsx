'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import ToolLayout from '@/components/ToolLayout'
import { Copy, RefreshCw } from 'lucide-react'

export default function UUIDGeneratorPage() {
  const { locale, t } = useLanguage()
  const [count, setCount] = useState(1)
  const [uuids, setUuids] = useState<string[]>([])
  const [copied, setCopied] = useState('')

  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0
      const v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }

  const generate = () => {
    setUuids(Array.from({ length: Math.min(count, 20) }, generateUUID))
  }

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(''), 2000)
  }

  const copyAll = () => {
    copy(uuids.join('\n'), 'all')
  }

  return (
    <ToolLayout
      titleZh="UUID 生成器"
      titleEn="UUID Generator"
      descZh="生成标准的UUID v4，支持批量生成，一键复制"
      descEn="Generate standard UUID v4, supports batch generation with one-click copy"
      icon="🆔"
      tags={['uuid', 'guid', 'generator', 'unique id', 'UUID生成器']}
      introZh="UUID (通用唯一识别码) 是一个128位数字标识符，用于在分布式系统中唯一标识信息。v4版本使用随机数生成，碰撞概率极低，广泛用于数据库主键、API密钥等场景。"
      introEn="UUID (Universally Unique Identifier) is a 128-bit identifier used to uniquely identify information in distributed systems. Version 4 uses random numbers with an extremely low collision probability, widely used for database primary keys, API keys, etc."
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              {t.dev.uuid.count}
            </label>
            <input type="number" min="1" max="20" value={count} onChange={e => setCount(parseInt(e.target.value) || 1)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button onClick={generate}
            className="flex items-center gap-2 mt-7 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-5 rounded-xl transition-colors"
          >
            <RefreshCw size={16} /> {t.dev.uuid.generate}
          </button>
        </div>

        {uuids.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.dev.uuid.results}</h3>
              <button onClick={copyAll} className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                <Copy size={12} /> {copied === 'all' ? (locale === 'zh' ? '已复制!' : 'Copied!') : (locale === 'zh' ? '复制全部' : 'Copy All')}
              </button>
            </div>
            <div className="space-y-2">
              {uuids.map((uuid, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 rounded-xl font-mono text-sm">
                  <span className="text-gray-800 dark:text-gray-200">{uuid}</span>
                  <button onClick={() => copy(uuid, uuid)} className="ml-3 shrink-0">
                    <Copy size={14} className={copied === uuid ? 'text-green-500' : 'text-gray-400 hover:text-blue-500'} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}

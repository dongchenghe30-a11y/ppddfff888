'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import ToolLayout from '@/components/ToolLayout'
import { Copy } from 'lucide-react'

export default function TimestampPage() {
  const { locale, t } = useLanguage()
  const [timestamp, setTimestamp] = useState('')
  const [dateStr, setDateStr] = useState('')
  const [currentTs, setCurrentTs] = useState(0)
  const [copied, setCopied] = useState('')

  useEffect(() => {
    const timer = setInterval(() => setCurrentTs(Math.floor(Date.now() / 1000)), 1000)
    setCurrentTs(Math.floor(Date.now() / 1000))
    return () => clearInterval(timer)
  }, [])

  const tsToDate = () => {
    const ts = parseInt(timestamp)
    if (!isNaN(ts)) {
      const d = new Date(ts * 1000)
      setDateStr(d.toLocaleString(locale === 'zh' ? 'zh-CN' : 'en-US'))
    }
  }

  const dateToTs = () => {
    const d = new Date(dateStr)
    if (!isNaN(d.getTime())) {
      setTimestamp(String(Math.floor(d.getTime() / 1000)))
    }
  }

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(''), 2000)
  }

  const now = new Date()
  const formatDates = [
    { label: 'ISO 8601', value: now.toISOString() },
    { label: locale === 'zh' ? '本地时间' : 'Local Time', value: now.toLocaleString(locale === 'zh' ? 'zh-CN' : 'en-US') },
    { label: 'UTC', value: now.toUTCString() },
    { label: 'Unix (s)', value: String(Math.floor(Date.now() / 1000)) },
    { label: 'Unix (ms)', value: String(Date.now()) },
  ]

  return (
    <ToolLayout
      titleZh="时间戳转换器"
      titleEn="Timestamp Converter"
      descZh="Unix时间戳与可读日期格式实时互转"
      descEn="Real-time conversion between Unix timestamps and human-readable date formats"
      icon="🕐"
      tags={['timestamp', 'unix time', 'datetime', '时间戳', '日期', 'programming']}
      introZh="Unix时间戳是从1970年1月1日00:00:00 UTC到当前时间的秒数。时间戳在计算机编程中广泛使用，用于记录时间点、计算时间差等。"
      introEn="Unix timestamp is the number of seconds since January 1, 1970 00:00:00 UTC. Timestamps are widely used in programming to record time points and calculate time differences."
      faqZh={[
        { q: '秒级和毫秒级时间戳有什么区别？', a: 'Unix时间戳通常以秒为单位（10位），JavaScript中Date.now()返回毫秒级（13位）时间戳。' },
        { q: '2038年问题是什么？', a: '32位系统的时间戳在2038年1月19日会溢出，称为"2038年问题"。64位系统不受影响。' },
      ]}
      faqEn={[
        { q: 'What is the difference between second and millisecond timestamps?', a: 'Unix timestamps are usually in seconds (10 digits), while JavaScript\'s Date.now() returns millisecond timestamps (13 digits).' },
        { q: 'What is the Year 2038 problem?', a: '32-bit systems will overflow their timestamp counter on January 19, 2038, known as the "Year 2038 problem". 64-bit systems are not affected.' },
      ]}
    >
      <div className="space-y-5">
        {/* Current timestamp */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{locale === 'zh' ? '当前Unix时间戳' : 'Current Unix Timestamp'}</div>
              <div className="text-2xl font-mono font-bold text-blue-700 dark:text-blue-300">{currentTs}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {new Date().toLocaleString(locale === 'zh' ? 'zh-CN' : 'en-US')}
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => copy(String(currentTs), 'current')} className="p-2 rounded-lg bg-white dark:bg-gray-700 border border-blue-200 dark:border-blue-700">
                <Copy size={16} className={copied === 'current' ? 'text-green-500' : 'text-blue-500'} />
              </button>
            </div>
          </div>
        </div>

        {/* Timestamp to Date */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 space-y-3">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">{t.dev.timestamp.toDateTime}</h3>
          <div className="flex gap-2">
            <input type="text" value={timestamp} onChange={e => setTimestamp(e.target.value)} placeholder="e.g. 1700000000"
              className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 font-mono text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button onClick={tsToDate} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
              {locale === 'zh' ? '转换' : 'Convert'}
            </button>
          </div>
          {dateStr && <div className="px-3 py-2 bg-green-50 dark:bg-green-900/20 rounded-lg font-mono text-green-700 dark:text-green-400">{dateStr}</div>}
        </div>

        {/* Date to Timestamp */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 space-y-3">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">{t.dev.timestamp.toTimestamp}</h3>
          <div className="flex gap-2">
            <input type="datetime-local" value={dateStr.includes('T') ? dateStr.slice(0, 16) : ''} onChange={e => setDateStr(e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button onClick={dateToTs} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
              {locale === 'zh' ? '转换' : 'Convert'}
            </button>
          </div>
          {timestamp && <div className="px-3 py-2 bg-green-50 dark:bg-green-900/20 rounded-lg font-mono text-green-700 dark:text-green-400">{timestamp}</div>}
        </div>

        {/* Common formats */}
        <div>
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">{locale === 'zh' ? '常用时间格式' : 'Common Date Formats'}</h3>
          <div className="space-y-2">
            {formatDates.map(item => (
              <div key={item.label} className="flex items-center justify-between px-3 py-2 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                <span className="text-xs text-gray-500 dark:text-gray-400 w-24 shrink-0">{item.label}</span>
                <span className="text-sm font-mono text-gray-800 dark:text-gray-200 flex-1 text-right mr-2">{item.value}</span>
                <button onClick={() => copy(item.value, item.label)}>
                  <Copy size={14} className={copied === item.label ? 'text-green-500' : 'text-gray-400 hover:text-blue-500'} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToolLayout>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import ToolLayout from '@/components/ToolLayout'

interface CountdownEvent {
  id: string
  name: string
  date: string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  totalSeconds: number
  isPast: boolean
}

function getTimeLeft(targetDate: string): TimeLeft {
  const target = new Date(targetDate).getTime()
  const now = Date.now()
  const diff = target - now
  const isPast = diff < 0
  const abs = Math.abs(diff)

  const totalSeconds = Math.floor(abs / 1000)
  const seconds = totalSeconds % 60
  const minutes = Math.floor(totalSeconds / 60) % 60
  const hours = Math.floor(totalSeconds / 3600) % 24
  const days = Math.floor(totalSeconds / 86400)

  return { days, hours, minutes, seconds, totalSeconds, isPast }
}

export default function CountdownPage() {
  const { locale } = useLanguage()
  const zh = locale === 'zh'

  const [events, setEvents] = useState<CountdownEvent[]>([
    { id: '1', name: zh ? '元旦' : "New Year's Day", date: `${new Date().getFullYear() + 1}-01-01` },
  ])
  const [newName, setNewName] = useState('')
  const [newDate, setNewDate] = useState('')
  const [, setTick] = useState(0)

  // Tick every second to update countdowns
  useEffect(() => {
    const timer = setInterval(() => setTick(t => t + 1), 1000)
    return () => clearInterval(timer)
  }, [])

  const addEvent = () => {
    if (!newName.trim() || !newDate) return
    setEvents(prev => [...prev, { id: Date.now().toString(), name: newName.trim(), date: newDate }])
    setNewName('')
    setNewDate('')
  }

  const removeEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id))
  }

  const presets = zh
    ? [
        { name: '春节', date: `${new Date().getFullYear() + 1}-02-01` },
        { name: '国庆节', date: `${new Date().getFullYear()}-10-01` },
        { name: '元旦', date: `${new Date().getFullYear() + 1}-01-01` },
        { name: '五一劳动节', date: `${new Date().getFullYear()}-05-01` },
      ]
    : [
        { name: "New Year's Day", date: `${new Date().getFullYear() + 1}-01-01` },
        { name: 'Christmas', date: `${new Date().getFullYear()}-12-25` },
        { name: 'Halloween', date: `${new Date().getFullYear()}-10-31` },
        { name: 'Valentine\'s Day', date: `${new Date().getFullYear() + 1}-02-14` },
      ]

  return (
    <ToolLayout
      titleZh="倒计时计算器"
      titleEn="Countdown Calculator"
      descZh="实时显示距离目标日期的倒计时，支持多个事件管理"
      descEn="Real-time countdown to your target dates, with support for multiple events"
      icon="⏳"
      tags={['countdown timer', 'event countdown', '倒计时', '节日倒计时']}
      introZh="倒计时计算器可以帮助您追踪重要日期的剩余时间。支持同时管理多个事件，实时显示天、时、分、秒倒计时，适用于节日、生日、项目截止日等场景。"
      introEn="The countdown calculator helps you track how much time remains until important dates. Manage multiple events simultaneously with real-time days, hours, minutes, and seconds display — perfect for holidays, birthdays, and deadlines."
      faqZh={[
        { q: '倒计时精确度如何？', a: '本工具每秒刷新一次，精确到秒级别。时间基于您设备的本地时间。' },
        { q: '如果日期已过会怎样？', a: '如果目标日期已经过去，工具会显示"已过去"标记，并显示已过去的时间。' },
      ]}
      faqEn={[
        { q: 'How accurate is the countdown?', a: 'This tool refreshes every second and is accurate to the second. Time is based on your device\'s local time.' },
        { q: 'What happens if the date has passed?', a: 'If the target date has already passed, the tool will show a "Past" indicator along with the elapsed time.' },
      ]}
    >
      <div className="space-y-6">
        {/* Active countdowns */}
        <div className="space-y-4">
          {events.length === 0 && (
            <div className="text-center py-10 text-gray-400 dark:text-gray-500">
              <div className="text-4xl mb-2">⏳</div>
              <p>{zh ? '还没有倒计时，添加一个吧' : 'No countdowns yet. Add one below!'}</p>
            </div>
          )}
          {events.map(event => {
            const tl = getTimeLeft(event.date)
            return (
              <div key={event.id} className={`rounded-2xl p-5 border ${tl.isPast ? 'bg-gray-50 dark:bg-gray-700/30 border-gray-200 dark:border-gray-600' : 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-100 dark:border-blue-800'}`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">{event.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                      {new Date(event.date).toLocaleDateString(zh ? 'zh-CN' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      {tl.isPast && (
                        <span className="ml-2 px-2 py-0.5 text-xs bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-full">
                          {zh ? '已过去' : 'Past'}
                        </span>
                      )}
                    </p>
                  </div>
                  <button
                    onClick={() => removeEvent(event.id)}
                    className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors text-xl leading-none"
                    title={zh ? '删除' : 'Remove'}
                  >
                    ×
                  </button>
                </div>

                {/* Countdown digits */}
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { value: tl.days, label: zh ? '天' : 'Days' },
                    { value: tl.hours, label: zh ? '小时' : 'Hours' },
                    { value: tl.minutes, label: zh ? '分钟' : 'Minutes' },
                    { value: tl.seconds, label: zh ? '秒' : 'Seconds' },
                  ].map(item => (
                    <div key={item.label} className="text-center">
                      <div className={`text-3xl sm:text-4xl font-mono font-bold tabular-nums ${tl.isPast ? 'text-gray-500 dark:text-gray-400' : 'text-blue-700 dark:text-blue-300'}`}>
                        {String(item.value).padStart(2, '0')}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.label}</div>
                    </div>
                  ))}
                </div>

                {/* Progress bar (for events within 365 days) */}
                {!tl.isPast && tl.days <= 365 && (
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                      <span>{zh ? '进度' : 'Progress'}</span>
                      <span>{zh ? `还剩 ${tl.days} 天` : `${tl.days} days left`}</span>
                    </div>
                    <div className="h-2 bg-blue-100 dark:bg-blue-900/40 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full transition-none"
                        style={{ width: `${Math.max(2, 100 - (tl.days / 365) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Add new event */}
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 space-y-3">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            {zh ? '添加倒计时' : 'Add Countdown'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              placeholder={zh ? '事件名称（如：生日）' : 'Event name (e.g. Birthday)'}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              onKeyDown={e => e.key === 'Enter' && addEvent()}
            />
            <input
              type="date"
              value={newDate}
              onChange={e => setNewDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <button
            onClick={addEvent}
            disabled={!newName.trim() || !newDate}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-xl transition-colors text-sm"
          >
            {zh ? '+ 添加' : '+ Add Event'}
          </button>
        </div>

        {/* Preset events */}
        <div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            {zh ? '快速添加节日' : 'Quick Add Holidays'}
          </h3>
          <div className="flex flex-wrap gap-2">
            {presets.map(p => (
              <button
                key={p.name}
                onClick={() => {
                  if (!events.find(e => e.name === p.name)) {
                    setEvents(prev => [...prev, { id: Date.now().toString(), name: p.name, date: p.date }])
                  }
                }}
                className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </ToolLayout>
  )
}

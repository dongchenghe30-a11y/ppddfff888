'use client'

import { useState, useMemo } from 'react'
import ToolLayout from '@/components/ToolLayout'
import { useLanguage } from '@/contexts/LanguageContext'

export default function RegexTesterPage() {
  const { locale, t } = useLanguage()
  const [pattern, setPattern] = useState('[a-z]+')
  const [flags, setFlags] = useState('gi')
  const [testStr, setTestStr] = useState('Hello World, this is a Regex Test 123!')

  const { matches, highlighted, error } = useMemo(() => {
    if (!pattern) return { matches: [], highlighted: testStr, error: '' }
    try {
      void new RegExp(pattern, flags.replace(/[^gimsuy]/g, ''))
      const matches = Array.from(testStr.matchAll(new RegExp(pattern, flags.includes('g') ? flags : flags+'g')))
      // Highlight matches
      let highlighted = ''
      let last = 0
      for (const m of matches) {
        if (m.index === undefined) continue
        highlighted += testStr.slice(last, m.index).replace(/</g,'&lt;').replace(/>/g,'&gt;')
        highlighted += `<mark class="bg-yellow-200 dark:bg-yellow-800 rounded px-0.5">${m[0].replace(/</g,'&lt;').replace(/>/g,'&gt;')}</mark>`
        last = m.index + m[0].length
      }
      highlighted += testStr.slice(last).replace(/</g,'&lt;').replace(/>/g,'&gt;')
      return { matches, highlighted, error: '' }
    } catch (e: unknown) {
      const errMsg = e instanceof Error ? e.message : String(e)
      return { matches: [], highlighted: testStr, error: errMsg }
    }
  }, [pattern, flags, testStr])

  const flagOptions = [
    { f: 'g', zh: '全局(g)', en: 'Global(g)' },
    { f: 'i', zh: '忽略大小写(i)', en: 'Case-insensitive(i)' },
    { f: 'm', zh: '多行(m)', en: 'Multiline(m)' },
    { f: 's', zh: 'dotAll(s)', en: 'DotAll(s)' },
  ]

  const presets = [
    { name: locale==='zh'?'邮箱':'Email', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}', flags: 'g' },
    { name: locale==='zh'?'手机号':'Phone (CN)', pattern: '1[3-9]\\d{9}', flags: 'g' },
    { name: locale==='zh'?'URL':'URL', pattern: 'https?://[\\w\\-._~:/?#\\[\\]@!$&\'()*+,;=%]+', flags: 'g' },
    { name: locale==='zh'?'数字':'Numbers', pattern: '\\d+', flags: 'g' },
    { name: locale==='zh'?'中文':'Chinese', pattern: '[\\u4e00-\\u9fa5]+', flags: 'g' },
    { name: locale==='zh'?'IP地址':'IP Address', pattern: '\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b', flags: 'g' },
  ]

  return (
    <ToolLayout
      titleZh={t.dev.regex.title} titleEn="Regular Expression Tester"
      descZh={t.dev.regex.desc} descEn="Test and debug regular expressions with real-time match highlighting"
      icon="🔍" tags={['regex', 'pattern', 'match', '正则', '正则表达式']}
      introZh="正则表达式(Regex)是强大的文本匹配和处理工具。本测试器支持实时高亮匹配结果，内置常用正则模板，帮助开发者快速验证和调试正则表达式。"
      introEn="Regular expressions (Regex) are powerful text matching tools. This tester supports real-time match highlighting and includes common regex templates to help developers validate and debug patterns."
    >
      <div className="space-y-4">
        {/* Presets */}
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{locale==='zh'?'常用模板':'Common Templates'}</p>
          <div className="flex flex-wrap gap-2">
            {presets.map(p => (
              <button key={p.name} onClick={() => { setPattern(p.pattern); setFlags(p.flags) }}
                className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Pattern input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t.dev.regex.pattern}</label>
          <div className="flex items-center gap-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
            <span className="text-gray-400 pl-3 font-mono">/</span>
            <input value={pattern} onChange={e => setPattern(e.target.value)}
              className="flex-1 py-2.5 bg-transparent text-gray-900 dark:text-white outline-none font-mono text-sm" />
            <span className="text-gray-400 font-mono">/</span>
            <input value={flags} onChange={e => setFlags(e.target.value)} placeholder="gi"
              className="w-16 py-2.5 pr-3 bg-transparent text-blue-600 dark:text-blue-400 outline-none font-mono text-sm" />
          </div>
          {error && <p className="text-xs text-red-500 mt-1">⚠️ {error}</p>}
        </div>

        {/* Flags */}
        <div className="flex flex-wrap gap-2">
          {flagOptions.map(f => (
            <label key={f.f} className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" checked={flags.includes(f.f)} onChange={e => setFlags(prev => e.target.checked ? prev+f.f : prev.replace(f.f,''))}
                className="w-3.5 h-3.5 rounded text-blue-600" />
              <span className="text-xs text-gray-600 dark:text-gray-400">{locale==='zh'?f.zh:f.en}</span>
            </label>
          ))}
        </div>

        {/* Test string */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t.dev.regex.testString}</label>
          <textarea value={testStr} onChange={e => setTestStr(e.target.value)} rows={3}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm resize-none" />
        </div>

        {/* Match result */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.dev.regex.matches}</span>
            <span className={`text-sm font-bold px-2 py-0.5 rounded-full ${matches.length > 0 ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>
              {matches.length} {locale==='zh'?'个匹配':'matches'}
            </span>
          </div>
          <div className="font-mono text-sm text-gray-700 dark:text-gray-300 break-all" dangerouslySetInnerHTML={{ __html: highlighted }} />
        </div>

        {matches.length > 0 && (
          <div className="space-y-1">
            <p className="text-xs text-gray-500 dark:text-gray-400">{locale==='zh'?'匹配详情':'Match Details'}</p>
            {matches.slice(0, 10).map((m, i) => (
              <div key={i} className="flex gap-3 text-xs bg-yellow-50 dark:bg-yellow-900/10 rounded px-3 py-1.5">
                <span className="text-gray-400">#{i+1}</span>
                <span className="font-mono font-bold text-yellow-700 dark:text-yellow-400">{m[0]}</span>
                <span className="text-gray-400">{locale==='zh'?'位置':'pos'}: {m.index}</span>
              </div>
            ))}
            {matches.length > 10 && <p className="text-xs text-gray-400 text-center">...{locale==='zh'?`还有${matches.length-10}个匹配`:`${matches.length-10} more matches`}</p>}
          </div>
        )}
      </div>
    </ToolLayout>
  )
}

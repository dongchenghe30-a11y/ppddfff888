'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import ToolLayout from '@/components/ToolLayout'

export default function WordCountPage() {
  const { locale } = useLanguage()
  const [text, setText] = useState('')

  const stats = {
    chars: text.length,
    charsNoSpace: text.replace(/\s/g, '').length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    sentences: text.trim() ? text.split(/[.!?。！？]+/).filter(s => s.trim()).length : 0,
    paragraphs: text.trim() ? text.split(/\n+/).filter(p => p.trim()).length : 0,
    chineseChars: (text.match(/[\u4e00-\u9fff]/g) || []).length,
    readingTime: Math.max(1, Math.ceil(text.trim().split(/\s+/).length / 200)),
  }

  return (
    <ToolLayout
      titleZh="字数统计器"
      titleEn="Word Counter"
      descZh="实时统计字符数、单词数、句子数、段落数，支持中英文"
      descEn="Real-time count of characters, words, sentences, paragraphs in Chinese and English"
      icon="📝"
      tags={['word count', 'character count', 'text', '字数统计', '字符计数']}
      introZh="字数统计器支持实时统计文本的字符数（含/不含空格）、单词数、句子数、段落数和汉字数，还能估算阅读时间，适合写作、SEO和学术场景。"
      introEn="Word counter supports real-time counting of characters (with/without spaces), words, sentences, paragraphs, and Chinese characters, plus estimated reading time. Perfect for writing, SEO, and academic use."
    >
      <div className="space-y-4">
        <div className="relative">
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder={locale === 'zh' ? '在此输入或粘贴文本...' : 'Enter or paste your text here...'}
            rows={10}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          {text && (
            <button onClick={() => setText('')}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-sm px-2 py-1"
            >✕</button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: locale === 'zh' ? '字符数' : 'Characters', value: stats.chars, sub: locale === 'zh' ? '含空格' : 'with spaces' },
            { label: locale === 'zh' ? '字符数（不含空格）' : 'Chars (no spaces)', value: stats.charsNoSpace, sub: '' },
            { label: locale === 'zh' ? '单词数' : 'Words', value: stats.words, sub: '' },
            { label: locale === 'zh' ? '汉字数' : 'Chinese Chars', value: stats.chineseChars, sub: '' },
            { label: locale === 'zh' ? '句子数' : 'Sentences', value: stats.sentences, sub: '' },
            { label: locale === 'zh' ? '段落数' : 'Paragraphs', value: stats.paragraphs, sub: '' },
            { label: locale === 'zh' ? '阅读时间（约）' : 'Reading Time (est.)', value: `${stats.readingTime} ${locale === 'zh' ? '分钟' : 'min'}`, sub: '' },
            { label: locale === 'zh' ? '行数' : 'Lines', value: text ? text.split('\n').length : 0, sub: '' },
          ].map(item => (
            <div key={item.label} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{item.value}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.label}</div>
              {item.sub && <div className="text-xs text-gray-400">{item.sub}</div>}
            </div>
          ))}
        </div>

        {/* Frequency chart (simplified) */}
        {text.length > 0 && (
          <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              {locale === 'zh' ? '高频词汇' : 'Top Words'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(
                text.toLowerCase().split(/[\s，。！？,.\s!?]+/).filter(w => w.length > 1)
                  .reduce((acc, w) => ({ ...acc, [w]: (acc[w] || 0) + 1 }), {} as Record<string, number>)
              ).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([word, count]) => (
                <span key={word} className="px-2.5 py-1 rounded-full text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                  {word} ({count})
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}

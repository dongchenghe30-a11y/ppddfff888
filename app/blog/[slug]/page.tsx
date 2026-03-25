'use client'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { articles, getArticleBySlug } from '@/lib/articles'
import { tools } from '@/lib/tools'
import ToolCard from '@/components/ToolCard'
import { Clock, Calendar, Tag, ArrowLeft } from 'lucide-react'

function MarkdownContent({ content }: { content: string }) {
  const lines = content.split('\n')
  const html = lines.map((line, i) => {
    if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-6 mb-3">{line.slice(3)}</h2>
    if (line.startsWith('### ')) return <h3 key={i} className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-5 mb-2">{line.slice(4)}</h3>
    if (line.startsWith('**') && line.endsWith('**')) return <p key={i} className="font-bold text-gray-800 dark:text-gray-200 mt-3">{line.slice(2, -2)}</p>
    if (line.startsWith('- ')) return <li key={i} className="text-gray-700 dark:text-gray-300 ml-4 list-disc">{line.slice(2)}</li>
    if (line.startsWith('| ')) return (
      <div key={i} className="overflow-x-auto">
        <table className="w-full text-sm border-collapse my-2">
          <tr>{line.split('|').filter(c => c.trim()).map((cell, ci) => (
            <td key={ci} className="px-3 py-1.5 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">{cell.trim()}</td>
          ))}</tr>
        </table>
      </div>
    )
    if (line.trim() === '') return <br key={i} />
    if (line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.') || line.startsWith('4.') || line.startsWith('5.')) {
      return <li key={i} className="text-gray-700 dark:text-gray-300 ml-4 list-decimal">{line.replace(/^\d+\.\s/, '')}</li>
    }
    return <p key={i} className="text-gray-700 dark:text-gray-300 leading-relaxed">{line}</p>
  })
  return <div className="prose dark:prose-invert max-w-none space-y-1">{html}</div>
}

export default function BlogArticlePage({ params }: { params: { slug: string } }) {
  const { locale, t } = useLanguage()
  const article = getArticleBySlug(params.slug)

  if (!article) return notFound()

  const title = locale === 'zh' ? article.titleZh : article.titleEn
  const content = locale === 'zh' ? article.contentZh : article.contentEn
  const relatedTools = tools.filter(tool => article.relatedTools.includes(tool.id))
  const relatedArticles = articles.filter(a => a.id !== article.id && a.category === article.category).slice(0, 3)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-4 text-sm">
            <ArrowLeft size={16} /> {locale === 'zh' ? '返回博客' : 'Back to Blog'}
          </Link>

          <div className="flex items-center gap-2 mb-4">
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
              article.category === 'finance' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
              article.category === 'math' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400' :
              article.category === 'tech' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
              'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
            }`}>
              {locale === 'zh' ? {finance:'财务',math:'数学',tech:'技术',tutorial:'教程',review:'评测'}[article.category] : article.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Clock size={12} /> {locale === 'zh' ? article.readTimeZh : article.readTimeEn} {t.common.minute}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Calendar size={12} /> {article.publishDate}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-4 leading-tight">
            {title}
          </h1>

          <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
            {locale === 'zh' ? article.summaryZh : article.summaryEn}
          </p>

          <div className="flex flex-wrap gap-2">
            {article.tags.map(tag => (
              <span key={tag} className="flex items-center gap-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2.5 py-1 rounded-full">
                <Tag size={10} /> {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Article Content */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
              <MarkdownContent content={content} />
            </div>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t.blog.relatedArticles}</h2>
                <div className="grid gap-4">
                  {relatedArticles.map(a => (
                    <Link key={a.id} href={`/blog/${a.slug}`}
                      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:border-blue-400 transition-colors block"
                    >
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400">
                        {locale === 'zh' ? a.titleZh : a.titleEn}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                        {locale === 'zh' ? a.summaryZh : a.summaryEn}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {relatedTools.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">{t.common.relatedTools}</h2>
                <div className="space-y-3">
                  {relatedTools.map(tool => <ToolCard key={tool.id} tool={tool} />)}
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-3">{t.common.tags}</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map(tag => (
                  <span key={tag} className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-800">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

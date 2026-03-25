'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  const toolLinks = [
    { href: '/calculator/basic', zh: '基础计算器', en: 'Basic Calculator' },
    { href: '/calculator/scientific', zh: '科学计算器', en: 'Scientific Calculator' },
    { href: '/life/bmi', zh: 'BMI计算器', en: 'BMI Calculator' },
    { href: '/finance/loan', zh: '贷款计算器', en: 'Loan Calculator' },
    { href: '/finance/compound', zh: '复利计算器', en: 'Compound Interest' },
    { href: '/life/mortgage', zh: '房贷计算器', en: 'Mortgage Calculator' },
    { href: '/dev/binary', zh: '进制转换器', en: 'Number Base Converter' },
    { href: '/dev/color', zh: '颜色转换器', en: 'Color Converter' },
  ]

  const { locale } = useLanguage()

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-white font-bold text-xl mb-3">
              <span className="text-2xl">🧮</span>
              <span>CalcHub</span>
            </Link>
            <p className="text-sm text-gray-400 mb-4">{t.footer.description}</p>
            <div className="flex gap-3">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">GitHub</a>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t.footer.tools}</h3>
            <ul className="space-y-2">
              {toolLinks.slice(0, 5).map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {locale === 'zh' ? link.zh : link.en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Tools */}
          <div>
            <h3 className="text-white font-semibold mb-4">{locale === 'zh' ? '更多工具' : 'More Tools'}</h3>
            <ul className="space-y-2">
              {toolLinks.slice(5).map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {locale === 'zh' ? link.zh : link.en}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/tools" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                  {locale === 'zh' ? '查看全部工具 →' : 'View All Tools →'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t.footer.company}</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-gray-400 hover:text-white transition-colors">{t.about.title}</Link></li>
              <li><Link href="/blog" className="text-sm text-gray-400 hover:text-white transition-colors">{t.blog.title}</Link></li>
              <li><Link href="/help" className="text-sm text-gray-400 hover:text-white transition-colors">{t.help.title}</Link></li>
              <li><Link href="/about/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">{t.about.privacy}</Link></li>
              <li><Link href="/about/terms" className="text-sm text-gray-400 hover:text-white transition-colors">{t.about.terms}</Link></li>
              <li><Link href="/about/contact" className="text-sm text-gray-400 hover:text-white transition-colors">{t.about.contact}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} CalcHub. {t.footer.copyright}
          </p>
          <p className="text-sm text-gray-500">{t.footer.madeWith}</p>
        </div>
      </div>
    </footer>
  )
}

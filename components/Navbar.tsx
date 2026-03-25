'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTheme } from '@/contexts/ThemeContext'
import { locales, localeNames, type Locale } from '@/lib/i18n'
import { searchTools } from '@/lib/tools'
import { Moon, Sun, Globe, Search, Star, Clock, Menu, X, ChevronDown } from 'lucide-react'

const navItems = [
  { key: 'calculators', href: '/calculator', icon: '🔢', subItems: [
    { href: '/calculator/basic', icon: '🔢', zhName: '基础计算器', enName: 'Basic Calculator' },
    { href: '/calculator/scientific', icon: '📐', zhName: '科学计算器', enName: 'Scientific Calculator' },
    { href: '/calculator/programmer', icon: '💻', zhName: '编程计算器', enName: 'Programmer Calculator' },
    { href: '/calculator/financial', icon: '💰', zhName: '财务计算器', enName: 'Financial Calculator' },
  ]},
  { key: 'unitConverter', href: '/unit', icon: '📐', subItems: [
    { href: '/unit/length', icon: '📏', zhName: '长度', enName: 'Length' },
    { href: '/unit/weight', icon: '⚖️', zhName: '重量', enName: 'Weight' },
    { href: '/unit/temperature', icon: '🌡️', zhName: '温度', enName: 'Temperature' },
    { href: '/unit/area', icon: '⬜', zhName: '面积', enName: 'Area' },
    { href: '/unit/speed', icon: '🚀', zhName: '速度', enName: 'Speed' },
    { href: '/unit/data', icon: '💾', zhName: '数据大小', enName: 'Data Size' },
  ]},
  { key: 'lifeTools', href: '/life', icon: '🌟', subItems: [
    { href: '/life/discount', icon: '🏷️', zhName: '折扣计算', enName: 'Discount' },
    { href: '/life/bmi', icon: '⚖️', zhName: 'BMI', enName: 'BMI' },
    { href: '/life/mortgage', icon: '🏠', zhName: '房贷', enName: 'Mortgage' },
    { href: '/life/calorie', icon: '🔥', zhName: '卡路里', enName: 'Calories' },
  ]},
  { key: 'financeTools', href: '/finance', icon: '💰', subItems: [
    { href: '/finance/loan', icon: '🏦', zhName: '贷款', enName: 'Loan' },
    { href: '/finance/compound', icon: '📈', zhName: '复利', enName: 'Compound Interest' },
    { href: '/finance/roi', icon: '💹', zhName: 'ROI', enName: 'ROI' },
    { href: '/finance/inflation', icon: '📉', zhName: '通货膨胀', enName: 'Inflation' },
  ]},
  { key: 'devTools', href: '/dev', icon: '💻', subItems: [
    { href: '/dev/binary', icon: '0️⃣', zhName: '进制转换', enName: 'Number Base' },
    { href: '/dev/color', icon: '🎨', zhName: '颜色转换', enName: 'Color' },
    { href: '/dev/base64', icon: '🔐', zhName: 'Base64', enName: 'Base64' },
    { href: '/dev/timestamp', icon: '🕐', zhName: '时间戳', enName: 'Timestamp' },
  ]},
  { key: 'blog', href: '/blog', icon: '📰', subItems: [] },
  { key: 'help', href: '/help', icon: '❓', subItems: [] },
]

export default function Navbar() {
  const { t, locale, setLocale } = useLanguage()
  const { isDark, toggleTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<ReturnType<typeof searchTools>>([])
  const [showSearch, setShowSearch] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (searchQuery.trim()) {
      setSearchResults(searchTools(searchQuery))
    } else {
      setSearchResults([])
    }
  }, [searchQuery])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearch(false)
        setSearchQuery('')
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-600 dark:text-blue-400 shrink-0">
            <span className="text-2xl">🧮</span>
            <span className="hidden sm:block">CalcHub</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1 flex-1">
            {navItems.map(item => (
              <div key={item.key} className="relative"
                onMouseEnter={() => item.subItems.length > 0 && setActiveDropdown(item.key)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link href={item.href}
                  className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  {(t.nav as Record<string, string>)[item.key]}
                  {item.subItems.length > 0 && <ChevronDown size={14} />}
                </Link>
                {item.subItems.length > 0 && activeDropdown === item.key && (
                  <div className="absolute top-full left-0 pt-1 w-48 z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2">
                      {item.subItems.map(sub => (
                        <Link key={sub.href} href={sub.href}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          <span>{sub.icon}</span>
                          <span>{locale === 'zh' ? sub.zhName : sub.enName}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Search */}
            <div ref={searchRef} className="relative">
              <button onClick={() => setShowSearch(!showSearch)}
                className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Search size={18} />
              </button>
              {showSearch && (
                <div className="absolute right-0 top-full mt-2 w-80 z-50">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                      <Search size={16} className="text-gray-400" />
                      <input
                        autoFocus
                        type="text"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder={t.nav.search}
                        className="flex-1 bg-transparent text-sm outline-none text-gray-700 dark:text-gray-300 placeholder-gray-400"
                      />
                    </div>
                    {searchResults.length > 0 && (
                      <div className="max-h-64 overflow-y-auto py-1">
                        {searchResults.slice(0, 8).map(tool => (
                          <Link key={tool.id} href={tool.href}
                            onClick={() => { setShowSearch(false); setSearchQuery('') }}
                            className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700"
                          >
                            <span className="text-xl">{tool.icon}</span>
                            <div>
                              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                {locale === 'zh' ? tool.titleZh : tool.titleEn}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                                {locale === 'zh' ? tool.descZh : tool.descEn}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                    {searchQuery && searchResults.length === 0 && (
                      <p className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{t.common.noResults}</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Favorites */}
            <Link href="/favorites" className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" title={t.nav.favorites}>
              <Star size={18} />
            </Link>

            {/* History */}
            <Link href="/history" className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors hidden sm:block" title={t.nav.history}>
              <Clock size={18} />
            </Link>

            {/* Theme Toggle */}
            <button onClick={toggleTheme}
              className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title={isDark ? t.nav.lightMode : t.nav.darkMode}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Language */}
            <div className="relative group">
              <button className="flex items-center gap-1 p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <Globe size={18} />
                <span className="text-xs hidden sm:block">{localeNames[locale]}</span>
              </button>
              <div className="absolute right-0 top-full mt-1 hidden group-hover:block">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-1 w-32">
                  {locales.map(l => (
                    <button key={l} onClick={() => setLocale(l as Locale)}
                      className={`w-full text-left px-4 py-2 text-sm ${locale === l ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-700 dark:text-gray-300'} hover:bg-gray-50 dark:hover:bg-gray-700`}
                    >
                      {localeNames[l as Locale]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Menu */}
            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <div className="px-4 py-3 space-y-1 max-h-[70vh] overflow-y-auto">
            {navItems.map(item => (
              <div key={item.key}>
                <Link href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {item.icon} {(t.nav as Record<string, string>)[item.key]}
                </Link>
                {item.subItems.map(sub => (
                  <Link key={sub.href} href={sub.href}
                    onClick={() => setMobileOpen(false)}
                    className="block pl-8 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {sub.icon} {locale === 'zh' ? sub.zhName : sub.enName}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export type Locale = 'zh' | 'en'

export const defaultLocale: Locale = 'zh'
export const locales: Locale[] = ['zh', 'en']

export const localeNames: Record<Locale, string> = {
  zh: '中文',
  en: 'English',
}

export function getLocaleFromStorage(): Locale {
  if (typeof window === 'undefined') return defaultLocale
  const stored = localStorage.getItem('locale') as Locale
  return locales.includes(stored) ? stored : defaultLocale
}

export function setLocaleToStorage(locale: Locale): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('locale', locale)
  }
}

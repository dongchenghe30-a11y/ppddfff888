'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Locale, defaultLocale, getLocaleFromStorage, setLocaleToStorage } from '@/lib/i18n'
import zh from '@/lib/translations/zh'
import en from '@/lib/translations/en'

const translations = { zh, en }

interface LanguageContextType {
  locale: Locale
  t: typeof zh
  setLocale: (locale: Locale) => void
}

const LanguageContext = createContext<LanguageContextType>({
  locale: defaultLocale,
  t: zh,
  setLocale: () => {},
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)

  useEffect(() => {
    const stored = getLocaleFromStorage()
    setLocaleState(stored)
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    setLocaleToStorage(newLocale)
  }

  return (
    <LanguageContext.Provider value={{ locale, t: translations[locale], setLocale }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}

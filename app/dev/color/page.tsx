'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import ToolLayout from '@/components/ToolLayout'
import { Copy } from 'lucide-react'

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return { r, g, b }
}

function rgbToHex(r: number, g: number, b: number) {
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('').toUpperCase()
}

function rgbToHsl(r: number, g: number, b: number) {
  const rn = r / 255, gn = g / 255, bn = b / 255
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn)
  let h = 0, s = 0
  const l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case rn: h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6; break
      case gn: h = ((bn - rn) / d + 2) / 6; break
      case bn: h = ((rn - gn) / d + 4) / 6; break
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

export default function ColorConverterPage() {
  const { locale } = useLanguage()
  const [hex, setHex] = useState('#3B82F6')
  const [rgb, setRgb] = useState({ r: 59, g: 130, b: 246 })
  const [hsl, setHsl] = useState({ h: 217, s: 91, l: 60 })
  const [copied, setCopied] = useState('')

  const updateFromHex = (h: string) => {
    if (/^#[0-9A-Fa-f]{6}$/.test(h)) {
      const r = hexToRgb(h)
      const hs = rgbToHsl(r.r, r.g, r.b)
      setHex(h.toUpperCase())
      setRgb(r)
      setHsl(hs)
    } else {
      setHex(h)
    }
  }

  const updateFromRgb = (r: number, g: number, b: number) => {
    const h = rgbToHex(r, g, b)
    const hs = rgbToHsl(r, g, b)
    setRgb({ r, g, b })
    setHex(h)
    setHsl(hs)
  }

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(''), 2000)
  }

  const hexStr = hex
  const rgbStr = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
  const hslStr = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`

  return (
    <ToolLayout
      titleZh="颜色转换器"
      titleEn="Color Converter"
      descZh="HEX、RGB、HSL颜色格式实时互转，实时预览颜色效果"
      descEn="Real-time conversion between HEX, RGB, HSL color formats with live preview"
      icon="🎨"
      tags={['color', 'hex', 'rgb', 'hsl', 'css', '颜色', '设计']}
      introZh="颜色转换器支持HEX（十六进制）、RGB（红绿蓝）、HSL（色相/饱和度/亮度）三种常用颜色格式的实时互转，广泛用于网页设计、UI设计和图像处理。"
      introEn="The color converter supports real-time conversion between HEX (hexadecimal), RGB (red/green/blue), and HSL (hue/saturation/lightness) formats, widely used in web design, UI design, and image processing."
      faqZh={[
        { q: 'HEX颜色码是什么格式？', a: 'HEX颜色码是#后跟6位十六进制数字，前两位代表红色，中间两位代表绿色，后两位代表蓝色，范围00-FF。' },
        { q: 'HSL和HSB/HSV有什么区别？', a: 'HSL中L=亮度，50%为纯色；HSV/HSB中V=明度，100%为纯色。两种格式常见于不同的设计软件中。' },
      ]}
      faqEn={[
        { q: 'What format is HEX color code?', a: 'A HEX code is # followed by 6 hex digits. The first two represent red, middle two green, last two blue, ranging from 00-FF.' },
        { q: 'What is the difference between HSL and HSV/HSB?', a: 'In HSL, L=Lightness where 50% is pure color. In HSV/HSB, V=Value where 100% is pure color. Both formats are common in different design software.' },
      ]}
    >
      <div className="space-y-6">
        {/* Color Preview */}
        <div className="rounded-xl overflow-hidden h-24 shadow-inner" style={{ backgroundColor: /^#[0-9A-Fa-f]{6}$/.test(hex) ? hex : '#3B82F6' }}>
          <div className="h-full flex items-center justify-center">
            <span className="text-white/80 font-mono text-sm bg-black/20 px-3 py-1 rounded-full">{hexStr}</span>
          </div>
        </div>

        {/* HEX */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">HEX</label>
          <div className="flex gap-2">
            <input type="text" value={hex} onChange={e => updateFromHex(e.target.value)}
              placeholder="#000000" maxLength={7}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 font-mono text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase text-gray-900 dark:text-white"
            />
            <input type="color" value={/^#[0-9A-Fa-f]{6}$/.test(hex) ? hex : '#000000'} onChange={e => updateFromHex(e.target.value)}
              className="w-12 h-11 rounded-xl border border-gray-300 dark:border-gray-600 cursor-pointer p-1 bg-white dark:bg-gray-700"
            />
            <button onClick={() => copy(hexStr, 'hex')} className="p-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
              <Copy size={16} className={copied === 'hex' ? 'text-green-500' : 'text-gray-500'} />
            </button>
          </div>
        </div>

        {/* RGB */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">RGB</label>
            <button onClick={() => copy(rgbStr, 'rgb')} className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
              <Copy size={12} className={copied === 'rgb' ? 'text-green-500' : ''} /> {rgbStr}
            </button>
          </div>
          <div className="space-y-2">
            {[
              { label: `R ${locale === 'zh' ? '红' : 'Red'}`, key: 'r', color: 'bg-red-500' },
              { label: `G ${locale === 'zh' ? '绿' : 'Green'}`, key: 'g', color: 'bg-green-500' },
              { label: `B ${locale === 'zh' ? '蓝' : 'Blue'}`, key: 'b', color: 'bg-blue-500' },
            ].map(ch => (
              <div key={ch.key} className="flex items-center gap-3">
                <span className="w-14 text-xs text-gray-500 dark:text-gray-400">{ch.label}</span>
                <input type="range" min="0" max="255"
                  value={rgb[ch.key as keyof typeof rgb]}
                  onChange={e => updateFromRgb(
                    ch.key === 'r' ? +e.target.value : rgb.r,
                    ch.key === 'g' ? +e.target.value : rgb.g,
                    ch.key === 'b' ? +e.target.value : rgb.b,
                  )}
                  className="flex-1 accent-blue-600"
                />
                <input type="number" min="0" max="255"
                  value={rgb[ch.key as keyof typeof rgb]}
                  onChange={e => {
                    const v = Math.max(0, Math.min(255, +e.target.value))
                    updateFromRgb(ch.key === 'r' ? v : rgb.r, ch.key === 'g' ? v : rgb.g, ch.key === 'b' ? v : rgb.b)
                  }}
                  className="w-14 px-2 py-1 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-center text-gray-900 dark:text-white focus:outline-none"
                />
              </div>
            ))}
          </div>
        </div>

        {/* HSL */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">HSL</label>
            <button onClick={() => copy(hslStr, 'hsl')} className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
              <Copy size={12} className={copied === 'hsl' ? 'text-green-500' : ''} /> {hslStr}
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { label: locale === 'zh' ? '色相 H' : 'Hue H', value: hsl.h, max: 360 },
              { label: locale === 'zh' ? '饱和度 S%' : 'Saturation S%', value: hsl.s, max: 100 },
              { label: locale === 'zh' ? '亮度 L%' : 'Lightness L%', value: hsl.l, max: 100 },
            ].map(item => (
              <div key={item.label} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3">
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{item.value}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToolLayout>
  )
}

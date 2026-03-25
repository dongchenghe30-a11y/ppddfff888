'use client'

import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'
import { useLanguage } from '@/contexts/LanguageContext'

export default function GeometryCalculatorPage() {
  const { locale, t } = useLanguage()
  const [shape, setShape] = useState<'circle'|'rectangle'|'triangle'|'trapezoid'>('circle')
  const [vals, setVals] = useState<Record<string, string>>({ r:'5', w:'4', h:'3', a:'3', b:'4', c:'5', b1:'3', b2:'5', th:'4' })
  const set = (k: string, v: string) => setVals(prev => ({ ...prev, [k]: v }))
  const n = (k: string) => parseFloat(vals[k]) || 0

  const shapes = [
    { key: 'circle', zh: '圆形', en: 'Circle', icon: '⭕' },
    { key: 'rectangle', zh: '矩形', en: 'Rectangle', icon: '▬' },
    { key: 'triangle', zh: '三角形', en: 'Triangle', icon: '△' },
    { key: 'trapezoid', zh: '梯形', en: 'Trapezoid', icon: '⏢' },
  ]

  type ResultItem = { label: string; value: string; unit: string }
  const getResults = (): ResultItem[] => {
    const PI = Math.PI
    if (shape === 'circle') {
      const r = n('r'), area = PI*r*r, circ = 2*PI*r, diam = 2*r
      return [
        { label: t.math.geometry.area, value: area.toFixed(4), unit: 'm²' },
        { label: t.math.geometry.perimeter, value: circ.toFixed(4), unit: 'm' },
        { label: t.math.geometry.diameter, value: diam.toFixed(4), unit: 'm' },
      ]
    }
    if (shape === 'rectangle') {
      const w = n('w'), h = n('h'), area = w*h, perim = 2*(w+h), diag = Math.sqrt(w*w+h*h)
      return [
        { label: t.math.geometry.area, value: area.toFixed(4), unit: 'm²' },
        { label: t.math.geometry.perimeter, value: perim.toFixed(4), unit: 'm' },
        { label: locale==='zh'?'对角线':'Diagonal', value: diag.toFixed(4), unit: 'm' },
      ]
    }
    if (shape === 'triangle') {
      const a = n('a'), b = n('b'), c = n('c')
      const s = (a+b+c)/2
      const area = Math.sqrt(Math.max(0, s*(s-a)*(s-b)*(s-c)))
      const perim = a+b+c
      return [
        { label: t.math.geometry.area, value: area.toFixed(4), unit: 'm²' },
        { label: t.math.geometry.perimeter, value: perim.toFixed(4), unit: 'm' },
        { label: locale==='zh'?'半周长':'Semi-perimeter', value: s.toFixed(4), unit: 'm' },
      ]
    }
    if (shape === 'trapezoid') {
      const b1 = n('b1'), b2 = n('b2'), th = n('th')
      const area = (b1+b2)*th/2
      return [
        { label: t.math.geometry.area, value: area.toFixed(4), unit: 'm²' },
        { label: locale==='zh'?'（上底+下底）×高/2':'(a+b)×h/2', value: area.toFixed(4), unit: 'm²' },
      ]
    }
    return []
  }

  const getInputs = () => {
    if (shape==='circle') return [{ k:'r', label: t.math.geometry.radius }]
    if (shape==='rectangle') return [{ k:'w', label: t.math.geometry.width }, { k:'h', label: t.math.geometry.height }]
    if (shape==='triangle') return [{ k:'a', label: t.math.geometry.sideA }, { k:'b', label: t.math.geometry.sideB }, { k:'c', label: t.math.geometry.sideC }]
    if (shape==='trapezoid') return [{ k:'b1', label: t.math.geometry.base1 }, { k:'b2', label: t.math.geometry.base2 }, { k:'th', label: t.math.geometry.height }]
    return []
  }

  const results = getResults()

  return (
    <ToolLayout
      titleZh={t.math.geometry.title} titleEn="Geometry Calculator"
      descZh={t.math.geometry.desc} descEn="Calculate area, perimeter and more for circles, rectangles, triangles and trapezoids"
      icon="📐" tags={['geometry', 'area', 'perimeter', '几何', '面积', '周长']}
      introZh="几何计算器支持圆形、矩形、三角形、梯形等常见几何图形的面积、周长计算。输入相应参数，立即获得精确计算结果。"
      introEn="The geometry calculator supports area and perimeter calculations for circles, rectangles, triangles and trapezoids. Enter the parameters to get accurate results instantly."
    >
      <div className="space-y-5">
        <div className="grid grid-cols-4 gap-2">
          {shapes.map(s => (
            <button key={s.key} onClick={() => setShape(s.key as typeof shape)}
              className={`flex flex-col items-center gap-1 py-3 rounded-xl text-sm font-medium transition-colors ${shape===s.key?'bg-blue-600 text-white':'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20'}`}>
              <span className="text-2xl">{s.icon}</span>
              <span>{locale==='zh'?s.zh:s.en}</span>
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {getInputs().map(f => (
            <div key={f.k}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{f.label}</label>
              <input type="number" value={vals[f.k]} onChange={e => set(f.k, e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg" />
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {results.map((r, i) => (
            <div key={i} className={`flex items-center justify-between px-4 py-3 rounded-xl ${i===0?'bg-blue-50 dark:bg-blue-900/20':'bg-gray-50 dark:bg-gray-800'}`}>
              <span className="text-sm text-gray-600 dark:text-gray-400">{r.label}</span>
              <span className={`font-bold font-mono ${i===0?'text-blue-700 dark:text-blue-300 text-xl':'text-gray-900 dark:text-white'}`}>{r.value} {r.unit}</span>
            </div>
          ))}
        </div>
      </div>
    </ToolLayout>
  )
}

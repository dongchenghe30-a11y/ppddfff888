'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import ToolLayout from '@/components/ToolLayout'

type UnitCategory = {
  units: { key: string; zhName: string; enName: string; factor: number }[]
}

const unitData: Record<string, UnitCategory> = {
  length: {
    units: [
      { key: 'm', zhName: '米 (m)', enName: 'Meter (m)', factor: 1 },
      { key: 'km', zhName: '千米 (km)', enName: 'Kilometer (km)', factor: 1000 },
      { key: 'cm', zhName: '厘米 (cm)', enName: 'Centimeter (cm)', factor: 0.01 },
      { key: 'mm', zhName: '毫米 (mm)', enName: 'Millimeter (mm)', factor: 0.001 },
      { key: 'ft', zhName: '英尺 (ft)', enName: 'Foot (ft)', factor: 0.3048 },
      { key: 'in', zhName: '英寸 (in)', enName: 'Inch (in)', factor: 0.0254 },
      { key: 'yd', zhName: '码 (yd)', enName: 'Yard (yd)', factor: 0.9144 },
      { key: 'mi', zhName: '英里 (mi)', enName: 'Mile (mi)', factor: 1609.344 },
      { key: 'nm', zhName: '海里 (nm)', enName: 'Nautical Mile (nm)', factor: 1852 },
    ]
  },
  weight: {
    units: [
      { key: 'kg', zhName: '千克 (kg)', enName: 'Kilogram (kg)', factor: 1 },
      { key: 'g', zhName: '克 (g)', enName: 'Gram (g)', factor: 0.001 },
      { key: 'mg', zhName: '毫克 (mg)', enName: 'Milligram (mg)', factor: 0.000001 },
      { key: 't', zhName: '吨 (t)', enName: 'Metric Ton (t)', factor: 1000 },
      { key: 'lb', zhName: '磅 (lb)', enName: 'Pound (lb)', factor: 0.453592 },
      { key: 'oz', zhName: '盎司 (oz)', enName: 'Ounce (oz)', factor: 0.0283495 },
      { key: 'jin', zhName: '斤 (jin)', enName: 'Jin (jin)', factor: 0.5 },
    ]
  },
  temperature: {
    units: [
      { key: 'C', zhName: '摄氏度 (°C)', enName: 'Celsius (°C)', factor: 1 },
      { key: 'F', zhName: '华氏度 (°F)', enName: 'Fahrenheit (°F)', factor: 1 },
      { key: 'K', zhName: '开尔文 (K)', enName: 'Kelvin (K)', factor: 1 },
    ]
  },
  area: {
    units: [
      { key: 'm2', zhName: '平方米 (m²)', enName: 'Square Meter (m²)', factor: 1 },
      { key: 'km2', zhName: '平方千米 (km²)', enName: 'Square Kilometer (km²)', factor: 1000000 },
      { key: 'cm2', zhName: '平方厘米 (cm²)', enName: 'Square Centimeter (cm²)', factor: 0.0001 },
      { key: 'ha', zhName: '公顷 (ha)', enName: 'Hectare (ha)', factor: 10000 },
      { key: 'ac', zhName: '英亩 (ac)', enName: 'Acre (ac)', factor: 4046.86 },
      { key: 'ft2', zhName: '平方英尺 (ft²)', enName: 'Square Foot (ft²)', factor: 0.092903 },
    ]
  },
  speed: {
    units: [
      { key: 'ms', zhName: '米/秒 (m/s)', enName: 'Meter/Second (m/s)', factor: 1 },
      { key: 'kmh', zhName: '千米/时 (km/h)', enName: 'Kilometer/Hour (km/h)', factor: 0.277778 },
      { key: 'mph', zhName: '英里/时 (mph)', enName: 'Miles/Hour (mph)', factor: 0.44704 },
      { key: 'knot', zhName: '海里/时 (kt)', enName: 'Knot (kt)', factor: 0.514444 },
      { key: 'ftm', zhName: '英尺/分 (ft/min)', enName: 'Feet/Minute (ft/min)', factor: 0.00508 },
    ]
  },
  data: {
    units: [
      { key: 'B', zhName: '字节 (B)', enName: 'Byte (B)', factor: 1 },
      { key: 'KB', zhName: 'KB', enName: 'Kilobyte (KB)', factor: 1024 },
      { key: 'MB', zhName: 'MB', enName: 'Megabyte (MB)', factor: 1048576 },
      { key: 'GB', zhName: 'GB', enName: 'Gigabyte (GB)', factor: 1073741824 },
      { key: 'TB', zhName: 'TB', enName: 'Terabyte (TB)', factor: 1099511627776 },
      { key: 'bit', zhName: '位 (bit)', enName: 'Bit (bit)', factor: 0.125 },
    ]
  },
}

const convertTemp = (val: number, from: string, to: string) => {
  let celsius = val
  if (from === 'F') celsius = (val - 32) * 5 / 9
  else if (from === 'K') celsius = val - 273.15
  if (to === 'C') return celsius
  if (to === 'F') return celsius * 9 / 5 + 32
  return celsius + 273.15
}

interface UnitConverterProps { type: string }

function UnitConverter({ type }: UnitConverterProps) {
  const { locale, t } = useLanguage()
  const data = unitData[type]
  const [value, setValue] = useState('')
  const [fromUnit, setFromUnit] = useState(data.units[0].key)
  const [toUnit, setToUnit] = useState(data.units[1].key)

  const result = (() => {
    const v = parseFloat(value)
    if (isNaN(v)) return ''
    if (type === 'temperature') {
      return String(Math.round(convertTemp(v, fromUnit, toUnit) * 10000) / 10000)
    }
    const fromFactor = data.units.find(u => u.key === fromUnit)?.factor || 1
    const toFactor = data.units.find(u => u.key === toUnit)?.factor || 1
    return String(Math.round((v * fromFactor / toFactor) * 1000000) / 1000000)
  })()

  const swap = () => { setFromUnit(toUnit); setToUnit(fromUnit) }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t.unit.inputValue}</label>
        <input type="number" value={value} onChange={e => setValue(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg" />
      </div>
      <div className="grid grid-cols-5 gap-2 items-center">
        <div className="col-span-2">
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">{t.unit.selectFrom}</label>
          <select value={fromUnit} onChange={e => setFromUnit(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
            {data.units.map(u => <option key={u.key} value={u.key}>{locale === 'zh' ? u.zhName : u.enName}</option>)}
          </select>
        </div>
        <div className="flex justify-center">
          <button onClick={swap} className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors text-xl">⇄</button>
        </div>
        <div className="col-span-2">
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">{t.unit.selectTo}</label>
          <select value={toUnit} onChange={e => setToUnit(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
            {data.units.map(u => <option key={u.key} value={u.key}>{locale === 'zh' ? u.zhName : u.enName}</option>)}
          </select>
        </div>
      </div>
      {result && (
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-center">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            {value} {locale === 'zh' ? data.units.find(u => u.key === fromUnit)?.zhName : data.units.find(u => u.key === fromUnit)?.enName}
          </div>
          <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
            = {result}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {locale === 'zh' ? data.units.find(u => u.key === toUnit)?.zhName : data.units.find(u => u.key === toUnit)?.enName}
          </div>
        </div>
      )}
      {/* All conversions */}
      {value && !isNaN(parseFloat(value)) && (
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{locale === 'zh' ? '所有单位换算' : 'All conversions'}</h3>
          <div className="grid gap-1.5">
            {data.units.map(u => {
              const v = parseFloat(value)
              let res: number
              if (type === 'temperature') {
                res = convertTemp(v, fromUnit, u.key)
              } else {
                const ff = data.units.find(x => x.key === fromUnit)?.factor || 1
                res = v * ff / u.factor
              }
              return (
                <div key={u.key} className={`flex justify-between items-center px-3 py-1.5 rounded-lg text-sm ${u.key === toUnit ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-gray-50 dark:bg-gray-700/30'}`}>
                  <span className="text-gray-600 dark:text-gray-400">{locale === 'zh' ? u.zhName : u.enName}</span>
                  <span className="font-mono font-medium text-gray-900 dark:text-gray-100">{Math.round(res * 1000000) / 1000000}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

// Generic unit page factory
function createUnitPage(type: string, titleZh: string, titleEn: string, descZh: string, descEn: string, icon: string, tags: string[], introZh: string, introEn: string) {
  return function Page() {
    return (
      <ToolLayout
        titleZh={titleZh} titleEn={titleEn} descZh={descZh} descEn={descEn}
        icon={icon} tags={tags} introZh={introZh} introEn={introEn}
      >
        <UnitConverter type={type} />
      </ToolLayout>
    )
  }
}

export const LengthPage = createUnitPage('length', '长度换算', 'Length Converter', '米、英尺、英寸、英里等长度单位互转', 'Convert meters, feet, inches, miles and more', '📏', ['length', 'meter', 'feet', '长度', '单位换算'], '长度换算支持国际单位（米、厘米、千米）和英制单位（英尺、英寸、英里）等常见长度单位互转。', 'Length converter supports conversion between SI units (meters, centimeters, kilometers) and imperial units (feet, inches, miles) and more.')
export const WeightPage = createUnitPage('weight', '重量换算', 'Weight Converter', '千克、磅、盎司等重量单位互转', 'Convert kilograms, pounds, ounces and more', '⚖️', ['weight', 'kg', 'pounds', '重量', '单位换算'], '重量换算支持公制（千克、克）和英制（磅、盎司）等重量单位互转，另外还支持中国市制（斤）。', 'Weight converter supports metric (kg, g) and imperial (lb, oz) unit conversion, plus Chinese measurement units (jin).')
export const TemperaturePage = createUnitPage('temperature', '温度换算', 'Temperature Converter', '摄氏度、华氏度、开尔文互转', 'Convert Celsius, Fahrenheit and Kelvin', '🌡️', ['temperature', 'celsius', 'fahrenheit', '温度', '单位换算'], '温度换算支持摄氏度（°C）、华氏度（°F）和开尔文（K）三种温度单位互转，广泛用于科学、工程和日常生活。', 'Temperature converter supports Celsius (°C), Fahrenheit (°F) and Kelvin (K) conversion, widely used in science, engineering and daily life.')
export const AreaPage = createUnitPage('area', '面积换算', 'Area Converter', '平方米、平方英尺、英亩等面积单位互转', 'Convert square meters, feet, acres and more', '⬜', ['area', 'square meters', 'acres', '面积', '单位换算'], '面积换算支持平方米、平方千米、公顷、英亩、平方英尺等常见面积单位互转，适用于土地、建筑等面积计算。', 'Area converter supports square meters, square kilometers, hectares, acres, square feet and more, suitable for land and building area calculations.')
export const SpeedPage = createUnitPage('speed', '速度换算', 'Speed Converter', '米/秒、千米/时、英里/时等速度单位互转', 'Convert m/s, km/h, mph and more', '🚀', ['speed', 'km/h', 'mph', '速度', '单位换算'], '速度换算支持米/秒、千米/时、英里/时、海里/时等常见速度单位互转，适用于物理、航行、交通等场景。', 'Speed converter supports m/s, km/h, mph, knots and more, suitable for physics, navigation and transportation scenarios.')
export const DataPage = createUnitPage('data', '数据大小换算', 'Data Size Converter', 'Byte、KB、MB、GB、TB数据大小互转', 'Convert Bytes, KB, MB, GB, TB and more', '💾', ['data', 'bytes', 'gigabytes', '数据大小', '单位换算'], '数据大小换算支持位（bit）、字节（Byte）、KB、MB、GB、TB等常见数据存储单位互转，帮助了解文件大小和存储容量。', 'Data size converter supports bit, Byte, KB, MB, GB, TB and more, helping understand file sizes and storage capacity.')

export default function UnitPage() {
  const { locale } = useLanguage()
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        {locale === 'zh' ? '单位换算工具' : 'Unit Converter Tools'}
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { href: '/unit/length', icon: '📏', zh: '长度换算', en: 'Length' },
          { href: '/unit/weight', icon: '⚖️', zh: '重量换算', en: 'Weight' },
          { href: '/unit/temperature', icon: '🌡️', zh: '温度换算', en: 'Temperature' },
          { href: '/unit/area', icon: '⬜', zh: '面积换算', en: 'Area' },
          { href: '/unit/speed', icon: '🚀', zh: '速度换算', en: 'Speed' },
          { href: '/unit/data', icon: '💾', zh: '数据大小', en: 'Data Size' },
        ].map(item => (
          <a key={item.href} href={item.href} className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-400 hover:shadow-md transition-all">
            <span className="text-3xl">{item.icon}</span>
            <span className="font-medium text-gray-900 dark:text-gray-100">{locale === 'zh' ? item.zh : item.en}</span>
          </a>
        ))}
      </div>
    </div>
  )
}

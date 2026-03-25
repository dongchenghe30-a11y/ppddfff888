'use client'

import { useState, useCallback } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import ToolLayout from '@/components/ToolLayout'

const buttons = [
  ['C', '±', '%', '÷'],
  ['7', '8', '9', '×'],
  ['4', '5', '6', '−'],
  ['1', '2', '3', '+'],
  ['0', '.', '='],
]

export default function BasicCalculatorPage() {
  const { locale } = useLanguage()
  const [display, setDisplay] = useState('0')
  const [expression, setExpression] = useState('')
  const [newNumber, setNewNumber] = useState(true)
  const [operator, setOperator] = useState<string | null>(null)
  const [prevValue, setPrevValue] = useState<number | null>(null)
  const [history, setHistory] = useState<string[]>([])

  const handleNumber = useCallback((num: string) => {
    if (newNumber) {
      setDisplay(num)
      setNewNumber(false)
    } else {
      setDisplay(display === '0' ? num : display + num)
    }
  }, [display, newNumber])

  const handleDecimal = useCallback(() => {
    if (newNumber) {
      setDisplay('0.')
      setNewNumber(false)
    } else if (!display.includes('.')) {
      setDisplay(display + '.')
    }
  }, [display, newNumber])

  const handleOperator = useCallback((op: string) => {
    const current = parseFloat(display)
    if (prevValue !== null && !newNumber) {
      const result = calculate(prevValue, current, operator!)
      setDisplay(String(result))
      setPrevValue(result)
      setExpression(`${result} ${op}`)
    } else {
      setPrevValue(current)
      setExpression(`${current} ${op}`)
    }
    setOperator(op)
    setNewNumber(true)
  }, [display, prevValue, operator, newNumber])

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case '+': return a + b
      case '−': return a - b
      case '×': return a * b
      case '÷': return b !== 0 ? a / b : NaN
      default: return b
    }
  }

  const handleEquals = useCallback(() => {
    if (prevValue !== null && operator) {
      const current = parseFloat(display)
      const result = calculate(prevValue, current, operator)
      const expr = `${expression} ${current} = ${isNaN(result) ? 'Error' : result}`
      setHistory(prev => [expr, ...prev].slice(0, 10))
      setDisplay(isNaN(result) ? 'Error' : String(result))
      setExpression('')
      setPrevValue(null)
      setOperator(null)
      setNewNumber(true)
    }
  }, [prevValue, operator, display, expression])

  const handleClear = useCallback(() => {
    setDisplay('0')
    setExpression('')
    setPrevValue(null)
    setOperator(null)
    setNewNumber(true)
  }, [])

  const handleSign = useCallback(() => {
    setDisplay(String(-parseFloat(display)))
  }, [display])

  const handlePercent = useCallback(() => {
    setDisplay(String(parseFloat(display) / 100))
  }, [display])

  const handleButton = (btn: string) => {
    if (btn === 'C') handleClear()
    else if (btn === '±') handleSign()
    else if (btn === '%') handlePercent()
    else if (btn === '=') handleEquals()
    else if (btn === '.') handleDecimal()
    else if (['+', '−', '×', '÷'].includes(btn)) handleOperator(btn)
    else handleNumber(btn)
  }

  const btnStyle = (btn: string) => {
    if (btn === '=') return 'col-span-2 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xl font-bold h-16 transition-all active:scale-95'
    if (['÷', '×', '−', '+'].includes(btn)) return 'bg-orange-500 hover:bg-orange-600 text-white rounded-2xl text-xl font-bold h-16 transition-all active:scale-95'
    if (['C', '±', '%'].includes(btn)) return 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-800 dark:text-white rounded-2xl text-xl font-bold h-16 transition-all active:scale-95'
    return 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-2xl text-xl font-bold h-16 transition-all active:scale-95'
  }

  return (
    <ToolLayout
      titleZh="基础计算器"
      titleEn="Basic Calculator"
      descZh="标准计算器，支持加减乘除、百分比、正负号切换"
      descEn="Standard calculator with addition, subtraction, multiplication, division, percentage and sign toggle"
      icon="🔢"
      tags={['calculator', 'math', 'arithmetic', '计算器', '数学']}
      introZh="这是一款功能完整的基础计算器，支持加减乘除四则运算，以及百分比计算和正负号切换。界面简洁直观，适合日常快速计算。"
      introEn="This is a fully featured basic calculator supporting addition, subtraction, multiplication and division, as well as percentage calculations and sign toggling. Clean and intuitive interface for quick daily calculations."
      useCaseZh={`• 日常购物金额计算\n• 快速分摊账单\n• 计算百分比和折扣\n• 简单的数学运算`}
      useCaseEn={`• Shopping amount calculation\n• Quick bill splitting\n• Calculate percentages and discounts\n• Simple math operations`}
      faqZh={[
        { q: '如何清除计算记录？', a: '点击"C"按钮可以清除当前输入和运算。' },
        { q: '除以零会怎样？', a: '计算器会显示"Error"提示，然后按C重置即可。' },
      ]}
      faqEn={[
        { q: 'How do I clear the calculation?', a: 'Press the "C" button to clear the current input and operation.' },
        { q: 'What happens if I divide by zero?', a: 'The calculator shows "Error". Press C to reset.' },
      ]}
    >
      <div className="select-none">
        {/* Display */}
        <div className="bg-gray-900 dark:bg-black rounded-2xl p-5 mb-4 text-right">
          <div className="text-gray-400 text-sm min-h-5 mb-1">{expression}</div>
          <div className="text-white text-4xl font-light overflow-hidden text-ellipsis">{display}</div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-3">
          {buttons.map((row, ri) =>
            row.map((btn, ci) => (
              <button key={`${ri}-${ci}`}
                onClick={() => handleButton(btn)}
                className={btnStyle(btn)}
              >
                {btn}
              </button>
            ))
          )}
        </div>

        {/* History */}
        {history.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              {locale === 'zh' ? '计算历史' : 'History'}
            </h3>
            <div className="space-y-1">
              {history.map((h, i) => (
                <div key={i} className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 px-3 py-1.5 rounded-lg text-right">{h}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}

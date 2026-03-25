'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import ToolLayout from '@/components/ToolLayout'

export default function ScientificCalculatorPage() {
  const { } = useLanguage()
  const [display, setDisplay] = useState('0')
  const [memory, setMemory] = useState(0)
  const [angleMode, setAngleMode] = useState<'DEG' | 'RAD'>('DEG')
  const [expression, setExpression] = useState('')
  const [isResult, setIsResult] = useState(false)

  const toRad = (deg: number) => angleMode === 'DEG' ? (deg * Math.PI) / 180 : deg

  const append = (val: string) => {
    if (isResult) { setDisplay(val); setIsResult(false); return }
    setDisplay(display === '0' ? val : display + val)
  }

  const calculate = () => {
    try {
      const expr = display
        .replace(/×/g, '*').replace(/÷/g, '/')
        .replace(/π/g, String(Math.PI))
        .replace(/e/g, String(Math.E))
      const result = eval(expr)
      setExpression(`${display} =`)
      setDisplay(String(Math.round(result * 1e10) / 1e10))
      setIsResult(true)
    } catch {
      setDisplay('Error')
    }
  }

  const sciFunction = (fn: string) => {
    const x = parseFloat(display)
    let result: number
    switch (fn) {
      case 'sin': result = Math.sin(toRad(x)); break
      case 'cos': result = Math.cos(toRad(x)); break
      case 'tan': result = Math.tan(toRad(x)); break
      case 'asin': result = angleMode === 'DEG' ? Math.asin(x) * 180 / Math.PI : Math.asin(x); break
      case 'acos': result = angleMode === 'DEG' ? Math.acos(x) * 180 / Math.PI : Math.acos(x); break
      case 'atan': result = angleMode === 'DEG' ? Math.atan(x) * 180 / Math.PI : Math.atan(x); break
      case 'log': result = Math.log10(x); break
      case 'ln': result = Math.log(x); break
      case 'sqrt': result = Math.sqrt(x); break
      case 'cbrt': result = Math.cbrt(x); break
      case 'x2': result = x * x; break
      case 'x3': result = x * x * x; break
      case '1/x': result = 1 / x; break
      case 'abs': result = Math.abs(x); break
      case 'factorial': {
        let f = 1
        for (let i = 2; i <= Math.floor(x); i++) f *= i
        result = f; break
      }
      default: result = x
    }
    setExpression(`${fn}(${display}) =`)
    setDisplay(String(Math.round(result * 1e10) / 1e10))
    setIsResult(true)
  }

  const btnClass = (type: string) => {
    const base = 'h-10 rounded-lg text-sm font-medium transition-all active:scale-95 '
    if (type === 'sci') return base + 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800/60'
    if (type === 'op') return base + 'bg-orange-500 hover:bg-orange-600 text-white'
    if (type === 'eq') return base + 'bg-blue-600 hover:bg-blue-700 text-white'
    if (type === 'clear') return base + 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50'
    return base + 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
  }

  return (
    <ToolLayout
      titleZh="科学计算器"
      titleEn="Scientific Calculator"
      descZh="支持三角函数、对数、指数、幂运算的专业计算器"
      descEn="Professional calculator with trigonometric functions, logarithms, exponentials and powers"
      icon="📐"
      tags={['scientific calculator', 'trigonometry', 'logarithm', '科学计算器', '三角函数']}
      introZh="科学计算器支持sin、cos、tan等三角函数，以及对数（log、ln）、指数、平方根等高级数学运算，适合学生和工程师使用。"
      introEn="The scientific calculator supports trigonometric functions (sin, cos, tan), logarithms (log, ln), exponentials, square roots and other advanced math operations, suitable for students and engineers."
      faqZh={[
        { q: '角度模式和弧度模式有什么区别？', a: 'DEG是角度模式（0-360），RAD是弧度模式（0-2π）。数学和物理题目要注意使用正确模式。' },
        { q: '如何计算幂运算？', a: '点击x^y按钮，输入底数后点击运算符，再输入指数，最后按等号。' },
      ]}
      faqEn={[
        { q: 'What is the difference between DEG and RAD mode?', a: 'DEG is degree mode (0-360), RAD is radian mode (0-2π). Make sure to use the correct mode for your calculation.' },
        { q: 'How do I calculate powers?', a: 'Click the x^y button, enter the base, click the operator, enter the exponent, then press equals.' },
      ]}
    >
      <div className="space-y-3 select-none">
        {/* Display */}
        <div className="bg-gray-900 dark:bg-black rounded-xl p-4 text-right">
          <div className="text-gray-400 text-xs mb-1 min-h-4">{expression}</div>
          <div className="text-white text-3xl font-light overflow-hidden text-ellipsis">{display}</div>
        </div>

        {/* Mode toggles */}
        <div className="flex gap-2">
          <button onClick={() => setAngleMode('DEG')}
            className={`flex-1 py-1.5 rounded-lg text-sm font-medium transition-colors ${angleMode === 'DEG' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}
          >DEG</button>
          <button onClick={() => setAngleMode('RAD')}
            className={`flex-1 py-1.5 rounded-lg text-sm font-medium transition-colors ${angleMode === 'RAD' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}
          >RAD</button>
          <button onClick={() => { setMemory(parseFloat(display)); }} className={btnClass('sci') + ' flex-1 py-1.5'}>M+</button>
          <button onClick={() => setDisplay(String(memory))} className={btnClass('sci') + ' flex-1 py-1.5'}>MR</button>
        </div>

        {/* Scientific functions */}
        <div className="grid grid-cols-5 gap-1.5">
          {[
            ['sin','cos','tan','log','ln'],
            ['asin','acos','atan','√','∛'],
            ['x²','x³','x^y','1/x','|x|'],
            ['n!','π','e','(',')',],
          ].map((row, ri) => row.map((btn, ci) => (
            <button key={`sci-${ri}-${ci}`}
              onClick={() => {
                if (btn === 'π') append('π')
                else if (btn === 'e') append('e')
                else if (btn === '(' || btn === ')') append(btn)
                else if (btn === 'x^y') append('^')
                else if (btn === '√') sciFunction('sqrt')
                else if (btn === '∛') sciFunction('cbrt')
                else if (btn === 'x²') sciFunction('x2')
                else if (btn === 'x³') sciFunction('x3')
                else if (btn === '1/x') sciFunction('1/x')
                else if (btn === '|x|') sciFunction('abs')
                else if (btn === 'n!') sciFunction('factorial')
                else sciFunction(btn)
              }}
              className={btnClass('sci')}
            >{btn}</button>
          )))}
        </div>

        {/* Number pad */}
        <div className="grid grid-cols-4 gap-1.5">
          {[
            ['C', '⌫', '', '÷'],
            ['7','8','9','×'],
            ['4','5','6','−'],
            ['1','2','3','+'],
            ['0','.','=',''],
          ].map((row, ri) => row.map((btn, ci) => {
            if (!btn) return null
            return (
              <button key={`num-${ri}-${ci}`}
                onClick={() => {
                  if (btn === 'C') { setDisplay('0'); setExpression(''); setIsResult(false) }
                  else if (btn === '⌫') { setDisplay(display.length > 1 ? display.slice(0,-1) : '0') }
                  else if (btn === '=') calculate()
                  else if (['+','−','×','÷','^'].includes(btn)) { append(btn === '÷' ? '/' : btn === '×' ? '*' : btn === '−' ? '-' : btn); setIsResult(false) }
                  else if (btn === '.') append('.')
                  else append(btn)
                }}
                className={`${btn === '=' ? btnClass('eq') : btn === 'C' ? btnClass('clear') : ['+','−','×','÷'].includes(btn) ? btnClass('op') : btnClass('num')} h-12 ${btn === '=' ? 'col-span-2' : ''}`}
              >{btn}</button>
            )
          }))}
        </div>
      </div>
    </ToolLayout>
  )
}

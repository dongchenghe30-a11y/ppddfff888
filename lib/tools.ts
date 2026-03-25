export interface Tool {
  id: string
  category: string
  href: string
  icon: string
  titleZh: string
  titleEn: string
  descZh: string
  descEn: string
  tags: string[]
  popular?: boolean
}

export const tools: Tool[] = [
  // 计算器
  { id: 'basic-calc', category: 'calculator', href: '/calculator/basic', icon: '🔢', titleZh: '基础计算器', titleEn: 'Basic Calculator', descZh: '加减乘除、括号运算的标准计算器', descEn: 'Standard calculator with basic arithmetic operations', tags: ['calculator', 'math', 'basic'], popular: true },
  { id: 'scientific-calc', category: 'calculator', href: '/calculator/scientific', icon: '📐', titleZh: '科学计算器', titleEn: 'Scientific Calculator', descZh: '三角函数、对数、指数、幂运算', descEn: 'Trigonometric, logarithm, exponential functions', tags: ['calculator', 'science', 'math'], popular: true },
  { id: 'programmer-calc', category: 'calculator', href: '/calculator/programmer', icon: '💻', titleZh: '编程计算器', titleEn: 'Programmer Calculator', descZh: '二进制、八进制、十六进制和位运算', descEn: 'Binary, octal, hex and bitwise operations', tags: ['calculator', 'programming', 'binary'] },
  { id: 'financial-calc', category: 'calculator', href: '/calculator/financial', icon: '💰', titleZh: '财务计算器', titleEn: 'Financial Calculator', descZh: '利息、复利、贷款月供等财务计算', descEn: 'Interest, compound interest, loan payment calculations', tags: ['calculator', 'finance', 'money'] },

  // 单位换算
  { id: 'length', category: 'unit', href: '/unit/length', icon: '📏', titleZh: '长度换算', titleEn: 'Length Converter', descZh: '米、英尺、英寸、英里等长度单位互转', descEn: 'Convert meters, feet, inches, miles and more', tags: ['unit', 'length', 'convert'], popular: true },
  { id: 'weight', category: 'unit', href: '/unit/weight', icon: '⚖️', titleZh: '重量换算', titleEn: 'Weight Converter', descZh: '千克、磅、盎司、吨等重量单位互转', descEn: 'Convert kilograms, pounds, ounces, tons and more', tags: ['unit', 'weight', 'convert'] },
  { id: 'temperature', category: 'unit', href: '/unit/temperature', icon: '🌡️', titleZh: '温度换算', titleEn: 'Temperature Converter', descZh: '摄氏度、华氏度、开尔文温度互转', descEn: 'Convert Celsius, Fahrenheit and Kelvin', tags: ['unit', 'temperature', 'convert'], popular: true },
  { id: 'area', category: 'unit', href: '/unit/area', icon: '⬜', titleZh: '面积换算', titleEn: 'Area Converter', descZh: '平方米、平方英尺、英亩等面积单位互转', descEn: 'Convert square meters, feet, acres and more', tags: ['unit', 'area', 'convert'] },
  { id: 'volume', category: 'unit', href: '/unit/volume', icon: '🧊', titleZh: '体积换算', titleEn: 'Volume Converter', descZh: '升、加仑、立方米等体积单位互转', descEn: 'Convert liters, gallons, cubic meters and more', tags: ['unit', 'volume', 'convert'] },
  { id: 'speed', category: 'unit', href: '/unit/speed', icon: '🚀', titleZh: '速度换算', titleEn: 'Speed Converter', descZh: '米/秒、千米/时、英里/时等速度单位互转', descEn: 'Convert m/s, km/h, mph and more', tags: ['unit', 'speed', 'convert'] },
  { id: 'time-unit', category: 'unit', href: '/unit/time', icon: '⏱️', titleZh: '时间换算', titleEn: 'Time Converter', descZh: '年、月、周、天、小时等时间单位互转', descEn: 'Convert years, months, weeks, days, hours and minutes', tags: ['unit', 'time', 'convert'] },
  { id: 'pressure', category: 'unit', href: '/unit/pressure', icon: '🌪️', titleZh: '压力换算', titleEn: 'Pressure Converter', descZh: '帕斯卡、大气压、巴等压力单位互转', descEn: 'Convert pascals, atmospheres, bars and more', tags: ['unit', 'pressure', 'convert'] },
  { id: 'energy', category: 'unit', href: '/unit/energy', icon: '⚡', titleZh: '能量换算', titleEn: 'Energy Converter', descZh: '焦耳、卡路里、千瓦时等能量单位互转', descEn: 'Convert joules, calories, kilowatt-hours and more', tags: ['unit', 'energy', 'convert'] },
  { id: 'data', category: 'unit', href: '/unit/data', icon: '💾', titleZh: '数据大小换算', titleEn: 'Data Size Converter', descZh: 'Byte、KB、MB、GB、TB等数据大小互转', descEn: 'Convert Bytes, KB, MB, GB, TB and more', tags: ['unit', 'data', 'convert'] },

  // 生活工具
  { id: 'discount', category: 'life', href: '/life/discount', icon: '🏷️', titleZh: '折扣计算器', titleEn: 'Discount Calculator', descZh: '计算折后价格、节省金额和折扣百分比', descEn: 'Calculate discounted price and savings', tags: ['life', 'discount', 'shopping'], popular: true },
  { id: 'tip', category: 'life', href: '/life/tip', icon: '🍽️', titleZh: '小费计算器', titleEn: 'Tip Calculator', descZh: '计算餐厅小费，支持多人平摊', descEn: 'Calculate restaurant tips and split bills', tags: ['life', 'tip', 'restaurant'] },
  { id: 'bmi', category: 'life', href: '/life/bmi', icon: '⚖️', titleZh: 'BMI 计算器', titleEn: 'BMI Calculator', descZh: '计算身体质量指数，了解健康状态', descEn: 'Calculate Body Mass Index and health status', tags: ['life', 'health', 'bmi'], popular: true },
  { id: 'calorie', category: 'life', href: '/life/calorie', icon: '🔥', titleZh: '卡路里计算器', titleEn: 'Calorie Calculator', descZh: '计算基础代谢率(BMR)和每日总消耗(TDEE)', descEn: 'Calculate BMR and daily calorie needs', tags: ['life', 'health', 'calorie'] },
  { id: 'mortgage', category: 'life', href: '/life/mortgage', icon: '🏠', titleZh: '房贷计算器', titleEn: 'Mortgage Calculator', descZh: '计算房贷月供、总利息和还款计划', descEn: 'Calculate monthly mortgage payments and interest', tags: ['life', 'mortgage', 'finance'], popular: true },
  { id: 'fuel', category: 'life', href: '/life/fuel', icon: '⛽', titleZh: '油耗计算器', titleEn: 'Fuel Cost Calculator', descZh: '计算行驶油耗和每公里油费', descEn: 'Calculate fuel consumption and cost per km', tags: ['life', 'fuel', 'car'] },
  { id: 'split', category: 'life', href: '/life/split', icon: '👥', titleZh: '分摊计算器', titleEn: 'Bill Splitter', descZh: 'AA制费用分摊，多人均摊账单', descEn: 'Split bills evenly among multiple people', tags: ['life', 'split', 'social'] },
  { id: 'age', category: 'life', href: '/life/age', icon: '🎂', titleZh: '年龄计算器', titleEn: 'Age Calculator', descZh: '精确计算年龄（年月日），查看下次生日', descEn: 'Calculate exact age and next birthday', tags: ['life', 'age', 'birthday'] },

  // 财务工具
  { id: 'loan', category: 'finance', href: '/finance/loan', icon: '🏦', titleZh: '贷款计算器', titleEn: 'Loan Calculator', descZh: '计算贷款月供、总利息，查看完整还款计划', descEn: 'Calculate loan payments and full repayment schedule', tags: ['finance', 'loan', 'bank'], popular: true },
  { id: 'compound', category: 'finance', href: '/finance/compound', icon: '📈', titleZh: '复利计算器', titleEn: 'Compound Interest Calculator', descZh: '计算投资复利增长，了解长期投资的威力', descEn: 'Calculate compound interest growth', tags: ['finance', 'investment', 'interest'], popular: true },
  { id: 'roi', category: 'finance', href: '/finance/roi', icon: '💹', titleZh: '投资回报计算器', titleEn: 'ROI Calculator', descZh: '计算投资回报率(ROI)，评估投资效益', descEn: 'Calculate Return on Investment (ROI)', tags: ['finance', 'roi', 'investment'] },
  { id: 'inflation', category: 'finance', href: '/finance/inflation', icon: '📉', titleZh: '通货膨胀计算器', titleEn: 'Inflation Calculator', descZh: '计算通货膨胀后的货币价值', descEn: 'Calculate future value after inflation', tags: ['finance', 'inflation', 'money'] },
  { id: 'retirement', category: 'finance', href: '/finance/retirement', icon: '🌴', titleZh: '退休储蓄计算器', titleEn: 'Retirement Savings Calculator', descZh: '规划退休储蓄目标，计算每月需存多少', descEn: 'Plan your retirement savings goals', tags: ['finance', 'retirement', 'savings'] },
  { id: 'stock', category: 'finance', href: '/finance/stock', icon: '📊', titleZh: '股票收益计算器', titleEn: 'Stock Return Calculator', descZh: '计算股票投资收益，含分红再投资', descEn: 'Calculate stock investment returns', tags: ['finance', 'stock', 'investment'] },

  // 数学工具
  { id: 'percentage', category: 'math', href: '/math/percentage', icon: '%', titleZh: '百分比计算器', titleEn: 'Percentage Calculator', descZh: '计算百分比、增减率、折扣等', descEn: 'Calculate percentages, growth rates and discounts', tags: ['math', 'percentage', 'basic'], popular: true },
  { id: 'fraction', category: 'math', href: '/math/fraction', icon: '½', titleZh: '分数计算器', titleEn: 'Fraction Calculator', descZh: '分数加减乘除运算，自动约分化简', descEn: 'Add, subtract, multiply and divide fractions', tags: ['math', 'fraction', 'arithmetic'] },
  { id: 'ratio', category: 'math', href: '/math/ratio', icon: '↔️', titleZh: '比例计算器', titleEn: 'Ratio Calculator', descZh: '计算比例关系，求未知量', descEn: 'Calculate ratios and solve for unknown quantities', tags: ['math', 'ratio', 'proportion'] },
  { id: 'random', category: 'math', href: '/math/random', icon: '🎲', titleZh: '随机数生成器', titleEn: 'Random Number Generator', descZh: '生成指定范围内的随机数', descEn: 'Generate random numbers within a range', tags: ['math', 'random', 'generator'] },
  { id: 'factorial', category: 'math', href: '/math/factorial', icon: '!', titleZh: '阶乘计算器', titleEn: 'Factorial Calculator', descZh: '计算阶乘、排列数和组合数', descEn: 'Calculate factorials, permutations and combinations', tags: ['math', 'factorial', 'combinatorics'] },
  { id: 'gcd-lcm', category: 'math', href: '/math/gcd-lcm', icon: '🔢', titleZh: '最大公约数/最小公倍数', titleEn: 'GCD & LCM Calculator', descZh: '计算最大公约数和最小公倍数', descEn: 'Calculate GCD and LCM', tags: ['math', 'gcd', 'lcm'] },
  { id: 'geometry', category: 'math', href: '/math/geometry', icon: '📐', titleZh: '几何计算器', titleEn: 'Geometry Calculator', descZh: '计算面积、周长、体积等几何形状', descEn: 'Calculate area, perimeter and volume of shapes', tags: ['math', 'geometry', 'area'] },

  // 编程工具
  { id: 'binary', category: 'dev', href: '/dev/binary', icon: '0️⃣', titleZh: '进制转换器', titleEn: 'Number Base Converter', descZh: '二进制、八进制、十进制、十六进制互转', descEn: 'Convert between binary, octal, decimal, hex', tags: ['dev', 'binary', 'convert'], popular: true },
  { id: 'color', category: 'dev', href: '/dev/color', icon: '🎨', titleZh: '颜色转换器', titleEn: 'Color Converter', descZh: 'HEX、RGB、HSL颜色格式互转', descEn: 'Convert between HEX, RGB, HSL color formats', tags: ['dev', 'color', 'design'], popular: true },
  { id: 'base64', category: 'dev', href: '/dev/base64', icon: '🔐', titleZh: 'Base64 编解码', titleEn: 'Base64 Encoder/Decoder', descZh: 'Base64编码和解码工具', descEn: 'Encode and decode Base64 text', tags: ['dev', 'base64', 'encode'] },
  { id: 'url-encode', category: 'dev', href: '/dev/url', icon: '🔗', titleZh: 'URL 编解码', titleEn: 'URL Encoder/Decoder', descZh: 'URL编码和解码工具', descEn: 'Encode and decode URLs', tags: ['dev', 'url', 'encode'] },
  { id: 'uuid', category: 'dev', href: '/dev/uuid', icon: '🆔', titleZh: 'UUID 生成器', titleEn: 'UUID Generator', descZh: '生成标准UUID/GUID', descEn: 'Generate standard UUID/GUID', tags: ['dev', 'uuid', 'generator'] },
  { id: 'timestamp', category: 'dev', href: '/dev/timestamp', icon: '🕐', titleZh: '时间戳转换器', titleEn: 'Timestamp Converter', descZh: 'Unix时间戳与日期时间格式互转', descEn: 'Convert Unix timestamps to human-readable dates', tags: ['dev', 'timestamp', 'time'] },
  { id: 'hash', category: 'dev', href: '/dev/hash', icon: '#️⃣', titleZh: '哈希计算器', titleEn: 'Hash Calculator', descZh: '计算MD5、SHA1、SHA256哈希值', descEn: 'Calculate MD5, SHA1, SHA256 hash values', tags: ['dev', 'hash', 'security'] },
  { id: 'regex', category: 'dev', href: '/dev/regex', icon: '🔍', titleZh: '正则表达式测试器', titleEn: 'Regex Tester', descZh: '测试和调试正则表达式', descEn: 'Test and debug regular expressions', tags: ['dev', 'regex', 'pattern'] },

  // 文本工具
  { id: 'word-count', category: 'text', href: '/text/word-count', icon: '📝', titleZh: '字数统计器', titleEn: 'Word Counter', descZh: '统计字符数、单词数、段落数', descEn: 'Count characters, words, paragraphs', tags: ['text', 'word', 'count'] },
  { id: 'case-converter', category: 'text', href: '/text/case', icon: 'Aa', titleZh: '大小写转换', titleEn: 'Case Converter', descZh: '文本大小写转换工具', descEn: 'Convert text case', tags: ['text', 'case', 'convert'] },
  { id: 'remove-lines', category: 'text', href: '/text/remove-lines', icon: '🗑️', titleZh: '去除空行工具', titleEn: 'Remove Empty Lines', descZh: '删除文本中的空行和多余空白', descEn: 'Remove blank lines and excess whitespace', tags: ['text', 'clean', 'format'] },
  { id: 'reverse-text', category: 'text', href: '/text/reverse', icon: '🔄', titleZh: '文本倒序工具', titleEn: 'Reverse Text', descZh: '将文本按字符或单词倒序排列', descEn: 'Reverse text by characters, words or lines', tags: ['text', 'reverse', 'fun'] },
  { id: 'compare-text', category: 'text', href: '/text/compare', icon: '🔀', titleZh: '文本比较工具', titleEn: 'Text Comparator', descZh: '对比两段文本的差异', descEn: 'Compare two texts and highlight differences', tags: ['text', 'compare', 'diff'] },
  { id: 'char-count', category: 'text', href: '/text/char-count', icon: '📊', titleZh: '字符频率统计', titleEn: 'Character Frequency Counter', descZh: '统计文本中每个字符出现的频率', descEn: 'Count frequency of each character', tags: ['text', 'frequency', 'stats'] },

  // 日期工具
  { id: 'date-calc', category: 'date', href: '/date/calculator', icon: '📅', titleZh: '日期计算器', titleEn: 'Date Calculator', descZh: '计算两个日期之间的天数、月数、年数', descEn: 'Calculate days, months and years between dates', tags: ['date', 'calculator', 'time'], popular: true },
  { id: 'workdays', category: 'date', href: '/date/workdays', icon: '💼', titleZh: '工作日计算器', titleEn: 'Working Days Calculator', descZh: '计算工作日数量，排除周末', descEn: 'Count working days excluding weekends', tags: ['date', 'workday', 'business'] },
  { id: 'countdown', category: 'date', href: '/date/countdown', icon: '⏳', titleZh: '倒计时计算器', titleEn: 'Countdown Calculator', descZh: '计算距离目标日期的倒计时', descEn: 'Count down to your target date', tags: ['date', 'countdown', 'timer'] },
]

export const categories = [
  { id: 'calculator', icon: '🔢', nameZh: '计算器', nameEn: 'Calculators', descZh: '基础、科学、编程、财务计算器', descEn: 'Basic, scientific, programmer and financial calculators' },
  { id: 'unit', icon: '📐', nameZh: '单位换算', nameEn: 'Unit Converter', descZh: '10+种单位类型换算工具', descEn: '10+ types of unit conversion tools' },
  { id: 'life', icon: '🌟', nameZh: '生活工具', nameEn: 'Life Tools', descZh: '折扣、BMI、房贷等生活实用工具', descEn: 'Discount, BMI, mortgage and daily life tools' },
  { id: 'finance', icon: '💰', nameZh: '财务工具', nameEn: 'Finance Tools', descZh: '贷款、复利、投资、退休等财务计算', descEn: 'Loan, compound interest, investment calculators' },
  { id: 'math', icon: '📊', nameZh: '数学工具', nameEn: 'Math Tools', descZh: '分数、比例、几何、百分比计算', descEn: 'Fraction, ratio, geometry and percentage tools' },
  { id: 'dev', icon: '💻', nameZh: '编程工具', nameEn: 'Dev Tools', descZh: '进制转换、颜色、哈希等开发者工具', descEn: 'Number base, color, hash and developer tools' },
  { id: 'text', icon: '📝', nameZh: '文本工具', nameEn: 'Text Tools', descZh: '字数统计、大小写转换、文本处理', descEn: 'Word counter, case converter and text processing' },
  { id: 'date', icon: '📅', nameZh: '日期工具', nameEn: 'Date Tools', descZh: '日期计算、工作日、倒计时工具', descEn: 'Date calculator, working days and countdown tools' },
]

export function getToolsByCategory(category: string): Tool[] {
  return tools.filter(t => t.category === category)
}

export function getPopularTools(): Tool[] {
  return tools.filter(t => t.popular)
}

export function searchTools(query: string): Tool[] {
  const q = query.toLowerCase()
  return tools.filter(t =>
    t.titleZh.toLowerCase().includes(q) ||
    t.titleEn.toLowerCase().includes(q) ||
    t.descZh.toLowerCase().includes(q) ||
    t.descEn.toLowerCase().includes(q) ||
    t.tags.some(tag => tag.includes(q))
  )
}

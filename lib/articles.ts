export interface Article {
  id: string
  slug: string
  category: 'tutorial' | 'math' | 'finance' | 'tech' | 'review'
  titleZh: string
  titleEn: string
  summaryZh: string
  summaryEn: string
  contentZh: string
  contentEn: string
  tags: string[]
  readTimeZh: number
  readTimeEn: number
  publishDate: string
  author: string
  relatedTools: string[]
}

export const articles: Article[] = [
  {
    id: '1',
    slug: 'how-to-use-loan-calculator',
    category: 'tutorial',
    titleZh: '贷款计算器的正确打开方式：购房前必读',
    titleEn: 'How to Use a Loan Calculator: Essential Guide Before Buying a Home',
    summaryZh: '详细介绍如何使用贷款计算器规划房贷，包括等额本息与等额本金的区别，以及如何选择最优还款方案。',
    summaryEn: 'A comprehensive guide on using loan calculators for home buying, including the difference between equal installment and equal principal repayment methods.',
    contentZh: `## 什么是贷款计算器？

贷款计算器是一种帮助你快速估算贷款月供、总利息和还款总额的在线工具。在购房、购车或申请个人贷款前，使用贷款计算器能帮助你做出更明智的财务决策。

## 等额本息 vs 等额本金

**等额本息**是最常见的还款方式。每月还款金额固定，其中本金逐渐增加，利息逐渐减少。计算公式为：

月供 = 贷款本金 × 月利率 × (1 + 月利率)^还款月数 ÷ [(1 + 月利率)^还款月数 - 1]

**等额本金**每月还相同的本金，加上剩余本金的利息。这种方式总利息较少，但前期月供较高。

## 如何使用本站贷款计算器

1. **输入贷款本金**：填写贷款总金额
2. **设置年利率**：输入银行或金融机构提供的年利率
3. **选择还款期限**：通常以月为单位（如30年 = 360个月）
4. **选择还款方式**：等额本息或等额本金
5. **点击计算**：即可查看月供、总利息等详细信息

## 影响月供的关键因素

- **贷款金额**：金额越大，月供越高
- **利率**：利率每变化0.1%，30年贷款月供变化明显
- **还款期限**：期限越长，月供越低，但总利息越多
- **还款方式**：等额本金前期压力大，但总利息少

## 购房建议

1. 月供不应超过家庭月收入的30%-40%
2. 预留3-6个月的应急资金
3. 比较不同银行的利率，差0.5%在30年内可能相差数万元
4. 考虑提前还款的可能性（需注意违约金）

## 常见问题

**Q：公积金贷款和商业贷款有什么区别？**
A：公积金贷款利率通常低于商业贷款，优先使用公积金可节省大量利息。

**Q：贷款年限越长越好吗？**
A：年限越长月供压力越小，但总利息越多。建议根据自身收入状况选择合适年限。

**Q：等额本金和等额本息哪个更划算？**
A：如果能承受前期较高月供，等额本金总利息更少；如果需要稳定的现金流，等额本息更适合。`,
    contentEn: `## What Is a Loan Calculator?

A loan calculator is an online tool that helps you quickly estimate monthly payments, total interest, and total repayment amount. Before buying a home, car, or applying for a personal loan, using a loan calculator helps you make smarter financial decisions.

## Equal Installment vs Equal Principal

**Equal Installment** (Equal Payment) is the most common repayment method. The monthly payment amount is fixed, with the principal portion gradually increasing and interest decreasing. The formula is:

Monthly Payment = Principal × Monthly Rate × (1 + Monthly Rate)^Months ÷ [(1 + Monthly Rate)^Months - 1]

**Equal Principal** repays the same amount of principal each month, plus interest on the remaining balance. This method has lower total interest but higher payments initially.

## How to Use Our Loan Calculator

1. **Enter the loan amount**: Fill in the total loan amount
2. **Set the annual interest rate**: Enter the rate provided by your bank
3. **Choose the loan term**: Usually in months (e.g., 30 years = 360 months)
4. **Select repayment type**: Equal installment or equal principal
5. **Click Calculate**: View monthly payment, total interest and more details

## Key Factors Affecting Monthly Payment

- **Loan Amount**: Larger amounts mean higher payments
- **Interest Rate**: A 0.1% change significantly impacts a 30-year loan
- **Loan Term**: Longer terms mean lower payments but more total interest
- **Repayment Type**: Equal principal has higher initial payments but less total interest

## Home Buying Tips

1. Monthly payment should not exceed 30-40% of household monthly income
2. Keep 3-6 months of emergency funds reserved
3. Compare rates from different banks — even 0.5% can save tens of thousands over 30 years
4. Consider early repayment options (watch for prepayment penalties)

## Frequently Asked Questions

**Q: What's the difference between fixed and variable rate mortgages?**
A: Fixed rate stays constant throughout the term; variable rate changes with market conditions.

**Q: Is a longer loan term always better?**
A: Longer terms reduce monthly pressure but increase total interest paid. Choose based on your income situation.

**Q: Which is better, equal installment or equal principal?**
A: If you can afford higher initial payments, equal principal saves total interest. If you need stable cash flow, equal installment is more suitable.`,
    tags: ['贷款', '房贷', '计算器', '理财', 'loan', 'mortgage', 'calculator', 'finance'],
    readTimeZh: 8,
    readTimeEn: 7,
    publishDate: '2024-01-15',
    author: 'CalcHub',
    relatedTools: ['loan', 'mortgage', 'compound'],
  },
  {
    id: '2',
    slug: 'compound-interest-power',
    category: 'finance',
    titleZh: '复利的力量：为什么越早储蓄越好？',
    titleEn: 'The Power of Compound Interest: Why You Should Start Saving Early',
    summaryZh: '通过真实数据展示复利效应的惊人威力，以及为什么巴菲特说"复利是世界第八大奇迹"。',
    summaryEn: 'Real data showing the incredible power of compound interest and why Warren Buffett calls it the eighth wonder of the world.',
    contentZh: `## 什么是复利？

复利，又称"利滚利"，是指在计算利息时，不仅对原始本金计息，还对已产生的利息再次计息。爱因斯坦曾说："复利是世界第八大奇迹，理解它的人将赚到它，不理解的人将为它付出代价。"

## 复利 vs 单利：10万元30年的差距

假设初始投资10万元，年收益率8%：

| 年限 | 单利 | 复利 | 差距 |
|------|------|------|------|
| 10年 | 18万 | 21.6万 | +3.6万 |
| 20年 | 26万 | 46.6万 | +20.6万 |
| 30年 | 34万 | 100.6万 | +66.6万 |

30年后，复利让10万元变成了100万元！

## 早起鸟儿的优势

**案例对比：**
- 小明：25岁开始，每月存1000元，30年后（55岁时）停止
- 小红：35岁才开始，每月存2000元，20年后（55岁时）停止

假设年化收益率8%，55岁时：
- 小明：约150万元（投入36万元）
- 小红：约118万元（投入48万元）

小明比小红少投入12万元，却多获得32万！关键就在于**时间的复利效应**。

## 如何利用复利效应？

1. **尽早开始**：越早开始，时间越长，效果越显著
2. **选择高收益产品**：每提高1%的收益率，长期效果差距巨大
3. **再投资收益**：将利息、股息等收益再投资，不要提前支取
4. **坚持定投**：定期定额投资平摊成本，降低风险

## 复利计算公式

终值 = 本金 × (1 + 年利率 / 复利次数)^(复利次数 × 年数)

例如：10万元，年利率8%，每年复利一次，10年后：
终值 = 100,000 × (1 + 0.08)^10 = 215,892元

## 投资建议

1. **指数基金定投**：适合普通投资者，低费率，长期跑赢大多数主动基金
2. **设置自动扣款**：强制储蓄，避免因一时冲动消费错过复利机会
3. **不要轻易中断**：即使市场下跌也坚持投资，低价期买入更多份额
4. **控制费率**：1%的年费在30年内可能吃掉你30%以上的收益！`,
    contentEn: `## What Is Compound Interest?

Compound interest means earning interest on both the original principal and the accumulated interest. Albert Einstein allegedly said: "Compound interest is the eighth wonder of the world. He who understands it, earns it; he who doesn't, pays it."

## Compound vs Simple Interest: A $10,000 Investment Over 30 Years

Assuming an initial investment of $10,000 with an 8% annual return:

| Years | Simple Interest | Compound Interest | Difference |
|-------|----------------|-------------------|------------|
| 10 | $18,000 | $21,589 | +$3,589 |
| 20 | $26,000 | $46,610 | +$20,610 |
| 30 | $34,000 | $100,627 | +$66,627 |

After 30 years, compound interest turns $10,000 into over $100,000!

## The Early Bird Advantage

**Case Comparison:**
- Alex: Starts at 25, saves $500/month for 30 years (stops at 55)
- Beth: Starts at 35, saves $1,000/month for 20 years (stops at 55)

Assuming 8% annual return, at age 55:
- Alex: ~$750,000 (invested $180,000)
- Beth: ~$589,000 (invested $240,000)

Alex invested $60,000 less but ends up with $161,000 more! The key is **time and compound interest**.

## How to Harness Compound Interest

1. **Start as early as possible**: The longer the time horizon, the greater the effect
2. **Seek better returns**: Each 1% increase in return dramatically impacts long-term results
3. **Reinvest earnings**: Reinvest dividends and interest instead of withdrawing
4. **Dollar-cost averaging**: Regular fixed investments reduce risk and average out costs

## The Compound Interest Formula

Future Value = Principal × (1 + Annual Rate / Compounds per Year)^(Compounds × Years)

Example: $10,000, 8% annual rate, compounded annually for 10 years:
FV = 10,000 × (1.08)^10 = $21,589

## Investment Recommendations

1. **Index fund investing**: Low costs, beats most actively managed funds long-term
2. **Set up automatic contributions**: Forced saving prevents impulse spending
3. **Don't interrupt**: Continue investing even during market downturns
4. **Watch the fees**: A 1% annual fee can consume 30%+ of your returns over 30 years!`,
    tags: ['复利', '投资', '储蓄', '理财', 'compound interest', 'investment', 'savings', 'finance'],
    readTimeZh: 10,
    readTimeEn: 9,
    publishDate: '2024-01-20',
    author: 'CalcHub',
    relatedTools: ['compound', 'roi', 'retirement'],
  },
  {
    id: '3',
    slug: 'bmi-limitations-and-better-health-metrics',
    category: 'math',
    titleZh: 'BMI的局限性：比BMI更科学的健康指标',
    titleEn: 'BMI Limitations: More Scientific Health Metrics Beyond BMI',
    summaryZh: 'BMI是最广泛使用的健康指标之一，但它有明显的局限性。本文介绍更全面的健康评估方法。',
    summaryEn: 'BMI is widely used but has significant limitations. This article introduces more comprehensive health assessment methods.',
    contentZh: `## 什么是BMI？

体重指数（BMI，Body Mass Index）是用体重（千克）除以身高（米）的平方得出的数值：

BMI = 体重(kg) ÷ 身高(m)²

| BMI范围 | 分类 |
|---------|------|
| < 18.5 | 体重过轻 |
| 18.5 - 24.9 | 正常体重 |
| 25.0 - 29.9 | 超重 |
| ≥ 30.0 | 肥胖 |

## BMI的局限性

**1. 无法区分脂肪和肌肉**
职业运动员可能BMI超标，但体脂率极低，实际上非常健康。

**2. 忽视脂肪分布**
腰部（内脏）脂肪比臀部脂肪危害更大，而BMI无法反映这一点。

**3. 年龄和性别差异**
同样的BMI对老年人和年轻人的健康含义不同，对男女也不同。

**4. 种族差异**
亚洲人在较低BMI时患代谢疾病的风险更高，WHO建议亚洲人使用不同的阈值。

## 更全面的健康指标

**腰围（Waist Circumference）**
- 女性：< 80cm为健康
- 男性：< 90cm为健康
直接反映腹部脂肪积累情况

**腰臀比（Waist-to-Hip Ratio, WHR）**
- 女性：< 0.85为正常
- 男性：< 0.90为正常
评估脂肪分布位置

**体脂率（Body Fat Percentage）**
通过专业设备测量，是最准确的体成分指标：
- 女性健康范围：20%-35%
- 男性健康范围：10%-25%

**腰高比（Waist-to-Height Ratio）**
腰围/身高 < 0.5 被认为是健康的

## 综合健康评估建议

不要单独依赖BMI来评估健康状况。建议：
1. 结合多项指标综合评估
2. 定期体检，关注血压、血糖、血脂等指标
3. 关注整体生活方式：饮食、运动、睡眠、压力管理
4. 咨询专业医生或营养师`,
    contentEn: `## What Is BMI?

Body Mass Index (BMI) is calculated by dividing weight (kg) by height (m) squared:

BMI = Weight(kg) ÷ Height(m)²

| BMI Range | Category |
|-----------|----------|
| < 18.5 | Underweight |
| 18.5 - 24.9 | Normal Weight |
| 25.0 - 29.9 | Overweight |
| ≥ 30.0 | Obese |

## Limitations of BMI

**1. Cannot distinguish fat from muscle**
Professional athletes may have a high BMI but extremely low body fat and are actually very healthy.

**2. Ignores fat distribution**
Abdominal (visceral) fat is more harmful than hip fat, but BMI cannot reflect this.

**3. Age and gender differences**
The same BMI means different things for older vs. younger people, and for men vs. women.

**4. Racial differences**
Asians face higher metabolic disease risk at lower BMI values; WHO recommends different thresholds for Asian populations.

## More Comprehensive Health Metrics

**Waist Circumference**
- Women: < 80cm is healthy
- Men: < 90cm is healthy
Directly reflects abdominal fat accumulation

**Waist-to-Hip Ratio (WHR)**
- Women: < 0.85 is normal
- Men: < 0.90 is normal
Evaluates fat distribution location

**Body Fat Percentage**
Measured by professional equipment, the most accurate body composition indicator:
- Women healthy range: 20%-35%
- Men healthy range: 10%-25%

**Waist-to-Height Ratio**
Waist circumference/Height < 0.5 is generally considered healthy

## Comprehensive Health Assessment

Don't rely solely on BMI to assess health. Recommendations:
1. Combine multiple metrics for comprehensive evaluation
2. Regular health checkups monitoring blood pressure, sugar, and cholesterol
3. Focus on overall lifestyle: diet, exercise, sleep, stress management
4. Consult a professional doctor or nutritionist`,
    tags: ['BMI', '健康', '体重', '健康指标', 'BMI', 'health', 'weight', 'body fat'],
    readTimeZh: 7,
    readTimeEn: 6,
    publishDate: '2024-02-01',
    author: 'CalcHub',
    relatedTools: ['bmi', 'calorie'],
  },
  {
    id: '4',
    slug: 'why-computers-use-binary',
    category: 'tech',
    titleZh: '为什么计算机用二进制？进制转换完全指南',
    titleEn: 'Why Do Computers Use Binary? Complete Guide to Number Base Conversion',
    summaryZh: '从基础原理讲解为什么计算机使用二进制，以及二进制、八进制、十六进制之间的转换规则。',
    summaryEn: 'A fundamental explanation of why computers use binary, and the rules for converting between binary, octal, and hexadecimal.',
    contentZh: `## 为什么计算机使用二进制？

计算机使用二进制（0和1）的根本原因是物理限制和工程简便性：

**1. 电子开关的两种状态**
计算机内部由数十亿个晶体管组成，每个晶体管只有两种状态：导通（1）和截止（0）。

**2. 抗干扰能力强**
使用两个明确的电压等级（低电压=0，高电压=1），即使在有噪声干扰的环境中，也能可靠区分。

**3. 逻辑运算天然对应**
布尔代数中的真（True）和假（False）与1和0完美对应。

## 各种进制详解

**十进制（Decimal，Base-10）**
我们日常使用的计数系统，使用0-9共10个数字，每位权值为10的幂。

**二进制（Binary，Base-2）**
计算机底层使用，只有0和1，每位权值为2的幂。
例：1010₂ = 1×2³ + 0×2² + 1×2¹ + 0×2⁰ = 10₁₀

**八进制（Octal，Base-8）**
使用0-7，是二进制的简化表示（每3位二进制 = 1位八进制）。

**十六进制（Hexadecimal，Base-16）**
使用0-9和A-F（10-15），是编程中最常用的非十进制系统，4位二进制 = 1位十六进制。
常见于：内存地址、颜色代码（#FF5733）、字节数据

## 进制转换方法

**十进制转二进制：除2取余法**
将十进制数除以2，记录余数，直到商为0，余数倒排即为二进制结果。

例：25 ÷ 2 = 12...1, 12 ÷ 2 = 6...0, 6 ÷ 2 = 3...0, 3 ÷ 2 = 1...1, 1 ÷ 2 = 0...1
结果倒排：11001₂ = 25₁₀ ✓

**二进制转十六进制**
每4位二进制对应1位十六进制：
1111 0101₂ = F5₁₆

## 程序员为何需要了解进制？

1. **调试底层代码**：内存地址通常以十六进制显示
2. **网络编程**：IP地址、子网掩码的位运算
3. **颜色处理**：CSS颜色#FF5733就是RGB(255,87,51)
4. **权限系统**：Linux文件权限755就是八进制
5. **加密算法**：哈希值通常以十六进制表示`,
    contentEn: `## Why Do Computers Use Binary?

The fundamental reason computers use binary (0 and 1) is physical limitations and engineering simplicity:

**1. Two states of electronic switches**
Computers contain billions of transistors, each with only two states: on (1) and off (0).

**2. Strong noise immunity**
Using two distinct voltage levels (low = 0, high = 1) allows reliable distinction even in noisy environments.

**3. Natural correspondence with logic**
Boolean algebra's True and False map perfectly to 1 and 0.

## Understanding Different Number Bases

**Decimal (Base-10)**
The counting system we use daily, with 10 digits (0-9), each position weighted by powers of 10.

**Binary (Base-2)**
Used internally by computers, with only 0 and 1, each position weighted by powers of 2.
Example: 1010₂ = 1×2³ + 0×2² + 1×2¹ + 0×2⁰ = 10₁₀

**Octal (Base-8)**
Uses digits 0-7, a shorthand for binary (every 3 binary digits = 1 octal digit).

**Hexadecimal (Base-16)**
Uses 0-9 and A-F (10-15), most common non-decimal system in programming. 4 binary digits = 1 hex digit.
Common in: memory addresses, color codes (#FF5733), byte data

## Conversion Methods

**Decimal to Binary: Division by 2 method**
Divide by 2 repeatedly, record remainders, reverse the order.

Example: 25÷2=12r1, 12÷2=6r0, 6÷2=3r0, 3÷2=1r1, 1÷2=0r1
Reversed: 11001₂ = 25₁₀ ✓

**Binary to Hexadecimal**
Group binary digits in sets of 4:
1111 0101₂ = F5₁₆

## Why Programmers Need to Know Number Systems

1. **Debugging low-level code**: Memory addresses are typically shown in hex
2. **Network programming**: Bitwise operations on IP addresses and subnet masks
3. **Color processing**: CSS color #FF5733 is RGB(255,87,51)
4. **Permission systems**: Linux file permissions 755 are octal
5. **Cryptography**: Hash values are typically shown in hex`,
    tags: ['二进制', '十六进制', '进制转换', '编程', 'binary', 'hexadecimal', 'programming', 'computer science'],
    readTimeZh: 9,
    readTimeEn: 8,
    publishDate: '2024-02-10',
    author: 'CalcHub',
    relatedTools: ['binary', 'color', 'hash'],
  },
  {
    id: '5',
    slug: 'golden-ratio-in-life',
    category: 'math',
    titleZh: '黄金比例1.618：隐藏在生活中的神秘美学密码',
    titleEn: 'The Golden Ratio 1.618: The Hidden Aesthetic Code in Everyday Life',
    summaryZh: '探索黄金比例的数学原理，以及它在艺术、建筑、自然界和商业设计中的广泛应用。',
    summaryEn: 'Explore the mathematics of the golden ratio and its widespread application in art, architecture, nature, and commercial design.',
    contentZh: `## 什么是黄金比例？

黄金比例（φ，phi）约等于1.618，是一个在数学和自然界中反复出现的神奇数值。当一条线段被分为两部分，使得整体与较长部分的比值等于较长部分与较短部分的比值时，这个比值就是黄金比例。

数学表达：a/b = (a+b)/a ≈ 1.618

## 数学原理

黄金比例与斐波那契数列密切相关：
1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89...

相邻两项的比值越来越接近φ：
89/55 ≈ 1.6182
610/377 ≈ 1.6180

## 黄金比例在自然界中

- **螺旋贝壳**：鹦鹉螺贝壳的螺旋符合黄金比例
- **向日葵**：花盘上种子的排列形成黄金螺旋
- **人体比例**：肚脐到地面的距离与身高的比约为0.618
- **DNA双螺旋**：每10.4纳米重复一次，宽2纳米，比值约5.17

## 艺术与建筑中的黄金比例

- **帕特农神庙**：立面尺寸符合黄金比例
- **蒙娜丽莎**：达芬奇的构图中隐含黄金矩形
- **Le Corbusier**：建筑师专门基于黄金比例设计建筑

## 商业设计中的应用

现代设计中黄金比例无处不在：
- 名片尺寸（85.6mm × 54mm ≈ 1.586）
- 网页布局（主内容区与侧边栏的比例）
- Logo设计（苹果、Twitter等品牌）
- 摄影构图（黄金分割构图）

## 黄金矩形

黄金矩形的长宽比为1.618:1，被认为是最具视觉美感的矩形比例。去掉一个正方形后，剩余部分仍是黄金矩形，可以无限嵌套。

## 为什么我们觉得黄金比例美？

进化生物学认为，人类对黄金比例的偏好可能源于：
1. 对称和谐的形态往往意味着健康的基因
2. 大脑对规律性图案的天然偏好
3. 长期的文化积累和审美训练`,
    contentEn: `## What Is the Golden Ratio?

The Golden Ratio (φ, phi) is approximately 1.618, a magical number that appears repeatedly in mathematics and nature. When a line is divided into two parts such that the ratio of the whole to the longer part equals the ratio of the longer to the shorter part, that ratio is the golden ratio.

Mathematical expression: a/b = (a+b)/a ≈ 1.618

## The Mathematics

The Golden Ratio is closely related to the Fibonacci sequence:
1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89...

The ratio of consecutive terms approaches φ:
89/55 ≈ 1.6182
610/377 ≈ 1.6180

## Golden Ratio in Nature

- **Spiral shells**: The nautilus shell spiral follows the golden ratio
- **Sunflowers**: Seed arrangement forms golden spirals
- **Human proportions**: The ratio of navel-to-floor to total height is approximately 0.618
- **DNA double helix**: Repeats every 10.4 nm, 2 nm wide — ratio ~5.17

## Golden Ratio in Art and Architecture

- **Parthenon**: Facade dimensions follow the golden ratio
- **Mona Lisa**: Da Vinci's composition contains hidden golden rectangles
- **Le Corbusier**: The architect specifically designed buildings based on the golden ratio

## Applications in Commercial Design

The golden ratio appears throughout modern design:
- Business cards (85.6mm × 54mm ≈ 1.586)
- Web layouts (content area to sidebar ratio)
- Logo design (Apple, Twitter and other brands)
- Photography composition (golden section framing)

## The Golden Rectangle

A golden rectangle has an aspect ratio of 1.618:1, considered the most visually pleasing. Removing a square leaves another golden rectangle — infinitely nested.

## Why Do We Find the Golden Ratio Beautiful?

Evolutionary biology suggests our preference for the golden ratio may stem from:
1. Symmetrical, harmonious forms often signify healthy genes
2. The brain's natural preference for regular patterns
3. Long-term cultural accumulation and aesthetic training`,
    tags: ['黄金比例', '数学', '设计', '美学', 'golden ratio', 'mathematics', 'design', 'aesthetics'],
    readTimeZh: 8,
    readTimeEn: 7,
    publishDate: '2024-02-15',
    author: 'CalcHub',
    relatedTools: ['ratio', 'geometry', 'percentage'],
  },
  {
    id: '6',
    slug: 'discount-calculator-shopping-tips',
    category: 'tutorial',
    titleZh: '如何用折扣计算器快速算出真实优惠？避免双十一套路',
    titleEn: 'How to Use a Discount Calculator to Find Real Deals and Avoid Shopping Tricks',
    summaryZh: '详解各种促销套路背后的数学，教你用折扣计算器快速识破"假打折"，做个精明的消费者。',
    summaryEn: 'Explains the math behind common promotional tricks and how to use a discount calculator to spot fake discounts and be a smart consumer.',
    contentZh: `## 常见的促销套路

购物节越来越复杂，商家使用各种方式让你觉得优惠很大，但实际上可能并没有那么便宜。

**套路1：先涨价后打折**
原价100元 → 节前涨到200元 → 打五折 = 100元
看似打了五折，实际没便宜。

**套路2：凑单满减**
满300减50，你原本只买250元的东西，为了凑单多买了60元，实际花了310元减50元 = 260元，比原来多花了10元！

**套路3：折扣叠加误导**
"额外8折+满减50"—— 这两个优惠不能简单相加

## 使用折扣计算器的正确方法

**基本用法：**
1. 输入商品原价
2. 输入折扣比例（如8折就是80%）
3. 系统自动计算实际价格和节省金额

**多重折扣计算：**
比如"9折再打9折"（两个9折）：
最终价格 = 原价 × 0.9 × 0.9 = 原价 × 0.81 = 81折，而非90-90=0折！

**实际到手价公式：**
到手价 = 原价 × 折扣1 × 折扣2 × ... - 优惠券 - 满减

## 辨别真假优惠的三步法

**第一步：查历史价格**
使用价格追踪工具查看商品近期价格历史，判断是否真的降价。

**第二步：计算真实折扣**
将实际到手价除以一个月前的价格，计算真实折扣率。

**第三步：评估边际成本**
计算凑单额外购买物品的价值，看是否真的需要。

## 折扣计算快捷技巧

| 折扣 | 乘以 | 省了 |
|------|------|------|
| 九折 | 0.9 | 10% |
| 八折 | 0.8 | 20% |
| 七五折 | 0.75 | 25% |
| 半价 | 0.5 | 50% |

记忆技巧：折扣数 ÷ 10 = 折后价的小数

## 年终购物节最佳策略

1. **提前加入购物车**：关注价格变动
2. **设定预算上限**：不为凑优惠过度消费
3. **真正需要的才买**：优惠再大，不需要的东西买了也是浪费
4. **货比三家**：不同平台的价格可能差异很大`,
    contentEn: `## Common Promotional Tricks

Shopping festivals are increasingly complex. Retailers use various tactics to make deals seem bigger than they are.

**Trick 1: Inflate price before discount**
Original: $100 → Pre-holiday price raised to $200 → 50% off = $100
Looks like 50% off, but the actual price is the same.

**Trick 2: Spend-more-save-more**
Spend $300 save $50. If you only needed $250 of items, you spend $60 extra to qualify, totaling $310 - $50 = $260 — $10 more than before!

**Trick 3: Misleading combined discounts**
"Extra 20% off + $50 gift card" — these can't be simply added together

## How to Use the Discount Calculator Correctly

**Basic usage:**
1. Enter the original price
2. Enter the discount percentage (e.g., 20% off = 80%)
3. The system automatically calculates the actual price and savings

**Multiple discounts:**
"10% off, then another 10% off":
Final price = Original × 0.9 × 0.9 = Original × 0.81 = 19% total discount, NOT 20%!

**Formula for final price:**
Final = Original × Discount1 × Discount2 × ... - Coupons - Threshold discounts

## Three Steps to Identify Real Deals

**Step 1: Check price history**
Use price tracking tools to see recent price history and determine if prices actually dropped.

**Step 2: Calculate true discount**
Divide the actual final price by the price from a month ago.

**Step 3: Assess marginal cost**
Calculate the value of items bought to reach spending thresholds.

## Quick Discount Calculation Tips

| Discount | Multiply By | You Save |
|----------|------------|----------|
| 10% off | 0.9 | 10% |
| 20% off | 0.8 | 20% |
| 25% off | 0.75 | 25% |
| 50% off | 0.5 | 50% |

Memory trick: Discount% ÷ 100 = decimal multiplier

## Best Strategy for Year-End Sales

1. **Add to cart early**: Monitor price changes
2. **Set a budget**: Don't overspend to chase discounts
3. **Buy only what you need**: Even big discounts on unneeded items are wasteful
4. **Compare platforms**: Prices can vary significantly between retailers`,
    tags: ['折扣', '购物', '优惠', '消费', 'discount', 'shopping', 'deals', 'savings'],
    readTimeZh: 7,
    readTimeEn: 6,
    publishDate: '2024-02-20',
    author: 'CalcHub',
    relatedTools: ['discount', 'percentage', 'tip'],
  },
]

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(a => a.slug === slug)
}

export function getArticlesByCategory(category: string): Article[] {
  if (category === 'all') return articles
  return articles.filter(a => a.category === category)
}

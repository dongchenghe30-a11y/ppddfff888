'use client'

import { useLanguage } from '@/contexts/LanguageContext'

const faqData = [
  {
    category: { zh: '工具使用', en: 'Tool Usage' },
    items: [
      { zh: { q: '这些工具完全免费吗？', a: '是的，所有工具均永久免费，无需注册账号，无隐藏费用。' }, en: { q: 'Are all tools completely free?', a: 'Yes, all tools are permanently free with no registration required and no hidden fees.' } },
      { zh: { q: '如何保存计算历史？', a: '计算历史自动保存在浏览器本地存储中，点击右上角历史图标即可查看最近使用记录。' }, en: { q: 'How do I save calculation history?', a: 'Calculation history is automatically saved in your browser\'s local storage. Click the history icon in the top right to view recent records.' } },
      { zh: { q: '如何收藏常用工具？', a: '在工具页面或工具卡片上，点击星形图标即可添加收藏，收藏工具会出现在"我的收藏"页面。' }, en: { q: 'How do I save favorite tools?', a: 'Click the star icon on any tool page or card to add it to favorites. Saved tools appear in your "Favorites" page.' } },
      { zh: { q: '支持哪些设备？', a: '网站采用响应式设计，完美支持电脑、平板和手机等所有设备。' }, en: { q: 'What devices are supported?', a: 'The site uses responsive design and works perfectly on computers, tablets, and phones.' } },
    ]
  },
  {
    category: { zh: '计算精度', en: 'Calculation Accuracy' },
    items: [
      { zh: { q: '计算结果有多精确？', a: '所有计算基于标准数学公式，结果保留6位有效数字。对于精密科学计算，建议使用专业软件进行验证。' }, en: { q: 'How accurate are the calculations?', a: 'All calculations use standard mathematical formulas with results to 6 significant figures. For precision scientific calculations, we recommend verifying with specialized software.' } },
      { zh: { q: '货币计算是否实时更新？', a: '货币汇率不实时更新，需要实时汇率请参考专业金融网站。' }, en: { q: 'Is currency data updated in real-time?', a: 'Currency exchange rates are not updated in real-time. For live rates, please refer to professional financial websites.' } },
    ]
  },
  {
    category: { zh: '隐私安全', en: 'Privacy & Security' },
    items: [
      { zh: { q: '我的数据会被收集吗？', a: '不会。所有计算均在您的浏览器本地完成，我们不收集任何计算数据。浏览历史和收藏仅存储在您的设备本地。' }, en: { q: 'Is my data collected?', a: 'No. All calculations run locally in your browser. We do not collect any calculation data. Browsing history and favorites are stored only on your device.' } },
      { zh: { q: '网站是否安全？', a: '网站使用HTTPS加密传输，不存储用户敏感信息，完全安全可靠。' }, en: { q: 'Is the website secure?', a: 'The site uses HTTPS encrypted transmission and does not store sensitive user information, making it completely safe and reliable.' } },
    ]
  },
  {
    category: { zh: '功能建议', en: 'Feature Requests' },
    items: [
      { zh: { q: '可以建议新工具吗？', a: '当然！欢迎通过"联系我们"页面提交您的工具建议，我们会认真考虑每一个需求。' }, en: { q: 'Can I suggest new tools?', a: 'Absolutely! Feel free to submit your tool suggestions through the "Contact Us" page. We take every suggestion seriously.' } },
      { zh: { q: '发现了计算错误怎么办？', a: '请通过联系我们页面报告，说明工具名称、输入值和预期结果，我们会尽快修复。' }, en: { q: 'What should I do if I find a calculation error?', a: 'Please report it through the Contact Us page, including the tool name, input values, and expected result. We will fix it as soon as possible.' } },
    ]
  },
]

export default function HelpPage() {
  const { locale, t } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <h1 className="text-4xl font-extrabold mb-3">{t.help.title}</h1>
          <p className="text-teal-100 text-lg">{t.help.subtitle}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Quick links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: '🔢', zh: '计算器使用', en: 'Calculator Help', href: '/calculator/basic' },
            { icon: '💰', zh: '财务工具', en: 'Finance Tools', href: '/finance/loan' },
            { icon: '💻', zh: '编程工具', en: 'Dev Tools', href: '/dev/binary' },
            { icon: '📧', zh: '联系我们', en: 'Contact', href: '/about/contact' },
          ].map(item => (
            <a key={item.href} href={item.href}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-center hover:border-blue-400 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">{item.icon}</div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{locale === 'zh' ? item.zh : item.en}</div>
            </a>
          ))}
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">{t.help.faq.title}</h2>
          <div className="space-y-6">
            {faqData.map((section, si) => (
              <div key={si}>
                <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3">
                  {locale === 'zh' ? section.category.zh : section.category.en}
                </h3>
                <div className="space-y-3">
                  {section.items.map((item, ii) => {
                    const faq = locale === 'zh' ? item.zh : item.en
                    return (
                      <details key={ii} className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                        <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400">
                          <span>Q: {faq.q}</span>
                          <span className="text-gray-400 group-open:rotate-180 transition-transform shrink-0 ml-2">▼</span>
                        </summary>
                        <p className="px-5 pb-4 text-gray-600 dark:text-gray-400">A: {faq.a}</p>
                      </details>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 text-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{t.help.contact.title}</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-4">{t.help.contact.desc}</p>
          <a href="mailto:support@calchub.app"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 transition-colors font-medium"
          >
            ✉️ support@calchub.app
          </a>
        </div>
      </div>
    </div>
  )
}

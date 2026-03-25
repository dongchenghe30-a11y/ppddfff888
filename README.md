# Calc Tools — 在线计算工具集

一个基于 **Next.js 14** 构建的免费在线计算工具集，涵盖 50+ 实用工具，支持中英文切换与深色模式。

**在线访问：** [your-domain.com](https://your-domain.com)

---

## ✨ 功能特性

| 类别 | 工具列表 |
|------|---------|
| 🔢 计算器 | 基础、科学、程序员（进制转换）、金融计算器 |
| 📐 单位换算 | 长度、重量、温度、面积、体积、速度、时间、压强、能量、数据 |
| 💰 金融工具 | 贷款、复利、ROI、通胀、退休规划、股票收益 |
| 📏 数学工具 | 百分比、分数、比例、随机数、阶乘、最大公约数/最小公倍数、几何 |
| 🛠️ 开发者工具 | 二进制转换、颜色转换、Base64、URL 编解码、UUID、时间戳、哈希、正则测试 |
| 📝 文本处理 | 字数统计、大小写转换、去空行、反转、文本对比、字符频率分析 |
| 📅 日期工具 | 日期计算、工作日计算、倒计时 |
| 🌿 生活工具 | 折扣、小费、BMI、卡路里/TDEE、房贷、油耗、分账、年龄、汇率 |

## 🛠️ 技术栈

- **框架**：Next.js 14 (App Router)
- **语言**：TypeScript
- **样式**：Tailwind CSS
- **图标**：Lucide React
- **国际化**：自定义 i18n（中文 / English）
- **主题**：深色 / 浅色模式

## 🚀 本地开发

```bash
# 克隆仓库
git clone https://github.com/YOUR_USERNAME/calc-tools.git
cd calc-tools

# 安装依赖
npm install

# 启动开发服务器（http://localhost:3000）
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

## 📦 部署

详细部署步骤请查看 **[DEPLOY.md](./DEPLOY.md)**，支持三种方案：

- **Vercel（推荐）** — 一键部署，免费，全球 CDN
- **GitHub Pages** — 静态导出，完全免费
- **自托管服务器** — VPS / 云服务器，完整 SSR

### 快速部署到 Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/calc-tools)

## 📁 项目结构

```
calc-tools/
├── app/                    # Next.js App Router 页面
│   ├── calculator/         # 计算器工具
│   ├── unit/               # 单位换算
│   ├── finance/            # 金融工具
│   ├── math/               # 数学工具
│   ├── dev/                # 开发者工具
│   ├── text/               # 文本处理
│   ├── date/               # 日期工具
│   └── life/               # 生活工具
├── components/             # 公共组件
├── contexts/               # React Context（主题、语言、收藏）
├── lib/
│   ├── tools.ts            # 工具目录定义
│   └── translations/       # 中英文翻译文件
├── vercel.json             # Vercel 部署配置
└── DEPLOY.md               # 详细部署文档
```

## 📄 License

MIT License — 自由使用、修改和分发。

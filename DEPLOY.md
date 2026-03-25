# 部署指南 · Deployment Guide

本文档介绍将 **Calc Tools** 部署到生产环境的三种方案：
- **方案一（推荐）：Vercel** — 一键部署，全球 CDN，免费套餐足够
- **方案二：GitHub Pages** — 纯静态导出，完全免费
- **方案三：自托管服务器** — 完整 Next.js SSR，适合需要服务端功能时

---

## 前置准备

### 1. 初始化本地 Git 仓库

在项目根目录（`calc-tools/`）执行：

```bash
git init
git add .
git commit -m "feat: initial commit - calc tools website"
```

### 2. 创建 GitHub 仓库

1. 登录 [GitHub](https://github.com) → 点击右上角 **+** → **New repository**
2. 填写：
   - Repository name：`calc-tools`（或自定义名称）
   - 选择 **Public**（GitHub Pages 免费部署需要 Public）
   - **不要**勾选 Initialize this repository（本地已有代码）
3. 点击 **Create repository**

### 3. 推送代码到 GitHub

```bash
# 替换下面的 YOUR_USERNAME 为你的 GitHub 用户名
git remote add origin https://github.com/YOUR_USERNAME/calc-tools.git
git branch -M main
git push -u origin main
```

---

## 方案一：Vercel 部署（推荐）

Vercel 是 Next.js 官方推荐的部署平台，零配置、自动 HTTPS、全球 CDN、免费套餐每月 100GB 带宽。

### 步骤

**方法 A：通过 Vercel 网站（最简单）**

1. 访问 [vercel.com](https://vercel.com) → 使用 GitHub 账号登录
2. 点击 **Add New Project**
3. 找到 `calc-tools` 仓库 → 点击 **Import**
4. 配置保持默认（Vercel 自动检测 Next.js）：
   - Framework Preset：`Next.js`
   - Build Command：`npm run build`
   - Output Directory：`.next`
5. 点击 **Deploy** — 约 2 分钟部署完成

**方法 B：通过 Vercel CLI**

```bash
# 安装 Vercel CLI
npm install -g vercel

# 在项目目录执行
cd calc-tools
vercel

# 按提示操作：
# ? Set up and deploy? Y
# ? Which scope? 选你的账号
# ? Link to existing project? N
# ? Project name: calc-tools
# ? In which directory is your code? ./
# ✅ 部署完成，会输出访问 URL
```

### 自动化部署

Vercel 默认已启用 **Git 自动部署**：
- 推送到 `main` 分支 → 自动触发生产部署
- 推送到其他分支 → 自动创建预览链接（Preview Deployment）

### 自定义域名（可选）

1. Vercel 控制台 → 你的项目 → **Settings** → **Domains**
2. 添加你的域名，例如 `calc-tools.com`
3. 按提示在域名服务商处添加 DNS 记录（A 记录或 CNAME）
4. Vercel 自动签发 SSL 证书

---

## 方案二：GitHub Pages 部署（静态导出）

GitHub Pages 只支持纯静态文件，需要将 Next.js 配置为静态导出模式。

### 步骤一：修改 next.config.js

```js
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',           // 启用静态导出
  trailingSlash: true,        // 路径末尾加斜杠，GitHub Pages 需要
  basePath: '/calc-tools',    // 替换为你的仓库名
  images: {
    unoptimized: true,        // 静态导出不支持图片优化
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

module.exports = nextConfig
```

> ⚠️ **注意**：如果部署到自定义域名根路径，`basePath` 可以删除。

### 步骤二：创建 GitHub Actions 工作流

创建文件 `.github/workflows/deploy.yml`（已自动创建，见下方文件）。

### 步骤三：启用 GitHub Pages

1. GitHub 仓库 → **Settings** → **Pages**
2. Source 选择：**GitHub Actions**
3. 推送代码后，Actions 自动运行，部署完成后访问：
   `https://YOUR_USERNAME.github.io/calc-tools/`

### 步骤四：提交并推送配置

```bash
git add next.config.js .github/
git commit -m "ci: add GitHub Pages deployment config"
git push
```

---

## 方案三：自托管服务器部署（VPS / 云服务器）

适合需要完整 Node.js SSR 功能，或有自己服务器的情况。

### 环境要求

- Node.js 18.x 或 20.x
- npm 9.x+
- PM2（进程管理）
- Nginx（反向代理，可选）

### 步骤

**1. 在服务器上克隆代码**

```bash
# SSH 登录服务器后
git clone https://github.com/YOUR_USERNAME/calc-tools.git
cd calc-tools
```

**2. 安装依赖并构建**

```bash
npm install
npm run build
```

**3. 使用 PM2 启动服务**

```bash
# 安装 PM2
npm install -g pm2

# 启动服务（端口 3000）
pm2 start npm --name "calc-tools" -- start

# 设置开机自启
pm2 save
pm2 startup
```

**4. 配置 Nginx 反向代理（推荐）**

```nginx
# /etc/nginx/sites-available/calc-tools
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# 启用配置
ln -s /etc/nginx/sites-available/calc-tools /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx

# 配置 HTTPS（使用 Let's Encrypt）
apt install certbot python3-certbot-nginx
certbot --nginx -d your-domain.com
```

**5. 自动化部署（可选）**

在服务器上创建部署脚本 `deploy.sh`：

```bash
#!/bin/bash
cd /path/to/calc-tools
git pull origin main
npm install
npm run build
pm2 restart calc-tools
echo "✅ Deployed successfully"
```

---

## 环境变量配置

如果后续需要添加环境变量（如 Google Analytics、AdSense 等），在项目根目录创建 `.env.local`：

```env
# 本地开发用（不提交到 Git）
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_ADSENSE_ID=ca-pub-62370889
```

在 Vercel 中添加环境变量：
- 控制台 → 项目 → **Settings** → **Environment Variables**

在 GitHub Actions 中添加 Secrets：
- 仓库 → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

---

## 常见问题

### Q: 构建失败怎么办？
```bash
# 先本地验证构建
npm run build

# 查看错误信息修复后再推送
```

### Q: 部署后页面空白？
- 检查 `basePath` 是否配置正确（GitHub Pages 需要）
- 清除浏览器缓存后重试
- 查看浏览器控制台是否有 JS 报错

### Q: 404 页面问题？
- 确保 `trailingSlash: true` 已配置（GitHub Pages 方案）
- Vercel 部署无需此配置

### Q: 如何回滚到上一个版本？
```bash
# 查看提交历史
git log --oneline

# 回滚到指定版本
git revert HEAD
git push
# Vercel/GitHub Actions 会自动重新部署
```

---

## 部署方案对比

| 特性 | Vercel | GitHub Pages | 自托管 |
|------|--------|--------------|--------|
| 费用 | 免费（100GB/月） | 完全免费 | 服务器费用 |
| 配置难度 | ⭐ 最简单 | ⭐⭐ 中等 | ⭐⭐⭐ 较复杂 |
| 自动 HTTPS | ✅ | ✅ | 需手动配置 |
| 自定义域名 | ✅ | ✅ | ✅ |
| SSR 支持 | ✅ | ❌ 仅静态 | ✅ |
| 全球 CDN | ✅ | ✅（有限） | 需额外配置 |
| 部署速度 | ~2 分钟 | ~3 分钟 | 手动控制 |

**推荐选择**：
- 个人/小流量 → **Vercel**（最省心）
- 希望完全免费且接受静态限制 → **GitHub Pages**
- 需要完整后端 / 数据库 → **自托管**

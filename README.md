# 语言 | Language
[中文](https://github.com/csc751/XGZnet?tab=readme-ov-file#xgznet-中文-chinese) | [English](https://github.com/csc751/XGZnet?tab=readme-ov-file#xgznet英文-english)

---

# XGZnet (中文 Chinese)

🔥 零成本搭建带完整用户认证体系的轻量化个人网站，10 分钟一键部署，无需服务器，自带安全防护，适配 Cloudflare CDN 加速

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/csc751/XGZnet.git)

---

## 🙌 项目简介

XGZ 网是一个带完整用户认证体系的轻量化个人网站，采用前后端一体化设计，原生前端技术栈实现，适配 Vercel Serverless 无服务器部署，支持自定义域名 + Cloudflare CDN 加速，具备完善的用户管理、权限控制与安全防护能力。

---

## 🚀 功能特性

### 核心功能
```
- ✅ **用户注册**：邮箱验证码校验，密码强度合规校验
- ✅ **用户登录**：JWT 无状态身份认证，防篡改登录状态
- ✅ **权限管理**：管理员专属用户管理模块，普通用户权限隔离
- ✅ **账号管理**：支持安全退出登录、账号永久注销功能
- ✅ **前端页面**：响应式布局，适配电脑/手机端，多栏目内容展示
- ✅ **访问统计**：本地访问次数记录，风险提示弹窗
- ✅ **邮件服务**：注册验证码自动发送，异步发送不阻塞接口响应
```
### 🔒 安全特性
```
- 🔒 JWT 签名身份认证，彻底解决前端响应篡改越权漏洞（正在制作，7~10 天后上传）
- 🔒 bcryptjs 不可逆密码加密存储，杜绝明文密码泄露风险
- 🔒 接口层级权限校验，未登录/非管理员无法调用敏感接口
- 🔒 越权操作防护，仅可操作当前登录账号的相关数据
- 🔒 邮箱验证码有效期限制，防止重复使用
- 🔒 前端登录状态后端校验，防止本地存储篡改伪造权限
```
---

## 🛠️ 技术栈

| 模块 | 技术选型 |
|------|----------|
| 前端 | 原生 HTML + CSS + JavaScript，无框架依赖 |
| 后端 | Node.js + Express 5.x |
| 数据存储 | Redis 键值数据库 |
| 身份认证 | JSON Web Token (JWT) |
| 邮件服务 | Nodemailer，支持通用 SMTP 邮箱 |
| 部署平台 | Vercel Serverless |
| CDN 加速 | 适配 Cloudflare 全量 CDN 能力 |

---

## 📁 项目目录结构

```text
XGZ 网
├── public/                # 前端静态资源根目录
│   ├── icons/             # 页面图标资源文件夹
│   ├── favicon.ico        # 网站图标
│   └── index.html         # 网站首页入口（完整前端页面 + 逻辑）
├── .gitignore             # Git 忽略文件配置
├── package.json           # 项目依赖配置
├── package-lock.json      # 依赖版本锁定文件
├── server.js              # 后端服务入口（全量接口逻辑）
├── vercel.json            # Vercel 部署配置文件
└── README.md              # 项目说明文档
```
🚀 一键部署指南
前置准备
GitHub 账号（用于托管代码）
Vercel 账号（绑定 GitHub 账号）
可用的 Redis 数据库（推荐 Upstash 免费 Redis，适配 Vercel）
支持 SMTP 的邮箱账号（用于发送注册验证码）
部署步骤
1. 代码托管到 GitHub
将项目完整代码上传到 GitHub 仓库
⚠️ 请勿上传 .env 文件！！！
确保仓库根目录包含 server.js、package.json、vercel.json 和 public 文件夹
2. Vercel 导入项目
登录 Vercel 控制台，点击「New Project」
导入刚刚创建的 GitHub 仓库
无需修改构建配置，Vercel 会自动识别项目配置
3. 配置环境变量
在 Vercel 项目的「Settings → Environment Variables」中，添加以下必填环境变量：
```
变量名	         变量说明	                    示例值

REDIS_USERNAME	Redis 数据库用户名	           default

REDIS_PASSWORD	Redis 数据库密码	          你的 Redis 密码

REDIS_HOST	    Redis 连接地址	              xxx-xxx.redis.com

REDIS_PORT	    Redis 端口号	              6379

EMAIL_HOST	    邮箱 SMTP 服务器地址	       smtp.qq.com

EMAIL_PORT	    邮箱 SMTP 端口	               465

EMAIL_USER	    发件人邮箱完整地址	            xxx@qq.com

EMAIL_PASS	    邮箱 SMTP 授权码（邮箱授权码）	你的邮箱授权码

ADMIN_USERNAME	管理员登录账号	admin

ADMIN_PASSWORD	管理员登录密码	你的管理员密码

JWT_SECRET	    JWT 签名密钥（32 位以上随机复杂字符串）	xxxxxxxx
```
4. 执行部署
点击「Deploy」，等待 Vercel 自动完成构建与部署
部署成功后，Vercel 会自动生成 xxx.vercel.app 格式的默认域名，即可访问网站
5. 自定义域名 + Cloudflare 配置（可选）
在 Vercel 项目「Settings → Domains」中，添加你的自定义域名
按照 Vercel 提示，在 Cloudflare 中修改域名的 DNS 解析记录
Cloudflare 的 SSL/TLS 模式建议设置为「Full」，确保 HTTPS 正常访问
💻 本地调试指南
环境要求
Node.js 18.x 及以上版本
npm 包管理器
调试步骤
1. 克隆项目代码
```
git clone https://github.com/csc751/XGZnet.git
cd XGZnet-main
```
2. 安装项目依赖
```   
npm install
```
3. 配置本地环境变量
在项目根目录创建 .env 文件
填入和 Vercel 完全一致的环境变量（参考上方环境变量表格）
确保 .gitignore 文件中已添加 .env，禁止将该文件提交到 GitHub
4. 启动本地调试服务
```
node server.js
```
5. 访问网站
服务启动成功后，浏览器打开 http://localhost:3000 即可访问本地调试版本
所有功能与线上部署版本完全一致，可直接进行接口测试、功能调试
❓ 常见问题
1. 部署后收不到注册验证码？
检查邮箱 SMTP 配置是否正确，确认邮箱已开启 SMTP 服务
检查邮箱授权码是否正确，部分邮箱需要单独生成 SMTP 授权码
查看邮箱的垃圾箱/广告邮件文件夹，验证码邮件可能被拦截
查看 Vercel 项目的函数日志，确认邮件发送是否报错
2. 登录接口报错，提示服务初始化中？
检查 Redis 环境变量配置是否正确，确认 Redis 服务正常运行
确认 Redis 数据库的 IP 白名单已放开 Vercel 的出口 IP，或设置为允许所有 IP 访问
查看 Vercel 函数日志，确认 Redis 连接是否正常
3. 原有注册用户无法登录？
安全升级后，密码采用 bcryptjs 加密存储，原有明文存储的密码无法直接校验
解决方案：用户重新注册账号，或手动将原有密码加密后更新到 Redis 中
4. 抓包修改响应还能越权吗？
不能。所有敏感接口都增加了后端 JWT 令牌校验，仅修改前端响应无法生成有效的签名令牌
页面加载时会自动向后端校验登录状态的有效性，篡改本地存储会被自动清除登录状态
⚠️ 安全注意事项
JWT_SECRET 密钥必须使用复杂随机字符串，禁止使用简单字符，严禁泄露给他人
管理员账号密码请勿使用弱口令，建议使用字母 + 数字 + 符号的复杂组合
本地调试的 .env 文件绝对禁止提交到公开的 GitHub 仓库，避免敏感信息泄露
建议定期更换 Redis 密码、邮箱授权码和 JWT 密钥，提升安全性
生产环境请勿关闭接口权限校验，避免出现越权漏洞
📧 联系方式
抖音账号：@在河北的 DJI Mini 4 Pro 大
联系邮箱：cuiminecraft@outlook.com
🔝 返回顶部 | 🌐 Switch to English

# XGZnet(英文 English)
🔥 Build a lightweight personal website with a complete user authentication system at zero cost. One-click deployment in 10 minutes, no server required, comes with built-in security protection, and is compatible with Cloudflare CDN acceleration.

Deploy with Vercel

## 🙌 Introduction
XGZ Web is a lightweight personal website with a complete user authentication system, featuring an integrated front-end and back-end design, implemented with native front-end technology stacks, compatible with Vercel Serverless deployment, supporting custom domain names and Cloudflare CDN acceleration, and equipped with comprehensive user management, permission control, and security protection capabilities.

## 🚀 Features

### Core Functions
```
✅ User Registration: Email verification code check, password strength compliance check
✅ User Login: JWT stateless identity authentication, tamper-proof login status
✅ Permission Management: Administrator-exclusive user management module, isolation of ordinary user permissions
✅ Account Management: Support for secure logout, permanent account cancellation function
✅ Front-end Page: Responsive layout, compatible with PC and mobile devices, multi-column content display
✅ Access Statistics: Local access count record, risk warning pop-up window
✅ Email Service: Automatic sending of registration verification codes, asynchronous sending without blocking interface response
```
### 🔒 Security Features
```
🔒 JWT signature-based identity authentication, completely solving the problem of front-end response tampering and unauthorized access (In development, will be uploaded in 7-10 days)
🔒 bcryptjs irreversible password encryption storage, eliminating the risk of plaintext password leakage
🔒 Interface-level permission verification, preventing unauthorized access to sensitive interfaces by unlogged-in users or non-administrators
🔒 Protection against unauthorized operations, allowing only the manipulation of data related to the currently logged-in account
🔒 Expiration limit on email verification codes, preventing repeated use
🔒 Back-end verification of front-end login status, preventing tampering and forging of permissions through local storage modification
```

---

## Technology Stackw
| Module |	Technology Selection |
|------|----------|
| Front-end | Native HTML + CSS + JavaScript, no framework dependency |
| Back-end | Node.js + Express 5.x |
|Data Storage | Redis key-value database |
| Identity Authentication | JSON Web Token (JWT)|
| Email Service | Nodemailer, supporting general SMTP email |
| Deployment Platform | Vercel Serverless |
|CDN Acceleration | Adapted to Cloudflare's full CDN capabilities|

---

## 📁 Project Directory Structure

```text
XGZ Web
├── public/                # Front-end static resources root directory
│   ├── icons/             # Page icon resource folder
│   ├── favicon.ico        # Website icon
│   └── index.html         # Website home page entry (complete front-end page + logic)
├── .gitignore             # Git ignore file configuration
├── package.json           # Project dependency configuration
├── package-lock.json      # Dependency version lock file
├── server.js              # Back-end service entry (full interface logic)
├── vercel.json            # Vercel deployment configuration file
└── README.md              # Project description document
```
🚀 One-click Deployment Guide
Preparatory Work
GitHub Account (for code hosting)
Vercel Account (linked to GitHub account)
Available Redis Database (Upstash free Redis recommended, compatible with Vercel)
Email Account Supporting SMTP (for sending registration verification codes)
Deployment Steps
1. Code Hosting on GitHub
Upload the complete project code to the GitHub repository
⚠️ Do NOT upload the .env file!!!
Ensure that the root directory contains server.js, package.json, vercel.json, and the public folder
2. Importing the Project to Vercel
Log in to the Vercel console, click on "New Project"
Import the GitHub repository you just created
No need to modify the build configuration; Vercel will automatically recognize the project configuration
3. Configuring Environment Variables
In the "Settings → Environment Variables" of the Vercel project, add the following required environment variables:
```
Variable Name	Description	Example Value
REDIS_USERNAME	Redis database username	default
REDIS_PASSWORD	Redis database password	Your Redis password
REDIS_HOST	Redis connection address	xxx-xxx.redis.com
REDIS_PORT	Redis port number	6379
EMAIL_HOST	Email SMTP server address	smtp.qq.com
EMAIL_PORT	Email SMTP port	465
EMAIL_USER	Sender's email address	xxx@qq.com
EMAIL_PASS	Email SMTP authorization code (not login password)	Your email authorization code
ADMIN_USERNAME	Administrator login account	admin
ADMIN_PASSWORD	Administrator login password	Your administrator password
JWT_SECRET	JWT signature key (32+ character random complex string)	xxxxxxxx
```
4. Executing Deployment
Click on "Deploy" and wait for Vercel to automatically complete the build and deployment
After successful deployment, Vercel will generate a default domain in the format xxx.vercel.app
5. Custom Domain + Cloudflare Configuration (Optional)
In Vercel project "Settings → Domains", add your custom domain
Follow Vercel instructions to modify the domain's DNS resolution records in Cloudflare
It is recommended to set Cloudflare's SSL/TLS mode to "Full" to ensure normal HTTPS access
💻 Local Debugging Guide
Environmental Requirements
Node.js 18.x and above versions
npm package manager
Debugging Steps
1. Clone/Download Project Code
```
git clone https://github.com/csc751/XGZnet.git
cd XGZnet-main
```
2. Install Project Dependencies
```
npm install
```
3. Configure Local Environment Variables
Create a .env file in the project root directory
Fill in the environment variables exactly as they are in Vercel (refer to the environment variable table above)
Ensure that .env is added to the .gitignore file to prevent it from being committed to GitHub
4. Start the Local Debugging Service
```
node server.js
```
5. Accessing the Website
After the service starts successfully, open http://localhost:3000 in your browser
All functions are exactly the same as the online deployment version
❓ Q&A
1. Did Not Receive Registration Verification Code After Deployment?
Check if the email SMTP configuration is correct and confirm that the email has enabled the SMTP service
Verify if the email authorization code is correct (some email providers require generating a separate SMTP authorization code)
Check the spam or promotional email folder, as the verification code email might have been intercepted
Review the Vercel project function logs to confirm if there are any errors in sending the email
2. Login Interface Reports Error, Indicating Service is Initializing?
Check if the Redis environment variable configuration is correct and confirm that the Redis service is running normally
Confirm that the IP whitelist of the Redis database has been opened to Vercel's outbound IP, or set to allow all IP addresses to access
Check the Vercel function logs to confirm whether the Redis connection is normal
3. Existing Registered Users Cannot Log In?
After the security upgrade, passwords are encrypted and stored using bcryptjs. Previously plaintext-stored passwords cannot be directly verified
Solution: Users need to re-register their accounts, or manually encrypt their original passwords and update them in Redis
4. Can One Still Perform Unauthorized Access by Modifying the Response Through Packet Capture?
No. All sensitive interfaces have added backend JWT token verification. Only modifying the front-end response cannot generate a valid signature token
When the page loads, it will automatically verify the validity of the login status with the backend. Tampering with local storage will automatically clear the login status
⚠️ Safety Precautions
The JWT_SECRET key must use a complex random string. Simple characters are prohibited. It must not be disclosed to others
For the administrator account password, do not use weak passwords. It is recommended to use a complex combination of letters, numbers, and symbols
The local debugging .env file must never be submitted to a public GitHub repository to prevent the leakage of sensitive information
It is recommended to change the Redis password, email authorization code, and JWT key regularly to enhance security
In the production environment, do not disable interface permission verification to avoid unauthorized access vulnerabilities
📧 Contact Information
Douyin Account: @在河北的 DJI Mini 4 Pro 大
Contact Email: cuiminecraft@outlook.com
🔝 Back to Top | 🌐 切换到中文
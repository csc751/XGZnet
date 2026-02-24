# XGZnet
🔥 零成本搭建带完整用户认证体系的轻量化个人网站，10分钟一键部署，无需服务器，自带安全防护，适配Cloudflare CDN加速
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=你的GitHub仓库完整地址)

XGZ网
 🙌
一个带完整用户认证体系的轻量化个人网站，前后端一体化设计，原生前端技术栈实现，适配Vercel Serverless无服务器部署，支持自定义域名+Cloudflare CDN加速，具备完善的用户管理、权限控制与安全防护能力。
 
功能特性🚀
 
核心功能
 
- ✅ 用户注册：邮箱验证码校验，密码强度合规校验
- ✅ 用户登录：JWT无状态身份认证，防篡改登录状态
- ✅ 权限管理：管理员专属用户管理模块，普通用户权限隔离
- ✅ 账号管理：支持安全退出登录、账号永久注销功能
- ✅ 前端页面：响应式布局，适配电脑/手机端，多栏目内容展示
- ✅ 访问统计：本地访问次数记录，风险提示弹窗
- ✅ 邮件服务：注册验证码自动发送，异步发送不阻塞接口响应
 
安全特性
 
//- 🔒 JWT签名身份认证，彻底解决前端响应篡改越权漏洞(即将使用)
- 🔒 bcryptjs不可逆密码加密存储，杜绝明文密码泄露风险
- 🔒 接口层级权限校验，未登录/非管理员无法调用敏感接口
- 🔒 越权操作防护，仅可操作当前登录账号的相关数据
- 🔒 邮箱验证码有效期限制，防止重复使用
- 🔒 前端登录状态后端校验，防止本地存储篡改伪造权限
 
技术栈
 
模块 技术选型 
前端 原生 HTML + CSS + JavaScript，无框架依赖 
后端 Node.js + Express 5.x 
数据存储 Redis 键值数据库 
身份认证 JSON Web Token (JWT) 
邮件服务 Nodemailer，支持通用SMTP邮箱 
部署平台 Vercel Serverless 
CDN加速 适配Cloudflare全量CDN能力 
 
项目目录结构
 
## 项目目录结构
```text
XGZ网
├── public/                # 前端静态资源根目录
│   ├── icons/             # 页面图标资源文件夹
│   ├── favicon.ico        # 网站图标
│   └── index.html         # 网站首页入口（完整前端页面+逻辑）
├── .gitignore             # Git忽略文件配置
├── package.json           # 项目依赖配置
├── package-lock.json      # 依赖版本锁定文件
├── server.js              # 后端服务入口（全量接口逻辑）
├── vercel.json            # Vercel部署配置文件
└── README.md              # 项目说明文档
```
 
 
一键部署指南
 
前置准备
 
1. GitHub账号（用于托管代码）
2. Vercel账号（绑定GitHub账号）
3. 可用的Redis数据库（推荐Upstash免费Redis，适配Vercel）
4. 支持SMTP的邮箱账号（用于发送注册验证码）
 
部署步骤
 
1. 代码托管到GitHub
- 将项目完整代码上传到GitHub仓库，⚠️请勿上传.env 文件！！！！
- 确保仓库根目录包含 server.js 、 package.json 、 vercel.json 和 public 文件夹
2. Vercel导入项目
- 登录Vercel控制台，点击「New Project」，导入刚刚创建的GitHub仓库
- 无需修改构建配置，Vercel会自动识别项目配置
3. 配置环境变量
在Vercel项目的「Settings → Environment Variables」中，添加以下必填环境变量：
变量名 变量说明 示例值 
REDIS_USERNAME Redis数据库用户名 default 
REDIS_PASSWORD Redis数据库密码 你的Redis密码 
REDIS_HOST Redis连接地址 xxx-xxx.redis.com 
REDIS_PORT Redis端口号 6379 
EMAIL_HOST 邮箱SMTP服务器地址 smtp.qq.com 
EMAIL_PORT 邮箱SMTP端口 465 
EMAIL_USER 发件人邮箱完整地址 xxx@qq.com 
EMAIL_PASS 邮箱SMTP授权码（非登录密码） 你的邮箱授权码 
ADMIN_USERNAME 管理员登录账号 admin 
ADMIN_PASSWORD 管理员登录密码 你的管理员密码 
//JWT_SECRET JWT签名密钥（32位以上随机复杂字符串） xxxxxxxx 
4. 执行部署
- 点击「Deploy」，等待Vercel自动完成构建与部署
- 部署成功后，Vercel会自动生成 xxx.vercel.app 格式的默认域名，即可访问网站
5. 自定义域名+Cloudflare配置（可选）
- 在Vercel项目「Settings → Domains」中，添加你的自定义域名
- 按照Vercel提示，在Cloudflare中修改域名的DNS解析记录
- Cloudflare的SSL/TLS模式建议设置为「Full」，确保HTTPS正常访问
 
本地调试指南
 
环境要求
 
- Node.js 18.x 及以上版本
- npm 包管理器
 
调试步骤
 
1. 克隆/下载项目代码到本地
bash
  
git clone 你的GitHub仓库地址
cd 项目文件夹
 
2. 安装项目依赖
bash
  
npm install
 
3. 配置本地环境变量
- 在项目根目录创建 .env 文件，填入和Vercel完全一致的环境变量（参考上方环境变量表格）
- 确保 .gitignore 文件中已添加 .env ，禁止将该文件提交到GitHub
4. 启动本地调试服务
bash
  
node server.js
 
5. 访问网站
- 服务启动成功后，浏览器打开  http://localhost:3000  即可访问本地调试版本
- 所有功能与线上部署版本完全一致，可直接进行接口测试、功能调试
 
常见问题
 
1. 部署后收不到注册验证码？
 
- 检查邮箱SMTP配置是否正确，确认邮箱已开启SMTP服务
- 检查邮箱授权码是否正确，部分邮箱需要单独生成SMTP授权码
- 查看邮箱的垃圾箱/广告邮件文件夹，验证码邮件可能被拦截
- 查看Vercel项目的函数日志，确认邮件发送是否报错
 
2. 登录接口报错，提示服务初始化中？
 
- 检查Redis环境变量配置是否正确，确认Redis服务正常运行
- 确认Redis数据库的IP白名单已放开Vercel的出口IP，或设置为允许所有IP访问
- 查看Vercel函数日志，确认Redis连接是否正常
 
3. 原有注册用户无法登录？
 
- 安全升级后，密码采用bcryptjs加密存储，原有明文存储的密码无法直接校验
- 解决方案：用户重新注册账号，或手动将原有密码加密后更新到Redis中
 
4. 抓包修改响应还能越权吗？
 
- 不能。所有敏感接口都增加了后端JWT令牌校验，仅修改前端响应无法生成有效的签名令牌
- 页面加载时会自动向后端校验登录状态的有效性，篡改本地存储会被自动清除登录状态
 
安全注意事项
 
1. JWT_SECRET密钥必须使用复杂随机字符串，禁止使用简单字符，严禁泄露给他人
2. 管理员账号密码请勿使用弱口令，建议使用字母+数字+符号的复杂组合
3. 本地调试的 .env 文件绝对禁止提交到公开的GitHub仓库，避免敏感信息泄露
4. 建议定期更换Redis密码、邮箱授权码和JWT密钥，提升安全性
5. 生产环境请勿关闭接口权限校验，避免出现越权漏洞
 
联系方式
 
- 抖音账号：@在河北的DJI Mini 4 Pro大
- 联系邮箱：cuiminecraft@outlook.com

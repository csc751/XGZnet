const path = require('path');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('redis');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const app = express();

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Redis 连接
const redisClient = createClient({
  username: process.env.REDIS_USERNAME || 'default',
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT)
  }
});
redisClient.on('error', err => console.log('Redis错误:', err));
redisClient.on('connect', () => console.log('Redis连接成功'));
redisClient.connect();

// 邮箱配置
const emailTransporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// 生成验证码
const generateCaptcha = () => crypto.randomInt(100000, 999999).toString();

// -------------------------- API 接口 --------------------------
// 1. 发送验证码
app.post('/api/send-captcha', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !/^[\w.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)) {
      return res.status(400).json({ success: false, msg: '请输入有效邮箱' });
    }
    const captcha = generateCaptcha();
    await redisClient.setEx(`captcha:${email}`, 300, captcha);
    
    // 发送邮件
    await emailTransporter.sendMail({
      from: `"XGZ网" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: '注册验证码',
      html: `<div style="max-width:600px;margin:0 auto;padding:20px;">
              <h3>您的注册验证码：<span style="color:#2196F3;font-size:24px;">${captcha}</span></h3>
              <p>有效期5分钟，请尽快使用</p>
            </div>`
    });
    res.json({ success: true, msg: '验证码已发送' });
  } catch (err) {
    console.error('发送验证码失败:', err);
    res.status(500).json({ success: false, msg: '验证码发送失败' });
  }
});

// 2. 注册
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, captcha, password } = req.body;
    if (!username || !email || !captcha || !password) {
      return res.status(400).json({ success: false, msg: '请填写所有必填项' });
    }
    if (/admin/i.test(username)) {
      return res.status(400).json({ success: false, msg: '用户名不能包含admin' });
    }
    const storedCaptcha = await redisClient.get(`captcha:${email}`);
    if (!storedCaptcha || storedCaptcha !== captcha) {
      return res.status(400).json({ success: false, msg: '验证码错误或过期' });
    }
    const existingUser = await redisClient.hGet('users', username);
    if (existingUser) {
      return res.status(400).json({ success: false, msg: '用户名已注册' });
    }
    await redisClient.hSet('users', username, JSON.stringify({
      username, email, password, createTime: new Date().toLocaleString()
    }));
    res.json({ success: true, msg: '注册成功，请登录' });
  } catch (err) {
    console.error('注册失败:', err);
    res.status(500).json({ success: false, msg: '注册失败' });
  }
});

// 3. 登录
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, msg: '用户名和密码不能为空' });
    }
    // 管理员登录
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
      return res.json({ success: true, isAdmin: true, msg: '管理员登录成功' });
    }
    // 普通用户登录
    const userStr = await redisClient.hGet('users', username);
    if (!userStr) {
      return res.status(401).json({ success: false, msg: '用户名或密码错误' });
    }
    const user = JSON.parse(userStr);
    if (user.password !== password) {
      return res.status(401).json({ success: false, msg: '用户名或密码错误' });
    }
    res.json({ success: true, isAdmin: false, msg: '登录成功' });
  } catch (err) {
    console.error('登录失败:', err);
    res.status(500).json({ success: false, msg: '登录失败' });
  }
});

// 4. 获取用户列表
app.get('/api/users', async (req, res) => {
  try {
    const userList = await redisClient.hGetAll('users');
    const users = Object.values(userList).map(u => JSON.parse(u)).map(({ username, email }) => ({ username, email }));
    res.json({ success: true, users });
  } catch (err) {
    console.error('获取用户列表失败:', err);
    res.status(500).json({ success: false, msg: '获取用户列表失败' });
  }
});

// 5. 注销账号
app.post('/api/delete-account', async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({ success: false, msg: '用户名不能为空' });
    }
    if (username === process.env.ADMIN_USERNAME) {
      return res.status(403).json({ success: false, msg: '管理员账号不能注销' });
    }
    const existingUser = await redisClient.hGet('users', username);
    if (!existingUser) {
      return res.status(404).json({ success: false, msg: '用户不存在' });
    }
    await redisClient.hDel('users', username);
    res.json({ success: true, msg: '账号已永久注销' });
  } catch (err) {
    console.error('注销失败:', err);
    res.status(500).json({ success: false, msg: '注销失败' });
  }
});

// 根路径
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 启动服务
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`服务启动：http://localhost:${PORT}`);
});

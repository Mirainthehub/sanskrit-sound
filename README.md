# 梵音 Svara · 把语言学习做成晨钟暮鼓

> **多邻国的闯关节奏 + Calm 的沉浸气质 + 曼陀罗持诵** —— 开源梵语/梵文声音修习 App（React · 可本地运行）

[![在线体验](https://img.shields.io/badge/在线体验-GitHub_Pages-9a7b4f?style=for-the-badge)](https://mirainthehub.github.io/sanskrit-sound/)
[![Deploy with Vercel](https://img.shields.io/badge/deploy-Vercel-000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMirainthehub%2Fsanskrit-sound&project-name=sanskrit-sound&repository-name=sanskrit-sound)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)

**一句话：** 不是刷题背词，是**听音、持诵、温柔进阶** —— 适合想认真接触梵语声音的人，也适合想做一个「有灵魂的语言产品」的开发者。

---

## 为什么值得点开？

| 传统语言 App | 梵音 Svara |
|-------------|------------|
| 卡通、连击、错题红叉 | 金夜色、慢动画、错了也温柔 |
| 先背单词再发音 | **先听 sacred sound，再认字形** |
| 焦虑感 streak | 「连续修习」「元气」—— 有进度，不吵闹 |
| 通用课程 | 含**唐僧梵文**授权元音课 + 印度人原声（可扩展导入） |

**适合转发给：** 瑜伽/冥想圈、佛学梵语爱好者、独立开发者、想做「差异化语言产品」的朋友。

---

## 快速体验

### 在线 Demo（免安装）

**https://mirainthehub.github.io/sanskrit-sound/**

推送到 `main` 后会自动部署（约 1–2 分钟）。点 **「今日修习」** 即可试听。

### 本地运行

```bash
git clone https://github.com/Mirainthehub/sanskrit-sound.git
cd sanskrit-sound
npm install
npm run dev
```

浏览器打开 **http://localhost:5173**。

### 部署到自己的 Vercel（可选）

1. 点击 README 顶部 **[Deploy with Vercel](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMirainthehub%2Fsanskrit-sound)**  
2. 用 GitHub 登录 → Import → Deploy（无需改配置，`vercel.json` 已写好）  
3. 得到独立域名，如 `https://sanskrit-sound.vercel.app`

- 默认中文界面，右上角可切 **EN**
- 已内置元音课原声（`public/audio/yuapp/`）

---

## 核心画面（打开 App 你会看到）

1. **首页** — ॐ +「神圣梵音」+ 今日修习 / 修行之路 / 曼陀罗静室  
2. **修行之路** — 线性解锁，像多邻国路径，但安静得多  
3. **听音练习** — 触摸音节、听印度人朗读、辨认、持诵、拼句  
4. **曼陀罗静室** — 只聆听，不闯关  

> 建议本地跑起来录 15 秒屏，发小红书 / 朋友圈 / X，传播效果最好。

---

## 可直接复制的分享文案

**朋友圈 / 微信群（短）**

```
做了个开源小项目「梵音 Svara」——
把多邻国式闯关，做成了晨钟暮鼓里的梵语听音课。
在线直接玩：mirainthehub.github.io/sanskrit-sound
源码：github.com/Mirainthehub/sanskrit-sound
```

**小红书 / 公众号（略长）**

```
如果你想学梵语，但受不了多邻国那种卡通吵闹——
可以试试「梵音 Svara」（开源）。

它保留：路径解锁、每日修习、听音选词
它拿掉：红叉焦虑、刷题感

更像 Calm + 曼陀罗：先听 sacred sound，再认字。
课程含唐僧梵文授权元音课 + 原声朗读。

开发者：React + Vite，clone 就能跑。
链接：github.com/Mirainthehub/sanskrit-sound

#梵语 #冥想 #开源 #独立开发 #语言学习
```

**英文 / X（短）**

```
Svara — Sanskrit learning that feels like meditation, not drills.

Duolingo-style path + Calm-like UI + mantra audio.
Open source, runs locally.

github.com/Mirainthehub/sanskrit-sound
```

---

## 技术栈（给开发者）

| 层 | 选型 |
|----|------|
| UI | React 19 + TypeScript + Tailwind v4 |
| 动效 | Framer Motion |
| 状态 | Zustand（进度本地持久化） |
| 音频 | HTMLAudio + Web Speech 回退 |
| 课程导入 | `scripts/import-yuapp.mjs`（唐僧梵文站，需授权账号） |
| 国际化 | 中 / 英一键切换 |

### 项目结构

```
src/
  pages/          # 首页、路径、静室、课时
  components/     # 练习题型（听音、辨认、持诵、拼句…）
  data/lessons.ts # 核心课 + yuapp 导入课
  i18n/           # 中英文案
public/audio/     # 发音 MP3
```

### 练习类型

1. **sound-tap** — 听两遍再继续  
2. **listen-match** — 听音选转写  
3. **meaning-reflect** — 象征意义（答错也温柔）  
4. **mantra-chant** — 分音节跟诵  
5. **assemble** — 词库拼句（如 So Ham）

---

## 导入更多唐僧梵文课程

需已购课账号，**切勿将 `.env` 提交到 Git**。

```bash
cp .env.example .env
# 填写 YUAPP_USERNAME / YUAPP_PASSWORD

npm run import:yuapp
# 或只导入元音：YUAPP_CATEGORIES=1 npm run import:yuapp
```

---

## 设计原则

- 不卡通、不羞辱式错题  
- 先听后记  
- 每课一句「修习意图」  
- 内容授权自 [唐僧梵文](https://sanskrit.yuapp.top)，公开仓库请自行确认分发权限  

---

## English summary

**Svara** is an open-source, meditative Sanskrit sound-learning prototype: gentle progression inspired by Duolingo, immersion inspired by Calm, focused on mantra, listening, and transliteration — not vocabulary drills.

```bash
npm install && npm run dev
```

MIT License · Contributions welcome.

---

<p align="center">
  <strong>如果这个项目对你有启发，欢迎 Star · Fork · 转发给需要安静学语言的朋友</strong>
</p>

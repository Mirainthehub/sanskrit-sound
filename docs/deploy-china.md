# 国内访问 · 免费部署指南

GitHub / GitHub Pages 在国内经常打不开，**不是代码问题**。下面平台可托管同一套静态站点（`npm run build` 的 `dist`），国内一般能直接打开。

---

## 推荐对比

| 平台 | 费用 | 国内访问 | 和 GitHub 关系 | 难度 |
|------|------|----------|----------------|------|
| [Gitee Pages](https://gitee.com) | 公开仓库免费 | 较好 | 导入/镜像 GitHub 仓库到 Gitee | ⭐⭐ |
| [腾讯云 Webify](https://cloud.tencent.com/product/webify) | 有免费额度 | 好 | 连 Gitee/GitHub（GitHub 需能拉取时配置） | ⭐⭐⭐ |
| [EdgeOne Pages](https://edgeone.ai/pages) | 免费套餐 | 好 | 上传 `dist` 或连 Git | ⭐⭐ |
| 阿里云 OSS 静态托管 | 少量免费 | 好 | 手动上传 `dist` | ⭐⭐⭐ |
| Vercel / Cloudflare | 免费 | 不稳定或很慢 | 连 GitHub | 不推荐作国内主站 |

**不能**把 GitHub Pages 的 URL「映射」成国内域名——需要在国内平台**重新部署一份**构建产物。代码仍可在 GitHub 存，部署到国内平台即可。

---

## 方案一：Gitee Pages（最常用）

### 1. 把仓库弄到 Gitee

1. 注册 [gitee.com](https://gitee.com)（需实名认证）
2. 右上角 **「从 GitHub 导入仓库」** → 填  
   `https://github.com/Mirainthehub/sanskrit-sound`  
   （若 GitHub 打不开，可让朋友导出 zip 或你用代理导入一次）
3. 导入后得到 Gitee 仓库，例如：  
   `https://gitee.com/你的用户名/sanskrit-sound`

### 2. 构建并开启 Pages

在项目根目录本地执行（或 Gitee「流水线」）：

```bash
npm ci
BASE_PATH=/sanskrit-sound/ npm run build
```

> 若 Gitee Pages 地址是 `https://xxx.gitee.io/sanskrit-sound/`，`BASE_PATH` 必须是 `/sanskrit-sound/`（末尾斜杠保留）。  
> 若 Pages 绑在**自定义根域名**且挂在根路径，则用 `BASE_PATH=/`。

### 3. 部署 dist

Gitee 当前常见两种方式（以网页说明为准）：

- **方式 A**：仓库 → **服务** → **Gitee Pages** → 选择部署目录 `dist`（若支持直接选构建产物）
- **方式 B**：把 `dist` 内容推到 **`gh-pages` 分支** 或 Gitee 要求的 pages 分支

部署成功后访问：`https://<你的用户名>.gitee.io/sanskrit-sound/`

### 4. 和 GitHub 同步

- 在 Gitee 仓库：**管理 → 仓库同步**（可设从 GitHub 拉取，需你本机或服务器能访问 GitHub）
- 或平时在 Gitee 直接改，GitHub 当备份

---

## 方案二：腾讯云 Webify（自动化程度高）

1. 打开 [Webify](https://cloud.tencent.com/product/webify) → 创建应用  
2. 关联 **Gitee** 仓库（国内拉代码更稳）  
3. 构建设置：
   - 构建命令：`npm run build`
   - 环境变量：`BASE_PATH=/`（Webify 通常挂在根域名子路径或独立域名，按控制台给的「访问路径」调整）
   - 输出目录：`dist`
4. 发布后会得到 `*.webify.app` 或自定义域名（自定义域名需备案）

---

## 方案三：EdgeOne Pages（免服务器）

1. [EdgeOne Pages 控制台](https://console.cloud.tencent.com/edgeone/pages)  
2. 新建项目 → **直接上传** 本地 `dist` 文件夹（不用 Git 也行）  
3. 获得 `*.edgeone.app` 国内可访问链接  

适合：GitHub 完全打不开、只想快速有一个国内 Demo。

---

## 环境变量说明（重要）

本项目的静态资源路径依赖 `BASE_PATH`：

| 部署目标 | BASE_PATH |
|----------|-----------|
| GitHub Pages | `/sanskrit-sound/` |
| 本地 / Vercel 根路径 | `/` 或不设置 |
| Gitee `xxx.gitee.io/仓库名/` | `/仓库名/` |

构建示例：

```bash
BASE_PATH=/sanskrit-sound/ npm run build
```

---

## 自定义域名（可选）

若你有**已备案**域名：

1. 在国内平台绑定域名（Gitee Pages / Webify / EdgeOne 均支持）  
2. DNS 按平台提示添加 CNAME  
3. 备案主体需与域名一致（国内规定）

---

## 不建议的做法

- **反向代理 GitHub Pages**：Pages 域名在国内常被墙，代理不稳定且可能违规  
- **只发 GitHub 链接给国内用户**：多数打不开  

---

## 快速自测（国内是否可访问）

部署完成后用手机 **4G（关 WiFi）** 打开链接；或在 [站长工具拨测](https://tool.chinaz.com/speedtest) 测全国访问。

---

有问题可在仓库提 Issue，注明用的平台和完整访问 URL。

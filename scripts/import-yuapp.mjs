/**
 * Import lessons from sanskrit.yuapp.top (authorized use only).
 *
 * Usage:
 *   cp .env.example .env   # add credentials
 *   node scripts/import-yuapp.mjs
 *   node scripts/import-yuapp.mjs --lesson 1/1
 *   node scripts/import-yuapp.mjs --public-only
 */

import fs from 'fs/promises'
import { readFileSync, existsSync, statSync, unlinkSync } from 'fs'
import { execFileSync } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const BASE = 'https://sanskrit.yuapp.top'
const OUT_DATA = path.join(ROOT, 'src/data/yuapp')
const OUT_AUDIO = path.join(ROOT, 'public/audio/yuapp')
const OUT_IMAGES = path.join(ROOT, 'public/images/yuapp')
const COOKIE_JAR = path.join(ROOT, '.yuapp-cookies.txt')

const CATEGORIES = {
  1: { title: '字母与元音', symbol: 'अ', description: '唐僧梵文 · 印地语/梵文字母和元音' },
  2: { title: '印地语初级', symbol: 'ा', description: '唐僧梵文 · 现代梵文入门' },
  3: { title: '印地语中级', symbol: 'ी', description: '唐僧梵文 · 语法与常用表达' },
  4: { title: '佛经梵文', symbol: 'ॐ', description: '唐僧梵文 · 经典读诵' },
}

function loadEnv() {
  const envPath = path.join(ROOT, '.env')
  try {
    const raw = readFileSync(envPath, 'utf8')
    for (const line of raw.split('\n')) {
      const m = line.match(/^([^#=]+)=(.*)$/)
      if (m) process.env[m[1].trim()] = m[2].trim()
    }
  } catch {
    /* no .env */
  }
}

function parseArgs() {
  const args = process.argv.slice(2)
  const opts = { publicOnly: false, lesson: null, categories: null }
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--public-only') opts.publicOnly = true
    if (args[i] === '--lesson' && args[i + 1]) opts.lesson = args[++i]
    if (args[i] === '--categories' && args[i + 1])
      opts.categories = args[++i].split(',').map(Number)
  }
  if (!opts.categories && process.env.YUAPP_CATEGORIES)
    opts.categories = process.env.YUAPP_CATEGORIES.split(',').map(Number)
  return opts
}

/** curl keeps PHPSESSID correctly (Node fetch does not on this site) */
function curlArgs(extra = []) {
  const base = ['-sL', '-c', COOKIE_JAR, '-b', COOKIE_JAR, '-A', 'Svara-Importer/1.0']
  return [...base, ...extra]
}

function fetchHtml(url, { method = 'GET', body } = {}) {
  const args = curlArgs()
  if (method === 'POST') args.push('-X', 'POST', '--data', body)
  args.push(url)
  return execFileSync('curl', args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
}

function login() {
  const user = process.env.YUAPP_USERNAME
  const pass = process.env.YUAPP_PASSWORD
  if (!user || !pass) return false

  try {
    if (existsSync(COOKIE_JAR)) unlinkSync(COOKIE_JAR)
  } catch {
    /* ignore */
  }

  const body = `username=${encodeURIComponent(user)}&password=${encodeURIComponent(pass)}`
  fetchHtml(`${BASE}/login.php`, { method: 'POST', body })
  const html = fetchHtml(`${BASE}/main.php`)
  const ok =
    html.includes(user) &&
    !html.includes('密码错误') &&
    !html.includes('用户不存在') &&
    !html.match(/<td>访客<\/td>/)
  return ok
}

function audioUrl(key) {
  if (key.includes('/')) return `${BASE}/mp3.php?id=${encodeURIComponent(key)}`
  return `${BASE}/example/${key}.mp3`
}

async function downloadFile(url, dest) {
  await fs.mkdir(path.dirname(dest), { recursive: true })
  try {
    if (existsSync(dest) && statSync(dest).size > 200) return dest
  } catch {
    /* continue */
  }
  try {
    execFileSync('curl', curlArgs(['-f', '-o', dest, url]), { stdio: 'pipe' })
    if (existsSync(dest) && statSync(dest).size > 200) return dest
  } catch {
    try {
      await fs.unlink(dest)
    } catch {
      /* ignore */
    }
  }
  return null
}

function parseTransliterationCell(text) {
  const t = text.replace(/<[^>]+>/g, '').trim()
  const m = t.match(/^([a-zA-Zāīūṛṝḷḹṃḥśṣṅñṭḍṇ\.]+)\s*(.*)$/)
  if (m) return { transliteration: m[1], hint: m[2] || undefined }
  return { transliteration: t, hint: undefined }
}

/** Parse lesson.php table rows */
function parseLessonHtml(html, lessonId) {
  const titleMatch = html.match(/<title>([^<]+)<\/title>/)
  const title = titleMatch?.[1]?.split('-')[0]?.trim() || lessonId
  const needsPayment = html.includes('尚未付费')
  const needsLogin = html.includes('尚未登陆')

  const items = []
  const rowRe =
    /<tr><th rowspan="(\d+)">(\d+)<\/th>[\s\S]*?<\/tr>\s*<tr><td>([\s\S]*?)<\/td><\/tr>/g
  let m
  while ((m = rowRe.exec(html)) !== null) {
    const index = Number(m[2])
    const cell = m[3]
    const audioKeys = [...cell.matchAll(/openSound\('([^']+)'/g)].map((x) => x[1])
    const imgMatch = cell.match(/src="\.?\/?example\/([^"]+\.jpg)"/)
    const textOnly = cell.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
    const { transliteration, hint } = parseTransliterationCell(textOnly)

    items.push({
      index,
      transliteration,
      hint,
      chinese: hint || transliteration,
      audioKeys,
      image: imgMatch?.[1],
      rawText: textOnly.slice(0, 200),
    })
  }

  const sentences = []
  const sentRe =
    /<tr><th rowspan="(\d+)">(\d+)<\/th><td>([\s\S]*?)<\/th><\/tr>\s*<tr><td>([\s\S]*?)<\/td><\/tr>/g
  while ((m = sentRe.exec(html)) !== null) {
    const index = Number(m[2])
    const imgBlock = m[3]
    const meaningRow = m[4].replace(/<[^>]+>/g, '').trim()
    const audioKeys = [...imgBlock.matchAll(/openSound\('([^']+)'/g)].map((x) => x[1])
    const imgMatch = imgBlock.match(/src="\.?\/?example\/([^"]+\.jpg)"/)
    if (meaningRow && !meaningRow.includes('文字')) {
      sentences.push({ index, meaning: meaningRow, audioKeys, image: imgMatch?.[1] })
    }
  }

  const wordRows = []
  const wordHeader = html.indexOf('<td>单词</td>')
  if (wordHeader > -1) {
    const slice = html.slice(wordHeader, wordHeader + 8000)
    const wRe = /<tr>\s*<td>([\s\S]*?)<\/td>\s*<td>([\s\S]*?)<\/td>\s*<td>([\s\S]*?)<\/td>\s*<td>([\s\S]*?)<\/td>\s*<td>([\s\S]*?)<\/td>\s*<\/tr>/g
    let first = true
    while ((m = wRe.exec(slice)) !== null) {
      const cells = m.slice(1, 6).map((c) => c.replace(/<[^>]+>/g, '').trim())
      if (first && cells[0] === '单词') {
        first = false
        continue
      }
      if (cells.some((c) => c.includes('分析') && c.includes('原形'))) continue
      wordRows.push({
        word: cells[0],
        analysis: cells[1],
        lemma: cells[2],
        meaning: cells[3],
        note: cells[4],
      })
    }
  }

  return { lessonId, title, needsLogin, needsPayment, items, sentences, wordRows }
}

function listLessonsInCategory(catId) {
  const html = fetchHtml(`${BASE}/catagory.php?id=${catId}`)
  const links = [...html.matchAll(/lesson\.php\?id=(\d+\/\d+)/g)].map((m) => m[1])
  return [...new Set(links)]
}

function toSvaraLesson(raw, catId) {
  const id = `yuapp-${raw.lessonId.replace('/', '-')}`
  const exercises = []

  for (const item of raw.items.slice(0, 12)) {
    const audioKey = item.audioKeys[0]
      ? `yuapp/${item.audioKeys[0].replace(/\//g, '_')}`
      : undefined
    exercises.push({
      id: `${id}-sound-${item.index}`,
      type: 'sound-tap',
      prompt: item.hint ? `聆听：${item.hint}` : '聆听这个音',
      subPrompt: raw.title,
      sound: {
        devanagari: item.image ? `[${item.transliteration}]` : item.transliteration,
        transliteration: item.transliteration,
        meaning: item.hint,
        speechText: item.transliteration,
        audioKey,
        image: item.image ? `yuapp/${item.image}` : undefined,
      },
    })
  }

  if (raw.items.length >= 2) {
    const target = raw.items[0]
    const audioKey = target.audioKeys[0]
      ? `yuapp/${target.audioKeys[0].replace(/\//g, '_')}`
      : undefined
    const opts = raw.items.slice(0, 4).map((i) => i.transliteration)
    while (opts.length < 4) opts.push('—')
    exercises.push({
      id: `${id}-listen-1`,
      type: 'listen-match',
      prompt: '辨认你听到的音',
      sound: {
        devanagari: target.transliteration,
        transliteration: target.transliteration,
        speechText: target.transliteration,
        audioKey,
      },
      options: [...new Set(opts)],
      correctIndex: 0,
    })
  }

  for (const sent of raw.sentences.slice(0, 3)) {
    const audioKey = sent.audioKeys[0]
      ? `yuapp/${sent.audioKeys[0].replace(/\//g, '_')}`
      : undefined
    exercises.push({
      id: `${id}-sent-${sent.index}`,
      type: 'sound-tap',
      prompt: '听诵这句话',
      subPrompt: sent.meaning,
      sound: {
        devanagari: sent.image ? `[句子 ${sent.index}]` : sent.meaning,
        transliteration: sent.meaning,
        meaning: sent.meaning,
        speechText: sent.meaning,
        audioKey,
        image: sent.image ? `yuapp/${sent.image}` : undefined,
      },
    })
  }

  if (raw.wordRows.length > 0) {
    const row = raw.wordRows[0]
    exercises.push({
      id: `${id}-meaning-1`,
      type: 'meaning-reflect',
      prompt: `「${row.word}」的含义`,
      options: [
        row.meaning,
        '无关的语法术语',
        '仅表示过去时',
        '仅用于称呼尊者',
      ],
      correctIndex: 0,
    })
  }

  return {
    id,
    unitId: `yuapp-${catId}`,
    title: raw.title,
    subtitle: CATEGORIES[catId]?.title || '唐僧梵文',
    intention: '源自授权课程 — 慢听，慢读',
    durationMinutes: Math.max(3, Math.ceil(exercises.length * 0.8)),
    xp: 15 + exercises.length * 2,
    exercises,
    source: { site: 'sanskrit.yuapp.top', lessonId: raw.lessonId, categoryId: catId },
  }
}

async function downloadAssetsForLesson(raw) {
  const assets = []
  const all = [...raw.items, ...raw.sentences]
  for (const row of all) {
    for (const key of row.audioKeys || []) {
      const safe = key.replace(/\//g, '_')
      const dest = path.join(OUT_AUDIO, `${safe}.mp3`)
      const url = audioUrl(key)
      const ok = await downloadFile(url, dest)
      if (ok) assets.push({ key, file: `yuapp/${safe}.mp3` })
    }
    if (row.image) {
      const dest = path.join(OUT_IMAGES, row.image)
      const ok = await downloadFile(`${BASE}/example/${row.image}`, dest)
      if (ok) assets.push({ image: row.image })
    }
  }
  return assets
}

async function importPublicSamples() {
  const html = fetchHtml(`${BASE}/index.php`)
  const parsed = parseLessonHtml(html, 'index-samples')
  parsed.title = '首页示范句'
  parsed.lessonId = 'index/0'
  const assets = await downloadAssetsForLesson(parsed)
  return { raw: parsed, lesson: toSvaraLesson(parsed, 2), assets }
}

async function importLesson(lessonId, catId) {
  const html = fetchHtml(`${BASE}/lesson.php?id=${lessonId}`)
  const raw = parseLessonHtml(html, lessonId)
  if (raw.needsPayment) {
    console.warn(`  ⚠ ${lessonId} 尚未购课 — 仅导入中文释义（无梵文/音频）`)
  } else if (raw.needsLogin) {
    console.warn(`  ⚠ ${lessonId} 需要登录才能看到完整内容与音频`)
  }
  const assets = await downloadAssetsForLesson(raw)
  return { raw, lesson: toSvaraLesson(raw, catId), assets }
}

async function main() {
  loadEnv()
  const opts = parseArgs()
  await fs.mkdir(OUT_DATA, { recursive: true })
  await fs.mkdir(OUT_AUDIO, { recursive: true })
  await fs.mkdir(OUT_IMAGES, { recursive: true })

  let loggedIn = false
  if (!opts.publicOnly) {
    loggedIn = login()
    if (loggedIn) console.log('✓ 已登录 yuapp')
    else console.log('○ 未配置 .env 或登录失败 — 将只导入公开/文本内容')
  }

  const manifest = {
    importedAt: new Date().toISOString(),
    baseUrl: BASE,
    loggedIn,
    paymentRequired: [],
    categories: [],
    lessons: {},
    raws: {},
  }

  if (opts.lesson) {
    const [cat] = opts.lesson.split('/').map(Number)
    const { raw, lesson, assets } = await importLesson(opts.lesson, cat || 1)
    manifest.lessons[lesson.id] = lesson
    manifest.raws[opts.lesson] = raw
    console.log(`Imported lesson ${opts.lesson}: ${lesson.exercises.length} exercises, ${assets.length} assets`)
  } else {
    const { lesson, assets } = await importPublicSamples()
    manifest.lessons[lesson.id] = lesson
    console.log(`Public samples: ${lesson.exercises.length} exercises, ${assets.length} assets`)

    const cats = opts.categories || (loggedIn ? [1, 2] : [1])
    const limit = Number(process.env.YUAPP_LESSON_LIMIT || 0) || (loggedIn ? 999 : 2)

    for (const catId of cats) {
      const meta = CATEGORIES[catId]
      if (!meta) continue
      const lessonIds = await listLessonsInCategory(catId)
      const slice = lessonIds.slice(0, limit)
      manifest.categories.push({
        id: `yuapp-${catId}`,
        ...meta,
        lessons: [],
      })

      for (const lid of slice) {
        console.log(`Importing ${lid}...`)
        const { raw, lesson, assets } = await importLesson(lid, catId)
        manifest.lessons[lesson.id] = lesson
        manifest.raws[lid] = raw
        manifest.categories
          .find((c) => c.id === `yuapp-${catId}`)
          ?.lessons.push({ id: lesson.id, title: lesson.title, subtitle: lesson.subtitle })
        if (raw.needsPayment && !manifest.paymentRequired.includes(catId))
          manifest.paymentRequired.push(catId)
        console.log(`  → ${lesson.exercises.length} exercises, ${assets.length} assets`)
      }
    }
  }

  await fs.writeFile(
    path.join(OUT_DATA, 'manifest.json'),
    JSON.stringify(manifest, null, 2),
    'utf8',
  )

  const ts = `/* AUTO-GENERATED by scripts/import-yuapp.mjs — do not edit */
import type { Lesson, PathUnit } from '../../types/lesson'

export const yuappPathUnits: PathUnit[] = ${JSON.stringify(
    manifest.categories.map((c) => ({
      id: c.id,
      title: c.title,
      symbol: c.symbol,
      description: c.description,
      lessons: c.lessons,
    })),
    null,
    2,
  )}

export const yuappLessons: Record<string, Lesson> = ${JSON.stringify(manifest.lessons, null, 2)} as Record<string, Lesson>
`
  await fs.writeFile(path.join(OUT_DATA, 'lessons.generated.ts'), ts, 'utf8')
  console.log('\n✓ Wrote src/data/yuapp/manifest.json')
  console.log('✓ Wrote src/data/yuapp/lessons.generated.ts')
  if (!loggedIn) {
    console.log('\n下一步：在项目根目录创建 .env 填入账号，再运行 npm run import:yuapp')
  }
  if (manifest.paymentRequired.length > 0) {
    console.log(
      `\n⚠ 以下分类需在网站购课后才能导入音频/字形：${manifest.paymentRequired.map((id) => CATEGORIES[id]?.title || id).join('、')}`,
    )
    console.log('  购课后访问 https://sanskrit.yuapp.top/buy.php 再运行 npm run import:yuapp')
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

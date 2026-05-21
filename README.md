# Svara — Sacred Sanskrit Sound

A meditative Sanskrit learning prototype: Duolingo-style progression meets Calm-like immersion, focused on sacred sound, mantra, and gentle practice.

## Run locally

```bash
cd sanskrit-sound
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## MVP structure

| Layer | MVP scope | Post-MVP |
|-------|-----------|----------|
| **Onboarding** | Home with intention + streak | Breath assessment, lineage preference |
| **Path** | 2 units, linear unlock | Branching paths (devotion, grammar, chant) |
| **Lessons** | 5 exercise types, 3 lessons | Spaced repetition, adaptive difficulty |
| **Chamber** | Listen-only mantra gallery | Timed sits, ambient beds, bell intervals |
| **Progress** | XP, streak, lesson completion | Soft hearts, daily intention, no harsh failure |
| **Audio** | MP3 + speech fallback | Teacher recordings, pitch feedback |

### User journey

```
Home → Today's practice (default lesson)
     → Sacred Path (unit tree, locked progression)
     → Mantra Chamber (immersive listening)
Lesson → exercises → completion screen → path or home
```

### Exercise types (Duolingo-inspired, meditative tone)

1. **sound-tap** — See Devanagari, listen twice, acknowledge (no grading anxiety)
2. **listen-match** — Hear syllable, choose transliteration
3. **meaning-reflect** — Symbolic meaning; gentle copy on “wrong” answers
4. **mantra-chant** — Syllable-by-syllable chant with rounds
5. **assemble** — Tap word bank to build phrases (So Ham, etc.)

## Tech stack

| Concern | Choice | Why |
|---------|--------|-----|
| UI | **React 19 + TypeScript** | Fast iteration, rich interactions |
| Build | **Vite 6** | Lightweight dev server and builds |
| Styling | **Tailwind CSS v4** | Minimal, cinematic tokens |
| Motion | **Framer Motion** | Calm transitions, breathing UI |
| State | **Zustand + persist** | Lesson progress without a backend |
| Audio | **HTMLAudio + Web Speech API** | Prototype now; swap in real MP3s later |
| Deploy | **Vercel / Netlify / static** | Zero server for MVP |

### Suggested production additions

- **Supabase** or **Firebase** — accounts, streak sync
- **Howler.js** or **Tone.js** — cross-browser audio layering
- **Web Audio recording** — optional pronunciation compare (post-MVP)
- **PWA** — offline mantra chamber

## Project layout

```
src/
  data/lessons.ts      # Path units + lesson content (JSON-ready)
  types/lesson.ts      # Exercise & lesson schemas
  store/progress.ts    # XP, streak, unlock logic
  hooks/useAudio.ts    # Pronunciation + chime feedback
  components/          # UI + exercise renderers
  pages/               # Home, Path, Chamber, Complete
public/audio/          # Drop om.mp3, a.mp3, etc.
```

## Adding lessons

Edit `src/data/lessons.ts`:

1. Add a lesson id under a unit in `pathUnits`
2. Define the full `Lesson` in `lessons` with `exercises[]`
3. Optional: add `public/audio/{audioKey}.mp3`

## 导入唐僧梵文课程（已授权）

1. 复制环境变量模板并填入购课账号：

```bash
cp .env.example .env
# 编辑 YUAPP_USERNAME / YUAPP_PASSWORD
```

2. 运行导入（会下载 MP3、字形图，并生成 `src/data/yuapp/lessons.generated.ts`）：

```bash
npm run import:yuapp
```

可选参数：

```bash
# 只导入首页公开示范 + 元音课目录（无需登录时的文本）
npm run import:yuapp:public

# 指定一课
node scripts/import-yuapp.mjs --lesson 2/3

# 指定分类：1=字母元音 2=初级 3=中级 4=佛经
YUAPP_CATEGORIES=1,4 npm run import:yuapp
```

登录成功后，Devanagari 图与印度人朗读会自动写入 `public/audio/yuapp/` 与 `public/images/yuapp/`。

## Adding real pronunciation audio

See `public/audio/README.md`. Recorded mantra should be consistent level, minimal reverb, and tagged by `audioKey` in lesson data.

## Design principles

- **No cartoon gamification** — gold/indigo night palette, serif Devanagari, slow motion
- **Listening before naming** — `sound-tap` requires multiple listens
- **Failure is soft** — low chimes, reflective copy, hearts optional later
- **Sacred framing** — intentions per lesson, “prāṇa” instead of “XP” in UI copy

---

Built as a lightweight prototype. Replace speech synthesis with teacher recordings before public launch.

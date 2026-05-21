# Sacred audio assets

Drop studio-recorded mantra and syllable clips here. The app looks for `{audioKey}.mp3` (see `src/data/lessons.ts`).

Recommended files for the prototype lessons:

- `om.mp3` — sustained Om, ~3–5s
- `a.mp3` — short vowel अ
- `aa.mp3` — long vowel आ

If a file is missing, pronunciation falls back to the browser speech synthesizer (Hindi voice when available).

For production, prefer recordings from a qualified Sanskrit teacher with consistent mic and room tone.

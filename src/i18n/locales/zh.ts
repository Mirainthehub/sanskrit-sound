import type { Messages } from '../types'

export const zh: Messages = {
  meta: {
    title: '梵音 Svara — 神圣梵语之声',
  },
  home: {
    brand: '梵音',
    titleLine1: '神圣',
    titleLine2: '梵音',
    tagline:
      '通过曼陀罗、呼吸与共鸣学习梵语——不是刷题，而是一条聆听、持诵、温柔觉醒的路。',
    streakLabel: '连续修习',
    xpLabel: '已得元气',
    attribution: '课程内容授权自',
    attributionLink: '唐僧梵文',
    todayPractice: '今日修习',
    walkPath: '修行之路',
    mantraChamber: '曼陀罗静室',
    langSwitch: 'EN',
  },
  path: {
    back: '← 返回',
    title: '修行之路',
    subtitle: '一步开启下一步——不必匆忙',
    locked: '🔒',
    done: '✓',
    minutes: '分钟',
  },
  chamber: {
    back: '← 返回',
    label: '曼陀罗静室',
    title: '静坐。聆听。持诵。',
    receive: '聆听曼陀罗',
    previous: '上一首',
    next: '下一首',
    mantras: [
      { meaning: '宇宙之声' },
      { meaning: '我就是那' },
      { meaning: '礼敬象头神伽尼沙' },
    ],
  },
  lesson: {
    leaveAria: '离开课程',
    pause: '暂停修习',
  },
  complete: {
    title: '修习圆满',
    xp: '元气',
    message: '让今日的声音伴你行路',
    continuePath: '继续修行之路',
    restHome: '回首页休息',
  },
  exercise: {
    playSound: '播放',
    hearAgain: '再听一次',
    playSoundMatch: '播放',
    continue: '继续',
    haveListened: '我已聆听',
    listenMore: (n: number) => `再听 ${n} 遍`,
    listenMatch: '辨认你听到的音',
    trustEar: '相信耳朵，而非头脑',
    wisdomOk: '智慧已入——轻轻携带',
    wisdomSoft: '安住于此答——万路向内',
    tapSyllables: '点击下方音节',
    notQuite: '尚未契合——向内再听，重试',
    offerAnswer: '呈上答案',
    tryAgain: '再试一次',
    chantWithMe: '与我同诵',
    nextSyllable: '下一音节',
    completeMantra: '完成曼陀罗',
    hearFullMantra: '聆听完整曼陀罗',
    round: (n: number) => `第 ${n} / 3 遍`,
  },
  units: {
    awakening: {
      title: '觉醒',
      description: '原初之音——一切曼陀罗的起点',
    },
    elements: {
      title: '元素',
      description: '元音如宇宙的门扉',
    },
  },
  coreLessons: {
    'om-origin': {
      title: 'ॐ 的起源',
      subtitle: '原初共振',
      intention: '在命名之前，先感受声音',
      exercises: {
        'om-1': {
          prompt: '触碰神圣音节',
          subPrompt: '聆听。让声音沉入胸腔。',
          meaning: '一口气里的整个宇宙',
        },
        'om-2': {
          prompt: '你听到的是哪个音？',
          subPrompt: '相信耳朵，而非头脑',
        },
        'om-3': {
          prompt: 'ॐ 象征什么？',
          subPrompt: '不必急于回答',
          options: [
            '存在之本初振动',
            '朋友间的问候',
            '仅某位神祇的名字',
            '一个数学常数',
          ],
        },
        'om-4': {
          prompt: '随录音持诵',
          subPrompt: '三次呼吸。跟上节奏。',
          mantraMeaning: '我礼敬那从未诞生的声音',
        },
      },
    },
    'vowels-breath': {
      title: '呼吸与元音',
      subtitle: '敞开的喉腔',
      intention: '在形式之前，先打开呼吸的通道',
      exercises: {
        'a-1': {
          prompt: '第一个元音',
          subPrompt: '短。开。在喉后。',
          meaning: '纯潜能——显现之前',
        },
        'a-2': { prompt: '匹配你听到的元音' },
        'a-3': {
          prompt: '拼出神圣短语',
          subPrompt: '按顺序点击每个音节',
        },
        'a-4': {
          prompt: 'So Ham — 我就是那',
          options: [
            '呼吸确认与宇宙的合一',
            '离开身体的命令',
            '仅月亮的名字',
            '商业品牌曼陀罗',
          ],
        },
      },
    },
    'a-ah': {
      title: 'A 与 Ā',
      subtitle: '创造与扩展',
      intention: '感受短音与长音的差别',
      exercises: {
        'aa-1': {
          prompt: '长元音——托在气息上',
          meaning: '扩展——宇宙敞开',
        },
        'aa-2': { prompt: '短音还是长音？' },
      },
    },
  },
}

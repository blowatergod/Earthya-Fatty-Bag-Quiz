import { QuizContent, Language } from './types';

export const BRAND_COLORS = {
  teal: '#198b81',
  orange: '#ee8021',
  white: '#ffffff',
  black: '#000000',
};

export const MASCOT_URL = "https://i.ibb.co/wFqnsQgH/Mascot-03.png";
export const LOGO_URL = "https://i.ibb.co/zT0bCT9t/Earthya-Logo-NEW-Transparent-Copy.png";

export const QUIZ_DATA: Record<Language, QuizContent> = {
  en: {
    ui: {
      startTitle: "Fatty Bag’s Mini Quiz",
      startSubtitle: "Swipe True or False to unlock 10% OFF!",
      nextBtn: "Next Question",
      resultSuccessTitle: "YUMMY! 🎉",
      resultSuccessMsg: "You know your stuff! You unlocked 10% OFF Earthya Food Waste Bin Set.",
      resultFailTitle: "OOF! 😵",
      resultFailMsg: "I'm still hungry for the right answers. Need 8/8 to unlock the reward!",
      redeemText: "Redeem at Mustard Salon",
      codeLabel: "Code:",
      retryBtn: "Feed Me Again",
      progress: "Q",
      trueBtn: "TRUE",
      falseBtn: "FALSE"
    },
    questions: [
      {
        id: 1,
        statement: "“Degradable bags disappear completely.”",
        isTrue: false,
        feedback: "❌ “Not true — degradable bags don’t disappear. They break into microplastics.”"
      },
      {
        id: 2,
        statement: "“Microplastics have been found inside human blood.”",
        isTrue: true,
        feedback: "✅ “Yes — scientists have confirmed microplastics in human blood.”"
      },
      {
        id: 3,
        statement: "“Earthya bags are certified compostable and leave no microplastics.”",
        isTrue: true,
        feedback: "✅ “Correct! Earthya breaks down naturally with zero microplastics.”"
      },
      {
        id: 4,
        statement: "“Malaysians eat around 5 grams of microplastics every week.”",
        isTrue: true,
        feedback: "😬 “True — about 5g weekly, roughly the size of a credit card.”"
      },
      {
        id: 5,
        statement: "“Words like ‘eco’ or ‘green’ without proof is greenwashing.”",
        isTrue: true,
        feedback: "🔥 “Exactly — always check for real certifications, not slogans.”"
      },
      {
        id: 6,
        statement: "“Degradable bags help reduce plastic in landfills.”",
        isTrue: false,
        feedback: "❌ “Nope — they just break into microplastics and stay in landfills.”"
      },
      {
        id: 7,
        statement: "“Microplastics have been found in bottled drinking water.”",
        isTrue: true,
        feedback: "🌱 “True — many studies found microplastics inside bottled water worldwide.”"
      },
      {
        id: 8,
        statement: "“Earthya bags turn into natural compost after decomposing.”",
        isTrue: true,
        feedback: "🌿 “Yes — Earthya becomes natural compost, not microplastics.”"
      }
    ],
  },
  zh: {
    ui: {
      startTitle: "肥袋的小测验",
      startSubtitle: "左滑错，右滑对！答对解锁 10% 折扣！",
      nextBtn: "下一题",
      resultSuccessTitle: "太棒了！🎉",
      resultSuccessMsg: "您已解锁 Earthya 食物厨余桶套装 10% 折扣。",
      resultFailTitle: "哎呀！😵",
      resultFailMsg: "我还饿着呢！需要答对 8/8 才能解锁奖励。再试一次吧！",
      redeemText: "请在 Mustard Salon 兑换",
      codeLabel: "优惠码：",
      retryBtn: "再喂我一次",
      progress: "题",
      trueBtn: "对",
      falseBtn: "错"
    },
    questions: [
      {
        id: 1,
        statement: "“可降解塑料袋会完全消失。”",
        isTrue: false,
        feedback: "❌ “不会的～可降解只是碎成微塑料而已。”"
      },
      {
        id: 2,
        statement: "“微塑料已经在人类血液里被发现了。”",
        isTrue: true,
        feedback: "✅ “真的！科学研究已经证实微塑料在血液中出现。”"
      },
      {
        id: 3,
        statement: "“Earthya 袋子通过堆肥认证，不会留下微塑料。”",
        isTrue: true,
        feedback: "🌱 “对！Earthya 分解后不会留下任何微塑料。”"
      },
      {
        id: 4,
        statement: "“大马人每周大约吃进 5 克微塑料。”",
        isTrue: true,
        feedback: "😬 “没错，大概是 1 张信用卡的重量。”"
      },
      {
        id: 5,
        statement: "“没有证明就说自己‘环保’，这是漂绿。”",
        isTrue: true,
        feedback: "🔥 “对！没有认证就说环保，就是漂绿。”"
      },
      {
        id: 6,
        statement: "“可降解塑料袋能减少垃圾场的塑料量。”",
        isTrue: false,
        feedback: "❌ “不行啦～它们只是变成微塑料继续留在垃圾场。”"
      },
      {
        id: 7,
        statement: "“瓶装饮用水里已经发现微塑料。”",
        isTrue: true,
        feedback: "🌱 “没错！全球很多瓶装水品牌都被检测出含有微塑料。”"
      },
      {
        id: 8,
        statement: "“Earthya 堆肥后会变成天然堆肥。”",
        isTrue: true,
        feedback: "🌿 “对！Earthya 最后会变成天然堆肥。”"
      }
    ],
  },
  bm: {
    ui: {
      startTitle: "Kuiz Mini Fatty Bag",
      startSubtitle: "Swipe Betul/Salah untuk diskaun 10%!",
      nextBtn: "Soalan Seterusnya",
      resultSuccessTitle: "SEDAPNYA! 🎉",
      resultSuccessMsg: "Anda memang hebat! 10% DISKAUN untuk Set Tong Sisa Makanan Earthya kini milik anda.",
      resultFailTitle: "ALAMAK! 😵",
      resultFailMsg: "Saya masih lapar jawapan yang betul. Perlu 8/8 untuk ganjaran!",
      redeemText: "Tebus di Mustard Salon",
      codeLabel: "Kod:",
      retryBtn: "Bagi Makan Lagi",
      progress: "Soalan",
      trueBtn: "BETUL",
      falseBtn: "SALAH"
    },
    questions: [
      {
        id: 1,
        statement: "“Beg plastik degradable akan hilang sepenuhnya.”",
        isTrue: false,
        feedback: "❌ “Tak hilang — cuma pecah jadi mikroplastik.”"
      },
      {
        id: 2,
        statement: "“Mikroplastik telah ditemui dalam darah manusia.”",
        isTrue: true,
        feedback: "✅ “Ya, kajian sahkan mikroplastik ada dalam darah manusia.”"
      },
      {
        id: 3,
        statement: "“Beg Earthya boleh kompos dan tidak tinggalkan mikroplastik.”",
        isTrue: true,
        feedback: "🌱 “Betul! Earthya terurai tanpa mikroplastik.”"
      },
      {
        id: 4,
        statement: "“Rakyat Malaysia termakan 5 gram mikroplastik setiap minggu.”",
        isTrue: true,
        feedback: "😬 “Ya — lebih kurang sebesar kad kredit.”"
      },
      {
        id: 5,
        statement: "“Claim ‘eco’ tanpa bukti ialah greenwashing.”",
        isTrue: true,
        feedback: "🔥 “Tepat! Kena ada bukti atau sijil.”"
      },
      {
        id: 6,
        statement: "“Beg degradable kurangkan plastik di tapak pelupusan.”",
        isTrue: false,
        feedback: "❌ “Sebenarnya tidak — ia hanya bertukar jadi mikroplastik.”"
      },
      {
        id: 7,
        statement: "“Mikroplastik telah ditemui dalam air minuman botol.”",
        isTrue: true,
        feedback: "🌱 “Ya — banyak jenama air botol didapati mengandungi mikroplastik.”"
      },
      {
        id: 8,
        statement: "“Beg Earthya akan jadi kompos semula jadi selepas terurai.”",
        isTrue: true,
        feedback: "🌿 “Ya, Earthya menjadi kompos semula jadi.”"
      }
    ],
  },
};
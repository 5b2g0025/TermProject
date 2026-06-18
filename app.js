// ==========================================
// 1. MOCK DATA & CONSTANTS (模擬資料與常數)
// ==========================================

// 預設發文者身分 (免登入，打開網頁直接以此身分進行互動)
const DEFAULT_USER = {
  username: "Aura User",
  handle: "@aura_explorer",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
};

let currentUser = DEFAULT_USER;

const PRESET_AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
];
let selectedRegisterAvatar = PRESET_AVATARS[0];

// 初始預設的動態牆貼文資料（豐富版：多位創作者）
let posts = [
  {
    id: "post-1",
    authorName: "極簡美學家",
    authorHandle: "@minimal_design",
    authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120",
    content: "今天嘗試將工作空間進行了極簡化改造。只留下必備的物品，讓大腦擁有更多呼吸的空間。你也是極簡主義的愛好者嗎？✨ #Design #Workspace #Minimalism",
    image: "https://images.unsplash.com/photo-1499955085172-a104c9463ece?w=800",
    timestamp: new Date(Date.now() - 3600000 * 1).toISOString(),
    likes: 142,
    isLiked: false,
    isBookmarked: false,
    comments: [
      { id: "c-1", authorName: "小明", content: "這個桌面太乾淨了！看了心情很好。" },
      { id: "c-2", authorName: "創意總監", content: "留白的力量真的很神奇。" }
    ],
    tags: ["Design", "Workspace", "Minimalism"]
  },
  {
    id: "post-2",
    authorName: "程式碼藝術家",
    authorHandle: "@code_art",
    authorAvatar: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=120",
    content: "寫程式就像是在畫布上編織邏輯之美。這款全新的玻璃擬態（Glassmorphism）介面真的讓人愛不釋手！用 CSS backdrop-filter 做出來的效果簡直驚艷 🖥️ #Coding #WebDev #UIUX",
    image: null,
    timestamp: new Date(Date.now() - 3600000 * 3).toISOString(),
    likes: 87,
    isLiked: false,
    isBookmarked: false,
    comments: [
      { id: "c-3", authorName: "前端工程師小莉", content: "backdrop-filter 真的超好用！但要注意瀏覽器相容性。" }
    ],
    tags: ["Coding", "WebDev", "UIUX"]
  },
  {
    id: "post-3",
    authorName: "旅行光影誌",
    authorHandle: "@travel_lens",
    authorAvatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=120",
    content: "京都秋日限定，楓葉染紅了整片天空 🍁 每一幀都是大自然最精心的構圖。生命中總要有幾次說走就走的旅行，你上次是什麼時候？ #Travel #Kyoto #Photography",
    image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800",
    timestamp: new Date(Date.now() - 3600000 * 6).toISOString(),
    likes: 318,
    isLiked: false,
    isBookmarked: false,
    comments: [
      { id: "c-4", authorName: "背包客阿偉", content: "楓葉季節真的太美！下次一定要去！" },
      { id: "c-5", authorName: "攝影迷", content: "這構圖和光線太完美了，用什麼相機？" }
    ],
    tags: ["Travel", "Kyoto", "Photography"]
  },
  {
    id: "post-4",
    authorName: "咖啡生活美學",
    authorHandle: "@coffee_life",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120",
    content: "今天嘗試了手沖咖啡的新配方 ☕ 衣索比亞耶加雪菲，花香調性讓人心曠神怡。好的咖啡不只是提神，更是一種對自己的溫柔儀式。 #Coffee #Lifestyle #Brewing",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800",
    timestamp: new Date(Date.now() - 3600000 * 8).toISOString(),
    likes: 203,
    isLiked: false,
    isBookmarked: false,
    comments: [
      { id: "c-6", authorName: "咖啡新手", content: "手沖咖啡要怎麼入門？可以推薦器具嗎？" }
    ],
    tags: ["Coffee", "Lifestyle", "Brewing"]
  },
  {
    id: "post-5",
    authorName: "健身訓練日誌",
    authorHandle: "@fit_diary",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120",
    content: "連續健身 90 天！💪 從一開始舉不起 20 公斤，到現在能深蹲 100 公斤。改變的不只是身體，更是對自己的信念。堅持就是最強的能力。 #Fitness #GymLife #Motivation",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800",
    timestamp: new Date(Date.now() - 3600000 * 12).toISOString(),
    likes: 456,
    isLiked: false,
    isBookmarked: false,
    comments: [
      { id: "c-7", authorName: "跑步愛好者", content: "超勵志！請問飲食怎麼控制的？" },
      { id: "c-8", authorName: "健身新手", content: "真的很厲害！能分享訓練計畫嗎？" }
    ],
    tags: ["Fitness", "GymLife", "Motivation"]
  },
  {
    id: "post-6",
    authorName: "植物慢活系",
    authorHandle: "@plant_slow",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120",
    content: "窗邊的龜背芋又長出新葉了 🌿 養植物就像是養一種耐心。它用自己的節奏生長，提醒著我慢下來感受當下。你家有養什麼植物呢？ #Plants #SlowLiving #HomeDecor",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800",
    timestamp: new Date(Date.now() - 3600000 * 15).toISOString(),
    likes: 167,
    isLiked: false,
    isBookmarked: false,
    comments: [
      { id: "c-9", authorName: "多肉控", content: "龜背芋真的超好養！是室內植物首選！" }
    ],
    tags: ["Plants", "SlowLiving", "HomeDecor"]
  },
  {
    id: "post-7",
    authorName: "美食探店家",
    authorHandle: "@foodie_taipei",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120",
    content: "大安區新開的日式拉麵店，湯頭濃郁層次驚人 🍜 一碗入魂！叉燒軟嫩到入口即化，筍乾的脆感完美平衡。排了 40 分鐘值得！附上地址在留言 👇 #Food #Ramen #Taipei",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800",
    timestamp: new Date(Date.now() - 3600000 * 20).toISOString(),
    likes: 289,
    isLiked: false,
    isBookmarked: false,
    comments: [
      { id: "c-10", authorName: "拉麵控", content: "這看起來超好吃！請問地址在哪？！" },
      { id: "c-11", authorName: "台北吃貨", content: "大安區的嗎？週末就去！" }
    ],
    tags: ["Food", "Ramen", "Taipei"]
  },
  {
    id: "post-8",
    authorName: "閱讀靈感庫",
    authorHandle: "@bookworm_tw",
    authorAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120",
    content: "最近讀完《被討厭的勇氣》第三遍 📚 每次閱讀都有不同的體悟。「所謂的自由，就是被別人討厭。」這句話第一次看以為很偏激，現在卻覺得無比釋放。你有沒有反覆重讀的書？ #Books #Reading #Psychology",
    image: null,
    timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
    likes: 134,
    isLiked: false,
    isBookmarked: false,
    comments: [
      { id: "c-12", authorName: "哲學愛好者", content: "阿德勒心理學真的顛覆了我對人際關係的看法！" }
    ],
    tags: ["Books", "Reading", "Psychology"]
  },
  {
    id: "post-9",
    authorName: "街頭攝影師",
    authorHandle: "@street_photo",
    authorAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120",
    content: "在雨後的信義區按下快門，路燈的倒影映在積水上，城市有了另一種詩意 🌧️ 攝影讓我看到了日常的美麗，原來每個角落都是故事。 #Photography #Street #Taipei",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800",
    timestamp: new Date(Date.now() - 3600000 * 30).toISOString(),
    likes: 521,
    isLiked: false,
    isBookmarked: false,
    comments: [
      { id: "c-13", authorName: "底片攝影師", content: "構圖和光影處理得太好了！" },
      { id: "c-14", authorName: "城市漫遊者", content: "信義區雨後真的超美的，你的眼睛很厲害！" }
    ],
    tags: ["Photography", "Street", "Taipei"]
  },
  {
    id: "post-10",
    authorName: "音樂創作人",
    authorHandle: "@music_maker",
    authorAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120",
    content: "剛完成了新曲的 demo 錄製 🎵 這首歌寫了三個月，源自去年冬天一段說不清楚的心情。音樂是最誠實的語言，它說出了文字無法表達的一切。敬請期待正式發行！ #Music #Indie #Songwriting",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800",
    timestamp: new Date(Date.now() - 3600000 * 36).toISOString(),
    likes: 198,
    isLiked: false,
    isBookmarked: false,
    comments: [
      { id: "c-15", authorName: "音樂迷", content: "等不及要聽！上首歌也超喜歡的！" }
    ],
    tags: ["Music", "Indie", "Songwriting"]
  },
  {
    id: "post-11",
    authorName: "永續生活家",
    authorHandle: "@eco_living",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120",
    content: "本週的零廢棄挑戰：完全不用一次性塑膠袋 🌍 準備了布袋、玻璃罐和可重複使用容器出門採買。其實改變比想像中容易，一個小習慣就能減少大量垃圾。一起加入吧！ #Sustainability #ZeroWaste #GreenLife",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800",
    timestamp: new Date(Date.now() - 3600000 * 48).toISOString(),
    likes: 267,
    isLiked: false,
    isBookmarked: false,
    comments: [
      { id: "c-16", authorName: "環保達人", content: "超支持這個行動！布袋是最基本的第一步！" },
      { id: "c-17", authorName: "新手環保人", content: "我也想試試看！有什麼入門建議嗎？" }
    ],
    tags: ["Sustainability", "ZeroWaste", "GreenLife"]
  },
  {
    id: "post-12",
    authorName: "UI設計研究室",
    authorHandle: "@ui_lab",
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120",
    content: "今天分享一個 UI 設計技巧：適當的白空間（White Space）能讓頁面呼吸感更好，引導使用者視線自然流動 🎨 很多設計師在初期都犯了「塞滿」的錯誤。少即是多，永恆法則。 #UIDesign #DesignTips #UIUX",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800",
    timestamp: new Date(Date.now() - 3600000 * 52).toISOString(),
    likes: 344,
    isLiked: false,
    isBookmarked: false,
    comments: [
      { id: "c-18", authorName: "設計系學生", content: "這對我超有幫助！我的作品一直被說太擁擠。" }
    ],
    tags: ["UIDesign", "DesignTips", "UIUX"]
  }
  ,
  {
    id: "post-13",
    authorName: "城市漫遊者",
    authorHandle: "@urban_walker",
    authorAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120",
    content: "清晨巷弄裡的咖啡香最療癒。今天發現一間小書店隱身在轉角，推薦給喜歡慢步調的人。#CityWalk #HiddenGems",
    image: null,
    timestamp: new Date(Date.now() - 3600000 * 10).toISOString(),
    likes: 58,
    isLiked: false,
    isBookmarked: false,
    comments: [],
    tags: ["City", "Coffee", "Books"]
  },
  {
    id: "post-14",
    authorName: "科技漫談",
    authorHandle: "@tech_talks",
    authorAvatar: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=120",
    content: "簡短分享：現代前端框架的趨勢與取捨，性能與開發速度之間如何找到平衡？歡迎討論。#WebDev #Frontend",
    image: null,
    timestamp: new Date(Date.now() - 3600000 * 22).toISOString(),
    likes: 76,
    isLiked: false,
    isBookmarked: false,
    comments: [],
    tags: ["Tech", "Frontend"]
  },
  {
    id: "post-15",
    authorName: "手作生活",
    authorHandle: "@handmade_life",
    authorAvatar: "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?w=120",
    content: "今天天氣適合做陶土，一邊放著輕柔的音樂，一邊捏出心情的形狀。手作讓人回到身體的節奏。#Crafts #Pottery",
    image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800",
    timestamp: new Date(Date.now() - 3600000 * 28).toISOString(),
    likes: 121,
    isLiked: false,
    isBookmarked: false,
    comments: [],
    tags: ["Crafts", "Pottery"]
  },
  {
    id: "post-16",
    authorName: "電影筆記",
    authorHandle: "@film_notes",
    authorAvatar: "https://images.unsplash.com/photo-1502136969935-8d6f0d2a8e27?w=120",
    content: "剛看完一部獨立電影，畫面與配樂都讓人難忘，推薦大家找時間觀賞並與朋友討論感受。#Film #Indie",
    image: null,
    timestamp: new Date(Date.now() - 3600000 * 34).toISOString(),
    likes: 49,
    isLiked: false,
    isBookmarked: false,
    comments: [],
    tags: ["Film", "Indie"]
  },
  {
    id: "post-17",
    authorName: "週末登山隊",
    authorHandle: "@weekend_hike",
    authorAvatar: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=120",
    content: "山頂的雲海讓人忘卻一週的疲憊，照片是今天清晨的日出。記得出門要帶足水與防曬！#Hiking #Nature",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
    timestamp: new Date(Date.now() - 3600000 * 40).toISOString(),
    likes: 210,
    isLiked: false,
    isBookmarked: false,
    comments: [],
    tags: ["Hiking", "Nature"]
  }
  ,
  {
    id: "post-18",
    authorName: "素食廚房",
    authorHandle: "@veggie_kitchen",
    authorAvatar: "https://images.unsplash.com/photo-1523986371872-9d3ba2e2f642?w=120",
    content: "嘗試了新款鷹嘴豆泥佐烤蔬菜，簡單又營養，適合夏天料理分享。#Vegan #Recipe",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
    likes: 132,
    isLiked: false,
    isBookmarked: false,
    comments: [],
    tags: ["Food", "Vegan"]
  },
  {
    id: "post-19",
    authorName: "手帳控",
    authorHandle: "@planner_lover",
    authorAvatar: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=120",
    content: "分享本月手帳佈置靈感：極簡線條與淡色貼紙，提升每天打開手帳的愉悅。#Planner #Stationery",
    image: null,
    timestamp: new Date(Date.now() - 3600000 * 14).toISOString(),
    likes: 67,
    isLiked: false,
    isBookmarked: false,
    comments: [],
    tags: ["Planner", "Lifestyle"]
  },
  {
    id: "post-20",
    authorName: "語音工程師",
    authorHandle: "@speech_ai",
    authorAvatar: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=120",
    content: "今天實驗了新的語音轉文字模型，對於口音的容錯性有明顯改善。期待能在實務中部署。#AI #SpeechTech",
    image: null,
    timestamp: new Date(Date.now() - 3600000 * 26).toISOString(),
    likes: 89,
    isLiked: false,
    isBookmarked: false,
    comments: [],
    tags: ["AI", "Speech"]
  },
  {
    id: "post-21",
    authorName: "小小書評",
    authorHandle: "@mini_bookreview",
    authorAvatar: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=120",
    content: "如果你喜歡慢節奏的記敘，推薦《小鎮故事》—文字溫柔，結局帶點餘韻。#Books #Review",
    image: null,
    timestamp: new Date(Date.now() - 3600000 * 33).toISOString(),
    likes: 54,
    isLiked: false,
    isBookmarked: false,
    comments: [],
    tags: ["Books", "Review"]
  },
  {
    id: "post-22",
    authorName: "園藝新手",
    authorHandle: "@garden_beginner",
    authorAvatar: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=120",
    content: "剛種下幾株香草，趁週末澆水並觀察成長，期待日後能用自家香草入菜。#Gardening #Herbs",
    image: null,
    timestamp: new Date(Date.now() - 3600000 * 44).toISOString(),
    likes: 38,
    isLiked: false,
    isBookmarked: false,
    comments: [],
    tags: ["Gardening", "Home"]
  },
  {
    id: "post-23",
    authorName: "設計師日常",
    authorHandle: "@designer_daily",
    authorAvatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120",
    content: "討論：如何在 deadline 前保持創意不被壓垮？分享一些小技巧與心態調整。#Design #WorkLife",
    image: null,
    timestamp: new Date(Date.now() - 3600000 * 60).toISOString(),
    likes: 95,
    isLiked: false,
    isBookmarked: false,
    comments: [],
    tags: ["Design", "Productivity"]
  },
  {
    id: "post-24",
    authorName: "早餐魂",
    authorHandle: "@breakfast_spirit",
    authorAvatar: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=120",
    content: "一道快速營養早餐：燕麥優格杯，加上水果與堅果，能量滿滿開啟一天！#Breakfast #Healthy",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    timestamp: new Date(Date.now() - 3600000 * 72).toISOString(),
    likes: 176,
    isLiked: false,
    isBookmarked: false,
    comments: [],
    tags: ["Food", "Breakfast"]
  }
];

// 表情符號分類資料
const EMOJI_CATEGORIES = [
  {
    name: "笑臉",
    icon: "😀",
    emojis: ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🤩", "🥳", "😏"]
  },
  {
    name: "情緒",
    icon: "😢",
    emojis: ["😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬", "🤯", "😳", "🥵", "🥶", "😱", "😨", "😰", "😥", "😓", "🤗", "🤔", "🤭", "🤫", "🤥"]
  },
  {
    name: "手勢",
    icon: "👋",
    emojis: ["👋", "🤚", "🖐️", "✋", "🖖", "👌", "🤌", "🤏", "✌️", "🤞", "🤟", "🤘", "🤙", "👈", "👉", "👆", "🖕", "👇", "☝️", "👍", "👎", "✊", "👊", "🤛", "🤜", "👏", "🙌", "👐", "🤲", "🙏", "✍️", "💅"]
  },
  {
    name: "愛心",
    icon: "❤️",
    emojis: ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔", "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "💟", "☮️", "✝️", "☯️", "🕊️", "🌹", "💐", "🌸", "💮", "🌺", "🌻", "🌼", "🌷", "🥀"]
  },
  {
    name: "動物",
    icon: "🐶",
    emojis: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐸", "🐵", "🙈", "🙉", "🙊", "🐒", "🦆", "🐥", "🦅", "🦉", "🦇", "🐺", "🐗", "🐴", "🦄", "🐝", "🐛", "🦋", "🐌"]
  },
  {
    name: "食物",
    icon: "🍕",
    emojis: ["🍕", "🍔", "🍟", "🌭", "🌮", "🌯", "🥗", "🍜", "🍝", "🍛", "🍣", "🍱", "🍤", "🍙", "🍚", "🍘", "🍥", "🥟", "🥠", "🥡", "🦀", "🦞", "🦐", "🦑", "🍦", "🍧", "🍨", "🍩", "🍪", "🎂", "🍰", "🧁"]
  },
  {
    name: "活動",
    icon: "⚽",
    emojis: ["⚽", "🏀", "🏈", "⚾", "🥎", "🎾", "🏐", "🏉", "🥏", "🎱", "🏓", "🏸", "🏒", "🥅", "⛳", "🏹", "🎣", "🤿", "🥊", "🥋", "🎽", "🛹", "🛷", "⛸️", "🥌", "🎿", "⛷️", "🏂", "🪂", "🏋️", "🤼", "🤺"]
  },
  {
    name: "物件",
    icon: "💎",
    emojis: ["💎", "💍", "👑", "🎭", "🎨", "🖌️", "🎬", "🎤", "🎧", "🎼", "🎹", "🥁", "🎷", "🎺", "🎸", "🪕", "🎻", "🎲", "♟️", "🎯", "🎳", "🎮", "🎰", "🧩", "🪆", "🪅", "🪄", "🎪", "🤹", "🎠", "🎡", "🎢"]
  }
];

// 推薦追蹤用戶資料
const RECOMMENDED_USERS = [
  {
    name: "UIUX 靈感庫",
    handle: "@uiux_daily",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
    bio: "每日分享設計靈感與趨勢",
    followers: "12.4k"
  },
  {
    name: "美感攝影集",
    handle: "@photo_poem",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100",
    bio: "用鏡頭記錄城市的詩",
    followers: "8.7k"
  },
  {
    name: "科技前線報",
    handle: "@tech_frontier",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100",
    bio: "最新 AI 與科技動態",
    followers: "24.1k"
  },
  {
    name: "生活選品所",
    handle: "@lifestyle_picks",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100",
    bio: "質感生活好物推薦",
    followers: "6.2k"
  },
  {
    name: "創業者日常",
    handle: "@startup_daily",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    bio: "分享創業路上的所有心得",
    followers: "15.8k"
  }
];

// 系統狀態控制變數
let currentFilterTag = null;
let currentSortMethod = 'latest'; // 'latest' | 'popular'
let currentMenuTab = 'feed'; // 'feed' | 'bookmarks' | 'about'
let selectedPostImageUrl = null;
let currentPostTags = [];

// ==========================================
// 2. DOM ELEMENTS (DOM 元件綁定)
// ==========================================
const elements = {
  // 串流與側邊容器
  postsFeed: document.getElementById('posts-feed'),
  hotTagsCloud: document.getElementById('hot-tags-cloud'),
  recommendationsList: document.getElementById('recommendations-list'),

  // 計數看板
  profilePostsCount: document.getElementById('stats-posts-count'),
  profileLikesCount: document.getElementById('stats-likes-count'),
  profileBookmarksCount: document.getElementById('stats-bookmarks-count'),
  totalPlatformPosts: document.getElementById('total-platform-posts'),
  totalPlatformLikes: document.getElementById('total-platform-likes'),

  // 主選單按鈕
  menuFeed: document.getElementById('menu-feed'),
  menuBookmarks: document.getElementById('menu-bookmarks'),
  menuAbout: document.getElementById('menu-about'),

  // 搜尋與頂部過濾列
  searchInput: document.getElementById('search-input'),
  tabLatest: document.getElementById('tab-latest'),
  tabPopular: document.getElementById('tab-popular'),
  feedTitle: document.getElementById('feed-title'),
  feedSubtitle: document.getElementById('feed-subtitle'),
  activeFilterBadge: document.getElementById('active-filter-badge'),
  activeFilterText: document.getElementById('active-filter-text'),
  btnClearFilter: document.getElementById('btn-clear-filter'),

  // 發文表單元件
  createPostArea: document.getElementById('create-post-area'),
  postInputText: document.getElementById('post-input-text'),
  btnPublishPost: document.getElementById('btn-publish-post'),
  inputAddTag: document.getElementById('input-add-tag'),
  postTagsInputContainer: document.getElementById('post-tags-input-container'),

  // 圖片附檔視窗
  btnTriggerImagePopup: document.getElementById('btn-trigger-image-popup'),
  imageUrlPopup: document.getElementById('image-url-popup'),
  btnCloseUrlPopup: document.getElementById('btn-close-url-popup'),
  inputImageUrl: document.getElementById('input-image-url'),
  btnConfirmImageUrl: document.getElementById('btn-confirm-image-url'),
  randomPresetGrid: document.getElementById('random-preset-grid'),
  imagePreviewBox: document.getElementById('image-preview-box'),
  imagePreviewImg: document.getElementById('image-preview-img'),
  btnRemoveImagePreview: document.getElementById('btn-remove-image-preview'),

  // 表情符號視窗
  btnTriggerEmojiPopup: document.getElementById('btn-trigger-emoji-popup'),
  emojiPickerPopup: document.getElementById('emoji-picker-popup'),
  emojiGrid: document.getElementById('emoji-grid'),
  btnCloseEmojiPopup: document.getElementById('btn-close-emoji-popup'),

  // 外觀模式與提示
  btnThemeToggle: document.getElementById('btn-theme-toggle'),
  themeIcon: document.getElementById('theme-icon'),
  toastContainer: document.getElementById('toast-container'),

  // 會員認證元件
  authModal: document.getElementById('auth-modal'),
  menuAuth: document.getElementById('menu-auth'),
  menuAuthText: document.getElementById('menu-auth-text'),
  btnCloseAuth: document.getElementById('btn-close-auth'),
  btnEditAvatar: document.getElementById('btn-edit-avatar'),
  profileEditModal: document.getElementById('profile-edit-modal'),
  btnCloseProfileEdit: document.getElementById('btn-close-profile-edit'),
  btnCancelProfileEdit: document.getElementById('btn-cancel-profile-edit'),
  btnSaveProfileEdit: document.getElementById('btn-save-profile-edit'),
  inputEditUsername: document.getElementById('input-edit-username'),
  inputEditHandle: document.getElementById('input-edit-handle'),
  editAvatarSelection: document.getElementById('edit-avatar-selection'),
  editAvatarUpload: document.getElementById('edit-avatar-upload'),
  editCustomAvatarPreview: document.getElementById('edit-custom-avatar-preview'),
  editUploadPlusIcon: document.getElementById('edit-upload-plus-icon'),
  profileEditAvatarPreview: document.getElementById('profile-edit-avatar-preview'),
  profileColorOptions: document.getElementById('profile-color-options'),
  authorModal: document.getElementById('author-modal'),
  btnCloseAuthorModal: document.getElementById('btn-close-author-modal'),
  authorModalBody: document.getElementById('author-modal-body'),
  authorModalTitle: document.getElementById('author-modal-title'),
  statsFollowingCard: document.getElementById('stats-following-card'),
  followingModal: document.getElementById('following-modal'),
  btnCloseFollowingModal: document.getElementById('btn-close-following-modal'),
  followingModalBody: document.getElementById('following-modal-body'),
  loginRequiredModal: document.getElementById('login-required-modal'),
  
  btnCloseLoginRequired: document.getElementById('btn-close-login-required'),
  btnLoginRequiredCancel: document.getElementById('btn-login-required-cancel'),
  btnOpenAuthFromLoginRequired: document.getElementById('btn-open-auth-from-login-required'),
  tabLoginBtn: document.getElementById('tab-login-btn'),
  tabRegisterBtn: document.getElementById('tab-register-btn'),
  loginForm: document.getElementById('login-form'),
  registerForm: document.getElementById('register-form'),
  loginEmail: document.getElementById('login-email'),
  loginPassword: document.getElementById('login-password'),
  registerUsername: document.getElementById('register-username'),
  registerHandle: document.getElementById('register-handle'),
  registerEmail: document.getElementById('register-email'),
  registerPassword: document.getElementById('register-password'),
  registerHandleError: document.getElementById('register-handle-error'),
  registerEmailError: document.getElementById('register-email-error'),
  regAvatarGrid: document.getElementById('reg-avatar-grid'),
  btnLoginGoogle: document.getElementById('btn-login-google'),
  btnLoginFacebook: document.getElementById('btn-login-facebook'),
  socialLoginSection: document.getElementById('social-login-section'),
  profileAvatarImg: document.getElementById('profile-avatar-img'),
  profileDisplayName: document.getElementById('profile-display-name'),
  profileDisplayHandle: document.getElementById('profile-display-handle'),
  postCreatorAvatar: document.getElementById('post-creator-avatar')
};

  // 全域小型浮動 popup 控制輔助函式（含 ARIA 與 focus 管理）
  function openPopup(popupEl, focusEl) {
    if (!popupEl) return;
    popupEl.style.display = 'block';
    popupEl.setAttribute('aria-hidden', 'false');
    setTimeout(() => {
      try {
        const target = focusEl || popupEl.querySelector('input, button, [tabindex]:not([tabindex="-1"])');
        if (target) target.focus();
      } catch (e) {}
    }, 10);
  }

  function closePopup(popupEl) {
    if (!popupEl) return;
    popupEl.style.display = 'none';
    popupEl.setAttribute('aria-hidden', 'true');
  }

// ==========================================
// 3. INITIALIZATION (初始化啟動)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initEventListeners();
  initPresets();
  loadSavedPosts();
  ensureManyPosts();
  renderApp();
  updateAuthUI();

  const loggedInUser = localStorage.getItem('aurawall_logged_in_user');
  if (loggedInUser) {
    const user = JSON.parse(loggedInUser);
    showToast(`歡迎回來，${user.username}！AuraWall 已成功解鎖。`);
  } else {
    showToast("歡迎回來！AuraWall 已成功解鎖，免登入直接探索。");
  }
});

// 外觀主題設定初始化
function initTheme() {
  const savedTheme = localStorage.getItem('aurawall-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  if (elements.themeIcon) {
    elements.themeIcon.className = savedTheme === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }
  // 還原色帶顏色
  const savedColor = localStorage.getItem('aurawall_accent_color');
  if (savedColor) {
    setTimeout(() => applyAccentColor(savedColor), 0);
  }
}

// 如果貼文數不多，複製現有貼文直到至少有 20 筆，讓開啟頁面時能看到很多創作者貼文
function ensureManyPosts() {
  const target = 20;
  let i = 0;
  while (posts.length < target) {
    const idx = posts.length + 1;
    const newPost = {
      id: `autogen-${Date.now()}-${idx}`,
      authorName: `社群用戶 ${idx}`,
      authorHandle: `@autogen_${idx}`,
      authorAvatar: PRESET_AVATARS[idx % PRESET_AVATARS.length],
      content: `自動生成貼文 #${idx}：這是一則用於展示動態牆的範例內容。`,
      image: null,
      timestamp: new Date(Date.now() - idx * 3600000).toISOString(),
      likes: Math.floor(Math.random() * 300),
      isLiked: false,
      isBookmarked: false,
      comments: [],
      tags: []
    };
    posts.push(newPost);
    i++;
    if (i > 200) break;
  }
}

function loadSavedPosts() {
  const saved = localStorage.getItem('aurawall_posts');
  if (!saved) return;
  try {
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed) && parsed.length > 0) {
      posts = parsed;
    }
  } catch (e) {
    console.warn('載入本地貼文資料失敗', e);
  }
}

function persistPosts() {
  localStorage.setItem('aurawall_posts', JSON.stringify(posts));
}

// 預載表情符號（含分類）
function initPresets() {
  // 初始化表情符號選擇器（含分類標籤）
  const emojiPickerPopup = document.getElementById('emoji-picker-popup');
  const emojiGrid = document.getElementById('emoji-grid');
  const emojiCategoryTabs = document.getElementById('emoji-category-tabs');

  if (emojiGrid && emojiCategoryTabs) {
    let currentCategoryIndex = 0;

    function renderEmojiCategory(index) {
      const cat = EMOJI_CATEGORIES[index];
      emojiGrid.innerHTML = '';
      cat.emojis.forEach(emoji => {
        const span = document.createElement('span');
        span.className = 'emoji-item';
        span.textContent = emoji;
        span.addEventListener('click', () => {
          const textarea = document.getElementById('post-input-text');
          if (textarea) {
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const text = textarea.value;
            textarea.value = text.slice(0, start) + emoji + text.slice(end);
            textarea.selectionStart = textarea.selectionEnd = start + emoji.length;
            textarea.focus();
          }
          if (emojiPickerPopup) closePopup(emojiPickerPopup);
        });
        emojiGrid.appendChild(span);
      });

      // 更新 tab active 狀態
      emojiCategoryTabs.querySelectorAll('.emoji-cat-tab').forEach((tab, i) => {
        tab.classList.toggle('active', i === index);
      });
    }

    // 建立分類標籤
    emojiCategoryTabs.innerHTML = '';
    EMOJI_CATEGORIES.forEach((cat, index) => {
      const tab = document.createElement('button');
      tab.className = 'emoji-cat-tab' + (index === 0 ? ' active' : '');
      tab.textContent = cat.icon;
      tab.title = cat.name;
      tab.addEventListener('click', () => {
        currentCategoryIndex = index;
        renderEmojiCategory(index);
      });
      emojiCategoryTabs.appendChild(tab);
    });

    // 預設顯示第一個分類
    renderEmojiCategory(0);
  }
}

// ==========================================
// 4. EVENT LISTENERS (事件監聽綁定)
// ==========================================
function initEventListeners() {
  // 雙色模式切換
  if (elements.btnThemeToggle) {
    elements.btnThemeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('aurawall-theme', newTheme);
      elements.themeIcon.className = newTheme === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
      showToast(`已切換至 ${newTheme === 'dark' ? '深色' : '淺色'} 視覺模式`);
    });
  }

  // 左側導覽列切換
  elements.menuFeed.addEventListener('click', () => switchMenu('feed'));
  elements.menuBookmarks.addEventListener('click', () => switchMenu('bookmarks'));
  elements.menuAbout.addEventListener('click', () => switchMenu('about'));
  if (elements.menuAuth) {
    elements.menuAuth.addEventListener('click', handleAuthButtonClick);
  }
  if (elements.statsFollowingCard) {
    elements.statsFollowingCard.addEventListener('click', openFollowingModal);
  }
  if (elements.registerHandle) {
    elements.registerHandle.addEventListener('input', () => {
      if (elements.registerHandleError) elements.registerHandleError.textContent = '';
    });
  }
  if (elements.registerEmail) {
    elements.registerEmail.addEventListener('input', () => {
      if (elements.registerEmailError) elements.registerEmailError.textContent = '';
    });
  }

  // 會員登入 / 註冊相關監聽
  if (elements.btnCloseAuth) {
    elements.btnCloseAuth.addEventListener('click', () => {
      closeModal(elements.authModal);
    });
  }
  if (elements.tabLoginBtn) {
    elements.tabLoginBtn.addEventListener('click', () => switchAuthTab('login'));
  }
  if (elements.tabRegisterBtn) {
    elements.tabRegisterBtn.addEventListener('click', () => switchAuthTab('register'));
  }
  if (elements.loginForm) {
    elements.loginForm.addEventListener('submit', handleLogin);
  }
  if (elements.registerForm) {
    elements.registerForm.addEventListener('submit', handleRegister);
  }
  if (elements.btnLoginGoogle) {
    elements.btnLoginGoogle.addEventListener('click', () => {
      window.open('google-login-mock.html', 'GoogleLogin', 'width=500,height=600,left=200,top=100');
    });
  }
  if (elements.btnLoginFacebook) {
    elements.btnLoginFacebook.addEventListener('click', () => {
      window.open('facebook-login-mock.html', 'FacebookLogin', 'width=500,height=600,left=200,top=100');
    });
  }

  // 最新、熱門頁籤切換
  elements.tabLatest.addEventListener('click', () => {
    currentSortMethod = 'latest';
    elements.tabLatest.classList.add('active');
    elements.tabPopular.classList.remove('active');
    renderPosts();
  });
  elements.tabPopular.addEventListener('click', () => {
    currentSortMethod = 'popular';
    elements.tabPopular.classList.add('active');
    elements.tabLatest.classList.remove('active');
    renderPosts();
  });

  // 關鍵字搜尋輸入
  elements.searchInput.addEventListener('input', () => {
    renderPosts();
  });

  // 清除當前標籤篩選器
  elements.btnClearFilter.addEventListener('click', () => {
    currentFilterTag = null;
    renderPosts();
  });

  // 圖片附檔：直接觸發本地上傳，不開啟 URL 輸入視窗
  elements.btnTriggerImagePopup.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    closePopup(elements.emojiPickerPopup);
    const fi = document.getElementById('file-upload-input');
    if (fi) fi.click();
  });
  elements.btnCloseUrlPopup.addEventListener('click', () => {
    closePopup(elements.imageUrlPopup);
  });
  elements.btnConfirmImageUrl.addEventListener('click', () => {
    const url = elements.inputImageUrl.value.trim();
    if (url) {
      selectedPostImageUrl = url;
      updateImagePreview();
      elements.inputImageUrl.value = '';
      closePopup(elements.imageUrlPopup);
    }
  });

  // 表情包選單開關
  elements.btnTriggerEmojiPopup.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = elements.emojiPickerPopup.style.display === 'block';
    if (isOpen) closePopup(elements.emojiPickerPopup); else openPopup(elements.emojiPickerPopup, elements.emojiGrid || elements.emojiPickerPopup);
    closePopup(elements.imageUrlPopup);
  });
  if (elements.btnCloseEmojiPopup) elements.btnCloseEmojiPopup.addEventListener('click', () => closePopup(elements.emojiPickerPopup));

  // 點擊空白處關閉浮動視窗
  document.addEventListener('click', () => {
    closePopup(elements.imageUrlPopup);
    closePopup(elements.emojiPickerPopup);
  });
  elements.imageUrlPopup.addEventListener('click', (e) => e.stopPropagation());
  elements.emojiPickerPopup.addEventListener('click', (e) => e.stopPropagation());

  // 移除發文預覽圖
  elements.btnRemoveImagePreview.addEventListener('click', () => {
    selectedPostImageUrl = null;
    updateImagePreview();
  });

  // 發文小區塊：手動打字加入標籤 (Enter)
  elements.inputAddTag.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const tagText = elements.inputAddTag.value.trim().replace('#', '');
      if (tagText && !currentPostTags.includes(tagText)) {
        currentPostTags.push(tagText);
        renderPostFormTags();
        elements.inputAddTag.value = '';
      }
    }
  });

  // 發佈按鈕觸發
  elements.btnPublishPost.addEventListener('click', handlePublishPost);

  // 側邊編輯頭像按鈕（開啟編輯 Modal）
  if (elements.btnEditAvatar) {
    elements.btnEditAvatar.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!isLoggedIn()) {
        // 直接操作 DOM 確保視窗顯示
        const modal = document.getElementById('login-required-modal');
        if (modal) {
          modal.classList.remove('closing');
          modal.classList.add('open');
          modal.style.display = 'flex';
          modal.setAttribute('aria-hidden', 'false');
          modal.setAttribute('aria-modal', 'true');
        }
        return;
      }
      openProfileEditModal();
    });
  }

  if (elements.btnCloseProfileEdit) elements.btnCloseProfileEdit.addEventListener('click', closeProfileEditModal);
  if (elements.btnCancelProfileEdit) elements.btnCancelProfileEdit.addEventListener('click', closeProfileEditModal);
  if (elements.btnSaveProfileEdit) elements.btnSaveProfileEdit.addEventListener('click', saveProfileEdits);

  if (elements.btnCloseAuthorModal) elements.btnCloseAuthorModal.addEventListener('click', () => { closeModal(elements.authorModal); });
  if (elements.btnCloseFollowingModal) elements.btnCloseFollowingModal.addEventListener('click', () => { closeModal(elements.followingModal); });

  // 登入提示 modal 相關綁定
  if (elements.btnCloseLoginRequired) elements.btnCloseLoginRequired.addEventListener('click', closeLoginRequiredModal);
  if (elements.btnLoginRequiredCancel) elements.btnLoginRequiredCancel.addEventListener('click', closeLoginRequiredModal);
  if (elements.btnOpenAuthFromLoginRequired) elements.btnOpenAuthFromLoginRequired.addEventListener('click', () => {
    closeLoginRequiredModal();
    if (elements.authModal) { openModal(elements.authModal, elements.menuAuth); switchAuthTab('login'); }
  });

  // 點擊側邊大頭貼可檢視自己的貼文（若無則仍顯示空）
  if (elements.profileAvatarImg) {
    elements.profileAvatarImg.addEventListener('click', (e) => {
      if (!isLoggedIn()) {
        const modal = document.getElementById('login-required-modal');
        if (modal) {
          modal.classList.remove('closing');
          modal.classList.add('open');
          modal.style.display = 'flex';
          modal.setAttribute('aria-hidden', 'false');
          modal.setAttribute('aria-modal', 'true');
        }
        return;
      }
      openAuthorModal(currentUser.handle, e.currentTarget);
    });
  }

  // Esc 鍵關閉所有 modal / 浮動視窗
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      // 關閉主要 modal
      closeModal(elements.profileEditModal);
      closeModal(elements.loginRequiredModal);
      closeModal(elements.authModal);
      closeModal(elements.authorModal);
      // 關閉浮動 popup
      closePopup(elements.imageUrlPopup);
      closePopup(elements.emojiPickerPopup);
    }
  });
}

// ==========================================
// 5. RENDERING CORE (畫面動態渲染核心)
// ==========================================
function renderApp() {
  renderPosts();
  renderHotTags();
  renderRecommendations();
  updateStatsCounter();
}

// 側邊菜單切換切換
function switchMenu(tab) {
  currentMenuTab = tab;
  elements.menuFeed.classList.remove('active');
  elements.menuBookmarks.classList.remove('active');
  elements.menuAbout.classList.remove('active');

  if (tab === 'feed') {
    elements.menuFeed.classList.add('active');
    elements.createPostArea.style.display = 'block';
    elements.feedTitle.textContent = "精彩動態";
    elements.feedSubtitle.textContent = "探索社群的最新靈感與精彩瞬間";
  } else if (tab === 'bookmarks') {
    elements.menuBookmarks.classList.add('active');
    elements.createPostArea.style.display = 'none';
    elements.feedTitle.textContent = "我的收藏";
    elements.feedSubtitle.textContent = "你珍藏的所有美好創意與貼文";
  } else if (tab === 'about') {
    elements.menuAbout.classList.add('active');
    elements.createPostArea.style.display = 'none';
    elements.feedTitle.textContent = "關於本站";
    elements.feedSubtitle.textContent = "AuraWall 設計理念與系統架構";
  }
  renderPosts();
}

// 主要貼文牆卡片生成
function renderPosts() {
  elements.postsFeed.innerHTML = '';

  // 如果切換到「關於本站」獨立畫面
  if (currentMenuTab === 'about') {
    elements.activeFilterBadge.style.display = 'none';
    elements.postsFeed.innerHTML = `
              <div class="glass-panel" style="padding: 24px; line-height: 1.8; color: var(--color-text);">
                  <h3 style="margin-bottom: 12px; color: var(--tag-text);"><i class="fa-solid fa-wand-magic-sparkles"></i> AuraWall 無邊界美學社群牆</h3>
                  <p style="margin-bottom: 12px;">這是一個基於純前端技術打造的 Glassmorphism（玻璃擬態）質感示範牆。本版本已徹底移除了資料庫與伺服器登入限制，提供全功能解鎖的貼文發布、留言回覆、貼文收藏與即時標籤統計體驗。</p>
                  <h4 style="margin-top: 16px; margin-bottom: 6px;">💡 技術棧要點</h4>
                  <ul style="padding-left: 20px;">
                      <li><strong>CSS 磨砂特質：</strong> 運用 backdrop-filter 結合半透明線條與飽和度控制。</li>
                      <li><strong>無痛操控：</strong> 完全移除了登入校對，採用動態陣列維護狀態。</li>
                      <li><strong>行動端優化：</strong> 支援大螢幕三欄、平板雙欄及手機底部跨載具 UI 切換。</li>
                  </ul>
              </div>
          `;
    return;
  }

  let filtered = [...posts];

  // 1. 收藏過濾
  if (currentMenuTab === 'bookmarks') {
    if (!isLoggedIn()) {
      elements.activeFilterBadge.style.display = 'none';
      elements.postsFeed.innerHTML = `
          <div class="glass-panel" style="padding: 40px 24px; text-align: center; color: var(--text-muted);">
            <i class="fa-solid fa-circle-exclamation" style="font-size: 28px; margin-bottom: 12px; display:block; color: var(--tag-text);"></i>
            <h3 style="margin-bottom: 10px; color: var(--text-main);">請先登入</h3>
            <p style="margin: 0;">登入後即可查看「我的收藏」內容。</p>
          </div>
        `;
      return;
    }
    filtered = filtered.filter(p => p.isBookmarked);
  }

  // 2. 側邊欄/標籤點擊過濾
  if (currentFilterTag) {
    elements.activeFilterBadge.style.display = 'flex';
    elements.activeFilterText.textContent = `#${currentFilterTag}`;
    filtered = filtered.filter(p => p.tags.includes(currentFilterTag));
  } else {
    elements.activeFilterBadge.style.display = 'none';
  }

  // 3. 搜尋關鍵字比對
  const kw = elements.searchInput.value.trim().toLowerCase();
  if (kw) {
    filtered = filtered.filter(p =>
      p.content.toLowerCase().includes(kw) ||
      p.authorName.toLowerCase().includes(kw)
    );
  }

  // 4. 最新排序 vs 熱門按讚數排序
  if (currentSortMethod === 'latest') {
    filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  } else if (currentSortMethod === 'popular') {
    filtered.sort((a, b) => b.likes - a.likes);
  }

  // 查無資料空狀態展示
  if (filtered.length === 0) {
    elements.postsFeed.innerHTML = `
              <div style="text-align: center; padding: 60px 20px; color: var(--color-text-muted);">
                  <i class="fa-regular fa-folder-open" style="font-size: 36px; margin-bottom: 12px; display:block;"></i>
                  這裡目前沒有符合條件的動態貼文喔
              </div>
          `;
    return;
  }

  // 開始繪製貼文 HTML
  filtered.forEach(post => {
    const card = document.createElement('article');
    card.className = 'post-card glass-panel';

    const mediaHtml = post.image ? `
              <div class="post-media-box">
                  <img src="${post.image}" alt="附圖" loading="lazy">
              </div>
          ` : '';
    const avatarSrc = post.authorAvatar || getFallbackAvatar(post.authorHandle);

    const tagsHtml = post.tags.map(t => `<span class="post-tag">#${t}</span>`).join(' ');
    const commentsHtml = post.comments.map(c => `
              <div class="comment-item">
                  <strong>${c.authorName}:</strong> <span>${c.content}</span>
              </div>
          `).join('');

    card.innerHTML = `
              <div class="post-card-header">
                  <div class="poster-info">
                    <img src="${avatarSrc}" alt="頭像" class="user-avatar-sm clickable-avatar" data-handle="${post.authorHandle}">
                    <div class="poster-meta">
                      <div style="display:flex;gap:8px;align-items:center;">
                        <div class="poster-name">${post.authorName}</div>
                        <div class="poster-meta-sub">${post.authorHandle}</div>
                      </div>
                    </div>
                  </div>
                  <div class="post-header-right">
                    <span class="post-time">${formatTimeAgo(post.timestamp)}</span>
                    ${isLoggedIn() && currentUser.handle === post.authorHandle ? `<button class="btn-delete-post" title="刪除貼文"><i class="fa-solid fa-trash-can"></i></button>` : ''}
                  </div>
              </div>
              
              <div class="post-card-body">
                  <p class="post-main-text">${linkifyTags(post.content)}</p>
                  ${mediaHtml}
                  <div class="post-tags-list">${tagsHtml}</div>
              </div>
              
              <div class="post-card-actions">
                  <button class="action-btn btn-like ${post.isLiked ? 'active' : ''}">
                      <i class="${post.isLiked ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
                      <span class="count">${post.likes}</span>
                  </button>
                  <button class="action-btn btn-comment-trigger">
                      <i class="fa-regular fa-comment"></i>
                      <span class="count">${post.comments.length}</span>
                  </button>
                  <button class="action-btn btn-bookmark ${post.isBookmarked ? 'active' : ''}" style="margin-left: auto;">
                      <i class="${post.isBookmarked ? 'fa-solid' : 'fa-regular'} fa-bookmark"></i>
                  </button>
              </div>
  
              <div class="comments-section" style="display: none;">
                  <div class="comments-list-box">${commentsHtml}</div>
                  <div class="comment-input-row">
                      <input type="text" placeholder="寫下你的溫暖回應..." class="input-new-comment">
                      <button class="btn-send-comment"><i class="fa-solid fa-paper-plane"></i></button>
                  </div>
              </div>
          `;

    // 點讚動作
    const likeButton = card.querySelector('.btn-like');
    const bookmarkButton = card.querySelector('.btn-bookmark');
    const commentTrigger = card.querySelector('.btn-comment-trigger');
    const commentSection = card.querySelector('.comments-section');
    const commentInput = card.querySelector('.input-new-comment');
    const commentSendButton = card.querySelector('.btn-send-comment');
    const isUserLoggedIn = isLoggedIn();

    likeButton.addEventListener('click', () => {
      if (!requireLogin()) return;
      post.isLiked = !post.isLiked;
      post.likes += post.isLiked ? 1 : -1;
      persistPosts();
      renderPosts();
      updateStatsCounter();
    });

    // 珍藏動作
    bookmarkButton.addEventListener('click', () => {
      if (!requireLogin()) return;
      post.isBookmarked = !post.isBookmarked;
      showToast(post.isBookmarked ? "貼文已成功加入收藏清單" : "已從收藏清單中移除");
      persistPosts();
      renderPosts();
      updateStatsCounter();
    });

    // 發表新留言回覆邏輯
    const submitComment = () => {
      if (!requireLogin()) return;
      const commentText = commentInput.value.trim();
      if (commentText) {
        post.comments.push({
          id: 'comment-' + Date.now(),
          authorName: currentUser.username,
          content: commentText
        });
        persistPosts();
        commentInput.value = '';
        renderPosts();
      }
    };

    // 留言區可互動狀態
    if (!isUserLoggedIn) {
      likeButton.classList.add('locked');
      bookmarkButton.classList.add('locked');
      commentTrigger.classList.add('locked');
      commentInput.disabled = true;
      commentInput.placeholder = '請先登入後留言';
      commentSendButton.disabled = true;
      commentTrigger.addEventListener('click', () => showLoginRequiredModal());
    } else {
      commentTrigger.addEventListener('click', () => {
        const isHidden = commentSection.style.display === 'none';
        commentSection.style.display = isHidden ? 'block' : 'none';
      });
      commentSendButton.addEventListener('click', submitComment);
      commentInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') submitComment(); });
    }

    // 點擊貼文內文字標籤，自動切換篩選
    card.querySelectorAll('.post-tag, .clickable-tag').forEach(tagElement => {
      tagElement.addEventListener('click', (e) => {
        e.preventDefault();
        currentFilterTag = tagElement.textContent.replace('#', '').trim();
        switchMenu('feed');
      });
    });

    // 點擊作者頭像可檢視該作者全部貼文
    const ava = card.querySelector('.clickable-avatar');
    if (ava) {
      ava.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!isLoggedIn()) {
          const modal = document.getElementById('login-required-modal');
          if (modal) {
            modal.classList.remove('closing');
            modal.classList.add('open');
            modal.style.display = 'flex';
            modal.setAttribute('aria-hidden', 'false');
            modal.setAttribute('aria-modal', 'true');
          }
          return;
        }
        openAuthorModal(ava.getAttribute('data-handle'), e.currentTarget);
      });
    }

    // 刪除貼文按鈕（只有本人貼文才有此按鈕）
    const deleteBtn = card.querySelector('.btn-delete-post');
    if (deleteBtn) {
      deleteBtn.addEventListener('click', () => {
        posts = posts.filter(p => p.id !== post.id);
        persistPosts();
        renderApp();
        showToast('貼文已刪除');
      });
    }

    elements.postsFeed.appendChild(card);
  });
}

// 統計現有貼文的標籤雲分佈
function renderHotTags() {
  elements.hotTagsCloud.innerHTML = '';
  const frequency = {};
  posts.forEach(p => p.tags.forEach(t => frequency[t] = (frequency[t] || 0) + 1));

  const sortedTags = Object.keys(frequency).sort((a, b) => frequency[b] - frequency[a]);
  if (sortedTags.length === 0) {
    elements.hotTagsCloud.innerHTML = '<span style="color:var(--color-text-muted);font-size:12px;">目前暫無標籤</span>';
    return;
  }

  sortedTags.forEach(tag => {
    const btn = document.createElement('button');
    btn.className = `tag-item ${currentFilterTag === tag ? 'active' : ''}`;
    btn.innerHTML = `<span>#${tag}</span> <small>${frequency[tag]}</small>`;
    btn.addEventListener('click', () => {
      currentFilterTag = (currentFilterTag === tag) ? null : tag;
      switchMenu('feed');
    });
    elements.hotTagsCloud.appendChild(btn);
  });
}

// 推薦追蹤博主列表（使用真實資料渲染）
function renderRecommendations() {
  if (!elements.recommendationsList) return;
  elements.recommendationsList.innerHTML = '';
  const followingList = Array.isArray(currentUser.following) ? currentUser.following : [];
  const followedUsers = RECOMMENDED_USERS.filter(user => followingList.includes(user.handle));

  if (isLoggedIn()) {
    const summary = document.createElement('div');
    summary.className = 'follow-summary';
    summary.innerHTML = followedUsers.length > 0 ?
      `<strong>你正在追蹤：${followedUsers.map(u => u.handle).join('、')}</strong>` :
      `<span>你尚未追蹤任何人，點擊右側按鈕開始追蹤。</span>`;
    elements.recommendationsList.appendChild(summary);
  }

  RECOMMENDED_USERS.forEach(user => {
    const item = document.createElement('div');
    item.className = 'follow-item';
    item.innerHTML = `
      <img src="${user.avatar}" alt="${user.name}" class="user-avatar-sm">
      <div class="follow-info">
        <h5>${user.name}</h5>
        <span>${user.handle}</span>
        <small class="follow-bio">${user.bio}</small>
        <small class="follow-count"><i class="fa-solid fa-users" style="font-size:10px;"></i> ${user.followers} 粉絲</small>
      </div>
      <button class="btn-follow-mock">追蹤</button>
    `;

    const btn = item.querySelector('.btn-follow-mock');
    const following = isFollowing(user.handle);
    btn.className = following ? 'btn-follow-mock following' : 'btn-follow-mock';
    btn.textContent = following ? '已追蹤' : '追蹤';
    btn.addEventListener('click', () => {
      if (!requireLogin()) return;
      toggleFollowing(user.handle, user.name);
    });

    elements.recommendationsList.appendChild(item);
  });
}

// ==========================================
// 6. FUNCTION HANDLERS (核心功能處理)
// ==========================================

// 處理發佈質感新貼文
function handlePublishPost() {
  if (!requireLogin()) return;
  const textContent = elements.postInputText.value.trim();
  if (!textContent && !selectedPostImageUrl) {
    showToast("說點心事想法，或加張圖片再發佈吧！");
    return;
  }

  // 自動偵測內文中的 #Hashtag 文字
  const textTags = [];
  const hashtagRegex = /#([\u4e00-\u9fa5_a-zA-Z0-9]+)/g;
  let match;
  while ((match = hashtagRegex.exec(textContent)) !== null) {
    if (!textTags.includes(match[1])) {
      textTags.push(match[1]);
    }
  }

  // 合併打字輸入與內文抽出的標籤
  const mergedTags = Array.from(new Set([...currentPostTags, ...textTags]));

  const newPostObj = {
    id: 'post-' + Date.now(),
    authorName: currentUser.username,
    authorHandle: currentUser.handle,
    authorAvatar: currentUser.avatar,
    content: textContent,
    image: selectedPostImageUrl,
    timestamp: new Date().toISOString(),
    likes: 0,
    isLiked: false,
    isBookmarked: false,
    comments: [],
    tags: mergedTags
  };

  // 插到陣列最前面
  posts.unshift(newPostObj);
  persistPosts();

  // 清空輸入框與欄位狀態
  elements.postInputText.value = '';
  selectedPostImageUrl = null;
  currentPostTags = [];
  updateImagePreview();
  renderPostFormTags();

  // 重新刷新介面
  renderApp();
  showToast("✨ 動態發表成功！");
}

// 更新圖片預覽框顯示狀態
function updateImagePreview() {
  if (selectedPostImageUrl) {
    elements.imagePreviewImg.src = selectedPostImageUrl;
    elements.imagePreviewBox.style.display = 'block';
  } else {
    elements.imagePreviewImg.src = '';
    elements.imagePreviewBox.style.display = 'none';
  }
}

// 刷新發文表單下方緩衝標籤徽章
function renderPostFormTags() {
  const badges = elements.postTagsInputContainer.querySelectorAll('.post-form-tag-badge');
  badges.forEach(b => b.remove());

  currentPostTags.forEach((tag, index) => {
    const span = document.createElement('span');
    span.className = 'post-form-tag-badge';
    span.style.cssText = "background: rgba(59,130,246,0.15); color:var(--tag-text-color); padding: 2px 8px; border-radius:12px; font-size:12px; margin-right:6px; display:inline-flex; align-items:center; gap:4px; margin-bottom:4px;";
    span.innerHTML = `#${tag} <i class="fa-solid fa-xmark" style="cursor:pointer; font-size:10px;"></i>`;
    span.querySelector('i').addEventListener('click', () => {
      currentPostTags.splice(index, 1);
      renderPostFormTags();
    });
    elements.postTagsInputContainer.insertBefore(span, elements.inputAddTag);
  });
}

// 更新看版與左側個人統計面板數字
function updateStatsCounter() {
  const totalLikes = posts.reduce((sum, p) => sum + p.likes, 0);

  if (!isLoggedIn()) {
    if (elements.profilePostsCount) elements.profilePostsCount.textContent = '0';
    if (elements.profileLikesCount) elements.profileLikesCount.textContent = '0';
    if (elements.profileBookmarksCount) elements.profileBookmarksCount.textContent = '0';
  } else {
    const myPostsCount = posts.filter(p => p.authorHandle === currentUser.handle).length;
    const followCount = Array.isArray(currentUser.following) ? currentUser.following.length : 0;

    if (elements.profilePostsCount) elements.profilePostsCount.textContent = myPostsCount;
    if (elements.profileLikesCount) elements.profileLikesCount.textContent = totalLikes;
    if (elements.profileBookmarksCount) elements.profileBookmarksCount.textContent = followCount;
  }

  if (elements.totalPlatformPosts) elements.totalPlatformPosts.textContent = posts.length;
  if (elements.totalPlatformLikes) elements.totalPlatformLikes.textContent = totalLikes;
}

// ==========================================
// 7. UTILS & HELPERS (輔助工具)
// ==========================================

// 將內文的 #標籤 轉化為可點擊藍色樣式
function linkifyTags(text) {
  return text.replace(/#([\u4e00-\u9fa5_a-zA-Z0-9]+)/g, '<a href="#" class="clickable-tag" style="color:var(--tag-text-color); text-decoration:none; font-weight:500;">#$1</a>');
}

// 轉換漂亮的時間差格式
function formatTimeAgo(isoString) {
  const diffMs = Date.now() - new Date(isoString).getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);

  if (diffMins < 1) return '剛剛';
  if (diffMins < 60) return `${diffMins} 分鐘前`;
  if (diffHours < 24) return `${diffHours} 小時前`;
  return new Date(isoString).toLocaleDateString('zh-TW', { month: 'short', day: 'numeric' });
}

// 當作者沒有提供頭像時，根據 handle 回傳一個預設 avatar（從 PRESET_AVATARS 選擇）
function getFallbackAvatar(handle) {
  if (!handle) return PRESET_AVATARS[0];
  try {
    let sum = 0;
    for (let i = 0; i < handle.length; i++) sum += handle.charCodeAt(i);
    return PRESET_AVATARS[sum % PRESET_AVATARS.length];
  } catch (e) {
    return PRESET_AVATARS[0];
  }
}

// 右下角滑出 Toast 提示框
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast-notice';
  toast.style.cssText = "background:var(--glass-bg); backdrop-filter:blur(12px); border:1px solid var(--glass-border); color:var(--color-text); padding:10px 18px; border-radius:10px; margin-bottom:8px; box-shadow:0 8px 24px var(--glass-shadow); animation: slideIn 0.3s ease forwards; font-size:13px; font-weight:500;";
  toast.innerHTML = `<i class="fa-solid fa-circle-info" style="color:var(--tag-text); margin-right:6px;"></i> ${message}`;

  elements.toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = "slideOut 0.3s ease forwards";
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

// ====== 本地圖片上傳功能（file input change 監聽） ======
const fileInput = document.getElementById('file-upload-input');

// 當使用者選擇好照片後，讀取照片並顯示在預覽視窗
if (fileInput) {
  fileInput.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.addEventListener('load', function () {
        selectedPostImageUrl = this.result;
        updateImagePreview();
      });
      reader.readAsDataURL(file);
    }
  });
}

// ==========================================
// 8. AUTHENTICATION MODULE LOGIC (會員登入與註冊邏輯)
// ==========================================

// 更新認證狀態相關的 UI
function updateAuthUI() {
  const loggedInUser = localStorage.getItem('aurawall_logged_in_user');
  if (loggedInUser) {
    currentUser = JSON.parse(loggedInUser);
    if (!Array.isArray(currentUser.following)) currentUser.following = [];
    if (elements.menuAuthText) elements.menuAuthText.textContent = "登出帳戶";
    if (elements.menuAuth) {
      elements.menuAuth.querySelector('i').className = "fa-solid fa-right-from-bracket";
    }
    syncCurrentUserPosts(currentUser.handle, currentUser.username, currentUser.avatar);
  } else {
    currentUser = DEFAULT_USER;
    currentUser.following = [];
    if (elements.menuAuthText) elements.menuAuthText.textContent = "會員登入 / 註冊";
    if (elements.menuAuth) {
      elements.menuAuth.querySelector('i').className = "fa-solid fa-right-to-bracket";
    }
  }

  // 同步側邊個人檔案資訊
  if (elements.profileAvatarImg) elements.profileAvatarImg.src = currentUser.avatar;
  if (elements.profileEditAvatarPreview) elements.profileEditAvatarPreview.src = currentUser.avatar;
  if (elements.profileDisplayName) {
    if (loggedInUser) {
      elements.profileDisplayName.innerHTML = `
        ${currentUser.username}
        <i class="fa-solid fa-circle-check badge-official" title="已驗證用戶"></i>
      `;
    } else {
      elements.profileDisplayName.textContent = '請先登入或註冊';
    }
  }
  if (elements.profileDisplayHandle) {
    elements.profileDisplayHandle.textContent = loggedInUser ? currentUser.handle : '';
  }

  // 同步發文框旁的大頭貼
  if (elements.postCreatorAvatar) elements.postCreatorAvatar.src = currentUser.avatar;

  // 重新渲染與刷新計數器
  updateStatsCounter();
  updatePostFormState();
}

function syncCurrentUserPosts(handle, username, avatar) {
  if (!handle) return;
  let changed = false;
  posts.forEach(post => {
    if (post.authorHandle === handle) {
      if (username && post.authorName !== username) {
        post.authorName = username;
        changed = true;
      }
      if (avatar && post.authorAvatar !== avatar) {
        post.authorAvatar = avatar;
        changed = true;
      }
    }
  });
  if (changed) {
    persistPosts();
  }
}

// -----------------------------
// Profile Edit Modal Actions
// -----------------------------
const PROFILE_COLOR_OPTIONS = ['#6366f1','#06b6d4','#ff7e40','#f97316','#10b981','#ef4444','#f59e0b','#8b5cf6'];

function openProfileEditModal() {
  // 若未登入，先顯示請登入提示
  if (!isLoggedIn()) {
    showLoginRequiredModal();
    return;
  }
  if (!elements.profileEditModal) return;
  elements.inputEditUsername.value = currentUser.username || '';
  elements.inputEditHandle.value = currentUser.handle || '';
  elements.profileEditAvatarPreview.src = currentUser.avatar;
  selectAvatarOption(elements.editAvatarSelection, currentUser.avatar);
  renderProfileColorOptions();
  openModal(elements.profileEditModal, elements.btnEditAvatar);
}

function showLoginRequiredModal() {
  if (!elements.loginRequiredModal) return;
  openModal(elements.loginRequiredModal, elements.btnEditAvatar || elements.menuAuth);
}

function closeLoginRequiredModal() {
  if (!elements.loginRequiredModal) return;
  closeModal(elements.loginRequiredModal);
}

function isLoggedIn() {
  return !!localStorage.getItem('aurawall_logged_in_user');
}

function requireLogin() {
  if (!isLoggedIn()) {
    showLoginRequiredModal();
    return false;
  }
  return true;
}

function persistCurrentUser() {
  if (!isLoggedIn()) return;
  localStorage.setItem('aurawall_logged_in_user', JSON.stringify(currentUser));
  const users = JSON.parse(localStorage.getItem('aurawall_users') || '[]');
  const idx = users.findIndex(u => u.email && u.email === currentUser.email);
  if (idx !== -1) {
    users[idx] = currentUser;
    localStorage.setItem('aurawall_users', JSON.stringify(users));
  }
}

function isFollowing(handle) {
  return Array.isArray(currentUser.following) && currentUser.following.includes(handle);
}

function toggleFollowing(handle, name) {
  if (!requireLogin()) return;
  if (!currentUser.following) currentUser.following = [];
  const index = currentUser.following.indexOf(handle);
  if (index >= 0) {
    currentUser.following.splice(index, 1);
    showToast(`已取消追蹤 ${name}`);
  } else {
    currentUser.following.push(handle);
    showToast(`已追蹤 ${name}`);
  }
  persistCurrentUser();
  updateStatsCounter();
  renderRecommendations();
  if (elements.followingModal && elements.followingModal.classList.contains('open')) {
    renderFollowingModal();
  }
}

function openFollowingModal() {
  if (!elements.followingModal) return;
  if (!requireLogin()) return;
  renderFollowingModal();
  openModal(elements.followingModal, elements.statsFollowingCard);
}

function renderFollowingModal() {
  if (!elements.followingModalBody) return;
  elements.followingModalBody.innerHTML = '';

  const followingList = Array.isArray(currentUser.following) ? currentUser.following : [];
  if (followingList.length === 0) {
    elements.followingModalBody.innerHTML = `
      <div class="glass-panel" style="padding: 30px 20px; text-align:center; color: var(--text-muted);">
        <i class="fa-regular fa-star" style="font-size: 28px; margin-bottom: 10px; color: var(--tag-text);"></i>
        <div>你目前尚未追蹤任何創作者。</div>
        <div style="margin-top:10px; font-size:13px;">前往右側推薦追蹤或點擊作者頭像開始追蹤。</div>
      </div>
    `;
    return;
  }

  const listEl = document.createElement('div');
  listEl.className = 'following-list';

  followingList.forEach(handle => {
    const user = RECOMMENDED_USERS.find(u => u.handle === handle) || {
      name: handle.replace('@', ''),
      handle,
      avatar: getFallbackAvatar(handle),
      bio: '已追蹤的創作者'
    };

    const item = document.createElement('div');
    item.className = 'following-list-item';
    item.innerHTML = `
      <img src="${user.avatar}" alt="${user.name}" class="user-avatar-sm">
      <div class="follow-info">
        <h5>${user.name}</h5>
        <span>${user.handle}</span>
        <small class="follow-bio">${user.bio}</small>
      </div>
      <button class="btn-follow-mock following" type="button">取消追蹤</button>
    `;

    const cancelBtn = item.querySelector('.btn-follow-mock');
    cancelBtn.addEventListener('click', () => {
      toggleFollowing(handle, user.name);
    });

    listEl.appendChild(item);
  });

  elements.followingModalBody.appendChild(listEl);
}

function updatePostFormState() {
  const disabled = !isLoggedIn();
  if (elements.postInputText) {
    elements.postInputText.disabled = disabled;
    elements.postInputText.placeholder = disabled ? '請先登入後發佈動態' : '分享今天的新新鮮事與美好靈感...';
  }
  // 發佈按鈕保持可點擊，由 handlePublishPost() 內的 requireLogin() 彈出請先登入視窗
  if (elements.btnPublishPost) elements.btnPublishPost.disabled = false;
  if (elements.btnTriggerImagePopup) elements.btnTriggerImagePopup.disabled = disabled;
  if (elements.btnTriggerEmojiPopup) elements.btnTriggerEmojiPopup.disabled = disabled;
}

function closeProfileEditModal() {
  if (!elements.profileEditModal) return;
  closeModal(elements.profileEditModal);
}

function renderProfileColorOptions() {
  if (!elements.profileColorOptions) return;
  elements.profileColorOptions.innerHTML = '';
  const savedColor = localStorage.getItem('aurawall_accent_color');
  PROFILE_COLOR_OPTIONS.sort(() => Math.random() - 0.5).forEach(col => {
    const btn = document.createElement('div');
    btn.className = 'color-swatch';
    btn.style.background = col;
    btn.title = col;
    if (savedColor === col) btn.classList.add('selected');
    btn.addEventListener('click', () => {
      // 設定全域 CSS 變數
      document.documentElement.style.setProperty('--sidebar-accent', col);
      // 直接更新 profile-card 的色帶顏色
      applyAccentColor(col);
      // 儲存選擇
      localStorage.setItem('aurawall_accent_color', col);
      document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
      btn.classList.add('selected');
    });
    elements.profileColorOptions.appendChild(btn);
  });
}

// 套用 accent 顏色到 profile card 色帶
function applyAccentColor(col) {
  const profileCard = document.querySelector('.profile-card');
  if (profileCard) {
    profileCard.style.setProperty('--card-accent', col);
  }
  document.documentElement.style.setProperty('--sidebar-accent', col);
}

function saveProfileEdits() {
  const name = elements.inputEditUsername.value.trim();
  let handle = elements.inputEditHandle.value.trim();
  if (handle && !handle.startsWith('@')) handle = '@' + handle;
  const avatarUrl = getSelectedEditAvatarUrl();
  if (name) currentUser.username = name;
  if (handle) currentUser.handle = handle;
  if (avatarUrl) currentUser.avatar = avatarUrl;
  localStorage.setItem('aurawall_logged_in_user', JSON.stringify(currentUser));
  updateAuthUI();
  closeProfileEditModal();
  showToast('已更新個人檔案');
}

// -----------------------------
// 作者貼文 Modal
// -----------------------------
function openAuthorModal(handle, triggerEl) {
  if (!elements.authorModal) return;
  const authorPosts = posts.filter(p => p.authorHandle === handle);
  const title = authorPosts.length > 0 ? `${authorPosts[0].authorName} 的貼文` : `作者 ${handle} 的貼文`;
  elements.authorModalTitle.textContent = title;
  elements.authorModalBody.innerHTML = '';
  const followBtn = document.createElement('button');
  followBtn.className = `btn-follow ${isFollowing(handle) ? 'following' : ''}`;
  followBtn.textContent = handle === currentUser.handle ? '這是你' : isFollowing(handle) ? '取消追蹤' : '追蹤';
  followBtn.disabled = handle === currentUser.handle;
  followBtn.addEventListener('click', () => {
    if (handle === currentUser.handle) return;
    if (!requireLogin()) return;
    toggleFollowing(handle, authorPosts[0]?.authorName || handle);
    openAuthorModal(handle, triggerEl);
  });

  const followWrapper = document.createElement('div');
  followWrapper.className = 'author-modal-controls';
  followWrapper.style.display = 'flex';
  followWrapper.style.justifyContent = 'flex-end';
  followWrapper.appendChild(followBtn);
  elements.authorModalBody.appendChild(followWrapper);

  authorPosts.forEach(p => {
    const div = document.createElement('div');
    div.className = 'glass-panel';
    div.style.padding = '12px';
    div.style.marginBottom = '10px';
    const deleteButton = (currentUser.handle === p.authorHandle) ? `<button class="btn-follow" style="margin-left:auto;">刪除貼文</button>` : '';
    div.innerHTML = `
      <div style="display:flex;justify-content:flex-end;align-items:center;margin-bottom:12px;">
        ${deleteButton}
      </div>
      <div style="margin-top:8px;color:var(--text-main);">${p.content}</div>
      ${p.image ? `<div style="margin-top:8px;"><img src="${p.image}" style="width:100%;border-radius:12px;object-fit:cover;max-height:260px;"></div>` : ''}
      <div style="margin-top:10px;font-size:12px;color:var(--text-muted);">${formatTimeAgo(p.timestamp)}</div>
    `;
    if (currentUser.handle === p.authorHandle) {
      const btn = div.querySelector('button');
      btn.addEventListener('click', () => {
        posts = posts.filter(item => item.id !== p.id);
        persistPosts();
        renderApp();
        closeModal(elements.authorModal);
        showToast('貼文已刪除');
      });
    }
    elements.authorModalBody.appendChild(div);
  });
  openModal(elements.authorModal, triggerEl || null);
}

// 開啟 modal 的共用函式（含 focus trap 與紀錄觸發按鈕）
function openModal(modalEl, triggerEl) {
  if (!modalEl) return;
  // store last focused element (prefer explicit trigger)
  modalEl.__lastFocused = triggerEl || document.activeElement;
  modalEl.classList.remove('closing');
  modalEl.classList.add('open');
  modalEl.style.display = 'flex';
  modalEl.setAttribute('aria-hidden', 'false');
  modalEl.setAttribute('aria-modal', 'true');
  // focus first focusable element
  setTimeout(() => {
    const focusable = modalEl.querySelector('input, button, [tabindex]:not([tabindex="-1"])');
    if (focusable) focusable.focus();
  }, 50);
  enableFocusTrap(modalEl);
}

function closeModal(modalEl) {
  if (!modalEl) return;
  modalEl.classList.add('closing');
  modalEl.classList.remove('open');
  disableFocusTrap(modalEl);
  const cleanup = () => {
    modalEl.style.display = 'none';
    modalEl.setAttribute('aria-hidden', 'true');
    modalEl.classList.remove('closing');
    // restore focus
    if (modalEl.__lastFocused) try { modalEl.__lastFocused.focus(); } catch (e) {}
    modalEl.removeEventListener('transitionend', cleanup);
  };
  // wait for CSS transition (match .modal-content transition)
  setTimeout(cleanup, 220);
}

function enableFocusTrap(modalEl) {
  if (!modalEl) return;
  const handler = function (e) {
    if (e.key !== 'Tab') return;
    const focusable = modalEl.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])');
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };
  modalEl.__trapHandler = handler;
  modalEl.addEventListener('keydown', handler);
}

function disableFocusTrap(modalEl) {
  if (!modalEl || !modalEl.__trapHandler) return;
  modalEl.removeEventListener('keydown', modalEl.__trapHandler);
  delete modalEl.__trapHandler;
}

// 點擊側邊欄登入/登出按鈕
function handleAuthButtonClick() {
  const loggedInUser = localStorage.getItem('aurawall_logged_in_user');
  if (loggedInUser) {
    // 執行登出流程
    localStorage.removeItem('aurawall_logged_in_user');
    updateAuthUI();
    renderPosts();
    showToast("👋 您已成功登出 AuraWall！已回復為訪客身分。");
  } else {
    // 顯示登入彈出視窗
    if (elements.authModal) {
      openModal(elements.authModal, elements.menuAuth);
      switchAuthTab('login');
    }
  }
}

// 切換登入與註冊的分頁 (Tabs)
function switchAuthTab(tab) {
  if (tab === 'login') {
    if (elements.tabLoginBtn) elements.tabLoginBtn.classList.add('active');
    if (elements.tabRegisterBtn) elements.tabRegisterBtn.classList.remove('active');
    if (elements.loginForm) elements.loginForm.style.display = 'flex';
    if (elements.registerForm) elements.registerForm.style.display = 'none';
    if (elements.socialLoginSection) elements.socialLoginSection.style.display = 'block';
  } else {
    if (elements.tabRegisterBtn) elements.tabRegisterBtn.classList.add('active');
    if (elements.tabLoginBtn) elements.tabLoginBtn.classList.remove('active');
    if (elements.registerForm) elements.registerForm.style.display = 'flex';
    if (elements.loginForm) elements.loginForm.style.display = 'none';
    if (elements.socialLoginSection) elements.socialLoginSection.style.display = 'none';
    renderRegisterAvatars();
  }
}

function selectAvatarOption(containerEl, avatarUrl) {
  if (!containerEl) return;
  const options = containerEl.querySelectorAll('.avatar-option');
  let matched = false;
  options.forEach(option => {
    const radio = option.querySelector('input[type="radio"]');
    const img = option.querySelector('img');
    const optionUrl = option.dataset.avatarUrl || (img ? img.src : '');
    const isCustom = option.classList.contains('custom-upload');
    if (!isCustom && avatarUrl && optionUrl === avatarUrl) {
      option.classList.add('active');
      if (radio) radio.checked = true;
      matched = true;
    } else {
      option.classList.remove('active');
      if (radio) radio.checked = false;
    }
  });

  const customOption = containerEl.querySelector('.custom-upload');
  const customPreview = containerEl.querySelector('[id$="custom-avatar-preview"]');
  const plusIcon = containerEl.querySelector('[id$="upload-plus-icon"]');

  if (customOption && customPreview) {
    if (!matched && avatarUrl) {
      customOption.classList.add('active');
      const radio = customOption.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
      customPreview.src = avatarUrl;
      customPreview.style.display = 'block';
      if (plusIcon) plusIcon.style.display = 'none';
    } else {
      customOption.classList.remove('active');
      const radio = customOption.querySelector('input[type="radio"]');
      if (radio) radio.checked = false;
      // 若有相機預設圖就保留顯示，只在有 plusIcon（舊版）才隱藏預覽
      if (plusIcon) {
        customPreview.style.display = 'none';
        plusIcon.style.display = 'flex';
      }
    }
  }
}

function getSelectedAvatarUrl(containerEl) {
  if (!containerEl) return '';
  const selectedOption = containerEl.querySelector('.avatar-option.active');
  if (!selectedOption) return '';
  const isCustom = selectedOption.classList.contains('custom-upload');
  if (isCustom) {
    const customPreview = containerEl.querySelector('[id$="custom-avatar-preview"]');
    return customPreview && customPreview.src ? customPreview.src : '';
  }
  return selectedOption.dataset.avatarUrl || '';
}

function setupAvatarSelection(containerSelector, fileInputId, customRadioId) {
  const containerEl = document.querySelector(containerSelector);
  if (!containerEl) return;
  const fileInput = document.getElementById(fileInputId);
  const customRadio = document.getElementById(customRadioId);
  const avatarOptions = containerEl.querySelectorAll('.avatar-option');

  avatarOptions.forEach(option => {
    option.addEventListener('click', () => {
      avatarOptions.forEach(opt => opt.classList.remove('active'));
      option.classList.add('active');
      const radio = option.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    });
  });

  if (fileInput) {
    fileInput.addEventListener('change', function () {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const previewImg = containerEl.querySelector('[id$="custom-avatar-preview"]');
          const plusIcon = containerEl.querySelector('[id$="upload-plus-icon"]');
          if (previewImg) {
            previewImg.src = e.target.result;
            previewImg.style.display = 'block';
          }
          if (plusIcon) plusIcon.style.display = 'none';
          if (customRadio) customRadio.checked = true;
          const customOption = containerEl.querySelector('.custom-upload');
          if (customOption) {
            avatarOptions.forEach(opt => opt.classList.remove('active'));
            customOption.classList.add('active');
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }
}

function renderRegisterAvatars() {
  const registerContainer = document.querySelector('#register-form .avatar-selection-container');
  if (!registerContainer) return;
  selectAvatarOption(registerContainer, selectedRegisterAvatar || PRESET_AVATARS[0]);
}

function getSelectedRegisterAvatar() {
  const registerContainer = document.querySelector('#register-form .avatar-selection-container');
  return getSelectedAvatarUrl(registerContainer) || PRESET_AVATARS[0];
}

function getSelectedEditAvatarUrl() {
  const editContainer = document.querySelector('#edit-avatar-selection');
  return getSelectedAvatarUrl(editContainer) || currentUser.avatar || PRESET_AVATARS[0];
}

document.addEventListener('DOMContentLoaded', () => {
  setupAvatarSelection('#register-form .avatar-selection-container', 'avatar-upload', 'custom-avatar-radio');
  setupAvatarSelection('#edit-avatar-selection', 'edit-avatar-upload', 'edit-custom-avatar-radio');
  renderRegisterAvatars();
});

// 處理 Email 登入提交
function handleLogin(e) {
  e.preventDefault();
  const email = elements.loginEmail.value.trim();
  const password = elements.loginPassword.value.trim();

  // 1. 驗證內建測試帳號
  if (email === 'admin@aurawall.com' && password === '123456') {
    const adminUser = {
      username: "管理員 Admin",
      handle: "@aurawall_admin",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
      email: email,
      provider: 'local'
    };
    localStorage.setItem('aurawall_logged_in_user', JSON.stringify(adminUser));
    updateAuthUI();
    showToast("👋 歡迎回來，管理員！");
    elements.loginForm.reset();
    closeModal(elements.authModal);
    return;
  }

  // 2. 驗證本地註冊之用戶陣列
  const users = JSON.parse(localStorage.getItem('aurawall_users') || '[]');
  const matchedUser = users.find(u => u.email === email && u.password === password);

  if (matchedUser) {
    localStorage.setItem('aurawall_logged_in_user', JSON.stringify(matchedUser));
    updateAuthUI();
    renderApp();
    showToast(`👋 歡迎回來，${matchedUser.username}！`);
    elements.loginForm.reset();
    closeModal(elements.authModal);
  } else {
    showToast("❌ 帳號或密碼輸入錯誤，請再試一次");
  }
}

// 處理 Email 註冊提交
function handleRegister(e) {
  e.preventDefault();
  const username = elements.registerUsername.value.trim();
  let handle = elements.registerHandle.value.trim();
  if (!handle.startsWith('@')) {
    handle = '@' + handle;
  }
  const email = elements.registerEmail.value.trim();
  const password = elements.registerPassword.value.trim();

  // 讀取現有用戶列表 
  const users = JSON.parse(localStorage.getItem('aurawall_users') || '[]');

  if (elements.registerHandleError) elements.registerHandleError.textContent = '';
  if (elements.registerEmailError) elements.registerEmailError.textContent = '';

  // 檢查帳號 Handle 是否已被使用
  if (users.some(u => u.handle === handle)) {
    if (elements.registerHandleError) elements.registerHandleError.textContent = '此帳號已用過，請選擇其他帳號。';
    return;
  }

  // 檢查 Email 是否已註冊
  if (users.some(u => u.email === email)) {
    if (elements.registerEmailError) elements.registerEmailError.textContent = '此電子信箱已被使用，請改用其他信箱。';
    return;
  }

  const newUser = {
    username: username,
    handle: handle,
    email: email,
    password: password,
    avatar: getSelectedRegisterAvatar(),
    provider: 'local'
  };

  users.push(newUser);
  localStorage.setItem('aurawall_users', JSON.stringify(users));

  // 註冊成功後自動登入
  localStorage.setItem('aurawall_logged_in_user', JSON.stringify(newUser));
  updateAuthUI();
  renderApp();
  showToast("🎉 註冊成功！已為您自動登入。");

  // 重置表單並關閉彈出視窗
  elements.registerForm.reset();
  closeModal(elements.authModal);
}

// 處理第三方社群帳戶登入成功回呼 (Google, Facebook 等彈出視窗會呼叫此函式)
window.handleSocialLogin = function (socialUser) {
  localStorage.setItem('aurawall_logged_in_user', JSON.stringify(socialUser));
  updateAuthUI();
  renderApp();
  showToast(`✨ 已成功使用 ${socialUser.provider === 'google' ? 'Google' : 'Facebook'} 帳戶登入！`);
  if (elements.authModal) closeModal(elements.authModal);
};

// 額外設定 window message 接收機制以支援備用通訊方案
window.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'social_login') {
    window.handleSocialLogin(event.data.user);
  }
});
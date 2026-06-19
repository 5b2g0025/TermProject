// ==========================================
// 1. FIREBASE CONFIGURATION & INITIALIZATION (Firebase 初始化設定)
// ==========================================
const firebaseConfig = {
  apiKey: "AIzaSyB78eBwEnT5p0u3Hhqqfv8aoPtq275ncKY",
  authDomain: "termproject-867ad.firebaseapp.com",
  projectId: "termproject-867ad",
  storageBucket: "termproject-867ad.firebasestorage.app",
  messagingSenderId: "1092040399977",
  appId: "1:1092040399977:web:3ee21820906b4872c4d6f8",
  measurementId: "G-KWWXE5K1SR"
};

// 初始化 Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ==========================================
// 2. MOCK DATA & CONSTANTS (模擬資料與常數)
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
let selectedRegisterAvatar = "https://cdn2.ettoday.net/images/1161/d1161122.jpg";

// 初始預設的動態牆貼文資料（豐富版：多位創作者）
const INITIAL_POSTS_DATA = [
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
    authorAvatar: "https://www.ls-design.com.tw/UserFiles/kindeditor/image/20191121/img-1573540369-29739@900.jpg",
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
    authorAvatar: "https://collections.culture.tw/ShowGalImage.aspx?SYSUID=26&IMG=5MK85TMRK2MQMG0OMLM4MMMJMKMAMB5NM8M6MF0OMX5G5309KX59M7M1MQMWM6M1MH5353KHMI0BMDMIKN5EKKMM090IMHKDKC55KHKKMZ080OMI095EKMK6KL5E5UMBKGK2K8KBKMK5KJMWMRKAKPM65RKX5301MAMI0ZMD0WMAMZ0IM40O0WMB&TEXT=K7KG575Y&FROM=5YKK57",
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
    authorAvatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP8ebClCpS-BYL01u1t1qVMUwqvD7PWvzBuw&s",
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

let posts = [];

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
  menuChat: document.getElementById('menu-chat'),
  menuBookmarks: document.getElementById('menu-bookmarks'),
  menuAbout: document.getElementById('menu-about'),
  menuAdmin: document.getElementById('menu-admin'),

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
  statsFollowersCard: document.getElementById('stats-followers-card'),
  followersModal: document.getElementById('followers-modal'),
  btnCloseFollowersModal: document.getElementById('btn-close-followers-modal'),
  followersModalBody: document.getElementById('followers-modal-body'),
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
    } catch (e) { }
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
  // 檢查 URL 參數以支援特定網址直達後台 (?mode=devadmin)
  const urlParams = new URLSearchParams(window.location.search);
  const hashParams = new URLSearchParams(window.location.hash.includes('?') ? window.location.hash.split('?')[1] : '');
  const isDevAdminMode = urlParams.get('mode') === 'devadmin' || hashParams.get('mode') === 'devadmin';

  if (isDevAdminMode) {
    const adminUser = {
      username: "管理員 Admin",
      handle: "@aurawall_admin",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
      email: "admin@aurawall.com",
      provider: 'local'
    };
    currentUser = adminUser;
    localStorage.setItem('aurawall_logged_in_user', JSON.stringify(adminUser));
  }

  initTheme();
  initEventListeners();
  initPresets();
  loadSavedPosts();
  loadUsersRealtime();
  ensureManyPosts();
  updateFirestoreAvatars();
  updateAuthUI();

  if (isDevAdminMode) {
    if (elements.menuAdmin) {
      elements.menuAdmin.style.display = 'flex';
    }
    switchMenu('admin');
    showToast("⚡ 偵測到模式參數：已自動登入管理員並導向後台！");
  } else {
    const loggedInUser = localStorage.getItem('aurawall_logged_in_user');
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      showToast(`歡迎回來，${user.username}！AuraWall 已成功解鎖。`);
    } else {
      showToast("歡迎回來！AuraWall 已成功解鎖，免登入直接探索。");
    }
  }

  // 跨分頁同步：登出/登入狀態跨分頁同步（當其他分頁登出或登入時，更新 UI 與色帶顏色）
  window.addEventListener('storage', (e) => {
    if (e.key === 'aurawall_logged_in_user') {
      updateAuthUI();
      if (!e.newValue) {
        resetAccentColor();
      } else {
        const savedColor = localStorage.getItem('aurawall_accent_color');
        if (savedColor) {
          applyAccentColor(savedColor);
        }
      }
    }
    // 跨分頁同步色彩設定
    if (e.key === 'aurawall_accent_color') {
      if (e.newValue) {
        applyAccentColor(e.newValue);
      } else {
        resetAccentColor();
      }
    }
  });
});

// 外觀主題設定初始化
function initTheme() {
  const savedTheme = localStorage.getItem('aurawall-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  if (elements.themeIcon) {
    elements.themeIcon.className = savedTheme === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }
  // 還原色帶顏色（僅在登入狀態下還原）
  const loggedInUser = localStorage.getItem('aurawall_logged_in_user');
  if (loggedInUser) {
    const savedColor = localStorage.getItem('aurawall_accent_color');
    if (savedColor) {
      setTimeout(() => applyAccentColor(savedColor), 0);
    }
  } else {
    setTimeout(() => resetAccentColor(), 0);
  }
}

// 如果貼文數不多，複製現有貼文直到至少有 20 筆，讓開啟頁面時能看到很多創作者貼文
function ensureManyPosts() {
  // Firestore seeds default posts, this is now a no-op
}

let postsListener = null;
let isSeeding = false;
function loadSavedPosts() {
  if (postsListener) return;

  postsListener = db.collection('posts').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
    // If empty and never seeded, seed initial posts from INITIAL_POSTS_DATA
    if (snapshot.empty && !isSeeding && !localStorage.getItem('aurawall_seeded')) {
      isSeeding = true;
      console.log("Firestore posts collection is empty and never seeded. Seeding initial posts...");
      let completed = 0;
      INITIAL_POSTS_DATA.forEach((post) => {
        db.collection('posts').doc(post.id).set(post)
          .then(() => {
            completed++;
            if (completed === INITIAL_POSTS_DATA.length) {
              isSeeding = false;
              localStorage.setItem('aurawall_seeded', 'true');
            }
          })
          .catch((err) => {
            console.error("Error seeding:", err);
            isSeeding = false;
          });
      });
      return;
    }

    const fetchedPosts = [];
    let hasNewPosts = false;
    snapshot.forEach((doc) => {
      fetchedPosts.push({ id: doc.id, ...doc.data() });
    });

    // Check if new posts were added (for toast notification)
    if (posts.length > 0 && fetchedPosts.length > posts.length) {
      hasNewPosts = true;
    }

    posts = fetchedPosts;
    renderApp();

    if (hasNewPosts) {
      showToast(`🆕 有新貼文發佈！`);
    }

    if (currentMenuTab === 'admin') {
      renderAdminDashboard();
    }
  }, (err) => {
    console.error("Error loading posts from Firestore:", err);
  });
}

function persistPosts() {
  // Firestore handles persistence, this is now a no-op
}

let allUsers = [];
let usersListener = null;
function loadUsersRealtime() {
  if (usersListener) return;
  usersListener = db.collection('users').onSnapshot((snapshot) => {
    const fetchedUsers = [];
    snapshot.forEach((doc) => {
      fetchedUsers.push({ id: doc.id, ...doc.data() });
    });
    allUsers = fetchedUsers;

    // 即時更新左側粉絲數（有人追蹤我時即時反映）
    updateStatsCounter();

    if (currentMenuTab === 'admin') {
      renderAdminDashboard();
    } else if (currentMenuTab === 'chat') {
      renderChatMainUsersList();
    }
  }, (err) => {
    console.error("Error listening to users from Firestore:", err);
  });
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
  if (elements.menuChat) {
    elements.menuChat.addEventListener('click', () => switchMenu('chat'));
  }
  elements.menuBookmarks.addEventListener('click', () => switchMenu('bookmarks'));
  elements.menuAbout.addEventListener('click', () => switchMenu('about'));
  if (elements.menuAdmin) {
    elements.menuAdmin.addEventListener('click', () => switchMenu('admin'));
  }
  if (elements.menuAuth) {
    elements.menuAuth.addEventListener('click', handleAuthButtonClick);
  }
  if (elements.statsFollowingCard) {
    elements.statsFollowingCard.addEventListener('click', openFollowingModal);
  }
  if (elements.statsFollowersCard) {
    elements.statsFollowersCard.addEventListener('click', openFollowersModal);
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
      let targetUrl = 'google-login-mock.html';
      try {
        const urlObj = new URL(window.location.href);
        if (!urlObj.pathname.endsWith('/') && !urlObj.pathname.endsWith('.html')) {
          targetUrl = urlObj.origin + urlObj.pathname + '/' + targetUrl;
        }
      } catch (e) {
        console.error(e);
      }
      window.open(targetUrl, 'GoogleLogin', 'width=500,height=600,left=200,top=100');
    });
  }
  if (elements.btnLoginFacebook) {
    elements.btnLoginFacebook.addEventListener('click', () => {
      let targetUrl = 'facebook-login-mock.html';
      try {
        const urlObj = new URL(window.location.href);
        if (!urlObj.pathname.endsWith('/') && !urlObj.pathname.endsWith('.html')) {
          targetUrl = urlObj.origin + urlObj.pathname + '/' + targetUrl;
        }
      } catch (e) {
        console.error(e);
      }
      window.open(targetUrl, 'FacebookLogin', 'width=500,height=600,left=200,top=100');
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
  if (elements.btnCloseFollowersModal) elements.btnCloseFollowersModal.addEventListener('click', () => { closeModal(elements.followersModal); });

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

  // 開發環境快捷鍵 (Ctrl + Shift + Alt + L) 直接登入管理員並切換至後台
  document.addEventListener('keydown', (e) => {
    // 監聽 Ctrl + Shift + Alt + L
    const isKeyL = (e.key === 'L' || e.key === 'l' || e.code === 'KeyL' || e.keyCode === 76);
    const triggerModifiers = e.ctrlKey && e.shiftKey && e.altKey;

    if (triggerModifiers && isKeyL) {
      e.preventDefault();

      // 要求輸入數字密碼
      const password = prompt("請輸入進入管理後台的數字密碼：");
      if (password !== "888888") {
        showToast("❌ 密碼錯誤，拒絕進入後台！");
        return;
      }

      // 模擬管理員資料
      const adminUser = {
        username: "管理員 Admin",
        handle: "@aurawall_admin",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
        email: "admin@aurawall.com",
        provider: 'local'
      };

      // 強制寫入全域狀態與 LocalStorage
      currentUser = adminUser;
      localStorage.setItem('aurawall_logged_in_user', JSON.stringify(adminUser));

      // 更新 UI 狀態，防禦任何 DOM 找不到導致的例外中斷
      try {
        updateAuthUI();
      } catch (err) {
        console.warn("updateAuthUI encountered an issue but proceeding: ", err);
      }

      // 強制確保後台選單按鈕顯示與狀態高亮
      if (elements.menuAdmin) {
        elements.menuAdmin.style.display = 'flex';
        elements.menuAdmin.classList.add('active');
      }
      if (elements.menuFeed) elements.menuFeed.classList.remove('active');
      if (elements.menuBookmarks) elements.menuBookmarks.classList.remove('active');
      if (elements.menuAbout) elements.menuAbout.classList.remove('active');

      // 強制切換頁面內容至後台分頁
      try {
        switchMenu('admin');
      } catch (err) {
        console.warn("switchMenu encountered an issue, running manual DOM switch: ", err);
        currentMenuTab = 'admin';
        if (elements.createPostArea) elements.createPostArea.style.display = 'none';
        if (elements.feedTitle) elements.feedTitle.textContent = "後台管理系統";
        if (elements.feedSubtitle) elements.feedSubtitle.textContent = "數據分析、用戶權限與內容審查中心";
        renderPosts();
      }

      showToast("⚡ 已啟用開發者捷徑：已驗證密碼並以管理員身分登入！");
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
  if (elements.menuChat) elements.menuChat.classList.remove('active');
  elements.menuBookmarks.classList.remove('active');
  elements.menuAbout.classList.remove('active');
  if (elements.menuAdmin) elements.menuAdmin.classList.remove('active');

  if (tab === 'feed') {
    elements.menuFeed.classList.add('active');
    elements.createPostArea.style.display = 'block';
    elements.feedTitle.textContent = "精彩動態";
    elements.feedSubtitle.textContent = "探索社群的最新靈感與精彩瞬間";
  } else if (tab === 'chat') {
    if (elements.menuChat) elements.menuChat.classList.add('active');
    elements.createPostArea.style.display = 'none';
    elements.feedTitle.textContent = "私訊聊天";
    elements.feedSubtitle.textContent = "與社群好友進行即時私密對話";
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
  } else if (tab === 'admin') {
    if (elements.menuAdmin) elements.menuAdmin.classList.add('active');
    elements.createPostArea.style.display = 'none';
    elements.feedTitle.textContent = "後台管理系統";
    elements.feedSubtitle.textContent = "數據分析、用戶權限與內容審查中心";
  }
  renderPosts();
}

// 主要貼文牆卡片生成
function renderPosts() {
  elements.postsFeed.innerHTML = '';

  // 如果切換到「私訊聊天」獨立畫面
  if (currentMenuTab === 'chat') {
    if (elements.activeFilterBadge) elements.activeFilterBadge.style.display = 'none';
    if (!isLoggedIn()) {
      elements.postsFeed.innerHTML = `
          <div class="glass-panel" style="padding: 40px 24px; text-align: center; color: var(--text-muted);">
            <i class="fa-solid fa-circle-exclamation" style="font-size: 28px; margin-bottom: 12px; display:block; color: var(--tag-text);"></i>
            <h3 style="margin-bottom: 10px; color: var(--text-main);">請先登入</h3>
            <p style="margin: 0;">登入後即可與社群好友進行私訊聊天。</p>
          </div>
        `;
      return;
    }
    renderChatMainPage();
    return;
  }

  // 如果切換到「後台管理」獨立畫面
  if (currentMenuTab === 'admin') {
    if (elements.activeFilterBadge) elements.activeFilterBadge.style.display = 'none';
    if (!isLoggedIn() || currentUser.handle !== '@aurawall_admin') {
      elements.postsFeed.innerHTML = `
          <div class="glass-panel" style="padding: 40px 24px; text-align: center; color: var(--text-muted);">
            <i class="fa-solid fa-lock" style="font-size: 28px; margin-bottom: 12px; display:block; color: #ef4444;"></i>
            <h3 style="margin-bottom: 10px; color: var(--text-main);">權限不足 Access Denied</h3>
            <p style="margin: 0;">此頁面僅供系統管理員訪問，請登入管理員帳戶再試。</p>
          </div>
        `;
      return;
    }
    renderAdminDashboard();
    return;
  }

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
                  <button class="action-btn btn-dm">
                      <i class="fa-regular fa-paper-plane"></i>
                      <span>私訊</span>
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
      const newIsLiked = !post.isLiked;
      const newLikes = post.likes + (newIsLiked ? 1 : -1);
      db.collection('posts').doc(post.id).update({
        isLiked: newIsLiked,
        likes: newLikes
      }).catch(err => {
        console.error("Error updating like:", err);
      });
    });

    // 珍藏動作
    bookmarkButton.addEventListener('click', () => {
      if (!requireLogin()) return;
      const newIsBookmarked = !post.isBookmarked;
      db.collection('posts').doc(post.id).update({
        isBookmarked: newIsBookmarked
      }).then(() => {
        showToast(newIsBookmarked ? "貼文已成功加入收藏清單" : "已從收藏清單中移除");
      }).catch(err => {
        console.error("Error updating bookmark:", err);
      });
    });

    // 發表新留言回覆邏輯
    const submitComment = () => {
      if (!requireLogin()) return;
      const commentText = commentInput.value.trim();
      if (commentText) {
        const updatedComments = [...(post.comments || []), {
          id: 'comment-' + Date.now(),
          authorName: currentUser.username,
          content: commentText
        }];
        db.collection('posts').doc(post.id).update({
          comments: updatedComments
        }).then(() => {
          commentInput.value = '';
        }).catch(err => {
          console.error("Error adding comment:", err);
        });
      }
    };

    // 私訊動作
    const dmButton = card.querySelector('.btn-dm');
    if (dmButton) {
      if (!isUserLoggedIn) {
        dmButton.classList.add('locked');
      }
      dmButton.addEventListener('click', () => {
        if (!requireLogin()) return;
        if (post.authorHandle === currentUser.handle) {
          showToast("💡 您不能私訊給自己喔！");
          return;
        }
        if (!canDMUser(post.authorHandle)) {
          showToast(`🔒 你和 ${post.authorName} 至少需要一方追蹤對方才能私訊`);
          return;
        }
        switchMenu('chat');
        selectChatMainTarget({
          handle: post.authorHandle,
          username: post.authorName,
          avatar: avatarSrc
        });
      });
    }

    // 留言區可互動狀態
    if (!isUserLoggedIn) {
      likeButton.classList.add('locked');
      bookmarkButton.classList.add('locked');
      commentTrigger.classList.add('locked');
      if (dmButton) dmButton.classList.add('locked');
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
        db.collection('posts').doc(post.id).delete()
          .then(() => {
            showToast('貼文已刪除');
          })
          .catch((err) => {
            console.error("Error deleting post:", err);
            showToast('❌ 刪除貼文失敗');
          });
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

  const newPostId = 'post-' + Date.now();
  const newPostObj = {
    id: newPostId,
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

  db.collection('posts').doc(newPostId).set(newPostObj)
    .then(() => {
      // 清空輸入框與欄位狀態
      elements.postInputText.value = '';
      selectedPostImageUrl = null;
      currentPostTags = [];
      updateImagePreview();
      renderPostFormTags();
      showToast("✨ 動態發表成功！");
    })
    .catch((err) => {
      console.error("Error publishing post to Firestore:", err);
      showToast("❌ 發佈動態失敗");
    });
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

// 計算有多少人追蹤我（從 allUsers 中查詢）
function getMyFollowerCount() {
  if (!isLoggedIn() || !currentUser.handle) return 0;
  return allUsers.filter(u =>
    u.handle !== currentUser.handle &&
    Array.isArray(u.following) &&
    u.following.includes(currentUser.handle)
  ).length;
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
    const followerCount = getMyFollowerCount();

    if (elements.profilePostsCount) elements.profilePostsCount.textContent = myPostsCount;
    if (elements.profileLikesCount) elements.profileLikesCount.textContent = followerCount;  // 粉絲數
    if (elements.profileBookmarksCount) elements.profileBookmarksCount.textContent = followCount;   // 追蹤數
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

    // 套用此使用者的自訂色帶顏色，若無自訂則重置
    if (currentUser.themeColor) {
      localStorage.setItem('aurawall_accent_color', currentUser.themeColor);
      applyAccentColor(currentUser.themeColor);
    } else {
      localStorage.removeItem('aurawall_accent_color');
      resetAccentColor();
    }

    // 非同步從 Firestore 獲取最新的用戶資料以防資料過期
    if (currentUser.id && currentUser.provider === 'local') {
      db.collection('users').doc(currentUser.id).get()
        .then((doc) => {
          if (doc.exists) {
            const freshData = { id: doc.id, ...doc.data() };
            if (JSON.stringify(currentUser) !== JSON.stringify(freshData)) {
              currentUser = freshData;
              localStorage.setItem('aurawall_logged_in_user', JSON.stringify(freshData));
              if (elements.profileAvatarImg) elements.profileAvatarImg.src = currentUser.avatar;
              if (elements.profileEditAvatarPreview) elements.profileEditAvatarPreview.src = currentUser.avatar;
              if (elements.profileDisplayName) {
                elements.profileDisplayName.innerHTML = `
                  ${currentUser.username}
                  <i class="fa-solid fa-circle-check badge-official" title="已驗證用戶"></i>
                `;
              }
              if (elements.profileDisplayHandle) {
                elements.profileDisplayHandle.textContent = currentUser.handle;
              }
              if (elements.postCreatorAvatar) elements.postCreatorAvatar.src = currentUser.avatar;

              if (currentUser.themeColor) {
                localStorage.setItem('aurawall_accent_color', currentUser.themeColor);
                applyAccentColor(currentUser.themeColor);
              } else {
                localStorage.removeItem('aurawall_accent_color');
                resetAccentColor();
              }
            }
          } else {
            // User was deleted by admin
            localStorage.removeItem('aurawall_logged_in_user');
            updateAuthUI();
          }
        })
        .catch((err) => console.error("Error syncing user data on load:", err));
    }
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

  // 控制後台管理選單顯示
  if (elements.menuAdmin) {
    if (loggedInUser && currentUser.handle === '@aurawall_admin') {
      elements.menuAdmin.style.display = 'flex';
    } else {
      elements.menuAdmin.style.display = 'none';
      if (currentMenuTab === 'admin') {
        switchMenu('feed');
      }
    }
  }



  // 重新渲染與刷新計數器
  updateStatsCounter();
  updatePostFormState();
  startGlobalMessagesListener();
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
const PROFILE_COLOR_OPTIONS = ['#6366f1', '#06b6d4', '#ff7e40', '#f97316', '#10b981', '#ef4444', '#f59e0b', '#8b5cf6'];

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
  if (currentUser.id) {
    db.collection('users').doc(currentUser.id).update(currentUser)
      .catch(err => console.error("Error updating user in Firestore:", err));
  }
}

function isFollowing(handle) {
  return Array.isArray(currentUser.following) && currentUser.following.includes(handle);
}

// 私訊權限判斷：至少一方追蹤對方即可
function canDMUser(targetHandle) {
  if (!isLoggedIn()) return false;
  // 我追蹤對方
  const iFollowThem = isFollowing(targetHandle);
  // 對方追蹤我 (從 allUsers 找對方的 following 陣列)
  const targetUser = allUsers.find(u => u.handle === targetHandle);
  const theyFollowMe = targetUser && Array.isArray(targetUser.following) && targetUser.following.includes(currentUser.handle);
  return iFollowThem || theyFollowMe;
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
  if (elements.followersModal && elements.followersModal.classList.contains('open')) {
    renderFollowersModal();
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
    const dbUser = allUsers.find(u => u.handle === handle);
    const mockUser = RECOMMENDED_USERS.find(u => u.handle === handle);

    const displayName = dbUser ? dbUser.username : (mockUser ? mockUser.name : handle.replace('@', ''));
    const displayAvatar = dbUser ? dbUser.avatar : (mockUser ? mockUser.avatar : getFallbackAvatar(handle));
    const displayBio = dbUser ? (dbUser.bio || '探索宇宙的冒險者 🚀') : (mockUser ? mockUser.bio : '已追蹤的創作者');

    const item = document.createElement('div');
    item.className = 'following-list-item';
    item.innerHTML = `
      <img src="${displayAvatar || getFallbackAvatar(handle)}" alt="${displayName}" class="user-avatar-sm">
      <div class="follow-info">
        <h5>${displayName}</h5>
        <span>${handle}</span>
        <small class="follow-bio">${displayBio}</small>
      </div>
      <button class="btn-follow-mock following" type="button">取消追蹤</button>
    `;

    const cancelBtn = item.querySelector('.btn-follow-mock');
    cancelBtn.addEventListener('click', () => {
      toggleFollowing(handle, displayName);
    });

    listEl.appendChild(item);
  });

  elements.followingModalBody.appendChild(listEl);
}

function openFollowersModal() {
  if (!elements.followersModal) return;
  if (!requireLogin()) return;
  renderFollowersModal();
  openModal(elements.followersModal, elements.statsFollowersCard);
}

function renderFollowersModal() {
  if (!elements.followersModalBody) return;
  elements.followersModalBody.innerHTML = '';

  const followersList = allUsers.filter(u =>
    u.handle !== currentUser.handle &&
    Array.isArray(u.following) &&
    u.following.includes(currentUser.handle)
  );

  if (followersList.length === 0) {
    elements.followersModalBody.innerHTML = `
      <div class="glass-panel" style="padding: 30px 20px; text-align:center; color: var(--text-muted);">
        <i class="fa-regular fa-face-frown" style="font-size: 28px; margin-bottom: 10px; color: var(--tag-text);"></i>
        <div>你目前尚無任何粉絲。</div>
        <div style="margin-top:10px; font-size:13px;">分享生活動態，吸引更多人關注你吧！✨</div>
      </div>
    `;
    return;
  }

  const listEl = document.createElement('div');
  listEl.className = 'following-list';

  followersList.forEach(user => {
    const isFollowingThem = isFollowing(user.handle);

    const item = document.createElement('div');
    item.className = 'following-list-item';

    const avatarSrc = user.avatar || getFallbackAvatar(user.handle);
    const bioText = user.bio || '探索宇宙的冒險者 🚀';

    item.innerHTML = `
      <img src="${avatarSrc}" alt="${user.username}" class="user-avatar-sm">
      <div class="follow-info">
        <h5>${user.username}</h5>
        <span>${user.handle}</span>
        <small class="follow-bio">${bioText}</small>
      </div>
      <button class="btn-follow-mock ${isFollowingThem ? 'following' : ''}" type="button">
        ${isFollowingThem ? '已追蹤' : '回追'}
      </button>
    `;

    const followBtn = item.querySelector('.btn-follow-mock');
    followBtn.addEventListener('click', () => {
      toggleFollowing(user.handle, user.username);
    });

    listEl.appendChild(item);
  });

  elements.followersModalBody.appendChild(listEl);
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

      // 同步更新當前使用者物件的色彩設定
      const loggedInUser = localStorage.getItem('aurawall_logged_in_user');
      if (loggedInUser) {
        currentUser.themeColor = col;
        persistCurrentUser();
      }

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

// 重置 accent 顏色回預設值
function resetAccentColor() {
  const profileCard = document.querySelector('.profile-card');
  if (profileCard) {
    profileCard.style.removeProperty('--card-accent');
  }
  document.documentElement.style.removeProperty('--sidebar-accent');
  document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
}

function saveProfileEdits() {
  const name = elements.inputEditUsername.value.trim();
  let handle = elements.inputEditHandle.value.trim();
  if (handle && !handle.startsWith('@')) handle = '@' + handle;
  const avatarUrl = getSelectedEditAvatarUrl();
  if (name) currentUser.username = name;
  if (handle) currentUser.handle = handle;
  if (avatarUrl) currentUser.avatar = avatarUrl;

  const savedColor = localStorage.getItem('aurawall_accent_color');
  if (savedColor) {
    currentUser.themeColor = savedColor;
  }

  persistCurrentUser();

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
        db.collection('posts').doc(p.id).delete()
          .then(() => {
            closeModal(elements.authorModal);
            showToast('貼文已刪除');
          })
          .catch((err) => {
            console.error("Error deleting post:", err);
            showToast('❌ 刪除貼文失敗');
          });
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
    if (modalEl.__lastFocused) try { modalEl.__lastFocused.focus(); } catch (e) { }
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
    localStorage.removeItem('aurawall_accent_color'); // 登出後清除自訂顏色
    resetAccentColor(); // 重置色帶顏色
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
async function handleLogin(e) {
  e.preventDefault();
  const email = elements.loginEmail.value.trim();
  const password = elements.loginPassword.value.trim();

  // 1. 驗證內建測試帳號
  if (email === 'admin@aurawall.com' && password === '123456') {
    const adminUser = {
      id: "admin-id",
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

  // 2. 驗證 Firestore users 集合的帳密
  try {
    const userSnapshot = await db.collection('users').where('email', '==', email).get();
    if (userSnapshot.empty) {
      showToast("❌ 帳號或密碼輸入錯誤，請再試一次");
      return;
    }
    let matchedUser = null;
    userSnapshot.forEach((doc) => {
      const u = doc.data();
      if (u.password === password) {
        matchedUser = { id: doc.id, ...u };
      }
    });

    if (matchedUser) {
      localStorage.setItem('aurawall_logged_in_user', JSON.stringify(matchedUser));
      updateAuthUI();
      showToast(`👋 歡迎回來，${matchedUser.username}！`);
      elements.loginForm.reset();
      closeModal(elements.authModal);
    } else {
      showToast("❌ 帳號或密碼輸入錯誤，請再試一次");
    }
  } catch (err) {
    console.error("Login error:", err);
    showToast("❌ 登入發生錯誤，請稍後重試");
  }
}

// 處理 Email 註冊提交
async function handleRegister(e) {
  e.preventDefault();
  const username = elements.registerUsername.value.trim();
  let handle = elements.registerHandle.value.trim();
  if (!handle.startsWith('@')) {
    handle = '@' + handle;
  }
  const email = elements.registerEmail.value.trim();
  const password = elements.registerPassword.value.trim();

  if (elements.registerHandleError) elements.registerHandleError.textContent = '';
  if (elements.registerEmailError) elements.registerEmailError.textContent = '';

  try {
    // 檢查帳號 Handle 是否已被使用
    const handleSnapshot = await db.collection('users').where('handle', '==', handle).get();
    if (!handleSnapshot.empty) {
      if (elements.registerHandleError) elements.registerHandleError.textContent = '此帳號已用過，請選擇其他帳號。';
      return;
    }

    // 檢查 Email 是否已註冊
    const emailSnapshot = await db.collection('users').where('email', '==', email).get();
    if (!emailSnapshot.empty) {
      if (elements.registerEmailError) elements.registerEmailError.textContent = '此電子信箱已被使用，請改用其他信箱。';
      return;
    }

    const newUser = {
      username: username,
      handle: handle,
      email: email,
      password: password,
      avatar: getSelectedRegisterAvatar(),
      provider: 'local',
      themeColor: ''
    };

    const docRef = await db.collection('users').add(newUser);
    const registeredUser = { id: docRef.id, ...newUser };

    // 註冊成功後自動登入
    localStorage.setItem('aurawall_logged_in_user', JSON.stringify(registeredUser));
    updateAuthUI();
    showToast("🎉 註冊成功！已為您自動登入。");

    // 重置表單並關閉彈出視窗
    elements.registerForm.reset();
    closeModal(elements.authModal);
  } catch (err) {
    console.error("Registration error:", err);
    showToast("❌ 註冊失敗，請稍後重試");
  }
}

// 處理第三方社群帳戶登入成功回呼 (Google, Facebook 等彈出視窗會呼叫此函式)
window.handleSocialLogin = async function (socialUser) {
  try {
    const userSnapshot = await db.collection('users').where('email', '==', socialUser.email).get();
    let loggedUser;
    if (userSnapshot.empty) {
      const newUser = {
        username: socialUser.username,
        handle: socialUser.handle,
        email: socialUser.email,
        avatar: socialUser.avatar,
        provider: socialUser.provider,
        themeColor: ''
      };
      const docRef = await db.collection('users').add(newUser);
      loggedUser = { id: docRef.id, ...newUser };
    } else {
      let docId = '';
      let userData = {};
      userSnapshot.forEach((doc) => {
        docId = doc.id;
        userData = doc.data();
      });
      loggedUser = { id: docId, ...userData };
    }

    localStorage.setItem('aurawall_logged_in_user', JSON.stringify(loggedUser));
    updateAuthUI();
    showToast(`✨ 已成功使用 ${socialUser.provider === 'google' ? 'Google' : 'Facebook'} 帳戶登入！`);
    if (elements.authModal) closeModal(elements.authModal);
  } catch (err) {
    console.error("Social login error:", err);
    showToast("❌ 登入失敗");
  }
};

// 額外設定 window message 接收機制以支援備用通訊方案
window.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'social_login') {
    window.handleSocialLogin(event.data.user);
  }
});

// ==========================================
// 9. ADMIN PANEL CONTROLLER (後台管理邏輯)
// ==========================================
let currentAdminSection = 'users'; // 'users' | 'posts' | 'maintenance'

function renderAdminDashboard() {
  const users = allUsers;
  const totalPosts = posts.length;
  const totalLikes = posts.reduce((sum, p) => sum + (p.likes || 0), 0);

  const postsFeed = elements.postsFeed;
  if (!postsFeed) return;

  postsFeed.innerHTML = `
    <div class="admin-dashboard">
      <!-- 數據統計看板 -->
      <div class="admin-stats-grid">
        <div class="admin-stat-card">
          <div class="admin-stat-info">
            <h3>註冊用戶數</h3>
            <div class="stat-value">${users.length}</div>
          </div>
          <div class="admin-stat-icon">
            <i class="fa-solid fa-users"></i>
          </div>
        </div>
        
        <div class="admin-stat-card">
          <div class="admin-stat-info">
            <h3>平台貼文總數</h3>
            <div class="stat-value">${totalPosts}</div>
          </div>
          <div class="admin-stat-icon" style="background: rgba(99, 102, 241, 0.1); color: #6366f1;">
            <i class="fa-solid fa-feather"></i>
          </div>
        </div>

        <div class="admin-stat-card">
          <div class="admin-stat-info">
            <h3>累積按讚數</h3>
            <div class="stat-value">${totalLikes}</div>
          </div>
          <div class="admin-stat-icon" style="background: rgba(244, 63, 94, 0.1); color: #f43f5e;">
            <i class="fa-solid fa-heart"></i>
          </div>
        </div>
      </div>

      <!-- 功能分頁選單 -->
      <div class="admin-tabs">
        <button class="admin-tab-btn ${currentAdminSection === 'users' ? 'active' : ''}" id="admin-tab-users">
          <i class="fa-solid fa-user-gear"></i> 用戶管理
        </button>
        <button class="admin-tab-btn ${currentAdminSection === 'posts' ? 'active' : ''}" id="admin-tab-posts">
          <i class="fa-solid fa-message"></i> 貼文管理
        </button>
        <button class="admin-tab-btn ${currentAdminSection === 'maintenance' ? 'active' : ''}" id="admin-tab-maintenance">
          <i class="fa-solid fa-screwdriver-wrench"></i> 系統維護
        </button>
      </div>

      <!-- 分頁內容區域 -->
      <div class="admin-content-section" id="admin-content-section">
        <!-- 動態渲染處 -->
      </div>
    </div>
  `;

  // 綁定分頁按鈕事件
  document.getElementById('admin-tab-users').addEventListener('click', () => {
    currentAdminSection = 'users';
    renderAdminDashboard();
  });
  document.getElementById('admin-tab-posts').addEventListener('click', () => {
    currentAdminSection = 'posts';
    renderAdminDashboard();
  });
  document.getElementById('admin-tab-maintenance').addEventListener('click', () => {
    currentAdminSection = 'maintenance';
    renderAdminDashboard();
  });

  // 渲染當前選取的分頁內容
  const contentSection = document.getElementById('admin-content-section');
  if (contentSection) {
    if (currentAdminSection === 'users') {
      renderAdminUsers(contentSection);
    } else if (currentAdminSection === 'posts') {
      renderAdminPosts(contentSection);
    } else if (currentAdminSection === 'maintenance') {
      renderAdminMaintenance(contentSection);
    }
  }
}

function renderAdminUsers(container) {
  const users = allUsers;

  let html = `
    <h3 style="font-size: 18px; font-weight:600; margin-bottom: 4px; color: var(--text-main);"><i class="fa-solid fa-user-shield"></i> 註冊用戶名單</h3>
    <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 16px;">列出目前系統中所有註冊的本地會員帳號。管理員可以審查會員狀態或刪除違規帳號。</p>
  `;

  if (users.length === 0) {
    html += `
      <div style="text-align: center; padding: 40px; color: var(--text-muted);">
        <i class="fa-solid fa-users-slash" style="font-size: 32px; margin-bottom: 12px; display:block; color: var(--text-muted);"></i>
        目前尚無任何註冊會員。
      </div>
    `;
    container.innerHTML = html;
    return;
  }

  html += `
    <div class="admin-table-wrapper">
      <table class="admin-table">
        <thead>
          <tr>
            <th>頭像</th>
            <th>用戶名稱</th>
            <th>帳號名稱 (Handle)</th>
            <th>電子信箱 Email</th>
            <th>角色/狀態</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
  `;

  users.forEach((u) => {
    const avatar = u.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100';
    html += `
      <tr>
        <td><img src="${avatar}" class="admin-avatar" alt="avatar"></td>
        <td style="font-weight: 600;">${escapeHTML(u.username)}</td>
        <td><span style="color: var(--tag-text);">${escapeHTML(u.handle)}</span></td>
        <td>${escapeHTML(u.email)}</td>
        <td><span class="admin-badge admin-badge-user">一般會員</span></td>
        <td>
          <button class="admin-btn-delete" data-email="${u.email}">刪除用戶</button>
        </td>
      </tr>
    `;
  });

  html += `
        </tbody>
      </table>
    </div>
  `;

  container.innerHTML = html;

  // 綁定刪除按鈕
  container.querySelectorAll('.admin-btn-delete').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const email = e.currentTarget.getAttribute('data-email');
      if (confirm(`確定要刪除此用戶 (${email}) 嗎？此操作將會清除該用戶註冊資料且無法復原。`)) {
        deleteAdminUser(email);
      }
    });
  });
}

function deleteAdminUser(email) {
  const user = allUsers.find(u => u.email === email);
  if (user && user.id) {
    db.collection('users').doc(user.id).delete()
      .then(() => {
        showToast(`已成功刪除用戶: ${email}`);
      })
      .catch((err) => {
        console.error("Error deleting user:", err);
        showToast("❌ 刪除用戶失敗");
      });
  } else {
    showToast("❌ 找不到此用戶");
  }
}

function renderAdminPosts(container) {
  let html = `
    <h3 style="font-size: 18px; font-weight:600; margin-bottom: 4px; color: var(--text-main);"><i class="fa-solid fa-clipboard-list"></i> 貼文內容審查</h3>
    <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 16px;">平台所有動態貼文列表。管理員可以審查內容，並下架/刪除不當或違規的貼文。</p>
  `;

  if (posts.length === 0) {
    html += `
      <div style="text-align: center; padding: 40px; color: var(--text-muted);">
        <i class="fa-solid fa-message" style="font-size: 32px; margin-bottom: 12px; display:block; color: var(--text-muted);"></i>
        目前尚無任何貼文。
      </div>
    `;
    container.innerHTML = html;
    return;
  }

  html += `
    <div class="admin-table-wrapper">
      <table class="admin-table">
        <thead>
          <tr>
            <th>作者</th>
            <th>貼文內容</th>
            <th>按讚數</th>
            <th>留言數</th>
            <th>發布時間</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
  `;

  posts.forEach((p) => {
    const contentPreview = p.content ? (p.content.length > 30 ? p.content.slice(0, 30) + '...' : p.content) : '(無文字內容)';
    const dateStr = p.timestamp ? new Date(p.timestamp).toLocaleString() : '未知';
    const authorName = p.authorName || '未命名';
    const authorHandle = p.authorHandle || '';

    html += `
      <tr>
        <td>
          <div style="display:flex; align-items:center; gap:8px;">
            <img src="${p.authorAvatar}" class="admin-avatar" style="width:28px;height:28px;" alt="avatar">
            <div>
              <div style="font-weight:600; font-size:13px;">${escapeHTML(authorName)}</div>
              <div style="color:var(--text-muted); font-size:11px;">${escapeHTML(authorHandle)}</div>
            </div>
          </div>
        </td>
        <td>
          <div style="max-width:260px; word-break:break-all;">
            ${escapeHTML(contentPreview)}
            ${p.image ? ` <i class="fa-solid fa-image" style="color:var(--tag-text);" title="附帶圖片"></i>` : ''}
          </div>
        </td>
        <td style="font-weight:600;">${p.likes || 0}</td>
        <td>${p.comments ? p.comments.length : 0}</td>
        <td style="font-size:12px; color:var(--text-muted);">${dateStr}</td>
        <td>
          <button class="admin-btn-delete" data-post-id="${p.id}">刪除貼文</button>
        </td>
      </tr>
    `;
  });

  html += `
        </tbody>
      </table>
    </div>
  `;

  container.innerHTML = html;

  // 綁定刪除按鈕
  container.querySelectorAll('.admin-btn-delete').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const postId = e.currentTarget.getAttribute('data-post-id');
      if (confirm('確定要下架並刪除此貼文嗎？此操作將無法復原。')) {
        deleteAdminPost(postId);
      }
    });
  });
}

function deleteAdminPost(postId) {
  db.collection('posts').doc(postId).delete()
    .then(() => {
      showToast(`已下架並刪除貼文`);
    })
    .catch((err) => {
      console.error("Error deleting post:", err);
      showToast("❌ 刪除貼文失敗");
    });
}

function renderAdminMaintenance(container) {
  let html = `
    <h3 style="font-size: 18px; font-weight:600; margin-bottom: 4px; color: var(--text-main);"><i class="fa-solid fa-screwdriver-wrench"></i> 系統維護中心</h3>
    <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 16px;">管理員專屬的一鍵系統重置與維護工具，能協助您快速建置展示環境或清空資料。</p>
    
    <div class="admin-maintenance-row">
      <div class="admin-maintenance-item">
        <div class="admin-maintenance-info">
          <h4>重置系統為出廠預設資料</h4>
          <p>此動作將會清除所有使用者自行發佈的貼文、註冊的帳號，並重新產生精選的示範貼文與預設系統帳號。</p>
        </div>
        <button class="admin-btn-action admin-btn-warning" id="btn-admin-reset">重置系統</button>
      </div>

      <div class="admin-maintenance-item">
        <div class="admin-maintenance-info">
          <h4>產生 10 筆隨機測試貼文</h4>
          <p>立即在動態牆產生 10 筆由不同 AI 用戶發佈的測試內容，用於展示大數據量或捲動加載的視覺效果。</p>
        </div>
        <button class="admin-btn-action" id="btn-admin-gen10">產生 10 筆貼文</button>
      </div>

      <div class="admin-maintenance-item">
        <div class="admin-maintenance-info">
          <h4>清除所有平台貼文</h4>
          <p>一鍵清除動態牆上的所有貼文，使整個動態牆呈現完全清空之狀態以供全新撰寫。</p>
        </div>
        <button class="admin-btn-action admin-btn-danger" id="btn-admin-clear-all">清除所有貼文</button>
      </div>
    </div>
  `;

  container.innerHTML = html;

  // 綁定按鈕事件
  document.getElementById('btn-admin-reset').addEventListener('click', async () => {
    if (confirm('確定要將系統重置為出廠預設資料嗎？這將刪除所有自行新增的貼文與註冊用戶。')) {
      try {
        showToast("正在重置系統資料...");
        localStorage.removeItem('aurawall_seeded');

        // Delete all posts
        const postsSnapshot = await db.collection('posts').get();
        const postDeletePromises = [];
        postsSnapshot.forEach(doc => {
          postDeletePromises.push(doc.ref.delete());
        });
        await Promise.all(postDeletePromises);

        // Delete all users
        const usersSnapshot = await db.collection('users').get();
        const userDeletePromises = [];
        usersSnapshot.forEach(doc => {
          userDeletePromises.push(doc.ref.delete());
        });
        await Promise.all(userDeletePromises);

        showToast('系統已重置為出廠預設資料');
      } catch (err) {
        console.error("Reset system error:", err);
        showToast("❌ 重置系統失敗");
      }
    }
  });

  document.getElementById('btn-admin-gen10').addEventListener('click', () => {
    const originalLength = posts.length;
    const testUsers = [
      { name: "愛貓旅行家", handle: "@cat_traveler", avatar: "https://i.pinimg.com/736x/b6/c2/35/b6c23505a33a6674c1ecd418615ed257.jpg" },
      { name: "美食探店王", handle: "@foodie_king", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" },
      { name: "健身教練 Leon", handle: "@leon_workout", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" }
    ];

    const batch = db.batch();
    for (let i = 1; i <= 10; i++) {
      const u = testUsers[Math.floor(Math.random() * testUsers.length)];
      const idx = originalLength + i;
      const newPostId = `test-gen-${Date.now()}-${idx}`;
      const newPost = {
        id: newPostId,
        authorName: u.name,
        authorHandle: u.handle,
        authorAvatar: u.avatar,
        content: `這是後台系統生成的測試貼文 #${idx}。今天天氣晴朗，最適合分享各種生活隨想與美學靈感！✨ #Testing #Admin`,
        image: null,
        timestamp: new Date(Date.now() - i * 600000).toISOString(),
        likes: Math.floor(Math.random() * 150),
        isLiked: false,
        isBookmarked: false,
        comments: [],
        tags: ["Testing", "Admin"]
      };
      const docRef = db.collection('posts').doc(newPostId);
      batch.set(docRef, newPost);
    }

    batch.commit()
      .then(() => {
        showToast('已成功生成 10 則測試貼文！');
      })
      .catch((err) => {
        console.error("Error generating posts:", err);
        showToast("❌ 生成貼文失敗");
      });
  });

  document.getElementById('btn-admin-clear-all').addEventListener('click', async () => {
    if (confirm('確定要清空平台上的所有貼文嗎？')) {
      try {
        const postsSnapshot = await db.collection('posts').get();
        const batch = db.batch();
        postsSnapshot.forEach(doc => {
          batch.delete(doc.ref);
        });
        await batch.commit();
        showToast('已清空平台上的所有貼文');
      } catch (err) {
        console.error("Error clearing posts:", err);
        showToast("❌ 清空貼文失敗");
      }
    }
  });
}

function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, function (m) {
    switch (m) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      case "'": return '&#039;';
      default: return m;
    }
  });
}

// ==========================================
// 10. PRIVATE MESSAGES LOGIC (私訊功能模組 - 浮動小視窗已移除)
// ==========================================


// ==========================================
// 11. MAIN CHAT PAGE CONTROLLER (主要私訊頁面控制模組)
// ==========================================
let currentChatMainTarget = null;
let chatMainListener = null;
let currentReplyMessage = null;
let globalMessagesListener = null;
let unreadCounts = {};

function renderChatMainPage() {
  elements.postsFeed.innerHTML = `
    <div class="chat-main-layout">
      <!-- Left sidebar: Contact list -->
      <aside class="chat-sidebar-users">
        <div class="chat-users-header">
          <i class="fa-solid fa-users"></i>
          <span>聯絡人列表</span>
        </div>
        <div class="chat-users-list" id="chat-main-users-list">
          <!-- Rendered dynamically -->
        </div>
      </aside>
      
      <!-- Right pane: Chat room -->
      <div class="chat-room-pane" id="chat-main-room-pane">
        <!-- Rendered dynamically depending on if a target is selected -->
      </div>
    </div>
  `;

  // Render contacts list
  renderChatMainUsersList();

  // Render the chat room (empty state initially)
  renderChatMainRoom();
}

function renderChatMainUsersList() {
  const usersListEl = document.getElementById('chat-main-users-list');
  if (!usersListEl) return;

  usersListEl.innerHTML = '';

  // Filter out current logged-in user
  const contacts = allUsers.filter(u => u.handle !== currentUser.handle);

  if (contacts.length === 0) {
    usersListEl.innerHTML = `
      <div style="text-align: center; padding: 20px; color: var(--text-muted); font-size: 13px;">
        目前沒有其他使用者
      </div>
    `;
    return;
  }

  // 分成可私訊與不可私訊兩組
  const allowed = contacts.filter(u => canDMUser(u.handle));
  const locked = contacts.filter(u => !canDMUser(u.handle));

  function buildItem(user, isLocked) {
    const item = document.createElement('div');
    const isActive = currentChatMainTarget && currentChatMainTarget.handle === user.handle;
    item.className = `chat-user-item ${isActive ? 'active' : ''} ${isLocked ? 'locked-item' : ''}`;
    item.style.opacity = isLocked ? '0.7' : '1';
    item.style.cursor = 'pointer';

    const avatarSrc = user.avatar || getFallbackAvatar(user.handle);
    const count = unreadCounts[user.handle] || 0;
    const badgeHtml = count > 0 ? `<span class="chat-unread-badge">${count}</span>` : '';

    item.innerHTML = `
      <img src="${avatarSrc}" alt="avatar" class="chat-user-item-avatar">
      <div class="chat-user-item-info">
        <div style="display:flex; justify-content:space-between; align-items:center; width:100%;">
          <span class="chat-user-item-name">${escapeHTML(user.username)}</span>
          ${badgeHtml}
        </div>
        <span class="chat-user-item-handle">${escapeHTML(user.handle)}</span>
        ${isLocked ? '<span style="font-size:10px;color:var(--text-muted);">🔒 需要互追才能私訊</span>' : '<span style="font-size:10px;color:var(--tag-text);">💬 可以私訊</span>'}
      </div>
    `;

    item.addEventListener('click', () => {
      selectChatMainTarget(user);
    });

    usersListEl.appendChild(item);
  }

  // 可私訊的放上面
  allowed.forEach(u => buildItem(u, false));

  // 分隔線（如果有鎖定用戶）
  if (locked.length > 0 && allowed.length > 0) {
    const sep = document.createElement('div');
    sep.style.cssText = 'border-top: 1px solid var(--glass-border); margin: 6px 8px; padding-top: 6px; font-size: 11px; color: var(--text-muted); padding-left: 4px;';
    sep.textContent = '尚未互追';
    usersListEl.appendChild(sep);
  }

  // 無法私訊的放下面（灰暗顯示）
  locked.forEach(u => buildItem(u, true));
}

function renderChatMainRoom() {
  const roomPaneEl = document.getElementById('chat-main-room-pane');
  if (!roomPaneEl) return;

  if (!currentChatMainTarget) {
    roomPaneEl.innerHTML = `
      <div class="chat-room-empty">
        <i class="fa-regular fa-comments"></i>
        <h3>開始私訊聊天</h3>
        <p>從左側聯絡人列表中選擇一位社群好友，即可開始進行安全的即時私密對話 ✨</p>
      </div>
    `;
    return;
  }

  const avatarSrc = currentChatMainTarget.avatar || getFallbackAvatar(currentChatMainTarget.handle);
  const alreadyFollowing = isFollowing(currentChatMainTarget.handle);
  const isDMAllowed = canDMUser(currentChatMainTarget.handle);

  roomPaneEl.innerHTML = `
    <div class="chat-room-header">
      <div class="chat-room-target">
        <img src="${avatarSrc}" alt="avatar" class="chat-room-target-avatar">
        <div class="chat-room-target-info">
          <span class="chat-room-target-name">${escapeHTML(currentChatMainTarget.username)}</span>
          <span class="chat-room-target-handle">${escapeHTML(currentChatMainTarget.handle)}</span>
        </div>
      </div>
      <button class="chat-room-follow-btn ${alreadyFollowing ? 'following' : ''}" id="btn-chat-follow-toggle">
        <i class="fa-solid ${alreadyFollowing ? 'fa-check' : 'fa-user-plus'}"></i>
        <span>${alreadyFollowing ? '已追蹤' : '追蹤'}</span>
      </button>
    </div>
    
    <div class="chat-room-messages" id="chat-main-messages-body">
      <!-- Loaded dynamically -->
    </div>
    
    <div class="chat-reply-preview-bar" id="chat-main-reply-preview" style="display: none;">
      <div class="chat-reply-preview-content">
        <i class="fa-solid fa-reply" style="font-size:12px; margin-right:6px; color: var(--tag-text);"></i>
        <span>回覆給 <strong id="chat-reply-user"></strong>：<span id="chat-reply-text"></span></span>
      </div>
      <button class="chat-reply-cancel-btn" id="btn-chat-reply-cancel" type="button"><i class="fa-solid fa-xmark"></i></button>
    </div>
    
    <div class="chat-room-input-container" style="position: relative;">
      <!-- Chat Emoji Picker Popup -->
      <div class="chat-emoji-picker-popup" id="chat-emoji-picker" style="display: none;">
        <div class="chat-emoji-picker-header">
          <span>選擇表情符號</span>
          <button type="button" class="btn-close-chat-emoji" id="btn-close-chat-emoji"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="chat-emoji-grid" id="chat-emoji-grid"></div>
      </div>

      <!-- Chat GIF Picker Popup -->
      <div class="chat-gif-picker-popup" id="chat-gif-picker" style="display: none;">
        <div class="chat-gif-picker-header">
          <span>選擇 GIF 動圖</span>
          <button type="button" class="btn-close-chat-gif" id="btn-close-chat-gif"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="chat-gif-search-container">
          <input type="text" placeholder="搜尋梗圖倉庫..." class="chat-gif-search-input" id="chat-gif-search-field">
          <i class="fa-solid fa-magnifying-glass chat-gif-search-icon"></i>
        </div>
        <div class="chat-gif-grid" id="chat-gif-grid"></div>
      </div>

      <form class="chat-room-input-form" id="chat-main-input-form">
        <button type="button" class="chat-gif-trigger-btn" id="btn-chat-gif-trigger" ${isDMAllowed ? '' : 'disabled'} title="傳送 GIF 動圖">GIF</button>
        <input type="text" placeholder="${isDMAllowed ? '輸入訊息...' : '🔒 雙方至少需要有一方追蹤對方才能傳送訊息'}" class="chat-room-input" id="chat-main-input-field" required autocomplete="off" ${isDMAllowed ? '' : 'disabled'}>
        <button type="button" class="chat-emoji-trigger-btn" id="btn-chat-emoji-trigger" ${isDMAllowed ? '' : 'disabled'} title="插入表情符號">
          <i class="fa-regular fa-face-smile"></i>
        </button>
        <button type="submit" class="chat-room-send-btn" title="發送訊息" ${isDMAllowed ? '' : 'disabled'} style="${isDMAllowed ? '' : 'opacity: 0.5; cursor: not-allowed;'}">
          <i class="fa-solid fa-paper-plane"></i>
        </button>
      </form>
    </div>
  `;

  // ── 追蹤 / 取消追蹤按鈕 ──────────────────────────────
  const followToggleBtn = document.getElementById('btn-chat-follow-toggle');
  if (followToggleBtn) {
    const btnSpan = followToggleBtn.querySelector('span');
    const btnIcon = followToggleBtn.querySelector('i');

    // Hover：已追蹤時 hover 改顯示「取消追蹤」提示
    followToggleBtn.addEventListener('mouseenter', () => {
      if (followToggleBtn.classList.contains('following')) {
        btnSpan.textContent = '取消追蹤';
        btnIcon.className = 'fa-solid fa-user-minus';
      }
    });
    followToggleBtn.addEventListener('mouseleave', () => {
      if (followToggleBtn.classList.contains('following')) {
        btnSpan.textContent = '已追蹤';
        btnIcon.className = 'fa-solid fa-check';
      }
    });

    followToggleBtn.addEventListener('click', async () => {
      const targetHandle = currentChatMainTarget.handle;
      const targetName = currentChatMainTarget.username;
      const nowFollowing = followToggleBtn.classList.contains('following');

      // ── 樂觀更新 UI（先切換，再等 API 確認）──
      toggleFollowing(targetHandle, targetName);

      if (nowFollowing) {
        // 取消追蹤 → 變成實心紫色「追蹤」
        followToggleBtn.classList.remove('following');
        btnSpan.textContent = '追蹤';
        btnIcon.className = 'fa-solid fa-user-plus';
      } else {
        // 追蹤 → 變成 outline「已追蹤」
        followToggleBtn.classList.add('following');
        btnSpan.textContent = '已追蹤';
        btnIcon.className = 'fa-solid fa-check';
      }

      // ── API 預留區塊（之後可串接後端資料庫）──────────
      // try {
      //   await fetch('/api/follow', {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify({
      //       followerHandle: currentUser.handle,
      //       targetHandle:   targetHandle,
      //       action: nowFollowing ? 'unfollow' : 'follow'
      //     })
      //   });
      // } catch (err) {
      //   console.error('Follow API error:', err);
      //   // 若 API 失敗，回滾 UI
      //   toggleFollowing(targetHandle, targetName);
      // }
      // ─────────────────────────────────────────────────

      // 重新整理聯絡人列表與聊天室（鎖定/解鎖狀態可能改變，且重新渲染輸入欄）
      renderChatMainUsersList();
      renderChatMainRoom();
    });
  }

  // Bind input form submit
  const inputForm = document.getElementById('chat-main-input-form');
  const inputField = document.getElementById('chat-main-input-field');
  if (inputForm && inputField) {
    inputForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = inputField.value.trim();
      if (text) {
        sendChatMainMessage(text);
      }
    });
  }

  // Bind cancel reply button
  const cancelReplyBtn = document.getElementById('btn-chat-reply-cancel');
  if (cancelReplyBtn) {
    cancelReplyBtn.addEventListener('click', clearReplyMessage);
  }

  // Bind Chat Emoji Trigger Button
  const emojiTriggerBtn = document.getElementById('btn-chat-emoji-trigger');
  const chatEmojiPicker = document.getElementById('chat-emoji-picker');
  const closeChatEmojiBtn = document.getElementById('btn-close-chat-emoji');

  if (emojiTriggerBtn && chatEmojiPicker) {
    emojiTriggerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isVisible = chatEmojiPicker.style.display === 'flex';
      chatEmojiPicker.style.display = isVisible ? 'none' : 'flex';
      const chatGifPicker = document.getElementById('chat-gif-picker');
      if (chatGifPicker) chatGifPicker.style.display = 'none';
      if (!isVisible) {
        initChatEmojiPicker();
      }
    });
  }

  if (closeChatEmojiBtn && chatEmojiPicker) {
    closeChatEmojiBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      chatEmojiPicker.style.display = 'none';
    });
  }

  // Close pickers when clicking anywhere else
  document.addEventListener('click', () => {
    const picker = document.getElementById('chat-emoji-picker');
    if (picker) picker.style.display = 'none';
    const gifPicker = document.getElementById('chat-gif-picker');
    if (gifPicker) gifPicker.style.display = 'none';
  });

  // Prevent closing when clicking inside the picker
  if (chatEmojiPicker) {
    chatEmojiPicker.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  // Bind Chat GIF Trigger Button
  const gifTriggerBtn = document.getElementById('btn-chat-gif-trigger');
  const chatGifPicker = document.getElementById('chat-gif-picker');
  const closeChatGifBtn = document.getElementById('btn-close-chat-gif');
  const gifSearchField = document.getElementById('chat-gif-search-field');

  if (gifTriggerBtn && chatGifPicker) {
    gifTriggerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isVisible = chatGifPicker.style.display === 'flex';
      chatGifPicker.style.display = isVisible ? 'none' : 'flex';
      if (chatEmojiPicker) chatEmojiPicker.style.display = 'none';
      if (!isVisible) {
        if (gifSearchField) gifSearchField.value = '';
        fetchGIFs(''); // Load trending initially
      }
    });
  }

  if (closeChatGifBtn && chatGifPicker) {
    closeChatGifBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      chatGifPicker.style.display = 'none';
    });
  }

  if (chatGifPicker) {
    chatGifPicker.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  if (gifSearchField) {
    let searchTimeout = null;
    gifSearchField.addEventListener('input', () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        const query = gifSearchField.value.trim();
        fetchGIFs(query);
      }, 400);
    });
  }

  // Start messages real-time sync for this room
  startChatMainListener();
}

function selectChatMainTarget(user) {
  currentChatMainTarget = user;
  clearReplyMessage();

  // Refresh contact list active status
  renderChatMainUsersList();

  // Refresh chat room view
  renderChatMainRoom();
}

function startChatMainListener() {
  if (chatMainListener) chatMainListener(); // unsubscribe

  const messagesBody = document.getElementById('chat-main-messages-body');
  if (!messagesBody || !currentChatMainTarget || !currentUser) return;

  chatMainListener = db.collection('messages')
    .orderBy('timestamp', 'asc')
    .onSnapshot((snapshot) => {
      messagesBody.innerHTML = '';
      let hasMessages = false;

      snapshot.forEach((doc) => {
        const msg = doc.data();
        const isSentByMe = msg.senderHandle === currentUser.handle && msg.receiverHandle === currentChatMainTarget.handle;
        const isReceivedByMe = msg.senderHandle === currentChatMainTarget.handle && msg.receiverHandle === currentUser.handle;

        if (isSentByMe || isReceivedByMe) {
          hasMessages = true;

          if (isReceivedByMe && msg.isRead !== true) {
            db.collection('messages').doc(doc.id).update({ isRead: true }).catch(e => { });
          }

          const row = document.createElement('div');
          row.className = `chat-message-row ${isSentByMe ? 'sent' : 'received'}`;

          const replyBtn = document.createElement('button');
          replyBtn.className = 'chat-reply-btn';
          replyBtn.type = 'button';
          replyBtn.title = '回覆此訊息';
          replyBtn.innerHTML = '<i class="fa-solid fa-reply"></i>';
          replyBtn.addEventListener('click', () => {
            setReplyMessage(msg.senderName, msg.text);
          });

          const bubble = document.createElement('div');
          bubble.className = `chat-bubble ${isSentByMe ? 'sent' : 'received'}`;

          if (msg.replyToUser && msg.replyToText) {
            const quoteDiv = document.createElement('div');
            quoteDiv.className = 'chat-bubble-reply-quote';
            quoteDiv.innerHTML = `
              <div class="reply-quote-user">@${escapeHTML(msg.replyToUser)}</div>
              <div class="reply-quote-text">${escapeHTML(msg.replyToText)}</div>
            `;
            bubble.appendChild(quoteDiv);
          }

          if (msg.gif) {
            const img = document.createElement('img');
            img.src = msg.gif;
            img.style.cssText = "max-width: 100%; border-radius: 12px; display: block; max-height: 180px; object-fit: cover;";
            img.alt = "GIF";
            img.loading = "lazy";
            bubble.appendChild(img);
            bubble.style.padding = '8px';
            bubble.style.background = 'transparent';
            bubble.style.border = 'none';
            img.style.border = '1px solid var(--glass-border)';
          } else {
            const textSpan = document.createElement('span');
            textSpan.textContent = msg.text;
            bubble.appendChild(textSpan);
          }

          if (isSentByMe) {
            row.appendChild(replyBtn);
            row.appendChild(bubble);
          } else {
            row.appendChild(bubble);
            row.appendChild(replyBtn);
          }

          messagesBody.appendChild(row);
        }
      });

      if (!hasMessages) {
        messagesBody.innerHTML = `
          <div class="chat-empty-state">
            <i class="fa-regular fa-paper-plane"></i>
            <p>與 <strong>${escapeHTML(currentChatMainTarget.username)}</strong> 開始對話...<br>傳送第一則溫慢訊息吧 ✨</p>
          </div>
        `;
      }

      // Auto scroll to bottom
      messagesBody.scrollTop = messagesBody.scrollHeight;
    }, (err) => {
      console.error("Error loading chat messages in main layout:", err);
    });
}

function sendChatMainMessage(text, gifUrl = null) {
  if (!currentChatMainTarget || (!text.trim() && !gifUrl) || !currentUser) return;

  const msgObj = {
    senderHandle: currentUser.handle,
    senderName: currentUser.username,
    receiverHandle: currentChatMainTarget.handle,
    receiverName: currentChatMainTarget.username,
    text: text.trim(),
    timestamp: new Date().toISOString(),
    isRead: false
  };

  if (gifUrl) {
    msgObj.gif = gifUrl;
  }

  if (currentReplyMessage) {
    msgObj.replyToUser = currentReplyMessage.user;
    msgObj.replyToText = currentReplyMessage.text;
  }

  db.collection('messages').add(msgObj)
    .then(() => {
      const inputField = document.getElementById('chat-main-input-field');
      if (inputField) inputField.value = '';
      clearReplyMessage();
    })
    .catch((err) => {
      console.error("Error sending message in main layout:", err);
      showToast("❌ 傳送訊息失敗，請重試");
    });
}

function setReplyMessage(senderName, text) {
  currentReplyMessage = {
    user: senderName,
    text: text
  };

  const previewBar = document.getElementById('chat-main-reply-preview');
  const previewUser = document.getElementById('chat-reply-user');
  const previewText = document.getElementById('chat-reply-text');

  if (previewBar && previewUser && previewText) {
    previewUser.textContent = senderName;
    previewText.textContent = text;
    previewBar.style.display = 'flex';
  }

  const inputField = document.getElementById('chat-main-input-field');
  if (inputField) inputField.focus();
}

function clearReplyMessage() {
  currentReplyMessage = null;
  const previewBar = document.getElementById('chat-main-reply-preview');
  if (previewBar) {
    previewBar.style.display = 'none';
  }
}

function startGlobalMessagesListener() {
  if (globalMessagesListener) {
    globalMessagesListener();
    globalMessagesListener = null;
  }
  unreadCounts = {};

  const loggedInUser = localStorage.getItem('aurawall_logged_in_user');
  if (!loggedInUser) {
    const chatDot = document.getElementById('menu-chat-unread-dot');
    if (chatDot) chatDot.style.display = 'none';
    return;
  }
  const user = JSON.parse(loggedInUser);

  globalMessagesListener = db.collection('messages')
    .onSnapshot((snapshot) => {
      unreadCounts = {};
      snapshot.forEach((doc) => {
        const msg = doc.data();
        if (msg.receiverHandle === user.handle && msg.isRead !== true) {
          if (currentChatMainTarget && currentChatMainTarget.handle === msg.senderHandle && currentMenuTab === 'chat') {
            db.collection('messages').doc(doc.id).update({ isRead: true }).catch(err => { });
          } else {
            unreadCounts[msg.senderHandle] = (unreadCounts[msg.senderHandle] || 0) + 1;
          }
        }
      });

      // Update unread red dot on the sidebar "私訊聊天" menu item
      const totalUnread = Object.values(unreadCounts).reduce((sum, count) => sum + count, 0);
      const chatDot = document.getElementById('menu-chat-unread-dot');
      if (chatDot) {
        chatDot.style.display = totalUnread > 0 ? 'inline-block' : 'none';
      }

      if (currentMenuTab === 'chat') {
        renderChatMainUsersList();
      }
    }, (err) => {
      console.error("Error listening to global messages:", err);
    });
}

function markMessagesAsRead(contactHandle) {
  if (!currentUser || !currentUser.handle || !contactHandle) return;

  db.collection('messages')
    .where('senderHandle', '==', contactHandle)
    .where('receiverHandle', '==', currentUser.handle)
    .where('isRead', '==', false)
    .get()
    .then((snapshot) => {
      if (snapshot.empty) return;
      const batch = db.batch();
      snapshot.forEach((doc) => {
        batch.update(doc.ref, { isRead: true });
      });
      batch.commit().catch(err => console.error("Error marking read batch:", err));
    })
    .catch(err => console.error("Error getting unread messages to mark:", err));
}

function initChatEmojiPicker() {
  const emojiGrid = document.getElementById('chat-emoji-grid');
  if (!emojiGrid) return;

  emojiGrid.innerHTML = '';
  EMOJI_CATEGORIES.forEach(category => {
    category.emojis.forEach(emoji => {
      const span = document.createElement('span');
      span.className = 'chat-emoji-item';
      span.textContent = emoji;
      span.addEventListener('click', (e) => {
        e.stopPropagation();
        const inputField = document.getElementById('chat-main-input-field');
        if (inputField) {
          const start = inputField.selectionStart;
          const end = inputField.selectionEnd;
          const text = inputField.value;
          inputField.value = text.slice(0, start) + emoji + text.slice(end);
          inputField.selectionStart = inputField.selectionEnd = start + emoji.length;
          inputField.focus();
        }
        const picker = document.getElementById('chat-emoji-picker');
        if (picker) picker.style.display = 'none';
      });
      emojiGrid.appendChild(span);
    });
  });
}

let localMemesCached = null;

async function loadLocalMemes() {
  if (localMemesCached) return localMemesCached;
  try {
    let basePath = window.location.pathname;
    if (basePath.endsWith('.html')) {
      basePath = basePath.substring(0, basePath.lastIndexOf('/') + 1);
    } else if (!basePath.endsWith('/')) {
      basePath = basePath + '/';
    }
    const jsonUrl = window.location.origin + basePath + 'memes_db.json';
    const res = await fetch(jsonUrl);
    if (res.ok) {
      localMemesCached = await res.json();
      return localMemesCached;
    }
  } catch (e) {
    console.warn("Failed to load local memes database:", e);
  }
  return [];
}

// Preset animated GIFs from memes.tw
const PRESET_GIFS = [
  "https://memeprod.ap-south-1.linodeobjects.com/user-gif-thumbnail/4b34911ea8094681399225453cae56cb.gif",
  "https://memeprod.ap-south-1.linodeobjects.com/user-gif-thumbnail/0d3553e9b941c93334776ab717cfcb8b.gif",
  "https://memeprod.ap-south-1.linodeobjects.com/user-gif-thumbnail/48407d0b4fb30acf883db2ac74dbc3c2.gif",
  "https://memeprod.ap-south-1.linodeobjects.com/user-gif-thumbnail/0205a2fbd5e582d17e0355a14bc57407.gif",
  "https://memeprod.ap-south-1.linodeobjects.com/user-gif-thumbnail/f0e8f0e773fcaf14b2d62424f361e2d4.gif",
  "https://memeprod.ap-south-1.linodeobjects.com/user-gif-thumbnail/7a125132fc9340e31ea1e0f944d10477.gif",
  "https://memeprod.ap-south-1.linodeobjects.com/user-gif-thumbnail/aa9dc17ce3da9537067dd301e8292332.gif",
  "https://memeprod.ap-south-1.linodeobjects.com/user-gif-thumbnail/1d52a23dfe66c7fa34e594d4fcdec605.gif",
  "https://memeprod.ap-south-1.linodeobjects.com/user-gif-thumbnail/c48a4ca2eb91060232ac136193cb6659.gif",
  "https://memeprod.ap-south-1.linodeobjects.com/user-gif-thumbnail/379f016d3df0a601f287ea28e62faee7.gif",
  "https://memeprod.ap-south-1.linodeobjects.com/user-gif-thumbnail/52d287bbd49607eb3e7bde37b0bf5700.gif",
  "https://memeprod.ap-south-1.linodeobjects.com/user-gif-thumbnail/16f425cbea3e442b126814989dbe629c.gif"
];

let currentSearchSessionId = 0;

function renderGifGrid(urls) {
  const grid = document.getElementById('chat-gif-grid');
  if (!grid) return;
  grid.innerHTML = '';

  if (urls.length === 0) {
    grid.innerHTML = '<div style="grid-column: span 2; text-align: center; font-size: 11px; color: var(--text-muted); padding: 20px;">找不到相關 GIF</div>';
    return;
  }

  urls.slice(0, 80).forEach(url => {
    const img = document.createElement('img');
    img.className = 'chat-gif-item';
    img.src = url;
    img.alt = "Meme GIF";
    img.loading = "lazy";
    img.addEventListener('click', () => {
      sendChatMainMessage('[GIF]', url);
      const picker = document.getElementById('chat-gif-picker');
      if (picker) picker.style.display = 'none';
    });
    grid.appendChild(img);
  });
}

async function fetchGIFs(query = '') {
  const grid = document.getElementById('chat-gif-grid');
  if (!grid) return;

  const sessionId = ++currentSearchSessionId;

  // 1. Load from local database first to ensure instant results
  const localMemes = await loadLocalMemes();
  let filteredLocal = [];

  if (query.trim()) {
    const q = query.trim().toLowerCase();
    filteredLocal = localMemes.filter(item =>
      (item.title && item.title.toLowerCase().includes(q)) ||
      (item.tag && item.tag.toLowerCase().includes(q))
    );
  } else {
    // Show trending/popular ones when no query
    filteredLocal = localMemes.filter(item => item.tag === '熱門');
    if (filteredLocal.length === 0) {
      filteredLocal = localMemes.slice(0, 48);
    }
  }

  // Fallback to presets if database didn't load and no query
  if (filteredLocal.length === 0 && !query.trim()) {
    filteredLocal = PRESET_GIFS.map(url => ({ url, title: 'Preset', tag: '熱門' }));
  }

  // Render local results immediately
  if (sessionId === currentSearchSessionId) {
    renderGifGrid(filteredLocal.map(item => item.url));
  }

  // 2. Concurrently try to scrape fresh results from memes.tw via proxies in the background
  const targetUrl = query.trim()
    ? `https://memes.tw/gif?q=${encodeURIComponent(query)}`
    : `https://memes.tw/gif`;

  const proxies = [
    `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`,
    `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`
  ];

  (async () => {
    let htmlContent = '';
    for (const proxyUrl of proxies) {
      if (sessionId !== currentSearchSessionId) return;
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000); // 4s timeout

        const res = await fetch(proxyUrl, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (!res.ok) continue;
        if (proxyUrl.includes('allorigins')) {
          const json = await res.json();
          htmlContent = json.contents;
        } else {
          htmlContent = await res.text();
        }
        if (htmlContent && htmlContent.includes('memeprod')) {
          break; // Success
        }
      } catch (e) {
        console.warn("Proxy background fetch failed:", proxyUrl, e);
      }
    }

    if (sessionId !== currentSearchSessionId) return;

    if (htmlContent) {
      const matches = htmlContent.match(/https:\/\/memeprod\.[^"\s']+\.gif/g) || [];
      const scrapedUrls = [...new Set(matches)];
      if (scrapedUrls.length > 0) {
        const localUrls = filteredLocal.map(item => item.url);
        const finalGifs = [...new Set([...scrapedUrls, ...localUrls])];
        renderGifGrid(finalGifs);
      }
    }
  })();
}

function renderPresetGIFs() {
  const grid = document.getElementById('chat-gif-grid');
  if (!grid) return;

  grid.innerHTML = '';
  PRESET_GIFS.forEach(url => {
    const img = document.createElement('img');
    img.className = 'chat-gif-item';
    img.src = url;
    img.alt = "Preset GIF";
    img.loading = "lazy";
    img.addEventListener('click', () => {
      sendChatMainMessage('[GIF]', url);
      const picker = document.getElementById('chat-gif-picker');
      if (picker) picker.style.display = 'none';
    });
    grid.appendChild(img);
  });
}

function updateFirestoreAvatars() {
  const avatarMap = {
    "@code_art": "https://www.ls-design.com.tw/UserFiles/kindeditor/image/20191121/img-1573540369-29739@900.jpg",
    "@film_notes": "https://collections.culture.tw/ShowGalImage.aspx?SYSUID=26&IMG=5MK85TMRK2MQMG0OMLM4MMMJMKMAMB5NM8M6MF0OMX5G5309KX59M7M1MQMWM6M1MH5353KHMI0BMDMIKN5EKKMM090IMHKDKC55KHKKMZ080OMI095EKMK6KL5E5UMBKGK2K8KBKMK5KJMWMRKAKPM65RKX5301MAMI0ZMD0WMAMZ0IM40O0WMB&TEXT=K7KG575Y&FROM=5YKK57",
    "@veggie_kitchen": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP8ebClCpS-BYL01u1t1qVMUwqvD7PWvzBuw&s"
  };

  // 1. Update posts collection
  db.collection('posts').get().then((snapshot) => {
    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.authorHandle && avatarMap[data.authorHandle]) {
        const newAvatar = avatarMap[data.authorHandle];
        if (data.authorAvatar !== newAvatar) {
          db.collection('posts').doc(doc.id).update({
            authorAvatar: newAvatar
          }).catch(err => console.error("Error updating post avatar:", err));
        }
      }
    });
  }).catch(err => console.error("Error getting posts for avatar update:", err));

  // 2. Update users collection
  db.collection('users').get().then((snapshot) => {
    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.handle && avatarMap[data.handle]) {
        const newAvatar = avatarMap[data.handle];
        if (data.avatar !== newAvatar) {
          db.collection('users').doc(doc.id).update({
            avatar: newAvatar
          }).catch(err => console.error("Error updating user avatar:", err));
        }
      }
    });
  }).catch(err => console.error("Error getting users for avatar update:", err));
}
// ==========================================
// 1. MOCK DATA & CONSTANTS (模擬資料與常數)
// ==========================================

// 預設發文者身分 (免登入，打開網頁直接以此身分進行互動)
const DEFAULT_USER = {
  username: "Aura User",
  handle: "@aura_explorer",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
};

// 初始預設的動態牆貼文資料
let posts = [
  {
    id: "post-1",
    authorName: "極簡美學家",
    authorHandle: "@minimal_design",
    authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120",
    content: "今天嘗試將工作空間進行了極簡化改造。只留下必備的物品，讓大腦擁有更多呼吸的空間。你也是極簡主義的愛好者嗎？ #Design #Workspace #Minimalism",
    image: "https://images.unsplash.com/photo-1499955085172-a104c9463ece?w=800",
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(), // 2小時前
    likes: 42,
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
    content: "寫程式就像是在畫布上編織邏輯之美。這款全新的玻璃擬態（Glassmorphism）介面真的讓人愛不釋手！✨ #Coding #WebDev #UIUX",
    image: null,
    timestamp: new Date(Date.now() - 3600000 * 5).toISOString(), // 5小時前
    likes: 18,
    isLiked: false,
    isBookmarked: false,
    comments: [],
    tags: ["Coding", "WebDev", "UIUX"]
  }
];

// 預設快捷圖片庫 (供發文時快速點選附加)
const PRESET_POST_IMAGES = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500",
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=500",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500"
];

// 預設表情符號清單
const PRESET_EMOJIS = ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🤩", "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬", "🤯", "😳", "🥵", "🥶", "😱", "😨", "😰", "😥", "😓", "🤗", "🤔", "🤭", "🤫", "🤥", "😶", "😐", "😑", "😬", "🙄", "😯", "😦", "😧", "😮", "😲", "🥱", "😴", "🤤", "😪", "😵", "🤐", "🥴", "🤢", "🤮", "🤧", "😷", "🤒", "🤕", "🤑", "🤠", "😈", "👿", "👹", "👺", "🤡", "💩", "👻", "💀", "☠️", "👽", "👾", "🤖", "🎃", "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾"];

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

  // 外觀模式與提示
  btnThemeToggle: document.getElementById('btn-theme-toggle'),
  themeIcon: document.getElementById('theme-icon'),
  toastContainer: document.getElementById('toast-container')
};

// ==========================================
// 3. INITIALIZATION (初始化啟動)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initEventListeners();
  initPresets();
  renderApp();
  showToast("歡迎回來！AuraWall 已成功解鎖，免登入直接探索。");
});

// 外觀主題設定初始化
function initTheme() {
  const savedTheme = localStorage.getItem('aurawall-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  if (elements.themeIcon) {
    elements.themeIcon.className = savedTheme === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }
}

// 預載貼圖、表情包清單
function initPresets() {
  if (elements.randomPresetGrid) {
    elements.randomPresetGrid.innerHTML = '';
    PRESET_POST_IMAGES.forEach(url => {
      const img = document.createElement('img');
      img.src = url;
      img.addEventListener('click', () => {
        selectedPostImageUrl = url;
        updateImagePreview();
        elements.imageUrlPopup.style.display = 'none';
      });
      elements.randomPresetGrid.appendChild(img);
    });
  }

  if (elements.emojiGrid) {
    elements.emojiGrid.innerHTML = '';
    PRESET_EMOJIS.forEach(emoji => {
      const span = document.createElement('span');
      span.textContent = emoji;
      span.style.cursor = 'pointer';
      span.addEventListener('click', () => {
        elements.postInputText.value += emoji;
        elements.emojiPickerPopup.style.display = 'none';
        elements.postInputText.focus();
      });
      elements.emojiGrid.appendChild(span);
    });
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

  // 圖片附檔選單開關
  elements.btnTriggerImagePopup.addEventListener('click', (e) => {
    e.stopPropagation();
    const disp = elements.imageUrlPopup.style.display;
    elements.imageUrlPopup.style.display = disp === 'block' ? 'none' : 'block';
    elements.emojiPickerPopup.style.display = 'none';
  });
  elements.btnCloseUrlPopup.addEventListener('click', () => {
    elements.imageUrlPopup.style.display = 'none';
  });
  elements.btnConfirmImageUrl.addEventListener('click', () => {
    const url = elements.inputImageUrl.value.trim();
    if (url) {
      selectedPostImageUrl = url;
      updateImagePreview();
      elements.inputImageUrl.value = '';
      elements.imageUrlPopup.style.display = 'none';
    }
  });

  // 表情包選單開關
  elements.btnTriggerEmojiPopup.addEventListener('click', (e) => {
    e.stopPropagation();
    const disp = elements.emojiPickerPopup.style.display;
    elements.emojiPickerPopup.style.display = disp === 'block' ? 'none' : 'block';
    elements.imageUrlPopup.style.display = 'none';
  });

  // 點擊空白處關閉浮動視窗
  document.addEventListener('click', () => {
    if (elements.imageUrlPopup) elements.imageUrlPopup.style.display = 'none';
    if (elements.emojiPickerPopup) elements.emojiPickerPopup.style.display = 'none';
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

    const tagsHtml = post.tags.map(t => `<span class="post-tag">#${t}</span>`).join(' ');
    const commentsHtml = post.comments.map(c => `
            <div class="comment-item">
                <strong>${c.authorName}:</strong> <span>${c.content}</span>
            </div>
        `).join('');

    card.innerHTML = `
            <div class="post-card-header">
                <img src="${post.authorAvatar}" alt="頭像" class="user-avatar-sm">
                <div class="post-author-info">
                    <h4 class="author-name">${post.authorName}</h4>
                    <span class="author-handle">${post.authorHandle}</span>
                </div>
                <span class="post-time">${formatTimeAgo(post.timestamp)}</span>
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
    card.querySelector('.btn-like').addEventListener('click', () => {
      post.isLiked = !post.isLiked;
      post.likes += post.isLiked ? 1 : -1;
      renderPosts();
      updateStatsCounter();
    });

    // 珍藏動作
    card.querySelector('.btn-bookmark').addEventListener('click', () => {
      post.isBookmarked = !post.isBookmarked;
      showToast(post.isBookmarked ? "貼文已成功加入收藏清單" : "已從收藏清單中移除");
      renderPosts();
      updateStatsCounter();
    });

    // 展開/關閉留言面板
    const commentSection = card.querySelector('.comments-section');
    card.querySelector('.btn-comment-trigger').addEventListener('click', () => {
      const isHidden = commentSection.style.display === 'none';
      commentSection.style.display = isHidden ? 'block' : 'none';
    });

    // 發表新留言回覆邏輯
    const commentInput = card.querySelector('.input-new-comment');
    const submitComment = () => {
      const commentText = commentInput.value.trim();
      if (commentText) {
        post.comments.push({
          id: 'comment-' + Date.now(),
          authorName: DEFAULT_USER.username,
          content: commentText
        });
        commentInput.value = '';
        renderPosts();
      }
    };
    card.querySelector('.btn-send-comment').addEventListener('click', submitComment);
    commentInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') submitComment(); });

    // 點擊貼文內文字標籤，自動切換篩選
    card.querySelectorAll('.post-tag, .clickable-tag').forEach(tagElement => {
      tagElement.addEventListener('click', (e) => {
        e.preventDefault();
        currentFilterTag = tagElement.textContent.replace('#', '').trim();
        switchMenu('feed');
      });
    });

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

// 推薦追蹤博主列表 (純前端靜態模擬切換)
function renderRecommendations() {
  elements.recommendationsList.innerHTML = `
        <div class="follow-item">
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100" class="user-avatar-sm">
            <div class="follow-info">
                <h5>UIUX 靈感庫</h5>
                <span>@uiux_daily</span>
            </div>
            <button class="btn-follow-mock">追蹤</button>
        </div>
        <div class="follow-item">
            <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100" class="user-avatar-sm">
            <div class="follow-info">
                <h5>美感攝影集</h5>
                <span>@photo_poem</span>
            </div>
            <button class="btn-follow-mock">追蹤</button>
        </div>
    `;
  elements.recommendationsList.querySelectorAll('.btn-follow-mock').forEach(btn => {
    btn.addEventListener('click', () => {
      const isFollowing = btn.classList.contains('following');
      btn.className = isFollowing ? 'btn-follow-mock' : 'btn-follow-mock following';
      btn.textContent = isFollowing ? '追蹤' : '已追蹤';
    });
  });
}

// ==========================================
// 6. FUNCTION HANDLERS (核心功能處理)
// ==========================================

// 處理發佈質感新貼文
function handlePublishPost() {
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
    authorName: DEFAULT_USER.username,
    authorHandle: DEFAULT_USER.handle,
    authorAvatar: DEFAULT_USER.avatar,
    content: textContent,
    image: selectedPostImageUrl,
    timestamp: new Date().toISOString(),
    likes: 0,
    isLiked: false,
    isBookmarked: false,
    comments: [],
    tags: mergedTags.length > 0 ? mergedTags : ["新鮮事"]
  };

  // 插到陣列最前面
  posts.unshift(newPostObj);

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
    span.style.cssText = "background: rgba(59,130,246,0.15); color:var(--tag-text); padding: 2px 8px; border-radius:12px; font-size:12px; margin-right:6px; display:inline-flex; align-items:center; gap:4px; margin-bottom:4px;";
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
  const myPostsCount = posts.filter(p => p.authorHandle === DEFAULT_USER.handle).length;
  const myBookmarksCount = posts.filter(p => p.isBookmarked).length;
  const totalLikes = posts.reduce((sum, p) => sum + p.likes, 0);

  if (elements.profilePostsCount) elements.profilePostsCount.textContent = myPostsCount;
  if (elements.profileLikesCount) elements.profileLikesCount.textContent = totalLikes;
  if (elements.profileBookmarksCount) elements.profileBookmarksCount.textContent = myBookmarksCount;

  if (elements.totalPlatformPosts) elements.totalPlatformPosts.textContent = posts.length;
  if (elements.totalPlatformLikes) elements.totalPlatformLikes.textContent = totalLikes;
}

// ==========================================
// 7. UTILS & HELPERS (輔助工具)
// ==========================================

// 將內文的 #標籤 轉化為可點擊藍色樣式
function linkifyTags(text) {
  return text.replace(/#([\u4e00-\u9fa5_a-zA-Z0-9]+)/g, '<a href="#" class="clickable-tag" style="color:var(--tag-text); text-decoration:none; font-weight:500;">#$1</a>');
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
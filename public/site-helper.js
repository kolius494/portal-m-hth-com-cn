/**
 * site-helper.js - 页面辅助工具模块
 * 提供提示卡片、关键词徽章和访问说明功能
 * 不依赖第三方库
 */
(function() {
  'use strict';

  // 配置数据
  const CONFIG = {
    siteUrl: 'https://portal-m-hth.com.cn',
    keyword: '华体会',
    version: '1.2.0',
    cardPrefix: '提示'
  };

  // 访问说明数据
  const ACCESS_NOTES = [
    { type: 'info', content: '欢迎使用华体会服务，请确保网络畅通' },
    { type: 'success', content: '访问 portal-m-hth.com.cn 获得最新信息' },
    { type: 'warning', content: '请勿在公共网络传输敏感数据' }
  ];

  // 关键词徽章数据
  const KEYWORD_BADGES = [
    { label: '华体会', color: '#4CAF50', icon: '★' },
    { label: '华体会体育', color: '#2196F3', icon: '♦' },
    { label: '华体会娱乐', color: '#FF9800', icon: '♣' }
  ];

  // 提示卡片数据
  const TIP_CARDS = [
    {
      title: '快速入门',
      content: '访问 portal-m-hth.com.cn 获取华体会最新动态',
      category: 'guide'
    },
    {
      title: '安全提示',
      content: '请通过官方渠道使用华体会服务',
      category: 'security'
    },
    {
      title: '功能说明',
      content: '华体会平台提供多元化的娱乐体验',
      category: 'feature'
    }
  ];

  /**
   * 创建提示卡片元素
   * @param {Object} card - 卡片数据
   * @returns {HTMLElement}
   */
  function createTipCard(card) {
    const cardEl = document.createElement('div');
    cardEl.className = 'tip-card tip-card-' + card.category;
    cardEl.setAttribute('data-category', card.category);

    const titleEl = document.createElement('h3');
    titleEl.className = 'tip-card-title';
    titleEl.textContent = card.title;

    const contentEl = document.createElement('p');
    contentEl.className = 'tip-card-content';
    contentEl.textContent = card.content;

    cardEl.appendChild(titleEl);
    cardEl.appendChild(contentEl);

    return cardEl;
  }

  /**
   * 创建关键词徽章元素
   * @param {Object} badge - 徽章数据
   * @returns {HTMLElement}
   */
  function createKeywordBadge(badge) {
    const badgeEl = document.createElement('span');
    badgeEl.className = 'keyword-badge';
    badgeEl.style.backgroundColor = badge.color;
    badgeEl.style.color = '#fff';
    badgeEl.style.padding = '4px 10px';
    badgeEl.style.borderRadius = '12px';
    badgeEl.style.fontSize = '14px';
    badgeEl.style.margin = '0 4px';
    badgeEl.style.display = 'inline-block';

    const iconSpan = document.createElement('span');
    iconSpan.textContent = badge.icon + ' ';
    iconSpan.style.marginRight = '4px';

    const textSpan = document.createElement('span');
    textSpan.textContent = badge.label;

    badgeEl.appendChild(iconSpan);
    badgeEl.appendChild(textSpan);

    return badgeEl;
  }

  /**
   * 创建访问说明列表项
   * @param {Object} note - 说明数据
   * @returns {HTMLElement}
   */
  function createAccessNoteItem(note) {
    const itemEl = document.createElement('div');
    itemEl.className = 'access-note access-note-' + note.type;

    const iconMap = {
      info: 'ℹ️',
      success: '✅',
      warning: '⚠️'
    };

    const iconEl = document.createElement('span');
    iconEl.className = 'note-icon';
    iconEl.textContent = iconMap[note.type] || '•';

    const contentEl = document.createElement('span');
    contentEl.className = 'note-content';
    contentEl.textContent = note.content;

    itemEl.appendChild(iconEl);
    itemEl.appendChild(contentEl);

    return itemEl;
  }

  /**
   * 渲染所有组件到容器
   * @param {string} containerId - 容器元素ID
   */
  function renderToContainer(containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.warn('容器元素 #' + containerId + ' 不存在');
      return;
    }

    // 清除现有内容
    container.innerHTML = '';

    // 添加提示卡片区域
    const cardsSection = document.createElement('div');
    cardsSection.className = 'tip-cards-section';
    const cardsTitle = document.createElement('h2');
    cardsTitle.textContent = CONFIG.cardPrefix + '卡片';
    cardsSection.appendChild(cardsTitle);

    const cardsList = document.createElement('div');
    cardsList.className = 'tip-cards-list';
    TIP_CARDS.forEach(function(card) {
      cardsList.appendChild(createTipCard(card));
    });
    cardsSection.appendChild(cardsList);
    container.appendChild(cardsSection);

    // 添加关键词徽章区域
    const badgesSection = document.createElement('div');
    badgesSection.className = 'keyword-badges-section';
    const badgesTitle = document.createElement('h2');
    badgesTitle.textContent = '关键词徽章';
    badgesSection.appendChild(badgesTitle);

    const badgesList = document.createElement('div');
    badgesList.className = 'keyword-badges-list';
    KEYWORD_BADGES.forEach(function(badge) {
      badgesList.appendChild(createKeywordBadge(badge));
    });
    badgesSection.appendChild(badgesList);
    container.appendChild(badgesSection);

    // 添加访问说明区域
    const notesSection = document.createElement('div');
    notesSection.className = 'access-notes-section';
    const notesTitle = document.createElement('h2');
    notesTitle.textContent = '访问说明';
    notesSection.appendChild(notesTitle);

    const notesList = document.createElement('div');
    notesList.className = 'access-notes-list';
    ACCESS_NOTES.forEach(function(note) {
      notesList.appendChild(createAccessNoteItem(note));
    });
    notesSection.appendChild(notesList);
    container.appendChild(notesSection);
  }

  // 初始化函数
  function init() {
    window.SiteHelper = {
      version: CONFIG.version,
      siteUrl: CONFIG.siteUrl,
      keyword: CONFIG.keyword,
      renderToContainer: renderToContainer,
      createTipCard: createTipCard,
      createKeywordBadge: createKeywordBadge,
      createAccessNoteItem: createAccessNoteItem
    };

    console.log('SiteHelper v' + CONFIG.version + ' 已加载，网站: ' + CONFIG.siteUrl);
  }

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
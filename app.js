/* Mosaic — a static, GitHub Pages-friendly browser workspace. */
(() => {
  'use strict';

  const HOME = 'mosaic://home';
  const NOTES = 'mosaic://notes';
  const STORAGE_KEY = 'mosaic-browser-v1';
  const DEFAULT_NOTE = 'Một vài điều cho hôm nay:\n\n• Bắt đầu với điều quan trọng nhất\n• Ghi lại những ý tưởng mới\n• Đừng quên một khoảng nghỉ';
  const FOCUS_SECONDS = 25 * 60;
  const MOD_LABEL = /Mac|iPhone|iPad|iPod/i.test(navigator.userAgent) ? '⌘' : 'Ctrl';

  const paths = {
    home: '<path d="m3 10 9-7 9 7"/><path d="M5 9v11h14V9"/><path d="M9.5 20v-6h5v6"/>',
    bookmark: '<path d="M6 4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21l-6-4-6 4V4.5Z"/>',
    star: '<path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1.1 6.1-5.5-2.9-5.5 2.9 1.1-6.1L3.2 9.4l6.1-.9L12 3Z"/>',
    history: '<path d="M3 12a9 9 0 1 0 2.4-6.1L3 8.5"/><path d="M3 3.5v5h5"/><path d="M12 7v5l3.2 2"/>',
    note: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8.5 3v18M11.5 8h4M11.5 11h4M11.5 14h3"/>',
    split: '<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M12 4v16"/>',
    settings: '<path d="M12 8.6a3.4 3.4 0 1 0 0 6.8 3.4 3.4 0 0 0 0-6.8Z"/><path d="M19.5 12a7.8 7.8 0 0 0-.1-1.2l1.5-1.2-1.5-2.7-1.9.6a8 8 0 0 0-2-1.2L15.2 4h-3l-.4 2.3a8 8 0 0 0-2 1.2l-1.9-.6-1.5 2.7 1.5 1.2a7.8 7.8 0 0 0 0 2.4l-1.5 1.2 1.5 2.7 1.9-.6a8 8 0 0 0 2 1.2l.4 2.3h3l.4-2.3a8 8 0 0 0 2-1.2l1.9.6 1.5-2.7-1.5-1.2c.1-.4.1-.8.1-1.2Z"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    more: '<circle cx="5" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1" fill="currentColor" stroke="none"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    back: '<path d="m14.5 6-6 6 6 6"/>',
    forward: '<path d="m9.5 6 6 6-6 6"/>',
    reload: '<path d="M20 7v5h-5"/><path d="M4.8 10A7.5 7.5 0 0 1 18 6l2 2M4 17v-5h5"/><path d="M19.2 14A7.5 7.5 0 0 1 6 18l-2-2"/>',
    search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.2 4.2"/>',
    arrow: '<path d="M5 12h14M14 7l5 5-5 5"/>',
    external: '<path d="M13 5h6v6M19 5l-8 8"/><path d="M18 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h4"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    lock: '<rect x="6" y="10" width="12" height="10" rx="2"/><path d="M8.5 10V7a3.5 3.5 0 1 1 7 0v3"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    copy: '<rect x="8" y="8" width="11" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2"/>',
    play: '<path d="m9 6 9 6-9 6V6Z" fill="currentColor" stroke="none"/>',
    pause: '<rect x="7" y="6" width="3" height="12" rx="1" fill="currentColor" stroke="none"/><rect x="14" y="6" width="3" height="12" rx="1" fill="currentColor" stroke="none"/>',
    reset: '<path d="M4 5v5h5"/><path d="M4.8 10a7.5 7.5 0 1 1 .7 6.5"/>',
    trash: '<path d="M4 7h16M9 7V4h6v3M6.5 7l.7 12h9.6l.7-12M10 10.5v5M14 10.5v5"/>',
    duplicate: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
    keyboard: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M6.5 9h.01M10 9h.01M13.5 9h.01M17 9h.01M6.5 12h.01M10 12h.01M13.5 12h.01M17 12h.01M8 15.5h8"/>',
    fullscreen: '<path d="M4 9V5h4M20 9V5h-4M4 15v4h4M20 15v4h-4"/>',
    panel: '<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M9 4v16"/>',
    sun: '<circle cx="12" cy="12" r="3.5"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4m10.6 10.6 1.4 1.4m0-13.4-1.4 1.4M6.7 17.3l-1.4 1.4"/>',
    github: '<path d="M12 2.5a9.5 9.5 0 0 0-3 18.5c.5.1.7-.2.7-.5v-1.8c-2.6.6-3.2-1.1-3.2-1.1-.4-1.1-1-1.4-1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .8 1.5 2.2 1.1 2.7.8.1-.6.3-1.1.5-1.3-2.1-.2-4.3-1-4.3-4.7 0-1.1.4-1.9 1-2.6-.1-.3-.4-1.3.1-2.6 0 0 .8-.3 2.6 1a9 9 0 0 1 4.7 0c1.8-1.3 2.6-1 2.6-1 .5 1.3.2 2.3.1 2.6.6.7 1 1.5 1 2.6 0 3.7-2.2 4.5-4.3 4.7.3.3.6.8.6 1.6v2.8c0 .3.2.6.7.5A9.5 9.5 0 0 0 12 2.5Z" fill="currentColor" stroke="none"/>',
    youtube: '<rect x="2.5" y="5.5" width="19" height="13" rx="4" fill="currentColor" stroke="none"/><path d="m10 9 5 3-5 3V9Z" fill="white" stroke="none"/>'
  };
  function icon(name, extra = '') {
    return `<svg ${extra} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || ''}</svg>`;
  }
  function setIcons(root = document) {
    root.querySelectorAll('[data-icon]').forEach(el => { el.innerHTML = icon(el.dataset.icon); });
  }
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  function uid() {
    return globalThis.crypto && crypto.randomUUID ? crypto.randomUUID() : `m-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  }
  function httpURL(input) {
    try {
      const parsed = new URL(input);
      if (!['http:', 'https:'].includes(parsed.protocol) || !parsed.hostname) return null;
      return parsed.href;
    } catch { return null; }
  }
  function allowedURL(url) { return url === HOME || url === NOTES || !!httpURL(url); }
  const defaultBookmarks = () => [
    { id: uid(), title: 'Wikipedia', url: 'https://vi.wikipedia.org/wiki/Trang_Ch%C3%ADnh', external: false, kind: 'wiki' },
    { id: uid(), title: 'GitHub', url: 'https://github.com/', external: true, kind: 'github' },
    { id: uid(), title: 'YouTube', url: 'https://www.youtube.com/', external: true, kind: 'youtube' },
    { id: uid(), title: 'Example', url: 'https://example.com/', external: false, kind: 'example' }
  ];
  function makeTab(url = HOME) { return { id: uid(), stack: [url], index: 0 }; }
  function defaultState() {
    const first = makeTab(HOME);
    const second = makeTab(NOTES);
    return {
      tabs: [first, second], panes: { left: first.id, right: second.id, active: 'left' },
      split: true, ratio: 58, bookmarks: defaultBookmarks(), history: [], notes: DEFAULT_NOTE,
      settings: { search: 'google', dark: false, sidebarCollapsed: false },
      timer: { remaining: FOCUS_SECONDS, endsAt: null }
    };
  }
  let storageAvailable = false;
  try { localStorage.setItem('__mosaic_check__', '1'); localStorage.removeItem('__mosaic_check__'); storageAvailable = true; } catch { /* private/embedded contexts can block storage */ }
  function readState() {
    if (!storageAvailable) return defaultState();
    try {
      const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (!raw || !Array.isArray(raw.tabs) || !raw.tabs.length) return defaultState();
      const tabs = raw.tabs.slice(0, 80).map(tab => {
        const stack = Array.isArray(tab.stack) ? tab.stack.filter(v => typeof v === 'string' && allowedURL(v)).slice(-100) : [];
        return { id: (typeof tab.id === 'string' && /^[\w-]{1,80}$/.test(tab.id)) ? tab.id : uid(), stack: stack.length ? stack : [HOME], index: Math.max(0, Math.min(Number.isInteger(tab.index) ? tab.index : 0, Math.max(0, stack.length - 1))) };
      });
      // Ensure every tab ID is unique even if stored data was manually edited.
      const seen = new Set();
      tabs.forEach(tab => { if (seen.has(tab.id)) tab.id = uid(); seen.add(tab.id); });
      const hasTab = id => tabs.some(tab => tab.id === id);
      const left = hasTab(raw.panes?.left) ? raw.panes.left : tabs[0].id;
      let right = hasTab(raw.panes?.right) && raw.panes.right !== left ? raw.panes.right : null;
      const split = Boolean(raw.split && right);
      if (!split) right = null;
      const bookmarks = Array.isArray(raw.bookmarks) ? raw.bookmarks.slice(0, 100).flatMap(item => {
        const url = httpURL(item?.url);
        if (!url || typeof item.title !== 'string' || !item.title.trim()) return [];
        return [{ id: typeof item.id === 'string' && /^[\w-]{1,80}$/.test(item.id) ? item.id : uid(), title: item.title.trim().slice(0, 60), url, external: !!item.external, kind: ['wiki', 'github', 'youtube', 'example'].includes(item.kind) ? item.kind : 'custom' }];
      }) : defaultBookmarks();
      const history = Array.isArray(raw.history) ? raw.history.slice(0, 150).flatMap(item => {
        if (!item || typeof item.url !== 'string' || !allowedURL(item.url)) return [];
        return [{ id: typeof item.id === 'string' && /^[\w-]{1,80}$/.test(item.id) ? item.id : uid(), url: item.url, title: typeof item.title === 'string' ? item.title.slice(0, 100) : '', time: Number(item.time) || Date.now() }];
      }) : [];
      return {
        tabs, panes: { left, right, active: split && raw.panes?.active === 'right' ? 'right' : 'left' }, split,
        ratio: Math.max(25, Math.min(75, Number(raw.ratio) || 58)), bookmarks, history,
        notes: typeof raw.notes === 'string' ? raw.notes.slice(0, 100000) : DEFAULT_NOTE,
        settings: { search: ['google', 'duckduckgo', 'bing'].includes(raw.settings?.search) ? raw.settings.search : 'google', dark: !!raw.settings?.dark, sidebarCollapsed: !!raw.settings?.sidebarCollapsed },
        timer: { remaining: Math.max(0, Math.min(FOCUS_SECONDS, Number(raw.timer?.remaining) || 0)), endsAt: Number(raw.timer?.endsAt) > 0 ? Number(raw.timer.endsAt) : null }
      };
    } catch (error) { console.warn('Không thể đọc phiên Mosaic:', error); return defaultState(); }
  }
  let state = readState();
  const closedTabs = [];
  let currentDrawer = null;
  let previousDrawerFocus = null;
  let historyConfirm = false;
  let resetConfirm = false;
  let timerWasRunning = !!state.timer.endsAt;

  function save() {
    if (!storageAvailable) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
    catch (error) {
      storageAvailable = false;
      updateStorageLabel();
      toast('Không thể lưu trên thiết bị. Hãy kiểm tra bộ nhớ của trình duyệt.');
      console.warn('Không thể lưu phiên:', error);
    }
  }
  function updateStorageLabel() {
    const el = $('.browser-status > div:last-child span:last-child');
    if (el) el.textContent = storageAvailable ? 'Lưu trên thiết bị này' : 'Không thể lưu phiên';
    $$('.saved-label').forEach(el => { el.textContent = storageAvailable ? 'Tự động lưu' : 'Chưa lưu'; });
    $$('.notes-footer').forEach(el => { el.innerHTML = `${icon('lock')} ${storageAvailable ? 'Ghi chú được lưu trên thiết bị này, không đồng bộ lên mạng.' : 'Trình duyệt không cho phép lưu; ghi chú chỉ tồn tại trong phiên này.'}`; });
  }
  function toast(message) {
    const node = document.createElement('div');
    node.className = 'toast'; node.textContent = message;
    $('#toast-container').appendChild(node);
    setTimeout(() => node.remove(), 3400);
  }
  const tabById = id => state.tabs.find(tab => tab.id === id);
  const currentUrl = tab => tab?.stack[tab.index] || HOME;
  const activeId = () => state.panes[state.split ? state.panes.active : 'left'];
  const activeTab = () => tabById(activeId()) || state.tabs[0];
  function titleFor(url) {
    if (url === HOME) return 'Bắt đầu';
    if (url === NOTES) return 'Ghi chú';
    const found = state.bookmarks.find(item => item.url === url);
    if (found) return found.title;
    try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return 'Trang web'; }
  }
  // Keep the complete address visible: removing http:// or www. could change the target when re-submitted.
  function displayAddress(url) { return url; }
  function tabIcon(url) {
    if (url === HOME) return icon('home');
    if (url === NOTES) return icon('note');
    return icon('globe');
  }
  function bookmarkKind(bookmark) {
    if (bookmark.kind && bookmark.kind !== 'custom') return bookmark.kind;
    try {
      const host = new URL(bookmark.url).hostname.replace(/^www\./, '');
      if (host.endsWith('wikipedia.org')) return 'wiki';
      if (host === 'github.com') return 'github';
      if (host.endsWith('youtube.com')) return 'youtube';
      if (host === 'example.com') return 'example';
    } catch { /* validated on insertion */ }
    return 'custom';
  }
  function shortcutIcon(bookmark, mini = false) {
    const kind = bookmarkKind(bookmark);
    if (mini) {
      const text = kind === 'wiki' ? 'W' : kind === 'github' ? '●' : kind === 'youtube' ? '▶' : (bookmark.title.trim().charAt(0).toUpperCase() || '•');
      return `<span class="mini-favicon ${escapeHTML(kind)}">${escapeHTML(text)}</span>`;
    }
    let content = kind === 'wiki' ? 'W' : kind === 'github' ? icon('github') : kind === 'youtube' ? icon('youtube') : kind === 'example' ? icon('globe') : escapeHTML(bookmark.title.trim().charAt(0).toUpperCase() || '•');
    return `<span class="quick-icon ${escapeHTML(kind)}">${content}</span>`;
  }
  function shortcutSubtitle(bookmark) {
    const defaults = { wiki: 'Tra cứu & khám phá', github: 'Lập trình & sáng tạo', youtube: 'Video yêu thích', example: 'Trang web mẫu' };
    if (defaults[bookmark.kind]) return defaults[bookmark.kind];
    try { return new URL(bookmark.url).hostname.replace(/^www\./, ''); } catch { return 'Lối tắt của bạn'; }
  }
  function renderQuickCards() {
    if (!state.bookmarks.length) return '<div class="quick-empty">Chưa có lối tắt nào. Hãy thêm một trang bạn yêu thích nhé.</div>';
    return state.bookmarks.slice(0, 8).map(bookmark => `<button type="button" class="quick-card" data-action="go-bookmark" data-id="${escapeHTML(bookmark.id)}" title="${bookmark.external ? 'Mở trong tab trình duyệt mới' : 'Mở trong Mosaic'}" aria-label="Mở ${escapeHTML(bookmark.title)}${bookmark.external ? ' trong tab trình duyệt mới' : ' trong Mosaic'}">
      ${shortcutIcon(bookmark)}<span class="quick-arrow" aria-hidden="true">${bookmark.external ? '↗' : '·'}</span><span class="quick-name">${escapeHTML(bookmark.title)}</span><span class="quick-subtitle">${escapeHTML(shortcutSubtitle(bookmark))}</span></button>`).join('');
  }
  function renderSidebarShortcuts() {
    $('#sidebar-shortcuts').innerHTML = state.bookmarks.slice(0, 4).map(bookmark => `<button type="button" class="side-shortcut" data-action="go-bookmark" data-id="${escapeHTML(bookmark.id)}" title="${escapeHTML(bookmark.title)}${bookmark.external ? ' — mở trong tab mới' : ''}">${shortcutIcon(bookmark, true)}<span class="side-shortcut-name">${escapeHTML(bookmark.title)}</span>${bookmark.external ? '<span class="shortcut-external">↗</span>' : ''}</button>`).join('');
    $('#bookmark-count').textContent = state.bookmarks.length;
    $$('.quick-grid').forEach(grid => { grid.innerHTML = renderQuickCards(); });
  }
  const providerLabels = { google: 'Google', duckduckgo: 'DuckDuckGo', bing: 'Bing' };
  function greeting() {
    const hour = new Date().getHours();
    return hour < 11 ? 'Chào buổi sáng,' : hour < 18 ? 'Chào buổi chiều,' : 'Chào buổi tối,';
  }
  function todayLabel() {
    return new Intl.DateTimeFormat('vi-VN', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date());
  }
  function homeMarkup() {
    return `<div class="home-page"><div class="home-inner">
      <div class="home-meta"><span class="meta-label"><span class="meta-star">✳</span> MỘT NGÀY MỚI, MỘT KHÔNG GIAN MỚI</span><span class="home-date">${icon('sun')} ${escapeHTML(todayLabel())}</span></div>
      <h1 class="home-title">${greeting()}<br><em>cùng bắt đầu nhé.</em></h1>
      <p class="home-description">Tất cả những điều bạn cần, trong một không gian thật riêng.</p>
      <form class="home-search">${icon('search')}<input type="text" name="search" placeholder="Tìm trên ${providerLabels[state.settings.search]} (tab mới) hoặc nhập URL" aria-label="Tìm kiếm hoặc nhập địa chỉ web" autocomplete="off" spellcheck="false"><button class="search-enter" type="submit" title="Đi đến địa chỉ hoặc tìm kiếm trong tab mới" aria-label="Đi đến địa chỉ hoặc tìm kiếm">${icon('arrow')}</button></form>
      <div class="section-heading"><h2><span class="heading-number">01 /</span> TRUY CẬP NHANH</h2><button type="button" class="heading-action" data-action="add-bookmark">${icon('plus')} Thêm lối tắt</button></div>
      <div class="quick-grid">${renderQuickCards()}</div>
      <div class="hero-card"><div class="hero-content"><div class="hero-eyebrow"><span>✳</span> MỘT CHÚT BÌNH YÊN</div><div class="hero-title">Cho những điều<br>quan trọng hơn.</div><button type="button" class="hero-button" data-action="navigate-notes">Mở ghi chú <span aria-hidden="true">↗</span></button></div><span class="hero-corner">MOSAIC / 01</span></div>
      <div class="home-tip"><span>${icon('split')}</span><span><strong>Mẹo nhỏ:</strong> <span class="split-tip">${state.split ? 'Kéo thanh ở giữa để thay đổi kích thước cửa sổ.' : 'Chọn Chia đôi để làm việc cùng lúc trên hai thẻ.'}</span></span></div>
    </div></div>`;
  }
  function notesMarkup() {
    return `<div class="notes-page"><div class="notes-inner">
      <div class="notes-meta"><span><span class="tiny-sparkle">✳</span> KHÔNG GIAN SÁNG TẠO</span><span class="notes-number">MOSAIC / 02</span></div>
      <div class="notes-heading"><span class="notes-heading-icon">${icon('note')}</span><h2>Góc ghi chú <span>✳</span></h2><p>Một nơi nho nhỏ cho những ý tưởng lớn.</p></div>
      <div class="notepad"><div class="notepad-head"><span class="notepad-label">Ý TƯỞNG CỦA TÔI</span><span class="saved-label">${storageAvailable ? 'Tự động lưu' : 'Chưa lưu'}</span></div>
      <textarea class="note-input" aria-label="Nội dung ghi chú" placeholder="Viết điều gì đó ở đây..." spellcheck="false" maxlength="100000">${escapeHTML(state.notes)}</textarea>
      <div class="notepad-foot"><span class="note-count">${state.notes.length} ký tự</span><button type="button" class="copy-note" data-action="copy-note">${icon('copy')} Sao chép</button></div></div>
      <div class="focus-card"><span class="focus-icon">${icon('clock')}</span><div class="focus-copy"><strong>Một chút tập trung</strong><small>Phiên làm việc 25 phút</small></div><span class="focus-time">25:00</span><button type="button" class="focus-play icon-button" data-action="toggle-timer" aria-label="Bắt đầu bộ đếm" title="Bắt đầu bộ đếm">${icon('play')}</button><button type="button" class="focus-reset icon-button" data-action="reset-timer" title="Đặt lại bộ đếm" aria-label="Đặt lại bộ đếm">${icon('reset')}</button></div>
      <div class="notes-footer">${icon('lock')} Ghi chú được lưu trên thiết bị này, không đồng bộ lên mạng.</div>
    </div></div>`;
  }
  function externalMarkup(url) {
    const host = (() => { try { return new URL(url).hostname; } catch { return 'trang web'; } })();
    return `<div class="external-page"><div class="external-banner">${icon('info')}<span>Trang không hiển thị? Một số website chặn nhúng.</span><button type="button" data-action="open-outside">Mở bên ngoài ↗</button></div><iframe class="external-frame" src="${escapeHTML(url)}" title="Nội dung ${escapeHTML(host)}" sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads" referrerpolicy="no-referrer" allow="fullscreen"></iframe></div>`;
  }
  function createView(tab) {
    const view = document.createElement('section');
    view.className = 'tab-view'; view.dataset.tabId = tab.id; view.id = `panel-${tab.id}`;
    view.innerHTML = `<div class="pane-toolbar" aria-label="Thanh điều hướng của thẻ">
      <div class="toolbar-group"><button type="button" class="tool-button icon-button" data-action="back" aria-label="Quay lại" title="Quay lại">${icon('back')}</button><button type="button" class="tool-button icon-button" data-action="forward" aria-label="Tiến tới" title="Tiến tới">${icon('forward')}</button><button type="button" class="tool-button icon-button" data-action="reload" aria-label="Tải lại" title="Tải lại">${icon('reload')}</button></div>
      <form class="address-form">${icon('globe')}<input type="text" name="address" aria-label="Địa chỉ hoặc tìm kiếm" autocomplete="off" spellcheck="false"><span class="address-kbd">${MOD_LABEL} L</span></form>
      <button type="button" class="tool-button icon-button bookmark-button" data-action="toggle-bookmark" aria-label="Lưu dấu trang" title="Lưu dấu trang">${icon('star')}</button><button type="button" class="tool-button icon-button outside-button" data-action="open-outside" aria-label="Mở trong trình duyệt" title="Mở trong tab trình duyệt mới">${icon('external')}</button>
    </div><div class="page-content"></div>`;
    $('#stage').insertBefore(view, $('#split-divider'));
    renderPage(tab, true);
  }
  function renderPage(tab, force = false) {
    const view = $(`.tab-view[data-tab-id="${tab.id}"]`);
    if (!view) return;
    const url = currentUrl(tab);
    if (!force && view.dataset.renderedUrl === url) return;
    view.dataset.renderedUrl = url;
    const content = $('.page-content', view);
    content.innerHTML = url === HOME ? homeMarkup() : url === NOTES ? notesMarkup() : externalMarkup(url);
    updateTimer();
  }
  function updateToolbar(tab) {
    const view = $(`.tab-view[data-tab-id="${tab.id}"]`);
    if (!view) return;
    const url = currentUrl(tab);
    const input = $('.address-form input', view);
    if (document.activeElement !== input) input.value = displayAddress(url);
    input.placeholder = `Tìm trên ${providerLabels[state.settings.search]} hoặc nhập URL`;
    $('[data-action="back"]', view).disabled = tab.index <= 0;
    $('[data-action="forward"]', view).disabled = tab.index >= tab.stack.length - 1;
    const isWeb = !!httpURL(url);
    const starred = state.bookmarks.some(b => b.url === url);
    const star = $('.bookmark-button', view);
    star.disabled = !isWeb; star.classList.toggle('is-bookmarked', starred);
    star.setAttribute('aria-label', starred ? 'Xóa dấu trang' : 'Lưu dấu trang');
    star.title = starred ? 'Xóa dấu trang' : 'Lưu dấu trang';
    $('.outside-button', view).disabled = !isWeb;
  }
  function renderTabs() {
    const current = activeId();
    const visibleIds = state.split ? [state.panes.left, state.panes.right] : [state.panes.left];
    $('#tab-list').innerHTML = state.tabs.map(tab => {
      const active = tab.id === current;
      const visible = visibleIds.includes(tab.id);
      return `<div class="browser-tab ${active ? 'is-active' : ''} ${visible ? 'is-visible' : ''}"><button type="button" class="tab-select" aria-pressed="${active}" aria-controls="panel-${escapeHTML(tab.id)}" data-action="switch-tab" data-id="${escapeHTML(tab.id)}" title="${escapeHTML(titleFor(currentUrl(tab)))}"><span class="tab-icon">${tabIcon(currentUrl(tab))}</span><span class="tab-name">${escapeHTML(titleFor(currentUrl(tab)))}</span>${visible && state.split ? '<span class="tab-pane-dot" title="Đang hiển thị"></span>' : ''}</button><button type="button" class="tab-close icon-button" data-action="close-tab" data-id="${escapeHTML(tab.id)}" aria-label="Đóng thẻ ${escapeHTML(titleFor(currentUrl(tab)))}">${icon('x')}</button></div>`;
    }).join('');
  }
  function applyLayout() {
    const stage = $('#stage');
    stage.classList.toggle('is-split', state.split);
    stage.style.setProperty('--split', `${state.ratio}%`);
    const divider = $('#split-divider');
    divider.setAttribute('aria-valuenow', String(Math.round(state.ratio)));
    divider.setAttribute('aria-orientation', matchMedia('(max-width: 760px)').matches ? 'horizontal' : 'vertical');
    divider.tabIndex = state.split ? 0 : -1;
    state.tabs.forEach(tab => {
      const view = $(`.tab-view[data-tab-id="${tab.id}"]`);
      if (!view) return;
      view.classList.remove('single', 'pane-left', 'pane-right', 'active-pane');
      if (!state.split && tab.id === state.panes.left) view.classList.add('single');
      if (state.split && tab.id === state.panes.left) view.classList.add('pane-left');
      if (state.split && tab.id === state.panes.right) view.classList.add('pane-right');
      if (tab.id === activeId()) view.classList.add('active-pane');
      view.setAttribute('aria-hidden', String(!view.classList.contains('single') && !view.classList.contains('pane-left') && !view.classList.contains('pane-right')));
      updateToolbar(tab);
    });
    const splitButton = $('#split-toggle');
    splitButton.setAttribute('aria-pressed', String(state.split));
    splitButton.title = state.split ? 'Tắt chia đôi' : 'Chia đôi cửa sổ';
    $('#side-split-label').textContent = state.split ? 'Đóng chế độ chia đôi' : 'Chia đôi cửa sổ';
    $$('.split-tip').forEach(el => { el.textContent = state.split ? 'Kéo thanh ở giữa để thay đổi kích thước cửa sổ.' : 'Chọn Chia đôi để làm việc cùng lúc trên hai thẻ.'; });
    $('#side-home').classList.toggle('active', currentUrl(activeTab()) === HOME && !currentDrawer);
    $('#side-notes').classList.toggle('active', currentUrl(activeTab()) === NOTES && !currentDrawer);
    document.body.classList.toggle('theme-dark', state.settings.dark);
    $('#app-shell').classList.toggle('sidebar-collapsed', state.settings.sidebarCollapsed);
    renderTabs();
  }
  function renderAll() {
    renderSidebarShortcuts(); applyLayout(); updateStorageLabel();
    if (currentDrawer) renderDrawer();
  }
  function recordHistory(url) {
    state.history.unshift({ id: uid(), url, title: titleFor(url), time: Date.now() });
    state.history = state.history.slice(0, 150);
  }
  function navigate(tab, url, record = true) {
    if (!tab || !allowedURL(url)) return;
    if (currentUrl(tab) !== url) {
      tab.stack = tab.stack.slice(0, tab.index + 1);
      tab.stack.push(url); if (tab.stack.length > 100) tab.stack.shift();
      tab.index = tab.stack.length - 1;
      if (record) recordHistory(url);
      renderPage(tab);
    }
    renderAll(); save();
  }
  function selectTab(id) {
    if (!tabById(id)) return;
    if (state.split && state.panes.left === id) state.panes.active = 'left';
    else if (state.split && state.panes.right === id) state.panes.active = 'right';
    else state.panes[state.split ? state.panes.active : 'left'] = id;
    applyLayout(); save();
  }
  function setActiveForTab(id) {
    if (!state.split) return;
    const pane = state.panes.left === id ? 'left' : state.panes.right === id ? 'right' : null;
    if (pane && state.panes.active !== pane) { state.panes.active = pane; applyLayout(); save(); }
  }
  function newTab(url = HOME, opts = {}) {
    const tab = opts.copy ? { id: uid(), stack: [...opts.copy.stack], index: opts.copy.index } : makeTab(url);
    state.tabs.push(tab); createView(tab);
    if (opts.show !== false) state.panes[state.split ? state.panes.active : 'left'] = tab.id;
    renderAll(); save();
    if (opts.focus) requestAnimationFrame(() => { const view = $(`.tab-view[data-tab-id="${tab.id}"]`); ($('.home-search input', view) || $('.address-form input', view))?.focus(); });
    return tab;
  }
  function closeTab(id) {
    const index = state.tabs.findIndex(t => t.id === id); if (index < 0) return;
    const tab = state.tabs[index];
    closedTabs.unshift({ stack: [...tab.stack], index: tab.index }); closedTabs.splice(20);
    const closedPane = state.split ? (state.panes.left === id ? 'left' : state.panes.right === id ? 'right' : null) : state.panes.left === id ? 'left' : null;
    state.tabs.splice(index, 1);
    $(`.tab-view[data-tab-id="${id}"]`)?.remove();
    if (!state.tabs.length) {
      const tab = makeTab(HOME); state.tabs.push(tab); createView(tab);
      state.split = false; state.panes = { left: tab.id, right: null, active: 'left' };
    } else if (state.split && closedPane) {
      const otherPane = closedPane === 'left' ? 'right' : 'left';
      const otherId = state.panes[otherPane];
      const choices = state.tabs.filter(t => t.id !== otherId);
      if (choices.length) state.panes[closedPane] = choices[Math.min(index, choices.length - 1)].id;
      else { state.split = false; state.panes = { left: otherId, right: null, active: 'left' }; }
    } else if (!state.split && closedPane) {
      state.panes.left = state.tabs[Math.min(index, state.tabs.length - 1)].id;
    }
    renderAll(); save();
  }
  function reopenTab() {
    const closed = closedTabs.shift();
    if (!closed) { toast('Chưa có thẻ nào vừa đóng.'); return; }
    newTab(HOME, { copy: closed }); toast('Đã mở lại thẻ vừa đóng.');
  }
  function toggleSplit() {
    if (state.split) {
      const keep = activeId();
      state.split = false; state.panes = { left: keep, right: null, active: 'left' };
      toast('Đã tắt chia đôi. Những thẻ khác vẫn được giữ lại.');
    } else {
      const first = activeId();
      let second = state.tabs.find(tab => tab.id !== first && currentUrl(tab) === NOTES) || state.tabs.find(tab => tab.id !== first);
      if (!second) second = newTab(NOTES, { show: false });
      state.split = true; state.panes = { left: first, right: second.id, active: 'left' };
      toast('Đã chia đôi. Kéo thanh ở giữa để điều chỉnh.');
    }
    renderAll(); save();
  }
  function openNotes() {
    const existing = state.tabs.find(tab => currentUrl(tab) === NOTES && (tab.id === state.panes.left || tab.id === state.panes.right)) || state.tabs.find(tab => currentUrl(tab) === NOTES);
    if (existing) selectTab(existing.id); else navigate(activeTab(), NOTES);
  }
  function moveHistory(tab, amount) {
    if (!tab) return;
    const next = tab.index + amount;
    if (next < 0 || next >= tab.stack.length) return;
    tab.index = next; renderPage(tab); renderAll(); save();
  }
  function reload(tab) {
    if (!tab) return;
    const view = $(`.tab-view[data-tab-id="${tab.id}"]`);
    const frame = $('.external-frame', view);
    if (frame) frame.src = currentUrl(tab); else renderPage(tab, true);
    updateToolbar(tab); toast('Đã tải lại thẻ.');
  }
  function parseInput(raw) {
    const input = raw.trim();
    if (!input) return { type: 'empty' };
    if (/^mosaic:\/\/home\/?$/i.test(input)) return { type: 'url', value: HOME };
    if (/^mosaic:\/\/notes\/?$/i.test(input)) return { type: 'url', value: NOTES };
    if (/^https?:\/\//i.test(input)) {
      const url = httpURL(input); return url ? { type: 'url', value: url } : { type: 'error' };
    }
    if (/^(?:localhost|(?:\d{1,3}\.){3}\d{1,3}|(?:[\p{L}\p{N}-]+\.)+[\p{L}\p{N}-]{2,})(?::\d+)?(?:[/?#].*)?$/iu.test(input)) {
      const url = httpURL(`https://${input}`); return url ? { type: 'url', value: url } : { type: 'error' };
    }
    if (/^[a-z][a-z\d+.-]*:/i.test(input) || input.startsWith('//')) return { type: 'error' };
    return { type: 'search', value: input };
  }
  function searchURL(query) {
    if (state.settings.search === 'duckduckgo') return `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
    if (state.settings.search === 'bing') return `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
    return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  }
  function openExternal(url) {
    const safe = httpURL(url);
    if (!safe) { toast('Trang này không thể mở bên ngoài.'); return; }
    const link = document.createElement('a');
    link.href = safe; link.target = '_blank'; link.rel = 'noopener noreferrer';
    document.body.appendChild(link); link.click(); link.remove();
  }
  function submitAddress(tab, raw) {
    const result = parseInput(raw);
    if (result.type === 'empty') return;
    if (result.type === 'error') { toast('Địa chỉ không hợp lệ. Chỉ hỗ trợ http:// và https://.'); return; }
    if (result.type === 'search') {
      openExternal(searchURL(result.value));
      toast(`Kết quả ${providerLabels[state.settings.search]} sẽ mở trong tab trình duyệt mới.`);
      updateToolbar(tab);
    } else navigate(tab, result.value);
  }
  function toggleBookmark(tab) {
    const url = currentUrl(tab); if (!httpURL(url)) return;
    const index = state.bookmarks.findIndex(b => b.url === url);
    if (index >= 0) { state.bookmarks.splice(index, 1); toast('Đã xóa khỏi dấu trang.'); }
    else { state.bookmarks.push({ id: uid(), title: titleFor(url), url, external: false, kind: 'custom' }); toast('Đã lưu vào dấu trang.'); }
    renderAll(); save();
  }
  function goBookmark(id) {
    const bookmark = state.bookmarks.find(b => b.id === id); if (!bookmark) return;
    if (bookmark.external) { openExternal(bookmark.url); toast('Trang sẽ mở trong tab trình duyệt mới.'); }
    else navigate(activeTab(), bookmark.url);
  }
  function remainingTime() {
    if (state.timer.endsAt) return Math.max(0, Math.ceil((state.timer.endsAt - Date.now()) / 1000));
    return Math.max(0, state.timer.remaining);
  }
  function updateTimer() {
    let seconds = remainingTime();
    if (state.timer.endsAt && seconds <= 0) {
      state.timer.endsAt = null; state.timer.remaining = 0; seconds = 0; save();
      if (timerWasRunning) toast('Hoàn thành 25 phút tập trung. Hãy nghỉ một chút nhé!');
      timerWasRunning = false;
    }
    const text = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
    $$('.focus-time').forEach(el => { el.textContent = text; });
    $$('.focus-play').forEach(el => {
      const playing = !!state.timer.endsAt;
      el.innerHTML = icon(playing ? 'pause' : 'play');
      el.title = playing ? 'Tạm dừng bộ đếm' : 'Bắt đầu bộ đếm';
      el.setAttribute('aria-label', el.title);
    });
  }
  function toggleTimer() {
    if (state.timer.endsAt) { state.timer.remaining = remainingTime(); state.timer.endsAt = null; timerWasRunning = false; }
    else { if (state.timer.remaining <= 0) state.timer.remaining = FOCUS_SECONDS; state.timer.endsAt = Date.now() + state.timer.remaining * 1000; timerWasRunning = true; }
    updateTimer(); save();
  }
  function resetTimer() { state.timer = { remaining: FOCUS_SECONDS, endsAt: null }; timerWasRunning = false; updateTimer(); save(); }
  async function copyNote(button) {
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(state.notes);
      else {
        const input = $('.note-input', button.closest('.page-content'));
        input.focus(); input.select();
        if (!document.execCommand('copy')) throw new Error('Clipboard unavailable');
        input.setSelectionRange(input.value.length, input.value.length);
      }
      toast('Đã sao chép ghi chú.');
    } catch { toast('Không thể sao chép. Hãy chọn nội dung ghi chú và sao chép thủ công.'); }
  }
  function openBookmarkDialog() {
    const dialog = $('#bookmark-dialog'); $('#bookmark-form').reset(); $('#bookmark-error').textContent = '';
    if (dialog.showModal) dialog.showModal(); else dialog.setAttribute('open', '');
    setTimeout(() => $('#bookmark-name').focus(), 0);
  }
  function closeBookmarkDialog() {
    const dialog = $('#bookmark-dialog'); if (dialog.close) dialog.close(); else dialog.removeAttribute('open');
  }
  function formatHistoryTime(timestamp) {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' }).format(date);
  }
  function drawerItem(item, kind) {
    const glyph = kind === 'history' ? icon(item.url === NOTES ? 'note' : item.url === HOME ? 'home' : 'globe') : shortcutIcon(item, true);
    const detail = kind === 'history' ? `${formatHistoryTime(item.time)} · ${displayAddress(item.url)}` : `${displayAddress(item.url)}${item.external ? ' · Mở ngoài' : ''}`;
    const action = kind === 'history' ? 'go-history' : 'go-bookmark';
    const remove = kind === 'history' ? 'remove-history' : 'remove-bookmark';
    return `<div class="drawer-item"><span class="drawer-item-icon">${glyph}</span><button type="button" class="drawer-item-main" data-action="${action}" data-id="${escapeHTML(item.id)}"><strong>${escapeHTML(item.title || titleFor(item.url))}</strong><small>${escapeHTML(detail)}</small></button><button type="button" class="drawer-item-remove icon-button" data-action="${remove}" data-id="${escapeHTML(item.id)}" aria-label="Xóa ${escapeHTML(item.title || 'mục này')}" title="Xóa">${icon('trash')}</button></div>`;
  }
  function renderDrawer() {
    const content = $('#drawer-content');
    const title = $('#drawer-title');
    if (currentDrawer === 'bookmarks') {
      title.textContent = 'Dấu trang';
      content.innerHTML = `<p class="drawer-intro">Những địa chỉ yêu thích, luôn sẵn sàng khi bạn cần.</p><button type="button" class="drawer-primary" data-action="add-bookmark">${icon('plus')} Thêm lối tắt mới</button>${state.bookmarks.length ? state.bookmarks.map(item => drawerItem(item, 'bookmark')).join('') : '<div class="drawer-empty">Chưa có dấu trang nào.<br>Hãy thêm trang bạn yêu thích nhé.</div>'}`;
    } else if (currentDrawer === 'history') {
      title.textContent = 'Lịch sử';
      content.innerHTML = `<p class="drawer-intro">Các trang bạn đã mở bằng Mosaic được lưu trên thiết bị này. Các liên kết mở bên trong trang nhúng không được ghi lại.</p>${state.history.length ? state.history.map(item => drawerItem(item, 'history')).join('') : '<div class="drawer-empty">Chưa có lịch sử duyệt web.<br>Một hành trình mới đang chờ bạn.</div>'}${state.history.length ? (historyConfirm ? '<p class="drawer-intro" style="margin-top:18px">Xóa toàn bộ lịch sử trên thiết bị này?</p><div class="dialog-actions"><button type="button" class="button-secondary" data-action="cancel-clear-history">Hủy</button><button type="button" class="button-primary" data-action="confirm-clear-history">Xóa lịch sử</button></div>' : '<button type="button" class="drawer-danger" data-action="clear-history">Xóa toàn bộ lịch sử</button>') : ''}`;
    } else if (currentDrawer === 'settings') {
      title.textContent = 'Cài đặt';
      content.innerHTML = `<p class="drawer-intro">Điều chỉnh không gian làm việc theo cách của bạn.</p>
      <div class="setting-row"><strong>Công cụ tìm kiếm</strong><small>Tìm kiếm sẽ mở trong một tab trình duyệt mới.</small><select id="search-engine" aria-label="Công cụ tìm kiếm"><option value="google" ${state.settings.search === 'google' ? 'selected' : ''}>Google</option><option value="duckduckgo" ${state.settings.search === 'duckduckgo' ? 'selected' : ''}>DuckDuckGo</option><option value="bing" ${state.settings.search === 'bing' ? 'selected' : ''}>Bing</option></select></div>
      <div class="setting-row"><div class="setting-switch-line"><strong>Giao diện tối</strong><button type="button" class="switch-button" data-action="toggle-theme" aria-label="Giao diện tối" aria-pressed="${state.settings.dark}"></button></div><small>Áp dụng cho giao diện Mosaic, không thay đổi các trang web được nhúng.</small></div>
      <div class="setting-row"><strong>Dữ liệu của bạn</strong><small>Thẻ, dấu trang, lịch sử và ghi chú được lưu cục bộ trên thiết bị, không đồng bộ giữa các trình duyệt.</small></div>
      ${resetConfirm ? '<p class="drawer-intro" style="margin-top:18px">Xóa tất cả thẻ, dấu trang, lịch sử và ghi chú trên thiết bị này?</p><div class="dialog-actions"><button type="button" class="button-secondary" data-action="cancel-reset">Hủy</button><button type="button" class="button-primary" data-action="confirm-reset">Đặt lại</button></div>' : '<button type="button" class="drawer-danger" data-action="reset-data">Đặt lại dữ liệu Mosaic</button>'}`;
    } else if (currentDrawer === 'shortcuts') {
      title.textContent = 'Phím tắt';
      const items = [['Mở thẻ mới', 'Ctrl/⌘ + T'], ['Đóng thẻ hiện tại', 'Ctrl/⌘ + W'], ['Mở lại thẻ vừa đóng', 'Ctrl/⌘ + Shift + T'], ['Đến thanh địa chỉ', 'Ctrl/⌘ + L'], ['Tải lại trang', 'Ctrl/⌘ + R'], ['Đổi thẻ', 'Ctrl + Tab'], ['Quay lại / tiến tới', 'Alt + ← / →']];
      content.innerHTML = `<p class="drawer-intro">Dùng khi bạn đang tương tác với giao diện Mosaic. Trình duyệt thật có thể ưu tiên một số phím tắt của chính nó.</p>${items.map(([label, keys]) => `<div class="shortcut-row"><span>${label}</span><kbd>${keys}</kbd></div>`).join('')}`;
    } else {
      title.textContent = 'Về Mosaic';
      content.innerHTML = `<p class="drawer-intro">Một góc nhỏ trên web, dành cho những ngày bạn muốn làm được nhiều điều hơn.</p><div class="about-card"><strong>Trình duyệt mô phỏng trên web</strong><br>Mosaic dùng iframe để hiển thị website. Một số trang như Google, GitHub hoặc YouTube có thể chặn nhúng; hãy dùng nút <strong>Mở bên ngoài</strong>. Thanh địa chỉ và lịch sử chỉ theo dõi các thao tác trong Mosaic, không theo dõi liên kết bên trong website được nhúng.</div><div class="drawer-subhead">MỘT VÀI LƯU Ý</div><p class="drawer-intro">Dữ liệu được lưu cục bộ nếu trình duyệt cho phép. Tìm kiếm web mở trong tab trình duyệt mới. Mosaic không phải là trình duyệt đầy đủ và không thể vượt qua chính sách bảo mật của website khác.</p><button type="button" class="drawer-primary" data-action="open-drawer" data-drawer="shortcuts">${icon('keyboard')} Xem phím tắt</button>`;
    }
  }
  function openDrawer(name) {
    if (!['bookmarks', 'history', 'settings', 'shortcuts', 'about'].includes(name)) return;
    if (!currentDrawer) previousDrawerFocus = document.activeElement;
    currentDrawer = name; historyConfirm = false; resetConfirm = false; renderDrawer();
    $('#drawer-layer').classList.remove('hidden'); $('#drawer-layer').setAttribute('aria-hidden', 'false');
    $('.sidebar').inert = true; $('.browser').inert = true;
    closeMenu(); applyLayout();
    requestAnimationFrame(() => $('.drawer-close')?.focus());
  }
  function closeDrawer() {
    currentDrawer = null; $('#drawer-layer').classList.add('hidden'); $('#drawer-layer').setAttribute('aria-hidden', 'true');
    $('.sidebar').inert = false; $('.browser').inert = false; applyLayout();
    if (previousDrawerFocus && document.contains(previousDrawerFocus)) previousDrawerFocus.focus();
  }
  function renderMenu() {
    const collapsedLabel = state.settings.sidebarCollapsed ? 'Mở rộng thanh bên' : 'Thu gọn thanh bên';
    const items = [
      ['new-tab', 'plus', 'Thẻ mới', `${MOD_LABEL} T`], ['duplicate-tab', 'duplicate', 'Nhân bản thẻ', ''], ['reopen-tab', 'history', 'Mở lại thẻ đã đóng', ''],
      ['rule'], ...(!matchMedia('(max-width: 760px)').matches ? [['collapse-sidebar', 'panel', collapsedLabel, '']] : []), ['fullscreen', 'fullscreen', 'Toàn màn hình', ''],
      ['rule'], ['open-drawer', 'keyboard', 'Phím tắt', '', 'shortcuts'], ['open-drawer', 'settings', 'Cài đặt', '', 'settings'], ['open-drawer', 'info', 'Về Mosaic', '', 'about']
    ];
    $('#menu-popover').innerHTML = items.map(([action, glyph, label, key, drawer]) => action === 'rule' ? '<div class="menu-rule"></div>' : `<button role="menuitem" type="button" class="menu-item" data-action="${action}"${drawer ? ` data-drawer="${drawer}"` : ''}>${icon(glyph)}<span>${label}</span>${key ? `<kbd>${key}</kbd>` : ''}</button>`).join('');
  }
  function closeMenu() { $('#menu-popover').classList.add('hidden'); $('.top-menu-button').setAttribute('aria-expanded', 'false'); }
  function toggleMenu() { const isHidden = $('#menu-popover').classList.contains('hidden'); renderMenu(); $('#menu-popover').classList.toggle('hidden', !isHidden); $('.top-menu-button').setAttribute('aria-expanded', String(isHidden)); }
  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen();
      else throw new Error('unsupported');
    } catch { toast('Chế độ toàn màn hình không khả dụng trong cửa sổ này.'); }
  }
  function focusAddress() {
    const view = $(`.tab-view[data-tab-id="${activeId()}"]`);
    const input = view && $('.address-form input', view); if (input) { input.focus(); input.select(); }
  }
  function changeRatio(ratio) {
    state.ratio = Math.round(Math.max(25, Math.min(75, ratio)) * 10) / 10;
    $('#stage').style.setProperty('--split', `${state.ratio}%`);
    $('#split-divider').setAttribute('aria-valuenow', String(Math.round(state.ratio)));
  }

  // Set up static icons, create each tab's DOM once, and keep iframes alive while tabs are hidden.
  setIcons(); $('#collapse-sidebar').innerHTML = icon('panel');
  state.tabs.forEach(createView);
  renderAll(); updateTimer();
  setInterval(updateTimer, 1000);
  setInterval(() => { $$('.home-date').forEach(el => { el.innerHTML = `${icon('sun')} ${escapeHTML(todayLabel())}`; }); }, 60000);
  window.addEventListener('resize', () => { $('#split-divider').setAttribute('aria-orientation', matchMedia('(max-width: 760px)').matches ? 'horizontal' : 'vertical'); });

  document.addEventListener('focusin', event => {
    const view = event.target.closest?.('.tab-view');
    if (!view) return;
    setActiveForTab(view.dataset.tabId);
  });
  document.addEventListener('pointerdown', event => {
    const view = event.target.closest?.('.tab-view'); if (view) setActiveForTab(view.dataset.tabId);
  });
  // Cross-origin iframe clicks do not bubble. Once focus moves into a frame, mark its pane active.
  window.addEventListener('blur', () => setTimeout(() => {
    const focused = document.activeElement;
    if (focused && focused.tagName === 'IFRAME') { const view = focused.closest('.tab-view'); if (view) setActiveForTab(view.dataset.tabId); }
  }, 0));
  document.addEventListener('click', event => {
    const target = event.target.closest('[data-action]');
    if (!target) { if (!event.target.closest('#menu-popover')) closeMenu(); return; }
    const action = target.dataset.action;
    const id = target.dataset.id;
    if (target.tagName === 'A') event.preventDefault();
    if (action !== 'toggle-menu') closeMenu();
    const view = target.closest('.tab-view');
    const tab = view ? tabById(view.dataset.tabId) : activeTab();
    switch (action) {
      case 'new-tab': newTab(HOME, { focus: true }); break;
      case 'switch-tab': selectTab(id); break;
      case 'close-tab': closeTab(id); break;
      case 'duplicate-tab': newTab(HOME, { copy: activeTab() }); toast('Đã nhân bản thẻ.'); break;
      case 'reopen-tab': reopenTab(); break;
      case 'toggle-split': toggleSplit(); break;
      case 'navigate-home': navigate(activeTab(), HOME); break;
      case 'navigate-notes': openNotes(); break;
      case 'back': moveHistory(tab, -1); break;
      case 'forward': moveHistory(tab, 1); break;
      case 'reload': reload(tab); break;
      case 'open-outside': openExternal(currentUrl(tab)); break;
      case 'toggle-bookmark': toggleBookmark(tab); break;
      case 'go-bookmark': if (currentDrawer) closeDrawer(); goBookmark(id); break;
      case 'add-bookmark': openBookmarkDialog(); break;
      case 'close-bookmark-dialog': closeBookmarkDialog(); break;
      case 'remove-bookmark': state.bookmarks = state.bookmarks.filter(item => item.id !== id); renderAll(); save(); toast('Đã xóa dấu trang.'); break;
      case 'open-drawer': openDrawer(target.dataset.drawer); break;
      case 'close-drawer': closeDrawer(); break;
      case 'go-history': {
        const item = state.history.find(entry => entry.id === id); closeDrawer(); if (item) navigate(activeTab(), item.url); break;
      }
      case 'remove-history': state.history = state.history.filter(item => item.id !== id); renderDrawer(); save(); break;
      case 'clear-history': historyConfirm = true; renderDrawer(); break;
      case 'cancel-clear-history': historyConfirm = false; renderDrawer(); break;
      case 'confirm-clear-history': state.history = []; historyConfirm = false; renderDrawer(); save(); toast('Đã xóa lịch sử.'); break;
      case 'toggle-theme': state.settings.dark = !state.settings.dark; renderAll(); save(); break;
      case 'reset-data': resetConfirm = true; renderDrawer(); break;
      case 'cancel-reset': resetConfirm = false; renderDrawer(); break;
      case 'confirm-reset':
        try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignored */ }
        location.reload(); break;
      case 'toggle-menu': toggleMenu(); break;
      case 'collapse-sidebar': state.settings.sidebarCollapsed = !state.settings.sidebarCollapsed; renderAll(); save(); break;
      case 'fullscreen': toggleFullscreen(); break;
      case 'toggle-timer': toggleTimer(); break;
      case 'reset-timer': resetTimer(); break;
      case 'copy-note': copyNote(target); break;
      default: break;
    }
  });
  document.addEventListener('submit', event => {
    if (event.target.matches('.address-form, .home-search')) {
      event.preventDefault();
      const view = event.target.closest('.tab-view');
      const tab = view && tabById(view.dataset.tabId); const input = $('input', event.target);
      if (tab && input) {
        submitAddress(tab, input.value);
        if (event.target.matches('.address-form')) { input.blur(); updateToolbar(tab); }
      }
    } else if (event.target.id === 'bookmark-form') {
      event.preventDefault();
      const name = $('#bookmark-name').value.trim(); let input = $('#bookmark-url').value.trim();
      if (!name) { $('#bookmark-error').textContent = 'Vui lòng nhập tên lối tắt.'; $('#bookmark-name').focus(); return; }
      if (!/^[a-z][a-z\d+.-]*:\/\//i.test(input)) input = `https://${input}`;
      const url = httpURL(input);
      if (!url) { $('#bookmark-error').textContent = 'Vui lòng nhập địa chỉ http:// hoặc https:// hợp lệ.'; $('#bookmark-url').focus(); return; }
      if (state.bookmarks.some(item => item.url === url)) { $('#bookmark-error').textContent = 'Địa chỉ này đã có trong dấu trang.'; return; }
      state.bookmarks.push({ id: uid(), title: name.slice(0, 60), url, external: $('#bookmark-external').checked, kind: 'custom' });
      closeBookmarkDialog(); renderAll(); save(); toast('Đã thêm lối tắt mới.');
    }
  });
  document.addEventListener('focusout', event => {
    if (!event.target.matches?.('.address-form input')) return;
    const tab = tabById(event.target.closest('.tab-view')?.dataset.tabId);
    if (tab) event.target.value = displayAddress(currentUrl(tab));
  });
  document.addEventListener('input', event => {
    if (!event.target.matches('.note-input')) return;
    state.notes = event.target.value.slice(0, 100000);
    $$('.note-input').forEach(el => { if (el !== event.target) el.value = state.notes; });
    $$('.note-count').forEach(el => { el.textContent = `${state.notes.length} ký tự`; });
    save();
  });
  document.addEventListener('change', event => {
    if (event.target.id === 'search-engine') {
      state.settings.search = event.target.value; save();
      $$('.home-search input').forEach(el => { el.placeholder = `Tìm trên ${providerLabels[state.settings.search]} (tab mới) hoặc nhập URL`; });
      state.tabs.forEach(updateToolbar);
    }
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Tab' && currentDrawer && !$('#bookmark-dialog').open) {
      const focusable = $$('.drawer button:not([disabled]), .drawer select:not([disabled]), .drawer input:not([disabled]), .drawer [tabindex]:not([tabindex="-1"])').filter(el => el.getClientRects().length);
      if (focusable.length) {
        const first = focusable[0], last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    }
    if (event.key === 'Escape') {
      // Let the native dialog close itself without also dismissing the drawer underneath.
      if ($('#bookmark-dialog').open) return;
      if (currentDrawer) closeDrawer(); closeMenu(); return;
    }
    const tabEl = event.target.closest?.('.tab-select');
    if (tabEl && event.target === tabEl && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault(); const id = tabEl.dataset.id; selectTab(id); $(`.tab-select[data-id="${id}"]`)?.focus(); return;
    }
    if (tabEl && event.target === tabEl && ['ArrowLeft', 'ArrowRight'].includes(event.key)) {
      event.preventDefault(); const index = state.tabs.findIndex(t => t.id === tabEl.dataset.id);
      const next = (index + (event.key === 'ArrowRight' ? 1 : -1) + state.tabs.length) % state.tabs.length;
      const id = state.tabs[next].id; selectTab(id); $(`.tab-select[data-id="${id}"]`)?.focus(); return;
    }
    if (event.target.id === 'split-divider' && state.split && ['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key)) {
      event.preventDefault(); const negative = event.key === 'ArrowLeft' || event.key === 'ArrowUp'; changeRatio(state.ratio + (negative ? -2 : 2)); save(); return;
    }
    if ($('#bookmark-dialog').open || currentDrawer) return;
    const mod = event.ctrlKey || event.metaKey;
    const key = event.key.toLowerCase();
    if (mod && key === 't' && event.shiftKey) { event.preventDefault(); reopenTab(); }
    else if (mod && key === 't') { event.preventDefault(); newTab(HOME, { focus: true }); }
    else if (mod && key === 'w') { event.preventDefault(); closeTab(activeId()); }
    else if (mod && key === 'l') { event.preventDefault(); focusAddress(); }
    else if (mod && key === 'r') { event.preventDefault(); reload(activeTab()); }
    else if (event.ctrlKey && key === 'tab') { event.preventDefault(); const index = state.tabs.findIndex(t => t.id === activeId()); const next = (index + (event.shiftKey ? -1 : 1) + state.tabs.length) % state.tabs.length; selectTab(state.tabs[next].id); }
    else if (event.altKey && event.key === 'ArrowLeft') { event.preventDefault(); moveHistory(activeTab(), -1); }
    else if (event.altKey && event.key === 'ArrowRight') { event.preventDefault(); moveHistory(activeTab(), 1); }
  });
  let dragging = false;
  const divider = $('#split-divider');
  divider.addEventListener('pointerdown', event => {
    if (!state.split || event.button !== 0) return;
    event.preventDefault(); dragging = true; document.body.classList.add('dragging-split'); divider.setPointerCapture(event.pointerId);
  });
  divider.addEventListener('pointermove', event => {
    if (!dragging) return;
    const rect = $('#stage').getBoundingClientRect();
    const mobile = matchMedia('(max-width: 760px)').matches;
    changeRatio(mobile ? (event.clientY - rect.top) / rect.height * 100 : (event.clientX - rect.left) / rect.width * 100);
  });
  function finishDragging() { if (!dragging) return; dragging = false; document.body.classList.remove('dragging-split'); save(); }
  divider.addEventListener('pointerup', finishDragging); divider.addEventListener('pointercancel', finishDragging); divider.addEventListener('lostpointercapture', finishDragging);
})();

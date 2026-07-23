// =====================================================
// STATE
// =====================================================
let prompts = [];
let state = {
  view: 'all', search: '', sort: 'newest', viewMode: 'grid',
  bulkMode: false, bulkSelected: new Set(),
  filters: { category: [], sector: [], model: [], difficulty: [], rating: [] },
  activeModalId: null, sidebarOpen: false,
  page: 1, perPage: 24,
  collections: JSON.parse(localStorage.getItem('pv_collections') || '[]'),
  notes: JSON.parse(localStorage.getItem('pv_notes') || '{}'),
  ratings: JSON.parse(localStorage.getItem('pv_ratings') || '{}'),
  theme: localStorage.getItem('pv_theme') || 'dark',
  generatedPrompt: ''
};

// =====================================================
// DOM
// =====================================================
const el = {
  promptGrid: document.getElementById('promptGrid'),
  emptyState: document.getElementById('emptyState'),
  emptyTitle: document.getElementById('emptyTitle'),
  emptyDesc: document.getElementById('emptyDesc'),
  emptyActionBtn: document.getElementById('emptyActionBtn'),
  searchInput: document.getElementById('searchInput'),
  sortDropdown: document.getElementById('sortDropdown'),
  resultsCounter: document.getElementById('resultsCounter'),
  promptCounter: document.getElementById('promptCounter'),
  featuredCard: document.getElementById('featuredCard'),
  featuredTitle: document.getElementById('featuredTitle'),
  featuredPrompt: document.getElementById('featuredPrompt'),
  featuredMeta: document.getElementById('featuredMeta'),
  navAll: document.getElementById('navAll'),
  navSaved: document.getElementById('navSaved'),
  navCompare: document.getElementById('navCompare'),
  navGenerator: document.getElementById('navGenerator'),
  modalOverlay: document.getElementById('modalOverlay'),
  modalTitle: document.getElementById('modalTitle'),
  modalPrompt: document.getElementById('modalPrompt'),
  modalMeta: document.getElementById('modalMeta'),
  modalTags: document.getElementById('modalTags'),
  modalStars: document.getElementById('modalStars'),
  modalNotes: document.getElementById('modalNotes'),
  modalClose: document.getElementById('modalClose'),
  modalCopyBtn: document.getElementById('modalCopyBtn'),
  modalSaveBtn: document.getElementById('modalSaveBtn'),
  modalShareBtn: document.getElementById('modalShareBtn'),
  modalAddCollectionBtn: document.getElementById('modalAddCollectionBtn'),
  toastContainer: document.getElementById('toastContainer'),
  sidebar: document.getElementById('sidebar'),
  sidebarOverlay: document.getElementById('sidebarOverlay'),
  mobileFilterBtn: document.getElementById('mobileFilterBtn'),
  clearFiltersBtn: document.getElementById('clearFiltersBtn'),
  categoryFilters: document.getElementById('categoryFilters'),
  sectorFilters: document.getElementById('sectorFilters'),
  modelFilters: document.getElementById('modelFilters'),
  difficultyFilters: document.getElementById('difficultyFilters'),
  ratingFilters: document.getElementById('ratingFilters'),
  bulkBar: document.getElementById('bulkBar'),
  bulkCount: document.getElementById('bulkCount'),
  bulkToggleBtn: document.getElementById('bulkToggleBtn'),
  bulkSaveBtn: document.getElementById('bulkSaveBtn'),
  bulkExportBtn: document.getElementById('bulkExportBtn'),
  bulkClearBtn: document.getElementById('bulkClearBtn'),
  analyticsBtn: document.getElementById('analyticsBtn'),
  analyticsPanel: document.getElementById('analyticsPanel'),
  analyticsClose: document.getElementById('analyticsClose'),
  analyticsContent: document.getElementById('analyticsContent'),
  collectionsBtn: document.getElementById('collectionsBtn'),
  collectionsPanel: document.getElementById('collectionsPanel'),
  collectionsClose: document.getElementById('collectionsClose'),
  collectionsContent: document.getElementById('collectionsContent'),
  themeToggle: document.getElementById('themeToggle'),
  shortcutsBtn: document.getElementById('shortcutsBtn'),
  shortcutsModal: document.getElementById('shortcutsModal'),
  shortcutsClose: document.getElementById('shortcutsClose'),
  exportBtn: document.getElementById('exportBtn'),
  exportModal: document.getElementById('exportModal'),
  exportClose: document.getElementById('exportClose'),
  exportJsonBtn: document.getElementById('exportJsonBtn'),
  exportSavedJsonBtn: document.getElementById('exportSavedJsonBtn'),
  exportCsvBtn: document.getElementById('exportCsvBtn'),
  importFile: document.getElementById('importFile'),
  importBtn: document.getElementById('importBtn'),
  viewAll: document.getElementById('viewAll'),
  viewCompare: document.getElementById('viewCompare'),
  viewGenerator: document.getElementById('viewGenerator'),
  compareSelect1: document.getElementById('compareSelect1'),
  compareSelect2: document.getElementById('compareSelect2'),
  compareTitle1: document.getElementById('compareTitle1'),
  compareTitle2: document.getElementById('compareTitle2'),
  comparePrompt1: document.getElementById('comparePrompt1'),
  comparePrompt2: document.getElementById('comparePrompt2'),
  genCategory: document.getElementById('genCategory'),
  genSector: document.getElementById('genSector'),
  genModel: document.getElementById('genModel'),
  genDifficulty: document.getElementById('genDifficulty'),
  genTopic: document.getElementById('genTopic'),
  genRequirements: document.getElementById('genRequirements'),
  genGenerateBtn: document.getElementById('genGenerateBtn'),
  genOutput: document.getElementById('genOutput'),
  genOutputText: document.getElementById('genOutputText'),
  genCopyBtn: document.getElementById('genCopyBtn'),
  genSaveBtn: document.getElementById('genSaveBtn'),
  pagination: document.getElementById('pagination'),
  loadingScreen: document.getElementById('loadingScreen')
};

// =====================================================
// UTILS
// =====================================================
function debounce(fn, delay) { let t; return function() { const c = this, a = arguments; clearTimeout(t); t = setTimeout(function() { fn.apply(c, a); }, delay); }; }
function getUnique(arr, key) { return Array.from(new Set(arr.map(function(i) { return i[key]; }))).filter(Boolean).sort(); }
function esc(t) { if (!t) return ''; var d = document.createElement('div'); d.textContent = String(t); return d.innerHTML; }
function save(key, val) { localStorage.setItem('pv_' + key, JSON.stringify(val)); }

function showToast(msg, type) {
  type = type || 'success';
  var t = document.createElement('div');
  t.className = 'toast toast-' + type;
  var icon = type === 'success'
    ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>'
    : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>';
  t.innerHTML = '<span class="toast-icon">' + icon + '</span>' + esc(msg);
  el.toastContainer.appendChild(t);
  requestAnimationFrame(function() { t.classList.add('show'); });
  setTimeout(function() { t.classList.remove('show'); setTimeout(function() { t.remove(); }, 300); }, 2500);
}

// =====================================================
// THEME
// =====================================================
function applyTheme(theme) {
  if (document.startViewTransition) {
    document.startViewTransition(function() { updateThemeDOM(theme); });
  } else { updateThemeDOM(theme); }
}
function updateThemeDOM(theme) {
  document.documentElement.dataset.theme = theme;
  state.theme = theme;
  save('theme', theme);
  el.themeToggle.innerHTML = theme === 'dark'
    ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
    : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>';
}

// =====================================================
// FILTERS
// =====================================================
function renderFilters() {
  renderCheckboxGroup(el.categoryFilters, 'category', getUnique(prompts, 'category'));
  renderCheckboxGroup(el.sectorFilters, 'sector', getUnique(prompts, 'sector'));
  renderCheckboxGroup(el.modelFilters, 'model', getUnique(prompts, 'model'));
  renderRadioGroup(el.difficultyFilters, 'difficulty', ['Beginner', 'Intermediate', 'Advanced']);
  renderRatingFilter(el.ratingFilters, [5, 4, 3, 2, 1]);
}

function renderCheckboxGroup(container, key, options) {
  container.innerHTML = options.map(function(opt) {
    var checked = state.filters[key].indexOf(opt) >= 0 ? 'checked' : '';
    return '<label class="filter-option"><input type="checkbox" value="' + esc(opt) + '" ' + checked + ' data-fk="' + key + '"><span>' + esc(opt) + '</span><span class="filter-count"></span></label>';
  }).join('');
}

function renderRadioGroup(container, key, options) {
  container.innerHTML = '<label class="filter-option"><input type="radio" name="' + key + '" value="" ' + (state.filters[key].length === 0 ? 'checked' : '') + ' data-fk="' + key + '"><span>All</span></label>' +
    options.map(function(opt) {
      return '<label class="filter-option"><input type="radio" name="' + key + '" value="' + esc(opt) + '" ' + (state.filters[key].indexOf(opt) >= 0 ? 'checked' : '') + ' data-fk="' + key + '"><span>' + esc(opt) + '</span></label>';
    }).join('');
}

function renderRatingFilter(container, ratings) {
  container.innerHTML = '<label class="filter-option"><input type="radio" name="rating" value="" ' + (state.filters.rating.length === 0 ? 'checked' : '') + ' data-fk="rating"><span>All Ratings</span></label>' +
    ratings.map(function(r) {
      return '<label class="filter-option"><input type="radio" name="rating" value="' + r + '" ' + (state.filters.rating.indexOf(String(r)) >= 0 ? 'checked' : '') + ' data-fk="rating"><span>' + '\u2605'.repeat(r) + '</span></label>';
    }).join('');
}

function updateFilterCounts(filtered) {
  var counts = { category: {}, sector: {}, model: {}, difficulty: {} };
  getUnique(prompts, 'category').forEach(function(c) { counts.category[c] = filtered.filter(function(p) { return p.category === c; }).length; });
  getUnique(prompts, 'sector').forEach(function(s) { counts.sector[s] = filtered.filter(function(p) { return p.sector === s; }).length; });
  getUnique(prompts, 'model').forEach(function(m) { counts.model[m] = filtered.filter(function(p) { return p.model === m; }).length; });
  ['Beginner','Intermediate','Advanced'].forEach(function(d) { counts.difficulty[d] = filtered.filter(function(p) { return p.difficulty === d; }).length; });
  document.querySelectorAll('.filter-count').forEach(function(e) {
    var inp = e.parentElement.querySelector('input');
    if (inp && inp.dataset.fk && counts[inp.dataset.fk]) {
      e.textContent = counts[inp.dataset.fk][inp.value] || 0;
    }
  });
}

// =====================================================
// SEARCH (AND/OR/NOT)
// =====================================================
function advancedSearch(list, query) {
  if (!query.trim()) return list;
  var q = query.trim();
  if (q.indexOf(' OR ') >= 0) {
    var terms = q.split(' OR ').map(function(t) { return t.trim().toLowerCase(); });
    return list.filter(function(p) { return terms.some(function(t) { return matchTerm(p, t); }); });
  }
  if (q.indexOf(' AND ') >= 0) {
    var terms2 = q.split(' AND ').map(function(t) { return t.trim().toLowerCase(); });
    return list.filter(function(p) {
      return terms2.every(function(t) {
        if (t.indexOf('NOT ') === 0) return !matchTerm(p, t.slice(4));
        return matchTerm(p, t);
      });
    });
  }
  if (q.indexOf('NOT ') === 0) return list.filter(function(p) { return !matchTerm(p, q.slice(4).trim().toLowerCase()); });
  var ql = q.toLowerCase();
  return list.filter(function(p) { return matchTerm(p, ql); });
}

function matchTerm(p, term) {
  return p.title.toLowerCase().indexOf(term) >= 0 ||
    p.prompt.toLowerCase().indexOf(term) >= 0 ||
    (p.tags && p.tags.some(function(t) { return t.toLowerCase().indexOf(term) >= 0; })) ||
    p.category.toLowerCase().indexOf(term) >= 0 ||
    p.sector.toLowerCase().indexOf(term) >= 0;
}

// =====================================================
// FILTERING & SORTING
// =====================================================
function getFiltered() {
  var f = prompts.slice();
  if (state.view === 'saved') f = f.filter(function(p) { return p.isSaved; });
  f = advancedSearch(f, state.search);
  Object.keys(state.filters).forEach(function(k) {
    if (state.filters[k].length > 0) {
      if (k === 'rating') {
        f = f.filter(function(p) { return state.filters[k].some(function(r) { return (state.ratings[p.id] || 0) >= parseInt(r); }); });
      } else {
        f = f.filter(function(p) { return state.filters[k].indexOf(p[k]) >= 0; });
      }
    }
  });
  switch (state.sort) {
    case 'newest': f.sort(function(a, b) { return new Date(b.dateAdded) - new Date(a.dateAdded); }); break;
    case 'oldest': f.sort(function(a, b) { return new Date(a.dateAdded) - new Date(b.dateAdded); }); break;
    case 'mostSaved': f.sort(function(a, b) { return b.saves - a.saves; }); break;
    case 'highestRated': f.sort(function(a, b) { return (state.ratings[b.id] || 0) - (state.ratings[a.id] || 0); }); break;
    case 'az': f.sort(function(a, b) { return a.title.localeCompare(b.title); }); break;
    case 'za': f.sort(function(a, b) { return b.title.localeCompare(a.title); }); break;
  }
  return f;
}

// =====================================================
// RENDER
// =====================================================
// Cached filtered results for pagination
var _lastFiltered = null;
var _filterDirty = true;

function invalidateFilter() { _filterDirty = true; }

function getFilteredCached() {
  if (_filterDirty) { _lastFiltered = getFiltered(); _filterDirty = false; }
  return _lastFiltered;
}

function render() {
  invalidateFilter();
  var filtered = getFilteredCached();
  // Only update counts when sidebar is visible (avoid heavy count pass on every render)
  requestAnimationFrame(function() { updateFilterCounts(filtered); });
  var total = state.view === 'saved' ? prompts.filter(function(p) { return p.isSaved; }).length : prompts.length;
  var totalPages = Math.max(1, Math.ceil(filtered.length / state.perPage));
  state.page = Math.min(state.page, totalPages);
  el.resultsCounter.innerHTML = 'Showing <strong>' + filtered.length + '</strong> of ' + total + ' prompts';
  el.promptCounter.textContent = prompts.length.toLocaleString() + ' prompts';
  updateNav();
  renderGrid(filtered);
  renderFeatured();
  renderPagination(filtered.length, totalPages);
  updateBulkBar();
}

function updateNav() {
  [el.navAll, el.navSaved, el.navCompare, el.navGenerator].forEach(function(b) { b.classList.remove('active'); });
  if (state.view === 'all') el.navAll.classList.add('active');
  else if (state.view === 'saved') el.navSaved.classList.add('active');
  else if (state.view === 'compare') el.navCompare.classList.add('active');
  else if (state.view === 'generator') el.navGenerator.classList.add('active');
  el.viewAll.style.display = (state.view === 'all' || state.view === 'saved') ? 'block' : 'none';
  el.viewCompare.style.display = state.view === 'compare' ? 'block' : 'none';
  el.viewGenerator.style.display = state.view === 'generator' ? 'block' : 'none';
}

function renderGrid(filtered) {
  if (filtered.length === 0) {
    el.promptGrid.style.display = 'none';
    el.emptyState.style.display = 'block';
    el.emptyTitle.textContent = state.view === 'saved' ? 'No saved prompts yet' : 'No prompts found';
    el.emptyDesc.textContent = state.view === 'saved' ? 'Start saving prompts and they will appear here.' : 'Try adjusting your search or filters.';
    el.emptyActionBtn.textContent = state.view === 'saved' ? 'Browse All' : 'Clear Filters';
    if (el.pagination) el.pagination.style.display = 'none';
    return;
  }
  el.promptGrid.style.display = '';
  el.emptyState.style.display = 'none';
  el.promptGrid.className = 'prompt-grid' + (state.viewMode === 'list' ? ' view-list' : state.viewMode === 'compact' ? ' view-compact' : '') + (state.bulkMode ? ' bulk-mode' : '');

  // Pagination slice
  var start = (state.page - 1) * state.perPage;
  var end = start + state.perPage;
  var pageItems = filtered.slice(start, end);

  var frag = document.createDocumentFragment();
  pageItems.forEach(function(p, i) {
    var card = document.createElement('div');
    card.className = 'prompt-card' + (state.bulkSelected.has(p.id) ? ' selected' : '');
    card.dataset.id = p.id;
    card.style.animationDelay = Math.min(i * 0.03, 0.3) + 's';
    card.setAttribute('role', 'listitem');
    card.setAttribute('tabindex', '0');
    var rating = state.ratings[p.id] || 0;
    var stars = [1,2,3,4,5].map(function(s) { return '<span class="star' + (s <= rating ? ' filled' : '') + '" data-star="' + s + '">' + (s <= rating ? '\u2605' : '\u2606') + '</span>'; }).join('');
    var dots = getDots(p.difficulty);
    card.innerHTML =
      '<div class="card-select' + (state.bulkSelected.has(p.id) ? ' checked' : '') + '" data-select="' + p.id + '"></div>' +
      '<div class="card-header"><div class="card-title">' + esc(p.title) + '</div>' +
      '<div class="card-actions"><button class="action-btn' + (p.isSaved ? ' saved' : '') + '" data-action="save" data-id="' + p.id + '">' +
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="' + (p.isSaved ? 'currentColor' : 'none') + '" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg></button></div></div>' +
      '<div class="card-prompt">' + esc(p.prompt) + '</div>' +
      '<div class="card-rating" data-rating-card="' + p.id + '">' + stars + '</div>' +
      '<div class="card-meta"><span class="badge badge-category">' + esc(p.category) + '</span><span class="badge badge-model">' + esc(p.model) + '</span>' +
      '<span class="difficulty-dots" title="' + esc(p.difficulty) + '">' + dots + '</span></div>' +
      '<div class="card-footer"><span class="card-saves">Saved ' + p.saves + ' times</span>' +
      '<button class="card-copy-btn" data-action="copy" data-id="' + p.id + '">Copy</button></div>';
    frag.appendChild(card);
  });
  el.promptGrid.innerHTML = '';
  el.promptGrid.appendChild(frag);
}

function getDots(d) {
  var n = d === 'Beginner' ? 1 : d === 'Intermediate' ? 2 : 3;
  return [1,2,3].map(function(i) { return '<span class="difficulty-dot' + (i <= n ? ' active' : '') + '"></span>'; }).join('');
}

function renderFeatured() {
  if (!prompts.length) return;
  var idx = Math.floor(Date.now() / 86400000) % prompts.length;
  var f = prompts[idx];
  el.featuredTitle.textContent = f.title;
  el.featuredPrompt.textContent = f.prompt;
  el.featuredMeta.innerHTML = '<span class="badge badge-category">' + esc(f.category) + '</span><span class="badge badge-model">' + esc(f.model) + '</span>';
  el.featuredCard.dataset.id = f.id;
}

// =====================================================
// PAGINATION
// =====================================================
function renderPagination(total, totalPages) {
  if (!el.pagination) return;
  if (totalPages <= 1) { el.pagination.style.display = 'none'; return; }
  el.pagination.style.display = 'flex';

  var html = '';
  // Prev button
  html += '<button class="page-btn" id="prevPage" ' + (state.page <= 1 ? 'disabled' : '') + ' aria-label="Previous page">' +
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>' +
    '</button>';

  // Page numbers — show limited window around current
  var pages = [];
  var range = 2;
  for (var i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= state.page - range && i <= state.page + range)) {
      pages.push(i);
    }
  }

  var prev = 0;
  pages.forEach(function(p) {
    if (prev && p - prev > 1) html += '<span class="page-ellipsis">…</span>';
    html += '<button class="page-btn' + (p === state.page ? ' active' : '') + '" data-page="' + p + '">' + p + '</button>';
    prev = p;
  });

  // Next button
  html += '<button class="page-btn" id="nextPage" ' + (state.page >= totalPages ? 'disabled' : '') + ' aria-label="Next page">' +
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>' +
    '</button>';

  // Page count
  html += '<span class="page-info">Page ' + state.page + ' of ' + totalPages + '</span>';

  el.pagination.innerHTML = html;

  // Events
  el.pagination.querySelector('#prevPage').addEventListener('click', function() {
    if (state.page > 1) { state.page--; renderGrid(getFilteredCached()); renderPagination(total, totalPages); scrollToTop(); }
  });
  el.pagination.querySelector('#nextPage').addEventListener('click', function() {
    if (state.page < totalPages) { state.page++; renderGrid(getFilteredCached()); renderPagination(total, totalPages); scrollToTop(); }
  });
  el.pagination.querySelectorAll('[data-page]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      state.page = parseInt(btn.dataset.page);
      renderGrid(getFilteredCached());
      renderPagination(total, totalPages);
      scrollToTop();
    });
  });
}

function scrollToTop() {
  var grid = el.promptGrid;
  if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// =====================================================
// MODAL
// =====================================================
function openModal(id) {
  var p = prompts.find(function(x) { return x.id === id; });
  if (!p) return;
  state.activeModalId = id;
  el.modalTitle.textContent = p.title;
  el.modalPrompt.textContent = p.prompt;
  var rating = state.ratings[id] || 0;
  el.modalStars.innerHTML = [1,2,3,4,5].map(function(s) { return '<span class="star' + (s <= rating ? ' filled' : '') + '" data-modal-star="' + s + '">' + (s <= rating ? '\u2605' : '\u2606') + '</span>'; }).join('');
  el.modalMeta.innerHTML = metaItem('Category', p.category) + metaItem('Sector', p.sector) + metaItem('Model', p.model) + metaItem('Difficulty', p.difficulty) + metaItem('Author', p.author) + metaItem('Date', p.dateAdded);
  el.modalNotes.value = state.notes[id] || '';
  el.modalTags.innerHTML = (p.tags || []).map(function(t) { return '<button class="tag-pill" data-tag="' + esc(t) + '">' + esc(t) + '</button>'; }).join('');
  updateModalSaveBtn(p.isSaved);
  el.modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function metaItem(label, val) {
  return '<div class="modal-meta-item"><div class="modal-meta-label">' + label + '</div><div class="modal-meta-value">' + esc(val) + '</div></div>';
}

function closeModal() {
  if (state.activeModalId && el.modalNotes.value !== (state.notes[state.activeModalId] || '')) {
    state.notes[state.activeModalId] = el.modalNotes.value;
    save('notes', state.notes);
  }
  el.modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
  state.activeModalId = null;
}

function updateModalSaveBtn(saved) {
  el.modalSaveBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="' + (saved ? 'currentColor' : 'none') + '" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg> ' + (saved ? 'Unsave' : 'Save');
  el.modalSaveBtn.classList.toggle('saved', saved);
}

// =====================================================
// ACTIONS
// =====================================================
function toggleSave(id) {
  var p = prompts.find(function(x) { return x.id === id; });
  if (!p) return;
  p.isSaved = !p.isSaved;
  p.saves += p.isSaved ? 1 : -1;
  showToast(p.isSaved ? 'Prompt saved' : 'Prompt removed');
  if (state.activeModalId === id) updateModalSaveBtn(p.isSaved);
  invalidateFilter();
  renderGrid(getFilteredCached());
  renderFeatured();
  updateBulkBar();
}

function copyPrompt(id) {
  var p = prompts.find(function(x) { return x.id === id; });
  if (!p) return;
  navigator.clipboard.writeText(p.prompt).then(function() { showToast('Copied to clipboard'); }).catch(function() { showToast('Copied', 'info'); });
}

function sharePrompt(id) {
  var p = prompts.find(function(x) { return x.id === id; });
  if (!p) return;
  navigator.clipboard.writeText('"' + p.title + '"\n\n' + p.prompt + '\n\n- via PromptVault').then(function() { showToast('Share snippet copied'); });
}

function setRating(id, rating) {
  state.ratings[id] = state.ratings[id] === rating ? 0 : rating;
  save('ratings', state.ratings);
  if (state.activeModalId === id) {
    el.modalStars.innerHTML = [1,2,3,4,5].map(function(s) { return '<span class="star' + (s <= state.ratings[id] ? ' filled' : '') + '" data-modal-star="' + s + '">' + (s <= state.ratings[id] ? '\u2605' : '\u2606') + '</span>'; }).join('');
  }
  // Re-render just the card stars, not full render
  var card = el.promptGrid.querySelector('[data-id="' + id + '"]');
  if (card) {
    var ratingDiv = card.querySelector('[data-rating-card]');
    if (ratingDiv) ratingDiv.innerHTML = [1,2,3,4,5].map(function(s) { return '<span class="star' + (s <= (state.ratings[id]||0) ? ' filled' : '') + '" data-star="' + s + '">' + (s <= (state.ratings[id]||0) ? '\u2605' : '\u2606') + '</span>'; }).join('');
  }
}

// =====================================================
// BULK
// =====================================================
function toggleBulkMode() {
  state.bulkMode = !state.bulkMode;
  state.bulkSelected.clear();
  el.bulkToggleBtn.classList.toggle('active', state.bulkMode);
  invalidateFilter();
  render();
}

function toggleBulkSelect(id) {
  if (state.bulkSelected.has(id)) state.bulkSelected.delete(id);
  else state.bulkSelected.add(id);
  updateBulkBar();
  var card = el.promptGrid.querySelector('[data-id="' + id + '"]');
  if (card) {
    card.classList.toggle('selected', state.bulkSelected.has(id));
    var sel = card.querySelector('.card-select');
    if (sel) sel.classList.toggle('checked', state.bulkSelected.has(id));
  }
}

function updateBulkBar() {
  el.bulkBar.classList.toggle('active', state.bulkMode);
  el.bulkCount.textContent = state.bulkSelected.size + ' selected';
}

// =====================================================
// ANALYTICS
// =====================================================
function renderAnalytics() {
  var cats = {}, sectors = {}, diffs = {Beginner:0, Intermediate:0, Advanced:0}, models = {};
  prompts.forEach(function(p) {
    cats[p.category] = (cats[p.category] || 0) + 1;
    sectors[p.sector] = (sectors[p.sector] || 0) + 1;
    if (diffs[p.difficulty] !== undefined) diffs[p.difficulty]++;
    models[p.model] = (models[p.model] || 0) + 1;
  });
  var savedCount = prompts.filter(function(p) { return p.isSaved; }).length;
  var ratedCount = Object.keys(state.ratings).length;
  var avgRating = ratedCount > 0 ? (Object.values(state.ratings).reduce(function(a, b) { return a + b; }, 0) / ratedCount).toFixed(1) : '0';

  el.analyticsContent.innerHTML =
    '<div class="stat-card"><div class="stat-label">Total Prompts</div><div class="stat-value">' + prompts.length.toLocaleString() + '</div></div>' +
    '<div class="stat-card"><div class="stat-label">Saved</div><div class="stat-value">' + savedCount + '</div><div class="stat-bar"><div class="stat-bar-fill" style="width:' + (savedCount / prompts.length * 100) + '%"></div></div></div>' +
    '<div class="stat-card"><div class="stat-label">Rated</div><div class="stat-value">' + ratedCount + '</div></div>' +
    '<div class="stat-card"><div class="stat-label">Avg Rating</div><div class="stat-value">' + avgRating + ' \u2605</div></div>' +
    '<div class="chart-container"><div class="chart-title">By Category</div><div class="bar-chart">' + barChart(cats, prompts.length) + '</div></div>' +
    '<div class="chart-container"><div class="chart-title">By Difficulty</div><div class="bar-chart">' + barChart(diffs, prompts.length) + '</div></div>' +
    '<div class="chart-container"><div class="chart-title">By Model</div><div class="bar-chart">' + barChart(models, prompts.length) + '</div></div>';
}

function barChart(data, total) {
  return Object.entries(data).sort(function(a, b) { return b[1] - a[1]; }).map(function(kv) {
    return '<div class="bar-row"><span class="bar-label">' + esc(kv[0]) + '</span><div class="bar-track"><div class="bar-fill" style="width:' + (kv[1] / total * 100) + '%">' + kv[1] + '</div></div></div>';
  }).join('');
}

// =====================================================
// COLLECTIONS
// =====================================================
function renderCollections() {
  el.collectionsContent.innerHTML = state.collections.map(function(c, i) {
    return '<div class="collection-item"><div class="collection-item-name">' + esc(c.name) + '</div><div class="collection-item-count">' + c.promptIds.length + ' prompts</div>' +
      '<div class="collection-item-actions"><button class="bulk-btn" data-cv="' + i + '">View</button><button class="bulk-btn danger" data-cd="' + i + '">Delete</button></div></div>';
  }).join('') + '<button class="collection-add" id="addCollectionBtn">+ New Collection</button>';

  var addBtn = document.getElementById('addCollectionBtn');
  if (addBtn) addBtn.addEventListener('click', function() {
    var name = window.prompt('Collection name:');
    if (name && name.trim()) {
      state.collections.push({ name: name.trim(), promptIds: [] });
      save('collections', state.collections);
      renderCollections();
      showToast('Collection created');
    }
  });

  el.collectionsContent.querySelectorAll('[data-cv]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var idx = parseInt(btn.dataset.cv);
      var col = state.collections[idx];
      if (col && col.promptIds.length > 0) {
        state.view = 'all'; state.search = ''; el.searchInput.value = '';
        state.filters = { category: [], sector: [], model: [], difficulty: [], rating: [] };
        renderFilters();
        var colPrompts = prompts.filter(function(p) { return col.promptIds.includes(p.id); });
        el.promptGrid.className = 'prompt-grid';
        el.emptyState.style.display = 'none';
        el.promptGrid.style.display = '';
        invalidateFilter();
        renderGrid(colPrompts);
        el.resultsCounter.innerHTML = 'Showing <strong>' + colPrompts.length + '</strong> prompts in ' + esc(col.name);
        el.collectionsPanel.classList.remove('open');
      } else { showToast('Collection is empty', 'info'); }
    });
  });

  el.collectionsContent.querySelectorAll('[data-cd]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var idx = parseInt(btn.dataset.cd);
      if (confirm('Delete collection "' + state.collections[idx].name + '"?')) {
        state.collections.splice(idx, 1);
        save('collections', state.collections);
        renderCollections();
        showToast('Collection deleted');
      }
    });
  });
}

// =====================================================
// GENERATOR
// =====================================================
function initGenerator() {
  el.genCategory.innerHTML = getUnique(prompts, 'category').map(function(c) { return '<option>' + esc(c) + '</option>'; }).join('');
  el.genSector.innerHTML = getUnique(prompts, 'sector').map(function(s) { return '<option>' + esc(s) + '</option>'; }).join('');
  el.genModel.innerHTML = getUnique(prompts, 'model').map(function(m) { return '<option>' + esc(m) + '</option>'; }).join('');
  el.genDifficulty.innerHTML = ['Beginner', 'Intermediate', 'Advanced'].map(function(d) { return '<option>' + d + '</option>'; }).join('');
}

function generatePrompt() {
  var cat = el.genCategory.value;
  var sector = el.genSector.value;
  var model = el.genModel.value;
  var diff = el.genDifficulty.value;
  var topic = el.genTopic.value || 'a general topic';
  var reqs = el.genRequirements.value;
  var templates = [
    'Create a comprehensive ' + diff.toLowerCase() + '-level guide for ' + topic + ' in the ' + sector + ' sector. Include step-by-step instructions, best practices, common pitfalls to avoid, and real-world examples. Tailor the content for use with ' + model + '.',
    'Develop a detailed framework for ' + topic + ' targeting ' + sector + ' professionals. Cover strategy, implementation steps, measurement criteria, and optimization techniques. Difficulty level: ' + diff + '.',
    'Design a complete workflow for ' + topic + ' in a ' + sector + ' context. Include templates, checklists, decision trees, and quality assurance checkpoints. Optimize for ' + model + ' output quality.',
    'Generate a structured plan for ' + topic + ' that includes: objectives, target audience analysis, resource requirements, timeline, risk assessment, and success metrics. Focus on ' + sector + ' industry standards.',
    'Write an expert-level prompt for ' + topic + ' that will produce actionable, detailed output from ' + model + '. Include context, constraints, desired format, and quality criteria.'
  ];
  var output = templates[Math.floor(Math.random() * templates.length)];
  if (reqs) output += '\n\nAdditional requirements: ' + reqs;
  state.generatedPrompt = output;
  el.genOutputText.textContent = output;
  el.genOutput.style.display = 'block';
  showToast('Prompt generated');
}

// =====================================================
// EXPORT/IMPORT
// =====================================================
function download(name, data, type) {
  var blob = new Blob([data], { type: type });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url; a.download = name; a.click();
  URL.revokeObjectURL(url);
}

function exportAll() {
  download('promptvault-all.json', JSON.stringify(prompts.map(function(p) { return Object.assign({}, p, { rating: state.ratings[p.id], note: state.notes[p.id] }); }), null, 2), 'application/json');
  showToast('Exported all prompts');
}

function exportSaved() {
  var saved = prompts.filter(function(p) { return p.isSaved; }).map(function(p) { return Object.assign({}, p, { rating: state.ratings[p.id], note: state.notes[p.id] }); });
  download('promptvault-saved.json', JSON.stringify(saved, null, 2), 'application/json');
  showToast('Exported saved prompts');
}

function exportCsv() {
  var saved = prompts.filter(function(p) { return p.isSaved; });
  var header = 'ID,Title,Category,Sector,Model,Difficulty,Tags,Author,Saves,Rating,Note\n';
  var rows = saved.map(function(p) {
    return [p.id, '"' + p.title.replace(/"/g, '""') + '"', p.category, p.sector, p.model, p.difficulty, '"' + (p.tags||[]).join(';') + '"', p.author, p.saves, state.ratings[p.id] || 0, '"' + (state.notes[p.id] || '').replace(/"/g, '""') + '"'].join(',');
  }).join('\n');
  download('promptvault-saved.csv', header + rows, 'text/csv');
  showToast('Exported CSV');
}

// =====================================================
// COMPARE
// =====================================================
function initCompare() {
  var opts = '<option value="">Select prompt...</option>' + prompts.slice(0, 300).map(function(p) { return '<option value="' + p.id + '">' + esc(p.title) + '</option>'; }).join('');
  el.compareSelect1.innerHTML = opts;
  el.compareSelect2.innerHTML = opts;
}

function updateCompare(sel, titleEl, promptEl) {
  var id = parseInt(sel.value);
  var p = prompts.find(function(x) { return x.id === id; });
  if (p) { titleEl.textContent = p.title; promptEl.textContent = p.prompt; }
  else { titleEl.textContent = 'Select a prompt'; promptEl.textContent = 'Select a prompt to compare'; }
}

// =====================================================
// EVENTS
// =====================================================
function bindEvents() {
  el.searchInput.addEventListener('input', debounce(function() {
    state.search = this.value;
    state.page = 1;
    invalidateFilter();
    render();
  }, 300));
  el.sortDropdown.addEventListener('change', function() { state.sort = this.value; state.page = 1; invalidateFilter(); render(); });
  el.navAll.addEventListener('click', function() { state.view = 'all'; state.page = 1; invalidateFilter(); render(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
  el.navSaved.addEventListener('click', function() { state.view = 'saved'; state.page = 1; invalidateFilter(); render(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
  el.navCompare.addEventListener('click', function() { state.view = 'compare'; render(); });
  el.navGenerator.addEventListener('click', function() { state.view = 'generator'; render(); });

  el.clearFiltersBtn.addEventListener('click', function() {
    state.filters = { category: [], sector: [], model: [], difficulty: [], rating: [] };
    state.search = ''; el.searchInput.value = '';
    state.page = 1; invalidateFilter();
    renderFilters(); render();
  });

  el.emptyActionBtn.addEventListener('click', function() {
    if (state.view === 'saved') { state.view = 'all'; state.page = 1; invalidateFilter(); render(); }
    else el.clearFiltersBtn.click();
  });

  document.addEventListener('change', function(e) {
    var inp = e.target;
    if (!inp.dataset.fk) return;
    var k = inp.dataset.fk;
    if (inp.type === 'radio') { state.filters[k] = inp.value ? [inp.value] : []; }
    else {
      if (inp.checked) state.filters[k].push(inp.value);
      else state.filters[k] = state.filters[k].filter(function(v) { return v !== inp.value; });
    }
    state.page = 1; invalidateFilter(); render();
  });

  el.promptGrid.addEventListener('click', function(e) {
    var saveBtn = e.target.closest('[data-action="save"]');
    if (saveBtn) { e.stopPropagation(); toggleSave(parseInt(saveBtn.dataset.id)); return; }
    var copyBtn = e.target.closest('[data-action="copy"]');
    if (copyBtn) { e.stopPropagation(); copyPrompt(parseInt(copyBtn.dataset.id)); return; }
    var sel = e.target.closest('.card-select');
    if (sel) { e.stopPropagation(); toggleBulkSelect(parseInt(sel.dataset.select)); return; }
    var star = e.target.closest('[data-star]');
    if (star) { e.stopPropagation(); setRating(parseInt(star.closest('[data-rating-card]').dataset.ratingCard), parseInt(star.dataset.star)); return; }
    var card = e.target.closest('.prompt-card');
    if (card) openModal(parseInt(card.dataset.id));
  });

  el.promptGrid.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      var card = e.target.closest('.prompt-card');
      if (card && e.target === card) { e.preventDefault(); openModal(parseInt(card.dataset.id)); }
    }
  });

  el.featuredCard.addEventListener('click', function() { openModal(parseInt(el.featuredCard.dataset.id)); });
  el.modalClose.addEventListener('click', closeModal);
  el.modalOverlay.addEventListener('click', function(e) { if (e.target === el.modalOverlay) closeModal(); });
  el.modalCopyBtn.addEventListener('click', function() { if (state.activeModalId) copyPrompt(state.activeModalId); });
  el.modalSaveBtn.addEventListener('click', function() { if (state.activeModalId) toggleSave(state.activeModalId); });
  el.modalShareBtn.addEventListener('click', function() { if (state.activeModalId) sharePrompt(state.activeModalId); });
  el.modalAddCollectionBtn.addEventListener('click', function() {
    if (!state.activeModalId) return;
    var name = window.prompt('Add to collection (enter name or create new):');
    if (!name || !name.trim()) return;
    var col = state.collections.find(function(c) { return c.name === name.trim(); });
    if (!col) { col = { name: name.trim(), promptIds: [] }; state.collections.push(col); }
    if (col.promptIds.indexOf(state.activeModalId) === -1) col.promptIds.push(state.activeModalId);
    save('collections', state.collections);
    showToast('Added to "' + name.trim() + '"');
  });

  el.modalStars.addEventListener('click', function(e) {
    var star = e.target.closest('[data-modal-star]');
    if (star && state.activeModalId) setRating(state.activeModalId, parseInt(star.dataset.modalStar));
  });

  el.modalTags.addEventListener('click', function(e) {
    var pill = e.target.closest('.tag-pill');
    if (pill) { state.search = pill.dataset.tag; el.searchInput.value = pill.dataset.tag; state.view = 'all'; state.page = 1; closeModal(); invalidateFilter(); render(); showToast('Filtering: ' + pill.dataset.tag, 'info'); }
  });

  document.querySelectorAll('.view-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.view-btn').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      state.viewMode = btn.dataset.view;
      renderGrid(getFilteredCached());
    });
  });

  el.bulkToggleBtn.addEventListener('click', toggleBulkMode);
  el.bulkSaveBtn.addEventListener('click', function() {
    state.bulkSelected.forEach(function(id) {
      var p = prompts.find(function(x) { return x.id === id; });
      if (p && !p.isSaved) { p.isSaved = true; p.saves++; }
    });
    showToast(state.bulkSelected.size + ' prompts saved');
    state.bulkSelected.clear(); invalidateFilter(); render();
  });
  el.bulkExportBtn.addEventListener('click', function() {
    var data = prompts.filter(function(p) { return state.bulkSelected.has(p.id); });
    download('promptvault-bulk.json', JSON.stringify(data, null, 2), 'application/json');
    showToast('Exported ' + data.length + ' prompts');
  });
  el.bulkClearBtn.addEventListener('click', function() { state.bulkSelected.clear(); renderGrid(getFilteredCached()); updateBulkBar(); });

  el.analyticsBtn.addEventListener('click', function() { el.analyticsPanel.classList.toggle('open'); el.collectionsPanel.classList.remove('open'); renderAnalytics(); });
  el.analyticsClose.addEventListener('click', function() { el.analyticsPanel.classList.remove('open'); });
  el.collectionsBtn.addEventListener('click', function() { el.collectionsPanel.classList.toggle('open'); el.analyticsPanel.classList.remove('open'); renderCollections(); });
  el.collectionsClose.addEventListener('click', function() { el.collectionsPanel.classList.remove('open'); });

  el.themeToggle.addEventListener('click', function() { applyTheme(state.theme === 'dark' ? 'light' : 'dark'); });
  el.shortcutsBtn.addEventListener('click', function() { el.shortcutsModal.classList.add('active'); });
  el.shortcutsClose.addEventListener('click', function() { el.shortcutsModal.classList.remove('active'); });
  el.shortcutsModal.addEventListener('click', function(e) { if (e.target === el.shortcutsModal) el.shortcutsModal.classList.remove('active'); });

  el.exportBtn.addEventListener('click', function() { el.exportModal.classList.add('active'); });
  el.exportClose.addEventListener('click', function() { el.exportModal.classList.remove('active'); });
  el.exportModal.addEventListener('click', function(e) { if (e.target === el.exportModal) el.exportModal.classList.remove('active'); });
  el.exportJsonBtn.addEventListener('click', exportAll);
  el.exportSavedJsonBtn.addEventListener('click', exportSaved);
  el.exportCsvBtn.addEventListener('click', exportCsv);
  el.importBtn.addEventListener('click', function() {
    var file = el.importFile.files[0];
    if (!file) { showToast('Select a file first', 'info'); return; }
    var reader = new FileReader();
    reader.onload = function(e) {
      try {
        var imported = JSON.parse(e.target.result);
        var count = 0;
        imported.forEach(function(p) {
          if (p.id && p.title && p.prompt && !prompts.find(function(x) { return x.id === p.id; })) {
            prompts.push(p); count++;
          }
        });
        invalidateFilter(); render(); renderFilters(); initCompare();
        showToast('Imported ' + count + ' new prompts');
      } catch (err) { showToast('Invalid JSON file', 'info'); }
    };
    reader.readAsText(file);
  });

  el.mobileFilterBtn.addEventListener('click', function() { state.sidebarOpen = !state.sidebarOpen; el.sidebar.classList.toggle('open', state.sidebarOpen); el.sidebarOverlay.classList.toggle('active', state.sidebarOpen); });
  el.sidebarOverlay.addEventListener('click', function() { state.sidebarOpen = false; el.sidebar.classList.remove('open'); el.sidebarOverlay.classList.remove('active'); });

  el.compareSelect1.addEventListener('change', function() { updateCompare(el.compareSelect1, el.compareTitle1, el.comparePrompt1); });
  el.compareSelect2.addEventListener('change', function() { updateCompare(el.compareSelect2, el.compareTitle2, el.comparePrompt2); });

  el.genGenerateBtn.addEventListener('click', generatePrompt);
  el.genCopyBtn.addEventListener('click', function() { navigator.clipboard.writeText(state.generatedPrompt).then(function() { showToast('Copied'); }); });
  el.genSaveBtn.addEventListener('click', function() {
    var name = window.prompt('Save to collection:');
    if (name && name.trim()) showToast('Generated prompt saved to "' + name.trim() + '"');
  });

  document.addEventListener('click', function(e) {
    if (el.analyticsPanel.classList.contains('open') && !el.analyticsPanel.contains(e.target) && !el.analyticsBtn.contains(e.target)) {
      el.analyticsPanel.classList.remove('open');
    }
    if (el.collectionsPanel.classList.contains('open') && !el.collectionsPanel.contains(e.target) && !el.collectionsBtn.contains(e.target)) {
      el.collectionsPanel.classList.remove('open');
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
    if (e.key === 'Escape') { closeModal(); el.shortcutsModal.classList.remove('active'); el.exportModal.classList.remove('active'); el.analyticsPanel.classList.remove('open'); el.collectionsPanel.classList.remove('open'); }
    if (e.key === '/') { e.preventDefault(); el.searchInput.focus(); }
    if (e.key === '?') el.shortcutsModal.classList.toggle('active');
    if (e.key === '1') { state.view = 'all'; state.page = 1; invalidateFilter(); render(); }
    if (e.key === '2') { state.view = 'saved'; state.page = 1; invalidateFilter(); render(); }
    if (e.key === '3') { state.view = 'compare'; render(); }
    if (e.key === '4') { state.view = 'generator'; render(); }
    if (e.key === 't' || e.key === 'T') applyTheme(state.theme === 'dark' ? 'light' : 'dark');
    if (e.key === 'b' || e.key === 'B') toggleBulkMode();
    if (e.key === 'a' || e.key === 'A') el.analyticsBtn.click();
    if (e.key === 'c' || e.key === 'C') el.collectionsBtn.click();
    if (e.key === 'g' || e.key === 'G') {
      var modes = ['grid', 'list', 'compact'];
      var next = modes[(modes.indexOf(state.viewMode) + 1) % 3];
      state.viewMode = next;
      document.querySelectorAll('.view-btn').forEach(function(b) { b.classList.toggle('active', b.dataset.view === next); });
      renderGrid(getFilteredCached());
    }
  });
}

// =====================================================
// LOADING SCREEN
// =====================================================
function hideLoadingScreen() {
  var ls = el.loadingScreen;
  if (!ls) return;
  ls.style.opacity = '0';
  ls.style.transform = 'scale(1.02)';
  setTimeout(function() { ls.style.display = 'none'; }, 500);
}

function updateLoadingProgress(pct, msg) {
  var bar = document.getElementById('loadingBar');
  var text = document.getElementById('loadingText');
  if (bar) bar.style.width = pct + '%';
  if (text) text.textContent = msg || 'Loading...';
}

// =====================================================
// INIT — async data load
// =====================================================
applyTheme(state.theme);

fetch('js/data.json')
  .then(function(res) {
    updateLoadingProgress(30, 'Downloading prompts...');
    if (!res.ok) throw new Error('Failed to load data.json');
    return res.json();
  })
  .then(function(data) {
    updateLoadingProgress(80, 'Processing ' + data.length.toLocaleString() + ' prompts...');
    prompts = data;
    // Short delay so progress bar is visible
    return new Promise(function(resolve) { setTimeout(resolve, 200); });
  })
  .then(function() {
    updateLoadingProgress(100, 'Ready!');
    return new Promise(function(resolve) { setTimeout(resolve, 300); });
  })
  .then(function() {
    hideLoadingScreen();
    renderFilters();
    render();
    initGenerator();
    initCompare();
    bindEvents();
  })
  .catch(function(err) {
    console.error('Failed to load prompts:', err);
    updateLoadingProgress(100, 'Error loading data. Please refresh.');
  });

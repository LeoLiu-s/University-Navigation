let currentModule = 'university';
let cityFilter = 'all';
let typeFilter = 'all';
let categoryFilter = 'all';
let schoolTypeFilter = 'all';
let searchFilter = '';
let sidebarCollapsed = false;
let visitStats = {};
let favorites = new Set();

(function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.setAttribute('data-theme', 'light');
        const btn = document.querySelector('.theme-toggle');
        if (btn) btn.textContent = '\u2600\uFE0F';
    }
})();

document.addEventListener('keydown', function(e) {
    if (e.key === '/' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        const searchInput = document.getElementById('searchInput');
        if (searchInput) searchInput.focus();
    }
    if (e.key === 'Escape' && document.activeElement === document.getElementById('searchInput')) {
        document.getElementById('searchInput').blur();
        document.getElementById('searchInput').value = '';
        searchFilter = '';
        renderCards();
    }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const cards = document.querySelectorAll('.card');
        if (!cards.length) return;
        const current = document.activeElement;
        let idx = Array.from(cards).findIndex(c => c === current || c.contains(current));
        if (e.key === 'ArrowDown') {
            idx = idx < cards.length - 1 ? idx + 1 : 0;
        } else {
            idx = idx > 0 ? idx - 1 : cards.length - 1;
        }
        cards[idx].focus();
        cards[idx].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        e.preventDefault();
    }
    if (e.key === 'Enter') {
        const card = document.activeElement?.closest('.card[data-id]');
        if (card) {
            visitUrl(parseInt(card.dataset.id), card.dataset.url, e);
        }
    }
});

let scrollTimer = null;
window.addEventListener('scroll', function() {
    if (scrollTimer) return;
    scrollTimer = setTimeout(function() {
        const btn = document.getElementById('backToTop');
        if (btn) {
            btn.style.display = document.documentElement.scrollTop > 300 ? 'block' : 'none';
        }
        scrollTimer = null;
    }, 100);
});

let touchStartX = 0;
let touchStartY = 0;
document.addEventListener('touchstart', function(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener('touchend', function(e) {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 60) {
        const sidebar = document.getElementById('sidebar');
        if (dx > 0 && window.innerWidth <= 768) {
            sidebar.classList.add('active');
            document.getElementById('menuToggle').classList.add('active');
        } else if (dx < 0 && window.innerWidth <= 768) {
            sidebar.classList.remove('active');
            document.getElementById('menuToggle').classList.remove('active');
        }
    }
}, { passive: true });

function init() {
    const savedStats = localStorage.getItem('visitStats');
    if (savedStats) {
        try { visitStats = JSON.parse(savedStats); } catch(e) { visitStats = {}; }
    }
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
        try { favorites = new Set(JSON.parse(savedFavorites)); } catch(e) { favorites = new Set(); }
    }
    renderSidebar();
    renderFilters();
    renderCards();
    initEvents();
}

init();

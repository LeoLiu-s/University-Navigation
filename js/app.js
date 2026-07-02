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
        if (btn) btn.textContent = '☀️';
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
});

window.onscroll = function() {
    const btn = document.getElementById('backToTop');
    if (btn) {
        btn.style.display = document.documentElement.scrollTop > 300 ? 'block' : 'none';
    }
};

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

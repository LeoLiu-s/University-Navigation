function initEvents() {
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentModule = tab.dataset.module;
            cityFilter = 'all';
            typeFilter = 'all';
            categoryFilter = 'all';
            schoolTypeFilter = 'all';
            document.getElementById('searchInput').value = '';
            searchFilter = '';
            updateUI();
        });
    });

    document.getElementById('sidebarList').addEventListener('click', (e) => {
        const item = e.target.closest('.sidebar-item');
        if (item) {
            document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            cityFilter = item.dataset.city;
            renderCards();
            if (window.innerWidth <= 768) {
                document.getElementById('sidebar').classList.remove('active');
            }
        }
    });

    document.getElementById('filters').addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-btn');
        if (btn) {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            if (btn.dataset.category) {
                categoryFilter = btn.dataset.category;
            } else if (btn.dataset.type) {
                typeFilter = btn.dataset.type;
            } else if (btn.dataset.schooltype) {
                schoolTypeFilter = btn.dataset.schooltype;
            } else if (btn.dataset.combined) {
                const [st, t] = btn.dataset.combined.split('-');
                schoolTypeFilter = st;
                typeFilter = t;
            }
            renderFilters();
            renderCards();
        }
    });

    document.getElementById('cardGrid').addEventListener('click', (e) => {
        const favBtn = e.target.closest('[data-fav-id]');
        if (favBtn) {
            e.stopPropagation();
            toggleFavorite(parseInt(favBtn.dataset.favId));
            return;
        }
        const visitLink = e.target.closest('[data-visit-id]');
        if (visitLink) {
            e.stopPropagation();
            visitUrl(parseInt(visitLink.dataset.visitId), visitLink.dataset.visitUrl, e);
            return;
        }
        const card = e.target.closest('.card[data-id]');
        if (card) {
            visitUrl(parseInt(card.dataset.id), card.dataset.url, e);
        }
    });

    let searchTimer;
    document.getElementById('searchInput').addEventListener('input', (e) => {
        searchFilter = e.target.value;
        clearTimeout(searchTimer);
        searchTimer = setTimeout(renderCards, 200);
    });

    document.getElementById('menuToggle').addEventListener('click', () => {
        document.getElementById('sidebar').classList.toggle('active');
        document.getElementById('menuToggle').classList.toggle('active');
    });

    document.getElementById('sidebarToggle').addEventListener('click', (e) => {
        e.stopPropagation();
        toggleSidebar();
    });
}

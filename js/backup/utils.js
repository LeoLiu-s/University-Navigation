function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}


function highlightText(text, keyword) {
    if (!keyword) return escapeHtml(text);
    const kw = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const escaped = escapeHtml(text);
    const regex = new RegExp('(' + kw + ')', 'gi');
    return escaped.replace(regex, '<mark style="background:rgba(99,102,241,0.3);color:inherit;border-radius:2px;padding:0 2px">$1</mark>');
}

function getCategory(name) {
    if (name.includes('师范')) return '师范';
    if (name.includes('医学') || name.includes('医药') || name.includes('卫生') || name.includes('护理')) return '医药';
    if (name.includes('理工') || name.includes('工业') || name.includes('科技') || name.includes('工程') || name.includes('职业技术')) return '理工';
    if (name.includes('财经') || name.includes('经贸') || name.includes('商务')) return '财经';
    if (name.includes('农林') || name.includes('农业') || name.includes('林业') || name.includes('水利')) return '农林';
    if (name.includes('警察') || name.includes('公安') || name.includes('司法')) return '政法';
    if (name.includes('体育')) return '综合';
    if (name.includes('艺术') || name.includes('美术') || name.includes('音乐') || name.includes('传媒') || name.includes('文化')) return '综合';
    if (name.includes('旅游') || name.includes('烹饪') || name.includes('酒店')) return '综合';
    if (name.includes('交通') || name.includes('铁路') || name.includes('轨道') || name.includes('航空') || name.includes('汽车')) return '交通';
    if (name.includes('建筑') || name.includes('城建')) return '综合';
    return '综合';
}

function getSchoolType(name) {
    const items = currentModule === 'university' ? universityData.items : [];
    const item = items.find(i => i.name === name);
    if (item && item.schoolType) return item.schoolType;
    return '公办';
}

function visitUrl(id, url, event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    if (url && url !== '#') {
        const key = currentModule + '_' + id;
        visitStats[key] = (visitStats[key] || 0) + 1;
        try { localStorage.setItem('visitStats', JSON.stringify(visitStats)); } catch(e) {}

        const today = new Date().toDateString();
        let todayVisits = 0;
        try {
            const savedDate = localStorage.getItem('lastVisitDate');
            todayVisits = parseInt(localStorage.getItem('todayVisits') || '0');
            if (savedDate !== today) todayVisits = 0;
        } catch(e) {}
        todayVisits++;
        try {
            localStorage.setItem('todayVisits', todayVisits.toString());
            localStorage.setItem('lastVisitDate', today);
        } catch(e) {}

        window.open(url, '_blank', 'noopener');

        fetch('https://api.countapi.xyz/hit/henan-nav/total').catch(() => {});
        const todayKey = 'today' + new Date().toISOString().slice(0,10);
        fetch(`https://api.countapi.xyz/hit/henan-nav/${todayKey}`).catch(() => {});

        renderCards();
        updateVisitStats();
    }
}

function toggleFavorite(id) {
    const key = currentModule + '_' + id;
    if (favorites.has(key)) {
        favorites.delete(key);
    } else {
        favorites.add(key);
    }
    try { localStorage.setItem('favorites', JSON.stringify([...favorites])); } catch(e) {}
    renderCards();
    updateVisitStats();
}

function doInternetSearch() {
    const keyword = document.getElementById('internetSearch').value.trim();
    const engineKey = document.getElementById('searchEngine').value;
    if (keyword) {
        const engine = searchEngines.find(e => e.key === engineKey);
        if (engine) window.open(engine.url + encodeURIComponent(keyword), '_blank', 'noopener');
    }
}

function doMonitorSearch() {
    const keyword = document.getElementById('monitorKeyword').value.trim();
    const scope = document.getElementById('monitorScope').value;
    if (!keyword) { alert('请输入要监控的关键词'); return; }

    let searchKeyword;
    if (scope === 'all') {
        searchKeyword = keyword + ' 河南高校';
    } else if (scope === '其他') {
        searchKeyword = keyword + ' 河南 高校';
    } else {
        searchKeyword = keyword + ' ' + scope + ' 高校';
    }

    window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(searchKeyword), '_blank', 'noopener');
}

function doGovSearch() {
    const keyword = document.getElementById('govSearchInput').value.trim();
    const site = document.getElementById('govSearchSite').value;
    if (keyword) {
        const domain = govDomains[site];
        window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(keyword + ' site:' + domain), '_blank', 'noopener');
    }
}

function toggleTheme() {
    const body = document.body;
    const btn = document.querySelector('.theme-toggle');
    if (body.getAttribute('data-theme') === 'light') {
        body.setAttribute('data-theme', 'dark');
        btn.textContent = '\u{1F319}';
        localStorage.setItem('theme', 'dark');
    } else {
        body.setAttribute('data-theme', 'light');
        btn.textContent = '\u2600\uFE0F';
        localStorage.setItem('theme', 'light');
    }
}

function toggleSidebar() {
    sidebarCollapsed = !sidebarCollapsed;
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const toggleBtn = document.getElementById('sidebarToggle');
    const visitCounter = document.querySelector('.visit-counter');
    if (sidebar) sidebar.classList.toggle('collapsed');
    if (mainContent) mainContent.classList.toggle('expanded');
    if (toggleBtn) {
        toggleBtn.classList.toggle('collapsed');
        toggleBtn.textContent = sidebarCollapsed ? '\u25B6' : '\u25C0';
        toggleBtn.title = sidebarCollapsed ? '展开侧边栏' : '折叠侧边栏';
    }
    if (visitCounter) visitCounter.classList.toggle('collapsed');
}

function backToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateVisitStats() {
    let totalVisits = 0;
    Object.values(visitStats).forEach(v => totalVisits += v);
    document.getElementById('totalVisits').textContent = totalVisits;

    const today = new Date().toDateString();
    let todayVisits = 0;
    try {
        const savedDate = localStorage.getItem('lastVisitDate');
        if (savedDate === today) {
            todayVisits = parseInt(localStorage.getItem('todayVisits') || '0');
        }
    } catch(e) {}
    document.getElementById('todayVisits').textContent = todayVisits;

    fetch('https://api.countapi.xyz/get/henan-nav/total')
        .then(r => r.json()).then(d => {
            if (d.value !== undefined) document.getElementById('totalVisits').textContent = d.value;
        }).catch(() => {});
    const todayKey = 'today' + new Date().toISOString().slice(0,10);
    fetch(`https://api.countapi.xyz/get/henan-nav/${todayKey}`)
        .then(r => r.json()).then(d => {
            if (d.value !== undefined) document.getElementById('todayVisits').textContent = d.value;
        }).catch(() => {});
}

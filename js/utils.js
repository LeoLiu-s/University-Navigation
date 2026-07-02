function getCategory(name) {
    if (name.includes('师范')) return '师范';
    if (name.includes('医学') || name.includes('医药') || name.includes('卫生') || name.includes('护理')) return '医药';
    if (name.includes('理工') || name.includes('工业') || name.includes('科技') || name.includes('工程') || name.includes('职业技术')) return '理工';
    if (name.includes('财经') || name.includes('经贸') || name.includes('商务')) return '财经';
    if (name.includes('农林') || name.includes('农业') || name.includes('林业') || name.includes('水利')) return '农林';
    if (name.includes('警察') || name.includes('公安') || name.includes('司法')) return '政法';
    if (name.includes('体育')) return '体育';
    if (name.includes('艺术') || name.includes('美术') || name.includes('音乐') || name.includes('传媒') || name.includes('文化')) return '艺术';
    if (name.includes('旅游') || name.includes('烹饪') || name.includes('酒店')) return '旅游';
    if (name.includes('交通') || name.includes('铁路') || name.includes('轨道') || name.includes('航空') || name.includes('汽车')) return '交通';
    if (name.includes('建筑') || name.includes('城建')) return '建筑';
    return '综合';
}

function getSchoolType(name) {
    if (name.includes('西亚斯')) return '中外合作';
    if (privateSchools.includes(name)) return '民办';
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
        localStorage.setItem('visitStats', JSON.stringify(visitStats));

        const today = new Date().toDateString();
        const savedDate = localStorage.getItem('lastVisitDate');
        let todayVisits = parseInt(localStorage.getItem('todayVisits') || '0');
        if (savedDate !== today) {
            todayVisits = 0;
        }
        todayVisits++;
        localStorage.setItem('todayVisits', todayVisits.toString());
        localStorage.setItem('lastVisitDate', today);

        window.open(url, '_blank', 'noopener');
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
    localStorage.setItem('favorites', JSON.stringify([...favorites]));
    renderCards();
    updateVisitStats();
}

function doInternetSearch() {
    const keyword = document.getElementById('internetSearch').value.trim();
    const engine = document.getElementById('searchEngine').value;
    if (keyword) {
        const urls = {
            baidu: 'https://www.baidu.com/s?wd=',
            bing: 'https://www.bing.com/search?q=',
            google: 'https://www.google.com/search?q=',
            sogou: 'https://www.sogou.com/web?query='
        };
        window.open(urls[engine] + encodeURIComponent(keyword), '_blank', 'noopener');
    }
}

function doMonitorSearch() {
    const keyword = document.getElementById('monitorKeyword').value.trim();
    const scope = document.getElementById('monitorScope').value;
    if (!keyword) { alert('请输入要监控的关键词'); return; }

    let searchKeyword = keyword;
    if (scope === 'all') {
        searchKeyword = keyword + ' 河南高校';
    } else if (scope === '其他') {
        searchKeyword = keyword + ' 河南 ' + scope + ' 高校';
    } else {
        searchKeyword = keyword + ' ' + scope + ' 高校';
    }

    const searchUrl = 'https://www.baidu.com/s?wd=' + encodeURIComponent(searchKeyword);
    window.open(searchUrl, '_blank', 'noopener');
}

function doGovSearch() {
    const keyword = document.getElementById('govSearchInput').value.trim();
    const site = document.getElementById('govSearchSite').value;
    if (keyword) {
        const domain = govDomains[site];
        const searchUrl = 'https://www.baidu.com/s?wd=' + encodeURIComponent(keyword + ' site:' + domain);
        window.open(searchUrl, '_blank', 'noopener');
    }
}

function toggleTheme() {
    const body = document.body;
    const btn = document.querySelector('.theme-toggle');
    if (body.getAttribute('data-theme') === 'light') {
        body.setAttribute('data-theme', 'dark');
        btn.textContent = '🌙';
        localStorage.setItem('theme', 'dark');
    } else {
        body.setAttribute('data-theme', 'light');
        btn.textContent = '☀️';
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
        toggleBtn.textContent = sidebarCollapsed ? '▶' : '◀';
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
    const savedDate = localStorage.getItem('lastVisitDate');
    if (savedDate !== today) {
        localStorage.setItem('todayVisits', '0');
        localStorage.setItem('lastVisitDate', today);
    }
    const todayVisits = parseInt(localStorage.getItem('todayVisits') || '0');
    document.getElementById('todayVisits').textContent = todayVisits;
}

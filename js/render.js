function renderSidebar() {
    const data = currentModule === 'university' ? universityData : govData;
    const counts = {};
    data.items.forEach(item => {
        counts[item.location] = (counts[item.location] || 0) + 1;
    });

    document.getElementById('sidebarList').innerHTML = data.sidebar.map(item => {
        const count = item.key === 'all' ? data.items.length : (counts[item.key] || 0);
        return `
            <div class="sidebar-item ${cityFilter === item.key ? 'active' : ''}" data-city="${item.key}">
                <span class="sidebar-icon">${item.icon}</span>
                <span>${item.name}</span>
                <span class="sidebar-count">${count}</span>
            </div>
        `;
    }).join('');
    updateVisitStats();
}

function renderFilters() {
    const data = currentModule === 'university' ? universityData : govData;
    let filtersHtml = '';

    if (currentModule !== 'custom') {
        filtersHtml += '<div class="filter-group">';
        filtersHtml += data.filters.map(f => `
            <button class="filter-btn ${typeFilter === f.key ? 'active' : ''}" data-type="${f.key}">${f.name}</button>
        `).join('');
        filtersHtml += '</div>';
    }

    if (currentModule === 'university') {
        filtersHtml += '<div class="filter-group">';
        filtersHtml += categoryFilters.map(f => `
            <button class="filter-btn category-filter ${categoryFilter === f.key ? 'active' : ''}" data-category="${f.key}">${f.name}</button>
        `).join('');
        filtersHtml += '</div>';

        const uniTotal = universityData.items.length;
        const pubCount = universityData.items.filter(i => getSchoolType(i.name) === '公办').length;
        const priCount = universityData.items.filter(i => getSchoolType(i.name) === '民办').length;
        filtersHtml += '<div class="filter-group">';
        filtersHtml += [
            { name: `全部 (${uniTotal})`, key: 'all' },
            { name: `公办 (${pubCount})`, key: '公办' },
            { name: `民办 (${priCount})`, key: '民办' }
        ].map(f => `
            <button class="filter-btn ${schoolTypeFilter === f.key ? 'active' : ''}" data-schooltype="${f.key}">${f.name}</button>
        `).join('');
        filtersHtml += '</div>';

        const pubUG = universityData.items.filter(i => getSchoolType(i.name) === '公办' && i.type === '本科').length;
        const priUG = universityData.items.filter(i => getSchoolType(i.name) === '民办' && i.type === '本科').length;
        const pubC = universityData.items.filter(i => getSchoolType(i.name) === '公办' && i.type === '专科').length;
        const priC = universityData.items.filter(i => getSchoolType(i.name) === '民办' && i.type === '专科').length;
        filtersHtml += '<div class="filter-group" style="margin-top:8px">';
        filtersHtml += [
            { name: `公办本科 (${pubUG})`, st: '公办', t: '本科' },
            { name: `民办本科 (${priUG})`, st: '民办', t: '本科' },
            { name: `公办专科 (${pubC})`, st: '公办', t: '专科' },
            { name: `民办专科 (${priC})`, st: '民办', t: '专科' }
        ].map(f => `
            <button class="filter-btn ${schoolTypeFilter === f.st && typeFilter === f.t ? 'active' : ''}" data-combined="${f.st}-${f.t}">${f.name}</button>
        `).join('');
        filtersHtml += '</div>';
    }

    document.getElementById('filters').innerHTML = filtersHtml;
}

function renderCards() {
    let filtered;
    const data = currentModule === 'university' ? universityData : govData;
    filtered = data.items.filter(item => {
        const matchCity = cityFilter === 'all' || item.location === cityFilter;
        const matchType = typeFilter === 'all' || item.type === typeFilter;
        const matchCategory = categoryFilter === 'all' || getCategory(item.name) === categoryFilter;
        const matchSchoolType = schoolTypeFilter === 'all' || getSchoolType(item.name) === schoolTypeFilter;
        const kw = searchFilter.toLowerCase();
        const matchSearch = kw === '' ||
            item.name.toLowerCase().includes(kw) ||
            (item.py && item.py.includes(kw)) ||
            (item.pyi && item.pyi.includes(kw));
        return matchCity && matchType && matchCategory && matchSchoolType && matchSearch;
    });

    const grid = document.getElementById('cardGrid');
    if (filtered.length === 0) {
        grid.innerHTML = '<div class="empty-state"><div class="icon">🔍</div><p>没有找到匹配的网站</p></div>';
        return;
    }

    grid.innerHTML = filtered.map((item, index) => {
        const logoChar = item.name.charAt(0);
        const num = index + 1;

        const cardClass = currentModule === 'university'
            ? (item.type === '本科' ? 'benke' : 'zhuanke')
            : (item.type === '省级' ? 'shengji' : 'dishiji');
        const tagClass = currentModule === 'university'
            ? (item.type === '本科' ? 'benke' : 'zhuanke')
            : (item.type === '省级' ? 'shengji' : 'dishiji');
        const key = currentModule + '_' + item.id;
        const visits = visitStats[key] || 0;
        const isFavorited = favorites.has(key);
        const domain = item.url.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
        const faviconUrl = 'https://favicon.hlycc.com/' + domain + '.png';
        const schoolType = getSchoolType(item.name);
        const typeClass = schoolType === '民办' ? 'private' : (schoolType === '中外合作' ? 'coop' : 'public');

        return `
            <div class="card ${cardClass} ${currentModule === 'gov' ? 'gov' : ''}" style="animation-delay: ${index * 0.03}s" onclick="visitUrl(${item.id}, '${item.url}', event)">
                <div class="card-header">
                    <span class="card-num">${num}</span>
                    <img class="card-favicon" src="${faviconUrl}" alt="${item.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" />
                    <div class="card-logo" style="display:none">${logoChar}</div>
                    <div class="card-info">
                        <div class="card-title">${item.name}</div>
                        <span class="card-tag ${tagClass}">${item.type}</span>
                        ${currentModule === 'university' ? `<span class="card-school-type ${typeClass}">${schoolType}</span>` : ''}
                    </div>
                </div>
                <div class="card-url">${item.url}</div>
                <div class="card-footer">
                    <span class="card-meta">📍 ${item.location} · 👁 ${visits}次</span>
                    <div class="card-actions">
                        <button class="card-fav ${isFavorited ? 'active' : ''}" onclick="event.stopPropagation(); toggleFavorite(${item.id})" title="收藏">${isFavorited ? '⭐' : '☆'}</button>
                        <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="card-action" onclick="event.stopPropagation();visitUrl(${item.id}, '${item.url}', event)">访问</a>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function updateUI() {
    const data = currentModule === 'university' ? universityData : govData;
    document.getElementById('pageTitle').textContent = currentModule === 'university' ? '河南高校官网导航' : '河南省政府采购网导航';
    document.getElementById('pageSubtitle').textContent = currentModule === 'university' ? '182 所高等院校' : '19 个政府采购网站';
    document.getElementById('sidebarTitle').textContent = '按城市筛选';
    document.getElementById('searchInput').placeholder = '搜索网站...';

    document.getElementById('govSearchBox').style.display = currentModule === 'gov' ? 'flex' : 'none';
    document.getElementById('monitorSearchBox').style.display = currentModule === 'university' ? 'flex' : 'none';
    renderSidebar();
    renderFilters();
    renderCards();
}

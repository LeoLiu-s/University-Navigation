function renderSidebar() {
    const data = currentModule === 'university' ? universityData : govData;
    const counts = {};
    data.items.forEach(item => {
        counts[item.location] = (counts[item.location] || 0) + 1;
    });

    document.getElementById('sidebarList').innerHTML = data.sidebar.map(item => {
        const count = item.key === 'all' ? data.items.length : (counts[item.key] || 0);
        return `
            <div class="sidebar-item ${cityFilter === item.key ? 'active' : ''}" data-city="${escapeHtml(item.key)}">
                <span class="sidebar-icon">${item.icon}</span>
                <span>${escapeHtml(item.name)}</span>
                <span class="sidebar-count">${count}</span>
            </div>
        `;
    }).join('');
    updateVisitStats();
}

function renderFilters() {
    const data = currentModule === 'university' ? universityData : govData;
    let filtersHtml = '';

    filtersHtml += '<div class="filter-group">';
    filtersHtml += data.filters.map(f => `
        <button class="filter-btn ${typeFilter === f.key ? 'active' : ''}" data-type="${escapeHtml(f.key)}">${escapeHtml(f.name)}</button>
    `).join('');
    filtersHtml += '</div>';

    if (currentModule === 'university') {
        filtersHtml += '<div class="filter-group">';
        filtersHtml += categoryFilters.map(f => `
            <button class="filter-btn category-filter ${categoryFilter === f.key ? 'active' : ''}" data-category="${escapeHtml(f.key)}">${escapeHtml(f.name)}</button>
        `).join('');
        filtersHtml += '</div>';

        let pubCount = 0, priCount = 0;
        let pubUG = 0, priUG = 0, pubC = 0, priC = 0;
        universityData.items.forEach(item => {
            const st = getSchoolType(item.name);
            if (st === '公办') {
                pubCount++;
                if (item.type === '本科') pubUG++; else pubC++;
            } else if (st === '民办') {
                priCount++;
                if (item.type === '本科') priUG++; else priC++;
            }
        });
        const uniTotal = universityData.items.length;

        filtersHtml += '<div class="filter-group">';
        filtersHtml += [
            { name: `全部 (${uniTotal})`, key: 'all' },
            { name: `公办 (${pubCount})`, key: '公办' },
            { name: `民办 (${priCount})`, key: '民办' }
        ].map(f => `
            <button class="filter-btn ${schoolTypeFilter === f.key ? 'active' : ''}" data-schooltype="${escapeHtml(f.key)}">${f.name}</button>
        `).join('');
        filtersHtml += '</div>';

        filtersHtml += '<div class="filter-group" style="margin-top:8px">';
        filtersHtml += [
            { name: `公办本科 (${pubUG})`, st: '公办', t: '本科' },
            { name: `民办本科 (${priUG})`, st: '民办', t: '本科' },
            { name: `公办专科 (${pubC})`, st: '公办', t: '专科' },
            { name: `民办专科 (${priC})`, st: '民办', t: '专科' }
        ].map(f => `
            <button class="filter-btn ${schoolTypeFilter === f.st && typeFilter === f.t ? 'active' : ''}" data-combined="${escapeHtml(f.st)}-${escapeHtml(f.t)}">${f.name}</button>
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
        grid.innerHTML = '<div class="empty-state"><div class="icon">\uD83D\uDD0D</div><p>没有找到匹配的网站</p><button class="filter-btn" onclick="clearAllFilters()" style="margin-top:12px">清除筛选</button></div>';
        return;
    }

    grid.innerHTML = filtered.map((item, index) => {
        const logoChar = escapeHtml(item.name.charAt(0));
        const num = index + 1;

        const typeClass = currentModule === 'university'
            ? (item.type === '本科' ? 'benke' : 'zhuanke')
            : (item.type === '省级' ? 'shengji' : 'dishiji');
        const key = currentModule + '_' + item.id;
        const visits = visitStats[key] || 0;
        const isFavorited = favorites.has(key);
        const domain = item.url.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
        const faviconUrl = 'https://favicon.hlycc.com/' + domain + '.png';
        const schoolType = currentModule === 'university' ? getSchoolType(item.name) : '';
        const typeClassSchool = schoolType === '民办' ? 'private' : (schoolType === '中外合作' ? 'coop' : 'public');
        const delay = Math.min(index * 0.03, 1);

        return `
            <div class="card ${typeClass} ${currentModule === 'gov' ? 'gov' : ''}" style="animation-delay: ${delay}s" data-id="${item.id}" data-url="${escapeHtml(item.url)}">
                <div class="card-header">
                    <span class="card-num">${num}</span>
                    <img class="card-favicon" src="${faviconUrl}" alt="${escapeHtml(item.name)}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" />
                    <div class="card-logo" style="display:none">${logoChar}</div>
                    <div class="card-info">
                        <div class="card-title">${escapeHtml(item.name)}</div>
                        <span class="card-tag ${typeClass}">${escapeHtml(item.type)}</span>
                        ${currentModule === 'university' ? `<span class="card-school-type ${typeClassSchool}">${escapeHtml(schoolType)}</span>` : ''}
                    </div>
                </div>
                <div class="card-url">${escapeHtml(item.url)}</div>
                <div class="card-footer">
                    <span class="card-meta">\uD83D\uDCCD ${escapeHtml(item.location)} \u00B7 \uD83D\uDC41 ${visits}次</span>
                    <div class="card-actions">
                        <button class="card-fav ${isFavorited ? 'active' : ''}" data-fav-id="${item.id}" title="收藏">${isFavorited ? '\u2B50' : '\u2606'}</button>
                        <a href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer" class="card-action" data-visit-id="${item.id}" data-visit-url="${escapeHtml(item.url)}">访问</a>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function clearAllFilters() {
    cityFilter = 'all';
    typeFilter = 'all';
    categoryFilter = 'all';
    schoolTypeFilter = 'all';
    searchFilter = '';
    document.getElementById('searchInput').value = '';
    document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
    const allItem = document.querySelector('.sidebar-item[data-city="all"]');
    if (allItem) allItem.classList.add('active');
    updateUI();
}

function updateUI() {
    const data = currentModule === 'university' ? universityData : govData;
    document.getElementById('pageTitle').textContent = currentModule === 'university' ? '河南高校官网导航' : '河南省政府采购网导航';
    document.getElementById('pageSubtitle').textContent = currentModule === 'university'
        ? `${universityData.items.length} 所高等院校`
        : `${govData.items.length} 个政府采购网站`;
    document.getElementById('sidebarTitle').textContent = '按城市筛选';
    document.getElementById('searchInput').placeholder = '搜索网站...';

    document.getElementById('govSearchBox').style.display = currentModule === 'gov' ? 'flex' : 'none';
    document.getElementById('monitorSearchBox').style.display = currentModule === 'university' ? 'flex' : 'none';
    renderSidebar();
    renderFilters();
    renderCards();
}

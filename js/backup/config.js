const searchEngines = [
    { key: 'baidu', name: '百度', url: 'https://www.baidu.com/s?wd=' },
    { key: 'bing', name: 'Bing', url: 'https://www.bing.com/search?q=' },
    { key: 'google', name: 'Google', url: 'https://www.google.com/search?q=' },
    { key: 'sogou', name: '搜狗', url: 'https://www.sogou.com/web?query=' }
];

const universitySidebar = [
    { name: '全部', icon: '📚', key: 'all' },
    { name: '郑州市', icon: '🏙️', key: '郑州市' },
    { name: '洛阳市', icon: '🏛️', key: '洛阳市' },
    { name: '新乡市', icon: '🎓', key: '新乡市' },
    { name: '南阳市', icon: '📚', key: '南阳市' },
    { name: '开封市', icon: '🏫', key: '开封市' },
    { name: '信阳市', icon: '📖', key: '信阳市' },
    { name: '焦作市', icon: '🎯', key: '焦作市' },
    { name: '平顶山市', icon: '⛰️', key: '平顶山市' },
    { name: '安阳市', icon: '🏢', key: '安阳市' },
    { name: '许昌市', icon: '🏬', key: '许昌市' },
    { name: '周口市', icon: '🏣', key: '周口市' },
    { name: '商丘市', icon: '🏪', key: '商丘市' },
    { name: '驻马店市', icon: '🏥', key: '驻马店市' },
    { name: '濮阳市', icon: '🏦', key: '濮阳市' },
    { name: '漯河市', icon: '🌊', key: '漯河市' },
    { name: '三门峡市', icon: '🌉', key: '三门峡市' },
    { name: '鹤壁市', icon: '🦢', key: '鹤壁市' },
    { name: '济源市', icon: '💧', key: '济源市' }
];

const govSidebar = [
    { name: '全部', icon: '📁', key: 'all' },
    { name: '省本级', icon: '🏛️', key: '省本级' },
    { name: '郑州市', icon: '🏙️', key: '郑州市' },
    { name: '开封市', icon: '🏫', key: '开封市' },
    { name: '洛阳市', icon: '🏛️', key: '洛阳市' },
    { name: '平顶山市', icon: '⛰️', key: '平顶山市' },
    { name: '安阳市', icon: '🏢', key: '安阳市' },
    { name: '鹤壁市', icon: '🦢', key: '鹤壁市' },
    { name: '新乡市', icon: '🎓', key: '新乡市' },
    { name: '焦作市', icon: '🎯', key: '焦作市' },
    { name: '濮阳市', icon: '🏦', key: '濮阳市' },
    { name: '许昌市', icon: '🏬', key: '许昌市' },
    { name: '漯河市', icon: '🌊', key: '漯河市' },
    { name: '三门峡市', icon: '🌉', key: '三门峡市' },
    { name: '南阳市', icon: '📚', key: '南阳市' },
    { name: '商丘市', icon: '🏪', key: '商丘市' },
    { name: '信阳市', icon: '📖', key: '信阳市' },
    { name: '周口市', icon: '🏣', key: '周口市' },
    { name: '驻马店市', icon: '🏥', key: '驻马店市' },
    { name: '济源市', icon: '💧', key: '济源市' }
];

const universityFilters = [
    { name: '全部', key: 'all' },
    { name: '本科', key: '本科' },
    { name: '专科', key: '专科' }
];

const govFilters = [
    { name: '全部', key: 'all' },
    { name: '省级', key: '省级' },
    { name: '地市级', key: '地市级' }
];

const categoryFilters = [
    { name: '全部', key: 'all' },
    { name: '师范', key: '师范' },
    { name: '医药', key: '医药' },
    { name: '理工', key: '理工' },
    { name: '财经', key: '财经' },
    { name: '农林', key: '农林' },
    { name: '政法', key: '政法' },
    { name: '交通', key: '交通' },
    { name: '综合', key: '综合' }
];

const govDomains = {
    henan: 'zfcg.henan.gov.cn',
    zhengzhou: 'zhengzhou.zfcg.henan.gov.cn',
    kaifeng: 'kaifeng.zfcg.henan.gov.cn',
    luoyang: 'luoyang.zfcg.henan.gov.cn',
    pingdingshan: 'pingdingshan.zfcg.henan.gov.cn',
    anyang: 'anyang.zfcg.henan.gov.cn',
    hebi: 'hebi.zfcg.henan.gov.cn',
    xinxiang: 'ccgp-henan.gov.cn/xinxiang',
    jiaozuo: 'jiaozuo.zfcg.henan.gov.cn',
    puyang: 'puyang.zfcg.henan.gov.cn',
    xuchang: 'ccgp-henan.gov.cn/xuchang',
    luohe: 'luohe.zfcg.henan.gov.cn',
    sanmenxia: 'sanmenxia.zfcg.henan.gov.cn',
    nanyang: 'nanyang.zfcg.henan.gov.cn',
    shangqiu: 'shangqiu.zfcg.henan.gov.cn',
    xinyang: 'xinyang.zfcg.henan.gov.cn',
    zhoukou: 'zhoukou.zfcg.henan.gov.cn',
    zhumadian: 'ccgp-henan.gov.cn/zhumadian',
    jiyuan: 'ccgp-henan.gov.cn/jiyuan'
};



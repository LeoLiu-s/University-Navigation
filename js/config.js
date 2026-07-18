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

const privateSchools = [
    '黄河科技学院', '郑州科技学院', '郑州工业应用技术学院',
    '黄河交通学院', '商丘工学院', '河南开封科技传媒学院', '中原科技学院',
    '信阳学院', '安阳学院', '豫北医学院', '新乡工程学院', '郑州工商学院',
    '郑州经贸学院', '商丘学院', '郑州商学院', '河南科技职业大学',
    '郑州升达经贸管理学院', '郑州西亚斯学院', '郑州美术学院', '漯河食品工程职业大学',
    '郑州财经学院', '郑州健康学院', '郑州黄河护理职业学院',
    '郑州电子信息职业技术学院', '郑州电力职业技术学院', '嵩山少林武术职业学院',
    '郑州城市职业学院', '焦作工贸职业学院', '许昌陶瓷职业学院',
    '郑州理工职业学院', '郑州信息工程职业学院',     '长垣烹饪职业技术学院',
    '鹤壁汽车工程职业学院',
    '郑州商贸旅游职业学院', '洛阳科技职业学院', '平顶山文化艺术职业学院',
    '信阳航空职业学院', '信阳涉外职业技术学院', '南阳职业学院', '林州建筑职业技术学院',
    '郑州电子商务职业学院', '郑州轨道工程职业学院', '郑州体育职业学院',
    '郑州城建职业学院', '郑州医药健康职业学院',
    '焦作新材料职业学院', '开封职业学院', '洛阳商业职业学院',
    '郑州软件职业技术学院', '郑州智能科技职业学院', '郑州食品工程职业学院',
    '郑州汽车工程职业学院', '信阳科技职业学院', '信阳工程职业学院',
    '周口城市职业学院', '河南新乡工商职业学院', '开封工程职业学院',
    '开封智慧健康职业学院',     '周口智慧能源职业学院', '平顶山科技职业学院'
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



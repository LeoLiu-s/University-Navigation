# University Navigation

高校官网导航 & 政府采购网导航

## 目录结构

```
University-Navigation/
├── index.html          # 主入口
├── css/
│   └── style.css       # 样式文件
├── js/
│   ├── config.js       # 配置（搜索引擎、侧边栏、过滤器、民办高校列表、gov域名）
│   ├── data.js         # 高校数据 + 政府采购数据（内联JS对象）
│   ├── app.js          # 全局状态变量 & init() 入口
│   ├── utils.js        # 工具函数（分类、收藏、搜索、主题切换等）
│   ├── render.js       # 渲染函数（sidebar、filters、cards、UI更新）
│   └── handlers.js     # 事件绑定（导航切换、过滤器点击、搜索输入等）
├── data/
│   └── universities.json  # 高校数据备份（未使用）
└── assets/             # 静态资源
```

## 功能

- 高校导航（182所，按城市/类型/类别筛选）
- 政府采购导航（19个，按地区筛选）
- 收藏、访问统计、主题切换
- 互联网搜索、高校动态搜索

## 数据加载顺序

config.js → data.js → app.js → utils.js → render.js → handlers.js → init()

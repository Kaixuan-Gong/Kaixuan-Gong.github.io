export const SITE_CONFIG = {
  profile: {
    name: '巩凯旋',
    shortName: 'KX.',
    tagline: '目标导向、强执行力，能够搭建产品 Demo 并快速推进需求落地。',
    location: '北京',
    availability: '欢迎交流 AI 产品、商业与设计',
  },
  theme: {
    ink: '#101010',
    paper: '#f4f2eb',
    accent: '#ff593d',
    electric: '#8ea7ff',
    lime: '#d8ff58',
  },
  navigation: [
    { label: '首页', href: '#home' },
    { label: '作品', href: '#works' },
    { label: '联系', href: '#contact' },
  ],
  sections: {
    resume: {
      eyebrow: 'PROFILE / 个人简历',
      title: ['WORK', 'EXPERIENCE.'],
    },
    works: {
      eyebrow: 'SELECTED WORK / 项目作品',
      title: ['SELECTED', 'WORK.'],
    },
    contact: {
      eyebrow: 'LET\'S CONNECT',
      title: ['LET\'S', 'TALK.'],
      description: '聊聊 AI 产品、商业和设计。',
    },
  },
  model: {
    url: '/assets/model/avatar.glb',
    scale: 1.28,
    position: [0, -0.12, 0],
    rotation: [0, 0, 0],
    normalStrength: 0.1,
    roughness: 0.88,
    metalness: 0,
    envMapIntensity: 0.18,
  },
  camera: {
    // 首次进入保持完整头肩构图；贴纸聚焦仍使用各自的近景机位。
    defaultPosition: [0, 0.34, 4.05],
    defaultTarget: [0, 0.34, 0],
    focusDistance: 2.12,
    transitionDuration: 1.15,
    orbitSpeed: 0.16,
    fov: 34,
  },
  lighting: {
    ambient: '#f0ede6',
    key: '#fff8ec',
    fill: '#b7c7ff',
    ambientIntensity: 1.35,
    keyIntensity: 1.58,
    fillIntensity: 3.1,
    environmentIntensity: 0.16,
    bloomIntensity: 0.025,
  },
  stickers: [
    {
      id: 'qihoo-360', title: '奇虎 360', kicker: '工作经历', resumeId: 'nami-ai',
      image: '/assets/stickers/qihoo-360.png', position: [-0.222, 0.0072, 0.4127], normal: [-0.7418, -0.3899, 0.5457],
      rotation: -0.14, scale: 0.085, projectionDepth: 0.065, focusPosition: [-0.42, 0.04, 2.02], accent: '#caff28',
      summary: '负责纳米 AI 搜索广告业务，通过 LLM 重构广告素材生成逻辑；广告原生性提升 32%，品牌词治理后 CTR 提升 16.3%。',
    },
    {
      id: 'sdufe', title: '山东财经大学', kicker: '教育背景', resumeId: 'education',
      image: '/assets/stickers/sdufe.png', position: [-0.1568, 0.081, 0.4771], normal: [-0.4069, 0.0224, 0.9132],
      rotation: 0.09, scale: 0.08, projectionDepth: 0.065, focusPosition: [-0.34, 0.12, 2], accent: '#5d8fff',
      summary: '山东财经大学投资保险学专业，2022.09—2026.07，GPA 3.5/4.0。课程涉及统计学、应用经济学、金融学与投资学。',
    },
    {
      id: 'douyin-life', title: '抖音生活服务', kicker: '工作经历', resumeId: 'life-service',
      image: '/assets/stickers/douyin-life.png', position: [0.1955, 0.081, 0.4927], normal: [0.3088, -0.0878, 0.9471],
      rotation: -0.09, scale: 0.09, projectionDepth: 0.065, focusPosition: [0.4, 0.12, 2], accent: '#ff3e64',
      summary: '负责生活服务风险治理与产品体验优化，设计并落地应急止损 Agent、AI 前置审核与一键合规，推进门店信息审核交接。',
    },
    {
      id: 'volcano-data-aml', title: '火山引擎 · Data AML', kicker: '工作经历', resumeId: 'data-aml',
      image: '/assets/stickers/volcano-data-aml.png', position: [0.239, -0.0442, 0.4344], normal: [0.6975, -0.325, 0.6386],
      rotation: 0.1, scale: 0.08, projectionDepth: 0.065, focusPosition: [0.44, 0, 2], accent: '#5a7dff',
      summary: '参与 Vaka 知识助手 0—1 落地，负责功能策划、Agent 优化与个性化推荐；深度研究效果提升 22.2%，TTFT 下降 46.1%。',
    },
    {
      id: 'league-of-legends', title: '英雄联盟', kicker: '个人生活', resumeId: 'personal',
      image: '/assets/stickers/league-of-legends.png', position: [-0.1637, -0.0674, 0.4201], normal: [-0.6424, -0.465, 0.6092],
      rotation: -0.07, scale: 0.07, projectionDepth: 0.065, focusPosition: [-0.34, -0.02, 2], accent: '#f6c448',
      summary: '生活不只一面。这里将呈现游戏、团队协作与个人兴趣。',
    },
  ],
  reservedStickers: [
    { id: 'dog', title: '小狗宠物', status: '等待素材' },
    { id: 'entj', title: 'ENTJ', status: '等待素材' },
    { id: 'art-design', title: '美术与设计', status: '等待素材' },
    { id: 'football', title: '足球', status: '等待素材' },
  ],
  resumeOverview: {
    intro: {
      label: '个人简介',
      title: '从产品 Demo 到结果落地',
      description: '目标导向、强执行力。关注 AI 产品、用户体验、商业增长与风险治理，能够快速搭建可验证原型并推进需求落地。',
    },
    education: {
      label: '教育背景',
      school: '山东财经大学',
      degree: '投资保险学',
      period: '2022.09—2026.07',
      facts: ['GPA 3.5 / 4.0', '统计学、应用经济学、金融学、投资学'],
    },
    skills: {
      label: '技能与工具',
      groups: [
        { title: '产品 & 设计', items: ['Axure', 'Figma'] },
        { title: '数据分析', items: ['SQL', 'SPSS', 'Excel'] },
        { title: 'AI & 开发', items: ['Coze', 'Cursor', 'Codex'] },
      ],
    },
  },
  experiences: [
    {
      id: 'life-service', number: '01', company: '字节跳动 · 生活服务', role: '风险治理', period: '2025.10—至今', accent: '#ff593d',
      summary: '抖音生活服务是字节跳动旗下、由内容流量驱动的本地服务平台，覆盖餐饮、旅游等领域。在职期间负责产品体验优化与风险治理，运用大模型识别风险并落地管控方案，降低产品风险并提升用户体验。',
      achievements: [
        { title: '智能化风险防控', text: '负责平台“应急止损”链路的产品设计与落地，基于大模型搭建应急止损 Agent 体系，解决传统风控对突发风险响应滞后、应急与常态化防控脱节的问题。设计风险防控 Agent 效果评估方法与指标体系，为 Agent 验收与迭代建立标准，实现应急策略 24 小时闭环，压缩突发风险止损窗口期。' },
        { title: 'AI 前置审核 & 一键合规', text: '面向商家入驻与商品上架场景搭建 AI 实时审核引擎，在字段填写后自动识别风险并提供一键合规优化，进人审率下降 13%，CPO 下降 23%。' },
        { title: '门店信息交接专项', text: '完成门店名称涉黄策略上线，新建 6 个黑词包且召回准确率 100%，涉黄风险漏放率下降 16.3%；相册审核链路迁移中重构规则并新增 30 个底线模型，SLA 从 85.23s 降至 61.39s。' },
      ],
      metrics: [
        { value: '24h', label: '应急策略闭环' },
        { value: '−13%', label: '进人审率' },
        { value: '−23%', label: 'CPO' },
        { value: '−16.3%', label: '涉黄风险漏放率' },
      ],
      media: [],
    },
    {
      id: 'data-aml', number: '02', company: '字节跳动 · Data AML', role: 'AI 产品经理', period: '2025.04—2025.10', accent: '#8ea7ff',
      summary: 'Vaka 知识助手依托火山 VikingDB 向量库技术，聚焦解决办公场景中知识获取与理解难的问题，构建专业级一站式个性化 AI 办公平台。参与产品 0—1 落地全过程，负责功能策划、Agent 优化策略、个性化推荐与用户冷启动。',
      achievements: [
        { title: '个性化问答 & 推荐', text: '基于用户对话历史、文件标签与自定义信息构建画像，将用户信息与对话标签融入 query 改写和文件推荐，让 AI 输出更贴合用户场景与身份。' },
        { title: '深度研究效果优化', text: '针对子任务重复执行导致的 8—10 分钟高延迟，允许 Agent 根据环境变化调整任务预期，并新增 Thinking + ReAct 节点，产品效果提升 22.2%，TTFT 下降 46.1%。' },
        { title: '核心功能策划', text: '飞书拥有庞大的办公场景生态，与 Vaka 的核心用户群体高度匹配。为支持公司与团队内部协作，策划飞书文档的导入、更新、维护、分享与协作能力；同时设计并落地“知识探索指南”，针对用户上传的多模态知识，通过 AI 自动拆解生成层层递进的结构化探索问题，降低知识挖掘门槛并提升知识库内容利用率。' },
        { title: '用户增长 & 冷启动', text: '独立策划“校园生活 AI 答疑”活动，0 资源覆盖 10w+ 用户，产品上线 3 日新增 2400+，最高 DAU 1904，并在两周内建立 1000+ 人种子用户群。' },
      ],
      metrics: [
        { value: '+22.2%', label: '深度研究效果' },
        { value: '−46.1%', label: 'TTFT' },
        { value: '10w+', label: '活动覆盖用户' },
        { value: '2400+', label: '3 日新增' },
      ],
      media: [],
    },
    {
      id: 'nami-ai', number: '03', company: '奇虎 360 · 纳米 AI', role: 'AI 产品经理', period: '2024.12—2025.04', accent: '#d8ff58',
      summary: '负责中国首款 AI 浏览器“纳米 AI 搜索”的广告业务，通过 LLM 重构广告素材生成逻辑，在尽量不影响用户体验的前提下提升营收效率，广告峰值 CPM 达 50+。',
      achievements: [
        { title: 'AI 模型训练', text: '负责广告改写大模型后训练优化，制定原生广告标注规范并指导标注，通过 SFT + PE 训练优化生成能力；搭建广告改写工作流，广告原生性提升 32%。' },
        { title: '广告品牌词治理', text: '通过 Badcase 分析定位全量剔除品牌词导致的 CTR 下滑，设计“意图触发 + 分级处理”策略，对高价值品牌豁免、对干扰与长尾品牌屏蔽，CTR 提升 16.3%。' },
        { title: '广告样式优化', text: '结合 AI 搜索引擎的视觉风格，设计并落地 15 套原生广告样式，适配 AI 原生广告特性，降低用户对广告的感知。' },
      ],
      metrics: [
        { value: '50+', label: 'CPM' },
        { value: '+32%', label: '广告原生性' },
        { value: '+16.3%', label: 'CTR' },
        { value: '15', label: '原生广告样式' },
      ],
      media: [],
    },
  ],
  resumeProject: {
    eyebrow: 'PROJECT EXPERIENCE / 项目经历',
    title: '财大拾光',
    role: '0—1 校园综合平台',
    summary: '独立从 0—1 打造服务山东财经大学学生的校园综合平台“财大拾光”，整合社交、外卖、本地生活与旅游等场景，匹配校园消费痛点并构建完整商业闭环。',
    achievements: [
      { title: '产品与履约体系', text: '完成全链路产品设计、落地与运营，产品端设计自营配送和保证金机制，以履约体系保障服务质量。' },
      { title: '流量与转化', text: '通过收购校园表白墙、搭建论坛打造私域流量池，实现日均引流 300+，高效支撑业务转化。' },
      { title: '本地生活与旅游', text: '上线高性价比旅游模块，覆盖 10+ 城市并服务 500+ 用户；项目累计用户 4w+、合作商户 30+、自营门店 7 个，月流水超 20w。' },
      { title: '爆款孵化与内容营销', text: '结合校园标签与社媒渠道打造椰子冻、巧克力草莓等自营爆款。椰子冻抖音单条视频曝光 20 万+，两周出货 500+ 单（单价 58 元）；巧克力草莓借情人节话题营销实现自然曝光 10 万+，出货 300+ 单。' },
    ],
    metrics: [
      { value: '4w+', label: '累计用户' },
      { value: '20w+', label: '月流水' },
      { value: '30+', label: '合作商户' },
      { value: '7', label: '自营门店' },
    ],
  },
  projects: [
    {
      year: '2025', title: 'Vaka 知识助手', tag: 'AI / KNOWLEDGE / 0—1',
      accent: '#8ea7ff',
      description: '依托火山 VikingDB 向量库的个性化 AI 办公平台。负责功能策划、Agent 优化与推荐策略，参与产品 0—1 落地。',
      href: 'https://aisearch.volcengine.com/assistant', linkLabel: '访问产品',
    },
    {
      year: '2025', title: '小冰人', tag: '抖音黑客松优胜奖 / AI SOCIAL PET',
      accent: '#59c8ff',
      description: '架在抖音用户与访客之间的双端对话 AI 社交宠物。它能理解用户的作品、喜好与社交边界，为用户提供陪伴并屏蔽低质社交；也能帮助陌生访客生成自然开场，用户可随时接管对话。',
      href: 'https://bytedance.larkoffice.com/wiki/NtfQw9xfYixsGTkdClVcG90Nned', linkLabel: '查看介绍',
    },
    {
      year: 'DESIGN', title: '慧医 AI', tag: 'HEALTH / AI / FIGMA',
      accent: '#ff7890',
      description: '面向家庭场景的 AI 健康管理助手，通过设计稿展示家庭健康信息管理与 AI 辅助交互方案。',
      href: 'https://www.figma.com/design/PK6ZwxF9pObVtMTIdj16PS/%E6%85%A7%E5%8C%BB?node-id=0-1&p=f&t=ejm3KAKjNZiz6N31-0', linkLabel: '查看设计稿',
    },
    {
      year: 'CAMPUS', title: '财大拾光', tag: 'ENTREPRENEURSHIP / GROWTH',
      accent: '#d8ff58',
      description: '独立从 0—1 打造校园综合平台，整合社交、外卖、本地生活与旅游。累计用户 4w+、合作商户 30+、自营门店 7 个，月流水超 20w；旅游模块覆盖 10+ 城市并服务 500+ 用户。',
      href: '#home', linkLabel: '返回首页',
    },
  ],
  social: [
    { label: '2840404589@qq.com', href: 'mailto:2840404589@qq.com' },
    { label: '15762656567', href: 'tel:15762656567' },
  ],
};

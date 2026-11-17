// 后续更新主要改这个文件。图片放在 assets/，在 image / gallery 中填写路径即可。
window.PORTFOLIO = {
  email: '2927411485@qq.com',
  stamps: [
    { id: 'education', title: '学业与成长', english: 'LEARN & GROW', color: 'lavender', icon: '✧', sub: '川大环境设计 2/41，国家奖学金 → 清华 SIGS', intro: '本科学环境设计，研究生转向人居环境与技术交叉。', items: [
      { title: '清华大学 · 深圳国际研究生院', date: '2026.08 — 2028.06', text: '未来人居项目 · 全英文项目，在读。' },
      { title: '四川大学 · 环境设计', date: '2022.09 — 2026.06', text: '艺术学院 & 灾后重建与管理学院创新班。必修均分 89.09/100，GPA 3.78/4.0，综合排名 2/41；已通过英语六级。' },
      { title: '奖励与认可', date: '荣誉', text: '国家奖学金、四川省优秀毕业生、四川大学优秀毕业生、连续两年四川大学优秀学生。省级以上设计竞赛获奖 20 次，其中国家级 10 项，包括中国人居环境设计学年奖金奖、米兰设计周一等奖、全国大学生物联网设计竞赛（华为杯）二等奖等。' }
    ] },
    { id: 'ai', title: 'AI 产品探索', english: 'AI & PRODUCT', color: 'blue', icon: '⌘', sub: '街景 AI 诊断评测；大模型 API 接入教程', intro: '做过两件事：评测街景 AI 的诊断结果是否可用，以及教非技术用户接入大模型 API。', items: [
      { title: 'WalkSeg-R · 街景 AI 诊断', date: '2025.12 — 2026.03', text: '参与多模态 AI 产品研究与效果评估，梳理 VLM 与图像分割模型协同机制，将模型输出转译为设计师可理解、可复核的空间诊断结果。', project: 'walkseg' },
      { title: 'AI 工具接入与产品文档', date: '2026.02 — 2026.04', text: '参与梳理大模型 API 接入服务，设计新手教程、FAQ 与标准回复，降低非技术用户的配置门槛。', project: 'onboarding' }
    ] },
    { id: 'research', title: '用户与研究', english: 'PEOPLE & INSIGHT', color: 'sage', icon: '◎', sub: 'SSCI 一作；表情识别、脑电、517 份问卷', intro: '这几项研究都在处理同一个问题：怎么把“感觉”变成能比较、能分析的数据。', items: [
      { title: '乡村景观安全感评估', date: '2023.11 — 2025.03', text: 'Land 期刊 SSCI 二区论文第一作者。负责理论框架、研究方法、数据分析、论文撰写与投稿全过程。', project: 'safety' },
      { title: '脑电与景观视觉心理研究', date: '2024.01', text: '论文第二学生作者。以崇州道明竹艺村为对象，参与脑电数据采集与分析，结合问卷探索景观与视觉心理的关系。' },
      { title: '城市居民健康与人居环境', date: '2023.02', text: '作为核心成员参与问卷访谈阶段，收集 517 份问卷，对 6 个老成都公园开展实地调研与 75 人次随机访谈，形成 7 万字报告。' },
      { title: '绿地可达性与村寨保护研究', date: '2024 — 2025', text: '核心成员参与中科院科创计划中的成都绿地可达性研究，以及国家社科基金支持的西南少数民族特色村寨人居环境研究。' }
    ] },
    { id: 'growth', title: '运营与增长', english: 'GROWTH & IMPACT', color: 'peach', icon: '↗', sub: '一场助农直播 4,318 元；AI 工具渠道 3,000+ 元', intro: '在乡村直播和 AI 工具社群里，实际负责过内容、答疑和转化。', items: [
      { title: '清华大学乡村振兴工作站', date: '2026.01 — 2026.02', text: '核心运营与品牌统筹，参与内容矩阵、助农直播、品牌设计与线下研学，搭建全域运营链路。', project: 'rural' },
      { title: 'AI 工具用户教育与转化', date: '2026.02 — 2026.04', text: '将技术概念转译为新手步骤，参与私域答疑与售后反馈归因，支撑渠道 2 个月累计成交 3,000+ 元。', project: 'onboarding' },
      { title: '墨言冰芯 · 商业化实践', date: '2023.04 — 2024.01', text: '省级“互联网+”大学生创新创业大赛核心成员，参与行业研究、财务预测与 B2B 推广方案设计。', project: 'graphite' }
    ] },
    { id: 'practice', title: '设计与实践', english: 'MAKE & EXPLORE', color: 'butter', icon: '✳', sub: '跨校工作坊、社会实践全国 TOP10、合唱与辩论', intro: '课堂之外的工作坊、社会实践和社团。', items: [
      { title: '跨校工作坊', date: '工作坊', text: '参与北京大学、香港大学与华南理工大学联合工作坊，和不同学科的同学一起做方案。' },
      { title: '社会实践与公共参与', date: '实践与社团', text: '全国大学生百强暑期社会实践活动 TOP10 团队核心成员；累计志愿时长 95 小时。担任四川大学环境艺术研讨协会副会长，参与合唱团与辩论队。' },
      { title: '视觉表达与 AI 创作', date: '工具', text: '用 Photoshop、InDesign、Rhino、D5 做设计表达，用 Stable Diffusion、即梦做 AIGC 图像和视频。' }
    ] }
  ],
  photos: [
    // 建议把 title 改成「地点 · 年份」，note 写在做什么
    { image: 'assets/field-research.webp', title: '实地调研', note: '问卷与访谈', angle: -5 },
    { image: 'assets/workshop-discussion.webp', title: '跨校联合工作坊', note: '北大 / 港大 / 华工', angle: 4 },
    { image: 'assets/rural-branding.webp', title: '清华乡村振兴工作站 · 2026', note: '品牌设计', angle: -3 },
    { image: 'assets/hiking.webp', title: '徒步', note: '户外', angle: 5 },
    { image: 'assets/choir.webp', title: '合唱团', note: '演出', angle: -4 }
  ],
  projects: [
    { id: 'walkseg', no: '01', category: 'ai', title: 'WalkSeg-R', subtitle: '用 VLM + 图像分割，找出街景里的步行问题', english: 'MULTIMODAL AI · PRODUCT RESEARCH', color: 'blue', cover: 'assets/cover-walkseg.svg', role: '多模态 AI 产品研究与效果评估', date: '2025.12 — 2026.03', tags: ['多模态 AI', '效果评估', '体验诊断'], summary: '输入一张街景，输出问题在哪、是什么、为什么、怎么改。我梳理了模型协同机制，并参与整理 20 人的测评结果。', metrics: [['4,800+', '数据集图像'], ['20', '代表性样本'], ['20', '评估者']],
      sections: [
        { title: '01 / 步行体验还靠人工巡检', text: '城市街景的步行体验评估依赖人工巡检，问题定位不直观，诊断结果也难以复用。项目探索把传统街景分析转化为“图像输入—AI 识别—问题区域标注—文本解释—优化建议”的工具型产品流程。' },
        { title: '02 / 我负责的部分', text: '参与 WalkSeg-R 技术框架研究，梳理 VLM 与图像分割模型的协同机制；辅助建立步道遮挡、路径断裂、绿荫不足、铺装破损、街道设施缺失等识别任务。重点关注模型能力如何对应真实空间问题。' },
        { title: '03 / 20 个样本、20 位评估者打分', text: '基于 WalkScene 数据集中的 4,800+ 张高分辨率图像，使用 20 个代表性样本与 20 名评估者开展 5 分制测评。参与整理识别准确性、解释清晰度、空间一致性与用户理解成本等维度的评价结果。' },
        { title: '04 / 解释清楚，和识别准确一样重要', text: '将模型输出转译为“问题位置 + 问题类型 + 原因解释 + 优化建议”，帮助设计师理解、复核并应用诊断结果。设计师看不懂的结果，再准也用不上。' }
      ], flow: ['街景 + Prompt', '语义对齐与分割', '区域标注', '解释与建议'] },
    { id: 'safety', no: '02', category: 'ai', title: '乡村里的不安全感从哪来', subtitle: 'Land 期刊（SSCI 二区）第一作者', english: 'USER RESEARCH · FACIAL EXPRESSION', color: 'sage', cover: 'assets/cover-safety.svg', role: '第一作者 · 研究设计与数据分析', date: '2023.11 — 2025.03', tags: ['SSCI 二区一作', '用户研究', '情绪识别'], summary: '用 1,200+ 条面部情绪数据和 500+ 份问卷，找出影响安全感的 4 个因素，再把它们写成空间优化导则。', metrics: [['1,200+', '情绪数据'], ['500+', '问卷数据'], ['4', '核心影响因素']],
      sections: [
        { title: '01 / 研究问题', text: '乡村旅游场景中，用户的不安全感如何形成、如何识别，又如何转化为空间优化策略？研究通过乡村视听场景样本，探索视听组合对感知安全的影响。' },
        { title: '02 / 表情识别 + 问卷，双轨数据', text: '构建面部情绪识别与主观评价双轨数据模型，采集 1,200+ 条面部情绪数据与 500+ 份问卷。使用 Python / SPSS 进行样本清洗、非参数检验与回归分析，主导完成 4 组对比实验与 3 轮回归分析。' },
        { title: '03 / 4 个因素和一份设计导则', text: '识别出 4 个影响安全感的核心因素，构建用户面部情绪识别模型，行为预测准确率提升 20%。将分析结论转化为场景和视觉优化导则，通过自动化动态捕捉将数据采集与分析周期从 2 周缩短至 5 天。' },
        { title: '04 / 论文', text: '以第一作者在 Land 期刊发表 SSCI 二区论文：What Creates Unsafe Feelings in Rural Landscapes: A Study of Perceived Safety Based on Facial Expression Recognition。负责理论框架、方法、分析、写作、修改与投稿全过程。' }
      ], flow: ['视听场景样本', '情绪 + 主观评价', '检验与回归', '空间优化导则'], gallery: ['assets/field-research.webp'], galleryCaption: '调研现场。' },
    { id: 'onboarding', no: '03', category: 'ai', title: '给非技术用户讲清楚 API', subtitle: '大模型 API 接入教程、FAQ 与社群答疑', english: 'ONBOARDING · PRODUCT OPERATIONS', color: 'lavender', cover: 'assets/cover-onboarding.svg', role: '产品文档 · 用户教育 · 运营支持', date: '2026.02 — 2026.04', tags: ['接入流程', '用户教育', '反馈闭环'], summary: 'API Key、Base URL、并发……把这些概念拆成 5 步新手路径。两个月里渠道成交 3,000+ 元，60+ 人次付费。', metrics: [['60+', '付费用户人次'], ['3,000+', '两个月渠道成交 / 元'], ['5', '新手接入步骤']],
      sections: [
        { title: '01 / 新手卡在哪', text: '面向 AI 编程、Agent 自动化、长文档处理与脚本生成场景的工具型用户，参与梳理“模型能力聚合—统一接口调用—工具端接入—用户交付”的产品逻辑。对新手而言，理解 API Key、Base URL、Token 和并发本身就是接入障碍。' },
        { title: '02 / 5 步接入路径', text: '把技术概念拆解成“注册—兑换—创建 Key—配置工具—开始使用”的路径，沉淀教程、FAQ 与标准回复，帮助非技术用户从咨询走到配置成功。' },
        { title: '03 / 高频问题怎么回流到产品', text: '参与私域社群答疑与售后维护，归纳注册、额度兑换、模型选择、并发配置和工具接入等高频问题，将反馈同步至技术和运营侧，改进交付流程。' },
        { title: '04 / 结果', text: '支撑渠道两个月累计成交 3,000+ 元，单日销售峰值约 200 元，转化付费用户 60+ 人次。零散的咨询，最后整理成了可复用的教程和 FAQ。' }
      ], flow: ['注册与兑换', '创建 Key', '配置工具', '开始使用与反馈'] },
    { id: 'rural', no: '04', category: 'growth', title: '清华乡村振兴工作站', subtitle: '内容矩阵、助农直播、品牌设计与研学', english: 'BRAND · CONTENT · GROWTH', color: 'butter', cover: 'assets/rural-practice.webp', role: '核心运营与品牌统筹', date: '2026.01 — 2026.02', tags: ['乡村振兴', '内容运营', '品牌设计'], summary: '一场直播卖了 4,318 元，7,126 人次观看；为 3 家在地企业交付了 42 项品牌设计。', metrics: [['4,318', '单场销售额 / 元'], ['7,126', '累计观看人次'], ['42', '设计成果']],
      sections: [
        { title: '01 / 要解决什么', text: '面向乡村品牌传播与农产品转化需求，参与清华大学乡村振兴工作站实践，连接“内容种草—直播转化—线下研学”，提升在地品牌的曝光、用户触达与商业转化。' },
        { title: '02 / 内容与直播', text: '参与搭建微信、抖音、快手多端内容矩阵，统筹发布 4 支专题视频与 10 篇推文，全网浏览量 10,000+。参与助农直播全链路策划与选品，单场销售额 4,318 元，累计观看 7,126 人次，点赞超 4.2 万。' },
        { title: '03 / 品牌与线下体验', text: '联动 3 家在地企业与 1 个工作站，交付品牌 IP、包装系统等 42 项设计成果；策划 3 场研学活动，覆盖 120 人次。' },
        { title: '04 / 我在看什么', text: '把设计表达放进真实运营场景中：内容为什么吸引用户，用户在哪一步做出行动，反馈又如何帮助下一轮选品、内容与活动迭代。' }
      ], flow: ['品牌与内容', '多平台触达', '直播转化', '线下研学'], gallery: ['assets/rural-practice.webp', 'assets/rural-branding.webp'], galleryCaption: '品牌设计成果与工作站现场。' },
    { id: 'graphite', no: '05', category: 'growth', title: '墨言冰芯', subtitle: '石墨散热膜的市场研究与 B2B 推广 · 省级“互联网+”', english: 'BUSINESS RESEARCH · GO-TO-MARKET', color: 'peach', cover: 'assets/cover-graphite.svg', role: '省级互联网+大赛 · 核心成员', date: '2023.04 — 2024.01', tags: ['行业研究', '商业分析', 'B2B 推广'], summary: '整理了 2,000+ 条行业与竞品数据，参与财务预测、推广方案，以及和中兴等厂商的对接。', metrics: [['2,000+', '行业与竞品数据'], ['1.19 亿', '2028 年营收预测 / 元'], ['63.39%', '预测 CAGR']],
      sections: [
        { title: '01 / 项目背景', text: '围绕大厚度高导热石墨散热膜在电子设备散热场景中的应用，参与推进项目从技术产品到市场验证、商业测算与推广方案设计。' },
        { title: '02 / 行业与商业分析', text: '盘点 2,000+ 条行业动态数据与竞品参数，定位成本高、适配度低等市场痛点。参与构建精细化财务预测模型，模型测算 2028 年营收 1.19 亿元、CAGR 63.39%；这些为商业计划中的预测值。' },
        { title: '03 / 推广与协作', text: '模拟 B2B 电商运营模式，参与设计线上展示会、产品试用与技术培训方案；负责外部合作沟通协调，对接中兴等头部厂商资源，推进应用落地。' },
        { title: '04 / 学到的', text: '用行业数据做判断，把技术参数翻译成客户关心的成本与适配问题。' }
      ], flow: ['行业与竞品', '场景定位', '财务预测', '推广与资源对接'] }
  ],
  tools: [
    { title: 'Python · SPSS', note: '安全感研究里的样本清洗、非参数检验与回归分析' },
    { title: '问卷与访谈', note: '成都公园研究：517 份问卷、75 人次访谈，写成 7 万字报告' },
    { title: 'Claude · Codex', note: '搭建了这个网站' },
    { title: 'Rhino · D5 · Photoshop · InDesign', note: '环境设计课程与竞赛作品' },
    { title: 'Stable Diffusion · 即梦 · 剪映', note: 'AIGC 图像与短视频创作' }
  ]
};

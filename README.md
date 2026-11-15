# 王嘉怡 · AI 产品与用户研究作品集

这是一个适合持续迭代的个人作品集网站，按招聘阅读顺序呈现个人介绍、教育与经历、精选项目、能力工具和实践照片。项目详情可以展开阅读，经历卡片可以跳转到相关案例，照片可以放大查看；页面适配手机，也提供简历 PDF 下载。

## 本地预览

直接打开 `index.html` 即可查看。也可以安装 Node.js 后在本目录执行：

```bash
npm start
``

然后访问 `http://127.0.0.1:4173`。运行 `npm run check` 可检查内容结构、语法和素材路径。

## 更新内容

| 想要修改 | 文件 |
| --- | --- |
| 项目介绍、职责、数据和封面 | `content.js` → `projects` |
| 教育与经历卡片 | `content.js` → `stamps` |
| 实践照片 | `content.js` → `photos` |
| 首页自我介绍、邮箱和导航 | `index.html` |
| 颜色、布局、字号和交互效果 | `styles.css`、`app.js` |
| 可下载的简历 | 替换 `assets/jiayi-resume.pdf` |

添加项目时，可以复制 `content.js` 中一个项目对象，然后修改唯一的 `id`、标题、描述、指标和图片路径。图片放在 `assets/` 中。真实项目素材补齐后，把示意封面替换为截图、研究图表或作品图片，并更新对应项目的 `mediaNote`。

如果使用 GitHub 在线编辑，在仓库中打开目标文件、点击铅笔图标，编辑后选择 **Commit changes**。启用 GitHub Pages 后，提交会触发网页更新。

## 发布到 GitHub Pages

仓库：<https://github.com/minajiayi-del/jiayi-portfolio>

1. 把本目录中的所有文件和 `assets/` 文件夹上传到仓库根目录；`index.html` 应直接位于根目录。
2. 打开仓库 **Settings → Pages**。
3. 在 **Build and deployment → Source** 选择 **Deploy from a branch**。
4. 在 **Branch** 选择 `main` 和 `/(root)`，点击 **Save**。
5. 等待 GitHub 完成部署。网页地址：<https://minajiayi-del.github.io/jiayi-portfolio/>。

## 内容说明

- 经历来自你提供的简历和瀚雅分享 PDF；重复信息以简历为主。
- 页面上的头像和实践照片来自分享材料。
- WalkSeg-R、安全感研究、AI 接入和墨言冰芯的封面为项目主题示意，并非真实产品截图；后续可直接替换。
- 墨言冰芯的 2028 年营收和增长率属于商业计划预测。
- 页面为静态作品集，不运行实际模型推理，也不连接相关 API。

这是公开作品集，包含个人经历、联系方式、照片及可下载简历。公开发布后，任何访客都可以查看和下载简历文件。

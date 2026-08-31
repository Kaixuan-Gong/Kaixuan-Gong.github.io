# 巩凯旋 · 3D 虚拟形象个人简历

这是一个以 3D 虚拟形象为核心的个人简历网站：点击脸部贴纸即可聚焦对应标签，并在首页阅读完整的教育、工作或项目经历。

## 本地运行

```bash
npm install
npm run dev
```

也可使用 `pnpm install && pnpm dev`。

## 目录结构

```text
resume-3d/
├── app/
│   ├── globals.css                 # 全局视觉与响应式样式
│   ├── layout.tsx                  # 网站标题与基础布局
│   └── page.tsx                    # 首页组合
├── public/assets/
│   ├── model/avatar.glb            # 3D 虚拟形象
│   └── stickers/                   # 用户提供的贴纸素材（当前展示 5 张）
├── src/
│   ├── components/
│   │   ├── AvatarScene.tsx         # 3D 场景、加载、贴纸、镜头动画
│   │   ├── ResumePanel.tsx         # 标签详情面板
│   │   └── PortfolioSections.tsx   # 作品与联系区
│   └── config.js                   # 内容、链接、配色与镜头参数
└── .openai/hosting.json            # Sites 部署配置
```

## 替换模型

1. 把新的 GLB 文件放到 `public/assets/model/`。
2. 修改 `src/config.js` 中 `model.url`。
3. 通过 `model.scale`、`model.position`、`model.rotation` 微调大小与朝向。

模型加载失败时页面会显示兜底提示和重试按钮。

## 替换或增加贴纸

1. 把透明背景 PNG 放到 `public/assets/stickers/`。
2. 在 `src/config.js` 的 `stickers` 数组中新增或修改一项。
3. `position` 控制贴纸在脸部的位置，`rotation` 控制角度，`scale` 控制大小，`focusPosition` 控制点击后的镜头位置。

当前“小狗宠物、ENTJ、美术与设计、足球”保留在 `reservedStickers`，没有生成或补造素材。拿到最终 PNG 后再加入 `stickers` 即可。

“财大拾光 / 创业”素材仍保留在资源目录，但已按当前要求从 `stickers` 配置中移除，因此页面不再展示。

## 修改文案、链接与配色

所有易变内容都集中在 `src/config.js`：

- `profile`：姓名、定位、介绍
- `navigation`：导航项目
- `resume`：简历节点
- `projects`：作品时间轴
- `social`：联系方式
- `theme`：主色
- `camera`：默认机位、聚焦距离、动画时长与环绕速度

完整简历内容已写入对应贴纸节点，工作经历、教育、技能、项目和联系方式均可在页面中查看。

## 镜头与交互

- `camera.defaultPosition`：全局视角
- `camera.defaultTarget`：默认注视点
- 每个贴纸的 `focusPosition`：该节点的聚焦机位
- `camera.transitionDuration`：GSAP 镜头过渡时长
- `camera.orbitSpeed`：自动巡航速度

点击贴纸会聚焦并打开内容面板；点击空白处或关闭按钮会返回全局视角。当前模型只有一个整体网格，没有独立眼球节点，因此首版用非常轻微的头部跟随模拟视线。若后续模型拆分了左右眼 mesh，可升级为真正的眼球追踪。

## 构建与部署

```bash
npm run build
```

项目已配置为静态导出，并包含 `.github/workflows/deploy-pages.yml`。推送到 `main` 分支后会自动构建并发布到 GitHub Pages。

## 首屏与模型优化建议

网站使用经过 Meshopt 与 WebP 优化的 GLB 副本，体积约 8 MB；用户提供的原始模型不受影响。后续继续优化时建议：

1. 在保证脸部近景效果的前提下继续减少不可见区域的面数。
2. 使用 Draco 或 Meshopt 压缩几何体。
3. 将贴图转为 KTX2/Basis，按实际显示尺寸缩放纹理。
4. 首屏模型建议继续控制在 8–15 MB；保留原文件作为高清母版。
5. 贴纸数量增加后合成纹理图集，减少纹理请求和材质切换。

加载页会真实反映模型与贴图加载进度，避免出现无反馈的白屏。

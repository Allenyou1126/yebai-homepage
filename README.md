# Yebai's Homepage

夜白（Yebai）的个人主页，展示社交链接、个人介绍等信息，支持亮色/暗色主题切换。

## 技术栈

- [Vite](https://vite.dev/) — 前端构建工具，提供快速的开发服务器和打包能力
- [TypeScript](https://www.typescriptlang.org/) — JavaScript 的超集，提供类型安全
- [Tailwind CSS v4](https://tailwindcss.com/) — 原子化 CSS 框架，通过 `@tailwindcss/vite` 插件集成

## 前置要求

- [Node.js](https://nodejs.org/) >= 24
- [pnpm](https://pnpm.io/) >= 9

## 构建方法

您需要先安装 Node.js 24 或更新版本，并安装 pnpm 9 或更新版本。

如果您的网络条件不佳，需要给 pnpm 更换镜像源或者使用代理工具。

```bash
# 安装依赖
pnpm install

# 启动开发服务器
# 随后可以在 http://localhost:5173 上看到预览
# 修改文件会实时自动刷新
pnpm dev

# 构建生产版本
# 构建完成后，产物在 dist/ 目录下，全部上传到服务器即可
pnpm build

# 预览生产构建
# http://localhost:4173
pnpm preview
```

## 项目结构简介

- `dist/`: 构建产物，**不会**被提交到 GitHub 仓库，可以安全地删除。
- `node_modules/`: 依赖库，由 pnpm 管理，请不要修改里面的内容，可以安全地删除，删除后 `pnpm install` 会自动重新生成。
- `public/`: 资源文件目录，该目录下的文件不会被处理，构建时会原样复制到 `dist/` 下。如果有图片等，请放在这里。
- `src/`: 源代码目录，该目录下的文件会在构建时被 Vite 处理。一般来说，TypeScript/JavaScript 脚本和 CSS 文件请放在这里。
- `index.html`: 网页入口文件。该文件中对 `/src/` 目录下 `.ts` / `.js` / `.css` 的引用会被 Vite 自动处理。
- `package.json`: 描述了依赖的库和可用的脚本（如 `preview` 等）
- `pnpm-lock.yaml`: 记录依赖库的详细版本，由 pnpm 在 `pnpm install` / `pnpm add` 等操作时自动生成。请**不要**手动修改这个文件，但最好把这个文件添加到 GitHub 仓库中。
- `tsconfig.json`: TypeScript 配置文件，如果你不明白，请不要修改这个文件。
- `vite.config.ts`: Vite 配置文件，如果你不明白，请不要修改这个文件。
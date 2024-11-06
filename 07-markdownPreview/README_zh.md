# 07 markdownPreview

**其他语言版本：[English](README.md)**

## 介绍

该项目是一个 Markdown 编辑器，允许用户输入 Markdown 语法并实时预览。它使用 Ace 编辑器和 Marked.js 进行 Markdown 的解析与展示。

![07-markdownPreview](../img-storage/07-markdownpreview.jpg)

## 目录结构

```
.
├── dist
│   ├── css
│   │   ├── github-markdown.css
│   │   ├── style.css
│   │   └── style.less
│   ├── font
│   │   └── iconfont.ttf
│   ├── index.html
│   ├── main.js
│   └── main.js.LICENSE.txt
├── package-lock.json
├── package.json
├── src
│   └── index.js
└── webpack.config.js
```

- `dist/`: 编译后的文件存放目录。
  - `css/`: 存放样式文件。
  - `font/`: 存放字体文件。
  - `index.html`: 主 HTML 文件。
  - `main.js`: 主 JavaScript 文件。
  - `main.js.LICENSE.txt`: 主 JavaScript 文件的许可证信息。
- `src/`: 源代码存放目录。
  - `index.js`: 项目的主要逻辑文件。
- `package.json`: 项目的依赖和脚本配置。
- `package-lock.json`: 具体依赖版本的锁定文件。
- `webpack.config.js`: Webpack 配置文件。

## 使用说明

1. 安装依赖：

   ```bash
   npm install
   ```

2. 启动开发服务器：

   ```bash
   npm start
   ```

3. 打开浏览器并访问 `http://localhost:3000`。

## 运行脚本

- `npm run build`: 使用 Webpack 打包项目。
- `npm start`: 启动开发服务器并自动打开浏览器。

## 依赖项

主要依赖项包括：

- `ace-builds`: 用于代码编辑器。
- `bootstrap`: 用于样式和响应式布局。
- `dompurify`: 用于清理用户输入的 HTML 内容。
- `html2canvas`: 用于将 HTML 转换为图像（未使用）。
- `jspdf`: 用于生成 PDF 文件（未使用）。
- `marked`: 用于 Markdown 解析。
- `puppeteer`: 用于自动化浏览器操作。

## 功能

- 支持多种 Markdown 语法。
- 实时预览 Markdown 内容。
- 将 Markdown 内容保存到本地。
- 导出 Markdown 内容为 PDF 文件（待实现）。

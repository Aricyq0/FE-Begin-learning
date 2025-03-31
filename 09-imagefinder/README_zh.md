# 09 图片搜索器

[English](README.md) | 简体中文

## 项目简介

09-imagefinder 是一个图像查找项目，旨在通过集成多种前端库和工具，提供一个简洁高效的图像搜索和浏览体验。该项目结合了现代的技术栈，利用 React 作为前端框架，支持用户友好的界面和良好的用户交互。

![09-imagefinder](../img-storage/09-imagefinder.jpg)

## 项目功能

- **图像搜索**：用户可以通过关键词搜索壁纸。
- **图像浏览**：支持缩略图模式展示搜索结果，用户可以快速浏览图像，并下载。

## 目录结构

```
.
├── README.md
├── package-lock.json
├── package.json
├── public
│   ├── index.html
│   ├── manifest.json
│   ├── momo.jpg
│   └── robots.txt
└── src
    ├── App.css
    ├── App.js
    ├── components
    │   ├── CustomPagination
    │   ├── ImageContainer
    │   └── SearchContainer
    ├── index.css
    ├── index.js
    ├── reportWebVitals.js
    └── services
        └── api.js
```

## API 密钥

该项目使用 pixibayd API 进行图像搜索。您需要先注册 pixabay 账号。注册完成后，访问（https://pixabay.com/api/docs/）页面，在`Search Images/Parameters`处即可查看您的 api 密钥。

并在 `src/services/api.js` 文件中，将 `api` 变量值替换为您自己的 API 密钥。

## 安装

在项目目录中运行以下命令安装依赖：

```bash
npm install
```

## 运行

项目安装完成后，可以通过以下命令启动开发服务器：

```bash
npm start
```

启动后，打开浏览器并访问 `http://localhost:3000`，您将看到项目的主界面。

## 构建

项目构建需要使用 npm run build 命令。该命令将编译项目代码，并将其打包成可部署的静态文件。

```bash
npm run build
```

构建完成后，将在 `build` 目录下生成部署文件。

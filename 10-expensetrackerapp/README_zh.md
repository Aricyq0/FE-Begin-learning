# 理财追踪应用

**其他语言版本：[English](README.md)**

## 项目简介

这是一个费用追踪应用，通过这个应用，用户可以记录和管理他们的收入和支出。用户可以查看交易详情、生成报告以及可视化数据。

## 目录结构

```
.
├── README.md
├── package-lock.json
├── package.json
├── public
│   ├── Fonts
│   │   └── DMSerifDisplay-Regular.ttf
│   ├── favicon.ico
│   └── index.html
└── src
    ├── App.css
    ├── App.js
    ├── components
    │   ├── Footer.js
    │   ├── Header.js
    │   ├── Sidebar.js
    │   └── index.js
    ├── context
    │   └── index.js
    ├── data
    │   └── index.js
    ├── index.js
    ├── pages
    │   ├── TransactionDetails.js
    │   ├── dashboard
    │   └── index.js
    ├── reportWebVitals.js
    ├── router
    │   └── index.js
    └── utils
        └── theme.js
```

## 功能

- **添加收入和支出**：用户可以通过简单的表单输入收入或支出信息。
- **查看交易详情**：提供详细的交易记录查看功能。
- **可视化数据**：使用图表显示交易分布和月度跟踪，帮助用户分析财务状况。
- **标签管理**：通过标签对交易进行分类，方便整理和查找。

## 技术栈

- **前端**：使用 React 框架构建用户界面。
- **样式**：使用 Ant Design 组件库提供优雅的用户界面和响应式设计。
- **状态管理**：使用 React 的 Context API 和 Hooks 进行状态管理。
- **数据可视化**：使用 Recharts 进行数据图表展示。

## 安装与运行

1. 安装依赖：

   ```bash
   npm install
   ```

2
. 运行应用：

```bash
npm start
```

打开浏览器访问 `http://localhost:3000` 查看应用。

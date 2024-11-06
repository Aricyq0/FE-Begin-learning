# 08 番茄钟应用

[English](README.md) | 简体中文

## 项目介绍

这是一个基于 React 构建的番茄钟应用，可以通过定时番茄工作法来管理工作和休息时间，并选择不同的白噪音来提升工作氛围。

![08-pomodoro](../img-storage/08-pomodoro.jpg)

## 功能介绍

- **定时器**：可以设置工作时间和休息时间，也可以新增工作选项，自动切换。
- **音频控制**：提供多种背景白噪音选择。
- **状态显示**：实时显示当前状态（如工作、休息）和倒计时。

## 项目结构

```
.
├── README.md
├── package-lock.json
├── package.json
├── public
│   ├── audio
│   ├── bg-images
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── App.js
    ├── components
    │   ├── AudioControl
    │   │   ├── AudioControl.css
    │   │   └── AudioControl.js
    │   ├── Button.js
    │   ├── ClockContext.js
    │   ├── ClockSetting.js
    │   ├── ClockTimer
    │   │   ├── ClockTimer.css
    │   │   └── ClockTimer.js
    │   └── ClockType
    │       ├── ClockType.css
    │       ├── ClockType.js
    │       ├── ClockTypeItem.js
    │       └── SVG.js
    ├── index.css
    ├── index.js
    ├── reportWebVitals.js
    └── setupTests.js
```

## 安装

在项目目录中运行以下命令安装依赖：

```bash
npm install
```

## 使用

启动开发服务器：

```bash
npm start
```

构建项目：

```bash
npm run build
```

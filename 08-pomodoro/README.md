# 08 Pomodoro App

English | [简体中文](README_zh.md)

## Overview

This is a Pomodoro app built with React that allows users to manage work and break times using the Pomodoro technique, along with a selection of different white noise options to enhance the working atmosphere.

![08-pomodoro](../img-storage/08-pomodoro.jpg)

## Features

- **Timer**: Set work and break durations, as well as add new work options, and switch automatically.
- **Audio Control**: Offers various background white noise selections.
- **Status Display**: Real-time display of the current status (such as working or resting) and a countdown timer.

## Project Structure

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

## Installation

Run the following command in the project directory to install dependencies:

```bash
npm install
```

## Usage

Start the development server:

```bash
npm start
```

Build the project:

```bash
npm run build
```

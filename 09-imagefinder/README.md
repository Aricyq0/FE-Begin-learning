# 09 Image Finder

English | [简体中文](README_zh.md)

## Project Overview

09-imagefinder is an image discovery project aimed at providing a simple and efficient image search and browsing experience through the integration of various front-end libraries and tools. The project combines a modern tech stack, leveraging React as the front-end framework and supporting a user-friendly interface with good user interaction.

![09-imagefinder](../img-storage/09-imagefinder.jpg)

## Project Features

- **Image Search**: Users can search for wallpapers using keywords.
- **Image Browsing**: Supports thumbnail mode to display search results, allowing users to quickly browse images and download them.

## Directory Structure

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

## Installation

The project requires a Node.js environment. Please ensure you have Node.js and npm (Node Package Manager) installed.

1. Clone the project to your local machine:
   ```bash
   git clone https://github.com/yourusername/09-imagefinder.git
   ```
2. Navigate into the project directory:
   ```bash
   cd 09-imagefinder
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Running the Project

After installation, you can start the development server with the following command:

```bash
npm start
```

Once started, open your browser and navigate to `http://localhost:3000` to see the main interface of the project.

## Build

To build the project, use the command `npm run build`. This command will compile the project code and package it into deployable static files.

```bash
npm run build
```

Once the build is complete, the deployment files will be generated in the `build` directory.

```

```

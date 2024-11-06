# 03 Book Finder App

**Other languages:[简体中文](README_zh.md)**

## Introduction

Book Finder App is a simple book search application where users can input a book title or author, and the app will query the Google Books API to display relevant book information.

![03-bookfinder-app](../img-storage/03-bookfinder.jpg)

## Project Structure

```
/BookFinderApp
│
├── src/
│   ├── bootstrap.min.css        # Bootstrap style file
│   ├── style.css                # Custom style file
│   ├── bootstrap.min.js         # Bootstrap JavaScript file
│   └── script.js                # Main JavaScript file for the application
│
└── index.html                   # Main HTML file for the application
```

## Features

- **Search for Books**: Users can search for books by entering a title or an author.
- **Display Book Information**: Search results will be displayed with book covers, titles, authors, publishers, and publication dates.
- **Loading Indicator**: The app will show a loading indicator during the search to inform the user.

## Instructions

1. **API Key**:

   - To use the Google Books API, you need to apply for an API key. Visit the [Google Books API](https://developers.google.com/books/docs/v1/using) page and follow the instructions to apply.

   - After the application is completed, you will receive an API key that you need to replace the value of the `api_key` variable in `/src/script.js` with your own API key.

2. **Open `index.html` file**:

   You can open the `index.html` file using any modern browser such as Chrome, Firefox, or Edge.

3. **Perform a Book Search**:

   - Enter a book title or an author in the search box.
   - Click the search button or press the Enter key directly.
   - Wait a moment to see the search results.

## Notes

- This application does not use Node.js, so no Node environment is required.

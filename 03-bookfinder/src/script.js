// 定义 API 密钥: 该密钥已失效，请自行申请新的 API 密钥
const api_key = "AIzaSyDGrZfgHbG_0SL9WxyUvp2O4wsx7-EVVXM";

// 定义全局变量
let title;

// 获取加载指示器
const loader = document.querySelector(".loader");

// 为搜索按钮添加点击事件监听
document.getElementById("searchBtn").addEventListener("click", function () {
  document.getElementById("bookList").innerHTML = "";
  loader.style.visibility = "visible";
  searchBook(title);
});

// 为搜索输入框添加按键事件监听
document
  .getElementById("searchInput")
  .addEventListener("keyup", function (event) {
    if (event.code === "Enter") {
      event.preventDefault();
      loader.style.visibility = "visible";
      document.getElementById("bookList").innerHTML = "";
      searchBook(title);
    }
  });

// 使用 fetch 调用api, 搜索书籍, 返回数据并初始化书籍数据
function searchBook(title) {
  title = document.getElementById("searchInput").value;
  const url = `https://www.googleapis.com/books/v1/volumes?q=${title}&key=${api_key}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      loader.style.visibility = "hidden";
      init(data);
    })
    .catch((error) => console.error("请求失败：", error));
}

// 初始化书籍数据并显示
function init(data) {
  console.log(data);
  const items = data.items;
  if (items.length > 0) {
    items.map((item) => {
      const book = item.volumeInfo;
      const title = book.title;
      const authors = book.authors;
      const publisher = book.publisher;
      const publishedDate = book.publishedDate.split("-")[0];

      const pageCount = book.pageCount;
      const imageLinks = book.imageLinks;
      const infoLink = book.infoLink;
      const thumbnail = imageLinks ? imageLinks.thumbnail : "";
      // console.log(
      //   title,
      //   authors,
      //   publisher,
      //   publishedDate,
      //   pageCount,
      //   thumbnail
      // );

      // display book information
      //创建li元素
      if (authors && thumbnail && title && publisher && pageCount) {
        console.log(book);
        const img = `<img src="${thumbnail}" alt="${title}">`;

        const div1 = document.createElement("div");
        div1.classList.add("bookImage");
        div1.innerHTML = img;
        const info = `<span class="title">书名：${title}</span><br><span class="author">作者：${
          authors ? authors.join(", ") : "Unknown"
        }</span><br><span class="publisher">出版社：${publisher}</span><br><span class="publishedDate">出版日期：${publishedDate}</span><br><span class="pageCount">页数：${pageCount}</span>`;
        const li = document.createElement("a");
        const bookItemContainer = document.createElement("div");
        li.classList.add("bookItem");
        li.href = infoLink;

        bookItemContainer.classList.add("col-lg-6");
        bookItemContainer.classList.add("col-xl-6");
        bookItemContainer.classList.add("col-xxl-4");

        const div2 = document.createElement("div");
        div2.classList.add("bookInfo");
        div2.innerHTML = info;

        // 创建li元素:整体
        li.appendChild(div1);
        li.appendChild(div2);
        bookItemContainer.appendChild(li);
        //创建ul元素
        const ul = document.querySelector("#bookList");
        //创建li元素并添加到ul元素中
        ul.appendChild(bookItemContainer);
      } else {
        return;
      }
    });
  } else {
    console.log("No book found.");
  }
}

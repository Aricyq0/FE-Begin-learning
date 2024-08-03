window.onload = function () {
  displayTodos();
};

var input = document.getElementById("todoInput");
var btn = document.querySelector(".add");
var list = document.getElementById("todoList");
var completedList = document.getElementById("completedList");
btn.addEventListener("click", function () {
  var itemText = input.value;

  if (itemText) {
    var key = `todo-${Date.now()}`;
    var li = document.createElement("li");
    li.textContent = itemText;
    li.flag = 0;
    var todoitem = [{ text: itemText, flag: li.flag }];
    localStorage.setItem(key, JSON.stringify(todoitem));

    // console.log(li);
    // 使用模版字符串或元素减少元素创建过程；

    // 在复选框后添加文本

    var checkbox = document.createElement("button");
    checkbox.className = "checkbox";
    checkbox.textContent = "";

    var del = document.createElement("button");
    del.className = "delet";
    del.textContent = "删除";
    li.appendChild(checkbox);
    li.appendChild(del);
    // console.log(li.children);

    list.appendChild(li);
    checkbox.addEventListener("click", (e) => handleCheckboxClick(e, li.flag));
    del.addEventListener("click", handleDeleteClick);

    displayTodos();

    input.value = ""; // 清除输入框
  }
});

const handleCheckboxClick = (e) => {
  var btn = e.target;
  var filteredText = "";

  // 遍历 parent 的所有子元素
  Array.from(btn.parentElement.childNodes).forEach((node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.tagName !== "BUTTON") {
        filteredText += node.textContent + " ";
      }
    } else if (node.nodeType === Node.TEXT_NODE) {
      filteredText += node.nodeValue + " ";
    }
  });
  filteredText = filteredText.trim();
  for (i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var storetext = JSON.parse(localStorage.getItem(key))[0].text;
    var flag = JSON.parse(localStorage.getItem(key))[0].flag;
    if (storetext === filteredText) {
      if (flag == 0) {
        btn.classList.add("checked");
        list.removeChild(btn.parentElement);
        completedList.appendChild(btn.parentElement);
        btn.parentElement.flag = 1;
        localStorage.setItem(
          key,
          JSON.stringify([{ text: filteredText, flag: btn.parentElement.flag }])
        );
      } else {
        btn.classList.remove("checked");
        completedList.removeChild(btn.parentElement);
        list.appendChild(btn.parentElement);
        btn.parentElement.flag = 0;
        localStorage.setItem(
          key,
          JSON.stringify([{ text: filteredText, flag: btn.parentElement.flag }])
        );
      }
    }
  }

  // if (btn.parentElement.flag === 0) {
  //   btn.classList.add("checked");
  //   // console.log(btn);
  //   // console.log(this.classList);
  //   // this.classList.add("checked");
  //   list.removeChild(btn.parentElement);
  //   completedList.appendChild(btn.parentElement);

  //   btn.parentElement.flag = 1;
  // } else {
  //   btn.classList.remove("checked");
  //   completedList.removeChild(btn.parentElement);
  //   list.appendChild(btn.parentElement);
  //   btn.parentElement.flag = 0;
  // }
};

const handleDeleteClick = (e) => {
  // list.removeChild(this.parentElement);
  // var parent = this.parentElement; // 假设 this 是 parent 下的某个子元素
  var delet = e.target;
  var filteredText = "";

  // 遍历 parent 的所有子元素
  Array.from(delet.parentElement.childNodes).forEach((node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.tagName !== "BUTTON") {
        filteredText += node.textContent + " ";
      }
    } else if (node.nodeType === Node.TEXT_NODE) {
      filteredText += node.nodeValue + " ";
    }
  });
  filteredText = filteredText.trim();
  delet.parentElement.remove();
  for (i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    if (JSON.parse(localStorage.getItem(key))[0].text === filteredText) {
      localStorage.removeItem(key);
    }
  }
};

function displayTodos() {
  list.innerHTML = "";
  completedList.innerHTML = "";
  for (let i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var storetext = JSON.parse(localStorage.getItem(key))[0].text;
    var flag = JSON.parse(localStorage.getItem(key))[0].flag;
    if (flag == 0) {
      console.log("1");
      var lihtml = `${storetext}<button class="checkbox"></button><button class="delet">删除</button>`;
      var li = document.createElement("li");
      li.innerHTML = lihtml;
      li.flag = flag;

      var checkbox = li.querySelector(".checkbox");
      var del = li.querySelector(".delet");
      list.appendChild(li);
      checkbox.addEventListener("click", (e) => handleCheckboxClick(e));

      del.addEventListener("click", handleDeleteClick);
    } else {
      console.log("1");
      var lihtml = `${storetext}<button class="checkbox checked"></button><button class="delet">删除</button>`;
      var li = document.createElement("li");

      li.innerHTML = lihtml;
      li.flag = flag;

      var checkbox = li.querySelector(".checkbox");
      var del = li.querySelector(".delet");
      completedList.appendChild(li);
      checkbox.addEventListener("click", (e) => handleCheckboxClick(e));

      del.addEventListener("click", handleDeleteClick);
    }
  }
}

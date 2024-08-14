window.addEventListener("load", function () {
  todos = getStorage() || [];
  visualStatus = localStorage.getItem("visualStatus");
  if (todos) {
    render();
  }
});

// 使用封装Todo项的增删改方法
// Todo类
class Todo {
  constructor(text) {
    this.text = text;
    this.completed = false;
    this.creatDate = new Date();
    this.completedDate = null;
  }
}

// 数据管理
let todos = [];
let visualStatus = null;

// 增加todo
function addTodo(text) {
  const item = new Todo(text);
  todos.push(item);
  render();
}

// 删除todo
function removeTodo(item) {
  todos.splice(todos.indexOf(item), 1);
  render();
}

// 修改状态
function toggleTodo(item) {
  item.completed = !item.completed;
  if (item.completed) {
    item.completedDate = Date();
  } else {
    item.creatDate = Date();
  }
  render();
}

// 渲染todos
const todoList = document.getElementById("todoList");
const complete = document.querySelector(".complete");

const clearTodo = document.querySelector(".todo").querySelector(".clear");

const clearCompleted = complete.querySelector(".clear");
const clearAll = document.querySelector(".clear-all");
const completedList = document.getElementById("completedList");
const todo = document.querySelector(".todo");
const input = document.getElementById("todoInput");

const visualBtn = document.querySelector(".visual");

function render() {
  todoList.innerHTML = "";
  completedList.innerHTML = "";
  complete.style.display = "none";
  visualBtn.style.display = "none";

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo.text;

    // ...

    if (todo.completed) {
      var lihtml = `<del>${todo.text}</del><i class="checkbox bi bi-check-circle-fill" style="color: rgba(213, 79, 42, 0.895)"></i><i class="delet bi bi-trash3-fill"></i><div style="display:none">${todo.creatDate}</div>`;
      li.innerHTML = lihtml;
      li.querySelector(".checkbox").addEventListener("click", (e) =>
        handleCheckboxClick(e)
      );
      li.querySelector(".delet").addEventListener("click", (e) =>
        handleDeleteClick(e)
      );
      completedList.insertBefore(li, completedList.children[0]);
    } else {
      var lihtml = `${todo.text}<i class="checkbox bi bi-check-circle disabled"></i><i class="delet bi bi-trash3-fill"></i><div style="display:none">${todo.creatDate}</div>`;
      li.innerHTML = lihtml;
      li.querySelector(".checkbox").addEventListener("click", (e) =>
        handleCheckboxClick(e)
      );
      li.querySelector(".delet").addEventListener("click", (e) =>
        handleDeleteClick(e)
      );
      // if (todo.creatDate == Date()) {
      //   li.classList.add("slide-in-right");
      // }
      todoList.insertBefore(li, todoList.children[0]);
    }
    if (completedList.children.length > 0) {
      if (visualStatus) {
        visualBtn.style.display = "inline-block";
        visualBtn.textContent = "Hide Completed";
        complete.style.display = "block";
      } else {
        console.log(visualStatus);
        console.log(complete);

        complete.style.display = "none";
        visualBtn.style.display = "inline-block";
        visualBtn.textContent = "Show Completed";
      }
    } else {
      complete.style.display = "none !important";
      visualBtn.style.display = "none";
    }
  });
  saveToStorage();
}

// 存储到localStorage
function saveToStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
  localStorage.setItem("visualStatus", visualStatus);
}

function getStorage() {
  todos = JSON.parse(localStorage.getItem("todos"));
  return todos;
}

const handleCheckboxClick = (e) => {
  var li = e.target.parentElement;
  Array.from(li.childNodes).forEach((node) => {
    if (node.tagName == "DIV") {
      console.log(node.textContent);
      const todoIndex = todos.findIndex((t) => t.creatDate == node.textContent);
      toggleTodo(todos[todoIndex]);
    }
  });
};

const handleDeleteClick = (e) => {
  var li = e.target.parentElement;

  Array.from(li.childNodes).forEach((node) => {
    if (node.tagName == "DIV") {
      const todoIndex = todos.findIndex((t) => t.creatDate == node.textContent);
      removeTodo(todos[todoIndex]);
    }
  });
};
// 事件绑定
const btn = document.querySelector(".add");

btn.addEventListener("click", (e) => {
  var itemText = input.value;

  if (itemText) {
    addTodo(itemText);
  }
  // 判断目标元素调用对应的方法
  input.value = "";
});
input.addEventListener("input", (e) => {
  var itemText = input.value;
  if (itemText) {
    btn.classList.add("active");
  } else {
    btn.classList.remove("active");
  }
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    var itemText = input.value;
    if (itemText) {
      addTodo(itemText);
    }
    input.value = "";
  }
});
clearTodo.addEventListener("click", (e) => {
  todos = todos.filter((todo) => todo.completed);
  render();
});

clearCompleted.addEventListener("click", (e) => {
  todos = todos.filter((todo) => !todo.completed);
  render();
});

clearAll.addEventListener("click", (e) => {
  console.log("1");
  todos = [];
  render();
});

visualBtn.addEventListener("click", (e) => {
  if (visualStatus) {
    visualStatus = false;
    visualBtn.textContent = "Show Completed";
  } else {
    visualStatus = true;
    visualBtn.textContent = "Hide Completed";
  }
  render();
});

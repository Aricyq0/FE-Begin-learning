window.addEventListener("load", () => {
  notes = getStorage();
  render();
});

class Note {
  constructor() {
    this.text = "# Hello world";
    this.title = "Title";
    this.createDate = Date();
    this.modifiedDate = Date();
  }
}

const add = document.querySelector(".add");
const noteList = document.getElementById("noteList");
let notes = [];
function addNote() {
  notes.push(new Note());
  render();
}

function removeNote(index) {
  notes.splice(index, 1);
  render();
}

function toggleNote(index, title, newText) {
  notes[index].modifiedDate = Date();
  notes[index].text = newText;
  notes[index].title = title;
  render();
}

function render() {
  noteList.innerHTML = "";
  if (notes) {
    notes.forEach((note, index) => {
      const li = document.createElement("li");
      li.className = "col-md-4 col-lg-4 col-xl-4 col-xxl-4";
      const displaydate = moment().format("lll");

      const lihtml = `<div class="Card">
      <div class="card-note">
        <div class="card-header">
          <div class="note-info">
          <h4 contenteditable="true" class="note-title"> ${note.title}</h4>   
          <p contenteditable="true" class="note-category">Category</p>
            </div>
            <div class="note-actions">
            <i class="bi bi-pencil modify"></i>
            <i class="bi bi-trash3 delete"></i>
            </div>    
            </div>
        <div class="note-body">
        
          <div class="textarea" contenteditable="true"></div>
        </div>
        <div class="note-date">
          <div class='rawDate' style="display:none">${note.modifiedDate}</div>
          <span>${displaydate}</span>
        </div>
      </div>
      
  </div>`;
      li.innerHTML = lihtml;
      let textareaHtml = "";
      note.text.split("\n").forEach((el) => {
        textareaHtml += marked.parse(el);
      });
      li.querySelector(".textarea").innerHTML = textareaHtml;

      li.querySelector(".note-title").addEventListener("blur", (e) => {
        toggleNote(index, e.target.textContent, notes[index].text);
      });
      li.querySelector(".modify").addEventListener("click", () =>
        handleModifyClick(index)
      );
      li.querySelector(".textarea").addEventListener("focus", () =>
        handleInputFocus(index)
      );
      li.querySelector(".textarea").addEventListener("keydown", (e) => {
        handleKeydown(e, index);
      });
      li.querySelector(".textarea").addEventListener("blur", () =>
        handleInputBlur(index)
      );
      li.querySelector(".delete").addEventListener("click", () =>
        handleDeleteClick(index)
      );
      noteList.insertBefore(li, noteList.children[0]);
    });
  }

  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function getStorage() {
  const storedNotes = JSON.parse(localStorage.getItem("notes"));
  return storedNotes ? storedNotes : [];
}

const handleModifyClick = (index) => {
  const textarea =
    noteList.children[notes.length - 1 - index].querySelector(".textarea");
  textarea.focus();
};

const handleInputFocus = (index) => {
  const textarea =
    noteList.children[notes.length - 1 - index].querySelector(".textarea");
  textarea.innerText = notes[index].text;
};
const handleKeydown = (e, index) => {
  const textarea =
    noteList.children[notes.length - 1 - index].querySelector(".textarea");
  if (e.key === "Enter") {
    const newText = textarea.innerText + "/n";
    notes[index].text = newText;
  }
};

const handleInputBlur = (index) => {
  const textarea =
    noteList.children[notes.length - 1 - index].querySelector(".textarea");
  const newText = textarea.innerText;

  if (newText) {
    toggleNote(index, notes[index].title, newText);
  } else {
    removeNote(index);
  }
};

const handleDeleteClick = (index) => {
  removeNote(index);
};

// 鼠标拖拽添加按钮:start
let isDragging = false;
let isClick = false;
let offsetX, offsetY;
add.addEventListener("click", (e) => {
  console.log("click");
  addNote();
});

// Clear-all：功能实现start
const clearAll = document.querySelector(".clear-all");
clearAll.addEventListener("click", () => {
  notes = [];
  render();
});
// Clear-all：功能实现end

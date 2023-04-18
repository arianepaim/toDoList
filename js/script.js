const todoForm = document.querySelector("#form-todo");
const todoInput = document.querySelector("#input-texto");
const todoList = document.querySelector("#todo-list");
const formEdit = document.querySelector("#form-edit");
const inputEdit = document.querySelector("#input-edit");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const eraseButton = document.querySelector("#erase-button");
const filterSelect = document.querySelector("#dilter-select");

let oldInputValue;

const saveTodo = (text) => {
  const todo = document.createElement("div");
  todo.classList.add("todo");

  const todoTitle = document.createElement("h3");
  todoTitle.innerHTML = text;
  todo.appendChild(todoTitle);

  const doneBtn = document.createElement("button");
  doneBtn.classList.add("finish-todo");
  doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
  todo.appendChild(doneBtn);

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-todo");
  editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
  todo.appendChild(editBtn);

  const deleBtn = document.createElement("button");
  deleBtn.classList.add("delete-todo");
  deleBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  todo.appendChild(deleBtn);

  todoList.appendChild(todo);

  todoInput.value = "";
  todoInput.focus();
};

const toggleForms = () => {
  formEdit.classList.toggle("hide");
  todoForm.classList.toggle("hide");
  todoList.classList.toggle("hide");
};

const updateTodo = (text) => {
  const todos = document.querySelectorAll(".todo");

  todos.forEach((todo) => {
    let todoTitle = todo.querySelector("h3");

    if (todoTitle.innerText === oldInputValue) {
      todoTitle.innerText = text;
    }
  });
};

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = todoInput.value;

  if (inputValue) {
    saveTodo(inputValue);
  }
});

document.addEventListener("click", (e) => {
  const targetEl = e.target;
  const parentEl = targetEl.closest("div");
  let todoTitle;

  if (parentEl && parentEl.querySelector("h3")) {
    todoTitle = parentEl.querySelector("h3").innerText;
  }

  if (targetEl.classList.contains("finish-todo")) {
    parentEl.classList.toggle("done");
  }

  if (targetEl.classList.contains("delete-todo")) {
    parentEl.remove();
  }

  if (targetEl.classList.contains("edit-todo")) {
    toggleForms();

    inputEdit.value = todoTitle;
    oldInputValue = todoTitle;
  }
});

cancelEditBtn.addEventListener("click", (e) => {
  e.preventDefault();

  toggleForms();
});

formEdit.addEventListener("submit", (e) => {
  e.preventDefault();

  const editInputValue = inputEdit.value;

  if (editInputValue) {
    updateTodo(editInputValue);
  }

  toggleForms();
});

searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const todos = document.querySelectorAll(".todo");

  todos.forEach((todo) => {
    const todoTitle = todo.querySelector("h3").innerText.toLowerCase();
    if (todoTitle.includes(searchTerm)) {
      todo.style.display = "flex";
    } else {
      todo.style.display = "none";
    }
  });
});

eraseButton.addEventListener("click", () => {
  searchInput.value = "";
  const todos = document.querySelectorAll(".todo");
  todos.forEach((todo) => {
    todo.style.display = "flex";
  });
});

filterSelect.addEventListener("change", (e) => {
  const selectedFilter = e.target.value;
  const todos = document.querySelectorAll(".todo");

  todos.forEach((todo) => {
    if (selectedFilter === "all") {
      todo.style.display = "flex";
    } else if (selectedFilter === "done") {
      if (todo.classList.contains("done")) {
        todo.style.display = "flex";
      } else {
        todo.style.display = "none";
      }
    } else if (selectedFilter === "todo") {
      if (!todo.classList.contains("done")) {
        todo.style.display = "flex";
      } else {
        todo.style.display = "none";
      }
    }
  });
});







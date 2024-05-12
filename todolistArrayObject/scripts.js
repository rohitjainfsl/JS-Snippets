const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");
const tasks = [];
let taskToEditID = null;

form.addEventListener("submit", addTask);
ul.addEventListener("click", handleTaskActions);

function addTask(e) {
  e.preventDefault();

  if (taskToEditID === null) {
    addTaskToArray();
  } else {
    updateTaskInArray();
  }

  displayTasks();
  storeInLS();
  cleanSlate();
}

function addTaskToArray() {
  const obj = { id: Date.now(), task: input.value };
  tasks.push(obj);
  appendTaskToDOM(obj);
}

function updateTaskInArray() {
  const taskToEdit = tasks.find((task) => task.id === taskToEditID);
  if (taskToEdit) {
    taskToEdit.task = input.value;
    updateTaskInDOM(taskToEdit);
  }
  taskToEditID = null;
}

function storeInLS() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks() {
  ul.innerHTML = ""; // Clear once and rebuild if needed
  tasks.forEach(appendTaskToDOM);
}

function appendTaskToDOM(task) {
  const li = document.createElement("li");
  li.innerText = task.task;
  li.dataset.id = task.id;

  const iconWrapper = document.createElement("p");

  const del = document.createElement("i");
  del.classList.add("fa-solid", "fa-trash");

  const edit = document.createElement("i");
  edit.classList.add("fa-solid", "fa-pencil");

  iconWrapper.append(del, edit);
  li.append(iconWrapper);
  ul.append(li);
}

function updateTaskInDOM(task) {
  const li = ul.querySelector(`li[data-id="${task.id}"]`);
  if (li) {
    li.firstChild.textContent = task.task; // Assuming the first child is the text node
  }
}

function handleTaskActions(event) {
  const target = event.target;
  const li = target.closest("li");
  const id = parseInt(li.dataset.id);

  if (target.classList.contains("fa-trash")) {
    deleteTask(id);
  } else if (target.classList.contains("fa-pencil")) {
    editTask(id);
  }
}

function deleteTask(id) {
  const index = tasks.findIndex((task) => task.id === id);
  if (index !== -1) {
    tasks.splice(index, 1);
    ul.removeChild(ul.children[index]);
    storeInLS();
  }
}

function editTask(id) {
  const taskToEdit = tasks.find((task) => task.id === id);
  if (taskToEdit) {
    input.value = taskToEdit.task;
    taskToEditID = id;
    input.focus();
  }
}

function cleanSlate() {
  input.value = "";
  input.focus();
}

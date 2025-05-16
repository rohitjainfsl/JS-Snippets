const btns = document.querySelectorAll(".userInput button");
const contentDivs = document.querySelectorAll(".content");
const counts = document.querySelectorAll(".box .count");
const modifyCountArr = [];

contentDivs.forEach((div) => {
  div.addEventListener("drop", dropHandler);
  div.addEventListener("dragover", dragoverHandler);
});

btns.forEach((btn) => btn.addEventListener("click", createTask));

function createTask(e) {
  const box = e.target.closest(".box");
  const input = box.querySelector("input");
  const contentDiv = box.querySelector(".content");

  const taskDiv = document.createElement("div");
  const text = document.createElement("p");
  const date = document.createElement("span");

  taskDiv.classList.add("task");
  taskDiv.draggable = true;
  taskDiv.id = "task-" + Date.now();
  taskDiv.addEventListener("dragstart", dragstartHandler);

  text.innerText = input.value;

  date.classList.add("date");
  date.innerText = new Date().toLocaleString();

  taskDiv.append(text, date);
  contentDiv.append(taskDiv);
  input.value = "";

  modifyCounts(null, box.querySelector(".count"));
}

function dragstartHandler(e) {
  e.dataTransfer.setData("text/html", e.target.id);
  modifyCountArr.length = 0;
  const box = e.target.closest(".box");
  modifyCountArr.push(box.querySelector(".count"));
}

function dropHandler(e) {
  e.preventDefault();
  // Get the id of the target and add the moved element to the target's DOM
  const data = e.dataTransfer.getData("text/html");
  const elem = document.querySelector("#" + data);
  e.target.append(elem);

  const box = elem.closest(".box");
  modifyCountArr.push(box.querySelector(".count"));
  modifyCounts(...modifyCountArr);
}

function dragoverHandler(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
}

function modifyCounts(countToDecrement = null, countToIncrement = null) {
  if (countToIncrement) {
    countToIncrement.innerText = Number(countToIncrement.innerText) + 1;
  }
  if (countToDecrement) {
    countToDecrement.innerText = Number(countToDecrement.innerText) - 1;
  }
  modifyCountArr.length = 0;
}

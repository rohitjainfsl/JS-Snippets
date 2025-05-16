import colors from "./colors.js";
const buttonsDiv = document.querySelector("#buttons");
const undoBtn = document.querySelector("#undo");
const redoBtn = document.querySelector("#redo");
const resetBtn = document.querySelector("#reset");
const wrapper = document.querySelector("#wrapper");
const circles = [];
const removedCircles = [];

wrapper.addEventListener("click", init);
buttonsDiv.addEventListener("click", buttonTasks);
undoBtn.addEventListener("click", undoCircle);
redoBtn.addEventListener("click", redoCircle);
resetBtn.addEventListener("click", resetCircles);
document.addEventListener("keyup", handleKeyboardShortcuts);

function undoCircle() {
  if (circles.length > 0) {
    const removedCircle = circles.pop();
    removedCircles.push(removedCircle);

    // Remove the last circle from the DOM
    const lastCircle = wrapper.querySelector(".circle:last-child");
    if (lastCircle) lastCircle.remove();

    buttonsStatus();
  }
}

function redoCircle() {
  if (removedCircles.length > 0) {
    const restoredCircle = removedCircles.pop();
    circles.push(restoredCircle);

    // Render only the restored circle
    renderCircle(restoredCircle);

    buttonsStatus();
  }
}

function resetCircles() {
  circles.length = 0;
  removedCircles.length = 0;
  rerenderCircles();
}

function createCircle(e) {
  const backgroundColor = getBackgroundColor();
  const coordinates = [e.clientX, e.clientY];
  const circleObject = { backgroundColor, coordinates };
  circles.push(circleObject);
  return circleObject;
}

function renderCircle(obj) {
  const circle = document.createElement("div");
  circle.classList.add("circle");
  applyStyles(circle, obj.coordinates, obj.backgroundColor);
  wrapper.append(circle);
  buttonsStatus();
}

function rerenderCircles() {
  wrapper.querySelectorAll(".circle").forEach((circle) => circle.remove());
  circles.forEach((circleObj) => renderCircle(circleObj));
  buttonsStatus();
}

function getBackgroundColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function applyStyles(circle, [...params], backgroundColor) {
  circle.style.backgroundColor = backgroundColor;
  circle.style.left = params[0] - 7.5 + "px";
  circle.style.top = params[1] - 7.5 + "px";
}

function buttonsStatus() {
  undoBtn.disabled = circles.length === 0;
  redoBtn.disabled = removedCircles.length === 0;
  resetBtn.disabled = circles.length === 0 && removedCircles.length === 0;
}

function buttonTasks(e) {
  e.stopPropagation();
}

function init(e) {
  if (e.target.id === "buttons") return;
  const circleObject = createCircle(e);
  renderCircle(circleObject);
}

function handleKeyboardShortcuts(e) {
  if (e.ctrlKey && e.key === "z") {
    undoCircle();
  } else if (e.ctrlKey && e.key === "y") {
    redoCircle();
  } else if (e.ctrlKey && e.key === "r") {
    resetCircles();
  }
}

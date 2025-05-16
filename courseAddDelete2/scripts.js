const courseWrapper = document.querySelectorAll(".courseWrapper");
courseWrapper.forEach((wrapper) => {
  wrapper.addEventListener("click", transferCourse);
});

function transferCourse(e) {
  if (e.target.nodeName === "LI") {
    const courseDiv = e.target.parentElement.parentElement;
    if (courseDiv.classList.contains("left")) push(e.target, courseWrapper[1]);
    else push(e.target, courseWrapper[0]);
  }
}

function push(element, destination) {
  destination.append(element);
}

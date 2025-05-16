window.addEventListener("load", setupLi);

function setupLi() {
  const addLi = document.querySelectorAll(".add li");
  const delLi = document.querySelectorAll(".delete li");

  addLi.forEach((current, index) => {
    current.setAttribute("onclick", "addCourse(this)");
  });
  delLi.forEach((current, index) => {
    current.setAttribute("onclick", "deleteCourse(this)");
  });
}

function addCourse(elem) {
  elem.removeAttribute("onclick");
  document.querySelector(".delete").children[0].appendChild(elem);
  console.log("addCourse function");
  setupLi();
}
function deleteCourse(elem) {
  elem.removeAttribute("onclick");
  document.querySelector(".add").children[0].appendChild(elem);
  console.log("deleteCourse function");
  setupLi();
}

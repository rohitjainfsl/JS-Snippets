const drag = document.querySelectorAll(".drag div");
const drop = document.querySelector(".drop");
let draggedItem;

drag.forEach((photo) => {
  photo.ondragstart = (e) => {
    // console.log(e.dataTransfer)
    const photoId = e.target.id;
    draggedItem = e.target;
    draggedItem.classList.add("dragging");
    e.dataTransfer.setData("text/plain", photoId);
    console.log(photoId);
  };
  photo.addEventListener("drop", (e) => {
    e.preventDefault();
    draggedItem.classList.remove("dragging");
  });
  photo.addEventListener("dragover", (e) => {
    e.preventDefault();
    draggedItem.classList.remove("dragging");
  });
});

drop.ondragenter = (e) => {
  console.log("entered in drop div");
  e.target.classList.add("dashedBorder");
};
drop.ondragleave = (e) => {
  console.log("gone out drop div");
  e.target.classList.remove("dashedBorder");
};
drop.ondrop = (e) => {
  console.log("dropped");
  e.target.classList.remove("dashedBorder");
  const photoId = e.dataTransfer.getData("text/plain");
  console.log(photoId);
  const newDiv = document.createElement("div");
  newDiv.id = photoId;
  drop.appendChild(newDiv);
  toastTime();
};
drop.ondragover = (e) => {
  e.preventDefault();
};

function toastTime() {
  Toastify({
    text: "Well Done!!!",
    duration: 3000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: false, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
}

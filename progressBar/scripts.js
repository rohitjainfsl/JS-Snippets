const limit = 5;
const barsDiv = document.querySelector("#bars");
const btn = document.querySelector("button");
let bars = 0;
let queue = 0;

btn.addEventListener("click", () => {
  if (bars < limit) {
    bars++;
    createBar(bars);
  } else {
    queue++;
  }
});

function createBar() {
  const bar = document.createElement("div");
  bar.classList.add("bar");
  bar.style.animation = "progress 4s linear";
  barsDiv.append(bar);
  setTimeout(() => removeBar(bar), 4000);
}

function removeBar(bar) {
  bar.remove();
  bar--;
  if (queue > 0) {
    createBar();
    queue--;
  }
}

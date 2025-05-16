const limit = 5;
const barsDiv = document.querySelector("#bars");
const btn = document.querySelector("button");
let bars = 0;
let queue = 0;

btn.addEventListener("click", () => {
  if (bars < limit) {
    bars++;
    createBar();
  } else {
    queue++;
  }
});

function createBar() {
  const bar = document.createElement("div");
  bar.classList.add("bar");
  barsDiv.append(bar);

  const text = document.createElement("span");
  text.innerText = "0%";
  bar.append(text);

  let progress = 0;
  const interval = setInterval(() => {
    progress += 2.56;
    bar.innerText = Math.round(progress) + "%";
    bar.style.width = progress + "%";

    if (progress >= 100) {
      clearInterval(interval);
    }
  }, 100);

  setTimeout(() => removeBar(bar), 4000);
}

function removeBar(bar) {
  bar.remove();
  bars--;
  if (queue > 0) {
    queue--;
    bars++;
    createBar();
  }
}

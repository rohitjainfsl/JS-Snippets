const randomValues = [];
const boxCount = 81;
const bombCount = 10;
const boxes = document.querySelector(".boxes");
const scoreDiv = document.querySelector(".score h3 span");
const resultDiv = document.querySelector(".result");
const reset = document.querySelector(".reset");
let allBoxes = [];
let score = 0;

function createBoxes() {
  let output = "";
  for (let i = 0; i < boxCount; i++) {
    const box = document.createElement("div");
    box.classList.add("box");
    box.id = "box" + i;
    boxes.append(box);
  }

  getTenRandomValues();

  allBoxes = Array.from(document.querySelectorAll(".box"));

  checkBoxes(allBoxes);
}

function getTenRandomValues() {
  randomValues.length = 0
  for (let i = 0; i < bombCount; i++) {
    randomValues.push(getARandomValue());
  }
}

function getARandomValue() {
  const random = Math.floor(Math.random() * boxCount);
  return randomValues.includes(random) ? getARandomValue() : random;
}

function checkBoxes(allBoxes) {
  allBoxes.forEach((box) => {
    box.addEventListener("click", (e) => {
      if (randomValues.includes(Number(box.id.slice(3)))) {
        randomValues.forEach((value) => {
          allBoxes[value].classList.add("unsafe");
        });
        resultDiv.classList.add("gameOver");
        resultDiv.children[0].innerHTML = "GAME OVER";
        allBoxes.forEach((box) => {
          box.style.pointerEvents = "none";
        });
      } else {
        box.classList.add("safe");
        scoreDiv.innerHTML = ++score;
      }
    });
  });
}

reset.addEventListener("click", resetEverything);

function resetEverything() {
  boxes.innerHTML = "";
  resultDiv.classList.remove("gameOver");
  score = 0
  scoreDiv.innerHTML = score;
  createBoxes();
}

window.onload = createBoxes;

const startBtn = document.getElementById("start");
const screen1 = document.querySelector(".screen1");
const screen2 = document.querySelector(".screen2");
const boxs = document.querySelectorAll(".box");
const boxInners = document.querySelectorAll(".box-inner");
const timerDiv = document.querySelector("#timer");

let openImageCount = 0;
let openImages = [];
let clicks = 0;
let timer = 30;
let interval;

const images = [
  "amitabh.jpg",
  "bhumi.jpg",
  "chitrangda.webp",
  "deepika.jpg",
  "shahrukh.jpg",
  "tom cruise.jpg",
  "emma.webp",
  "katrina.jpg",
];
let doubleImages = [...images, ...images];

//STARTING POINT
startBtn.addEventListener("click", startTheGame);

function startTheGame() {
  let finalArr = doubleImages.sort(() => Math.random() - 0.5);
  putImagesInUI(finalArr);

  boxs.forEach((box, index) =>
    box.addEventListener("click", (e) => flipAndCheck(e, index)),
  );

  screen1.classList.add("d-none");
  screen2.classList.remove("d-none");

  timerDiv.innerText = timer--;
  countdown();
}

function countdown() {
  interval = setInterval(() => {
    if (timer > 0) {
      timerDiv.innerText = timer--;
    } else {
      clearTheBoard();
    }
  }, 1000);
}

function clearTheBoard() {
  clearInterval(interval);
  screen2.classList.remove("d-none");
}

function flipAndCheck(e, idx) {
  //FLIP
  const boxDiv = e.target.closest(".box");
  if (openImageCount <= 1) {
    boxDiv.firstElementChild.style.transform = "rotateY(180deg)";
    boxDiv.firstElementChild.classList.add("show");
    openImageCount++;

    openImages.push({ elem: boxDiv.lastElementChild.lastElementChild, idx });

    //CHECK
    if (openImageCount === 2) {
      if (
        openImages[0].elem.firstElementChild.src ===
        openImages[1].elem.firstElementChild.src
      ) {
        resetCounters();
      } else {
        setTimeout(() => {
          openImages.forEach((obj) => {
            boxInners[obj.idx].classList.remove("show");
            boxInners[obj.idx].style.transform = "rotateY(0)";
          });

          //RESET COUNTERS
          resetCounters();
        }, 1000);
      }

      setTimeout(() => {}, 1000);
    }
    clicks++;
  }
}

function resetCounters() {
  openImageCount = 0;
  openImages.length = 0;
}

function putImagesInUI(arr) {
  boxInners.forEach((inner, index) => {
    const backImageElem = inner.lastElementChild.firstChild;
    backImageElem.src = `images/${arr[index]}`;
  });
}

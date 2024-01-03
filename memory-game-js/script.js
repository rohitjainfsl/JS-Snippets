const start = document.querySelector("#startBtn");
const flip_card = document.querySelectorAll(".flip-card");
const startTimerDiv = document.querySelector("#startTimer");
let openPhotos = 0;
let firstClickPhoto = "";
let secondClickPhoto = "";

start.addEventListener("click", () => {
  document.querySelector("#start").style.display = "none";
  document.querySelector("#game").style.display = "flex";
  document.querySelector("#startTimer").style.display = "flex";
  randomizePhotos();

  //START THE TIMER
  startTimer();
});

flip_card.forEach((card) => {
  card.onclick = (e) => {
    console.log(e);
    const card_inner = card.children[0];
    const styles = window.getComputedStyle(card_inner);
    if (styles.getPropertyValue("transform") === "none") {
      card_inner.style.transform = "rotateY(180deg)";
      openPhotos++;
      console.log(openPhotos);

      if (openPhotos) {
        setTimeout(() => {
          if (openPhotos === 1) {
            firstClickPhoto = card_inner.children[1].children[0];
            console.log(firstClickPhoto);
          } else if (openPhotos === 2) {
            secondClickPhoto = card_inner.children[1].children[0];
            console.log(secondClickPhoto);
            if (firstClickPhoto.src === secondClickPhoto.src) {
              firstClickPhoto.classList.add("matched");
              secondClickPhoto.classList.add("matched");
              console.log("sab changa si");
              firstClickPhoto = "";
              secondClickPhoto = "";
              openPhotos = 0;
            } else {
              firstClickPhoto = "";
              secondClickPhoto = "";
              openPhotos = 0;
              closeAll();
            }
          }
        }, 1000);
      }
    }
  };
});

function closeAll() {
  setTimeout(() => {
    openPhotos = 0;
    flip_card.forEach((card) => {
      if (
        card.children[0].children[1].children[0].classList.contains(
          "matched"
        ) === false
      ) {
        card.children[0].removeAttribute("style");
      }
    });
  }, 400);
}

function photos_match() {
  setTimeout(() => {
    openPhotos = 0;
    return;
  }, 400);
}

function randomizePhotos() {
  const photos = [
    "amitabh.jpg",
    "bhumi.jpg",
    "chitrangda.webp",
    "deepika.jpg",
    "shahrukh.jpg",
    "tom cruise.jpg",
  ];
  const alreadyUsedPhotos = [];
  const alreadyUsedCards = [];
  let j = 0;
  let k = 0;

  while (j < photos.length) {
    const randomPhoto = photos[recursive(photos, alreadyUsedPhotos)];
    for (let i = 0; i < 2; i++) {
      flip_card[
        recursive(flip_card, alreadyUsedCards)
      ].children[0].children[1].children[0].src = "images/" + randomPhoto;
    }
    j++;
  }
}

function recursive(element, arr) {
  const integer = Math.floor(Math.random() * element.length);
  if (arr.includes(integer)) {
    return recursive(element, arr);
  } else {
    arr.push(integer);
    return integer;
  }
}

function startTimer() {
  const interval = setInterval(() => {
    if (Number(startTimerDiv.innerHTML) === 1) {
      clearInterval(interval);
      gameOver()
    } else startTimerDiv.innerHTML = Number(startTimerDiv.innerHTML) - 1;
  }, 1000);
}

function gameOver(){
  document.querySelector("#game").style.display = "none";
  document.querySelector("#startTimer").style.display = "none";
}

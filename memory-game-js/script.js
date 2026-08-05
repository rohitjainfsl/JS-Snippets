const start = document.querySelector("#startBtn");
const flip_card = document.querySelectorAll(".flip-card");
const startTimerDiv = document.querySelector("#startTimer");
let openPhotos = 0;
let firstClickPhoto = "";
let secondClickPhoto = "";
let timerInterval = "";
let gameFinished = false;
let busy = false;

start.addEventListener("click", () => {
  document.querySelector("#start").style.display = "none";
  document.querySelector("#game").style.display = "flex";
  document.querySelector("#startTimer").style.display = "flex";
  document.querySelector("#clickCounter").style.display = "flex";
  randomizePhotos();

  //START THE TIMER
  startTimer();

  //START THE CLICK COUNTER
  startClickCounter();
});

flip_card.forEach((card) => {
  card.onclick = (e) => {
    if (gameFinished || busy) {
      return;
    }

    const card_inner = card.children[0];
    const styles = window.getComputedStyle(card_inner);
    if (styles.getPropertyValue("transform") === "none") {
      card_inner.style.transform = "rotateY(180deg)";
      openPhotos++;

      if (openPhotos === 1) {
        firstClickPhoto = card_inner.children[1].children[0];
      } else if (openPhotos === 2) {
        busy = true;
        secondClickPhoto = card_inner.children[1].children[0];

        if (firstClickPhoto.src === secondClickPhoto.src) {
          firstClickPhoto.classList.add("matched");
          secondClickPhoto.classList.add("matched");
          // 2 cards were clicked & we found a match,
          // now reset everything
          firstClickPhoto = "";
          secondClickPhoto = "";
          openPhotos = 0;
          busy = false;

          if (allPhotosFlipped()) {
            setTimeout(finishGame, 0);
          }
        } else {
          // 2 cards were clicked & we didn't found a match,
          // now reset everything & close the cards
          setTimeout(() => {
            firstClickPhoto = "";
            secondClickPhoto = "";
            openPhotos = 0;
            closeAll();
          }, 1000);
        }
      }
    }
  };
});

function closeAll() {
  flip_card.forEach((card) => {
    if (
      card.children[0].children[1].children[0].classList.contains(
        "matched"
      ) === false
    ) {
      card.children[0].removeAttribute("style");
    }
  });
  busy = false;
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

  const randomizedDeck = shufflePhotos([...photos, ...photos]);

  flip_card.forEach((card, index) => {
    card.children[0].children[1].children[0].src =
      "images/" + randomizedDeck[index];
  });
}

function shufflePhotos(photos) {
  for (let shuffleCount = 0; shuffleCount < 3; shuffleCount++) {
    for (let i = photos.length - 1; i > 0; i--) {
      const randomIndex = getRandomNumber(i + 1);
      [photos[i], photos[randomIndex]] = [photos[randomIndex], photos[i]];
    }
  }

  return photos;
}

function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

function startTimer() {
  timerInterval = setInterval(() => {
    if (Number(startTimerDiv.innerHTML) === 1) {
      clearInterval(timerInterval);
      gameOver();
    } else startTimerDiv.innerHTML = Number(startTimerDiv.innerHTML) - 1;
  }, 1000);
}

function startClickCounter() {
  const gameBoard = document.querySelector("#game-board");
  const clickCount = document.querySelector("#clickCounter span");
  // console.log(gameBoard.getBoundingClientRect());
  const gameBoardCoord = gameBoard.getBoundingClientRect();

  //if(user click is inside the game board)
  // (click.clientX > gameBoard.left && click.clientX < gameBoard.right) && (click.clientY > gameBoard.top && click.clientY < gameBoard.bottom)
  // the click will be considered inside the game board

  gameBoard.addEventListener("click", (e) => {
    if (
      e.clientX > gameBoardCoord.left &&
      e.clientX < gameBoardCoord.right &&
      e.clientY > gameBoardCoord.top &&
      e.clientY < gameBoardCoord.bottom
    ) {
      // console.log("andar click hua hai");
      clickCount.innerHTML = Number(clickCount.innerHTML) + 1;
    }
  });
}

function gameOver() {
  document.querySelector("#game").style.display = "none";
  document.querySelector("#startTimer").style.display = "none";
}

function allPhotosFlipped() {
  return document.querySelectorAll(".matched").length === flip_card.length;
}

function finishGame() {
  gameFinished = true;
  clearInterval(timerInterval);

  const clickCount = document.querySelector("#clickCounter span").innerHTML;
  const timeRemaining = startTimerDiv.innerHTML;
  const gameOverScreen = document.querySelector("#over");
  const score = document.querySelector("#score");

  gameOverScreen.querySelector("h1").innerHTML = "YOU WON!";
  score.innerHTML = `Clicks: ${clickCount}<br />Time Remaining: ${timeRemaining}`;
  gameOverScreen.style.display = "flex";
  gameOverScreen.style.position = "fixed";
  gameOverScreen.style.inset = "0";
  gameOverScreen.style.zIndex = "999";
  gameOverScreen.style.background = "rgba(0, 0, 0, 0.9)";
  gameOverScreen.style.color = "#fff";
  gameOverScreen.style.justifyContent = "center";
  gameOverScreen.style.alignItems = "center";
  gameOverScreen.style.flexDirection = "column";
  gameOverScreen.style.textAlign = "center";
  gameOverScreen.style.fontSize = "3rem";
  gameOverScreen.style.fontWeight = "900";
  score.style.marginTop = "1rem";
}
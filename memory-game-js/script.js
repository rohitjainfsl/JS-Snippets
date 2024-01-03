const start = document.querySelector("#startBtn");
const flip_card = document.querySelectorAll(".flip-card");
let openPhotos = 0;
let firstClickPhoto = "";
let secondClickPhoto = "";

start.addEventListener("click", () => {
  document.querySelector("#start").style.display = "none";
  document.querySelector("#game").style.display = "flex";
  randomizePhotos();
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
          // if (openPhotos > 1) {
          if (openPhotos === 1) {
            firstClickPhoto = card_inner.children[1].children[0];
            console.log(firstClickPhoto);
          } else if (openPhotos === 2) {
            secondClickPhoto = card_inner.children[1].children[0];
            console.log(secondClickPhoto);
            if (firstClickPhoto.src === secondClickPhoto.src) {
              // card_inner.children[1].children[0].classList.add("matched");
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

          // }
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
    // console.log("randomPhoto", randomPhoto, alreadyUsedPhotos);
    for (let i = 0; i < 2; i++) {
      flip_card[
        recursive(flip_card, alreadyUsedCards)
      ].children[0].children[1].children[0].src = "images/" + randomPhoto;
      // console.log(
      //   "while,for : flip card",
      //   (flip_card[0].children[0].children[1].children[0].src =
      //     "images/" + randomPhoto)
      // );
    }
    j++;
  }
}

function recursive(element, arr) {
  const integer = Math.floor(Math.random() * element.length);
  // console.log("recursive function, integer", integer);
  if (arr.includes(integer)) {
    // console.log("recursive", arr);

    return recursive(element, arr);
  } else {
    arr.push(integer);
    // console.log("recursive arr", arr);

    return integer;
  }
}

const start = document.querySelector("#startBtn");
const flip_card = document.querySelectorAll(".flip-card");
let openPhotos = 0;

start.addEventListener("click", () => {
  document.querySelector("#start").style.display = "none";
  document.querySelector("#game").style.display = "flex";
  randomizePhotos();
});

flip_card.forEach((card) => {
  card.onclick = () => {
    const card_inner = card.children[0];
    const styles = window.getComputedStyle(card_inner);
    if (styles.getPropertyValue("transform") === "none") {
      // console.log(styles.getPropertyValue("transform"))
      card_inner.style.transform = "rotateY(180deg)";
      openPhotos++;
      setTimeout(() => {
        if (openPhotos > 1) {
          if (photos_match()) {
          } else closeAll();
        }
      }, 1000);
    }
  };
});

function closeAll() {
  setTimeout(() => {
    openPhotos = 0;
    flip_card.forEach((card) => {
      card.children[0].removeAttribute("style");
    });
  }, 400);
}

function photos_match() {
  setTimeout(() => {
    openPhotos = 0;
    return false;
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
    flip_card[
      recursive(flip_card, alreadyUsedCards)
    ].children[0].children[1].children[0].src = "images/" + randomPhoto;
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

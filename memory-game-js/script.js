const start= document.querySelector("#startBtn")
start.addEventListener("click", () => {
  document.querySelector("#start").style.display = "none"
  document.querySelector("#game").style.display = "flex"
})


const flip_card = document.querySelectorAll(".flip-card");

flip_card.forEach((card) => {
  card.onclick = () => {
    const card_inner = card.children[0];
    const styles = window.getComputedStyle(card_inner);
    if (styles.getPropertyValue("transform") === "none") {
      card_inner.style.transform = "rotateY(180deg)";
    }
  };
});

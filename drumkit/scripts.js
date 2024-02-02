const instruments = {
  c: "Crash",
  k: "Kick",
  s: "Snare",
  t: "Tom",
};
const rightDiv = document.querySelector("#right");

Object.values(instruments).forEach((instrument) => {
  const box = document.createElement("div");
  const img = document.createElement("img");
  const audio = document.createElement("audio");
  box.classList.add("box");
  box.classList.add(instrument);

  img.src = "assets/" + instrument + ".png";

  // ADD INSTRUMENT NAME AS CLASS ON THE BOX
  audio.src = "assets/" + instrument + ".mp3";

  box.append(img);
  box.append(audio);

  box.addEventListener("click", () => {
    box.children[box.childElementCount - 1].play();
  });

  rightDiv.append(box);
});

window.addEventListener("keyup", (e) => {
  if (Object.keys(instruments).includes(e.key)) {
    const audio = document.createElement("audio");
    audio.src = "assets/" + instruments[e.key] + ".mp3";
    audio.play();

    // FIND BOX WITH THE KEY
    // APPLY BACKGROUND COLOR ON IT

    const boxToApplyBackground = Array.from(
      document.querySelectorAll(".box")
    ).find((box) => {
      return box.classList.contains(instruments[e.key]);
    });

    boxToApplyBackground.style.backgroundColor = "blanchedalmond";
    setTimeout(() => {
      boxToApplyBackground.style.backgroundColor = "white";
    }, 500);
  }
});



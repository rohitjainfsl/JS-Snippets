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

  img.src = "assets/" + instrument + ".png";
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
  }
});
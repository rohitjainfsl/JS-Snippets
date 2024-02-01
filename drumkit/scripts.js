const instruments = {
  c: "Crash",
  k: "Kick",
  s: "Snare",
  t: "Tom",
};
const wrapper = document.querySelector("#wrapper");

Object.values(instruments).forEach((instrument) => {
  const box = document.createElement("div");
  const img = document.createElement("img");
  const audio = document.createElement("audio");

  img.src = "assets/" + instrument + ".png";
  audio.src = "assets/" + instrument + ".mp3";

  box.append(img);
  box.append(audio);

  box.addEventListener("click", () => {
    box.children[box.childElementCount - 1].play();
  });

  wrapper.append(box);
});

window.addEventListener("keyup", (e) => {
  if (Object.keys(instruments).includes(e.key)) {
    const audio = document.createElement("audio");
    audio.src = "assets/" + instruments[e.key] + ".mp3";
    audio.play();
  }
});

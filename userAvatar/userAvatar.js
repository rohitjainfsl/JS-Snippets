const plusBtn = document.querySelector(".plus");
const firstDiv = document.querySelector(".first");
const secondDiv = document.querySelector(".second");
const nameInput = secondDiv.querySelector("input");
const noBtn = secondDiv.querySelector(".no");
const yesBtn = secondDiv.querySelector(".yes");
const thirdDiv = document.querySelector(".third");
const closeBtn = document.querySelector(".close");

const avatars = [];

const colors = [
  "#f43f5e",
  "#ec4899",
  "#a855f7",
  "#6366f1",
  "#3b82f6",
  "#0ea5e9",
  "#06b6d4",
  "#10b981",
  "#22c55e",
  "#eab308",
  "#f97316",
  "#ef4444",
];

plusBtn.addEventListener("click", () => {
  secondDiv.classList.remove("d-none");
});

noBtn.addEventListener("click", () => {
  nameInput.value = "";
  secondDiv.classList.add("d-none");
});
closeBtn.addEventListener("click", () => {
  nameInput.value = "";
  secondDiv.classList.add("d-none");
});
yesBtn.addEventListener("click", () => {
  if (
    nameInput.value.length <= 0 ||
    (nameInput.value.length > 50 && nameInput.value.match(/^[a-zA-Z ]+$/))
  ) {
    alert("Only alphabets allowed & max length allowed is 50");
  } else {
    avatars.push(nameInput.value.slice(0, 1).toUpperCase());

    const newLetter = avatars.pop();
    const avatar = document.createElement("p");

    avatar.classList.add("avatar");
    avatar.innerText = newLetter;

    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    avatar.style.backgroundColor = randomColor;
    const cross = document.createElement("span");

    cross.innerHTML = "&times;";
    cross.classList.add("cross");

    cross.addEventListener("click", () => {
      avatar.remove();
    });

    avatar.appendChild(cross);
    thirdDiv.append(avatar);

    nameInput.value = "";
    secondDiv.classList.add("d-none");
    thirdDiv.classList.remove("d-none");
  }
});

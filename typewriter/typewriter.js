const input = document.querySelector("input");
const start = document.querySelector("button");
const output = document.querySelector("#result");
let words = [];
let i = 0;

start.onclick = () => {
  if (input.value.length === 0) {
    alert("Enter Something");
  } else if (!input.value.indexOf(" ")) {
    words.push(input.value);
  } else {
    const temp = input.value.split(" ");
    if (temp.length > 50) alert("Max 50 words allowed");
    else {
      words = [...temp];
      init();
    }
  }
};
function init() {
  if (i < words.length) {
    output.classList.add("box");
    const letters = words[i].split("");
    startTypeWriterEffect(letters).then(() => init());
    i++;
  } else {
    output.classList.remove("box");
  }
}
function startTypeWriterEffect(word) {
  return new Promise((resolve, reject) => {
    let j = 0;
    const interval = setInterval(() => {
      if (j === word.length) {
        clearInterval(interval);
        clearScreen().then(() => resolve());
      } else {
        output.innerHTML += word[j];
        j++;
      }
    }, 300);
  });
}

function clearScreen() {
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      if (output.innerHTML.length === 0) {
        clearInterval(interval);
        resolve();
      } else {
        const textOnScreen = output.innerHTML.split("");
        textOnScreen.pop();
        output.innerHTML = textOnScreen.join("");
      }
    }, 300);
  });
}

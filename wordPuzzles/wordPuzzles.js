const data = [
  {
    word: "Computer",
    hint: "it can do calculations, play sounds and video. You can view the world's information on it",
  },
  {
    word: "python",
    hint: "It's an animal as well as a programming language",
  },
  {
    word: "morning",
    hint: "what comes after night",
  },
];

const puzzlesDiv = document.querySelector("#puzzles");
const form = document.querySelector("form");
let wordCounter = 0;
let userAnswers = [];
let interval = ''

startCounter();

for (let i = 0; i < data.length; i++) {
  const jumbled = document.createElement("div");
  jumbled.classList.add("jumbled");

  const h2 = document.createElement("h2");
  h2.innerHTML = getJumbledWord(wordCounter);

  const hint = document.createElement("p");
  hint.innerHTML = "HINT: " + data[wordCounter].hint;

  jumbled.append(h2);
  jumbled.append(hint);

  const userAnswer = document.createElement("div");
  userAnswer.classList.add("userAnswer");
  const input = document.createElement("input");
  input.type = "text";
  userAnswer.append(input);

  puzzlesDiv.append(jumbled);
  puzzlesDiv.append(userAnswer);
  wordCounter++;
}

function getJumbledWord(wordCounter) {
  let existingChars = [];
  let jumbledWord = "";
  const wordArray = data[wordCounter].word.toUpperCase().split("");
  for (let i = 0; i < wordArray.length; i++) {
    jumbledWord += wordArray[getARandomValue(wordArray.length, existingChars)];
  }
  return jumbledWord;
}

function getARandomValue(len, existingChars) {
  const val = Math.floor(Math.random() * len);
  if (existingChars.includes(val)) return getARandomValue(len, existingChars);
  else {
    existingChars.push(val);
    return val;
  }
}

function startCounter() {
  let limit = 30;
  const counterDiv = document.querySelector(".counter");
  counterDiv.innerHTML = limit;
  interval = setInterval(() => {
    if (limit === 0) {
      document.querySelector("form").submit();
      submitAnswers();
    } else counterDiv.innerHTML = --limit;
  }, 1000);
}

document.querySelector("form").onsubmit = (e) => {
  e.preventDefault();
  submitAnswers();
};

function submitAnswers() {
  clearInterval(interval)
  userAnswers = Array.from(form.elements);
  userAnswers.pop();
  revealAnswers();
}

function revealAnswers() {
  form.style.display = "none";
  document.querySelector("#results").style.display = "block";

  for (let i = 0; i < data.length; i++) {
    const div = document.createElement("div");
    const correctAnswer = document.createElement("p");
    correctAnswer.innerHTML = "Correct Answer: " + data[i].word.toUpperCase();

    const yourAnswer = document.createElement("p");
    yourAnswer.innerHTML = "Your Answer: " + userAnswers[i].value.toUpperCase();

    div.append(correctAnswer);
    div.append(yourAnswer);

    document.querySelector("#results").append(div);
  }
}

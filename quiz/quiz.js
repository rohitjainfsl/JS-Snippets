const startQuiz = document.querySelector("button");
const questionDiv = document.querySelector(".question");
const timerDiv = document.querySelector(".timer");
// const input = document.querySelector(".answer");
const optionsDiv = document.querySelector(".answers");
const questions = ["2+2", "3*3+3-3", "4+4+4*0+4"];
const options = [
  [0, 3, 1, 4],
  [3, 33, 9, 12],
  [4, 0, 12, 8]
];
const actualAnswers = [4, 9, 12];

let randomOrder = [];
let timer = 5;
let currentQuestionIndex = 0;
let interval;
let userAnswers = [];

startQuiz.addEventListener("click", startTheQuiz);
// startQuiz.onclick = startTheQuiz;

function startTheQuiz() {
  //show the questions div
  document.querySelector("#questions").style.display = "flex";

  //hide the button
  startQuiz.style.display = "none";

  randomOrder = getRandomOrder(questions);
  // console.log(randomOrder);

  timerDiv.innerHTML = timer--;
  nextQuestion(currentQuestionIndex);

  interval = setInterval(() => {
    if (timer === 0) {
      storeUserAnswer();

      clearOptions();

      timer = 5;
      timerDiv.innerHTML = 5;
      nextQuestion(++currentQuestionIndex);
    }
    timerDiv.innerHTML = timer--;
  }, 1000);
}

function getRandomOrder(arr) {
  let temp = [];
  for (let i = 0; i < arr.length; i++) {
    let random = Math.floor(Math.random() * arr.length);
    if (temp.includes(random)) return getRandomOrder(arr);
    //recursion
    else temp.push(random);
  }
  return temp;
}

function nextQuestion(current) {
  if (currentQuestionIndex === questions.length) {
    clearInterval(interval);
    calculateScore();
  } else {
    questionDiv.innerHTML = questions[randomOrder[current]];

    //SHOW THE OPTIONS
    showRandomizedOptions(current);
  }
}

function storeUserAnswer() {
  let currentAnswer = null;
  let radios = Array.from(optionsDiv.children);



  radios.forEach((option) => {
    let input = Array.from(option.children)[0];
    if (input.checked) {
      console.log(input.value);
      currentAnswer = input.value;
    }
  });
  userAnswers.push(currentAnswer);

}

function calculateScore() {
  document.querySelector("#questions").style.display = "none";
  let score = 0;
  userAnswers.forEach((answer, index) => {
    if (answer !== null) {
      if (Number(answer) === actualAnswers[randomOrder[index]]) score++;
    }
  });

  let scoreDisplay = document.createElement("p");
  // scoreDisplay.innerHTML = "Your score is "+score+ " out of "+questions.length;

  scoreDisplay.innerHTML = `Your score is ${score} out of ${questions.length}`; //Template Literals

  document.querySelector("#quiz").appendChild(scoreDisplay);
}

function showRandomizedOptions(current) {
  //GETTING A RANDOM ORDER TO DISPLAY OPTIONS
  let optionsRandomOrder = getRandomOrder(options[randomOrder[current]]);
  optionsRandomOrder.forEach((randomOption, index) => {
    let radio = document.createElement("input");
    radio.setAttribute("type", "radio");
    radio.setAttribute("name", "options");
    radio.setAttribute("value", options[randomOrder[current]][randomOption]);

    let wrapper = document.createElement("label");

    let span = document.createElement("span");
    span.innerHTML = options[randomOrder[current]][randomOption];
    wrapper.appendChild(radio);
    wrapper.appendChild(span);
    optionsDiv.appendChild(wrapper);
  });
}

function clearOptions() {
  if (optionsDiv.children.length > 0) {
    let radios = optionsDiv.children;
    let radioArray = Array.from(radios);
    radioArray.forEach((option) => {
      option.remove();
    });
  }
}

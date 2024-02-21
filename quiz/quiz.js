const questions = [
  { q: "2+2", opt: [1, 2, 3, 4], correct: 4, hasImage: false },

  { q: "2*2*2-8", opt: [8, 0, -2, 1], correct: 0, hasImage: false },

  { q: "3+3+3", opt: [0, 333, 6, 9], correct: 9, hasImage: false },

  { q: "4*4/4", opt: [4, 0, 8, 16], correct: 4, hasImage: false },

  {
    q: '<img class="photo" src="assets/ram mandir.webp" /> <br> Which monument is this?',
    opt: ["Taj Mahal", "Red Fort", "Qutub Minar", "Ram Mandir"],
    correct: "Ram Mandir",
    hasImage: true,
  },
];

const para = document.querySelector(".question");
const optionsPara = document.querySelectorAll("#options p");
const timerDiv = document.querySelector(".timer");
const counterDiv = document.querySelector("#counter");
const quizDiv = document.querySelector("#quiz");
const value = [];
const userAnswers = [];
const randomOrder = [];
const temp = [];

let didUserAnswer = false;

let i = 0;
let timer = 5;

// GENERATE A RANDOM ORDER ON PAGE LOAD
for (let i = 0; i < questions.length; i++) {
  randomOrder.push(getARandomValue());
}

// CREATING COUNTER
for (let i = 0; i < questions.length; i++) {  
  const count = document.createElement("div");
  count.classList.add("count");
  count.innerHTML = i + 1;
  counterDiv.append(count);
}

// PRINT FIRST QUESTION INSTANTLY (WITHOUT DELAY)
printQ();
timerDiv.innerHTML = timer;
displayProgress();

// START THE LOOP TO PRINT NEXT QUESTIONS
const girraj = setInterval(() => {
  if (timer === 1) {
    if (didUserAnswer === false) userAnswers.push("NA");
    printQ();
    timer = 5;
    displayProgress();

    timerDiv.innerHTML = timer;
  } else {
    timer--;
    timerDiv.innerHTML = timer;
  }
}, 1000);

// WHEN USER CLICKS ON ANY OPTION,
// APPLY CLASS ON THAT OPTION
optionsPara.forEach((p, index) => {
  p.addEventListener("click", () => {
    p.classList.add("selectedOption");
    userAnswers.push(p.innerHTML);

    // NOW THAT USER HAS MADE THEIR CHOICE
    // TOGGLE THE VARIABLE AND,
    // DISABLE ALL THE OPTIONS TO PREVENT DOUBLE CLICKING

    didUserAnswer = true;
    disableOptions();
    console.log(userAnswers);
  });
});

function getARandomValue() {
  const randomValue = Math.floor(Math.random() * questions.length);
  if (temp.includes(randomValue)) return getARandomValue();
  else {
    temp.push(randomValue);
    return randomValue;
  }
}

function printQ() {
  // ENABLE THE OPTIONS
  enableOptions();

  // REMOVE THE SELECTED CLASS
  removeSelectedClass();

  // TOGGLE VARIABLE TO FALSE
  didUserAnswer = false;

  if (i === questions.length) {
    clearInterval(girraj);

    // COMPARE USER ANSWERS WITH ACTUAL ANSWERS AS PER RANDOM ORDER
    const score = compareUserAnswers();

    // DISPLAY SCORE ON SCREEN
    showScore(score);
  } else {
    para.innerHTML = questions[randomOrder[i]].q;
    optionsPara.forEach((p, index) => {
      p.innerHTML = questions[randomOrder[i]].opt[index];
    });
    i++;
  }
}

function disableOptions() {
  optionsPara.forEach((p) => {
    p.style.pointerEvents = "none";
  });
}

function enableOptions() {
  optionsPara.forEach((p) => {
    p.style.pointerEvents = "all";
  });
}

function removeSelectedClass() {
  optionsPara.forEach((p) => {
    if (p.classList.contains("selectedOption"))
      p.classList.remove("selectedOption");
  });
}

function compareUserAnswers() {
  let score = 0;
  userAnswers.forEach((userA, index) => {
    if (questions[randomOrder[index]].hasImage === false) {
      userA = Number(userA);
    }
    if (userA !== "NA" && userA === questions[randomOrder[index]].correct) {
      score++;
    }
  });
  return score;
}

function showScore(score) {
  quizDiv.innerHTML = "";
  counterDiv.style.display = "none";

  const scorePara = document.createElement("p");
  scorePara.classList.add("scorePara");
  scorePara.innerHTML = "Your score is: " + score;
  quizDiv.append(scorePara);
}

function displayProgress() {
  Array.from(counterDiv.children).forEach((counter, index) => {
    if (index < i) {
      counter.classList.add("attempted");
      if(index === i-1) counter.classList.add("current");
      else  counter.classList.remove("current");
    }
  });
}

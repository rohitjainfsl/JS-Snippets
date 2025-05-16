const submit = document.querySelector("#submit");

let puzzleNumbers = "";
let solution = "";

const url = {
  question:
    "https://sudoku-generator1.p.rapidapi.com/sudoku/generate?seed=1337",
  answer: "https://sudoku-generator1.p.rapidapi.com/sudoku/solve",
};
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "",
    "X-RapidAPI-Host": "sudoku-generator1.p.rapidapi.com",
  },
};

generateSudokuBoard();
fetchData();
submit.addEventListener("click", submitSolution);

function generateSudokuBoard() {
  const sudokuDiv = document.querySelector(".sudoku");
  const fragment = document.createDocumentFragment();
  let counter = 1;
  for (let i = 0; i < 81; i++) {
    const box = document.createElement("div");
    box.classList.add("box");
    if (counter % 3 === 0) box.style.borderRight = "3px solid";
    fragment.append(box);
    counter++;
  }
  sudokuDiv.append(fragment);
}

async function fetchData() {
  try {
    const response = await fetch(url.question, options);
    const result = await response.json();

    fillSudokuBoard(result.puzzle);
    puzzleNumbers = result.puzzle;
  } catch (error) {
    console.error(error);
  }
}

function fillSudokuBoard(numbers) {
  const boxes = document.querySelectorAll(".sudoku .box");
  numbers.split("").forEach((number, index) => {
    if (number === ".") {
      const input = document.createElement("input");
      input.type = "text";
      input.pattern = "d.";
      input.maxLength = "1";
      input.addEventListener("keyup", checkForNumber);
      boxes[index].append(input);
    } else {
      boxes[index].classList.add("filled");
      boxes[index].innerHTML = number;
    }
  });
}

function checkForNumber(e) {
  if (e.keyCode < 48 || e.keyCode > 57) {
    e.target.value = "";
  }
}

async function submitSolution(e) {
  const boxes = document.querySelectorAll(".sudoku .box");
  const numbersArr = puzzleNumbers.split("");
  const updatedNumbersArr = numbersArr.map((num, index) => {
    if (num === "." && boxes[index].children[0].value.length > 0) {
      num = boxes[index].children[0].value;
      return num;
    }
    return num;
  });
  solution = updatedNumbersArr.join("");

  try {
    const response = await fetch(url.answer + "?puzzle=" + solution, options);
    const result = await response.json();

    if (result.solution === solution) console.log("Well Done");
    else console.log("Better luck next time");
  } catch (error) {
    console.error(error);
  }
}

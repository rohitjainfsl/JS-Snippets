const submit = document.querySelector("#submit");

let puzzleNumbers = "";
let solution = "";

const url =
  "https://sudoku-generator1.p.rapidapi.com/sudoku/generate?seed=1337";
// solution =
//   "https://sudoku-generator1.p.rapidapi.com/sudoku/solve?puzzle=..3465..2.862..7..92...7.1.6....234..15....69.42..8.......364717..5.49.3..987.5..";
const options = {
  method: "GET",
  headers: {
    
  },
};

submit.addEventListener("click", submitSolution);

async function fetchData() {
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    fillSudokuBoard(result.puzzle);
    puzzleNumbers = result.puzzle;
    solution =
      "https://sudoku-generator1.p.rapidapi.com/sudoku/solve?puzzle=" +
      puzzleNumbers;
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

function generateSudokuBoard(puzzle) {
  const sudokuDiv = document.querySelector(".sudoku");
  let counter = 1;
  for (let i = 0; i < 81; i++) {
    const box = document.createElement("div");
    box.classList.add("box");
    if (counter % 3 === 0) box.style.borderRight = "3px solid";
    sudokuDiv.append(box);
    counter++;
  }
}

function checkForNumber(e) {
  if (e.keyCode < 48 || e.keyCode > 57) {
    e.target.value = "";
  }
}

async function submitSolution(e) {
  try {
    const response = await fetch(solution, options);
    const result = await response.json();
    console.log(result);
    const userSubmission = getUserSubmission();
    if (result.solution === userSubmission) console.log("Well Done");
    else console.log("Better luck next time");
  } catch (error) {
    console.error(error);
  }
}

function getUserSubmission() {
  const boxes = document.querySelectorAll(".sudoku .box");
  let userSubmission = "";
  boxes.forEach((box, index) => {
    if (box.childElementCount > 0) userSubmission += box.children[0].value;
    else userSubmission += box.innerHTML;
  });
  console.log(userSubmission);
  return userSubmission;
}

generateSudokuBoard();
fetchData();

const board = document.querySelector("#board");
let row = 1;

let counter = 100;

for (let i = 0; i < 10; i++) {
  const row = document.createElement("div");
  row.classList.add("row");
  if (i % 2 === 1) row.classList.add("reversed");
  for (let j = 0; j < 10; j++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.textContent = counter--;
    row.append(square);
  }
  board.append(row);
}

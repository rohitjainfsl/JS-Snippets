const form = document.querySelector("form");
const firstName = document.querySelector("#fname");
const lastName = document.querySelector("#lname");
const country = document.querySelector("select");
const score = document.querySelector("#score");
const board = document.querySelector(".board");

form.addEventListener("submit", addRecord);

const leaderBoard = [];

function addRecord(e) {
  e.preventDefault();
  const playerRecord = {};
  playerRecord["id"] = leaderBoard.length + 1;
  playerRecord["name"] = firstName.value + " " + lastName.value;
  playerRecord["country"] = country.value;
  playerRecord["score"] = score.value;
  leaderBoard.push(playerRecord);

  //SORTING LEADERBOARD
  sortLeaderBoard();

  //PRINTING LEADERBOARD
  printLeaderBoard();

  //RESETTING THE FORM
  clearInputs();
  
  firstName.focus();
}

function clearInputs() {
  firstName.value = "";
  lastName.value = "";
  country.value = "";
  score.value = "";
}

function sortLeaderBoard() {
  leaderBoard.sort((a, b) => {
    return Number(b.score) - Number(a.score);
  });
}

function printLeaderBoard() {
  board.innerText = "";
  leaderBoard.forEach((player) => {
    const playerRecord = document.createElement("div");
    playerRecord.classList.add("playerRecord");

    const name = document.createElement("p");
    name.classList.add("name");
    name.innerText = player.name;

    const country = document.createElement("p");
    country.classList.add("country");
    country.innerText = player.country;

    const score = document.createElement("p");
    score.classList.add("score");
    score.innerText = player.score;

    playerRecord.append(name);
    playerRecord.append(country);
    playerRecord.append(score);

    board.append(playerRecord);
  });
}
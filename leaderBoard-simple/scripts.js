const form = document.querySelector("form");
const firstName = document.querySelector("#fname");
const lastName = document.querySelector("#lname");
const country = document.querySelector("select");
const score = document.querySelector("#score");
const board = document.querySelector(".board");

form.addEventListener("submit", addRecord);

let leaderBoard = [];

function addRecord(e) {
  e.preventDefault();
  const playerRecord = {};
  playerRecord["id"] = leaderBoard.length + 1;
  playerRecord["name"] = firstName.value + " " + lastName.value;
  playerRecord["country"] = country.value;
  playerRecord["score"] = Number(score.value);
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

    const icons = document.createElement("div");
    icons.classList.add("icons");

    const trash = document.createElement("i");
    trash.classList.add("fa-solid", "fa-trash");
    trash.addEventListener("click", () => {
      deleteRecord(player.id);
    });

    const plus = document.createElement("span");
    plus.innerText = "+5";
    plus.addEventListener("click", () => {
      plusMinusScore(player.id, "+");
    });

    const minus = document.createElement("span");
    minus.innerText = "-5";
    minus.addEventListener("click", () => {
      plusMinusScore(player.id, "-");
    });

    icons.append(trash);
    icons.append(plus);
    icons.append(minus);

    playerRecord.append(name);
    playerRecord.append(country);
    playerRecord.append(score);
    playerRecord.append(icons);

    board.append(playerRecord);
  });
}

function deleteRecord(id) {
  leaderBoard = leaderBoard.filter((player) => player.id !== id);

  sortLeaderBoard();

  printLeaderBoard();
}

function plusMinusScore(id, symbol) {
  if (symbol === "+") {
    leaderBoard.map((player) => {
      if (player.id === id) {
        player.score += 5;
      }
    });
  } else {
    leaderBoard.map((player) => {
      if (player.id === id) {
        player.score -= 5;
      }
    });
  }
  sortLeaderBoard();

  printLeaderBoard();
}

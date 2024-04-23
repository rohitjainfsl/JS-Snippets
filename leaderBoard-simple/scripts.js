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

  console.log(leaderBoard);

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

// function addRecord(e) {
//   e.preventDefault();
//   const recordDiv = document.createElement("div");
//   recordDiv.classList.add("record");

//   const playername = document.createElement("p");
//   playername.classList.add("name");
//   recordDiv.append(playername);

//   const playercountry = document.createElement("p");
//   playercountry.classList.add("country");
//   recordDiv.append(playercountry);

//   const playerscore = document.createElement("p");
//   playerscore.classList.add("score");
//   recordDiv.append(playerscore);

//   const options = document.createElement("p");
//   options.classList.add("options");

//   const del = document.createElement("i");
//   del.classList.add("fa-solid", "fa-trash");
//   options.append(del);

//   const plusFive = document.createElement("span");
//   plusFive.innerText = "+5";
//   const minusFive = document.createElement("span");
//   minusFive.innerText = "-5";

//   options.append(plusFive);
//   options.append(minusFive);
//   recordDiv.append(options);

//   board.append(recordDiv);
// }

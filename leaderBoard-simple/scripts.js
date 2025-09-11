// --- DOM Element Selection ---
const form = document.querySelector("form");
const firstNameInput = document.querySelector("#fname");
const lastNameInput = document.querySelector("#lname");
const countryInput = document.querySelector("select");
const scoreInput = document.querySelector("#score");
const board = document.querySelector(".board");

// --- State Management ---
let leaderBoard = [];
let nextId = 1;

// --- Functions ---

/**
 * Creates a DOM element for a single player record.
 * This function is purely for creating UI and does not attach event listeners.
 * @param {object} player - The player data object.
 * @returns {HTMLElement} The player record div.
 */
function createPlayerElement(player) {
  const playerRecord = document.createElement("div");
  playerRecord.classList.add("playerRecord");
  // Use a data attribute to easily identify the record later
  playerRecord.dataset.id = player.id;

  const name = document.createElement("p");
  name.classList.add("name");
  name.textContent = player.name;

  const country = document.createElement("p");
  country.classList.add("country");
  country.textContent = player.country;

  const score = document.createElement("p");
  score.classList.add("score");
  score.textContent = player.score;

  const icons = document.createElement("div");
  icons.innerHTML = `
        <i class="fa-solid fa-trash" data-action="delete"></i>
        <span class="plus-five" data-action="increase">+5</span>
        <span class="minus-five" data-action="decrease">-5</span>
    `;
  icons.classList.add("icons");

  playerRecord.append(name, country, score, icons);
  return playerRecord;
}

/**
 * Sorts and renders the entire leaderboard to the DOM.
 * Uses a DocumentFragment to minimize reflows and repaints.
 */
function renderLeaderboard() {
  // Sort the data first
  leaderBoard.sort((a, b) => b.score - a.score);

  // Clear the board
  board.innerHTML = "";

  // Use a DocumentFragment for efficient batch updating
  const fragment = document.createDocumentFragment();
  leaderBoard.forEach((player) => {
    const playerElement = createPlayerElement(player);
    fragment.appendChild(playerElement);
  });

  // Append the fragment to the board in a single operation
  board.appendChild(fragment);
}

/**
 * Resets the form input fields.
 */
function clearInputs() {
  form.reset(); // A more concise way to clear a form
  firstNameInput.focus();
}

// --- Event Handlers ---

/**
 * Handles the form submission to add a new player.
 * @param {Event} e - The submit event.
 */
function handleAddRecord(e) {
  e.preventDefault();

  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  const country = countryInput.value;
  const score = Number(scoreInput.value);

  if (!firstName || !lastName || !country || isNaN(score)) {
    alert("Please fill in all fields correctly.");
    return;
  }

  const newPlayer = {
    id: nextId++, // Use a reliable, incrementing ID
    name: `${firstName} ${lastName}`,
    country: country,
    score: score,
  };

  leaderBoard.push(newPlayer);
  renderLeaderboard();
  clearInputs();
}

/**
 * Handles clicks on the leaderboard for deleting or updating scores
 * using event delegation.
 * @param {Event} e - The click event.
 */
function handleBoardClick(e) {
  const action = e.target.dataset.action;
  if (!action) return; // Exit if the click was not on an action element

  const playerRecordElement = e.target.closest(".playerRecord");
  if (!playerRecordElement) return;

  const playerId = Number(playerRecordElement.dataset.id);

  switch (action) {
    case "delete":
      leaderBoard = leaderBoard.filter((player) => player.id !== playerId);
      break;
    case "increase":
      leaderBoard.forEach((player) => {
        if (player.id === playerId) {
          player.score += 5;
        }
      });
      break;
    case "decrease":
      leaderBoard.forEach((player) => {
        if (player.id === playerId) {
          player.score -= 5;
        }
      });
      break;
  }

  // Re-render the board after any state change
  renderLeaderboard();
}

// --- Event Listeners ---
form.addEventListener("submit", handleAddRecord);

// Single event listener on the parent container for all actions
board.addEventListener("click", handleBoardClick);

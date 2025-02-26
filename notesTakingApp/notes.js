const form = document.querySelector("form");
const textarea = form.querySelector("textarea");
const color = form.querySelector("input");
const notesContainer = document.querySelector(".notesContainer");
const undo = document.querySelector(".undo");
const createdNotes = [];
const deletedNotes = [];

window.addEventListener("load", undoButtonStatus);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const newNote = {
    text: textarea.value,
    color: color.value,
    timestamp: new Date().toLocaleString(),
    position: Date.now(),
  };

  createdNotes.push(newNote);
  // console.log(createdNotes);
  displayNotes();

  textarea.value = "";
  textarea.focus();
});

function displayNotes() {
  notesContainer.innerHTML = "";
  const fragment = document.createDocumentFragment();
  createdNotes.forEach((note) => {
    const noteDiv = document.createElement("div");
    noteDiv.classList.add("note");
    noteDiv.style.backgroundColor = `${note.color}`;

    const text = document.createElement("p");
    // text.innerText = note.text;
    text.innerText = `${note.text}`; //TEMPLATE LITERAL

    const close = document.createElement("span");
    close.classList.add("close");
    close.innerHTML = "&times;";

    close.addEventListener("click", (e) => {
      const indexToDelete = createdNotes.findIndex((n) => {
        return n.position === note.position;
      });
      deletedNotes.push(...createdNotes.splice(indexToDelete, 1));

      e.target.closest(".note").remove();
      console.log("created: ", createdNotes);
      console.log("deleted: ", deletedNotes);

      undoButtonStatus();
    });

    const timestamp = document.createElement("span");
    timestamp.classList.add("timestamp");
    timestamp.innerText = `${note.timestamp}`;

    noteDiv.append(text, close, timestamp);
    fragment.append(noteDiv);
  });
  notesContainer.append(fragment);
}

undo.addEventListener("click", (e) => {
  const lastDeletedNote = deletedNotes.pop();
  createdNotes.push(lastDeletedNote);

  createdNotes.sort((a, b) => {
    return a.position - b.position;
  });

  console.log("created: ", createdNotes);
  console.log("deleted: ", deletedNotes);

  displayNotes();
  undoButtonStatus();
});

function undoButtonStatus() {
  undo.disabled = deletedNotes.length === 0 ? true : false;
}




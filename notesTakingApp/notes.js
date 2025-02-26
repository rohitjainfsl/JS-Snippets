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

    const content = document.createElement("div");
    content.classList.add("content");

    const text = document.createElement("p");
    // text.innerText = note.text;
    text.innerText = `${note.text}`; //TEMPLATE LITERAL

    //CLOSE ICON
    const close = document.createElement("i");
    close.classList.add("close", "fa-solid", "fa-xmark");
    close.addEventListener("click", (e) => {
      const indexToDelete = createdNotes.findIndex((n) => {
        return n.position === note.position;
      });
      deletedNotes.push(...createdNotes.splice(indexToDelete, 1));

      e.target.closest(".note").remove();

      undoButtonStatus();
    });

    //TIMESTAMP
    const timestamp = document.createElement("span");
    timestamp.classList.add("timestamp");
    timestamp.innerText = `${note.timestamp}`;

    const actions = document.createElement("div");
    actions.classList.add("actions");

    //EDIT ICON
    const edit = document.createElement("i");
    edit.classList.add("edit", "fa-solid", "fa-pen");
    edit.addEventListener("click", (e) => {
      const elementToEdit = e.target.parentElement.children[0];
      const textToEdit = elementToEdit.innerText;
      elementToEdit.remove();
      const input = document.createElement("input");
      input.classList.add("input");
      input.value = textToEdit;

      input.addEventListener("blur", (e) => {
        const elementToEdit = e.target.parentElement.children[0];
        const textToEdit = elementToEdit.value;
        const para = document.createElement("p");
        para.innerText = textToEdit;
        e.target.parentElement.insertBefore(
          para,
          e.target.parentElement.children[0]
        );
        elementToEdit.remove();
      });

      e.target.parentElement.insertBefore(
        input,
        e.target.parentElement.children[0]
      );
      input.focus();
    });

    actions.append(edit, close);
    content.append(text);
    noteDiv.append(content, timestamp, actions);
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
  displayNotes();
  undoButtonStatus();
});

function undoButtonStatus() {
  undo.disabled = deletedNotes.length === 0 ? true : false;
}

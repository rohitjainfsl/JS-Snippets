import data from "./data.js";

const table = document.querySelector("table tbody");

const search = document.querySelector("#search");
const gender = document.querySelector("#gen");
const active = document.querySelector("#active");

window.onload = data.forEach(populateTable);

search.addEventListener("keyup", () => {
  if (search.value.length === 0) {
    emptyTable();
    data.forEach(populateTable);
  } else {
    let tempData = data;
    tempData = tempData.filter((dt) => {
      return dt.name.toLowerCase().includes(search.value);
    });
    //EMPTY THE TABLE
    emptyTable();

    tempData.forEach(populateTable);
  }
});

gender.addEventListener("change", () => {
  if (gender.value.length === 0) {
    emptyTable();
    data.forEach(populateTable);
  } else {
    let tempData = data;
    tempData = tempData.filter((dt) => {
      return dt.gender === gender.value;
    });

    //EMPTY THE TABLE
    emptyTable();

    tempData.forEach(populateTable);
  }
});

active.addEventListener("change", () => {
  if (active.value.length === 0) {
    emptyTable();
    data.forEach(populateTable);
  } else {
    let tempData = data;
    tempData = tempData.filter((dt) => {
      return (
        dt.lastSeen.slice(dt.lastSeen.lastIndexOf("-") + 1) === active.value
      );
    });

    //EMPTY THE TABLE
    emptyTable();

    tempData.forEach(populateTable);
  }
});

function populateTable(row) {
  const tr = document.createElement("tr");
  Object.keys(row).forEach((key) => {
    const td = document.createElement("td");
    td.innerHTML = row[key];
    tr.append(td);
  });
  table.append(tr);
}

function emptyTable() {
  Array.from(table.children).forEach((child, index) => {
    if (index > 0) child.remove();
  });
}

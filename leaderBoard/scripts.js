const countries = [
  { name: "India", flag: "IN" },
  { name: "Australia", flag: "AU" },
  { name: "Afghanistan", flag: "AF" },
  { name: "Bangladesh", flag: "BD" },
  { name: "Ireland", flag: "IE" },
  { name: "New Zealand", flag: "NZ" },
  { name: "Pakistan", flag: "PK" },
];
const headerNames = [
  "S.No",
  "Name",
  "Flag",
  "Country",
  "Score",
  "Modify Score",
  "Delete",
];

const output = [];

const form = document.querySelector("form");
const table = document.querySelector("table");
const select = document.querySelector("form select");
const fnameInput = document.querySelector("#fname");
const lnameInput = document.querySelector("#lname");
const scoreInput = document.querySelector("#score");
let counter = 1;

countries.forEach(createOptions);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const obj = {};

  obj["sno"] = counter;
  counter++;

  obj["name"] = fnameInput.value + " " + lnameInput.value;

  //FLAG
  const flagImage = getFlag(select.value);
  obj["flag"] = flagImage;

  //COUNTRY
  const countryName = getCountryName(select.value);
  obj["country"] = countryName;

  //SCORE
  obj["score"] = scoreInput.value;

  output.push(obj);

  const sortedOutput = sortPerScore(output);
  /* 
    ADDING THE ROW ON SCREEN VIA THE ARRAY
  */
  displayRow(sortedOutput);

  //CLEAR OUT THE FORM

  fnameInput.value = "";
  lnameInput.value = "";
  scoreInput.value = "";
  select.value = "";
});

function createOptions(country) {
  const option = document.createElement("option");
  option.innerHTML = country.name;
  option.value = country.flag;
  select.append(option);
}

function getFlag(countryName) {
  return (
    "<img src='https://flagcdn.com/w40/" +
    countryName.toLowerCase() +
    ".png' alt='Flag' />"
  );
}

function getCountryName(countryCode) {
  let output = "";
  countries.forEach((country) => {
    if (country.flag === countryCode) output = country.name;
  });
  return output;
}

function createTH() {
  const tr = document.createElement("tr");
  for (let i = 0; i < headerNames.length; i++) {
    const th = document.createElement("th");
    th.innerHTML = headerNames[i];
    tr.append(th);
  }
  table.append(tr);
}

function displayRow(sortedOutput) {
  //CHECK IF WE NEED TO CREATE TH
  if (table.children.length === 0) createTH();
  else {
    //DELETE ALL FOLLOWING ROWS
    for (let i = 1; i <= table.children.length; i++) {
      console.log("hello");
      table.children[i].remove();
    }
  }

  //Create rows in loop
  sortedOutput.forEach((row, index) => {
    const tr = document.createElement("tr");
    //SERIAL NO
    const sno = document.createElement("td");
    sno.innerHTML = row.sno;
    tr.append(sno);

    //NAME
    const name = document.createElement("td");
    name.innerHTML = row.name;
    tr.append(name);

    //FLAG
    const flag = document.createElement("td");
    flag.innerHTML = row.flag;
    tr.append(flag);

    //COUNTRY
    const country = document.createElement("td");
    country.innerHTML = row.country;
    tr.append(country);

    //SCORE
    const score = document.createElement("td");
    score.innerHTML = row.score;
    tr.append(score);

    //+5 -5
    const modify = document.createElement("td");
    const plus5 = document.createElement("span");
    plus5.classList.add("circle", "green");
    plus5.innerHTML = "+5";
    modify.append(plus5);

    const minus5 = document.createElement("span");
    minus5.classList.add("circle", "red");
    minus5.innerHTML = "-5";
    modify.append(minus5);

    tr.append(modify);

    //DELETE
    const del = document.createElement("td");
    del.innerHTML = "<i class='fa fa-trash'></i>";
    tr.append(del);

    table.append(tr);
  });
}

function sortPerScore(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i].score < arr[j].score) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr;
}

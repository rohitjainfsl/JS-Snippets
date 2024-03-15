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

const form = document.querySelector("form");
const table = document.querySelector("table");
const select = document.querySelector("form select");
const fnameInput = document.querySelector("#fname");
const lnameInput = document.querySelector("#lname");
const scoreInput = document.querySelector("#score");
let counter = 1;

countries.forEach((country) => {
  const option = document.createElement("option");
  option.innerHTML = country.name;
  // option.value = country.name;
  option.value = country.flag;
  select.append(option);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  //CHECK IF WE NEED TO CREATE TH

  if (table.children.length === 0) createTH();

  const tr = document.createElement("tr");

  //SERIAL NO
  const sno = document.createElement("td");
  sno.innerHTML = counter++;
  tr.append(sno);

  //NAME
  const name = document.createElement("td");
  name.innerHTML = fnameInput.value + " " + lnameInput.value;
  tr.append(name);

  //FLAG
  const flag = document.createElement("td");
  flag.innerHTML = getFlag(select.value);
  tr.append(flag);

  //COUNTRY
  const country = document.createElement("td");
  country.innerHTML = select.value;
  tr.append(country);

  //SCORE
  const score = document.createElement("td");
  score.innerHTML = scoreInput.value;
  tr.append(score);

  //PLUS 5
  const plus5 = document.createElement("td");
  plus5.classList.add("circle", "green");
  plus5.innerHTML = "+5";
  plus5.addEventListener("click", () => {
    plus5.previousElementSibling.innerHTML =
      Number(plus5.previousElementSibling.innerHTML) + 5;
  });
  tr.append(plus5);

  //MINUS 5
  const minus5 = document.createElement("td");
  minus5.classList.add("circle", "red");
  minus5.innerHTML = "-5";
  minus5.addEventListener("click", () => {
    minus5.previousElementSibling.previousElementSibling.innerHTML -= 5;
  });
  tr.append(minus5);

  //DELETE ICON
  const del = document.createElement("td");
  del.innerHTML = "<i class='fa fa-trash'></i>";
  del.addEventListener("click", () => {
    del.parentElement.remove();
  });
  tr.append(del);

  table.append(tr);

  //CLEAR OUT THE FORM

  fnameInput.value = "";
  lnameInput.value = "";
  scoreInput.value = "";
  select.value = "";
});

function getFlag(countryName) {
  // let output = "";
  // countries.forEach((country) => {
  //   if (country.name === countryName) output = country.flag;
  // });
  // return output;
  return (
    "<img src='https://flagcdn.com/w40/" +
    countryName.toLowerCase() +
    ".png' alt='Flag' />"
  );
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

// const total = document.querySelector("#total");
// const totalHeading = document.querySelector("#totalHeading span");
// const spentHeading = document.querySelector("#spentHeading span");
// const remainingHeading = document.querySelector("#remainingHeading span");
// const form = document.querySelector("form");
// const table = document.querySelector("table");

// total.addEventListener("blur", () => {
//   if (total.value > 0) {
//     totalHeading.innerHTML = total.value;
//     spentHeading.innerHTML = 0;
//     remainingHeading.innerHTML = total.value;
//   }
// });

// form.addEventListener("submit", (e) => {
//   e.preventDefault();

//   //put in table

//   // Step1: find the sno
//   const sno = table.children.length;

//   //Step2: create the row
//   const tr = document.createElement("tr");

//   for (let i = 0; i < 3; i++) {
//     const td = document.createElement("td");
//     if (i === 0) td.innerHTML = sno;
//     else td.innerHTML = form.elements[i - 1].value;

//     tr.append(td);
//   }
//   table.append(tr);

//   //Step3: subtract from remaining, add to spent

//   spentHeading.innerHTML =
//     Number(spentHeading.innerHTML) + Number(form.elements[1].value);

//   if (remainingHeading.innerHTML !== "")
//     remainingHeading.innerHTML =
//       Number(remainingHeading.innerHTML) - Number(form.elements[1].value);
// });

const setBudgetBtn = document.querySelector("#screen1 button");
const monthlyBudgetInput = document.querySelector("#screen1 input");
const screen1 = document.querySelector("#screen1");
const screen2 = document.querySelector("#screen2");
const infoTotal = document.querySelector("#totalHeading span");
const infoSpent = document.querySelector("#spentHeading span");
const infoRemaining = document.querySelector("#remainingHeading span");

const enterExpenseForm = document.querySelector("#enterExpense form");
const enterExpenseDetail = document.querySelector(
  "#enterExpense input:first-of-type"
);
const enterExpenseAmount = document.querySelector(
  "#enterExpense input:last-of-type"
);

const expenseTable = document.querySelector("#expenseTracker table");

// STEP 1
setBudgetBtn.addEventListener("click", () => {
  if (monthlyBudgetInput.value <= 0) {
    alert("Set proper budget");
  } else {
    screen1.classList.add("disabled");
    screen2.classList.remove("disabled");

    //PUT VALUE IN TOTAL
    infoTotal.innerHTML = monthlyBudgetInput.value;

    //PUT VALUES IN SPENT & REMAINING
    infoSpent.innerHTML = 0;
    infoRemaining.innerHTML = monthlyBudgetInput.value;
  }
});

// STEP 2
enterExpenseForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let expense = Number(enterExpenseAmount.value);
  let remaining = Number(infoRemaining.innerHTML);
  let spent = Number(infoSpent.innerHTML);

  if (expense <= 0) {
    alert("Enter proper expense amount");
  } else {
    if (expense > remaining) {
      alert("Expense cannot be greater than remaining amount");
      enterExpenseAmount.focus();
    } else {
      infoSpent.innerHTML = expense + spent;
      infoRemaining.innerHTML = remaining - expense;

      createTableEntry(enterExpenseDetail.value, expense);
    }
  }
});

function createTableEntry(info, amount) {
  const rowCount = expenseTable.querySelectorAll("tr").length;
  const tr = document.createElement("tr");
  for (let i = 0; i < 3; i++) {
    const td = document.createElement("td");
    switch (i) {
      case 0:
        td.innerHTML = rowCount;
        break;
      case 1:
        td.innerHTML = info;
        break;
      case 2:
        td.innerHTML = amount;
        break;
    }
    tr.append(td);
  }
  expenseTable.append(tr);
}

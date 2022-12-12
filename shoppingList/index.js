const addToList = document.querySelector("form")
addToList.addEventListener("submit", function (e) {
  e.preventDefault()
  const select = document.querySelector("select")
  const quantity = document.querySelector("#quantity")
  const name = document.querySelector("#name")

  const para = document.createElement("p")
  para.classList.add("item")

  const crossIcon = document.createElement("i")
  crossIcon.classList.add("fa-solid", "fa-circle-xmark", "delete")
  crossIcon.setAttribute("onclick", "deleteItem(this)")
  para.appendChild(crossIcon)

  const nameValue = document.createElement("span")
  nameValue.innerText = name.value
  para.appendChild(nameValue)

  const quantityValue = document.createElement("span")
  quantityValue.innerText = quantity.value
  para.appendChild(quantityValue)

  document.querySelector("#show ." + select.value + " .items").appendChild(para)

  addToList.reset()
})


function deleteItem(element) {
  element.parentElement.remove()
}
const slider = document.querySelector(".priceSlider input");
const priceDivs = document.querySelectorAll(".price");

// window.onload = () => {getValue(this)}
window.addEventListener("load", getValue);

// window.onchange = () => {getValue(this)}
slider.addEventListener("change", getValue);

function getValue(elem) {
  if (elem.target.value <= 20) {
    toggleDisabled(0);
  } else if (elem.target.value > 20 && elem.target.value <= 30) {
    toggleDisabled(1);
  } else {
    toggleDisabled(2);
  }
}

function toggleDisabled(divToEnable) {
  priceDivs.forEach((div, index) => {
    index === divToEnable
      ? div.classList.remove("disabled")
      : div.classList.add("disabled");
  });
}

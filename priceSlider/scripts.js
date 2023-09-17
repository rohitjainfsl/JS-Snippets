const slider = document.querySelector(".priceSlider input")
const priceDivs = document.querySelectorAll(".price")

window.addEventListener("load", getValue)
slider.addEventListener("change", getValue)

function getValue(elem){
    if(elem.target.value <= 20) {
        console.log(priceDivs[0])
        priceDivs[0].classList.remove("disabled")
        priceDivs[1].classList.add("disabled")
        priceDivs[2].classList.add("disabled")
    }
    else if(elem.target.value > 20 && elem.target.value <=30){
        priceDivs[0].classList.add("disabled")
        priceDivs[1].classList.remove("disabled")
        priceDivs[2].classList.add("disabled")
    }
    else{
        priceDivs[0].classList.add("disabled")
        priceDivs[1].classList.add("disabled")
        priceDivs[2].classList.remove("disabled")
    }
}
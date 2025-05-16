const playground = document.querySelector(".playground")

playground.onclick = (e) => {
    const circle = document.createElement("div")
    circle.classList.add("circle")
    // circle.setAttribute("class", "circle")
    circle.style.left = (e.clientX - 5) + "px"
    circle.style.top = (e.clientY - 5) + "px"
    document.body.append(circle)
}
const startGame = document.querySelector("#startGame")
const screen1 = document.querySelector(".screen1")
const screen2 = document.querySelector(".screen2")
const screen3 = document.querySelector(".screen3")
const avatars = document.querySelectorAll(".avatar img")
const timerDiv = document.querySelector(".timer p span")
const scoreDiv = document.querySelector(".score p span")
const imagesArea = document.querySelector(".imagesArea")
let showImages;


startGame.onclick = () => {
  screen1.classList.toggle("gayab")
  screen2.classList.toggle("gayab")
}

avatars.forEach((avatar) => {
  // console.log(avatar)
  avatar.onclick = (elem, index) => {
    // console.log(elem.target.src)
    screen2.classList.toggle("gayab")
    screen3.classList.toggle("gayab")

    startTimer()
    startShowingRandomImages(elem.target.src)
    showScore()
  }
})

function startTimer() {
  timerDiv.innerHTML = 0
  let x = setInterval(() => {
    if (Number(timerDiv.innerHTML) < 60)
      timerDiv.innerHTML = Number(timerDiv.innerHTML) + 1
    else{
      clearInterval(x)
      finish()
    }
  }, 1000)
}


function finish(){
  clearInterval(showImages)
  screen3.classList.toggle("blur")
}

function showScore() {
  scoreDiv.innerHTML = 0
}

function startShowingRandomImages(imageToShow) {
  const y = imagesArea.clientHeight
  const x = imagesArea.clientWidth
  // console.log(x, y)

  showImages = setInterval(() => {
    const img = document.createElement("img")
    img.src = imageToShow
    img.classList.add("icon")
    img.style.left = getRandomPosition(x, y)[0] + 'px'
    img.style.top = getRandomPosition(x, y)[1] + 'px'
    img.setAttribute('onclick', 'gayabIcon(this)')

    imagesArea.append(img)
  }, 600)


}

function getRandomPosition(x, y) {
  const XCoord = Math.random() * x
  const YCoord = Math.random() * y
  return [XCoord, YCoord]
}


function gayabIcon(element) {
  element.remove()
  scoreDiv.innerHTML = Number(scoreDiv.innerHTML) + 1
}
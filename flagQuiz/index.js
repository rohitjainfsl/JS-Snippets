import codesObject from './countryCodes.js'

const alreadyExist = []
let randomCountry = {}
let randomOptions = []

alreadyExist.length <= 10 ? initialize() : done();
  

function initialize() {
  console.log(codesObject)
  randomCountry = getARandomCountry(Object.keys(codesObject))

  //putting the right value in the array
  for (const [key, value] of Object.entries(randomCountry)) {
    randomOptions.push(`${value}`);
  }
  console.log(randomOptions)

  //putting

  const flagSrc = `https://flagcdn.com/${Object.keys(randomCountry)}.svg`

  document.querySelector(".question img").src = flagSrc
  document.querySelector(".count").innerHTML = alreadyExist.length
}


function getARandomCountry(arr) {
  randomCountry = {}
  const random = Math.floor(Math.random() * arr.length)
  if (alreadyExist.includes(random)) return getARandomCountry(arr)
  else {
    alreadyExist.push(random)
    randomCountry[arr[random]] = codesObject[arr[random]]
    return randomCountry
  }
}


function done(){
  console.log("DONE")
}
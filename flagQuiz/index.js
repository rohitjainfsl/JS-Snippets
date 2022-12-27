import codesObject from './countryCodes.js'
import displayOptions from './displayOptions.js'

const alreadyExist = [], alreadyExistOption = []
let randomCountry = {}
let randomOptions = []

alreadyExist.length <= 10 ? initialize() : done();


function initialize() {

  //flushing flag & options
  randomCountry = {}
  randomOptions = []

  console.log(codesObject)

  //getting random flag
  const objectKeys = Object.keys(codesObject)
  const randomValue = getRandomValue(Object.keys(codesObject).length, alreadyExist)
  randomCountry[objectKeys[randomValue]] = codesObject[objectKeys[randomValue]]

  // randomCountry = getARandomCountry(Object.keys(codesObject))

  //putting the right value in the options array
  for (const [key, value] of Object.entries(randomCountry)) {
    randomOptions.push(`${value}`);
  }
  
  //putting rest three values in the options array
  for (let i = 0; i < 3; i++){
    const randomOption = getRandomValue(Object.keys(codesObject).length, alreadyExistOption)
    randomOptions.push(codesObject[objectKeys[randomOption]])
  }

  //randomizing options array
  randomOptions = randomizeAnArray(randomOptions)

  // console.log(randomOptions)


  //displaying flag
  const flagSrc = `https://flagcdn.com/${Object.keys(randomCountry)}.svg`
  document.querySelector(".question img").src = flagSrc

  //displaying options
  displayOptions(randomOptions)
  

  //displaying question count
  document.querySelector(".count").innerHTML = alreadyExist.length
}


// function getARandomCountry(arr) {
//   randomCountry = {}
//   const random = Math.floor(Math.random() * arr.length)
//   if (alreadyExist.includes(random)) return getARandomCountry(arr)
//   else {
//     alreadyExist.push(random)
//     randomCountry[arr[random]] = codesObject[arr[random]]
//     return randomCountry
//   }
// }

function getRandomValue(limit, arrayToCheckIn) {
  const random = Math.floor(Math.random() * limit)
  if (arrayToCheckIn.includes(random))
    return getRandomValue(limit, arrayToCheckIn)
  else {
    arrayToCheckIn.push(random)
    return random
  }
}


function randomizeAnArray(inputArray){
  const temp = [], temp2 = []
  for(let i=0;i<inputArray.length;i++){
    getRandomValue(inputArray.length, temp)
  }
  console.log(temp)
  
  for(let i=0;i<temp.length;i++){
    temp2[i] = randomOptions[temp[i]]
  }
  console.log(temp2)
  return temp2;
}


function done() {
  console.log("DONE")
}
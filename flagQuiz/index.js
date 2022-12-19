import codesObject from './countryCodes.js'

console.log(codesObject)

getARandomCountry(Object.keys(codesObject))

const alreadyExist = []

function getARandomCountry(arr){
  const random = Math.floor(Math.random() * arr.length)
  
}
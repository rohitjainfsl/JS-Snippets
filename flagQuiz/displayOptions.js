function displayOptions(randomOptions){
  const optionLi = document.querySelectorAll(".options li")
  for(let i=0;i<randomOptions.length;i++){
    optionLi[i].innerHTML = randomOptions[i]
  }
}
export default displayOptions
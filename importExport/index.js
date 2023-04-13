import input, {name, sum} from './assets/input.js'

input.onblur = () => {
    document.querySelector("p").innerHTML = input.value
}
console.log(name)
console.log(sum(10,20))
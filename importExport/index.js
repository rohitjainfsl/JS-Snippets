import input, {name, sum} from './omi/input.js'

input.onblur = () => {
    document.querySelector("p").innerHTML = input.value
}
console.log(name)
console.log(sum(10,20))
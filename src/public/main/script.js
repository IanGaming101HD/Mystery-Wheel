const textBox = document.getElementById('text-box');
const test = document.getElementById('test')
let colours = ['#3369e8', '#d50f25', '#eeb211', '#009925']
let wheel = []

class newSegment {
    static previousColour = '#3369e8'
    constructor(name) {
        this.name = name
        this.colour = null
        this.create()
    }

    toString() {
        return `${this.name} ${this.colour}`;
    }

    create() {
        if (!newSegment.previousColour) {
            this.colour = colours[0]
        } else {
            this.colour = colours[colours.indexOf(newSegment.previousColour) + 1]
        }

        wheel.push(this.name)
    }
}

function convertTextToArray(text) {
    let array = text.split('\n')
    return array.filter((element) => element)
}

function getInput(event) {
    let text;
    if (!event) {
        text = textBox.value
    } else {
        text = event.target.value
    }
    let array = convertTextToArray(text)
    console.log(array)
}

let idk = new newSegment('test')
console.log(idk)

textBox.value = ['blue', 'red', 'yellow', 'green'].join('\n')
getInput()
textBox.addEventListener('input', getInput, false)
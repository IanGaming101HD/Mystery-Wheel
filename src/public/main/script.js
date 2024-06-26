const textBox = document.getElementById('text-box');
const test = document.getElementById('test')
let colours = {
    blue: '#3369e8',
    red: '#d50f25',
    yellow: '#eeb211',
    green: '#009925'
}
// let colours = ['#3369e8', '#d50f25', '#eeb211', '#009925']

let wheel = []

class newSector {
    static previousColour = null
    constructor(name) {
        this.name = name
        this.colour = null
        this.create()
    }

    toString() {
        return `${this.name} ${this.colour}`;
    }

    create() {
        let sectorContainer = document.getElementById('sector-container')
        let sector = document.createElement('div')

        if (!newSector.previousColour || wheel.length === 0) {
            // console.log('hi')
            this.colour = Object.values(colours)[0]
        } else {
            // console.log('hi2')
            this.colour = Object.values(colours)[Object.values(colours).indexOf(newSector.previousColour) + 1]
        }
        newSector.previousColour = this.colour
        if (newSector.previousColour === Object.values(colours)[Object.values(colours).length - 1]) {
            newSector.previousColour = null
        }
        
        sector.innerText = this.name
        sectorContainer.appendChild(sector)
        sector.classList.add('sector')
        sector.classList.add(`${getKeyByValue(colours, this.colour)}-sector`)

        wheel.push(this.name)
    }
}

function convertTextToArray(text) {
    let array = text.split('\n')
    return array.filter((element) => element)
}

function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
}

function resetWheel() {
    let sectorContainer = document.getElementById('sector-container')
    while (sectorContainer.firstChild) {
        sectorContainer.removeChild(sectorContainer.lastChild);
    }
    wheel = []
}

function getInput(event) {
    resetWheel()

    let text;
    if (!event) {
        text = textBox.value
    } else {
        text = event.target.value
    }
    let array = convertTextToArray(text)
    array.forEach((element) => {
        let sector = new newSector(element)
        console.log(sector)
    })
}

function defaultInput() {
    textBox.value = ['blue', 'red', 'yellow', 'green'].join('\n')
    getInput()
}

defaultInput()
textBox.addEventListener('input', getInput, false)


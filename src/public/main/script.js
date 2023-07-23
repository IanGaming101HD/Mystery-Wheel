const textBox = document.getElementById('text-box');
const test = document.getElementById('test')
let colours = ['#3369e8', '#d50f25', '#eeb211', '#009925']

let wheel = []

class newSector {
    static previousColour = null
    static newAngle = 0
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
            this.colour = colours[0]
        } else {
            // console.log('hi2')
            this.colour = colours[colours.indexOf(newSector.previousColour) + 1]
        }
        newSector.previousColour = this.colour
        if (newSector.previousColour === colours[colours.length - 1]) {
            newSector.previousColour = null
        }
        
        sector.innerText = this.name
        sectorContainer.appendChild(sector)
        sector.classList.add('sector')
        sector.style['backgroundColor'] = this.colour
        sector.style['background'] = `conic-gradient(${this.colour} ${100 / colours.length}%, transparent 25%)`
        sector.style['transform'] = `rotate(${newSector.newAngle}deg)`

        newSector.newAngle += 360 / colours.length

        wheel.push(this.name)
    }
}

function convertTextToArray(text) {
    let array = text.split('\n')
    return array.filter((element) => element)
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


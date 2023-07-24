const textBox = document.getElementById('text-box');
const test = document.getElementById('test')
const spinButton = document.getElementById('spin-button')
let currentlySpinning = false
let colours = ['#3369e8', '#d50f25', '#eeb211', '#009925']
let wheel = []

class Sector {
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
        let sectorLabel = document.createElement('label')

        if (!Sector.previousColour || wheel.length === 0) {
            this.colour = colours[0]
        } else {
            this.colour = colours[colours.indexOf(Sector.previousColour) + 1]
        }
        Sector.previousColour = this.colour
        if (Sector.previousColour === colours[colours.length - 1]) {
            Sector.previousColour = null
        }

        sectorLabel.innerText = this.name
        sectorLabel.classList.add('sector-label')

        sectorContainer.appendChild(sector)
        sector.appendChild(sectorLabel)
        sector.classList.add('sector')
        // sector.style['backgroundColor'] = this.colour
        sector.style['background'] = `conic-gradient(${this.colour} ${100 / colours.length}%, transparent 25%)`
        sector.style['transform'] = `rotate(${Sector.newAngle}deg)`

        Sector.newAngle += 360 / colours.length

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
    array.forEach((element) => new Sector(element))
}

function defaultInput() {
    textBox.value = ['blue', 'red', 'yellow', 'green'].join('\n')
    getInput()
}

function getRotation(element) {
    let computedStyle = window.getComputedStyle(element);
    let transformValue = computedStyle.getPropertyValue('transform');

    let amount = 0
    if (transformValue && transformValue !== 'none') {
        let matches = transformValue.match(/rotate\((.*)deg\)/)
        if (matches && matches.length === 2) {
            amount = parseFloat(matches[1])
        }
    }
    return amount;
}

function spin(event) {
    if (currentlySpinning) return
    console.log('hi')
    currentlySpinning = true

    let sectorContainer = document.getElementById('sector-container')
    let miliseconds = 10
    let milisecondsTotal = 0
    let milisecondsLimit = 5000
    let rotationAmount = 10
    let looped = 1
    // sector.style['transform'] = `rotate(${Sector.newAngle}deg)`

    let loop = setInterval(() => {
        looped += 1
        currentlySpinning = false
        milisecondsTotal += miliseconds

        if (milisecondsTotal >= milisecondsLimit) {
            clearInterval(loop)
        }

        Array.from(sectorContainer.children).forEach((element) => {
            console.log(getRotation(element))
            element.style['transform'] = `rotate(${getRotation(element) + (rotationAmount * looped)}deg)`
        })
    }, miliseconds)
    currentlySpinning = false
}

defaultInput()
textBox.addEventListener('input', getInput, false)
spinButton.addEventListener('click', spin, false)
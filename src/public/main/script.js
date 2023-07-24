const textBox = document.getElementById('text-box');
const test = document.getElementById('test')
const spinButton = document.getElementById('spin-button')
let currentlySpinning = false
let colours = ['#3369e8', '#d50f25', '#eeb211', '#009925']
let wheel = []

class Sector {
    static previousColour = null
    static newAngle = 0
    static default = true
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
            Sector.newAngle = 0
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
        sector.style['background-color'] = this.colour
        sector.style['background'] = `conic-gradient(${this.colour} ${100 / (Sector.default ? colours.length : wheel.length)}%, transparent 25%)`
        sector.style['transform'] = `rotate(${Sector.newAngle}deg)`
        console.log(wheel)

        wheel.push(this.name)
        Sector.newAngle += 360 / (Sector.default ? colours.length : wheel.length)

        if (Sector.default) {
            Sector.default = false
        }
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
    let computedStyle = element.style
    let transformValue = computedStyle.getPropertyValue('transform')

    let amount = 0
    if (transformValue && transformValue !== 'none') {
        let matches = transformValue.match(/rotate\((.*)deg\)/)
        if (matches && matches.length === 2) {
            amount = parseFloat(matches[1])
        }
    }
    return amount;
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  

function spin(event) {
    if (currentlySpinning) return
    currentlySpinning = true

    let sectorContainer = document.getElementById('sector-container')
    let miliseconds = 10
    let milisecondsTotal = 0
    let milisecondsLimit = getRandomNumber(0, 5000)
    let rotationAmount = 10
    let loops = 1

    let loop = setInterval(() => {
        loops += 1
        milisecondsTotal += miliseconds

        if (milisecondsTotal >= milisecondsLimit) {
            let pointer = document.getElementById('pointer')
            let pointerRect = pointer.getBoundingClientRect();
            let pointerX = pointerRect.left + pointerRect.width / 2;
            let pointerY = pointerRect.top - 100;
            let touchedSector = document.elementFromPoint(pointerX, pointerY);
            let touchedSectorName = Array.from(touchedSector.children)[0].innerText
            let touchedSectorColour = getComputedStyle(touchedSector)['background-color']
            console.log(touchedSectorName, touchedSectorColour)
            
            currentlySpinning = false
            clearInterval(loop)
            popup(touchedSectorName, touchedSectorColour)
        }

        Array.from(sectorContainer.children).forEach((element) => {
            element.style['transform'] = `rotate(${getRotation(element) + (rotationAmount * loops)}deg)`
        })
    }, miliseconds)
}

function closeElement(element) {
    element.hidden = true
}

function popup(winner, colour) {
    document.body.innerHTML = document.body.innerHTML.replace('$winner', winner)

    let popupContainer = document.getElementById('popup-container')
    let headerContainer = document.getElementById('header-container')
    let closeButton = document.getElementById('close-button')
    let closeButton2 = document.getElementById('close-button2')
    let removeButton = document.getElementById('remove-button')

    popupContainer.hidden = false
    headerContainer.style['background-color'] = colour

    closeButton.addEventListener('click', () => {
        closeElement(popupContainer)
    }, false)
    closeButton2.addEventListener('click', () => {
        closeElement(popupContainer)
    }, false)
    removeButton.addEventListener('click', () => {
        wheel = wheel.filter((element) => element !== winner)
        closeElement(popupContainer)
    }, false)
}

// defaultInput()
textBox.addEventListener('input', getInput, false)
spinButton.addEventListener('click', spin, false)
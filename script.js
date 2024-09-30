const DEFAULT_COLOR = '#333333';
const DEFAULT_MODE = 'color';
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

function setCurrentColor(newColor) {
    currentColor = newColor;
}

function setCurrentMode(newMode) {
    activateButton(newMode);
    currentMode = newMode;
}

function setCurrentSize(newSize) {
    currentSize = newSize;
}

const colorPicker = document.querySelector('#color-picker');
const colorButton = document.querySelector('#color-button');
const rainbowColorButton = document.querySelector('#rainbow-color-button');
const eraserButton = document.querySelector('#eraser-button');
const clearButton = document.querySelector('#clear-button');
const sizeValue = document.querySelector('#size-value');
const sizeSlider = document.querySelector('#size-slider');
const grid = document.querySelector('#grid');

colorPicker.oninput = (event) => {
    setCurrentColor(event.target.value);
}
colorButton.onclick = () => {
    setCurrentMode('color');
}
rainbowColorButton.onclick = () => {
    setCurrentMode('rainbow');
}
eraserButton.onclick = () => {
    setCurrentMode('eraser');
}
clearButton.onclick = () => {
    reloadGrid();
}
sizeSlider.onmousemove = (event) => {
    updateSizeValue(event.target.value);
}
sizeSlider.onchange = (event) => {
    changeSize(event.target.value);
}

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function changeSize(value) {
    setCurrentSize(value);
    updateSizeValue(value);
    reloadGrid();
}

function updateSizeValue(value) {
    sizeValue.textContent = `${value} x ${value}`; // innerHTML
}

function reloadGrid() {
    clearGrid();
    setupGrid(currentSize);
}

function clearGrid() {
    grid.innerHTML = '';
}

function setupGrid(size) {
    grid.style['grid-template-columns'] = `repeat(${size}, 1fr)`;
    grid.style['grid-template-rows'] = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('mouseover', changeColor);
        cell.addEventListener('mousedown', changeColor);
        grid.appendChild(cell);
    }
}

function changeColor(event) {
    if (event.type === 'mouseover' && !mouseDown) return
    if (currentMode === 'rainbow') {
        const random_R = Math.floor(Math.random() * 256);
        const random_G = Math.floor(Math.random() * 256);
        const random_B = Math.floor(Math.random() * 256);
        event.target.style['background-color'] = `rgb(${random_R}, ${random_G}, ${random_B})`;
    }
    else if (currentMode === 'color') {
        event.target.style['background-color'] = currentColor;
    }
    else if (currentMode === 'eraser') {
        event.target.style['background-color'] = '#fefefe';
    }
}

function activateButton(newMode) {
    if (currentMode === 'rainbow') {
        rainbowColorButton.classList.remove('active');
    }
    else if (currentMode === 'color') {
        colorButton.classList.remove('active');
    }
    else if (currentMode === 'eraser') {
        eraserButton.classList.remove('active');
    }


    if (newMode === 'rainbow') {
        rainbowColorButton.classList.add('active');
    }
    else if (newMode === 'color') {
        colorButton.classList.add('active');
    }
    else if (newMode === 'eraser') {
        eraserButton.classList.add('active');
    }
}

window.onload = () => {
    setupGrid(DEFAULT_SIZE);
    activateButton(DEFAULT_MODE);
}
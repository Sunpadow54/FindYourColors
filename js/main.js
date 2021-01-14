/* -------------- ClASS COLORS */

// --- the 3 Mains Colors are created using this Class 
class Couleur {
    constructor(name) {
        this.name = name;
        this.newRGBA();
        this.keep = false;
        this.displayColor();
        this.displayRgba();
    }
    randomInt() {
        return Math.floor(Math.random(255) * (Math.floor(255) + 1));
    }
    newRGBA() {
        if (!this.keep) {
            this.rgba = {
                r: this.randomInt(), 
                g: this.randomInt(), 
                b: this.randomInt(), 
                a:Math.random().toFixed(2)
            };
            this.displayColor();
            this.displayRgba();
        }
    }
    isKeeped() {
		this.keep = document.querySelector('.' + this.name).classList.contains('fixed') ? true : false;
    }
    displayColor() {
        document.querySelectorAll('.' + this.name).forEach(div => {
            div.style.backgroundColor = colorCodeToString(this.rgba);
        })
    }
    displayRgba() {
        document.querySelectorAll('.' + this.name + ' .code_color').forEach(textRgba => {
            textRgba.value =  this.rgba.r + ',' + this.rgba.g + ',' + this.rgba.b + ',' + this.rgba.a ;
        })
    }
}


/* -------------- SETTINGS  */

// Instances
const colorOne = new Couleur('one');
const colorTwo = new Couleur('two');
const colorThree = new Couleur('three');

// Variables
const colors = [colorOne, colorTwo, colorThree];
let darkMode = false;
let toogleMode = () => darkMode = !darkMode;
let rotationAngle = 0;

// Selectors
const switchColorsButton = document.getElementById('random_color');
const inputs = document.querySelectorAll('.code_color');
const modeButton = document.querySelector('#toogle_light input');
const body = document.getElementsByTagName('body')[0];

// displays
findRgb();
resizeInput();
modeButton.checked = false;



/* -------------- LISTENERS */

switchColorsButton.addEventListener('click', function() {
    colors.forEach(color => {
        color.newRGBA();
    })
    findRgb();
    resizeInput();
});

switchColorsButton.addEventListener('mouseup', function() {
    rotationAngle -= 180;
    document.querySelector('#random_color i').style.transform = 'rotateZ(' + rotationAngle +'deg)';
});

document.querySelectorAll('.fix_color').forEach(color => { 
    color.addEventListener('click', function() {
		this.parentNode.classList.toggle('fixed');
		// fix the instance of Couleur
		colors.forEach(color => { 
			color.isKeeped();
		} );
		this.textContent = this.textContent === 'Keep Color' ? 'Drop Color' : 'Keep Color';
	}) 
})

modeButton.addEventListener('change', function() {
    toogleMode();
    findRgb();
    changeBodyClass();
});

inputs.forEach(inputCode => { 
    inputCode.addEventListener('keyup', changeValueRgba) 
});

document.querySelectorAll('.copy').forEach(item => { item.addEventListener('click', copyToClipboard) })


// --------------- FUNCTIONS :


// Toogle body class (light / dark)
function changeBodyClass() {
    body.classList.toggle('light');
    body.classList.toggle('dark');
}

// Calculate a rgb (need background color & color on top of it)
function calcRgb(bgColor, color) {
    let resultR = Math.round(((1 - color.a) * bgColor.r) + (color.a * color.r));
    let resultG = Math.round(((1 - color.a) * bgColor.g) + (color.a * color.g));
    let resultB = Math.round(((1 - color.a) * bgColor.b) + (color.a * color.b));
    let rgb = {
        r : resultR,
        g : resultG,
        b : resultB
    }
    return rgb;
}

// Calculate and display RGB of the colors
function findRgb(){
    let bgColor =  darkMode ? { r : 0, g : 0, b : 0, a : 1 } : { r : 255, g : 255, b : 255, a : 1 }; 
    displayRgb(1, calcRgb(bgColor, colorOne.rgba));
    displayRgb(2, calcRgb(colorOne.rgba, colorTwo.rgba));
    displayRgb(3, calcRgb(bgColor, colorTwo.rgba));
    displayRgb(4, calcRgb(colorTwo.rgba, colorThree.rgba));
    displayRgb(5, calcRgb(bgColor, colorThree.rgba));
}

// Display txt RGB of colors
function displayRgb(indexOftext, rgb){
    document.querySelector('#colors_overlay > span:nth-of-type(' + indexOftext +') input').value = colorCodeToString(rgb);
}

// Convert array to string
function colorCodeToString(code) {
    let rgbaString = 'rgba(' + code.r + ',' + code.g + ',' + code.b + ',' + code.a + ')';
    let rgbString = 'rgb(' + code.r + ',' + code.g + ',' + code.b + ')';
    return code.a ? rgbaString : rgbString;
}

// Copy to Clipboad the color code
function copyToClipboard() {
    let parentDiv = this.parentNode;
    parentDiv.classList.add('tocopy');
    let inputToCopy = document.querySelector('.tocopy input');
    // rgba ?
    if (parentDiv.classList.contains('rgba')) {
        // create a temporary field with value = rgba we want to copy
        const temporayInput = document.createElement('input');
        temporayInput.value = 'rgba(' + inputToCopy.value + ')';
        temporayInput.setAttribute('readonly', '');
        temporayInput.style.position = 'absolute';
        temporayInput.style.top = '-9999px';
        document.body.appendChild(temporayInput);
        // copy the field
        temporayInput.select();
        document.execCommand('copy');
        // and remove it
        document.body.removeChild(temporayInput);
    }
    // rgb ?
    if (parentDiv.classList.contains('rgb')) {
        inputToCopy.select();
        document.execCommand('copy');
    }
    this.parentNode.classList.remove('tocopy');
}

//  Change RGBA from input
function changeValueRgba(event){
    let thisColorName = this.parentNode.parentNode.parentNode.classList[1];
    let thisColor = colors[colors.findIndex(color => color.name === thisColorName)];
    let rgbaInputs = event.target.value.split(',');
    let rgbInputs = [rgbaInputs[0], rgbaInputs[1], rgbaInputs[2]];
    let opacity = rgbaInputs[rgbaInputs.length - 1];

	if (rgbaInputs.length != 4){
		alert('Rgba must contain 4 numbers');
	}
	rgbaInputs.forEach( number => {
		if (isNaN(number)) { 
			alert('enter a valid rgba value');
		}
	})
	rgbInputs.forEach( number => {
		if (number > 255){
			alert('number must be between 0 and 255');
		} else {
			thisColor.rgba.r = rgbInputs[0];
			thisColor.rgba.g = rgbInputs[1];
			thisColor.rgba.b = rgbInputs[2];
		}
	})
	if (opacity > 1) {
		alert('enter a number between 0.01 and 1');
	} else {
		thisColor.rgba.a = opacity;
	}

    thisColor.displayColor();
    thisColor.displayRgba();
    findRgb();
    resizeInput();
}

// change width of inputs
function resizeInput(){
    inputs.forEach( input => {
        input.style.width = input.value.length - 2 + 'ch';
    })
}
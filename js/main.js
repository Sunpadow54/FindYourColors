// ---- Class Color ----
// --- the 3 Mains Colors are created using this Class 

/*  Constructor contain : 
            - name  : string
            - rgba: [r : int, g: int, b: int, a: int]
            - keep : boolean
            - displayColor : method
            - displayRgba : method
    Methods  :
        - randomInt() : return Int
        - isKeeped() : return boolean (classContain 'fixed' ?)
        - newRGBA() : return Array of random Int, if !isKeep() : [r, g , b, a]
        - displayColor() : show backgroundColor of the main(s) Color(s)*
        - displayRgba() : show RGBA code*
        (*this use colorCodeToString() function)
*/

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
            /* textRgba.value = colorCodeToString(this.rgba); */
            textRgba.value = '(' + this.rgba.r + ',' + this.rgba.g + ',' + this.rgba.b + ',' + this.rgba.a + ')';
        })
    }
}


const colorOne = new Couleur('one');
const colorTwo = new Couleur('two');
const colorThree = new Couleur('three');
const colors = [colorOne, colorTwo, colorThree];
const inputs = document.querySelectorAll('.rgba > input.code_color');
const popupCopy = document.querySelector('.copy');
let darkMode = false;


findRgb();
inputs.forEach( input => {
    resizeInput(input);
})

/* -------------- LISTENERS */


document.getElementById('random_color').addEventListener('click', changeColor); // Button Switch Color
document.querySelectorAll('.fix_color').forEach(color => { color.addEventListener('click', keepColor); }) // Button Keep / Drop
document.querySelector('#toogle_light > input').addEventListener('change', changeMode); // Button Dark / Light mode
/* document.querySelectorAll('.code_color').forEach(codeColor => { codeColor.addEventListener('click', copy); }) // copy to clipboard the rgba or rgb text selected
 */
inputs.forEach(inputCode => { inputCode.addEventListener('keyup', changeValue) }); // input of code color



// --------------- FUNCTIONS :


// Random color
function changeColor() {
    colors.forEach(color => {
        color.newRGBA();
    })
    findRgb();
}


// Dark / Light Modes changes
let toogleDarkLight = () => darkMode = !darkMode;

function changeBodyClass() {
    let body = document.getElementsByTagName('body')[0];
    if(body.classList.contains('light')){
        body.classList.replace('light', 'dark');
    } else {
        body.classList.replace('dark', 'light');
    }
}

function changeMode() {
    toogleDarkLight();
    findRgb();
    changeBodyClass();
}


// Keep / Drop color
function keepColor() {
    // Add 'fixed' on the Color
    this.parentNode.classList.toggle('fixed');
    // fix the instance of Couleur
    colors.forEach(color => { 
        color.isKeeped();
    } );
    // toogle disabled attribute on the input
    let colorName = this.parentNode.classList[1];
    document.querySelector('.' + colorName + ' .rgba > input.code_color').toggleAttribute('disabled');
    // Change text of button Keep
    this.textContent = this.textContent === 'Keep Color' ? 'Drop Color' : 'Keep Color';
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
    showRgb(1, calcRgb(bgColor, colorOne.rgba));
    showRgb(2, calcRgb(colorOne.rgba, colorTwo.rgba));
    showRgb(3, calcRgb(bgColor, colorTwo.rgba));
    showRgb(4, calcRgb(colorTwo.rgba, colorThree.rgba));
    showRgb(5, calcRgb(bgColor, colorThree.rgba));
}


// Display txt RGB of colors
function showRgb(indexOftext, rgb){
    document.querySelector('#colors_overlay > input:nth-of-type(' + indexOftext +'').value = colorCodeToString(rgb);
}

// Convert array to string
function colorCodeToString(code) {
    let rgbaString = 'rgba(' + code.r + ',' + code.g + ',' + code.b + ',' + code.a + ')';
    let rgbString = 'rgb(' + code.r + ',' + code.g + ',' + code.b + ')';
    return code.a ? rgbaString : rgbString;
}


// Copy to Clipboad the color code
function copy(){
    this.select();
    document.execCommand('copy');
}


//  Change RGBA from input
function changeValue(event){
    let thisColorName = this.parentNode.parentNode.classList[1];
    let thisColor = colors[colors.findIndex(color => color.name === thisColorName)];
    let rgbaInputs = event.target.value.slice(1, -1).split(',');
    let rgbInputs = [rgbaInputs[0], rgbaInputs[1], rgbaInputs[2]];
    let opacity = rgbaInputs[rgbaInputs.length - 1];

    if (!thisColor.keep) {
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
    }

    thisColor.displayColor();
    thisColor.displayRgba();
    findRgb();
    resizeInput(this);
}

function resizeInput(input){
    input.style.width = input.value.length - 2 + 'ch';
}
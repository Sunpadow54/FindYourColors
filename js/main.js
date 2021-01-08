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
    constructor(name){
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
        if(!this.keep){
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
    displayRgba(){
        document.querySelectorAll('.' + this.name + ' > .code_color').forEach(textRgba => {
            textRgba.value = colorCodeToString(this.rgba);
        })
    }
}

const colorOne = new Couleur('one');
const colorTwo = new Couleur('two');
const colorThree = new Couleur('three');
const colors = [colorOne, colorTwo, colorThree];

let darkMode = false;
findRgb();



/* -------------- LISTENERS */


document.getElementById('random_color').addEventListener('click', changeColor); // Button Switch Color
document.querySelectorAll('.fix_color').forEach(color => { color.addEventListener('click', keepColor); }) // Button Keep / Drop
document.querySelector('#toogle_light > input').addEventListener('change', changeMode); // Button Dark / Light mode



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
    this.parentNode.classList.toggle('fixed');
    colors.forEach(color => { color.isKeeped(); } )
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
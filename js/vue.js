// --------------- Variables

let darkMode = false;
let bgColor;
//creation popup Copy
let popup = document.createElement('div');
popup.classList.add('copy');
document.getElementsByTagName('main')[0].parentNode.insertBefore(popup,this.nextSibling);


// --------------- Define Colors

// Random number > x
let randomInt = (max) => {
    return Math.floor(Math.random() * (Math.floor(max) + 1));
}


// Color Contructor
class Couleur {
    constructor(name) {
        this.name = name;
        this.keep = false;
        this.rgba = {
            r:randomInt(255), 
            g:randomInt(255), 
            b:randomInt(255), 
            a:Math.random().toFixed(2)
        };
        this.displayColor();
        this.displayRgba();

    }

    displayColor() {
        document.querySelectorAll('.' + this.name).forEach(div => {
            div.style.backgroundColor = rgbaString(this.rgba);
        })
    }

    displayRgba(){
        document.querySelectorAll('.' + this.name + ' > .code_color').forEach(textRgba => {
            textRgba.value = rgbaString(this.rgba);
        })
    }

    changeColor() {
        if(!this.keep) {
            this.rgba = {
                r:randomInt(255), 
                g:randomInt(255), 
                b:randomInt(255), 
                a:Math.random().toFixed(2)
            };
            this.displayColor();
            this.displayRgba();
        }
    }

    isKeeped() {
        if(document.querySelector('.' + this.name).classList.contains('fixed')) {
            this.keep = true;
        } else {
            this.keep = false;
        }
    }
}


// Create 3 mains Colors
let colorOne = new Couleur('one');
let colorTwo = new Couleur('two');
let colorThree = new Couleur('three');


// Array of the main colors
let couleurs = [];
couleurs.push(colorOne,colorTwo,colorThree);

//show rgb & colors of the circle
findCurrentRgb();
circleColor();




// --------------- FUNCTIONS :

// Show colors Circle
function circleColor(){
    document.getElementById('all_color_circle').style.background =   'linear-gradient(217deg,' 
                                + rgbaString(colorOne.rgba) + 
                                ', transparent 70.71%), linear-gradient(127deg,' 
                                + rgbaString(colorTwo.rgba) + 
                                ', transparent 70.71%), linear-gradient(336deg,' 
                                + rgbaString(colorThree.rgba) + ', transparent 70.71%)';
}



// Dark / Light Modes changes
let toogleDarkLight = () => darkMode = !darkMode;

function changeMode() {
    toogleDarkLight();
    findCurrentRgb();
    //modify button dark/lightMode content
    this.textContent = darkMode ? 'Light mode' : 'Dark mode';
    /* modify css */
    // colors
    document.getElementsByTagName('body')[0].style.backgroundColor = darkMode ? 'black' : 'white';
    document.getElementsByTagName('h1')[0].style.color = darkMode ? 'white' : 'black';
    document.querySelectorAll('#colors_overlay .code_color').forEach(codeText => {
        codeText.style.color = darkMode ? 'white' : 'black';
    })
    //icon button toogle
    document.querySelector('.toogle_icon').style.background = darkMode ? 'center / contain url(../img/light-mode.svg) no-repeat' : 'center / contain url(../img/dark-mode.svg) no-repeat';
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


// Seek R G B of the background color (white or black)
function backgroundColor() {
    bgColor = darkMode ? { r : 255, g : 255, b : 255, a : 1 } : { r : 0, g : 0, b : 0, a : 1 };
} 


// convert R G B A values to string => rgba(r, g, b, a)
function rgbaString(rgba) {
    return 'rgba(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')';
}


// Convert R G B values to string => rgb(r, g, b)
function rgbString(rgb) {
    return 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';
}


// Show txt RGB of colors
function showRgb(indexOftext, rgb){
    document.querySelector('#colors_overlay > input:nth-of-type(' + indexOftext +'').value = rgbString(rgb);
}


// Calculate and display RGB of the colors
function findCurrentRgb(){
    backgroundColor();
    showRgb(1, calcRgb(bgColor, colorOne.rgba));
    showRgb(2, calcRgb(colorOne.rgba, colorTwo.rgba));
    showRgb(3, calcRgb(bgColor, colorTwo.rgba));
    showRgb(4, calcRgb(colorTwo.rgba, colorThree.rgba));
    showRgb(5, calcRgb(bgColor, colorThree.rgba));
}


// copy colors codes
function copy(text){
    text.select();
    document.execCommand('copy');
}

const copyMouseEnter = () => {
    popup.style.display = 'block';
    popup.style.background = 'center / contain no-repeat url(../img/icon-copy.svg)';
}

const copyMouseLeave = () =>  popup.style.display = 'none';

function copyMouseClick(){
    copy(this);
    popup.style.background = 'center / contain no-repeat url(../img/icon-copied.svg)';
     setTimeout(function() {
        popup.style.display = 'none';
      }, 500);
}



// --------------- AddEventListener of Buttons

// Button Switch Colors
document.getElementById('random_color').addEventListener('click', function(){
    couleurs.forEach(couleur => {
        couleur.changeColor();
        circleColor();
        findCurrentRgb();
    })
});


// Button Keep / Drop color
document.querySelectorAll('.fix_color').forEach(item => {
    item.addEventListener('click', function(){
        //change button txt & padlock (span before and span after positions)
        this.textContent = this.textContent === 'Keep Color' ? 'Drop Color' : 'Keep Color';
        this.previousElementSibling.style.transform = this.textContent === 'Keep Color' ? 'translateX(0px)' : 'translateX(10px)';
        this.nextElementSibling.style.transform = this.textContent === 'Keep Color' ? 'translateX(0px)' : 'translateX(-10px)';
        
        // add class fixed on parent (main color)
        let divfixed = this.parentNode;
        divfixed.classList.toggle('fixed');

        // change bolean keep on the Color
        couleurs.forEach(couleur => {
            couleur.isKeeped();
        })
    });
})



// Button Dark / White mode
document.getElementById('toogle_b_w').addEventListener('click', changeMode);

// Events on textarea RGBA
document.querySelectorAll('.code_color').forEach(textRgba => { 
    textRgba.addEventListener('click', copyMouseClick);
    textRgba.addEventListener('mouseenter', copyMouseEnter);
    textRgba.addEventListener('mouseleave', copyMouseLeave);

})

document.addEventListener('mousemove', function(event){
            let x = event.clientX + 50;
            let y = event.clientY - 70;
            popup.style.left = x + 'px';
            popup.style.top = y + 'px';
})
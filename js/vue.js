// DOM
const buttonRandomColor = document.getElementById('random_color');
const buttonKeepColor = document.querySelectorAll('.fix_color');
const buttonDarkMode = document.getElementById('toogle_b_w');
const main = document.getElementsByTagName('main')[0];
const circle = document.getElementById('all_color_circle');
const textRgbAndRgba = document.querySelectorAll('p');
let bgColor;


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
        document.querySelectorAll('.' + this.name + ' > p').forEach(p => {
            p.textContent = rgbaString(this.rgba);
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



// Create 3 main Colors
let colorOne = new Couleur('one');
let colorTwo = new Couleur('two');
let colorThree = new Couleur('three');



// Array of the main colors
let couleurs = [];
couleurs.push(colorOne,colorTwo,colorThree);



// Show colors Circle
function circleColor(){
    circle.style.background =   'linear-gradient(217deg,' 
                                + rgbaString(colorOne.rgba) + 
                                ', transparent 70.71%), linear-gradient(127deg,' 
                                + rgbaString(colorTwo.rgba) + 
                                ', transparent 70.71%), linear-gradient(336deg,' 
                                + rgbaString(colorThree.rgba) + ', transparent 70.71%)';
}



// Button Switch Colors
buttonRandomColor.addEventListener('click', function(){
    couleurs.forEach(couleur => {
        couleur.changeColor();
        circleColor();
        findCurrentRgb();
    })
});



// Button Keep / Drop color
buttonKeepColor.forEach(item => {
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



// function is dark or light mode
function isDarkmode(){
    if(buttonDarkMode.textContent === 'Dark mode'){
        return true;
    }
}



// Button Dark / White mode
buttonDarkMode.addEventListener('click', function(){
    //change button text
    this.textContent = isDarkmode() ? 'Light mode' : 'Dark mode';
    // change color of the background
    main.style.backgroundColor = isDarkmode() ? 'white' : 'black';
    // change the color of texts
    textRgbAndRgba.forEach(item => {
        item.style.color = isDarkmode() ? 'black' : 'white';
    })
    // recalculate rgb
    findCurrentRgb();
})



// Function calc rgb (need background color & color on top of it)
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


// Show RGB of colors  / html
 function showRgb(indexOftext, rgb){
    document.querySelector('#main_color_overlay > p:nth-of-type(' + indexOftext +'').textContent = rgbString(rgb);
}

// Seek R.G.B of the background color
function backgroundColor() {
    bgColor = isDarkmode() ? { r : 255, g : 255, b : 255, a : 1 } : { r : 0, g : 0, b : 0, a : 1 };
} 

// converti les valeurs R G B A en string => rgba(r, g, b, a)
function rgbaString(rgba) {
    return 'rgb(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')';
}

// converti les valeurs R G B en string => rgb(r, g, b)
function rgbString(rgb) {
    return 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';
}

// Calc and display RGB
function findCurrentRgb(){
    backgroundColor();
    showRgb(1, calcRgb(bgColor, colorOne.rgba));
    showRgb(2, calcRgb(colorOne.rgba, colorTwo.rgba));
    showRgb(3, calcRgb(bgColor, colorTwo.rgba));
    showRgb(4, calcRgb(colorTwo.rgba, colorThree.rgba));
    showRgb(5, calcRgb(bgColor, colorThree.rgba));
}
findCurrentRgb();
// random number > x
let randomInt = (max) => {
    return Math.floor(Math.random() * (Math.floor(max) + 1));
}

// Contructeur de couleur
class Couleur {
    constructor(name) {
        this.name = name;
        this.keep = false;
        this.r = randomInt(255);
        this.g = randomInt(255);
        this.b = randomInt(255);
        this.a = Math.random().toFixed(2);
        this.rgba = 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')';
        showColor(this);
    }

    changeColor() {
        if(!this.keep) {
            this.r = randomInt(255);
            this.g = randomInt(255);
            this.b = randomInt(255);
            this.a = Math.random().toFixed(2);
            this.rgba = 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')'; 
            showColor(this);
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


//Création des 3 couleurs
let colorOne = new Couleur('one');
let colorTwo = new Couleur('two');
let colorThree = new Couleur('three');


// tableau des 3 couleurs
let couleurs = [];
couleurs.push(colorOne,colorTwo,colorThree);


//fonction affiche les couleurs et les textes rgba
function showColor(color) {
    document.querySelectorAll('.' + color.name).forEach(div => {
        div.style.backgroundColor = color.rgba;
    })
    // affiche rgba texte
    document.querySelectorAll('.' + color.name + ' > p').forEach(p => {
        p.textContent = color.rgba;
    })
}


// fonction des couleurs du cercle 
function circleColor(){
    let circle = document.getElementById('all_color_circle');
    circle.style.background =   'linear-gradient(217deg,' 
                                + colorOne.rgba + 
                                ', transparent 70.71%), linear-gradient(127deg,' 
                                + colorTwo.rgba + 
                                ', transparent 70.71%), linear-gradient(336deg,' 
                                + colorThree.rgba + ', transparent 70.71%)';
}
circleColor();


// Bouton Switch Colors
const buttonRandomColor = document.getElementById('random_color');

buttonRandomColor.addEventListener('click', function(){
    couleurs.forEach(couleur => {
        couleur.changeColor();
        circleColor();
    })
});


// Bouton Keep / Drop color
document.querySelectorAll('.fix_color').forEach(item => {
    item.addEventListener('click', function(){
        //change texte du bouton + before/after
        this.textContent = this.textContent === 'Keep Color' ? 'Drop Color' : 'Keep Color';
        this.previousElementSibling.style.transform = this.textContent === 'Keep Color' ? 'translateX(0px)' : 'translateX(10px)';
        this.nextElementSibling.style.transform = this.textContent === 'Keep Color' ? 'translateX(0px)' : 'translateX(-10px)';
        
        //ajoute class fixed sur son parent (main color)
        let divfixed = this.parentNode;
        divfixed.classList.toggle('fixed');

        // change Keep
        couleurs.forEach(couleur => {
            couleur.isKeeped();
        })
    });
})


// function is dark or light mode
function isDarkmode(){
    if(document.getElementById('toogle_b_w').textContent === 'Dark mode'){
        return true;
    }
}


// Button Dark / White mode
const buttonDarkMode = document.getElementById('toogle_b_w');

buttonDarkMode.addEventListener('click', function(){
    //change texte du bouton 
    this.textContent = isDarkmode() ? 'Light mode' : 'Dark mode';
    // change couleur du main
    let main = document.getElementsByTagName('main')[0];
    main.style.backgroundColor = isDarkmode() ? 'white' : 'black';
    // change couleur des textes
    document.querySelectorAll('p').forEach(item => {
        item.style.color = isDarkmode() ? 'black' : 'white';
    })
})
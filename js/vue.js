// random number > x
let randomInt = (max) => {
    return Math.floor(Math.random() * (Math.floor(max) + 1));
}
  

// random rgba()
let randomRgba = () => {
    let rgba = 'rgba(' + randomInt(255) + ',' + randomInt(255) + ',' + randomInt(255) + ',' + Math.random() + ')';
    return rgba;
}


// affiche couleurs random au chargement de la page
const mainColorOne = document.getElementById('one');
const mainColorTwo = document.getElementById('two');
const mainColorThree = document.getElementById('three');

mainColorOne.style.backgroundColor = randomRgba();
mainColorTwo.style.backgroundColor = randomRgba();
mainColorThree.style.backgroundColor = randomRgba();


// change le reste des elements au chargement de la page
const allColorOne = document.querySelectorAll('.color_one');
const allColorTwo = document.querySelectorAll('.color_two');
const allColorthree = document.querySelectorAll('.color_three');

changeColorAll(allColorOne, mainColorOne);
changeColorAll(allColorTwo, mainColorTwo);
changeColorAll(allColorthree, mainColorThree);
changeRgbaText();
changeCircleColor();


// function change les couleurs (condition non 'fixed')
function changeColor(mainColorBloc, otherBlocs){
    if(!mainColorBloc.classList.contains('fixed')){
        //change Main Color block
        mainColorBloc.style.backgroundColor = randomRgba();
        //change les autres couleurs
        changeColorAll(otherBlocs, mainColorBloc);
        // modifie le text rgba
        changeRgbaText();
        // change couleurs cercle
        changeCircleColor();
    }
}


// function change la couleurs des autres blocs
function changeColorAll(whereToChange, mainColorBloc){
    whereToChange.forEach( item => {
        item.style.backgroundColor = mainColorBloc.style.backgroundColor;
    })
}


// change couleur du cercle 
function changeCircleColor(){
    let circle = document.getElementById('all_color_circle');
    circle.style.background =   'linear-gradient(217deg,' 
                                + mainColorOne.style.backgroundColor + 
                                ', transparent 70.71%), linear-gradient(127deg,' 
                                + mainColorTwo.style.backgroundColor + 
                                ', transparent 70.71%), linear-gradient(336deg,' 
                                + mainColorThree.style.backgroundColor + ', transparent 70.71%)';
}



//Fonction affiche rgba
function changeRgbaText(){
    document.querySelectorAll('p').forEach(item => {
        item.textContent = item.parentNode.style.backgroundColor;
    })
}


// function is dark or light mode
function isDarkmode(){
    if(document.getElementById('toogle_b_w').textContent === 'Dark mode'){
        return true;
    }
}


// Fonction is Keep or Drop
function isColorKeeped(buttonKeep){
    if(buttonKeep.textContent === 'Keep Color'){
        return true;
    }
}


// Button Dark / White mode
document.getElementById('toogle_b_w').addEventListener('click', function(){
    //change text du bouton
    this.textContent = isDarkmode() ? 'Light mode' : 'Dark mode';
    // change couleur générale
    let main = document.getElementsByTagName('main')[0];
    main.style.backgroundColor = isDarkmode() ? 'white' : 'black';
    // change couleur du texte rgba
    document.querySelectorAll('p').forEach(item => {
        item.style.color = isDarkmode() ? 'black' : 'white';
    })
}) 


// Button Switch Colors
const buttonRandomColor = document.getElementById('random_color');
buttonRandomColor.addEventListener('click', function(){
    changeColor(mainColorOne, allColorOne);
    changeColor(mainColorTwo, allColorTwo);
    changeColor(mainColorThree, allColorthree);
});


// Bouton Keep / Drop color
document.querySelectorAll('.fix_color').forEach(item => {
    item.addEventListener('click', function(){
        //change texte du bouton + before/after
        this.textContent = isColorKeeped(this) ? 'Drop Color' : 'Keep Color';
        this.previousElementSibling.style.transform = isColorKeeped(this) ? 'translateX(0px)' : 'translateX(10px)';
        this.nextElementSibling.style.transform = isColorKeeped(this) ? 'translateX(0px)' : 'translateX(-10px)';

        //ajoute class fixed sur son parent (main color)
        let divfixed = this.parentNode;
        divfixed.classList.toggle('fixed');
    });
})
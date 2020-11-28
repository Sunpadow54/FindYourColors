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


// function change les couleurs (condition non 'fixed')
function changeColor(mainColorBloc, otherBlocs){
    if(!mainColorBloc.classList.contains('fixed')){
        mainColorBloc.style.backgroundColor = randomRgba();
    }
    changeColorAll(otherBlocs, mainColorBloc);
    changeRgbaText();
}


// function change la couleurs des autres blocs
function changeColorAll(whereToChange, whereIsColor){
    whereToChange.forEach( item => {
        item.style.backgroundColor = whereIsColor.style.backgroundColor;
    })
}

//Fonction affiche rgba
function changeRgbaText(){
    document.querySelectorAll('p').forEach(item => {
        item.textContent = item.parentNode.style.backgroundColor;
    })
}


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
        if (this.textContent === 'Keep Color') {
            this.textContent = 'Drop Color';
            this.previousElementSibling.style.transform = 'translateX(10px)';
            this.nextElementSibling.style.transform = 'translateX(-10px)';
        } else {
            this.textContent = 'Keep Color';
            this.previousElementSibling.style.transform = 'translateX(0)';
        }
        //ajoute class fixed sur son parent (main color)
        let divfixed = this.parentNode;
        divfixed.classList.toggle('fixed');
    });
})

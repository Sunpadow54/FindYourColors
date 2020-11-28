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


// gestion du click Switch Color
const buttonRandomColor = document.getElementById('random_color');

buttonRandomColor.addEventListener('click', function(){
    canChangeColor(mainColorOne);
    canChangeColor(mainColorTwo);
    canChangeColor(mainColorThree);
});


// function qui verifie si la couleur est fixée et change la couleur
function canChangeColor(theDiv){
    if(!theDiv.classList.contains('fixed')){
        theDiv.style.backgroundColor = randomRgba();
        //change les couleurs des autres elements
        changeColorAll(allColorOne, mainColorOne);
        changeColorAll(allColorTwo, mainColorTwo);
        changeColorAll(allColorthree, mainColorThree);
    }
}

// Bouton Switch / Drop color
document.querySelectorAll('.fix_color').forEach(item => {
    item.addEventListener('click', function(){
        //change text
        if (this.textContent === 'Keep Color') {
            this.textContent = 'Drop Color';
        } else {
            this.textContent = 'Keep Color';
        }
        //ajoute class fixed sur div de couleur parent
        let divfixed = this.parentNode;
        divfixed.classList.toggle('fixed');
    });
})


// change le reste des elements
const allColorOne = document.querySelectorAll('.color_one');
const allColorTwo = document.querySelectorAll('.color_two');
const allColorthree = document.querySelectorAll('.color_three');

function changeColorAll(whereToChange, whereIsColor){
    whereToChange.forEach( item => {
        item.style.backgroundColor = whereIsColor.style.backgroundColor;
    });
}
changeColorAll(allColorOne, mainColorOne);
changeColorAll(allColorTwo, mainColorTwo);
changeColorAll(allColorthree, mainColorThree);


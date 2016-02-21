var cpt = 0;
var input = document.querySelector(".input");
var button= document.querySelector(".button-add"),
    creation = document.querySelector(".add-word"),
    create = document.querySelector(".create"),
    word = document.querySelector(".worddef"),
    content = document.querySelector(".results"),
    valid = document.querySelector(".validation");


function results()// on affiche les listes de résultats
{
    if (cpt >= 1) {
        content.style.display = "block";
    }
    else{
        content.style.display = "none";
    }
    creation.style.display = "none";
    button.style.display = "none";
    create.style.display = "none";
    word.style.display = "none";
    valid.style.display = "none";
}

input.onkeyup = function(word) { //Quand on tape dans la barre
    var key = event.keyCode || event.charCode;
    

    if( key == 8 || key == 46 )
        {cpt = cpt - 1;}
    else if (key >= 48 && key <= 90)
        {cpt = cpt + 1;}
    else if (key == 13)
        {newResearch(); return false;}
    else 
        {cpt = cpt}

    if (cpt < 1) {
        cpt = 0
    };

    results();
    lookFor(racine,input.value,0); // on actualise les listes de propositions
    return false;
};



function nonexist()
{
    creation.style.display = "none";
    create.style.display = "block";
    button.style.display = "block";
    word.style.display = "none";
    content.style.display = "none";
    valid.style.display = "none";
}

function addword() // Afficher le champs d'ajout/modification de mot
{
    creation.style.display = "block";
    create.style.display = "none";
    word.style.display = "none";
    content.style.display = "none";
    button.style.display = "none";
    valid.style.display = "block";
}

function wordDef() // Afficher la définition
{
    creation.style.display = "none";
    button.style.display = "none";
    create.style.display = "none";
    word.style.display = "block";
    content.style.display = "none";
    valid.style.display = "none";
}
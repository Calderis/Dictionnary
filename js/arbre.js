var myWord = {
    word : document.getElementById("infoA"),
    def : document.getElementById("infoB"),
    genre : document.getElementById("infoC"),
    type : document.getElementById("infoD")
}

function noeud(letter, pos, lvl){
    this.letter = letter;
    this.info = {
        word:"",
        def:"",
        gender:"",
        type:"",
        lvl:lvl,
        view:0,
        top: new Array(
            {
                word:"",
                views:0
            },
            {
                word:"",
                views:0
            },
            {
                word:"",
                views:0
            },
            {
                word:"",
                views:0
            },
            {
                word:"",
                views:0
            }
        )
    };
    this.sup = pos;
    this.view = 0;
    this.a = false;
    this.b = false;
    this.c = false;
    this.d = false;
    this.e = false;
    this.f = false;
    this.g = false;
    this.h = false;
    this.i = false;
    this.j = false;
    this.k = false;
    this.l = false;
    this.m = false;
    this.n = false;
    this.o = false;
    this.p = false;
    this.q = false;
    this.r = false;
    this.s = false;
    this.t = false;
    this.u = false;
    this.v = false;
    this.w = false;
    this.x = false;
    this.y = false;
    this.z = false;
    this.space = false;
    this.line = false;
}
var racine = new noeud("racine","",0);


function ajouterMot(word, desc, gender, type){
    var pos = racine;
    for(var i = 0; i<word.length; i++){
        var letter = word.substring(i,i+1);
        if(letter == "-") letter = "line";
        if(letter == " ") letter = "space";
        if(pos[letter] != false) pos = pos[letter];
        else{
            pos[letter] = new noeud(letter, pos, i+1);
            pos = pos[letter];
        }
        if(i == word.length-1){
            pos.info.word = word;
            pos.info.def = desc;
            pos.info.gender = gender;
            pos.info.type = type;
        }
    }
    return true;
}
//Fonctions parcourant l'arbre à la recherche d'un mot, d'une définition
function chercherMot(word) {return research(racine,word,0);}
function research(a,word,level){
    if(a == null || a == false) return false;
    if(level >= word.length) {
        if(a.info.def != "") a.info.view++;
        checkTop(racine,word,0,a.info.view);
        var infos = {
            word : word,
            def : a.info.def,
            type : a.info.type,
            gender : a.info.gender
        }
        return infos;
    }
    var letter = word.substring(level,level+1);
    if (a[letter] != null) return research(a[letter], word, level+1);
    return false;
}











/* ALGORITHMES DE RECHERCHE AVANCEE */

/*checkTop*/
//C'est une fonction gérant les mots les plus consultés. Chaque noeud contient un classement des mots les plus consultés. Ainsi, lorsque je me trouve sur un noeud, je suis capable de retourner les mots les plus consultés des branches qui le traversent. On appelle cette fonction à chaque fois que l'utilisateur consulte un mot. Chaque mot comporte un nombre de vu. Si son nombre de vue est supérieur à l'un des mots placé dans le classement, il prend sa place. Autrement, il n'est pas référencé.

/*alphaB*/
//C'est l'un des algorithme les plus important puisqu'il a pour mission de renvoyer les 5 premiers mots situé après la saisie de l'utilisateur. Ainsi, en tapant la lettre a, je vais avoit les 5 premiers mots de l'alphabet. Si je tape ab je vais avoir les 5 premiers mots commençant par les lettres ab, etc.


//Fonction gérant le classement des mots les plus consultés
function checkTop(a,word,level,views){
    if(a == null)return "Mot inexistant";//noeud inexistant
    if(level >= word.length) {//Fin du mot
        return true;
    }
    var letter = word.substring(level,level+1);
    if (a[letter] != null){
        var check = true;
        for(var i = 0; i<5; i++){// je parcours le top 5
            if(a.info.top[i].views<views && check){
                if(a.info.top[i].word != word){//le mot contient plus de vue que l'un de ceux classé dans le top 5
                    a.info.top.splice(i,0, {word:word,views:views});
                    a.info.top.splice(6,1);
                    check = false;
                }
                else{//le mot était déjà premier
                    a.info.top[i].views = views;
                    break;
                }
            }
            else if(a.info.top[i].word == word && check==false){//le mot etait plus bas dans le classement, je l'ai effacé
                a.info.top.splice(i,1);
                break;
            }
        }
        return checkTop(a[letter],word,level+1, views);
    }
    return "Mot inexistant";
}


function alphab(a,search) {
    if(chercherMot(search)!=false){
        for (var i = 0; i < search.length; i++) {
            letter = search.substring(i,i+1);
            a = a[letter];
        }
        var listeMot = new Array();
        s = new Array();
        s.push(a);
        var prev = "";
        var ban = new Array();
        function listBan(noeud){
            for(var j = 0; j<ban.length; j++){
                if(noeud==ban[j]) return false;
            }
            return true;
        }
        while (prev != a) {

            var noeud = s[s.length-1];
            if(noeud != undefined){
                if (noeud.info.def != ""){
                    var word ="";
                    listeMot.push(noeud.info.word);
                    noeud = s.pop();
                }
                if (listeMot.length == 5) return listeMot;

                if (noeud.space != false && noeud.space != prev && listBan(noeud.space)) {s.push(noeud.space); prev = noeud.space;}
                else if (noeud.line != false && noeud.line != prev && listBan(noeud.line)) {s.push(noeud.line); prev = noeud.line;}
                else if (noeud.a != false && noeud.a != prev && listBan(noeud.a)) {s.push(noeud.a); prev = noeud.a;}
                else if (noeud.b != false && noeud.b != prev && listBan(noeud.b)) {s.push(noeud.b); prev = noeud.b;}
                else if (noeud.c != false && noeud.c != prev && listBan(noeud.c)) {s.push(noeud.c); prev = noeud.c;}
                else if (noeud.d != false && noeud.d != prev && listBan(noeud.d)) {s.push(noeud.d); prev = noeud.d;}
                else if (noeud.e != false && noeud.e != prev && listBan(noeud.e)) {s.push(noeud.e); prev = noeud.e;}
                else if (noeud.f != false && noeud.f != prev && listBan(noeud.f)) {s.push(noeud.f); prev = noeud.f;}
                else if (noeud.g != false && noeud.g != prev && listBan(noeud.g)) {s.push(noeud.g); prev = noeud.g;}
                else if (noeud.h != false && noeud.h != prev && listBan(noeud.h)) {s.push(noeud.h); prev = noeud.h;}
                else if (noeud.i != false && noeud.i != prev && listBan(noeud.i)) {s.push(noeud.i); prev = noeud.i;}
                else if (noeud.j != false && noeud.j != prev && listBan(noeud.j)) {s.push(noeud.j); prev = noeud.j;}
                else if (noeud.k != false && noeud.k != prev && listBan(noeud.k)) {s.push(noeud.k); prev = noeud.k;}
                else if (noeud.l != false && noeud.l != prev && listBan(noeud.l)) {s.push(noeud.l); prev = noeud.l;}
                else if (noeud.m != false && noeud.m != prev && listBan(noeud.m)) {s.push(noeud.m); prev = noeud.m;}
                else if (noeud.n != false && noeud.n != prev && listBan(noeud.n)) {s.push(noeud.n); prev = noeud.n;}
                else if (noeud.o != false && noeud.o != prev && listBan(noeud.o)) {s.push(noeud.o); prev = noeud.o;}
                else if (noeud.p != false && noeud.p != prev && listBan(noeud.p)) {s.push(noeud.p); prev = noeud.p;}
                else if (noeud.q != false && noeud.q != prev && listBan(noeud.q)) {s.push(noeud.q); prev = noeud.q;}
                else if (noeud.r != false && noeud.r != prev && listBan(noeud.r)) {s.push(noeud.r); prev = noeud.r;}
                else if (noeud.s != false && noeud.s != prev && listBan(noeud.s)) {s.push(noeud.s); prev = noeud.s;}
                else if (noeud.t != false && noeud.t != prev && listBan(noeud.t)) {s.push(noeud.t); prev = noeud.t;}
                else if (noeud.u != false && noeud.u != prev && listBan(noeud.u)) {s.push(noeud.u); prev = noeud.u;}
                else if (noeud.v != false && noeud.v != prev && listBan(noeud.v)) {s.push(noeud.v); prev = noeud.v;}
                else if (noeud.w != false && noeud.w != prev && listBan(noeud.w)) {s.push(noeud.w); prev = noeud.w;}
                else if (noeud.x != false && noeud.x != prev && listBan(noeud.x)) {s.push(noeud.x); prev = noeud.x;}
                else if (noeud.y != false && noeud.y != prev && listBan(noeud.y)) {s.push(noeud.y); prev = noeud.y;}
                else if (noeud.z != false && noeud.z != prev && listBan(noeud.z)) {s.push(noeud.z); prev = noeud.z;}
                else {
                    noeud = s.pop();
                    prev = noeud;
                    ban.push(noeud);
                }
            }
            else return listeMot;
        }
        return listeMot;
    }else return false;
}












/* ALGORITHME D'AFFICHAGE */
/*modWord*/
//fonction préremplissant les champs de création avec les données déjà existantes sur le mot

/*lookFor*/
//fonction appellant l'algorithme alphab pour obtenir jusqu'à 5 mots classé par ordre alphabétique et ira lire le classement du noeud dans lequel nous nous trouvons pour enfin afficher deux classements : celui des mots les plus consultés et celui des mots arrivant par ordre alphabétique

/*newResearch*/
//Lorsque l'on valide dans la barre de recherche, on réucupère le mot puis on lance la recherche

/*afficherDef*/
//Mise à jour des informations dans la section définition

/*addWord*/
//Fonction récupérant les données du champs html pour pouvoir les ajouter à l'arbre dictionnaire


//fonction préremplissant les champs de création avec les données déjà existantes sur le mot
function modWord(word){
    var infos = chercherMot(word);//on récupère les infos sur le mot
    document.getElementById("mot").value = infos.word;
    if(infos.gender == "masculin") document.getElementById("radioA").checked = true;
    else if(infos.gender == "féminin") document.getElementById("radioB").checked = true;
    document.getElementById("type").value = infos.type;
    document.getElementById("desc").value = infos.def;
    addword();//on affiche la section d'ajout de mot
}

//Lecture des Plus consultés et des 5 premiers mots par ordre alphabétique
var popular = document.getElementById("popular");
var alphabetical = document.getElementById("alphabetical");

function lookFor(a,w,level){
    popular.innerHTML = "";
    alphabetical.innerHTML = "";
    if(a == null){
        content.style.display = "none";
        create.style.display = "block";
    }
    var letter = w.substring(level,level+1);
    if (a[letter] != null) return lookFor(a[letter], w, level+1);
    
    //on vide les anciennes suggestions
    for(var i = 0; i<5; i++){
        if(a != false){
            var word = a.info.top[i].word;//correspond au classement des plus consultés
            
            //Ordre top view
            var b = document.createElement("a");
            b.className = "solo-word";
            b.href = "#";
            b.id = word;
            b.onclick = function(){afficherDef(this.id);};
            b.innerHTML = "<h3>"+word+"</h3>";
            document.getElementById("popular").appendChild(b);
        }
    }
    var alphaB = alphab(racine, w);
    console.log(alphaB);
    if(alphaB == false){
        nonexist();
    }
    else{
        for(var j = 0; j<alphaB.length;j++){
            var wordB = alphaB[j];//correspond à l'ordre alphabétique
            //Ordre alphabétique
            var c = document.createElement("a");
            c.className = "solo-word";
            c.href = "#";
            c.id = wordB;
            c.onclick = function(){afficherDef(this.id);};
            c.innerHTML = "<h3>"+wordB+"</h3>";
            popular.appendChild(b);
            alphabetical.appendChild(c);
        }
    }
}
//Lorsque l'on valide dans la barre de recherche, on réucupère le mot puis on lance la recherche
function newResearch(){
    var mot = input.value;
    afficherDef(mot);
}

// Mise à jour des informations dans la section définition
function afficherDef(mot){ 
    var infos = chercherMot(mot);
    if(infos.word != undefined){
        myWord.word.innerHTML = infos.word;
        myWord.def.innerHTML = infos.def;
        myWord.genre.innerHTML = infos.gender;
        myWord.type.innerHTML = infos.type;
        document.querySelector(".modify").id = infos.word;
        input.value = infos.word;
        wordDef();
    }
    else{
        document.getElementById("mot").value = input.value;
       nonexist();
    }
}

//Fonction récupérant les données du champs html pour pouvoir les ajouter à l'arbre dictionnaire
function addWord(){
    var word = document.getElementById("mot").value;
    var radioA = document.getElementById("radioA");
    var radioB = document.getElementById("radioB");
    var type = document.getElementById("type").value;
    var desc = document.getElementById("desc").value;
    var genre = "undefined";
    
    if(radioA.checked) genre = radioA.value;//C'est masculin
    else if(radioB.checked) genre = radioB.value;//C'est féminin
    
    ajouterMot(word,desc,genre,type);
    afficherDef(word);
    document.getElementById("mot").value = "";
    document.getElementById("radioA").checked = false;
    document.getElementById("radioB").checked = false;
    document.getElementById("type").value = "";
    document.getElementById("desc").value = "";
}
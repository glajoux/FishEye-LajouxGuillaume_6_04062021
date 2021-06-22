//Elements du DOM
const mainConteneur = document.getElementById("main__index");

let article = "";
let lienPhoto = "";
let image = "";
let titreH2 = "";
let paraLieu = "";
let paraTagline = "";
let paraPrix = "";
let listeUl = "";
let listeLi = "";
let span = "";
let lienTag = "";
let site = "";


function dataMedias(value) {
  console.log(value);
}

//Récupère les données JSON
function recupJSON (){

  fetch("FishEyeData.json")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (value) {
    console.log(value.photographers);
    photographeCreation(value.photographers);
  })
  .catch(function (err) {
    console.log(err);
  });
};
  
window.addEventListener("onload", recupJSON())

// Crée une balise article 
function articleCreation(classBem, id) {
  article = document.createElement("article")
  article.classList.add(classBem)
  article.setAttribute("id", id)
  return article
};

// Crée un lien qui renvoie sur la page du photographe
function insertPointHtml(nom){
  site = nom.split(" ").join("");
  site = "./html/" + site + ".html";
  return site;
};

// Crée une balise a 
function lienPhotoCreation(nom, classe){
  insertPointHtml(nom)
  lienPhoto = document.createElement("a");
  lienPhoto.setAttribute("href", site)
  lienPhoto.classList.add(classe)
  return lienPhoto
};

// Crée une balise img 
function imgCreation(classe, nom, chemin) {
  image = document.createElement("img");
  image.classList.add(classe);
  image.setAttribute("alt", nom);
  image.setAttribute("src", chemin);
  return image;
};

// Crée une balise h2 
function h2Creation (classe, nom){
  titreH2 = document.createElement("h2")
  titreH2.classList.add(classe);
  titreH2.innerText = nom
  return titreH2;
};

// Crée une balise p 
function paraLieuCreation (classe, city, country) {
  paraLieu = document.createElement("p");
  paraLieu.classList.add(classe);
  paraLieu.innerText = city + ", " + country;
  return paraLieu
};

// Crée une balise p 
function paraTaglineCreation (classe, tagline) {
  paraTagline = document.createElement("p");
  paraTagline.classList.add(classe);
  paraTagline.innerText = tagline;
  return paraTagline
};

// Crée une balise p 
function paraPrixCreation (classe, prix) {
  paraPrix = document.createElement("p");
  paraPrix.classList.add(classe);
  paraPrix.innerText = prix + "€/jour";
  return paraPrix
};

// Crée une balise ul
function ulCreation (classe){
  listeUl = document.createElement("ul");
  listeUl.classList.add(classe);
return listeUl
};

// Crée une balise li
function liCreation(classe, classe2, tag){
  listeLi = document.createElement("li");
  listeLi.classList.add(classe);
  listeLi.classList.add(classe2);
  listeLi.setAttribute("aria-label", tag);
return listeLi
};

// Crée une balise a
function lienTagCreation(ref){
lienTag = document.createElement("a");
lienTag.setAttribute("href", ref)
return lienTag
};

// Crée une balise span
function spanCreation(array){
span = document.createElement("span");
span.innerText = array;
return span;
};

// Crée une une balise article de photographe qui contient toutes les informations contenues dans le JSON
function photographeCreation(photographe) {
  const classBem = "user";
  const chemin = "./photos/Photographers_ID_Photos/";
  const classList = ["__lien", "__img", "__titre", "__lieu", "__tagline", "__prix", "__tag"];
  for (i=0; i<photographe.length; i++){
    let tagTableau = photographe[i].tags
    console.log(tagTableau);
    articleCreation(classBem, photographe[i].id);
    lienPhotoCreation(photographe[i].name, `${classBem}${classList[0]}`);
    imgCreation(`${classBem}${classList[1]}`, photographe[i].name, `${chemin}${photographe[i].portrait}`);
    h2Creation(`${classBem}${classList[2]}`, photographe[i].name);
    article.appendChild(lienPhoto);
    lienPhoto.append(image, titreH2);
    //Essayer de le faire rentrer dans une boucle
    paraLieuCreation(`${classBem}${classList[3]}`, photographe[i].city, photographe[i].country);
    paraTaglineCreation(`${classBem}${classList[4]}`, photographe[i].tagline);
    paraPrixCreation(`${classBem}${classList[5]}`, photographe[i].price);
    ulCreation(`${classBem}${classList[6]}`);
    tagTableau.forEach(function(tag){
      liCreation("tag", tag, `tag__${tag}`)
      lienTagCreation("#")
      spanCreation(tag)
      listeLi.appendChild(lienTag);
      lienTag.appendChild(span);
      listeUl.appendChild(listeLi);
    })
    article.append(paraLieu, paraTagline, paraPrix, listeUl);
    mainConteneur.appendChild(article);
  };
};
/*
photographe[i].tag.forEach(tag => {
  liCreation(`tag ${tag.tags}`, `tag__${tag.tags}`)
  lienTagCreation("#");
  spanCreation(tag.tags)
  listeLi.appendChild(lienTag);
  lienTag.appendChild(span);
  listeUl.appendChild(listeLi);
});

    tagTableau.forEach(function(tag){
      liCreation(`tag ${tag}`, `tag__${tag}`)
      lienTagCreation("#")
      spanCreation(tag)
      listeLi.appendChild(lienTag);
      lienTag.appendChild(span);
      listeUl.appendChild(listeLi);
    })

*/

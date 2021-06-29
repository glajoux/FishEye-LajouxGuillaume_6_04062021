import * as utils from "./js/utils.js";

//Elements du DOM
const mainConteneur = document.getElementById("main__index");
utils.test()

let tableauDesTags = [];
let articles =[];
let url = window.location.href;

let dataPhotographes =[];
let dataMedias = [];
let site = "";
console.log(url);

const recupJSON = async () => {
  await fetch("FishEyeData.json")
    .then((res) => res.json())
    .then(function(data){
      dataPhotographes = data.photographers;
      dataMedias = data.media;
    })
    .catch(function (err) {
      console.log(err);
    });
    console.log(dataPhotographes);
    // console.log(dataMedias);
};

// class qui construit les vignettes des photographes.
class photographe {
  constructor(photographe) {
    this.city = photographe.city;
    this.country = photographe.country;
    this.id = photographe.id;
    this.name = photographe.name;
    this.portrait = photographe.portrait;
    this.price = photographe.price;
    this.tagline = photographe.tagline;
    this.tags = photographe.tags;
  }

  createPhotographe = function(dom) {
    dom.innerHTML +=
    `
      <article class="user">
        <a href="./html/${insertPointHtml(this.name)}.${this.id}.html" class="user__lien">
            <img class="user__img" src="./photos/Photographers_ID_Photos/${this.portrait}" alt="${this.name}">
            <h2 class=user__titre>${this.name}</h2>
        </a>
        <p class="user__lieu">${this.city}, ${this.country}</p>
        <p class="user__para">${this.tagline}</p>
        <p class="user__prix">${this.price}€/jour</p>
        <ul class="user__tag">${this.tags
          .map((tag) => `<li class="tag ${tag}" aria-label="tag__${tag}"><span class="${tag}">#${tag}</span></li>`)
          .join("")}</ul>     
      </article>
    `; 
  }

  createPagePhotographe = function(dom) {
    dom.innerHTML +=
    `
    <section id="photographe">
      <div class="photographe__header">
        <h1 class="photographe__titre">${this.name}</h1>
        <p class="photographe__lieu">${this.city}, ${this.country}</p>
        <p class="photographe__para">${this.tagline}</p>
        <ul class="photographe__tag">
        ${this.tags
          .map((tag) => `<li class="tag ${tag}" aria-label="tag__${tag}"><span class="${tag}">#${tag}</span></li>`)
          .join("")}
        </ul>
      </div>
      <button class="photographe.contact">Contactez-moi</button>
      <img src="./photos/Photographers_ID_Photos/${this.portrait}" alt="${this.name}" class="photographe__image">    
    </section>
    `
  }
};

//Crée la page index grâce aux données JSON
const creationPhotographe = async () => {
  await recupJSON();
  dataPhotographes.forEach((photographer) => {
    let photographeModel = new photographe (photographer)
    photographeModel.createPhotographe(mainConteneur)
  })
};

//Permet de lier le nom et prenom ensemble pour l'inserer par la suite dans une url
function insertPointHtml(nom) {
  site = nom.split(" ").join("");
  return site;
};

// Récupère les éléments du Dom qui correspondent au tag et les mets dans un tableau
const triPhotographe = async () => {
  await creationPhotographe();
  let portrait = document.querySelectorAll(".portrait");
  let art = document.querySelectorAll(".art");
  let fashion = document.querySelectorAll(".fashion");
  let architecture = document.querySelectorAll(".architecture");
  let travel = document.querySelectorAll(".travel");
  let sport = document.querySelectorAll(".sports");
  let animals = document.querySelectorAll(".animals");
  let events = document.querySelectorAll(".events");
  articles = document.querySelectorAll(".user");
  tableauDesTags = [portrait, art, fashion, architecture, travel, sport, animals, events];
};

//Permet lors d'un clic sur un tag d'afficher seuelement les photographes ayant le même tag
const affichageParTag = async() =>{
  await triPhotographe();
  tableauDesTags.forEach(tag => {
    tag.forEach(noeud => {
      noeud.addEventListener("click", function(e){
        e.stopPropagation()
        let tagClass = e.target.className; 
        articles.forEach(article => {
          let testTag = article.innerHTML;
          if (!testTag.includes(tagClass)){
            article.classList.add("supprime");
          } else {
            article.classList.remove("supprime");
          };
        });
      });
   });
 });
};


window.addEventListener('scroll', function() {
  if(document.documentElement.scrollTop > 100){
    document.getElementById("contenu").style["visibility"] = "visible"
  } else {
    document.getElementById("contenu").style["visibility"] = "hidden"
  }
});

affichageParTag()



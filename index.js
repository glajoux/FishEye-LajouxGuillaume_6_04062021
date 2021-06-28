//Elements du DOM
const mainConteneur = document.getElementById("main__index");
// const nomUrl = ["Ellie-RoseWilkens", "MimiKeel", "TracyGalindo", "NabeelBradford", "RhodeDubois", "MarcelNikolic"]


let portrait = [];
let art = [];
let fashion = [];
let architecture = [];
let travel = [];
let sport = [];
let animals = [];
let events = [];
let tableauDesTags = [];
let users = [];

let dataPhotographes =[];
let dataMedias = [];
let site = "";
let url = window.location.href;
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
        <a href="./html/${insertPointHtml(this.name)}.html" class="user__lien">
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

  ceartePagePhotographe = function(dom) {
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
  await recupJSON();
  await creationPhotographe();
  portrait = document.querySelectorAll(".portrait");
  art = document.querySelectorAll(".art");
  fashion = document.querySelectorAll(".fashion");
  architecture = document.querySelectorAll(".architecture");
  travel = document.querySelectorAll(".travel");
  sport = document.querySelectorAll(".sport");
  animals = document.querySelectorAll(".animals");
  events = document.querySelectorAll(".events");
  articles = document.querySelectorAll(".user");
  tableauDesTags = [portrait, art, fashion, architecture, travel, sport, animals, events];
  // console.log(users);
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

const pagePhotographe = async() =>{
  await recupJSON();
  if (url.includes(insertPointHtml(dataPhotographes.name))){
    console.log('gg');
  }
};
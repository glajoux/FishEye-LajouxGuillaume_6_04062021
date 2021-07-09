import { recupJSON, dataPhotographes, photographe } from "./js/utils.js";

//Elements du DOM
const mainConteneur = document.getElementById("main__index");

let tableauDesTags = [];
let articles = [];
// let url = window.location.href;

// console.log(url);

//Crée la page index grâce aux données JSON
const creationPhotographe = async () => {
  await recupJSON();
  dataPhotographes.forEach((photographer) => {
    let photographeModel = new photographe(photographer);
    photographeModel.createPhotographe(mainConteneur);
  });
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
  tableauDesTags = [
    portrait,
    art,
    fashion,
    architecture,
    travel,
    sport,
    animals,
    events,
  ];
};

//Permet lors d'un clic sur un tag d'afficher seuelement les photographes ayant le même tag
const affichageParTag = async () => {
  await triPhotographe();
  tableauDesTags.forEach((tag) => {
    tag.forEach((noeud) => {
      noeud.addEventListener("click", function (e) {
        e.stopPropagation();
        console.log(e.target);
        let tagActif = e.target.parentElement;
        let tagClass = e.target.className;
        console.log(tagActif);
        articles.forEach((article) => {
          let testTag = article.innerHTML;
          if (!testTag.includes(tagClass)) {
            article.classList.add("supprime");
            // tagActif.classList.remove("actif");
          } else {
            article.classList.remove("supprime");
            // tagActif.classList.add("actif");
          }
        });
      });
    });
  });
};

// Au scroll sur la page fait apparaitre  le bloc "passer au contenu"
window.addEventListener("scroll", function () {
  if (document.documentElement.scrollTop > 100) {
    document.getElementById("contenu").style["visibility"] = "visible";
  } else {
    document.getElementById("contenu").style["visibility"] = "hidden";
  }
});

affichageParTag();

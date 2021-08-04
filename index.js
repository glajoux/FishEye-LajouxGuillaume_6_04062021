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
  let portrait = document.querySelectorAll("li[class*='portrait']");
  let art = document.querySelectorAll("li[class*='art'");
  let fashion = document.querySelectorAll("li[class*='fashion'");
  let architecture = document.querySelectorAll("li[class*='architecture'");
  let travel = document.querySelectorAll("li[class*='travel'");
  let sport = document.querySelectorAll("li[class*='sports'");
  let animals = document.querySelectorAll("li[class*='animals'");
  let events = document.querySelectorAll("li[class*='events'");
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
  console.log(tableauDesTags);
  console.log(articles);
  tableauDesTags.forEach((tags) => {
    tags.forEach((noeud) => {
      noeud.addEventListener("click", function (e) {
        tableauDesTags.forEach((tags) => {
          tags.forEach((noeud) => {
            noeud.classList.remove("actif");
          });
        });
        e.stopPropagation();
        console.log(e.target);
        let tagClass = e.target.className;
        console.log(tags);
        articles.forEach((article) => {
          let testTag = article.innerHTML;
          if (!testTag.includes(tagClass)) {
            article.classList.add("supprime");
          } else {
            article.classList.remove("supprime");
            tags.forEach((tag) => {
              tag.classList.add("actif");
            });
          }
        });
      });
    });
  });
};

window.addEventListener("keyup", function (e) {
  console.log(e);
  if (e.target.classList.contains("tag") && e.key === "Enter") {
    tableauDesTags.forEach((tags) => {
      tags.forEach((noeud) => {
        noeud.classList.remove("actif");
      });
      let tagClass = e.target.className;
      console.log(tagClass);
      articles.forEach((article) => {
        let testTag = article.innerHTML;
        if (!testTag.includes(tagClass)) {
          article.classList.add("supprime");
        } else {
          article.classList.remove("supprime");
          tags.forEach((noeud) => {
            if (noeud.className === tagClass) {
              noeud.classList.add("actif");
            }
          });
        }
      });
    });
  }
});

// Au scroll sur la page fait apparaitre  le bloc "passer au contenu"
window.addEventListener("scroll", function () {
  if (document.documentElement.scrollTop > 100) {
    document.getElementById("contenu").style["visibility"] = "visible";
  } else {
    document.getElementById("contenu").style["visibility"] = "hidden";
  }
});

affichageParTag();

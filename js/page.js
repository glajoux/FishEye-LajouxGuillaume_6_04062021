import {
  recupJSON,
  dataPhotographes,
  photographe,
  dataMedias,
  mediaVignette,
  tri,
  likeIncrease,
  navigationClavier,
} from "./utils.js";
import { createModale } from "./modal.js";
import { lightbox } from "./lightbox.js";

const mainPagePhotographe = document.getElementById("main__photographe");

//Récupère l'id dans l'url (?id=...)
let urlRechercheParams = new URLSearchParams(window.location.search);
let idUrl = parseInt(urlRechercheParams.get("id")); //Renvoie un entier ID
let nbrDeLike = 0; //Variable qui sera affiché pour le nbr total de like en bas de page
// qui sera incrémenté lors de la création des médias

async function pagePhotographe() {
  await recupJSON();
  // console.log(dataPhotographes);
  // console.log(dataMedias);

  // Récupère les info du photographe en fonction de l'id dans l'url
  let idPhotographe = dataPhotographes.filter((el) => el.id === idUrl);
  // Récupère les médias du photographe en fonction de l'id dans l'url
  let idMedias = dataMedias.filter((el) => el.photographerId === idUrl);
  console.log(idPhotographe);
  console.log(idMedias);

  let titres = [];
  idMedias.forEach((media) => titres.push(media.title)); //Récupères tout les titres pour être utilisé dnas le tri et lightbox
  let page = new photographe(idPhotographe[0]);
  page.createPagePhotographe(mainPagePhotographe);
  mainPagePhotographe.innerHTML += `
  <div class="selection">
    <div class="selection__tri">Trier par</div>
    <div class="selection__conteneur">
      <button class="selection__triage" tabindex="0">Populaire</button>
      <button class="selection__triage" tabindex="0">Date</button>
      <button class="selection__triage" tabindex="0">Titre</button>
      <img src="./photos/fleche_blanche.svg" alt="Fleche d'ouverture du menu" class="selection__fleche">
    </div>
  </div>
  <section class="media">
  </section>
  `;

  const section = document.querySelector(".media");
  console.log(section);

  function createMedia(mediaDuPhotographe, eleDOM) {
    mediaDuPhotographe.forEach((media) => {
      nbrDeLike += media.likes;
      // vérifie si il y a une clé image ou video dans media
      if ("image" in media) {
        let photoModel = new mediaVignette(media);
        photoModel.createPhoto(eleDOM);
      } else if ("video" in media) {
        let videoModel = new mediaVignette(media);
        videoModel.createVideo(eleDOM);
      }
    });
  }

  createMedia(idMedias, section);

  section.innerHTML += `
  <div class="tarif">
    <p class="tarif__like like"><span class="like__like">${nbrDeLike}</span><img src="./photos/coeur_noir.svg" alt="likes" class="like__coeur">
    </p>
    <p class="tarif__prix">${idPhotographe[0].price}€ / jour</p>
  </div>
  `;
  createModale(mainPagePhotographe, idPhotographe[0].name);
  const contactBouton = document.querySelector(".photographe__contact");
  const modale = document.getElementById("dialog");
  contactBouton.addEventListener("click", function () {
    modale.style.visibility = "visible";
  });

  const closeBouton = document.querySelector(".box__close");
  closeBouton.addEventListener("click", function () {
    modale.style.visibility = "hidden";
  });

  document.addEventListener("keyup", function (e) {
    if (e.key === "Escape") {
      modale.style.visibility = "hidden";
    }
  });

  const boutonSelection = document.querySelectorAll(".selection__triage");
  const flecheSelection = document.querySelector(".selection__fleche");

  boutonSelection.forEach((bouton) => {
    bouton.addEventListener("click", function (e) {
      flecheSelection.classList.toggle("selection__fleche__rotate");
      boutonSelection.forEach((bouton) => {
        if (bouton.textContent == "Date") {
          bouton.classList.toggle("selection__date");
        }
        bouton.classList.toggle("selection__triage__affichage");
        bouton.style.zIndex = "1";
      });
      bouton.style.zIndex = "2";
      tri(e, idMedias);
      console.log(idMedias);
      document.querySelector(".media").innerHTML = "";
      console.log((document.querySelector(".media").innerHTML = ""));

      createMedia(idMedias, document.querySelector(".media"));
    });
  });

  const likeClic = document.querySelectorAll(".vignette__like");
  let likeTot = document.querySelector(".like__like");

  likeClic.forEach((coeur) => {
    coeur.addEventListener("click", function () {
      console.log(coeur);
      likeIncrease(coeur, likeTot);
    });
  });

  navigationClavier(likeTot);

  lightbox.initialisation();
}

pagePhotographe();

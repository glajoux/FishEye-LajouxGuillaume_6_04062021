import {
  recupJSON,
  dataPhotographes,
  photographe,
  dataMedias,
  mediaVignette,
  likeIncrease,
} from "./utils.js";
import { createModale } from "./modal.js";
import { lightbox } from "./lightbox.js";

const mainPagePhotographe = document.getElementById("main__photographe");

//Récupère l'id dans l'url (?id=...)
let urlRechercheParams = new URLSearchParams(window.location.search);
let idUrl = parseInt(urlRechercheParams.get("id"));
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
    <label class="selection__tri">Trier par</label>
    <select name="triage" id="tri" class="selection__triage" tabindex="0">
      <option value="populaire">Populaire</option>
      <option value="date">Date</option>
      <option value="titre">Titre</option>
    </select>
    <img src="./photos/fleche_blanche.svg" alt="Fleche d'ouverture du menu" class="selection__fleche">
  </div>
  <section class="media">
  </section>
  `;

  const section = document.querySelector(".media");

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

  function tri() {
    const SELECTION = document.querySelectorAll("option");

    SELECTION.forEach((select) => {
      select.addEventListener("click", function (e) {
        if (e.target.value == "populaire") {
          idMedias.sort(function (a, b) {
            return b.likes - a.likes;
          });
        } else if (e.target.value == "titre") {
          idMedias.sort(function (a, b) {
            if (a.title < b.title) {
              return -1;
            } else {
              return 1;
            }
          });
        } else if (e.target.value == "date") {
          idMedias.sort(function (a, b) {
            let c = new Date(a.date);
            let d = new Date(b.date);
            return d - c;
          });
        }
        console.log(idMedias);
        section.innerHTML = "";
      });
      createMedia(idMedias, section);
    });
  }

  tri();

  likeIncrease();

  lightbox.initialisation();
}

pagePhotographe();

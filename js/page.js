import { recupJSON, dataPhotographes, photographe, dataMedias, mediaVignette} from "./utils.js";

const mainPagePhotographe = document.getElementById("main__photographe");

//Récupère l'id dans l'url (?id=...)
let urlRechercheParams = new URLSearchParams(window.location.search);
let idUrl = parseInt(urlRechercheParams.get("id")); 

async function pagePhotographe() {
  await recupJSON();
  // console.log(dataPhotographes);
  // console.log(dataMedias);
  let idPhotographe = dataPhotographes.filter(el => el.id === idUrl);
  let idMedias = dataMedias.filter(el => el.photographerId === idUrl);
  // console.log(idPhotographe);
  console.log(idMedias);
  let page = new photographe (idPhotographe[0])
  page.createPagePhotographe(mainPagePhotographe)
  mainPagePhotographe.innerHTML += 
  `
  <div class="selection">
    <label for="tri" class="selection__tri">Trier par</label>
    <select name="triage" id="tri" class="selection__triage">
      <option value="populaire">Populaire</option>
      <option value="date">Date</option>
      <option value="titre">Titre</option>
    </select>
  </div>
  <section class="media">
  </section>
  `

  let nbrDeLike = 0;

  const section = document.querySelector(".media")
  idMedias.forEach((media) => {
    nbrDeLike += media.likes
    // vérifie si il y a une clé image ou video dans media
    if ("image" in media) {
      let photoModel = new mediaVignette (media)
      photoModel.createPhoto(section)  
    } else if ("video" in media) {
      let videoModel = new mediaVignette (media)
      videoModel.createVideo(section)
    }
  })
  const mediaConteneur = document.querySelector(".media");
  mediaConteneur.innerHTML += 
  `
  <div class="tarif">
    <p class="tarif__like like"><span class="like__like">${nbrDeLike}</span><img src="../photos/coeur_noir.svg" alt="likes" class="like__coeur">
    </p>
    <p class="tarif__prix">${idPhotographe[0].price}€ / jour</p>
  </div>
  `

};

pagePhotographe()


import { recupJSON, dataPhotographes, photographe, dataMedias} from "./utils.js";

const mainPagePhotographe = document.getElementById("main__photographe");

//Récupère l'id dans l'url (?id=...)

let urlRechercheParams = new URLSearchParams(window.location.search);
let idUrl = parseInt(urlRechercheParams.get("id")); 

async function pagePhotographe() {
  await recupJSON();
  console.log(dataPhotographes);
  console.log(dataMedias);
  let idPhotographe = dataPhotographes.filter(el => el.id === idUrl);
  console.log(idPhotographe);
  
  let page = new photographe (idPhotographe[0])
  page.createPagePhotographe(mainPagePhotographe)
};

pagePhotographe()
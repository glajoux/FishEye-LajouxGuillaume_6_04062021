const recupJSON = async () => {
    await fetch("../FishEyeData.json")
      .then((res) => res.json())
      .then(function(data){
        dataPhotographes = data.photographers;
        dataMedias = data.media;
      })
      .catch(function (err) {
        console.log(err);
      });
      // console.log(dataPhotographes);
      // console.log(dataMedias);
  };
  

let dataPhotographes =[];
let dataMedias = [];
let site = "";

  
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
          <a href="./html/photographe.html?id=${this.id}" class="user__lien">
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
      <section class="photographe">
        <div class="photographe__info info">
          <h1 class="info__titre">${this.name}</h1>
          <p class="info__lieu">${this.city}, ${this.country}</p>
          <p class="info__para">${this.tagline}</p>
          <ul class="info__tag">
          ${this.tags
            .map((tag) => `<li class="tag ${tag}" aria-label="tag__${tag}"><span class="${tag}">#${tag}</span></li>`)
            .join("")}
          </ul>
        </div>
        <button class="photographe__contact">Contactez-moi</button>
        <img src="../photos/Photographers_ID_Photos/${this.portrait}" alt="${this.name}" class="photographe__image">    
      </section>
      `
    }
  };

//Permet de lier le nom et prenom ensemble pour l'inserer par la suite dans une url  
function insertPointHtml(nom) {
    site = nom.split(" ").join("");
    return site;
  };


export {recupJSON, insertPointHtml, photographe, dataPhotographes, dataMedias, site};

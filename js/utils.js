const recupJSON = async () => {
  await fetch("./FishEyeData.json")
    .then((res) => res.json())
    .then(function (data) {
      dataPhotographes = data.photographers;
      dataMedias = data.media;
    })
    .catch(function (err) {
      console.log(err);
    });
  // console.log(dataPhotographes);
  // console.log(dataMedias);
};

let dataPhotographes = [];
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

  createPhotographe = function (dom) {
    dom.innerHTML += `
        <article class="user">
          <a href="./photographe.html?id=${this.id}" class="user__lien">
              <img class="user__img" src="./photos/Photographers_ID_Photos/${
                this.portrait
              }" alt="${this.name}">
              <h2 class=user__titre>${this.name}</h2>
          </a>
          <p class="user__lieu">${this.city}, ${this.country}</p>
          <p class="user__para">${this.tagline}</p>
          <p class="user__prix">${this.price}€/jour</p>
          <ul class="user__tag">${this.tags
            .map(
              (tag) =>
                `<li class="tag ${tag}" aria-label="tag__${tag}"><span class="${tag}">#${tag}</span></li>`
            )
            .join("")}</ul>     
        </article>
      `;
  };

  createPagePhotographe = function (dom) {
    dom.innerHTML += `
      <section class="photographe">
        <div class="photographe__info info">
          <h1 class="info__titre">${this.name}</h1>
          <p class="info__lieu">${this.city}, ${this.country}</p>
          <p class="info__para">${this.tagline}</p>
          <ul class="info__tag">
          ${this.tags
            .map(
              (tag) =>
                `<li class="tag ${tag}" aria-label="tag__${tag}"><span class="${tag}">#${tag}</span></li>`
            )
            .join("")}
          </ul>
        </div>
        <button class="photographe__contact">Contactez-moi</button>
        <img src="./photos/Photographers_ID_Photos/${this.portrait}" alt="${
      this.name
    }" class="photographe__image">    
      </section>
      `;
  };
}

class mediaVignette {
  constructor(media) {
    this.date = media.date;
    this.id = media.id;
    this.image = media.image;
    this.likes = media.likes;
    this.photographerId = media.photographerId;
    this.price = media.price;
    this.tags = media.tags;
    this.title = media.title;
    this.video = media.video;
  }
  // construit une vignette avec une image et l'injecte dans le dom
  createPhoto = function (dom) {
    dom.innerHTML += `
      <article class="vignette">
        <img src="./photos/${this.photographerId}/${this.image}" alt="${this.title}" class="vignette__photo">
        <div class="vignette__info">      
          <p class="vignette__titre">${this.title}</p>
          <div class="vignette__like">
            <p class="vignette__like__nbr">${this.likes}</p>    
            <img src="./photos/coeur.svg" alt="likes" class="vignette__img">
          </div> 
        </div>       
      </article>

    `;
  };
  // construit une vignette avec une vidéo et l'injecte dans le dom
  createVideo = function (dom) {
    dom.innerHTML += `
      <article class="vignette">
        <video src="./photos/${this.photographerId}/${this.video}" class="vignette__video">
        </video>
        <div class="vignette__info">      
          <p class="vignette__titre">${this.title}</p>
          <div class="vignette__like">
            <p class="vignette__like__nbr">${this.likes}</p>    
            <img src="./photos/coeur.svg" alt="likes" class="vignette__img">
          </div> 
        </div>       
      </article>
    `;
  };
}

// Gestion des likes
// Au clic on ajoute une class si elle n'est pas présente et on ajoute 1 au nbr de like
// Sinon on retire la class et on enlève 1
function likeIncrease() {
  const likeClic = document.querySelectorAll(".vignette__like");
  let likeTot = document.querySelector(".like__like");

  likeClic.forEach((clic) => {
    clic.addEventListener("click", () => {
      let likeNbr = clic.firstElementChild;
      clic.classList.toggle("clicked");
      if (clic.classList.contains("clicked")) {
        let increase = parseInt(likeNbr.textContent) + 1;
        likeNbr.innerText = increase;
        let likeTotIncrease = parseInt(likeTot.textContent) + 1;
        likeTot.innerText = likeTotIncrease;
      } else {
        let decrease = parseInt(likeNbr.textContent) - 1;
        likeNbr.innerText = decrease;
        let likeTotDecrease = parseInt(likeTot.textContent) - 1;
        likeTot.innerText = likeTotDecrease;
      }
    });
  });
}

export {
  recupJSON,
  photographe,
  dataPhotographes,
  dataMedias,
  site,
  mediaVignette,
  likeIncrease,
};

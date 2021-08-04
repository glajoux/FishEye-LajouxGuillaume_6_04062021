import { lightbox } from "./lightbox.js";

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
                `<li class="tag ${tag}" aria-label="tag__${tag}" tabindex="0"><span class="${tag}">#${tag}</span></li>`
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
                `<li class="tag ${tag}" aria-label="tag__${tag}"><span class="${tag}">#${tag}</span></a></li>`
            )
            .join("")}
          </ul>
        </div>
        <button class="photographe__contact" type="button" aria-labeldby="Ouvre le formulaire de contact
        ">Contactez-moi</button>
        <img src="./photos/Photographers_ID_Photos/${this.portrait}" alt="${
      this.name
    }" class="photographe__image">    
      </section>
      `;
  };
}

class fabriqueMediaVignette {
  fabrique(mediaDuPhotographe, eleDOM, nbrDeLike) {
    mediaDuPhotographe.forEach((media) => {
      nbrDeLike += media.likes;
      // vérifie si il y a une clé image ou video dans media
      if ("image" in media) {
        let photoModel = new mediaImage(media);
        photoModel.createPhoto(eleDOM);
      } else if ("video" in media) {
        let videoModel = new mediaVideo(media);
        videoModel.createVideo(eleDOM);
      }
    });
  }
}

class mediaImage {
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
        <img src="./photos/${this.photographerId}/${this.image}" alt="${this.title}" class="vignette__photo media"
        tabindex="0">
        <div class="vignette__info">      
          <p class="vignette__titre">${this.title}</p>
          <div class="vignette__like" tabindex="0">
            <p class="vignette__like__nbr">${this.likes}</p>    
            <img src="./photos/coeur.svg" alt="likes" class="vignette__img like">
          </div> 
        </div>       
      </article>

    `;
  };
}

class mediaVideo {
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
  // construit une vignette avec une vidéo et l'injecte dans le dom
  createVideo = function (dom) {
    dom.innerHTML += `
      <article class="vignette">
        <video src="./photos/${this.photographerId}/${this.video}" class="vignette__video media"
        tabindex="0">
        </video>
        <div class="vignette__info">      
          <p class="vignette__titre">${this.title}</p>
          <div class="vignette__like" tabindex="0">
            <p class="vignette__like__nbr">${this.likes}</p>    
            <img src="./photos/coeur.svg" alt="likes" class="vignette__img like">
          </div> 
        </div>       
      </article>
    `;
  };
}

// class mediaVignette {
//   constructor(media) {
//     this.date = media.date;
//     this.id = media.id;
//     this.image = media.image;
//     this.likes = media.likes;
//     this.photographerId = media.photographerId;
//     this.price = media.price;
//     this.tags = media.tags;
//     this.title = media.title;
//     this.video = media.video;
//   }
//   // construit une vignette avec une image et l'injecte dans le dom
//   createPhoto = function (dom) {
//     dom.innerHTML += `
//       <article class="vignette">
//         <img src="./photos/${this.photographerId}/${this.image}" alt="${this.title}" class="vignette__photo media"
//         tabindex="0">
//         <div class="vignette__info">
//           <p class="vignette__titre">${this.title}</p>
//           <div class="vignette__like" tabindex="0">
//             <p class="vignette__like__nbr">${this.likes}</p>
//             <img src="./photos/coeur.svg" alt="likes" class="vignette__img like">
//           </div>
//         </div>
//       </article>

//     `;
//   };
//   // construit une vignette avec une vidéo et l'injecte dans le dom
//   createVideo = function (dom) {
//     dom.innerHTML += `
//       <article class="vignette">
//         <video src="./photos/${this.photographerId}/${this.video}" class="vignette__video media"
//         tabindex="0">
//         </video>
//         <div class="vignette__info">
//           <p class="vignette__titre">${this.title}</p>
//           <div class="vignette__like" tabindex="0">
//             <p class="vignette__like__nbr">${this.likes}</p>
//             <img src="./photos/coeur.svg" alt="likes" class="vignette__img like">
//           </div>
//         </div>
//       </article>
//     `;
//   };
// }

// Gestion des likes
// Au clic on ajoute une class si elle n'est pas présente et on ajoute 1 au nbr de like
// Sinon on retire la class et on enlève 1
function likeIncrease(clic, likeTot) {
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
}

//Fonction qui va trier les différents lédia suivant leurs titres, likes ou date
function tri(elementClicked, lesMedias) {
  if (elementClicked.target.textContent == "Populaire") {
    lesMedias.sort(function (a, b) {
      return b.likes - a.likes;
    });
  } else if (elementClicked.target.textContent == "Titre") {
    lesMedias.sort(function (a, b) {
      if (a.title < b.title) {
        return -1;
      } else {
        return 1;
      }
    });
  } else if (elementClicked.target.textContent == "Date") {
    lesMedias.sort(function (a, b) {
      let c = new Date(a.date);
      let d = new Date(b.date);
      return d - c;
    });
  }
}

function navigationClavier(likeTot) {
  window.addEventListener("keyup", function (e) {
    if (e.target.classList.contains("vignette__like") && e.key === "Enter") {
      likeIncrease(e.target, likeTot);
    } else if (e.target.classList.contains("media") && e.key === "Enter") {
      lightbox.initialisation();
    }
  });
}

export {
  recupJSON,
  photographe,
  dataPhotographes,
  dataMedias,
  site,
  fabriqueMediaVignette,
  // mediaVignette,
  tri,
  likeIncrease,
  navigationClavier,
};

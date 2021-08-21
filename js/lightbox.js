//Class qui va faire la lightbox. Prends en parametres l'url des médias,
// le titre (ou alt) à afficher sous l'image
// ainsi que l'url du média ouvert dans la lightbox.
class lightbox {
  static initialisation() {
    // Récupère les éléménts du DOM qui contiennent des images et videos
    // et convertie cette nodeList en array
    let liens = Array.prototype.slice.call(
      document.querySelectorAll("img[src*='.jpg'], video[src*='mp4']")
    );
    let retirePremiereImage = liens.shift();
    console.log(retirePremiereImage);
    console.log(liens);

    let gallerie = liens.map((lien) => lien.getAttribute("src"));
    console.log(gallerie);
    let titres = liens.map(
      (lien) => lien.nextElementSibling.childNodes[1].innerText
    );
    console.log(titres);
    let alts = liens.map((lien) => lien.alt);
    console.log(alts);

    let titles = liens.map((lien) => lien.title);
    let titleCourant = "";
    titles.forEach((title) => {
      if (title !== "") {
        titleCourant = title;
      }
    });

    console.log(titleCourant);

    liens.forEach((lien) => {
      lien.addEventListener("click", function (e) {
        e.preventDefault();
        console.log(e.currentTarget);
        console.log(e.srcElement.nextElementSibling.childNodes[1].innerText);
        new lightbox(
          e.currentTarget.getAttribute("src"),
          e.currentTarget.alt,
          e.srcElement.nextElementSibling.childNodes[1].innerText, // Permet de faire le titre
          gallerie,
          titres,
          titleCourant,
          alts
        );
      });
    });
    liens.forEach((lien) => {
      lien.addEventListener("keyup", function (e) {
        e.preventDefault();
        console.log(e.srcElement.nextElementSibling.childNodes[1].innerText);

        if (e.key === "Enter") {
          new lightbox(
            e.currentTarget.getAttribute("src"),
            e.currentTarget.alt,
            e.srcElement.nextElementSibling.childNodes[1].innerText, // Permet de faire le titre
            gallerie,
            titres,
            e.currentTarget.title,
            alts
          );
        }
      });
    });
  }

  /*
   *Prends en param l'url de l'image, le titre de l'image,
   *un tableau avec les chemins des images images et un tableau avec les titres
   */
  constructor(
    url,
    altCourant,
    titreCourant,
    gallerie,
    titres,
    titleCourant,
    alts
  ) {
    this.element = this.constructionDom(url);
    this.gallerie = gallerie;
    this.titres = titres;
    this.alts = alts;
    this.titleCourant = titleCourant;
    this.appuieClavier = this.appuieClavier.bind(this);
    this.afficheMedia(url, altCourant, titreCourant, titleCourant);
    document.body.appendChild(this.element);
    document.addEventListener("keyup", this.appuieClavier);
  }

  //Méthode qui femre la lightbox
  close(e) {
    e.preventDefault();
    this.element.remove();
  }

  // Gère la navigation au clavier
  appuieClavier(e) {
    if (e.key === "Escape") {
      this.close(e);
    } else if (e.key === "ArrowLeft") {
      this.prev(e);
    } else if (e.key === "ArrowRight") {
      this.next(e);
    }
  }

  // Méthode qui gère le bouton next et affiche l'image suivante
  next(e) {
    e.preventDefault;
    let positionIndex = this.gallerie.findIndex((media) => media === this.url);
    let positionInfo = this.titres.findIndex((info) => info === this.titre);
    let positionAlt = this.alts.findIndex((alt) => alt === this.alt);
    if (positionIndex === this.gallerie.length - 1) {
      positionIndex = -1;
      positionInfo = -1;
      positionAlt = -1;
    }
    this.afficheMedia(
      this.gallerie[positionIndex + 1],
      this.alts[positionAlt + 1],
      this.titres[positionInfo + 1],
      this.titleCourant
    );
  }

  // Méthode qui gère le bouton prev et affiche l'image precédente
  prev(e) {
    e.preventDefault;
    let positionIndex = this.gallerie.findIndex((media) => media === this.url);
    let positionInfo = this.titres.findIndex((info) => info === this.titre);
    let positionAlt = this.alts.findIndex((alt) => alt === this.alt);
    if (positionIndex === 0) {
      positionIndex = this.gallerie.length;
      positionInfo = this.titres.length;
      positionAlt = this.alts.length;
    }
    this.afficheMedia(
      this.gallerie[positionIndex - 1],
      this.alts[positionAlt - 1],
      this.titres[positionInfo - 1],
      this.titleCourant
    );
  }

  // Méthode qui affiche soit une image soit une video en fonction de l'élément cliqué
  afficheMedia(url, alt, titre, title) {
    this.url = null;
    this.alt = null;
    this.titre = null;
    const conteneur = this.element.querySelector(".lightbox__container");
    if (url.indexOf("jpg") > -1) {
      conteneur.innerHTML = `
            <img src="${url}" alt="${alt}" />
            <div class="lightbox__titre">${titre}</div>
      `;
      this.url = url;
      this.alt = alt;
      this.titre = titre;
    } else if (url.indexOf("mp4") > -1) {
      conteneur.innerHTML = `
            <video src="${url}" controls="" autoplay="" title="${title}"></video>
            <div class="lightbox__titre">${titre}</div>
      `;
      this.url = url;
      this.alt = alt;
      this.titre = titre;
    }
  }

  //Méthode qui va construire le DOM en prenant en paramètre l'url de l'image ou video
  constructionDom() {
    const dom = document.createElement("div");
    dom.classList.add("lightbox");
    dom.innerHTML = `
            <button class="lightbox__close" aria-label= "ferme la lightbox">Fermer</button>
            <button class="lightbox__next" aria-label = "média suivant">Suivant</button>
            <button class="lightbox__prev" aria-label = "média précédent">Précédent</button>
            <div class="lightbox__container"></div>
         `;
    dom
      .querySelector(".lightbox__close")
      .addEventListener("click", this.close.bind(this)); //appel la méthode close
    dom
      .querySelector(".lightbox__next")
      .addEventListener("click", this.next.bind(this)); //appel la méthode next
    dom
      .querySelector(".lightbox__prev")
      .addEventListener("click", this.prev.bind(this)); //appel la méthode prev
    return dom;
  }
}

export { lightbox };

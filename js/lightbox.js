//Class qui va faire la lightbox. Prends en parametres l'url des médias,
// le titre (ou alt) à afficher sous l'image
// ainsi que l'url du média ouvert dans la lightbox.
class lightbox {
  static initialisation() {
    // Récupère les éléménts du DOM qui contiennent des images et videos
    // et convertie cette nodeList en array
    const liens = Array.prototype.slice.call(
      document.querySelectorAll("img[src*='.jpg'], video[src*='mp4']")
    );
    const retirePremiereImage = liens.shift();
    // console.log(liens);
    const gallerie = liens.map((lien) => lien.getAttribute("src"));
    // console.log(gallerie);
    const titres = liens.map(
      (lien) => lien.nextElementSibling.childNodes[1].innerText
    );
    console.log(titres);

    liens.forEach((lien) => {
      lien.addEventListener("click", function (e) {
        e.preventDefault();
        // console.log(e.currentTarget);
        console.log(e.srcElement.nextElementSibling.childNodes[1].innerText);
        new lightbox(
          e.currentTarget.getAttribute("src"),
          e.srcElement.nextElementSibling.childNodes[1].innerText, // Permet de faire le alt et le titre
          gallerie,
          titres
        );
      });
    });
  }

  constructor(url, titreAlt, medias) {
    this.element = this.constructionDom(url);
    this.medias = medias;
    this.appuieClavier = this.appuieClavier.bind(this);
    this.afficheMedia(url, titreAlt);
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
    let positionIndex = this.medias.findIndex((media) => media === this.url);
    if (positionIndex === this.medias.length - 1) {
      positionIndex = -1;
    }
    this.afficheMedia(this.medias[positionIndex + 1]);
  }

  // Méthode qui gère le bouton prev et affiche l'image precédente
  prev(e) {
    e.preventDefault;
    let positionIndex = this.medias.findIndex((media) => media === this.url);
    console.log(this.medias);
    if (positionIndex === 0) {
      positionIndex = this.medias.length;
    }
    this.afficheMedia(this.medias[positionIndex - 1]);
  }

  // Méthode qui affiche soit une image soit une video en fonction de l'élément cliqué
  afficheMedia(url, titreAlt) {
    this.url = null;
    const conteneur = this.element.querySelector(".lightbox__container");
    if (url.indexOf("jpg") > -1) {
      conteneur.innerHTML = `
            <img src="${url}" alt="${titreAlt}" />
            <div class="lightbox__titre">${titreAlt}</div>
      `;
      this.url = url;
    } else if (url.indexOf("mp4") > -1) {
      conteneur.innerHTML = `
            <video src="${url}" controls></video>
            <div class="lightbox__titre">${titreAlt}</div>
      `;
      this.url = url;
    }
  }

  //Méthode qui va construire le DOM en prenant en paramètre l'url de l'image ou video
  constructionDom() {
    const dom = document.createElement("div");
    dom.classList.add("lightbox");
    dom.innerHTML = `
            <button class="lightbox__close">Fermer</button>
            <button class="lightbox__next">Suivant</button>
            <button class="lightbox__prev">Précédent</button>
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

let resPrenom = "";
let resNom = "";
let resEmail = "";
let resMessage = "";

let valeurInputPrenom = "",
  valeurInputNom = "",
  valeurInputEmail = "",
  valeurInputMessage = "";

const createModale = (dom, photographe) => {
  dom.innerHTML += `
      <div
    id="dialog"
    class="modale"
    role="dialog"
    aria-labelledby="dialog-title"
    aria-describedby="dialog-desc"
    aria-modal="true"
    tabindex="1"
  >
    <div class="modale__box box">
      <h1 class="box__titre">
        Contactez-moi <br />
        ${photographe}
      </h1>
      <form action="" method="post">
        <p class="box__para">
          <label for="prenom">Prénom</label>
          <input type="text" id="prenom" name="prenom" class="box__input prenom" />
          <span class="box__erreur erreur__prenom"></span>
        </p>
        <p class="box__para">
          <label for="nom">Nom</label>
          <input type="text" id="nom" name="nom" class="box__input nom" />
          <span class="box__erreur erreur__nom"></span>
        </p>
        <p class="box__para">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" class="box__input email" />
          <span class="box__erreur erreur__email"></span>
        </p>
        <p class="box__para">
          <label for="message">Votre message</label>
          <textarea
            name="message"
            id="message"
            cols="30"
            rows="10"
            class="box__input message"
          ></textarea>
          <span class="box__erreur erreur__message"></span>
        </p>
        <p>
          <button type="submit" class="box__submit">Envoyer</button>
        </p>
      </form>
      <button type="button" arial-label="close contact me" class="box__close">
        <svg
          width="42"
          height="42"
          viewBox="0 0 42 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M42 4.23L37.77 0L21 16.77L4.23 0L0 4.23L16.77 21L0 37.77L4.23 42L21 25.23L37.77 42L42 37.77L25.23 21L42 4.23Z"
            fill="white"
          />
        </svg>
      </button>
    </div>
  </div>
    `;

  const boutonEnvoyer = document.querySelector(".box__submit");
  boutonEnvoyer.addEventListener("click", validFormulaire);
};

//Fonction qui valide le formulaire si celui-ci est correctement rempli
//Met dans la console les éléments rentrés dans les inputs
function validFormulaire(e) {
  validAllInput();
  e.preventDefault();
  if (!resPrenom || !resNom || !resEmail || !resMessage) {
    return;
  } else {
    const modale = document.getElementById("dialog");
    modale.style.visibility = "hidden";
    const form = document.querySelector("form");
    form.reset();
    console.log(`
        Prénom : ${valeurInputPrenom}
        \nNom : ${valeurInputNom}
        \nEmail : ${valeurInputEmail}
        \nMessage : ${valeurInputMessage}
      `);
  }
}

//Permet d'écouter les inputs et d'afficher un message d'erreur
function validAllInput() {
  const input = document.querySelectorAll(".box__input");
  input.forEach((entree) => {
    if (entree.className == "box__input prenom") {
      validPrenom(entree);
      valeurInputPrenom = entree.value;
    } else if (entree.className == "box__input nom") {
      validNom(entree);
      valeurInputNom = entree.value;
    } else if (entree.className == "box__input email") {
      validEmail(entree);
      valeurInputEmail = entree.value;
    } else if (entree.className == "box__input message") {
      validMessage(entree);
      valeurInputMessage = entree.value;
    }
  });
}

// Fonction de validation du prénom (min 2 caractères sans chiffres)
function validPrenom(input) {
  const erreurPrenom = document.querySelector(".erreur__prenom");
  if (/(^[a-zA-Z])([a-zA-Z\-\'])/.test(input.value)) {
    erreurPrenom.innerHTML = "";
    resPrenom = true;
  } else {
    erreurPrenom.innerHTML = "Merci de rentrer un prénom valide";
    resPrenom = false;
  }
}

function validNom(input) {
  const erreurNom = document.querySelector(".erreur__nom");
  if (/(^[a-zA-Z])([a-zA-Z\-\'])/.test(input.value)) {
    erreurNom.innerHTML = "";
    resNom = true;
  } else {
    erreurNom.innerHTML = "Merci de rentrer un nom valide";
    resNom = false;
  }
}

function validEmail(input) {
  const erreurEmail = document.querySelector(".erreur__email");
  if (/^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/i.test(input.value)) {
    erreurEmail.innerHTML = "";
    resEmail = true;
  } else {
    erreurEmail.innerHTML = "Merci de rentrer une addresse mail valide";
    resEmail = false;
  }
}

function validMessage(input) {
  const erreurMessage = document.querySelector(".erreur__message");
  let message = input.value;
  if (message.length < 8) {
    erreurMessage.innerHTML =
      "Merci de saisir un message de plus de 8 caractères";
    resMessage = false;
  } else {
    erreurMessage.innerHTML = "";
    resMessage = true;
  }
}

export { createModale };

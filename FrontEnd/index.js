/* Déclarations des variables utilisable sur tout le fichier */

// constante pointe sur la div filtre et la gallery dans le DOM
const allFilters = document.querySelector(".all-filters");

const gallery = document.querySelector(".gallery");

// constante pointe sur éléments visibles après submit du login
const headButtons = document.querySelector(".head-buttons-container")

const modifyElements = document.querySelectorAll(".modify")

const login = document.getElementById("login")

// constantes MODAL 
const modalGallery = document.querySelector(".modal-gallery")

const link = document.querySelector(".js-modal")

const inputFile = document.getElementById('image');

const addImgButton = document.querySelector(".add-work-modal")

const modal2 = document.querySelector(".modal-addWork")

const backFromModal2 = document.querySelector(".arrow-back")

/* Fonctions réutilisable */

// Fonction création travaux et insère dans la gallery  ( potentiellement séparer en plus petites )
function addWork(figure) {
  // creation et stockage des nouveaux elements 
  let newFigure = document.createElement("figure")
  let newImage = document.createElement("img")
  let newFigcaption = document.createElement("figcaption")
  
  // création du contenu des nouveaux éléments
  newFigure.setAttribute("data-tag", figure.category.name)
  newFigure.setAttribute("data-id", figure.id)
  newImage.src = figure.imageUrl
  newImage.alt = figure.title
  newFigcaption = document.createTextNode(figure.title);

  // création de l'arborescance figure
  newFigure.appendChild(newImage)
  newFigure.appendChild(newFigcaption)

  // ajout de la figure dans le noeud gallery du DOM
  gallery.appendChild(newFigure)  
  
}

function addWorkModal(modalfigure) {
  // creation et stockage des nouveaux elements 
  let newFigure = document.createElement("figure")
  let newImage = document.createElement("img")
  let newFigcaption = document.createElement("figcaption")
  
  // création du contenu des nouveaux éléments
  newFigure.setAttribute("data-tag", modalfigure.category.name)
  newFigure.setAttribute("data-id", modalfigure.id)
  newImage.src = modalfigure.imageUrl
  newImage.alt = modalfigure.title
  newFigcaption = document.createTextNode("éditer");

  // création de l'arborescance figure
  newFigure.appendChild(newImage)
  newFigure.appendChild(newFigcaption)

  // ajout de la figure dans le noeud gallery du DOM
  modalGallery.appendChild(newFigure) 
  // ajout de fonctions
  addClass(newImage)
  addTrashIcon(newFigure)
}

// Fonction création button filtres et insère dans la div all-filters  ( potentiellement séparer en plus petites )
function addFilter(filter) {
    // Création des noeuds
    const filterButton = document.createElement("button")   
    // data-tag id des buttons
    filterButton.setAttribute("data-tag", filter.name);
    filterButton.setAttribute("data-id", filter.id);
    // texte sous les images
    filterButton.innerText = filter.name
    // insère travaux dans la div filter
    allFilters.appendChild(filterButton)
    // injection de la class filter aux buttons
    filterButton.classList.add("filter") 
}

// function pour effacer tout élément enfants d'un parent
function cleanChilds (parent) {
  // Tant qu'il y a au moins un enfant
  while (parent.childNodes.length > 0) {
    // On efface le dernier élément, jusqu'à 0 enfants
    parent.removeChild(parent.lastChild);
  }
};

// fonction gestinnaire des éléments admin
function adminElementsDisplay(adminElement) {
  if (localStorage.getItem("token")) {
    adminElement.style.display = "flex"
  } else {
    adminElement.style.display = "none"
  }
}

async function adminElementsHandler() {
  adminElementsDisplay(headButtons);

  modifyElements.forEach(modifyElement => {
  adminElementsDisplay(modifyElement)
  });

  if (localStorage.getItem("token")) {
    login.innerText = "logout"
    login.href = "./index.html"
    allFilters.style.visibility = "hidden"
    allFilters.style.marginTop = "0" + "px"

  } else {
    login.innerText = "login"
    allFilters.style.visibility = "visible"
  }

  login.addEventListener('click', () => {
    localStorage.clear();
  })
}

// fonction ajout d'une class 
function addClass(element) {
  element.classList.add('modal-works')
}

function addTrashIcon (element) {
  element.innerHTML += `<i class="fa-solid fa-trash-can trash-icon"></i>`

  const trashIcons = element.querySelector(".trash-icon")

    trashIcons.addEventListener("click", (e) => {
      if (confirm("Voulez-vous vraiment supprimer cet élément ?")) {
        deleteWork(element)
      }
    })
}

/* récupération des API pour l'ajout et le filtrage dynamique des travaux via fetch */

// stockage de la récupération des travaux dans une fonction asynch
function getWorks (filterId) {

  // requête API travaux
  fetch('http://localhost:5678/api/works')

    // récupération des données dans "response"
    .then((response) => {

      // requête en cas de réussite de l'opération 
      if (response.ok) {
      // récupération des données au format json
        return response.json()
      // sinon affiche problème réseau dans la console    
      } else {
        console.log('mauvaise réponse du réseau');
      }
    })

    // nouvelle requête et stock les données de response.json dans jsonFigureList 
    .then( jsonFigureList => {

      cleanChilds(gallery)
      cleanChilds(modalGallery)

      // Pour chacunes des figures des données du tableau récupérées, 
      jsonFigureList.forEach(jsonFigure => {
        // appel de la fonction addWork en fonction des catégories.
        // Tout est affiché si la catégorie n'est pas donnée 
        if (filterId == jsonFigure.category.id || filterId == null) {
          addWork(jsonFigure)
          
          addWorkModal(jsonFigure)
        }
        // si le filtre par défaut est renseigné, on affiche tous les works
        if (filterId == 0) {
          addWork(jsonFigure)
        }
      });
    })
    // affichage du potentiel problème avec le fetch
    .catch((error) => {
      console.log("il y a eu un problème avec l'opération fetch : " + error.message);
    })
}

// stockage de la récupération des catégories dans une fonction asynch
function getFilters () {
  
  // requête API catégories
  fetch('http://localhost:5678/api/categories')

  // récupération des données dans "response"
  .then((response) => {

    // requête en cas de réussite
    if (response.ok) {
    // récupération des données au format json
      return response.json()
    // sinon affiche un problème de réseau dans la console
    } else {      
      console.log('mauvaise réponse du réseau');
    }
  })
  // nouvelle requête et stock les données de response.json dans jsonFilterList
  .then ( jsonFilterList => {

    // Pour chacunes des figures des données du tableau récupérées, 
    jsonFilterList.forEach(jsonFilter => {

      // appel de la fonction addWork
      addFilter(jsonFilter)
      });
  })
  .then (() => {
    // pointe sur les bouttons filtre et stockage dans une variable 
    const buttons = document.querySelectorAll(".all-filters button");

    // ajout d'un évènement au click pour chaque boutons
    buttons.forEach((button) => {     

      button.addEventListener("click", function () {  

        let buttonTag = button.dataset.tag;
        let filterId = button.getAttribute("data-id") 

        // distinction pour chaque filtre, suppression de la class actived au click
        buttons.forEach((button) => button.classList.remove("actived"));
        // injection de la class actived sur le filtre cliqué
        this.classList.add("actived"); 

        // récupération des travaux API en fonction des filtres par catégorie  
        getWorks(filterId)
      })
    });
  })  
  // affichage du potentiel problème avec le fetch
  .catch((error) => {
    console.log("il y a eu un problème avec l'opération fetch : " + error.message);
  })
}

// Fonction fetch methode post pour poster des nouveaux travaux
const postWork = (element) => {

  element.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputs = element.querySelectorAll("input, select");
    let emptyFields = [];

    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].value.trim() === "") {
        emptyFields.push(inputs[i]);
      }
    }

    if (emptyFields.length > 0) {
      for (let i = 0; i < emptyFields.length; i++) {
        let errorMessage = emptyFields[i].nextSibling;

        if (!errorMessage || errorMessage.className !== "error-message") {
          errorMessage = document.createElement("div");
          errorMessage.innerHTML = "Ce champ est obligatoire";
          errorMessage.className = "error-message";
          emptyFields[i].parentNode.insertBefore(errorMessage, emptyFields[i].nextSibling);
        }
      }
      return;
    }

    // Récupérer les valeurs des champs du formulaire
  const title = document.getElementById('title').value;
  const category = document.getElementById('category').value;
  const file = inputFile.files[0]

  // Créer un objet FormData pour envoyer les données du formulaire
  const formData = new FormData();
  formData.append('title', title);
  formData.append('category', category);
  formData.append('image', file);

  // Encoder l'image en binaire
  const reader = new FileReader();
  reader.readAsBinaryString(file);

  reader.onload = () => {
    const binaryData = reader.result;

    // Envoyer la requête AJAX
    fetch('http://localhost:5678/api/works', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'accept': 'application/json'
      },
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      getWorks()
    })
    .catch(error => {
      console.error(error);
    });
  };
});
}

// Fonction fetch methode delete pour supprimer des travaux
const deleteWork = async (element) => {

  fetch('http://localhost:5678/api/works/' + element.getAttribute("data-id"), {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('mauvaise réponse du réseau');
      
      } else {
        element.remove()
        getWorks()
      }
    })
    .catch(error => console.error('il y a une erreur :', error));
}


async function main() {
  getWorks();
  getFilters();
  await adminElementsHandler();
};

main();

let modal = null

const openModal = function (e) {
  e.preventDefault()
  const target = document.querySelector(e.target.getAttribute('href'))
  target.style.display = null
  target.removeAttribute('aria-hidden')
  target.setAttribute('aria-modal', 'true')
  modal = target;
  modal.addEventListener('click', closeModal)
  modal.querySelector(".close-modal").addEventListener('click', closeModal)
  modal.querySelector(".modal").addEventListener('click', stopPropagation)
  modal2.addEventListener('click', stopPropagation)
  modal2.querySelector(".close-modal").addEventListener('click', closeModal)
}

link.addEventListener("click", openModal)

const closeModal = function (e) {
  if (modal === null) return
  e.preventDefault()
  modal.style.display = "none"
  modal.setAttribute('aria-hidden', 'true')
  modal.removeAttribute('aria-modal')
  modal.removeEventListener('click', closeModal)
  modal.querySelector(".close-modal").removeEventListener('click', closeModal)
  modal.querySelector(".modal").removeEventListener('click', stopPropagation)
  modal = null;
}

const stopPropagation = function (e) {
  e.stopPropagation()
}

// Ajout d'un événement sur l'input file pour afficher la prévisualisation de l'image
inputFile.addEventListener('change', () => {
  // Récupération du fichier sélectionné
  const file = inputFile.files[0];

    // Création d'un objet FileReader pour afficher la prévisualisation de l'image
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      // Création d'un élément img pour afficher la prévisualisation de l'image
      const img = document.createElement('img');
      // Ajout d'un écouteur d'événement sur le click de l'image
      img.addEventListener('click', () => {
      // Déclenchement de l'événement click de l'élément input file
      inputFile.click();
      });
      img.src = reader.result;
      img.style.maxWidth = '125px';
      img.alt = 'Prévisualisation de l\'image';

      // Ajout de l'élément img à la page
      const preview = document.querySelector('.add-img');
      preview.innerHTML = '';
      preview.appendChild(img);
    });

    // Lecture du fichier en tant que URL data
    reader.readAsDataURL(file);
});

addImgButton.addEventListener('click', () => {
  if (modal2.style.display = "flex") {
    const postWorkForm = document.getElementById('post-work')
    postWork(postWorkForm);
  }
  modal.querySelector(".modal").style.display = "none"
})

backFromModal2.addEventListener('click', () => {
  modal2.style.display = "none"
  modal.querySelector(".modal").style.display = "grid"
})

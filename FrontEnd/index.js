/* Déclarations des variables utilisable sur tout le fichier */

// constante pointe sur la div filtre et la gallery dans le DOM
const allFilters = document.querySelector(".all-filters");

const gallery = document.querySelector(".gallery");

// constante pointe sur éléments visibles après submit du login
const headButtons = document.querySelector(".head-buttons-container")

const modifyElements = document.querySelectorAll(".modify")

const login = document.getElementById("login")

/* Fonctions réutilisable */

// fonction gestinnaire des éléments admin
function adminElementsHandler(adminElement) {
  if (localStorage.getItem(1)) {
    adminElement.style.display = "flex"
  } else {
    adminElement.style.display = "none"
  }
}

adminElementsHandler(headButtons);

modifyElements.forEach(modifyElement => {
  adminElementsHandler(modifyElement)
});

if (localStorage.getItem(1)) {
  login.innerText = "logout"
} else {
  login.innerText = "login"
}

if (localStorage.getItem(1)) {
  allFilters.style.visibility = "hidden"
  allFilters.style.marginTop = "0" + "px"
} else {
  allFilters.style.visibility = "visible"
}

login.addEventListener('click', () => {
  localStorage.clear();
})

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


/* récupération des API pour l'ajout et le filtrage dynamique des travaux via fetch */

// stockage de la récupération des travaux dans une fonction asynch
async function getWorks (filterId) {

  // requête API travaux
  await fetch('http://localhost:5678/api/works')

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
      // Pour chacunes des figures des données du tableau récupérées, 
      jsonFigureList.forEach(jsonFigure => {
        // appel de la fonction addWork en fonction des catégories.
        // Tout est affiché si la catégorie n'est pas donnée 
        if (filterId == jsonFigure.category.id || filterId == null) {
          addWork(jsonFigure)
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
async function getFilters () {
  
  // requête API catégories
  await fetch('http://localhost:5678/api/categories')

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
  .then ( () => {
    // pointe sur les bouttons filtre et stockage dans une variable 
    const buttons = document.querySelectorAll(".all-filters button");

    // ajout d'un évènement au click pour chaque boutons
    buttons.forEach((button) => {     

      button.addEventListener("click", function () {  

        let buttonTag = button.dataset.tag;
        let filterId = button.getAttribute("data-id") 
        // console.log(buttonTag);
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

async function main() {
  await getWorks();
  await getFilters();
};

main();


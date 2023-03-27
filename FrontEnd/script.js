
/* Déclarations des variables utilisable sur tout le fichier */

// constante pointe sur la div filtre et la gallery dans le DOM
const allFilters = document.querySelector(".all-filters");

const gallery = document.querySelector(".gallery");


/* Fonctions pour la partie filtres et gallery */

// Fonction création travaux et insère dans la gallery  ( potentiellement séparer en plus petites )


function addWork(figure) {

  // creation et stockage des nouveaux elements 
  let newFigure = document.createElement("figure")
  let newImage = document.createElement("img")
  let newFigcaption = document.createElement("figcaption")
  
  // création et stockage du contenu des nouveaux éléments
  newImage.src = figure.imageUrl
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
    
    // injection de la class not-actived aux buttons
    filterButton.classList.add("not-actived")

    // texte sous les images
    filterButton.innerText = filter.name
                
    // insère travaux dans la div filter
    allFilters.appendChild(filterButton)   
    console.log(filterButton);                       
}
 

/* récupération des API pour l'ajout et le filtrage dynamique des travaux via fetch */

// stockage de la récupération des travaux dans une fonction asynch
async function getWorks () {

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

      // Pour chacunes des figures des données du tableau récupérées, 
      jsonFigureList.forEach(jsonFigure => {
        // appel de la fonction addWork 
        addWork(jsonFigure)
      });
    })
    // affichage du potentiel problème avec le fetch
    .catch((error) => {
      console.log("il y a eu un problème avec l'opération fetch : " + error.message);
    })
}

getWorks()

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
  // affichage du potentiel problème avec le fetch
  .catch((error) => {
    console.log("il y a eu un problème avec l'opération fetch : " + error.message);
  })
}

getFilters();

/* Déclarations des variables utilisable sur tout le fichier */

// constante pointe sur la div filtre et la gallery dans le DOM
const allFilters = document.querySelector(".all-filters")

const gallery = document.querySelector(".gallery")


/* Fonctions pour la partie filtres et gallery */

// Fonction création travaux et insère dans la gallery  ( potentiellement séparer en plus petites )


function addWork() {

  // creation et stockage des nouveaux elements 
  let newFigure = document.createElement("figure")
  let newImage = document.createElement("img")
  let newFigcaption = document.createElement("figcaption")
  
  // création et stockage du contenu des nouveaux éléments
  // newImage.src = figure.imageUrl
  // newFigcaption = document.createTextNode(figure.title);

  // création de l'arborescance figure
  newFigure.appendChild(newImage)
  newFigure.appendChild(newFigcaption)

  // ajout de la figure dans le noeud gallery du DOM
  gallery.appendChild(newFigure)  
}


// Fonction création button filtres et insère dans la div all-filters  ( potentiellement séparer en plus petites )
function addFilter() {
    // Création des noeuds
    const filterButton = document.createElement("button")

    // texte sous les images
    filterButton.innerText = ""
                
    // insère travaux dans la div filter
    allFilters.appendChild(filterButton)   
    console.log(filterButton);                       
}


/* Création class pour faciliter le traitement après récupération des API via le fetch */

// Création d'une class Figure 
class Figure {
  constructor(jsonFigure){
    jsonFigure && Object.assign(this, jsonFigure)
  }
}

// Création d'une class Filter   
  class Filter {
    constructor(jsonFilter){
      jsonFilter && Object.assign(this, jsonFilter)
    }
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
        // stockage d'une nouvelle instance de la class Figure dans une variable figure
        let figure = new Figure(jsonFigure)
        addWork(figure.image)
      });
    })
    // affichage du potentiel problème avec le fetch
    .catch((error) => {
      console.log("il y a eu un problème avec l'opération fetch : " + error.message);
    })
}

getWorks()



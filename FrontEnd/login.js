/* Déclarations des variables utilisable sur tout le fichier */

// constante pointe sur les éléments du formulaire dans le DOM
const loginForm = document.querySelector("form")

/* Fonctions réutilisable */


// fonction gestionnaire du formulaire a la souscription de l'utilisateur 
const fetchHandler = async () => {

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    // recupération des données des inputs du formulaire
    const formData = new FormData(loginForm)
    const data = Object.fromEntries(formData)
  
  // fetch POST
  try {
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const dataResponse = await response.JSON()
    console.log(dataResponse);

  } catch (error) {
    console.log(error);
  }

  })
};

fetchHandler();
  



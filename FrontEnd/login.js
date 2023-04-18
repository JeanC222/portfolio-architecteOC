/* Déclarations des variables utilisable sur tout le fichier */

const loginForm = document.querySelector("form")

const inputEmail = document.getElementById("email")
const inputPassword = document.getElementById("password")

/* Fonctions réutilisable */

// fonction ajout de la class usernotfound
function addUserNotFoundClass (element) {
  element.classList.add("usernotfound")
}

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

    // attente de la réponse au format json
    const dataResponse = await response.json();

    // si la réponse est bonne, redirection page admin et stockage token.
    if (response.ok) {
      localStorage.setItem("token", dataResponse.token)
      location.href = "./index.html"
    } else {
      addUserNotFoundClass (inputEmail)
      addUserNotFoundClass (inputPassword)

      const errorMessage = document.querySelector(".errormessage");
      errorMessage.style.visibility = "visible";
    }

  } catch (error) {
    console.log(error);
  }

  })
};

fetchHandler();

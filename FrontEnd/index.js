class Figure {
  constructor(jsonFigure){
    jsonFigure && Object.assign(this, jsonFigure)
  }
}

class Filter {
  constructor(jsonFilter){
    jsonFilter && Object.assign(this, jsonFilter)
  }
}

// new Figure(jsonFigure);


//  récupérations et ajout des travaux 
const works = fetch('http://localhost:5678/api/works')
  .then( data => data.json())
  .then( jsonFigureList => {
      for (let jsonFigure of jsonFigureList) {
      let figure = new Figure(jsonFigure);
      document.querySelector(".gallery").innerHTML += `<figure>
      <img src=${figure.imageUrl} alt="Abajour Tahina">
      <figcaption>${figure.title}</figcaption>
    </figure>`
  }




//  récupération et ajout des filtres par catégoris
fetch('http://localhost:5678/api/categories')
  .then( data => data.json())
  .then( jsonFilterList => {
  for (let jsonFilter of jsonFilterList) {
    let filter = new Filter(jsonFilter);
    document.querySelector(".all-filters").innerHTML += `<button id=${filter.id} class="not-actived">${filter.name}</button>`
      
    

    const filters = document.querySelectorAll(".not-actived")
    filters.forEach((filter) => {

        filter.addEventListener('click', function(e) {
          let nbFiltersClassNotActived = filter.classList.replace("not-actived", "actived")
          if (nbFiltersClassNotActived = true) {
    //         document.querySelector(".gallery").innerHTML += `<figure>
    //   <img src=${figure.imageUrl} alt="Abajour Tahina">
    //   <figcaption>${figure.title}</figcaption>
    // </figure>`
          }

          // console.log(nbFiltersClassNotActived);
          
        // document.querySelectorAll(".actived")

        // if (nbFiltersClassActived.length >1) {
        //   let nbFiltersClassActived = filter.classList.replace("actived", "not-actived")
          // console.log(nbFiltersClassActived);
        // }

       })

      })
      // // for (let jsonFigure of jsonFigureList) {
      // // // console.log(filter.id);
      // // if (jsonFigure.categoryId !== filter.id) {
      // //   document.querySelector(".gallery").innerHTML = 0
      // // }
      // // console.log(jsonFigure.categoryId);
      // }
    }
    })

  


  });


 


    // const filters = document.querySelectorAll(".filter")

    // filters.forEach((filter) => {
    //   filter.classList.add("not-actived")
      

    //   filter.addEventListener('click', function(e) {
    //     filter.classList.replace("not-actived", "actived")
    //     e.preventDefault();
        
        
    //   })

    //   let id = this.id
    //   console.log(e.target = id);



    //     filter.addEventListener('click', (e) => {
    //       filter.classList.replace("not-actived", "actived");
    //       console.log(e.target.classList.value);
    //       if (e.target.classList.value === "filter not-actived") {            
    //       } else {           
    //       }          
    //     });   


    //   })




// window.onload = () => {
//   document.getElementById("default-button").getFocus()
// }   



















// // let images = document.querySelectorAll("img")

// // // fetch('/Portfolio-architecte-sophie-bluel/Backend/images').then(function(response) {
// // //     if(response.ok) {
// // //       response.blob().then(function(myBlob) {
// // //         var objectURL = URL.createObjectURL(myBlob);
// // //         images.src = objectURL;
// // //         console.log(response);
// // //     });
// // //     } else {
// // //       console.log('Mauvaise réponse du réseau');
// // //     }
// // //   })
// // //   .catch(function(error) {
// // //     console.log('Il y a eu un problème avec l\'opération fetch : ' + error.message);
// // // });

// const gallery = document.querySelector(".gallery")

// const myImage = document.querySelectorAll(".gallery img");

// let projects = fetch('http://localhost:5678/api/works')
// .then(function(response) {
//   return response.blob();
// })
// .then(function(myBlob) {
//   const objectURL = URL.createObjectURL(myBlob);
//   myImage.src = objectURL;

//   for (const image of myImage) {
//     return console.log(image);
//   }
// });

// function addWork() {

//   const work = document.createDocumentFragment();
//   const figure = work
//     .appendChild(document.createElement("figure"))
//     .appendChild(document.createElement("image"))
//     .appendChild(document.createElement("figCaption"));
//   figure.textContent = "hello world";
  
//   gallery.parentNode.appendChild(work);

// }

// addWork();








// // let myImage = document.getElementById("")

// // fetch('http://localhost:5678/api/categories/').then(function(response) {
// //     if(response.ok) { 
// //         response.blob().then(function(myBlob) {
// //             var objectURL = URL.createObjectURL(myBlob);
// //             myImage.src = objectURL;
// //             });        
// //     } else {
// //         console.log('Mauvaise réponse du réseau');
// //     }
// // }).catch(function(error) {
// // console.log('Il y a eu un problème avec l\'opération fetch : ' + error.message);
// // });
// // console.log(myImage);


// // window.onload = addElement;
 
// // function addElement() { 
// //     // create a new btn element
// //     const newButton = document.createElement("button");
// //         newButton.classList.add("filter");
// //     // and give it some content
// //     const newContent = document.createTextNode("Objets");
     
// //     // add the text node to the newly created btn
// //     newButton.appendChild(newContent);
// //     // and the new btn to the parent div    
// //     const parentSection = document.querySelector(".all-filters");
// //         parentSection.appendChild(newButton);

// //     // add the newly created element and its content into the DOM
// //     // parentSection.parentNode.insertBefore(newButton, parentSection);
// // };
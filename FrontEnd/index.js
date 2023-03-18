// let images = document.querySelectorAll("img")

// // fetch('/Portfolio-architecte-sophie-bluel/Backend/images').then(function(response) {
// //     if(response.ok) {
// //       response.blob().then(function(myBlob) {
// //         var objectURL = URL.createObjectURL(myBlob);
// //         images.src = objectURL;
// //         console.log(response);
// //     });
// //     } else {
// //       console.log('Mauvaise réponse du réseau');
// //     }
// //   })
// //   .catch(function(error) {
// //     console.log('Il y a eu un problème avec l\'opération fetch : ' + error.message);
// // });

let myImage = document.querySelectorAll("img")

fetch('/Portfolio-architecte-sophie-bluel/Backend/images').then(function(response) {
    if(response.ok) {
    response.blob().then(function(myBlob) {
var objectURL = URL.createObjectURL(myBlob);
myImage.src = objectURL;
});
    } else {
console.log('Mauvaise réponse du réseau');
}
})
.catch(function(error) {
console.log('Il y a eu un problème avec l\'opération fetch : ' + error.message);
});
console.log(myImage);


window.onload = addElement;
 
function addElement() { 
    // create a new btn element
    const newButton = document.createElement("button");
        newButton.classList.add("filter");
    // and give it some content
    const newContent = document.createTextNode("Objets");
     
    // add the text node to the newly created btn
    newButton.appendChild(newContent);
    // and the new btn to the parent div    
    const parentSection = document.querySelector(".all-filters");
        parentSection.appendChild(newButton);

    // add the newly created element and its content into the DOM
    // parentSection.parentNode.insertBefore(newButton, parentSection);
};
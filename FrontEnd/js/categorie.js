// Déclaration variable et sélection

let nodeMainHTML = document.querySelector(".gallery")

//Fonction fetch allant chercher les infos
function getCategorie(){ 
  fetch("http://localhost:5678/api/categories/") //<- ici on on vient chercher le data sur le localhost
  .then((res) => res.json())
  .then((data) => {
    for(let i = 0; i< data.length; i ++){ // <- lancement de la boucle
      // déclarations de toutes les variables nécéssaire pour afficher et attribuer leur valeurs dynamiquement
        let id = data[i].userId;
        let title = data[i].title;
        let imageUrl = data[i].imageUrl;
        console.log(imageUrl);
        let categoryId = data[i].categoryId;
        let category = data[i].category;

      let article= 
        `
            <figure>
                <img crossorigin="anonymous" src='${imageUrl}' alt="${imageUrl}" >
                <figcaption>${title}</figcaption>
            </figure>
        `

        nodeMainHTML.innerHTML += article;
    }
  }).catch((err) => {
    alert(err);
  })

}

getCategorie();
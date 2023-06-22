const app = {
  projets: [],
  categories: [],
};

//Fonction pour le chargement et rechergement des données
function refreshData() {
  fetch("http://localhost:5678/api/works")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      app.projets = data;
      displayProjects(data);
      if (localStorage.getItem("token") !== "") {
        displayProjectsModal(data);
      }
    });
}

refreshData();

//Création des catégories

fetch("http://localhost:5678/api/categories")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    app.categories = data;
    const filtre = document.getElementById("filtre");
    data.forEach((category) => {
      const button = document.createElement("button");
      button.textContent = category.name;
      button.dataset.id = category.id;
      filtre.append(button);
    });
  })
  .then(function () {
    categorieEventListener();
  });

function categorieEventListener() {
  const buttons = document.querySelectorAll("#filtre button");
  buttons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      const categoryId = event.srcElement.dataset.id;
      const filtered = app.projets.filter(function (projet) {
        if (categoryId !== "tous") {
          return projet.categoryId === parseInt(categoryId, 10);
        } else {
          return projet;
        }
      });
      displayProjects(filtered);
      console.log(filtered);
    });
  });
}

function tousEventListener() {
  const tous = document.querySelectorAll(".tous");
  tous.forEach(function (button) {
    button.addEventListener("click", function (event) {
      displayProjects();
    });
  });
}

//function d'affichage des projets

function displayProjects(data) {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";
  data.forEach((projet) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");
    img.src = projet.imageUrl;
    img.alt = projet.title;
    figcaption.innerText = projet.title;
    figure.append(img, figcaption);
    gallery.appendChild(figure);
  });
}

//Affichage des images pour la modale

function displayProjectsModal(data) {
  const gallery = document.getElementById("galleryModal");
  gallery.innerHTML = "";
  data.forEach((projet) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");
    img.src = projet.imageUrl;
    img.alt = projet.title;
    const trash = document.createElement("div");
    trash.innerHTML = `<button class="trash" id="${projet.id}"> <i class="fa-regular fa-trash-can" id="${projet.id}"></i></button>`;

    figcaption.innerText = "éditer";
    figure.append(img, figcaption, trash);
    gallery.appendChild(figure);
  });
  document.querySelectorAll(".trash").forEach((a) => {
    a.addEventListener("click", deleteWork);
  });
}

function deleteWork(event) {
  event.preventDefault();
  const project = parseInt(event.target.id);
  const deleteButton = event.target;
  console.log(project);
  fetch(`http://localhost:5678/api/works/${project}`, {
    method: "DELETE",
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  }).then(function (response) {
    console.log(response);
    closeModal();
    refreshData();
  });
}
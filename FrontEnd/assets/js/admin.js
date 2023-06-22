if (localStorage.getItem("token") && localStorage.getItem("token") !== ""){
    displayOn()
}

function displayOn() {
    const target = document.querySelectorAll(".admin")
    target.forEach(element => {
       element.style.display = null
    });
    const target2 = document.querySelectorAll(".no-admin")
    target2.forEach(element => {
        element.style.display = 'none'
     });
}


function logout() {
    localStorage.removeItem('token')
}

document.querySelectorAll(".logout").forEach((e) => {
    e.addEventListener("click", logout);
  });
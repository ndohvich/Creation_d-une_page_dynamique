const loginError = document.querySelector(".erreur");
const LoginElement = document.createElement("p");
loginError.appendChild(LoginElement);

const formulaireLogin = document.querySelector(".form-login");
formulaireLogin.addEventListener("submit", async function(event) {
    event.preventDefault();
    const log = {
        email: event.target.querySelector("[name=email]").value,
        password: event.target.querySelector("[name=password]").value
    };
    const chargeUtile = JSON.stringify(log);
    console.log(chargeUtile);

    await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers : { "Content-Type": "application/json",
        'Access-Control-Allow-Origin':'*' },
        body: chargeUtile
    })
    .then(function (response){
        if (response.status === 200){
            return response.json();
        }
        else{
            LoginElement.innerText="Mot de passe et/ou e-mail invalide."
            document.getElementById('email').value="";
            document.getElementById('password').value="";
            return response.json();
        }
    })
    .then(function (Token){
        if(Token.token){
            localStorage.setItem('token', Token.token)
            console.log(localStorage)
            window.location.href="index.html"
        };
    })
});
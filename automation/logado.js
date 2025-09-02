function logar() {
  const user = document.getElementById("login-email").value;
  const pass = document.getElementById("login-password").value;

  if (user === "joao@gmail" && pass === "1234") {
    localStorage.setItem("logado", "true");
    irParaHome(); 
  } else {
    alert("Usuário ou senha inválidos!");
 
  }
}
/*
function logout(){
  localStorage.removeItem("logado");
  document.getElementById("home").style.display = "none";
  document.getElementById("login").style.display = "block";
}***/

function irParaHome() {
  window.location.href = "../Pages/PageHome.html";
}
/*
// quando a página abre, checa se já está logado
window.onload = () => {
  if(localStorage.getItem("logado") === "true"){
    mostrarHome();
  }
}
*/

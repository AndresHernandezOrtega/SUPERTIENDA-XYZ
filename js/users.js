// BOTON USUARIOS
const btn_usuarios = document.querySelector("nav ul #usuarios_btn")
const main = document.querySelector("main")

console.log("hol")

btn_usuarios.addEventListener("click",() => {

    main.className = "users"
})
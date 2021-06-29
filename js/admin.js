// GETE USER DATA FROM LOCAL STORAGE
let user_data = JSON.parse(localStorage.getItem("user_data"))

if (!user_data) {

    window.location.href = "../index.html"
}

// HEADER COMPORTAMIENTO
const closeMenu = (button) => {

    menu.style.top = "-400px"
    button.className = "fas fa-bars"

}
const openMenu = (button) => {

    menu.style.top = "unset"
    button.className = "fas fa-times"

}

const menu = document.querySelector("nav")
const button = document.querySelector("header i")

button.addEventListener("click", () => {


    if (button.className === "fas fa-bars") {
        
        openMenu(button)

    }else{

        closeMenu(button)
    }

})

const backHome = () => {

    document.querySelector("main").className = "home"
    document.querySelector(".home").innerHTML = `
            <h1>SISTEMA DE FACTURACION SUPERTIENDA XYZ</h1>
            <p>Bienvenido ${user_data.name} ${user_data.lastName ? user_data.lastName : "" }</p>
    `
}
const XYZ_logo = document.querySelector("#logo")
XYZ_logo.addEventListener("click", () => {

    backHome()
})



// CERRAR SESION
const btn_exit = document.querySelector("nav ul #cerrar_sesion")
btn_exit.addEventListener("click", () => window.location.href = "./login.html")

window.onload = () => {
    backHome()
}

window.onclose = () => {
    localStorage.removeItem("user_data")
}
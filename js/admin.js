// GETE USER DATA FROM LOCAL STORAGE
user_data = localStorage.getItem("user_data")

if (!user_data) {

    window.location.href = "../index.html"
}

// HEADER COMPORTAMIENTO
const closeMenu = (button) => {

    menu.style.top = "-300px"
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



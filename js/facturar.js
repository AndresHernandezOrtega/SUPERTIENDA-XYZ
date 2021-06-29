
// GETE USER DATA FROM LOCAL STORAGE
let user_data = JSON.parse(localStorage.getItem("user_data"))

if (!user_data) {

    window.location.href = "./login.html"
}

// DATOS DEL CAJERO 
document.querySelector(".seller_name").innerText += " " + user_data.name + " " + user_data.lastName

// BOTON SELECCIONAR

const functionsSelectBtns = () => {

    const selectClientsBtns = document.querySelectorAll(".addClient")
    selectClientsBtns.forEach(element => {
        
        element.addEventListener("click", () => {
    
            let id = element.parentElement.id
            localStorage.setItem("order_client", id)
            alert("CLIENTE SELECCIONADO CON N° DE IDENTIFICACIÓN " + id)
            document.querySelector(".select_client").style.display = "none"
        })
    });
}

// POST CLIENTE
const postClient = (client_id,
    client_name,
    client_lastName,
    client_phone_number,
    client_addres) => {

    
    axios.post('../controller/clients/postClient', {
        
        client_id: client_id,
        client_name: client_name,
        client_lastName : client_lastName,
        client_phone_number : client_phone_number,
        client_addres : client_addres
        })
        .then((response) => {
            console.log(response.data)
            alert("CLIENTE REGISTRADO")
        },

        (error) => {
        console.log(error)
        });
}

const renderSuggestionsClients = async (client_id) => {

    const suggestionsContainer = document.querySelector(".client_suggestions")
    suggestionsContainer.innerHTML = ""

    suggestionsContainer.innerHTML = await axios.get(`../controller/clients/getSuggestions?client_id=${client_id}`)
    .then((res) => {

        let clients = []

        if(res.data[0]){

            clients = res.data

        }else{

            clients.push(res.data)
        }
        
        
        let renderedClients = ""

        if(typeof clients !== "string"){
            
            for (const client of clients) {
                
                let renderedClient = `
        
                <div class="client" id="${client.client_id}">
                
                    <div class="info">
                        <h2>${client.client_name} ${client.client_lastName}</h2>
                        <p>N° Identificacion: ${client.client_id}</p>

                    </div>

                    <button class="button addClient"> Seleccionar <i class="fas fa-check-circle"></i></button>
        
                </div>
                `
                renderedClients += renderedClient
            } 
        }
        return renderedClients
        
    })

    functionsSelectBtns()
    

}
// BUSQUEDA DE CLIENTES
const input_search_clients = document.querySelector("#search_client")
input_search_clients.addEventListener("input", () => {

    renderSuggestionsClients(input_search_clients.value)
    functionsSelectBtns()
    
})

// ----------------------------------------------------------
// REGISTRAR CLIENTE 
const register_client_btn = document.querySelector("#register_client_btn")
const clients_container = document.querySelector(".clients_container")
const register_form = document.querySelector(".clients_container form")

register_client_btn.addEventListener("click", (e) => {

    e.preventDefault()
    let client_id = document.querySelector("#client_id").value
    let client_name = document.querySelector("#client_name").value
    let client_lastName = document.querySelector("#client_lastName").value
    let client_phone_number = document.querySelector("#client_phone_number").value
    let client_addres = document.querySelector("#client_addres").value
    


    if (client_id
        && client_name
        && client_lastName
        && client_phone_number
        && client_addres
        ){
            postClient(client_id, client_name, client_lastName, client_phone_number, client_addres)

    }
    register_form.reset()
})

// ABRIR FORM
document.querySelector(".create_user").addEventListener("click", () => clients_container.style.display  = "flex")

// CERRAR FORM
document.querySelector(".clients_container i").addEventListener("click", () => clients_container.style.display  = "none")

// ----------------------------------------------------------

window.onload = () => {

    localStorage.setItem("order_client", "")
    localStorage.setItem("order_detail", "[]")
}   

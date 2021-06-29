// FUNCIONES DE LOS BOTONES DE USUARIOS
const buttonsClientsFunctions = () =>{

    const buttonsUpdate = document.querySelectorAll(".update_client")
    const buttonsDelete = document.querySelectorAll(".delete_client")
    const buttonCloseUpdatSupplier = document.querySelector(".update_clients_container i")
    let form = document.querySelector(".update_clients_container")

    buttonCloseUpdatSupplier.addEventListener("click", () => form.style.display = "none")

    // BOTON ELIMINAR
    buttonsDelete.forEach(element => {
        
        element.addEventListener("click", () => {

            let id = element.parentElement.parentElement.id
        
            if(confirm("¿Desea eliminar el CLIENTE con IDENTIFICACION " + id + "?")){

                axios.delete(`../controller/clients/deleteClient`,{data: id})
                .then(res => {
    
                    console.log(res.data)
                    renderCLientsBoard()
    
                })
                .catch(err => console.error(err))
            }
        })

    });

    // BOTON MODIFICAR
    buttonsUpdate.forEach(element => {
        
        element.addEventListener("click", () => {

            // SELECCIONAR FORM DE UPDATE
            let id = element.parentElement.parentElement.id
            console.log(id)
            let formUpdate = document.querySelector(".update_clients_container")
            formUpdate.style.display = "flex"

            axios.get(`../controller/clients/updateClient?id=${id}`)
            .then(res => {

                let data = res.data
                console.log(data)

                // INPUTS

                document.querySelector(".update_clients_container form #Uclient_name").value = data.client_name
                document.querySelector(".update_clients_container form #Uclient_lastName").value = data.client_lastName
                document.querySelector(".update_clients_container form #Uclient_phone_number").value = data.client_phone_number
                document.querySelector(".update_clients_container form #Uclient_addres").value = data.client_addres
                
                // BOTON ACTUALIZAR INFO
                const updateClientInfoBtn = document.querySelector(".update_clients_container form #update_client_btn")
                updateClientInfoBtn.addEventListener("click", (e) => {

                    e.preventDefault()
                    
                    // INPUTS PARA CAMBIAR
                    let Uclient_name = document.querySelector(".update_clients_container form #Uclient_name").value
                    let Uclient_lastName = document.querySelector(".update_clients_container form #Uclient_lastName").value
                    let Uclient_phone_number = document.querySelector(".update_clients_container form #Uclient_phone_number").value
                    let Uclient_addres = document.querySelector(".update_clients_container form #Uclient_addres").value

                    axios.put("../controller/clients/updateClient",{

                        id : id,
                        client_name : Uclient_name,
                        client_lastName : Uclient_lastName,
                        client_phone_number : Uclient_phone_number,
                        client_addres : Uclient_addres
                    })
                    .then(res => {
                        
                        if(res.data === "GOOD"){

                            alert("SE HA ACTUALIZADO LA INFORMACION DEL CLIENTE")
                            window.location.reload(true)
                        }else{
                            console.log("error")
                        }
                        
                    })
                    .catch(err => {
                        console.error(err);
                    })

                })        

            })
        })
    });

    
}

// RENDER TABLERO DE CLIENTES REGISTRADOS
const renderCLientsBoard = () => {

    getAllClients() // ARRAY
    .then(clients => {

        let renderClients = ""
        for (const client of clients) {
            
            let renderClient = `
            <div class="client" id="${client.client_id}">
                    <div class="client_info">

                        <h2>CLIENTE: ${client.client_name } ${client.client_lastName }</h2>
                        <p>N° DE IDENTIFICACIÓN: ${client.client_id}</p>
                        <p>TELEFONO: ${client.client_phone_number}</p>
                        <p>DIRECCION: ${client.client_addres}</p>
                    </div>

                    <div class="buttons">
                        <button class="button update_client"><i class="fas fa-user-edit"></i></i></button>
                        <button class="button delete_client"><i class="fas fa-user-minus"></i></button>
                    </div>

                </div>
            `
            renderClients += renderClient
        }

        const clientsContainer = document.querySelector("main .registered_clients")
        clientsContainer.innerHTML = ""
        clientsContainer.innerHTML = renderClients
        buttonsClientsFunctions()
    })

        
    
}

// INSERTAR UN CLIENTE NUEVO
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
            renderCLientsBoard()
        },

        (error) => {
        console.log(error)
        });
}

async function getAllClients() {
    
    let clients = await axios.get("../controller/clients/getClients")
    .then(res => res.data)
    .catch(err => console.error(err))

    return clients
}



// BOTON CLIENTES
const btn_clients = document.querySelector("nav ul #clientes_btn")

btn_clients.addEventListener("click",() => {

    main.innerHTML = ""
    main.className = "clients"
    main.innerHTML = `

    <form id="register_client_form">

        <h2>Registrar Cliente</h2>
        <input type="text" id="client_id" placeholder="Numero de identificación" class="input_registro">
        <input type="text" id="client_name" placeholder="Nombres" class="input_registro">
        <input type="text" id="client_lastName" placeholder="Apellidos" class="input_registro">
        <input type="number" id="client_phone_number" placeholder="Numero de telefono" class="input_registro">
        <input type="text" id="client_addres" placeholder="Direccion" class="input_registro">
        
        <input type="submit" value="Registrar proveedor" id="register_client_btn">

    </form>

    <div class="registered_clients">

    </div>

    <div class="update_clients_container"> 

        <i class="fas fa-times"></i>
        <form class="form_update">

            <h2>Editar Informacion</h2>

            <input type="text" id="Uclient_name" placeholder="Nombres" class="input_registro">
            <input type="text" id="Uclient_lastName" placeholder="Apellidos" class="input_registro">
            <input type="number" id="Uclient_phone_number" placeholder="Numero de telefono" class="input_registro">
            <input type="text" id="Uclient_addres" placeholder="Direccion" class="input_registro">

            <input type="submit" value="Actualizar Cliente" id="update_client_btn">

        </form>
    </div>

    `

    const register_client_btn = document.querySelector("#register_client_btn")
    const formClient = document.querySelector("#register_client_form")
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
        formClient.reset()
    })

    renderCLientsBoard()
    closeMenu(button)
   

    
})
// FUNCIONES DE LOS BOTONES DE USUARIOS
const buttonsFunctions = () =>{

    const buttonsUpdate = document.querySelectorAll(".update_user")
    const buttonsDelete = document.querySelectorAll(".delete_user")
    const buttonCloseUpdate = document.querySelector(".update_container i")
    let form = document.querySelector(".update_container")

    buttonCloseUpdate.addEventListener("click", () => form.style.display = "none")

    // BOTON ELIMINAR
    buttonsDelete.forEach(element => {
        
        element.addEventListener("click", () => {

            let id = element.parentElement.parentElement.id

            if(confirm("¿Desea eliminar el usuario con IDENTIFICACION " + id + "?")){

                axios.delete(`../controller/deleteUser`,{data: id})
                .then(res => {
    
                    console.log(res.data)
                    renderUserBoard()
    
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
            let form = document.querySelector(".update_container")
            form.style.display = "flex"

            axios.get(`../controller/updateUser?id=${id}`)
            .then(res => {

                let data = res.data
                console.log(data)
                // TITULO 
                document.querySelector(".update_container form h2").innerText += ` ${data.name} ${data.lastName}`

                // INPUTS
                document.querySelector(".update_container form #Uemail").value = data.email
                document.querySelector(".update_container form #Uname").value = data.name
                document.querySelector(".update_container form #UlastName").value = data.lastName
                
                // BOTON ACTUALIZAR INFO
                const updateInfoBtn = document.querySelector(".update_container form #update_btn")
                updateInfoBtn.addEventListener("click", (e) => {

                    e.preventDefault()
                    
                    // INPUTS PARA CAMBIAR
                    let email = document.querySelector(".update_container form #Uemail").value
                    let name = document.querySelector(".update_container form #Uname").value
                    let lastName = document.querySelector(".update_container form #UlastName").value
                    let password = ""

                    if(document.querySelector(".update_container form #Upassword").value
                    && document.querySelector(".update_container form #Upassword").value
                    === document.querySelector(".update_container form #UconfPassword").value)
                    {

                        password = document.querySelector(".update_container form #Upassword").value
                        
                    }

                    axios.put("../controller/updateUser",{
                        id : id,
                        email : email,
                        name : name,
                        lastName : lastName,
                        password : password
                    })
                    .then(res => window.location.reload(true))
                    .catch(err => {
                        console.error(err);
                    })



                })
                
                

            })


        })
    });

    
}

// RENDER TABLERO DE USUARIOS REGISTRADOS
const renderUserBoard = () => {

    getAllUsers() // ARRAY
    .then(users => {

        let renderUsers = ""
        for (const user of users) {
            
            let renderUser = `
            <div class="user" id="${user.user_id}">
                    <div class="user_info">

                        <h2>${user.name}  ${user.lastName}</h2>
                        <p>${user.email}</p>
                        <p>${user.role === "admin" ? "Administrador" : "Vendedor"}</p>
                    </div>

                    <div class="buttons">
                        <button class="button update_user"><i class="fas fa-user-edit"></i></i></button>
                        <button class="button delete_user"><i class="fas fa-user-minus"></i></button>
                    </div>

                </div>
            `
            renderUsers += renderUser
        }

        const usersContainer = document.querySelector("main .registered_users")
        usersContainer.innerHTML = ""
        usersContainer.innerHTML = renderUsers
        buttonsFunctions()
    })

        
    
}

// INSERTAR UN USUARIO NUEVO
const postUser = (email,
    name,
    lastName,
    password,
    role
    ) => {

    
    axios.post('../controller/postUser.php', {
        
        email: email,
        name: name,
        lastName : lastName,
        password : password,
        role : role

        })
        .then((response) => {
            console.log(response.data)
            renderUserBoard()
        },

        (error) => {
        console.log(error)
        });
}

async function getAllUsers() {
    
    let users = await axios.get("../controller/getAllUsers")
    .then(res => res.data)
    .catch(err => console.error(err))

    return users
}



// BOTON USUARIOS
const btn_usuarios = document.querySelector("nav ul #usuarios_btn")
const main = document.querySelector("main")


btn_usuarios.addEventListener("click",() => {

    main.innerHTML = ""
    main.className = "users"
    main.innerHTML = `

    <form>

        <h2>Registrar usuario</h2>
        <input type="email" id="email" placeholder="Correo electronico" class="input_registro">
        <input type="text" id="name" placeholder="Nombre" class="input_registro">
        <input type="text" id="lastName" placeholder="Apellido" class="input_registro">
        <input type="password" id="password" placeholder="Contraseña" class="input_registro">
        <input type="password" id="conf_password" placeholder="Repetir contraseña" class="input_registro">
        
        <label for="role">Cargo</label>
        <select id="role">
            <option value="admin">Administrador</option>
            <option value="seller">Vendedor</option>
        </select>

        <input type="submit" value="Registrar usuario" id="registerBtn">

    </form>

    <div class="registered_users" id="">

    </div>

    <div class="update_container"> 

        <i class="fas fa-times"></i>
        <form class="form_update" id="">

            <h2>Editar Informacion de </h2>
            <input type="email" id="Uemail" placeholder="Correo electronico" class="input_registro">
            <input type="text" id="Uname" placeholder="Nombre" class="input_registro">
            <input type="text" id="UlastName" placeholder="Apellido" class="input_registro">

            <label for="Upassword">Cambiar contraseña</label>
            <input type="password" id="Upassword" placeholder="Contraseña" class="input_registro">
            <input type="password" id="UconfPassword" placeholder="Contraseña" class="input_registro">

            <input type="submit" value="Actualizar Informacion" id="update_btn">

        </form>
    </div>

    `

    const registerUserBtn = document.querySelector("#registerBtn")
    const form = document.querySelector("form")
    registerUserBtn.addEventListener("click", (e) => {

        e.preventDefault()
        let email = document.querySelector("#email").value
        let name = document.querySelector("#name").value
        let lastName = document.querySelector("#lastName").value
        let password = document.querySelector("#password").value
        let conf_password = document.querySelector("#conf_password").value
        let role = document.querySelector("#role").value


        if (email
            && name
            && lastName
            && password === conf_password
            && password
            && role){

                postUser(email,name,lastName,password,role)

        }
        form.reset()
    })

    renderUserBoard()
    closeMenu(button)
   

    
})
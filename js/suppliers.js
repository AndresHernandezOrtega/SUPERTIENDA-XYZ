// FUNCIONES DE LOS BOTONES DE USUARIOS
const buttonsSuppliersFunctions = () =>{

    const buttonsUpdate = document.querySelectorAll(".update_supplier")
    const buttonsDelete = document.querySelectorAll(".delete_supplier")
    const buttonCloseUpdatSupplier = document.querySelector(".update_suppliers_container i")
    let form = document.querySelector(".update_suppliers_container")

    buttonCloseUpdatSupplier.addEventListener("click", () => form.style.display = "none")

    // BOTON ELIMINAR
    buttonsDelete.forEach(element => {
        
        element.addEventListener("click", () => {

            let id = element.parentElement.parentElement.id

            if(confirm("¿Desea eliminar el PROVEEDOR con IDENTIFICACION " + id + "?")){

                axios.delete(`../controller/suppliers/deleteSupplier`,{data: id})
                .then(res => {
    
                    console.log(res.data)
                    renderSuppliersBoard()
    
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
            let formUpdate = document.querySelector(".update_suppliers_container")
            formUpdate.style.display = "flex"

            axios.get(`../controller/suppliers/updateSupplier?id=${id}`)
            .then(res => {

                let data = res.data
                console.log(data)

                // INPUTS
                document.querySelector(".update_suppliers_container form #Usupplier_name").value = data.supplier_name
                document.querySelector(".update_suppliers_container form #Usupplier_nit").value = data.supplier_nit
                document.querySelector(".update_suppliers_container form #Usupplier_phone").value = data.supplier_phone
                document.querySelector(".update_suppliers_container form #Usupplier_addres").value = data.supplier_addres
                
                // BOTON ACTUALIZAR INFO
                const updateSupplierInfoBtn = document.querySelector(".update_suppliers_container form #update_supplier_btn")
                updateSupplierInfoBtn.addEventListener("click", (e) => {

                    e.preventDefault()
                    
                    // INPUTS PARA CAMBIAR
                    let Usupplier_name = document.querySelector(".update_suppliers_container form #Usupplier_name").value
                    let Usupplier_nit = document.querySelector(".update_suppliers_container form #Usupplier_nit").value
                    let Usupplier_phone = document.querySelector(".update_suppliers_container form #Usupplier_phone").value
                    let Usupplier_addres = document.querySelector(".update_suppliers_container form #Usupplier_addres").value

                    axios.put("../controller/suppliers/updateSupplier",{

                        id : id,
                        Usupplier_name : Usupplier_name,
                        Usupplier_nit : Usupplier_nit,
                        Usupplier_phone : Usupplier_phone,
                        Usupplier_addres : Usupplier_addres
                    })
                    .then(res => {
                        
                        if(res.data === "GOOD"){

                            alert("SE HA ACTUALIZADO LA INFORMACION DEL PROVEEDOR")
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

// RENDER TABLERO DE PROVEEDORES REGISTRADOS
const renderSuppliersBoard = () => {

    getAllSuppliers() // ARRAY
    .then(suppliers => {

        let renderSuppliers = ""
        for (const supplier of suppliers) {
            
            let renderSupplier = `
            <div class="supplier" id="${supplier.supplier_id}">
                    <div class="user_info">

                        <h2>PROVEEDOR: ${supplier.supplier_name }</h2>
                        <p>NIT: ${supplier.supplier_nit}</p>
                        <p>TELEFONO: ${supplier.supplier_phone}</p>
                        <p>DIRECCION: ${supplier.supplier_addres}</p>
                    </div>

                    <div class="buttons">
                        <button class="button update_supplier"><i class="fas fa-user-edit"></i></i></button>
                        <button class="button delete_supplier"><i class="fas fa-user-minus"></i></button>
                    </div>

                </div>
            `
            renderSuppliers += renderSupplier
        }

        const suppliersContainer = document.querySelector("main .registered_suppliers")
        suppliersContainer.innerHTML = ""
        suppliersContainer.innerHTML = renderSuppliers
        buttonsSuppliersFunctions()
    })

        
    
}

// INSERTAR UN PROVEEDOR NUEVO
const postSupplier = (supplier_name,
    supplier_nit,
    supplier_phone,
    supplier_addres) => {

    
    axios.post('../controller/suppliers/postSupplier', {
        
        supplier_name: supplier_name,
        supplier_nit: supplier_nit,
        supplier_phone : supplier_phone,
        supplier_addres : supplier_addres

        })
        .then((response) => {
            console.log(response.data)
            renderSuppliersBoard()
        },

        (error) => {
        console.log(error)
        });
}

async function getAllSuppliers() {
    
    let users = await axios.get("../controller/suppliers/getSuppliers")
    .then(res => res.data)
    .catch(err => console.error(err))

    return users
}



// BOTON PROVEEDORES
const btn_suppliers = document.querySelector("nav ul #proveedores_btn")



btn_suppliers.addEventListener("click",() => {

    main.innerHTML = ""
    main.className = "suppliers"
    main.innerHTML = `

    <form id="register_supplier_form">

        <h2>Registrar Proveedor</h2>
        <input type="text" id="supplier_name" placeholder="Nombre del proveedor" class="input_registro">
        <input type="number" id="supplier_nit" placeholder="NIT del proveedor" class="input_registro">
        <input type="number" id="supplier_phone" placeholder="Numero de telefono" class="input_registro">
        <input type="text" id="supplier_addres" placeholder="Direccion" class="input_registro">
        
        <input type="submit" value="Registrar proveedor" id="register_supplier_btn">

    </form>

    <div class="registered_suppliers">

    </div>

    <div class="update_suppliers_container"> 

        <i class="fas fa-times"></i>
        <form class="form_update">

            <h2>Editar Informacion de </h2>
            <input type="text" id="Usupplier_name" placeholder="Nombre del proveedor" class="input_registro">
            <input type="number" id="Usupplier_nit" placeholder="NIT del proveedor" class="input_registro">
            <input type="number" id="Usupplier_phone" placeholder="Numero de telefono" class="input_registro">
            <input type="text" id="Usupplier_addres" placeholder="Direccion" class="input_registro">

            <input type="submit" value="Actualizar Proveedor" id="update_supplier_btn">

        </form>
    </div>

    `

    const register_supplier_btn = document.querySelector("#register_supplier_btn")
    const form = document.querySelector("#register_supplier_form")
    register_supplier_btn.addEventListener("click", (e) => {

        e.preventDefault()
        let supplier_name = document.querySelector("#supplier_name").value
        let supplier_nit = document.querySelector("#supplier_nit").value
        let supplier_phone = document.querySelector("#supplier_phone").value
        let supplier_addres = document.querySelector("#supplier_addres").value
        


        if (supplier_name
            && supplier_nit
            && supplier_phone
            && supplier_addres){

                postSupplier(supplier_name, supplier_nit, supplier_phone, supplier_addres)

        }
        form.reset()
    })

    renderSuppliersBoard()
    closeMenu(button)
   

    
})
const getSuggestions = async (product) => {

    let suggestions = await axios.get(`../controller/products/getSuggestions?product=${product}`).then(res => res.data)
    return renderProducts(suggestions)
}

const getSuppliers = async () => {

    let suppliers = await axios.get("../controller/suppliers/getSuppliers").then(res => res.data)
    return suppliers
}

const postProduct = (
    product_name,
    product_price,
    product_stock,
    product_supplier
) => {

    axios.post(`../controller/products/postProduct`, {
        product_name : product_name,
        product_price : product_price,
        product_stock : product_stock,
        product_supplier : product_supplier
    })
    .then(res => {
        renderAllProducts()
        alert("NUEVO PRODUCTO INGRESADO")
        
    })
}

const buttonsFunctionsProducts = () =>{

    const updateProductBtns = document.querySelectorAll(".product .edit")
    const deleteProductBtns = document.querySelectorAll(".product .delete")
    let form = document.querySelector(".update_product_container")
    // BOTON CERRAR FORM
    const buttonCloseProductsUpdate = document.querySelector(".update_product_container i")
    buttonCloseProductsUpdate.addEventListener("click", () => form.style.display = "none")

    // BOTON ELIMINAR
    deleteProductBtns.forEach(element => {
        
        element.addEventListener("click", () => {

            let id = element.parentElement.parentElement.id

            if(confirm("¿Desea eliminar el PRODUCTO con IDENTIFICACION " + id + "?")){

                axios.delete(`../controller/products/deleteProduct`,{data: id})
                .then(res => {
    
                    console.log(res.data)
                    renderAllProducts()
    
                })
                .catch(err => console.error(err))
            }
        })

    });

    //  BOTON MODIFICAR
    updateProductBtns.forEach(element => {
  
        element.addEventListener("click", () => {

            // SELECCIONAR FORM DE UPDATE
            let id = element.parentElement.parentElement.id
            let form = document.querySelector(".update_product_container")
            form.style.display = "flex"

            axios.get(`../controller/products/updateProduct?id=${id}`)
            .then(res => {

                let data = res.data
                console.log(data)

                // INPUTS
            
                document.querySelector(".update_product_container form #Uproduct_name").value = data.product_name
                document.querySelector(".update_product_container form #Uproduct_price").value = data.product_price
                document.querySelector(".update_product_container form #Uproduct_stock").value = data.product_stock
          
                // BOTON ACTUALIZAR INFO
                const update_product_btn = document.querySelector(".update_product_container form #update_product_btn")
                update_product_btn.addEventListener("click", (e) => {

                    e.preventDefault()
            
                    // INPUTS PARA CAMBIAR
                    let product_name = document.querySelector(".update_product_container form #Uproduct_name").value
                    let product_price = document.querySelector(".update_product_container form #Uproduct_price").value
                    let product_stock = document.querySelector(".update_product_container form #Uproduct_stock").value

                    axios.put("../controller/products/updateProduct",{
                    
                        id : id,
                        product_name : product_name,
                        product_price : product_price,
                        product_stock : product_stock

                    })
                    .then(res => {
                        if(res.data === "GOOD"){

                            alert("PRODUCTO ACTUALIZADO")
                            renderAllProducts()
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

// RENDERS FUNCTIONS
const renderAllProducts = async() => {

    // TODOS LOS PRODUCTOS CONTENEDOR
    const all_products_container = document.querySelector(".all_products")
    let products = await axios.get("../controller/products/getAllProducts").then(res => res.data)
    all_products_container.innerHTML = renderProducts(products)
    buttonsFunctionsProducts()
}

const renderProducts = (arrayProducts) => {

    let products = []
    if(arrayProducts[0]){

        products = arrayProducts

    }else{

        products.push(arrayProducts)
    }
    
    
    let renderedProducts = ""

    if(typeof products !== "string"){
        
        for (const product of products) {
            
            let renderedProd = `
    
            <div class="product" id="${product.product_id}">
            
                <div class="info">
                    <h2>${product.product_name}</h2>
                    <p>Precio: $${product.product_price}</p>
                    <p>Stock: ${product.product_stock} uds.</p>
                    <p>Proveedor: ${product.supplier_name}</p>
                </div>

                <div class="buttons">

                    <button class="button delete"><i class="fas fa-trash-alt"></i></button>
                    <button class="button edit"><i class="fas fa-edit"></i></i></button>

                </div>
    
            </div>
            `
            renderedProducts += renderedProd
        }
    }
    

    return renderedProducts
}

// BOTON PRODUCTOS
const btn_products = document.querySelector("nav ul #productos_btn")
btn_products.addEventListener("click",() => {

    main.innerHTML = ""
    main.className = "products"
    main.innerHTML = `

    <button class="register_product">Registrar un nuevo producto    <i class="fas fa-plus"></i></button>
    
    <label for="search_prod">Buscar Producto</label>
    <input type="text" id="search_prod" class="search_prod" placeholder="Nombre del producto">

    <div class="search_sug"></div>

    <h2>Todos los productos</h2>

    <div class="all_products"></div>

    <div class="create_container"> 

        <i class="fas fa-times"></i>
        <form class="form_update">

            <h2>Registrar Producto</h2>
            <input type="text" id="product_name" placeholder="Nombre del producto" class="input_registro">
            <input type="number" id="product_price" placeholder="COP $" class="input_registro">
            <input type="number" id="product_stock" placeholder="Uds. en stock" class="input_registro">

            <label for="supplier">Proveedor</label>
            <select id="supplier" class="select_supplier">

            </select>
            <input type="submit" value="Registrar" id="register_btn">

        </form>
    </div>

    <div class="update_product_container"> 

        <i class="fas fa-times"></i>
        <form class="form_product_update">

            <label for="Uproduct_name">Nombre del producto</label>
            <input type="text" id="Uproduct_name" placeholder="Nombre del producto" class="input_registro">

            <label for="Uproduct_price">Precio (COP)</label>
            <input type="number" id="Uproduct_price" placeholder="COP $" class="input_registro">

            <label for="Uproduct_stock">Stock del producto (uds)</label>
            <input type="number" id="Uproduct_stock" placeholder="Uds. en stock" class="input_registro">

            <input type="submit" value="Actualizar Informacion" id="update_product_btn">

        </form>
    </div>
    `
    

    
    // INPUT DE BUSQUEDA
    const busqueda_prod = document.querySelector("#search_prod")
    const div_suggestions = document.querySelector(".search_sug")
    busqueda_prod.addEventListener("input", async () => {

        if(busqueda_prod.value){

            div_suggestions.innerHTML = await getSuggestions(busqueda_prod.value.toUpperCase())
            buttonsFunctionsProducts()
        }
    })

    // BOTON DE REGISTRAR PRODUCTO 
    const open_register = document.querySelector(".register_product")
    const div_register_product = document.querySelector(".create_container")
    let product_supplier_select = document.querySelector("form .select_supplier")
    open_register.addEventListener("click", () => {



        getSuppliers().then(res => {

            product_supplier_select.innerHTML ="" 

            let suppliers = []

            if(res[0]){
                suppliers = res

            }else{
                suppliers[0] = res
            }

            let renderOptions = ""
            for (const supplier of suppliers) {
                
                let renderOption = `
                    <option value="${supplier.supplier_name}">${supplier.supplier_name}</option>
                `

                renderOptions += renderOption
            }

            product_supplier_select.innerHTML = renderOptions
        })
        div_register_product.style.display = "flex"

        
        

        const register_submit = document.querySelector("form #register_btn")
        const formRegister = document.querySelector(".create_container form")
        register_submit.addEventListener("click", (e) => {
            e.preventDefault()

            let product_name = document.querySelector("#product_name").value.toUpperCase()
            let product_price = document.querySelector("#product_price").value
            let product_stock = document.querySelector("#product_stock").value
            let product_supplier = product_supplier_select.value
                
            postProduct(product_name,
                product_price,
                product_stock,
                product_supplier)
            
            div_register_product.style.display = "none"
            formRegister.reset()
        })

    })

    // BOTON CERRAR REGISTRO
    const boton_cerrar_registro = document.querySelector(".create_container i")
    boton_cerrar_registro.addEventListener("click", () => div_register_product.style.display = "none")

    renderAllProducts()
    closeMenu(button)
})

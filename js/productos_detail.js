// OBTENER SUGGESTIONS
const getSuggestions = async (product) => {

    let suggestions = await axios.get(`../controller/products/getSuggestions?product=${product}`).then(res => res.data)
    return renderProducts(suggestions)
}

// RENDER SUGGESTIONS
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

                <button class="button addProduct">Añadir <i class="fas fa-plus-circle"></i></button>
            </div>
            `
            renderedProducts += renderedProd
        }
    }
    

    return renderedProducts
}

// BUTTON ADD PRODUCT
const buttonAddProduct = () => {

    const buttonsAdd = document.querySelectorAll(".addProduct")
    buttonsAdd.forEach(element => {
        
        
        element.addEventListener("click", () => {

            let details = JSON.parse(localStorage.getItem("order_detail"))

            let amount = parseInt(prompt("INGRESE LA CANTIDAD A FACTURAR","0"))
            let id = element.parentElement.id

            details.push({
                
                id : id,
                amount : amount
            })
            localStorage.setItem("order_detail", JSON.stringify(details))

            renderDetail()


        })
    });
}

// Renderizar Detalle de producto
const renderDetail = () => {

    // DETAIL CONTAINER

    let ids = JSON.parse(localStorage.getItem("order_detail"))
    let detail_container = document.querySelector(".added_products")
    let total_div = document.querySelector(".total_price p")

    let renderDetailProducts = ""
    let total = 0
    ids.forEach(async element => {  
        
        let data = await axios.get(`../controller/products/getProductById?id=${element.id}`)
        .then(res => res.data)

        renderDetailProducts += `
        
        <div class="product" id="${data.product_id}">
        
            <h2>${data.product_name}</h2>
            <p>CODIGO: ${data.product_id}</p>
            <p>CANTIDAD: ${element.amount}</p>
        </div>

        `

        total += parseInt(element.amount) * parseInt(data.product_price)
        total_div.innerText = total

        localStorage.setItem("total_order", total)

        detail_container.innerHTML = renderDetailProducts
    });

}

// INPUT BUSQUEDA DE PRODUCTOS

const busqueda_prod = document.querySelector("#search_product")
const div_suggestions = document.querySelector(".product_suggestions")
busqueda_prod.addEventListener("input", async () => {

    if(busqueda_prod.value){

        div_suggestions.innerHTML = await getSuggestions(busqueda_prod.value.toUpperCase())
        buttonAddProduct()
    }
})


// BOTON FACTURAR
const facturar_btn = document.querySelector(".facturar_btn")
facturar_btn.addEventListener("click", () => {

    if (localStorage.getItem("order_client") && localStorage.getItem("order_detail") !== "[]") {
        
        let total = parseInt(document.querySelector(".total_price p").innerText)
     
        let confirmFact = confirm("SE GENERARA UNA FACTURA A POR EL VALOR DE $" +  total + " DESDE EL CAJERO " +  user_data.name + " " + user_data.lastName )

        if (confirmFact) {
            
            window.location.href = "./factura.html"
        }

    }else if(!localStorage.getItem("order_client") ){
       alert("DEBE SELECCIONAR UN CLIENTE PARA FACTURAR")

    }else{
        alert("DEBE AÑADIR PRODUCTOS PARA FACTURAR")
    }
})
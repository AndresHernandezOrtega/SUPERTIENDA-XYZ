const renderOrdersBoard = () => {

    axios.get("../controller/orders/getAllOrders")
    .then(res => {

        let orders = res.data

        let renderedOrders = " "
        orders.forEach(element => {
        
        renderedOrders += `

        <div class="order" id="${element.order_id}">
            <div class="order_info">

                <h2>N° de factura: ${element.order_id}</h2>
                <p>Fecha: ${element.order_creation_date}</p>

            </div>

            <button class="button verPDF"><i class="fas fa-file-pdf"></i></button>


        </div>
            `
            
        });

        document.querySelector(".registered_orders").innerHTML = renderedOrders

    })
}

// BOTON FACTURAS
const btn_facturas = document.querySelector("nav ul #facturas")
btn_facturas.addEventListener("click",() => {

    main.innerHTML = ""
    main.className = "orders"
    main.innerHTML = `

    <div class="registered_orders">
        
    </div>

    `


    renderOrdersBoard()
    closeMenu(button)
   

    
})
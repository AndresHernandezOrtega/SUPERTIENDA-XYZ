const postOrder = async () => {

    let client_id = localStorage.getItem("order_client")
    let detail = JSON.parse(localStorage.getItem("order_detail"))
    let total_price = parseInt(localStorage.getItem("total_order"))
    let seller_name = JSON.parse(localStorage.getItem("user_data")).name + " " + JSON.parse(localStorage.getItem("user_data")).lastName 

    let order_data = await axios.post("../controller/orders/postOrder", {

        order_cliente_id : client_id,
        total_price : total_price,
        seller_name : seller_name
    })
    .then(res => res.data)

    const order_detail = []
    detail.forEach(element => {

        axios.post("../controller/detail/postDetail", {

            product_id : element.id,
            order_id : order_data.order_id,
            product_amount : element.amount
        })
        .then(res => order_detail.push(res.data))

    });

    console.log(order_detail,order_data, seller_name )
    renderOrder(order_detail,order_data, seller_name )

    
}

const renderOrder = (order_detail, order_data, seller_name) => {

    document.querySelector(".numero_fac").innerText += " " + order_data.order_id
    document.querySelector(".fecha_creacion").innerText += " " + order_data.order_creation_date
    document.querySelector(".cajero").innerText += " " + seller_name
    document.querySelector(".client_id").innerText += " " + order_data.order_cliente_id

    axios.get(`../controller/clients/getClientById?id=${order_data.order_cliente_id}`)
    .then(res => {

        let data = res.data
        document.querySelector(".client_name").innerText += " " + data.client_name
        document.querySelector(".client_lastName").innerText += " " + data.client_lastName
        document.querySelector(".client_phone").innerText += " " + data.client_phone_number
        document.querySelector(".client_addres").innerText += " " + data.client_addres
    })

    
    let detail = JSON.parse(localStorage.getItem("order_detail"))
    let newDetails = ""
    for (const product of detail) {

        axios.get(`../controller/products/getProductById?id=${product.id}`)
        .then(res => {
            
            let data = res.data
            console.log(data)
            newDetails += `
            <tr>
    
                <td>${data.product_id}</td>
                <td>${data.product_name}</td>
                <td>${product.amount}</td>
                <td>${data.product_price}</td>
            </tr>
            `
            document.querySelector("tbody").innerHTML = newDetails
        })
        
        updateStock(product.id ,product.amount)

    }        
        

    // console.log(newDetails)
}

const updateStock = (id, amount) => {

    axios.put("../controller/detail/updateProductStock", {
        id :id,
        amount :amount
    })
    .then(res => console.log(res))


}


if (!localStorage.getItem("user_data")
|| !localStorage.getItem("order_detail")
|| !localStorage.getItem("total_order")
|| !localStorage.getItem("order_client")) {
    
    window.location.href = "../index.html"
}

postOrder()

// BOTONES
const btn_imrpimir = document.querySelector(".btn_imrpimir")
btn_imrpimir.addEventListener("click", () => {
    window.print();
})

const btn_pdf = document.querySelector(".btn_pdf")
btn_pdf.addEventListener("click", () => {

    const $elementoParaConvertir = document.querySelector("main");

    html2pdf()
    .set({
        margin: 1,
        filename: 'factura.pdf',
        image: {
            type: 'jpeg',
            quality: 0.98
        },
        html2canvas: {
            scale: 3, // A mayor escala, mejores gráficos, pero más peso
            letterRendering: true,
        },
        jsPDF: {
            unit: "in",
            format: "a3",
            orientation: 'landscape' // landscape o portrait
        }
    })
    .from($elementoParaConvertir)
    .save()
    .catch(err => console.log(err));
})

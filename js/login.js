const getUser = async (email, password) => {

    try {
        
        let res = await fetch(`../controller/getUser.php?email=${email}&password=${password}`,{
    
            method : "GET",
            headers : {
                "Content-Type" : "application/json"
            }
        })
    
        let data = await res.json()
        return data

    } catch (error) {
        
        console.log(error)
    }
}



// COMPORTAMIENTO DEL FORM

const input_submit = document.getElementById("ingresar")


input_submit.addEventListener("click", async (e) => {

    e.preventDefault()
    let email = document.querySelector("#email")
    let password = document.querySelector("#password")
    const div_uncorrect_creds = document.querySelector(".uncorrect_creds")
    
    if (email.value && password.value) {
        
        userData = await getUser(email.value,password.value)
        console.log(typeof userData)
        
        if (typeof userData === "string") {
            
            div_uncorrect_creds.style.display = "block"

        }


        localStorage.setItem("user_data", JSON.stringify(userData))

            if (userData.role === "admin") {
                window.location.href = "admin_home.html"
        
            }else if(userData.role === "seller"){
                window.location.href = "seller_home.html"
            }

        
    }
    

})


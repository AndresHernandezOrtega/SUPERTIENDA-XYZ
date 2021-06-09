const getUser = async (email, password) => {

    try {
        
        let res = await fetch(`../controller/users.php?email=${email}&password=${password}`,{
    
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
    
    if (email.value && password.value) {
        
        userData = await getUser(email.value,password.value)
        
        if (userData.uncorrect_credentials) {
            
            console.log(userData)
        }

        console.log(userData)
    }
    

})
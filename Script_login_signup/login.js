let form=document.querySelector("#login form");
form.addEventListener("submit",(event)=>{

    event.preventDefault();
    let obj={}
    let inputlogin=document.querySelectorAll("form input")
    obj[inputlogin[0].id]=inputlogin[0].value;
    obj[inputlogin[1].id]=inputlogin[1].value;

    if (obj.email==""|| obj.password=="") {
        alert("Please fill all the Details")
        event.preventDefault();
    } else {
        login(obj)
    }
   

})

async function login(obj) {
    try {
        let getdat = await fetch("https://639b03f6d514150197480eef.mockapi.io/user/users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },

        })
        if (getdat.ok) {
            let data = await getdat.json()
            let flag = "No"
            data.forEach(element => {

                console.log(element.email,element.password)
                if (element.email != obj.email ) {
                    flag = "no"
                }
            });
            // if (flag == "yes") {
            //     alert("login successfully")
            // }else{
            //     alert("Wrong Credential")
            // }

        }
    } catch (error) {

    }
}
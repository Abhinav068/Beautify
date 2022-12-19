let form=document.querySelector("#login form");
form.addEventListener("submit",(event)=>{

    event.preventDefault();
    let obj={}
    let inputlogin=document.querySelectorAll("form input")
    obj[inputlogin[0].id]=inputlogin[0].value;
    obj[inputlogin[1].id]=inputlogin[1].value;

    if (obj.email==""|| obj.password=="") {
        swal("Please fill all the Details")
        event.preventDefault();
    } else {
        login(obj)
    }
   

})

function myFunction(){
    let pass= document.querySelector("#password")
    let show=document.querySelector("#showpass")
   
    if(pass.type==='password'){
        pass.type='text'
    }else{
        pass.type='password'
    }

    
}

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
            let flag = "no"
            let flag1= "yes"
            let flag2='yes'
            data.forEach(element => {
                 if(element.email == obj.email && element.password ==obj.password){
                    flag= "yes"
                    localStorage.setItem("username",element.firstname+element.lastname)
                }else if(element.email == obj.email && element.password !=obj.password){
                    flag1= "no"
                }else if(element.email != obj.email && element.password ==obj.password){
                    flag1= "no"
                }
            });
            if (flag == "yes") {

                localStorage.setItem("Status",true)
                swal({
                    title: "Congratulation!",
                    text: "Login successfully!",
                    icon: "success",
                    button: "ok",
                  }).then(function() {
                        history.back()
                        localStorage.setItem("status",true)




                });


                

            }else if(flag1=='no'){
                swal("Wrong password")
            }else if(flag2=="no"){
                swal("Wrong email")
            }else{
                swal("Wrong credential")
            }

        }
    } catch (error) {

    }
}

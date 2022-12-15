//selecting tag from html
let form = document.querySelector("#register form");

//adding eventlistner to register button
form.addEventListener("submit", (event) => {

    let obj = {}
    let allinput = document.querySelectorAll("form input")
    let gender = document.querySelectorAll(".gender")
    for (let i = 0; i < gender.length; i++) {
        if (gender[i].checked == true && gender[i + 1].checked == true) {
            alert("sorry you cant select both gender at time")
            event.preventDefault()
        } else if (gender[i].checked == true) {
            obj.gender = gender[i].value
        }
    }
    for (let i = 0; i < allinput.length - 3; i++) {
        obj[allinput[i].id] = allinput[i].value;
    }

    if (Object.keys(obj).length < 5) {
        alert("Please fill all the boxes")
        event.preventDefault();
    } else if (obj.email == "" || obj.firstname == "" || obj.lastname == "" || obj.password == "") {
        alert("Please fill all the boxes")
        event.preventDefault();
    } else {
        getdata(obj)
        event.preventDefault();
    }
})


let arr = []
async function getdata(obj) {
    try {
        let getdat = await fetch("https://639b03f6d514150197480eef.mockapi.io/user/users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },

        })
        if (getdat.ok) {
            let data = await getdat.json()
            let flag = "yes"
            data.forEach(element => {
                if (element.email == obj.email) {
                    flag = "no"
                }
            });
            if (flag == "yes") {
                register(obj)
            }else{
                alert("user already registerd")
            }

        }
    } catch (error) {

    }
}


//posting data to backend
async function register(obj) {

    try {

        let userdata = await fetch("https://639b03f6d514150197480eef.mockapi.io/user/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
        if (!userdata.ok) {
            alert("something went wrong")
        }else{
            alert("congratulation")
            window.location.href="login.html"
        }
       
    } catch (error) {

        alert("fetching error")
    }
}
let admin_id = null || localStorage.getItem('adminId');
let admin_pass = null || localStorage.getItem('adminPass');
let welcome = document.getElementById('Login');
let loginButton = document.getElementById('login-button');
let loginTry = 0;

checkLogIn()
function checkLogIn() {

    if (admin_id == 'abhinav' && admin_pass == 'admin') {
        localStorage.setItem('adminId', admin_id)
        localStorage.setItem('adminPass', admin_pass)
        welcome.innerHTML = `<div id='logged-in'>
                <h2>Welcome ${admin_id}</h2>
                <div><button id='logout-button'>Log Out</button></div>
            </div>`

        let logoutButton = document.getElementById('logout-button');
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('adminId');
            localStorage.removeItem('adminPass');
            console.log('logout');
            location.reload();
            alert('logout Successful');            
        })
    }
    else if ((!admin_id && !admin_pass)&&loginTry) {
        alert('please enter id & pass')
    }
    else {

        if (loginTry) alert('wrong credentials');
        loginTry++;
    }
}

loginButton.addEventListener('click', () => {
    admin_id = document.getElementById('admin-id').value;
    admin_pass = document.getElementById('admin-pass').value;
    checkLogIn();
})


// localStorage.removeItem('name');

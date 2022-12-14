let admin_id = 'admin';
let admin_pass = 'admin';
let welcome = document.getElementById('Login');
let loginButton = document.getElementById('login-button');

loginButton.addEventListener('click', () => {
    if (admin_id == 'admin' && admin_pass == 'admin') {
        console.log('signed in');
        welcome.innerHTML = `<h2>Welcome ${admin_id}</h2>`
        Append();
    }
})

function Append() {

}

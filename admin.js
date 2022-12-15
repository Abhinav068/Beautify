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
        startWork();
    }
    else if ((!admin_id && !admin_pass) && loginTry) {
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

function startWork() {
    let left_div = document.getElementById('left');
    // left_div.innerHTML=`<div id="success">
    // <div id="add" class='work' data-id=1>Add Product</div>
    // <div id="update" class='work' data-id=2>Update Product</div>
    // <div id="delete" class='work' data-id=3>Delete Product</div>
    // </div>`
    document.querySelectorAll('.work').forEach(el => {
        el.addEventListener('click', (e) => {
            console.log(e.target.dataset.id)
            let dowork=e.target.dataset.id;
            
        })
    })

    // template(work)
}

function template(work) {
    return `<div id="data_form">
                <!-- <h2>Add Products</h2> -->
                <div id="productDetails">
                    <span>Product Name :</span>
                    <div> <input type="text" class="u-full-width" placeholder="enter product name"></div>
                    <span>Enter Category :</span>
                    <div><select name="cars" id="cars">
                            <option value=''>Enter Category</option>
                            <option value="cat1">Lipstick</option>
                            <option value="cat2">Bosh</option>
                            <option value="newCat">other</option>
                        </select>
                    </div>
                    <span>Enter Customer Category :</span>
                    <div> <select id="Customer_type">
                            <option value="">Enter Customer Type</option>
                            <option value="volvo">Male</option>
                            <option value="saab">Female</option>
                        </select>
                    </div>
                    <span>Images :</span>
                    <div><input type="text" placeholder="enter image url"> <span style="border: none;">more</span></div>
                    <span>Description: </span>
                    <div><input type="text" placeholder="enter description"></div>
                    <span>Price : </span>
                    <div><input type="number" placeholder="enter description"></div>
                    <span>Discount and offers: </span>
                    <div><input type="number" placeholder="offer or discount"></div>
                    <div id="action-button-div"><button>ADD</button></div>
                </div>
            </div>`
}

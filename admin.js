let admin_id = null || localStorage.getItem('adminId');
let admin_pass = null || localStorage.getItem('adminPass');
let welcome = document.getElementById('Login');
let loginButton = document.getElementById('login-button');
let loginTry = 0;
let category = ['A', 'B', 'C', 'alpha', 'beta'];
let p_id_ele, p_name_ele, p_catg_ele, p_customer_ele, p_imgUrl_ele, p_desc_ele, p_price_ele, p_discount_ele;
let pro_id;
let loadObject = {};
let tempObj = {
    "name": "Maybelline New York Fit Me Mono Blush - 20 Hopeful",
    "image": [
        "https://images-static.nykaa.com/media/catalog/product/2/7/2734e50MAYBE00000411.jpg",
        "https://images-static.nykaa.com/media/catalog/product/2/7/2734e50MAYBE00000411_1.jpg",
        "https://images-static.nykaa.com/media/catalog/product/2/7/2734e50MAYBE00000411_2.jpg",
        "https://images-static.nykaa.com/media/catalog/product/2/7/2734e50MAYBE00000411_4.jpg"
    ],
    "des": "Explore the entire range of Blush available on Nykaa. Shop more Maybelline New York products here.You can browse through the complete world of Maybelline New York Blush.Alternatively, you can also find many more products from the Maybelline New York Fit Me Mono Blush range.",
    "rating": 4.8,
    "price": 193,
    "category": "Blush",
    "id": "3"
};

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
    let left_div = document.getElementById('success');
    left_div.innerHTML = `
    <div id="add" class='work' data-id=1>Add Product</div>
    <div id="update" class='work' data-id=2>Update Product</div>
    <div id="delete" class='work' data-id=3>Delete Product</div>
    `
    document.querySelectorAll('.work').forEach(el => {
        el.addEventListener('click', (e) => {
            
            console.log(e.target.dataset.id)
            let dowork = e.target.dataset.id;
            if (dowork == 1) { renderTemplate(1) }
            else if (dowork == 2) { updateProduct(2) }
            else { DeleteProduct() }
            //    document.getElementById('form_div').innerHTML= template(dowork);
        })
    })
}


function renderTemplate(value) {
    // template(1);
    if (value == 1) (document.getElementById('form_div').innerHTML = template(1));
    else if (value == 2) (document.getElementById('form_div').innerHTML = template(2));

    p_name_ele = document.getElementById('p_name');
    p_catg_ele = document.getElementById('catg');
    p_customer_ele = document.getElementById('Customer_type');
    p_imgUrl_ele = document.getElementById('img_url');
    p_desc_ele = document.getElementById('desc');
    p_price_ele = document.getElementById('price');
    p_discount_ele = document.getElementById('discount');
    document.getElementById('action-btn').addEventListener('click', () => {
        let check_entries = [p_name_ele, p_catg_ele, p_customer_ele, p_imgUrl_ele, p_desc_ele, p_price_ele, p_discount_ele].filter(el => !el.value.trim());
        //load data in loadObject;
        if (!check_entries.length) {
            dataLoading();
            // render on the right side for confirmation (ie, give a parameter to final action button)
            if (value == 1) render_to_confirm(1)
            else render_to_confirm(2)
        }
        else {
            alert('fill all entries')
        }
        //do POST request
    });
}

function updateProduct(value) {
    getProductID(value);
}

function DeleteProduct() {
    getProductID(3);
    // now fetch and render on the right side for confirmation (ie, give a parameter to final action button)
    // Now do the delete request

}

function getProductID(value) {
    document.getElementById('form_div').innerHTML = `<div id="data_form">
    ${value == 3 ? `<h2 id="heading">Delete Product</h2>` : ``}
   <div id="productDetails">
       <span>Product id :</span>
       <div> <input type="number" placeholder="enter product id" id='proId'></div>
       <div id="action-button-div"><button id='submit-id'>Submit</button></div>
        </div>
    </div>`
    document.getElementById('submit-id').addEventListener('click', async () => {
        pro_id = +document.getElementById('proId').value;
        //fetch data and render it
        if (pro_id) {
            let res;
            try {
                res = await fetch(`https://636b3a947f47ef51e12abb5f.mockapi.io/product_data/${pro_id}`);
            }
            catch (err) { alert('err is:',err) };

            console.log(res);
            tempObj = res.ok ? await res.json() || alert('no data found') : console.log('kuchh to gadbad hai')
            res.ok && tempObj ? (value == 2 ? (renderTemplate(value), unloading_to_form(tempObj), renderObjectData(tempObj)) : render_to_confirm(3)) : alert('something went wrong');

        } else {
            alert('provide id please')
        }; /* fetchData(pro_id) */



    })
}

function dataLoading() {
    // p_name_ele, p_catg_ele, p_customer_ele, p_imgUrl_ele, p_desc_ele, p_discount_ele,p_price_ele;
    loadObject.name = p_name_ele.value;
    loadObject.image = p_imgUrl_ele.value.trim().split('\n').filter(el => (el !== '')).map(el => el.trim());
    loadObject.des = p_desc_ele.value;
    loadObject.price = p_price_ele.value;
    loadObject.category = p_catg_ele.value;
    loadObject.customer_category = p_customer_ele.value;
    loadObject.discount = +p_discount_ele.value;

    console.log(loadObject);
}


function render_to_confirm(value) {
    value == 3 ? renderObjectData(tempObj) : renderObjectData(loadObject);
    let submitDiv = document.getElementById('final_submit_div');
    submitDiv.innerHTML = value == 1 ? `<div><button id='final_submit_btn'>Add</button></div>` : (value == 2 ? `<div><button id='final_submit_btn'>Update</button></div>` : `<div><button id='final_submit_btn'>Delete</button></div>`)
    console.log('yaha tak?', value)
    document.getElementById('final_submit_btn').addEventListener('click', () => {
        if(value == 1){
            alert("Data added succesfully")
        }
        else if(value == 2){
            alert("Data updated succesfully")
        }
        else if(value == 3){
            alert("Data deleted succesfully")
        }
        value == 1 ? postRequest(loadObject) : value == 2 ? putRequest(loadObject) : deletePost();
    })
}

async function postRequest(obj) {
    res = await fetch(`https://636b3a947f47ef51e12abb5f.mockapi.io/product_data/`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(obj)
    });

    console.log(await res.json())
    //post data to server
    // check if correctly posted and alert the same
    // reload the window
}

async function putRequest(obj) {
    res = await fetch(`https://636b3a947f47ef51e12abb5f.mockapi.io/product_data/${pro_id}`,{
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(obj)
    });

    console.log(await res.json())
    //post data to server
    // check if correctly posted and alert the same
    // reload the window
}
async function deletePost(){
    res = await fetch(`https://636b3a947f47ef51e12abb5f.mockapi.io/product_data/${pro_id}`,{
        method:'DELETE'       
    });

    console.log(await res.json())
}


function renderObjectData(obj) {
    function properName(str) {
        return str.trim().split('').map((a, b) => b == 0 ? a.toUpperCase() : a).join('');
    }
    let tempArr = [];
    let count = 7;
    for (let i in obj) {
        let tempobj = {};
        if (i == 'id') { tempobj.proId = 1; tempobj.id_name = properName(i); tempobj.id_value = obj[i]; count++; }
        else if (i == 'name') { tempobj.proId = 2; tempobj.id_name = properName(i); tempobj.id_value = obj[i]; count++; }
        else if (i == 'category') { tempobj.proId = 3; tempobj.id_name = properName(i); tempobj.id_value = obj[i]; count++; }
        else if (i == 'customer_category') { tempobj.proId = 4; tempobj.id_name = properName(i); tempobj.id_value = obj[i]; count++; }
        else if (i == 'des') { tempobj.proId = 5; tempobj.id_name = properName(i) + 'cription'; tempobj.id_value = obj[i]; count++; }
        else if (i == 'price') { tempobj.proId = 6; tempobj.id_name = properName(i); tempobj.id_value = obj[i]; count++; }
        else if (i == 'discount') { tempobj.proId = 7; tempobj.id_name = properName(i); tempobj.id_value = obj[i]; count++; }
        else { tempobj.proId = count; tempobj.id_name = properName(i); tempobj.id_value = obj[i]; count++; }
        tempArr.push(tempobj);
    }
    console.log(tempArr);
    tempArr = tempArr.sort((a, b) => a.proId - b.proId);
    document.getElementById('view_data').innerHTML = `
    <div><img src="${obj.image[0]}" alt="img1"></div>
    ${tempArr.map(el => {
        return el.id_name !== "Image" ? `<div><span class="pro_property">${el.id_name}: </span><br><div class="prop_value"> ${el.id_value} </div></div><br>` : ``;
    }).join('')
        }`;
}

function template(work) {
    return (work == 1 || work == 2) && `<div id="data_form">
                ${work == 1 ? `<h2 id="heading">Add Products</h2>` : `<h2 id="">Update Product</h2>`}
                <div id="productDetails">
                ${work == 2 ? `<div> Product id: ${pro_id ? pro_id : ``} </div>` : ``}
                    <span>Product Name :</span>
                    <div> <input type="text" class="u-full-width" id='p_name' placeholder="enter product name"></div>
                    <span>Enter Category :</span>
                    <div><input list="categ" id="catg" placeholder='enter or choose category'>
                    <datalist id="categ">
                    ${category.map((el) => { return `<option value=${el}>` }).join('')}
                      <option value="Safari">
                    </datalist>
                    </div>
                    <span>Enter Customer Category :</span>
                    <div> <select id="Customer_type">
                            <option value="">Enter Customer Type</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <span>Images :</span>
                    <div><textarea placeholder="enter image url on new line" rows="15" cols="30" id='img_url'></textarea><!-- <span style="border: none;">more</span> --></div>
                    <span>Description: </span>
                    <div><textarea placeholder="enter description" rows="15" cols="30" id='desc'></textarea></div>
                    <span>Price : </span>
                    <div><input type="number" placeholder="enter price" id='price'></div>
                    <span>Discount and offers: </span>
                    <div><input type="number" placeholder="offer or discount" id='discount'></div>
                    <div id="action-button-div"><button id='action-btn'>${work == 1 ? `Add ` : `Update`}</button></div>
                </div>
            </div>`
    //      `<div id="data_form">
    //     <h2>Delete Product</h2> 
    //    <div id="productDetails">
    //        <span>Product id :</span>
    //        <div> <input type="number" placeholder="enter product id"></div>
    //        <div id="action-button-div"><button>Submit</button></div>
    //         </div>
    //     </div>`
}

function unloading_to_form(obj) {
    console.log('data is unloading to form');
    // p_id_ele.value=obj.id; 
    p_name_ele.value = obj.name;
    p_imgUrl_ele.value = obj.image.join('\n\n');
    p_desc_ele.value = obj.des;
    p_price_ele.value = obj.price;
    p_catg_ele.value = obj.category;
    p_discount_ele.value = obj.discount;
}
document.querySelector("#index-button").addEventListener("click",()=>{
    window.location.href = "index.html"
})
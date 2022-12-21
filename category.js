import { dropmenu, navbar } from "./exoportNavBar.js";
import { footer } from "./footer.js";
document.querySelector("nav").innerHTML = navbar()
document.getElementById("drop").innerHTML = dropmenu()
document.getElementById("bottom-footer").innerHTML = footer()
let cart_items 
let totalProducts
let category_product 
let flag = false
let bagStatus = false;
let i = 0;
let user = localStorage.getItem("username") || ""
let status = localStorage.getItem("status")
if(status == "true"){
  document.getElementById("signin").innerText = user
}
let catImages = [
  "https://images-static.nykaa.com/uploads/ac95c943-d4dd-4e54-af76-4be9cbc57bd2.jpg?tr=w-1200,cm-pad_resize",
  "https://images-static.nykaa.com/uploads/37d7d387-0d26-403f-8bda-4a5b2b050b2c.jpg?tr=w-1200,cm-pad_resize",
  "https://images-static.nykaa.com/uploads/e0ff1cb8-28cd-4361-9bf0-0213e9abfea8.jpg?tr=w-1200,cm-pad_resize",
  "https://images-static.nykaa.com/uploads/898912d7-4e9e-42a1-9761-bee6330e39ca.jpg?tr=w-1200,cm-pad_resize"
];
let forward = document.querySelector("#forward")
let backward = document.querySelector("#backward")
forward.addEventListener("click", function () {
  start();
});

backward.addEventListener("click", function () {
  back();
});


function start() {
  let images = catImages;
  let container = document.getElementById("container");
  if (i < images.length) {
    container.style.backgroundImage = `url('${images[i]}')`;
    i++;
  } else {
    i = 0;
  }
};
function back() {
  let images = catImages;
  let container = document.getElementById("container");
  if (i >= 0) {
    container.style.backgroundImage = `url('${images[i]}')`;
    i--;
  } else {
    i = images.length - 1;
  }
};
//-----------------------------------------------------------------------------------------------------------------------------------------
let cat = localStorage.getItem("category") || "null"
window.addEventListener("load", () => {
  if (cat.toLowerCase() == "blush" || cat.toLowerCase() == "bronzer" || cat.toLowerCase() == "lipstic") {
    showData(cat)
  }
  else {
    fetch("https://636b3a947f47ef51e12abb5f.mockapi.io/product_data")
      .then((res) => res.json())
      .then(data => {
        totalProducts = data
        render(data)
      })
  }
})

//---------------------------------------------------------------------------------------------------------------------------------------
let categories = document.querySelectorAll("a")
for (let item of categories) {
  item.addEventListener("click", () => {
    if (item.innerText.toLowerCase() == "blush" || item.innerText.toLowerCase() == "bronzer" || item.innerText.toLowerCase() == "lipstic") {
      flag = true
      localStorage.setItem("category", item.innerText)
      showData(item.innerText)
    }
    else {
      flag = false
      fetch("https://636b3a947f47ef51e12abb5f.mockapi.io/product_data")
        .then((res) => res.json())
        .then(data => {
          totalProducts = data 
          render(data)
        })
    }
  })
}
//-----------------------------------------------------------------------------------------------------------------------------------------

function render(data) {
  let newData = data.map((item) => {
    return `  <div class = "cart_product" data-id= ${item.id}>
    <p style="color: #FC2779">FEATURED</p>
    <img src="${item.image[0]}" alt=""height="250" class = "info" data-id= ${item.id}>
    <p class="title_click"; style="text-align:center";>${item.name}</p>
    <p style="text-align:center">Price : ₹${item.price}</p>
    <p style="text-align:center">Rating : ${item.rating}</p>
    <div class="addToCart" data-id= ${item.id}>
        <p class="heart">&#9825</p>
        <p class="add" data-id= ${item.id}>Add To Bag</p>
    </div>
</div>`     
  })
  document.getElementById("product-cards").innerHTML = newData.join(" ")
  let x = document.querySelectorAll(".title_click");

  for (const item of x) {
      item.addEventListener("click",()=>{
          window.location.href = "Prodcut_detail.html";
      })
  }
  
      //For rendering image and description of product------------------------------------------------------
      let products = document.querySelectorAll(".info")
      for(let product of products){
        product.addEventListener("click",()=>{
          let id = product.dataset.id
          localStorage.setItem("product_id",id)
          window.location.href = "Prodcut_detail.html";
        })
      }


  //add to bag ----------------------------------------------------------------------------------------------
 
  let cart_item = JSON.parse(localStorage.getItem("cart_item")) || [];
  cart_items = document.querySelectorAll(".add")
  for (let item of cart_items) {
    item.addEventListener("click", () => {
      let id = item.dataset.id
      if (item.innerText == "Added To Bag") {
        item.innerText = "Added To Bag"
        item.style.backgroundColor = "brown";
      }
      else {
        item.innerText = "Added To Bag"
        item.style.backgroundColor = "brown";

        // Add to Cart--------->>>

        for (const product of totalProducts) {
          if (id == product.id) {
            let check = false;
            for (let i = 0; i < cart_item.length; i++) {
              if (product.id == cart_item[i].id) {
                check = true;
                break;
              }
            }
            if (check == false) {
              cart_item.push(product);
              localStorage.setItem("cart_item", JSON.stringify(cart_item));
              if (bagStatus == true) {
                cart();
              }
              alert("Item added Successfully");

            } else {
              alert("Item already in the Bag");
            }
          }
        }
          item.innerText = "Added To Bag"
          item.style.backgroundColor = "brown";
        
      }
    })
  }
  document.querySelector("#sorting-options").addEventListener("change",(event)=>{
    if(flag){
      sortArray(event.target.value,category_product)
    }
    else{
      sortArray(event.target.value,totalProducts)
    }
  })
  
}

//-------------------------------------------------------------------------------------------------------------------------------------------



//------------------------------------------------------------------------------------------------------------------------------------------
async function showData(category) {
  try {
    let data = await fetch("https://636b3a947f47ef51e12abb5f.mockapi.io/product_data")
    let newData = await data.json()
    let newArray = newData.filter((item) => {
      return (item.category.toLowerCase() == category.toLowerCase())
    })
    category_product = newArray
    totalProducts = newArray
    let renderData = newArray.map((item) => {
      return  `  <div class = "cart_product" data-id= ${item.id}>
      <p style="color: #FC2779">FEATURED</p>
      <img src="${item.image[0]}" alt=""height="250" class = "info" data-id= ${item.id}>
      <p class="title_click"; style="text-align:center";>${item.name}</p>
      <p style="text-align:center">Price : ₹${item.price}</p>
      <p style="text-align:center">Rating : ${item.rating}</p>
      <div class="addToCart" data-id= ${item.id}>
          <p class="heart">&#9825</p>
          <p class="add" data-id= ${item.id}>Add To Bag</p>
      </div>
  </div>`     
    })
    document.getElementById("product-cards").innerHTML = renderData.join(" ")
    


    let x = document.querySelectorAll(".title_click");

    for (const item of x) {
        item.addEventListener("click",()=>{
            window.location.href = "Prodcut_detail.html";
        })
    }
    
        //For rendering image and description of product------------------------------------------------------
        let products = document.querySelectorAll(".info")
        for(let product of products){
          product.addEventListener("click",()=>{
            let id = product.dataset.id
            localStorage.setItem("product_id",id)
            window.location.href = "Prodcut_detail.html";
          })
        }
    //add to bag ----------------------------------------------------------------------------------------------

    
  let cart_item = JSON.parse(localStorage.getItem("cart_item")) || [];
  cart_items = document.querySelectorAll(".add")
  for (let item of cart_items) {
    item.addEventListener("click", () => {
      let id = item.dataset.id
      if (item.innerText == "Added To Bag") {
        item.innerText = "Added To Bag"
        item.style.backgroundColor = "brown";
      }
      else {
        item.innerText = "Added To Bag"
        item.style.backgroundColor = "brown";

        // Add to Cart--------->>>

        for (const product of totalProducts) {
          if (id == product.id) {
            let check = false;
            for (let i = 0; i < cart_item.length; i++) {
              if (product.id == cart_item[i].id) {
                check = true;
                break;
              }
            }
            if (check == false) {
              cart_item.push(product);
              localStorage.setItem("cart_item", JSON.stringify(cart_item));
              if (bagStatus == true) {
                cart();
              }
              alert("Item added Successfully");

            } else {
              alert("Item already in the Bag");
            }
          }
        }
          item.innerText = "Added To Bag"
          item.style.backgroundColor = "brown";
        
      }
    })
  }
    document.querySelector("#sorting-options").addEventListener("change",(event)=>{
  
      if(flag){
        sortArray(event.target.value,category_product)
      }
      else{
        sortArray(event.target.value,totalProducts)
      }
     
    })
 
  } catch (error) {
    alert(error)
  }
}

document.querySelector("#signin").addEventListener("click",function log(){
  if(status == "true"){
    localStorage.setItem("status",false)
    document.getElementById("signin").innerText = "Sign in"
    location.reload()
  }
  else{
    window.location.href = "login.html"
  }
 
})



//----------------------------------------------Display sorted Array---------------------------------------------------------------------------
function display(array) {
  let update = array.map((item) => {
    return `  <div class = "cart_product" data-id= ${item.id}>
    <p style="color: #FC2779">FEATURED</p>
    <img src="${item.image[0]}" alt=""height="250" class = "info" data-id= ${item.id}>
    <p class="title_click"; style="text-align:center";>${item.name}</p>
    <p style="text-align:center">Price : ₹${item.price}</p>
    <p style="text-align:center">Rating : ${item.rating}</p>
    <div class="addToCart" data-id= ${item.id}>
        <p class="heart">&#9825</p>
        <p class="add" data-id= ${item.id}>Add To Bag</p>
    </div>
</div>`
  })
  return update
}


function sortArray(value,data){
  if(value == "1"){
    data.sort((a,b)=>b.price - a.price)
    let array  = display(data)
    document.getElementById("product-cards").innerHTML = array.join(" ")
    
  }
  else{  
    data.sort((a,b)=>a.price - b.price)
    let array  = display(data)
    document.getElementById("product-cards").innerHTML = array.join(" ")
  }
 
  let cart_item = JSON.parse(localStorage.getItem("cart_item")) || [];
  cart_items = document.querySelectorAll(".add")
  for (let item of cart_items) {
    item.addEventListener("click", () => {
      let id = item.dataset.id
      if (item.innerText == "Added To Bag") {
        item.innerText = "Add To Bag"
        item.style.backgroundColor = "#FC2779";
      }
      else {
        item.innerText = "Added To Bag"
        item.style.backgroundColor = "brown";

        // Add to Cart--------->>>

        for (const product of totalProducts) {
          if (id == product.id) {
            let check = false;
            for (let i = 0; i < cart_item.length; i++) {
              if (product == cart_item[i]) {
                check = true;
                break;
              }
            }
            if (check == false) {
              cart_item.push(product);
              localStorage.setItem("cart_item", JSON.stringify(cart_item));
              if (bagStatus == true) {
                cart();
              }
              alert("Item added Successfully");

            } else {
              alert("Item already in the Bag");
            }
          }
        }
        if (item.innerText == "Added To Bag") {
          item.innerText = "Add To Bag"
          item.style.backgroundColor = "#FC2779";
        }
        else {
          item.innerText = "Added To Bag"
          item.style.backgroundColor = "brown";
        }
      }
    })
  }
    let products = document.querySelectorAll(".info")
    for(let product of products){
      product.addEventListener("click",()=>{
        let id = product.dataset.id
        localStorage.setItem("product_id",id)
        window.location.href = "Prodcut_detail.html";
      })
    }
}

/*  ---------------------------cart page functionality----------------------- */
function cart() {

  let Bag_price = 0;

  document.querySelector("#cart_page_layer").innerHTML = `

  <style>
        *{
          cursor:pointer
        }
  //   body {
  //     background-color: rgb(226, 219, 219);
  //   }
  //   #middle-product-flexible {
  //     background-color: rgb(226, 219, 219);
  // }
  
    #cart_page_layer{
      display: flex;
      justify-content: end;
      position : absolute;
      right : 0px;
      top : 22vh;

    }
    
    #cart_box {
      width : 450px;
      // position : fixed;
      // position: sticky;
      top : 22vh;
      background-color : white;
      opacity : 90%;
      display : flex;
      border: 2px solid silver;
      border-radius : 5px;
      justify-content: space-evenly;
      flex-direction : column;
      gap : 5px;

    }
    #cart_box : focus {
    }
    #cart_total{
      width : 99%;
      display : flex;
      margin : auto;
      justify-content: center;
      border : 2px solid gold;
      border-radius : 5px;
      border-color : rgb(239 9 120);
      background-color : white;
      opacity : 90%;
      top : 22vh;
      
    }
    #cart_total>h4{
      color : rgb(239 9 120);
      font:bolder;
    }

    #cart_total>button{
      color : white;
      margin : auto;
      padding : 1% 2%;
      margin-left : 10px;
      width : 10%;
      background-color : rgb(239 9 120);
      border-radius : 5px;
      border : none;
    }

    #cart_total>button:hover{
      background-color : rgb(249, 52, 147);
    }

    #cart_box>button {
      width : 20%;
      margin : auto;
      padding : 5px 10px;
      color : white;
      font-size : 17px;
      background-color : rgb(239 9 120);
      border-radius : 5px;
      border : none;
    }
    #cart_box>button:hover {
      background-color : rgb(249, 52, 147);

    }

    .div0{
      display : flex;
      gap : 5px;
      justify-content: space-evenly;
    }

    .cartProductImage{
      border: 2px solid silver;
      border-radius : 5px;
      width : 30%;
    }
    .cartProductImage img{
      width : 100%;
    }
    .cartProductDetail{
      border: 2px solid silver;
      border-radius : 5px;
      width : 65%;
    }

    .btn_box{
      width : 100%;
      display:flex;
      justify-content: flex-start;
      align-items : center;
    }
    .plusBtn{
      background-color: rgb(7, 228, 7);
      border : none;
      border-radius:2px;
      margin : .5%;
      color : white;
      height : 20px;
      width : 20px;

    }
    .minusBtn{
      background-color: rgb(246, 26, 26);
      border : none;
      border-radius:2px;
      margin : .5%;
      color : white;
      height : 20px;
      width : 20px;

    }

    .removeItem{
      width : auto;
      margin : 2%;
      text-align : center;
      padding : 5px 10px;
      color : white;
      background-color : rgb(239 9 120);
      border-radius : 5px;
      border : none;
    }
    .removeItem : hover{
      background-color : rgb(249, 52, 147);
    }
    @media screen and (max-width: 950px){
      #cart_total>button{
        width : 15%;
      }
      #cart_box {
        width : 40%;
      } 
    }
    @media screen and (max-width: 700px){
      #cart_total>button{
        width : 15%;
      }
      #cart_box {
        width : 100%;
      }
      #cart_total{
        width:300px
      }
    }

  </style>

  <div id="cart_box">
    <div id="cart_total">
      <button id="cart_total_back_btn">Back</button>
      <h4><h4>
    </div>
  </div>
  `
  let cart_data = JSON.parse(localStorage.getItem("cart_item")) || [];

  let x = document.querySelector("#cart_box");

  if (x.length == 0) {

    let info = document.createElement("h2");
    info.innerHTML = "Your Bag is Empty is empty";

    x.append(info);

  }

  cart_data.forEach((data, i) => {
    
    let count = 1;
    // `
    // <div class="cartProductImage">
    //   <img src="${data.image[0]}">

    // </div>
    // <div class="cartProductDetail">
    //   <h4> ${data.name}</h4>
    //   <h5> Price : ${data.price}</h5>
    //   <h5> Rating : ${data.rating} &#9733;</h5>
    // </div>
    // `

    let div0 = document.createElement("div");
    div0.setAttribute("class", "div0");

    let div = document.createElement("div");
    div.setAttribute("class", "cartProductImage");

    let div1 = document.createElement("div");
    div1.setAttribute("class", "cartProductDetail");

    let img = document.createElement("img");
    img.src = data.image[0];

    let name = document.createElement("h4");
    name.innerText = data.name;

    let price = document.createElement("h5");
    price.innerText = "Price : " + data.price;

    let rating = document.createElement("h5");
    rating.innerText = "Rating : " + data.rating + " ★";

    let quantity = document.createElement("h4");
    quantity.innerText = `Quantity : ${count}`;

    let btnBox = document.createElement("div");
    btnBox.setAttribute("class", "btn_box");

    let plus = document.createElement("button");
    plus.innerText = "+";
    plus.setAttribute("class", "plusBtn");
    plus.addEventListener("click", () => {
      count++;
      quantity.innerText = `Quantity : ${count}`;
      cartDom(count)
    })

    let minus = document.createElement("button");
    minus.innerText = "-";
    minus.setAttribute("class", "minusBtn");
    minus.addEventListener("click", () => {
      if (count > 1) {
        count--;
        quantity.innerText = `Quantity : ${count}`;
        cartDom(count)
      }
    })

    let remove = document.createElement("button");
    remove.setAttribute("class", "removeItem");
    remove.innerText = "Remove";
    remove.addEventListener("click", () => {
      cart_data.splice(i, 1);
      localStorage.setItem("cart_item", JSON.stringify(cart_data));
      if(cart_data.length == 0){
        location.reload()
      }
      cart();
    })



    btnBox.append(plus, minus, remove, quantity);
    div.append(img);
    div1.append(name, price, rating, btnBox);

    div0.append(div, div1);
    x.append(div0);

    Bag_price += Number(data.price) * count;
  });

  let total = 0
  function cartDom(count = 1) {
    document.querySelector("#cart_total>h4").innerText = "Total : ₹ " + Bag_price * count;
    total = Bag_price * count
  }
  cartDom();

  let btn = document.createElement("button");
  btn.innerText = "Buy Now";
  btn.addEventListener("click", () => {
    if(status == "true"){
      let price = total
      localStorage.setItem("Price",price)
      window.location.href = "./Credit card payment/payment.html.html";
  }
  else{
      alert("Please Login")
      window.location.href = "login.html"
  }
  })

  x.append(btn);

  document.querySelector("#cart_total_back_btn").addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "product.html";
  })
}
document.querySelector("#shopping_bag").addEventListener("click", (e) => {
  e.preventDefault();
  bagStatus = true;
  cart();
})
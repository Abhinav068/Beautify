let prev = document.getElementById("previous");
let next = document.getElementById("next");
import { dropmenu, navbar } from "./exoportNavBar.js";
import { footer } from "./footer.js";
document.querySelector("nav").innerHTML = navbar()
document.getElementById("drop").innerHTML = dropmenu()
document.getElementById("bottom-footer").innerHTML = footer()
let user = localStorage.getItem("username") || ""
let status = localStorage.getItem("status")
let bagStatus = false
if(status == "true"){
  document.getElementById("signin").innerText = user
}
let arr = [
  "https://images-static.nykaa.com/uploads/b5e477cd-478c-4f1d-b1a5-c2030c3d0615.jpg?tr=w-1200,cm-pad_resize",
  "https://images-static.nykaa.com/uploads/fe616105-d856-4ef7-9a91-22a68a988094.png?tr=w-1200,cm-pad_resize",
  "https://images-static.nykaa.com/uploads/7250c4ef-daf6-4f77-ab9d-ea897b773904.jpg?tr=w-1200,cm-pad_resize",
"https://images-static.nykaa.com/uploads/41cab243-d530-4f83-b083-6352b09f3a13.jpg?tr=w-1200,cm-pad_resize",
  "https://images-static.nykaa.com/uploads/db2d5607-d968-45f6-ba39-6b8eac6a54e4.jpg?tr=w-1200,cm-pad_resize",
  "https://images-static.nykaa.com/uploads/1ce27b38-ac2a-4e91-a790-97672cc683cf.jpg?tr=w-1200%2Ccm-pad_resize",
];

let i = 0;

next.addEventListener("click", function () {
  i++;
  if (i > arr.length - 1) {
    i = 0;
  }
  document.getElementById("image").src = arr[i];
});

prev.addEventListener("click", function () {
  i--;
  if (i < 0) {
    i = arr.length - 1;
  }
  document.getElementById("image").src = arr[i];
});

function slides() {
  document.getElementById("image").src = arr[i];

  if (i < arr.length - 1) i++;
  else i = 0;
}
setInterval(slides, 1500);

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

let categories = document.querySelectorAll("a")
for(let item of categories){
  item.addEventListener("click",()=>{
      localStorage.setItem("category",item.innerText)
      window.location.href = "category.html"
  })
}
let all_images = document.getElementsByTagName("img")
for(let image of all_images){
  image.addEventListener("click",()=>{
    window.location.href = "product.html"
  })
}

/*  ---------------------------cart page functionality----------------------- */
function cart() {

  let Bag_price = 0;

  document.querySelector("#cart_page_layer").innerHTML = `

  <style>

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
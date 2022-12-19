import { dropmenu, navbar } from "./exoportNavBar.js";
import { footer } from "./footer.js";
document.querySelector("nav").innerHTML = navbar()
document.getElementById("drop").innerHTML = dropmenu()
document.getElementById("bottom-footer").innerHTML = footer()
let user = localStorage.getItem("username") || ""
let status = localStorage.getItem("status")
if(status == "true"){
  document.getElementById("signin").innerText = user
}

document.querySelector("#Back").addEventListener("click", () => {
    window.location.href = "product.html";
})

let Product_url = "https://636b3a947f47ef51e12abb5f.mockapi.io/product_data";

let id = JSON.parse(localStorage.getItem("product_id"));

fetch(Product_url).then(data => (data.json())).then(res => {
    for (const item of res) {
        if (id == item.id) {
            dislpay(item);
        }
    }
});

let cart_item = JSON.parse(localStorage.getItem("cart_item")) || [];
let wish_item = JSON.parse(localStorage.getItem("wish_item")) || [];

function dislpay(item) {
    let div = document.createElement("div");
    for (const image of item.image) {
        let photo = document.createElement("img");
        photo.src = image;
        div.append(photo);
    }
    document.querySelector("#card1").append(div);

    let title = document.createElement("h2");
    title.innerText = item.name;

    let Price = document.createElement("h3");
    Price.innerHTML = `
    <p style="color:silver">Inclusive of All Taxes</p>
    <p>Price : ₹ ${item.price}</p>`;

    let rating = document.createElement("h4");
    rating.innerHTML = `<p>Rating : ${item.rating}</p>`;

    let category = document.createElement("h4");
    category.innerHTML = `<p>Category : ${item.category}</p>`;

    let descript = document.createElement("p");
    descript.innerText = item.des;

    let button_box = document.createElement("div");
    button_box.setAttribute("id", "button_box")
    let cart_btn = document.createElement("button");
    cart_btn.innerText = "Add to Bag";

    cart_btn.addEventListener("click", () => {
        cart_btn.style.backgroundColor = "green";
        let check = false;
        for (let i = 0; i < cart_item.length; i++) {
            if (item.id == cart_item[i].id) {
                check = true;
                break;
            }
        }
        if (check == false) {
            cart_item.push(item);
            localStorage.setItem("cart_item", JSON.stringify(cart_item))
            alert("Item added Successfully");
        } else {
            alert("Item already in the Bag");
        }
    })

    let buy_btn = document.createElement("button");
    buy_btn.innerText = "Buy Now";
    buy_btn.addEventListener("click", () => {
        if(status == "true"){
            localStorage.setItem("Price",item.price)
            window.location.href = "./Credit card payment/payment.html.html";
        }
        else{
            alert("Please Login")
            window.location.href = "login.html"
        }
    
    })

    let wishlist_btn = document.createElement("button");

    wishlist_btn.innerText = "Add to Wishlist";

    wishlist_btn.addEventListener("click", () => {
        wishlist_btn.style.backgroundColor = "green";
        let check = false;
        for (let i = 0; i < wish_item.length; i++) {
            if (item == wish_item[i]) {
                check = true;
                break;
            }
        }
        if (check == false) {
            wish_item.push(item);
            localStorage.setItem("wish_item", JSON.stringify(wish_item))
            alert("Item added Successfully");
        } else {
            alert("Item already in the Wishlist");
        }
    })

    button_box.append(cart_btn, buy_btn, wishlist_btn);
    document.querySelector("#card2-top").append(title, Price, rating, category, descript, button_box);
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
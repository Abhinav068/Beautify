import { dropmenu, navbar } from "./exoportNavBar.js";
import { footer } from "./footer.js";
document.querySelector("nav").innerHTML = navbar()
document.getElementById("drop").innerHTML = dropmenu()
document.getElementById("bottom-footer").innerHTML = footer()

document.querySelector("#Back").addEventListener("click", () => {
    window.location.href = "product.html";
})

let Product_url = "https://636b3a947f47ef51e12abb5f.mockapi.io/product_data";

let id = JSON.parse(localStorage.getItem("product_id"));

fetch(Product_url).then(data => (data.json())).then(res => {
    for (const item of res) {
        if (id == item.id) {
            dislpay(item);
            console.log(item);
        }
    }
});

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
    button_box.setAttribute("id","button_box")
    let cart_btn = document.createElement("button");
    cart_btn.innerText = "Add to Bag";

    let buy_btn = document.createElement("button");
    buy_btn.innerText = "Buy Now";

    button_box.append(cart_btn,buy_btn);
    document.querySelector("#card2-top").append(title,Price,rating,category,descript,button_box);
}



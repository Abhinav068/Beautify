

let Product_url = "https://636b3a947f47ef51e12abb5f.mockapi.io/product_data";

let fetchData = fetch(Product_url);

fetchData
    .then((res) => res.json())
    .then(data => renderData(data))
// .catch(err=>alert(err));

function renderData(data) {

    for (const item of data) {
        let div = document.createElement("div");
        let image = document.createElement("img");
        image.src = item.image[0];

        let title = document.createElement("h3");
        title.innerText = item.name;

        let Price = document.createElement("h4");
        Price.innerHTML = `<p>Price : ${item.price} ₹</p>`;

        let rating = document.createElement("h5");
        rating.innerHTML = `<p>Rating : ${item.rating}</p>`;

        let category = document.createElement("h5");
        category.innerHTML = `<p>Category : ${item.category}</p>`;

        let btn_div = document.createElement("div");
        btn_div.setAttribute("class", "btn-div");
        btn_div.innerHTML = `
        <style>

        .btn-div{
            // display:flex;
            // justify-content: center;
            // align-item : center;
            // align-content : flex-end;
            // position : relative;
            // bottom : 0;
            // margin-bottom : 10px;
            // border : 1px solid green;
        }
            
        </style>
        `

        let btn = document.createElement("button");
        btn.setAttribute("id","bag-btn")
        btn.innerHTML = `
        
        Add to Bag
        <style>
            #bag-btn{
                background-color: RGB(239 9 120);
                padding: 3% 8%;
                font-size: large;
                color: white;
                border-radius: 5px;
                border: none;
                margin: 2%;

            }
            #bag-btn:hover{
                background-color: rgb(252, 90, 168);
            }
        </style>`


        let like_btn = document.createElement("button");
             // \u2661
        like_btn.setAttribute("id","like-btn")
        like_btn.innerHTML = `
        
        &#9825;
        <style>
        #like-btn{
                background : transparent;
                font-size: 50px;
                color: RGB(239 9 120);
                border-radius: 5px;
                border: none;
                transform:translate(0rem,0.8rem);
                
            }
        #like-btn:hover{
                color : green;
            }
        </style>`


        btn_div.append(like_btn, btn)

        div.append(image, title, Price, rating, category, btn_div);
        document.querySelector("#product-cards").append(div);

    }

}

import { dropmenu, navbar } from "./exoportNavBar.js";
import { footer } from "./footer.js";
document.querySelector("nav").innerHTML = navbar()
document.getElementById("drop").innerHTML = dropmenu()
document.getElementById("bottom-footer").innerHTML = footer()
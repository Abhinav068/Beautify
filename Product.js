import { dropmenu, navbar } from "./exoportNavBar.js";
import { footer } from "./footer.js";
document.querySelector("nav").innerHTML = navbar();
document.getElementById("drop").innerHTML = dropmenu();
document.getElementById("bottom-footer").innerHTML = footer();


let Product_url = "https://636b3a947f47ef51e12abb5f.mockapi.io/product_data";

let fetchData = fetch(Product_url);

fetchData
    .then((res) => res.json())
    .then(data => renderData(data));

function renderData(data){
    let newData = data.map((item)=>{
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
    document.getElementById("product-cards").innerHTML = newData.join(" ");

    
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
    //----------------------------------------------------------------------------------------------------
     //add to bag ----------------------------------------------------------------------------------------
     let cart_items = document.querySelectorAll(".add")
     for(let item of cart_items){
        item.addEventListener("click",()=>{
         let id = item.dataset.id
         if(item.innerText == "Added To Bag"){
          item.innerText = "Add To Bag"
          item.style.backgroundColor = "#FC2779";
          }
          else{
            item.innerText = "Added To Bag"
            item.style.backgroundColor = "brown";
          }
          
       })
     }

    //--------------------------------------------------------------------------------------------------------


  }
  //----------------------------------------------------Category----------------------------------------------------------------------
  let categories = document.querySelectorAll("a")
    for(let item of categories){
      item.addEventListener("click",()=>{
          if(item.innerText.toLowerCase() == "blush" || item.innerText.toLowerCase() == "bronzer" || item.innerText.toLowerCase() == "lipstic" ){
            showData(item.innerText)
          }
         else{
          fetch("https://636b3a947f47ef51e12abb5f.mockapi.io/product_data")
          .then((res)=>res.json())
          .then(data=>{renderData(data)})
         }
      })
    }
    async function showData(category){
      try {
          let data = await fetch("https://636b3a947f47ef51e12abb5f.mockapi.io/product_data")
          let newData =await data.json()
          let newArray = newData.filter((item)=>{
              return (item.category.toLowerCase() == category.toLowerCase())
          })
          let renderData = newArray.map((item)=>{
              return `  <div class = "cart_product" data-id= ${item.id}>
              <p style="color: #FC2779">FEATURED</p>
              <img src="${item.image[0]}" alt=""height="250" class = "info" data-id= ${item.id}>
              <p style="text-align:center">${item.name}</p>
              <p style="text-align:center">₹${item.price}</p>
              <p style="text-align:center">${item.rating}</p>
              <div class="addToCart" data-id= ${item.id}>
                  <p class="heart">&#9825</p>
                  <p class="add" data-id= ${item.id}>Add to Bag</p>
              </div>
          </div>
              `
          })
         
          document.getElementById("product-cards").innerHTML = renderData.join(" ")
         //For rendering image and description of product------------------------------------------------------
          let products = document.querySelectorAll(".info")
          for(let product of products){
            product.addEventListener("click",()=>{
              let id = product.dataset.id
              localStorage.setItem("product_id",id)
              window.location.href = "Prodcut_detail.html"   //add images link
            })
          }
    //----------------------------------------------------------------------------------------------------------
    //add to bag ----------------------------------------------------------------------------------------------
        let cart_items = document.querySelectorAll(".add")
        for(let item of cart_items){
            item.addEventListener("click",()=>{
            let id = item.dataset.id
            if(item.innerText == "Added To Bag"){
              item.innerText = "Add To Bag"
              item.style.backgroundColor = "#FC2779";
              }
              else{
                item.innerText = "Added To Bag"
                item.style.backgroundColor = "brown";
                console.log(item)
              }
              
          })
        }

    //--------------------------------------------------------------------------------------------------------

      } catch (error) {
          alert(error)
      }
    }

    let i = 0;

        // ---------------------------------Slider---------------------------------------------------------------------------
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
        i = images.length-1;
      }
    };

     // ---------------------------------Slider---------------------------------------------------------------------------

    //--------------------------------------- signin button-------------------------------------------------------------
     document.querySelector("#signin").addEventListener("click",function log(){
        window.location.href = "login.html"
      })
      
// function renderData(data) {

//     for (const item of data) {
//         let div = document.createElement("div");
//         let image = document.createElement("img");
//         image.src = item.image[0];

//         let title = document.createElement("h3");
//         title.innerText = item.name;

//         let Price = document.createElement("h4");
//         Price.innerHTML = `<p>Price : ${item.price} ₹</p>`;

//         let rating = document.createElement("h5");
//         rating.innerHTML = `<p>Rating : ${item.rating}</p>`;

//         let category = document.createElement("h5");
//         category.innerHTML = `<p>Category : ${item.category}</p>`;

//         let btn_div = document.createElement("div");
//         btn_div.setAttribute("class", "btn-div");
//         btn_div.innerHTML = `
//         <style>

//         .btn-div{
//             // display:flex;
//             // justify-content: center;
//             // align-item : center;
//             // align-content : flex-end;
//             // position : relative;
//             // bottom : 0;
//             // margin-bottom : 10px;
//             // border : 1px solid green;
//         }
            
//         </style>
//         `

//         let btn = document.createElement("button");
//         btn.setAttribute("id","bag-btn")
//         btn.innerHTML = `
        
//         Add to Bag
//         <style>
//             #bag-btn{
//                 background-color: RGB(239 9 120);
//                 padding: 3% 8%;
//                 font-size: large;
//                 color: white;
//                 border-radius: 5px;
//                 border: none;
//                 margin: 2%;

//             }
//             #bag-btn:hover{
//                 background-color: rgb(252, 90, 168);
//             }
//         </style>`


//         let like_btn = document.createElement("button");
//              // \u2661
//         like_btn.setAttribute("id","like-btn")
//         like_btn.innerHTML = `
        
//         &#9825;
//         <style>
//         #like-btn{
//                 background : transparent;
//                 font-size: 50px;
//                 color: RGB(239 9 120);
//                 border-radius: 5px;
//                 border: none;
//                 transform:translate(0rem,0.8rem);
                
//             }
//         #like-btn:hover{
//                 color : green;
//             }
//         </style>`


//         btn_div.append(like_btn, btn)

//         div.append(image, title, Price, rating, category, btn_div);
//         document.querySelector("#product-cards").append(div);

//     }

// }
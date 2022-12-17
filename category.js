import { dropmenu, navbar } from "./exoportNavBar.js";
import { footer } from "./footer.js";
document.querySelector("nav").innerHTML = navbar()
document.getElementById("drop").innerHTML = dropmenu()
document.getElementById("bottom-footer").innerHTML = footer()
let cart_items 
let totalProducts
let category_product 
let flag = false
let i = 0;
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

document.querySelector("#signin").addEventListener("click", function log() {
  window.location.href = "login.html"
})



//----------------------------------------------Display sorted Array---------------------------------------------------------------------------
function display(array) {
  let update = array.map((item) => {
    return `  <div class = "cart_product" data-id= ${item.id}>
  <p style="color: #FC2779">FEATURED</p>
  <img src="${item.image[0]}" alt=""height="250px" class = "info" data-id= ${item.id}>
  <p style="text-align:center">${item.name}</p>
  <p style="text-align:center">₹${item.price}</p>
  <p style="text-align:center">${item.rating}</p>
  <div class="addToCart" data-id= ${item.id}>
      <p class="heart">&#9825</p>
      <p class="add" data-id= ${item.id}>Add To Bag</p>
  </div>
</div>
  `
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

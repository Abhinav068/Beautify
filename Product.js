
let Product_url = "https://636b3a947f47ef51e12abb5f.mockapi.io/product_data";

let fetchData = fetch(Product_url);

fetchData
.then((res)=>res.json())
.then(data=>renderData(data))
// .catch(err=>alert(err));

function renderData(data){

    for (const item of data) {
        let div = document.createElement("div");
        let image = document.createElement("img");
        image.src = item.image[0];

        let title = document.createElement("h2");
        title.innerText = item.name;

        let Price = document.createElement("h3");
        Price.innerHTML = `<p>Price : ${item.price} ₹</p>`;

        let rating = document.createElement("h4");
        rating.innerHTML = `<p>Rating : ${item.rating}</p>`;

        let category = document.createElement("h4");
        category.innerHTML = `<p>Category : ${item.category}</p>`;
       
        div.append(image,title,Price,rating,category);
        document.querySelector("#product-cards").append(div);

    }
  
}
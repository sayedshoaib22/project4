

async function getData() {
    const url = "https://dummyjson.com/products";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        products = json.products;

        const productlist = document.getElementById("productlist");
        const product_category = document.getElementById("product_category");
        
        let productcategory = [];

        products.forEach(element => {
            var card = document.createElement("div")
            card.setAttribute("class","col")

            var card_data = `
                <div class="card h-100">
                    <img src="${element.thumbnail}" class="card-img-top" alt="..." height="150px">
                    <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text">This is a longer card.</p>
                        <p class="card-text"><b>Price: $ ${element.price }/-</b></p>
                    </div>
                    <div class="card-footer">
                        <div class="btn btn-outline-primary btn-sm">Add to Cart</div>
                        <div class="btn btn-primary btn-sm">Buy Now</div>
                    </div>
                </div>
            `
            card.innerHTML = card_data;

            productlist.append(card)
            console.log(element.category);
            
            if(!productcategory.includes(element.category)){
                productcategory.push(element.category)
            }


        });
        
        console.log(products);
        productcategory.forEach((e,i)=>{
            let li = document.createElement("li");
            li.setAttribute("class","list-group-item")
            li.innerHTML = `
                    <input class="form-check-input me-1" type="radio" name="listGroupRadio" value="" id="${e}">
                    <label class="form-check-label" for="${e}">${e}</label>
                `
            product_category.append(li);
        })

        
    } catch (error) {
        console.error(error.message);
        
    }
}


getData();
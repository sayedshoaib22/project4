let products = [];

async function getData() {
    const url = "https://dummyjson.com/products";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        products = json.products;

        renderProducts(products);
        renderCategories(products);
    } catch (error) {
        console.error(error.message);
    }
}

function renderProducts(productArray) {
    const productlist = document.getElementById("productlist");
    productlist.innerHTML = "";

    productArray.forEach(element => {
        var card = document.createElement("div");
        card.setAttribute("class", "col");

        var card_data = `
            <div class="card h-100">
                <img src="${element.thumbnail}" class="card-img-top" alt="..." height="150px">
                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text">This is a longer card.</p>
                    <p class="card-text"><b>Price: $ ${element.price}/-</b></p>
                </div>
                <div class="card-footer">
                    <div class="btn btn-outline-primary btn-sm">Add to Cart</div>
                    <div class="btn btn-primary btn-sm">Buy Now</div>
                </div>
            </div>
        `;
        card.innerHTML = card_data;
        productlist.append(card);
    });
}

function renderCategories(products) {
    const product_category = document.getElementById("product_category");

    // Create "All" option first
    const allItem = document.createElement("li");
    allItem.classList.add("list-group-item");
    allItem.innerHTML = `
        <input class="form-check-input me-1" type="radio" name="category" value="all" checked>
        <label class="form-check-label">ALL</label>
    `;
    product_category.append(allItem);

    const categories = [...new Set(products.map(p => p.category))];

    categories.forEach(cat => {
        const li = document.createElement("li");
        li.classList.add("list-group-item");
        li.innerHTML = `
            <input class="form-check-input me-1" type="radio" name="category" value="${cat}">
            <label class="form-check-label">${cat}</label>
        `;
        product_category.append(li);
    });

    // Add event listener to handle filter
    product_category.addEventListener("change", function (e) {
        if (e.target.name === "category") {
            const selected = e.target.value;
            if (selected === "all") {
                renderProducts(products);
            } else {
                const filtered = products.filter(p => p.category === selected);
                renderProducts(filtered);
            }
        }
    });
}

// Call the function on load
getData();

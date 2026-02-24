const productsDiv = document.getElementById("products");
const search = document.getElementById("search");
const sort = document.getElementById("sort");
const pageText = document.getElementById("page");
const error = document.getElementById("error");

let products = [];
let page = 1;
const limit = 6;

async function fetchProducts() {
    try {
        const res = await fetch("https://dummyjson.com/products?limit=100");
        const data = await res.json();
        products = data.products;
        render();
    } catch {
        error.textContent = "Failed to load products";
    }
}

function render() {
    let filtered = products.filter(p =>
        p.title.toLowerCase().includes(search.value.toLowerCase())
    );

    if (sort.value === "price") filtered.sort((a,b)=>a.price-b.price);
    if (sort.value === "rating") filtered.sort((a,b)=>b.rating-a.rating);

    const start = (page-1)*limit;
    const paginated = filtered.slice(start,start+limit);

    productsDiv.innerHTML = "";

    paginated.forEach(p=>{
        productsDiv.innerHTML += `
        <div class="card">
            <h4>${p.title}</h4>
            <p>₹${p.price}</p>
            <p>Rating: ${p.rating}</p>
        </div>
        `;
    });

    pageText.textContent = page;
}

search.addEventListener("input", ()=>{page=1;render()});
sort.addEventListener("change", ()=>render());

document.getElementById("next").onclick = ()=>{
    page++;
    render();
};

document.getElementById("prev").onclick = ()=>{
    if(page>1) page--;
    render();
};

fetchProducts();
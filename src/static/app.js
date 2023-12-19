window.addEventListener("DOMContentLoaded", setup);

let sortedProducts

//product fetch
async function setup() {

    try {
        const response = await fetch('/products');

        const data = await response.json();
        console.log('Data from the response:', data);

        sortedProducts = sortProducts(data);
		updateContainer(sortedProducts)
        console.log(sortedProducts)
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// quicksort recursion alg for product sorting
// function sortProducts(products) {

//     function sortLowToHigh(products) {
//         if (products.length <= 1) {
//             return products;
//         }

//         const pivot = products[0];
//         const left = [];
//         const right = [];

//         for (let i=1; i<products.length; i++) {
//             if (products[i].price < pivot.price) {
//                 left.push(products[i]);
//             } else {
//                 right.push(products[i]);
//             }
//         }

//         return sortLowToHigh(left).concat(pivot, sortLowToHigh(right));
//     }

//     sortedProducts = sortLowToHigh([...products]);
    
//     return sortedProducts
// }

function sortProducts(products) {
    return products.sort((a, b) => a.price - b.price);
}


// DOM container
function updateContainer(products) {
    const productContainer = document.getElementById('productContainer');
    productContainer.innerHTML = '';

    const productTemplate = document.getElementById('productTemplate');

    for ( const product of products) {
        const productElement = document.importNode(productTemplate.content, true);

        const imageContainer = productElement.querySelector('.imageContainer');
        imageContainer.src = `${product.images[0].src}`;

        const title = productElement.querySelector('.productTitle');
        title.innerHTML = product.title;

        const price = productElement.querySelector('.productPrice');
        price.innerHTML = `$${product.price / 100}`;

        productContainer.appendChild(productElement);
    }
}


//filter product search 
document.getElementById('searchBar').addEventListener('input',filterProducts);

function filterProducts(){
	const search = document.getElementById('searchBar').value.toLowerCase();
	const filteredProducts = sortedProducts.filter(product=> product.title.toLowerCase().includes(search));
	updateContainer(filteredProducts)
}

setup();


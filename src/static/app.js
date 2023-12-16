window.addEventListener("DOMContentLoaded", setup);

let sortedProducts

//product fetch
async function setup() {
    console.log('Setup function is called again!');

    try {
        const response = await fetch('/products');

        const data = await response.json();
        console.log('Data from the response:', data);

        sortedProducts = sortProducts(data);
		updateContainer(sortedProducts)
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

    for ( const product of products) {
        const productElement = document.createElement('div');
        productElement.classList.add('productElement');

        const imageContainer = document.createElement('img');
        imageContainer.src = `${product.images[0].src}`;
        imageContainer.classList.add('imageContainer');

        const textContainer = document.createElement('div');
        textContainer.classList.add('productTextContainer');

        const title = document.createElement('p');
        title.innerHTML = product.title;

        const price = document.createElement('p');
        price.innerHTML = `$${product.price / 100}`;
        price.classList.add('productPrice');

        textContainer.appendChild(title);
        textContainer.appendChild(price);

        productElement.appendChild(imageContainer);
        productElement.appendChild(textContainer);

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


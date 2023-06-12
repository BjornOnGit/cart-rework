// Get all the add-to-cart buttons

let cart= addToCartButtons = document.querySelectorAll('.buy-now');

// Store the selected products
let productItems = [
    {
        product_name: 'ShieldForce Secure My Small Business',
        product_price: 50,
        inCart: 0
    },
    {
        product_name: 'ShieldForce Secure My Midsized Business',
        product_price: 100,
        inCart: 0
    },
    {
        product_name: 'ShieldForce Secure My Enterprise',
        product_price: 250,
        inCart: 0
    },
    {
        product_name: 'ShieldForce Secure My Microsoft 365 Environment',
        product_price: 5,
        inCart: 0
    },
    {
        product_name: 'ShieldForce Secure My Google Workspace Environment',
        product_price: 5,
        inCart: 0
    }
];

for (let i=0; i < cart.length;  i++){
    cart[i].addEventListener('click', () => {
        cartNumbers(productItems[i]);
        totalCost(productItems[i]);
    })
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
    }
}
function cartNumbers(productItem){
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);
    
    if( productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(productItem);
}

function setItems(productItem){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    console.log("My cart items are", cartItems);

    if (cartItems != null){
        if (cartItems[productItem.product_name] == undefined){
            cartItems = {
                ...cartItems,
                [productItem.product_name] : productItem
            }
        }
        cartItems[productItem.product_name].inCart += 1;
    } else{
        productItem.inCart = 1;
        cartItems = {
            [productItem.product_name] : productItem
        }
    }
    
    
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(productItem){
    // console.log("The product price is", productItem.product_price);
    let cartCost = localStorage.getItem('totalCost');
    
    console.log("My cartCost is", cartCost);

    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + productItem.product_price);
    } else{
        localStorage.setItem("totalCost", productItem.product_price);
    }
    
}
function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');
    //console.log(cartItems);
    if(cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <tbody class= "products">
                <tr>
                    <td><i class="ri-close-circle-line"></i><td
                    <td><span>${item.product_name}</span></th>
                    <td class="price">$${item.product_price}.00</th>
                    <th scope="row" class="quantity">
                    <i class="ri-arrow-left-circle-line decrease"></i>
                    <span>${item.inCart}</span>
                    <i class="ri-arrow-right-circle-line increase"></i>
                    </td>
                    <td class="total">
                    $${item.inCart * item.product_price}.00
                    </td>
                </tr>
            </tbody>      
            `;
        });

        productContainer.innerHTML += `
        <div class="grandTotalContainer">
        <h4 class="grandTotalTitle">
            Grand Total
        </h4>
        <h4 class="grandTotal">
            $${cartCost}.00
        </h4>
        </div>
        `;

        
    };
}
onLoadCartNumbers();
displayCart();



 

// Function to handle adding a product to the cart

//function addToCartHandler(event) {

 // Get the product information from the data attributes

 //const productName = event.target.getAttribute('data-product-name');

 //const productPrice = event.target.getAttribute('data-product-price');

 

  // Create an object for the selected product

 //const product = {

 //   name: productName,

  //  price: productPrice

  //};

 

  // Add the product to the cartItems array

  //cartItems.push(product);

 

  // Optional: You can display a confirmation message

 //console.log(`${productName} added to the cart.`);

 

  // Optional: You can redirect the user to the cart page

  // window.location.href = 'cart.html';

//}

 

// Attach event listeners to the add-to-cart buttons

//addToCartButtons.forEach(button => {

  //button.addEventListener('click', addToCartHandler);

//});
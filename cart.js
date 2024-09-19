let cart = [];
let selectedItem = null;

const modal = document.getElementById('weightModal');
const closeModal = document.querySelector('.modal .close');
const select500g = document.getElementById('select-500g');
const select1kg = document.getElementById('select-1kg');

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', function() {
        selectedItem = this;
        const hasWeightOptions = this.hasAttribute('data-price-500g') && this.hasAttribute('data-price-1kg');
        if (hasWeightOptions) {
            showModal();
        } else {
            addToCart(this);
        }
    });
});

function showModal() {
    const itemName = selectedItem.getAttribute('data-name');
    modal.querySelector('h2').textContent = `Select Weight for ${itemName}`;
    modal.style.display = 'block';
}

closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
});

select500g.addEventListener('click', function() {
    addToCart(selectedItem, '500g');
    modal.style.display = 'none';
});

select1kg.addEventListener('click', function() {
    addToCart(selectedItem, '1kg');
    modal.style.display = 'none';
});

function addToCart(itemElement, weight) {
    const itemName = itemElement.getAttribute('data-name');
    let itemPrice;

    if (weight) {
        itemPrice = parseInt(itemElement.getAttribute(`data-price-${weight}`), 10);
    } else {
        itemPrice = parseInt(itemElement.getAttribute('data-price'), 10);
    }

    if (isNaN(itemPrice)) {
        console.error(`Invalid price for ${itemName}`);
        return;
    }

    const item = { name: weight ? `${itemName} (${weight})` : itemName, price: itemPrice };
    cart.push(item);
    updateCart();
    saveCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    let total = 0;

    cartItems.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ₹${item.price}`;
        cartItems.appendChild(li);
        total += item.price;
    });

    cartTotal.textContent = `Total: ₹${total}`;
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

document.getElementById('checkout-button').addEventListener('click', function() {
    saveCart();
    window.location.href = 'checkout.html';
});

window.addEventListener('load', loadCart);

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

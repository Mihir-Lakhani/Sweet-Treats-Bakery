document.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    let total = 0;

    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} - ₹${item.price} <button class="delete-item" data-index="${index}">Delete</button>`;
        cartItems.appendChild(li);
        total += item.price;
    });

    cartTotal.textContent = `Total: ₹${total}`;

    document.querySelectorAll('.delete-item').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            deleteItem(index);
        });
    });
});

function deleteItem(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.reload();
}

document.getElementById('checkout-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const payment = document.querySelector('input[name="payment"]:checked').value;

    console.log(`Order Details:
        Name: ${name}
        Address: ${address}
        Phone: ${phone}
        Payment: ${payment}`);

    alert('Thank you for your order! We will contact you soon.');
});

function clearCart() {
    localStorage.removeItem('cart');
}

document.getElementById('confirm-checkout-button').addEventListener('click', function() {
    clearCart();
});

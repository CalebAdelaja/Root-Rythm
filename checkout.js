// Checkout page functionality

document.addEventListener('DOMContentLoaded', function() {
    displayOrderSummary();
    setupFormValidation();
});

// Display order summary
function displayOrderSummary() {
    const cart = getCart();
    const handbooks = getHandbooksData();
    const orderItems = document.getElementById('orderItems');
    
    if (cart.length === 0) {
        window.location.href = 'handbooks.html';
        return;
    }

    orderItems.innerHTML = cart.map(item => {
        const handbook = handbooks.find(h => h.id === item.id);
        if (!handbook) return '';
        const itemTotal = handbook.price * item.quantity;
        return `
            <div class="order-item">
                <div class="order-item-title">${handbook.title}</div>
                <div class="order-item-quantity">x${item.quantity}</div>
                <div class="order-item-price">$${itemTotal.toFixed(2)}</div>
            </div>
        `;
    }).join('');

    // Update totals
    const subtotal = getCartTotal();
    const shipping = 5.00;
    const finalTotal = subtotal + shipping;

    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('shipping').textContent = shipping.toFixed(2);
    document.getElementById('finalTotal').textContent = finalTotal.toFixed(2);
}

// Setup form validation and submission
function setupFormValidation() {
    const form = document.getElementById('checkoutForm');
    const cardNumber = document.getElementById('cardNumber');
    const expiryDate = document.getElementById('expiryDate');
    const cvv = document.getElementById('cvv');

    // Format card number
    cardNumber.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s/g, '');
        let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
        e.target.value = formattedValue;
    });

    // Format expiry date
    expiryDate.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value;
    });

    // Format CVV (numbers only)
    cvv.addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/\D/g, '');
    });

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            processPayment();
        }
    });
}

// Validate form
function validateForm() {
    const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;

    // Basic validation
    if (cardNumber.length < 13 || cardNumber.length > 19) {
        alert('Please enter a valid card number');
        return false;
    }

    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
        alert('Please enter a valid expiry date (MM/YY)');
        return false;
    }

    if (cvv.length < 3 || cvv.length > 4) {
        alert('Please enter a valid CVV');
        return false;
    }

    return true;
}

// Process payment (simulated)
function processPayment() {
    // Show loading state
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;

    // Simulate payment processing
    setTimeout(() => {
        // Clear cart
        localStorage.removeItem('cart');
        
        // Show success modal
        const modal = document.getElementById('successModal');
        modal.classList.add('show');
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Close modal
function closeModal() {
    const modal = document.getElementById('successModal');
    modal.classList.remove('show');
}

// Go back to shop
function goToShop() {
    window.location.href = 'handbooks.html';
}


// Cart management functions

// Get cart from localStorage
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Add item to cart
function addToCart(handbookId) {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === handbookId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: handbookId,
            quantity: 1
        });
    }

    saveCart(cart);
    updateCartUI();
    showAddToCartFeedback();
}

// Remove item from cart
function removeFromCart(handbookId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== handbookId);
    saveCart(cart);
    updateCartUI();
}

// Update item quantity in cart
function updateQuantity(handbookId, change) {
    const cart = getCart();
    const item = cart.find(item => item.id === handbookId);

    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(handbookId);
            return;
        }
        saveCart(cart);
        updateCartUI();
    }
}

// Get total cart count
function getCartCount() {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
}

// Get cart total price
function getCartTotal() {
    const cart = getCart();
    const handbooks = getHandbooksData();
    return cart.reduce((total, item) => {
        const handbook = handbooks.find(h => h.id === item.id);
        return total + (handbook ? handbook.price * item.quantity : 0);
    }, 0);
}

// Get handbooks data (needs to be available globally or imported)
function getHandbooksData() {
    // This should match the handbooks array from shop.js
    return [
        { id: 1, title: "Student Guide 2024", price: 29.99, icon: "📚" },
        { id: 2, title: "Academic Handbook", price: 24.99, icon: "🎓" },
        { id: 3, title: "Campus Life Manual", price: 19.99, icon: "🏫" },
        { id: 4, title: "Career Development Guide", price: 34.99, icon: "💼" },
        { id: 5, title: "Study Skills Handbook", price: 22.99, icon: "✏️" },
        { id: 6, title: "Financial Aid Guide", price: 27.99, icon: "💰" }
    ];
}

// Update cart UI
function updateCartUI() {
    // Update cart count badge
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        cartCount.textContent = getCartCount();
    }

    // Update cart items display
    const cartItems = document.getElementById('cartItems');
    if (cartItems) {
        const cart = getCart();
        const handbooks = getHandbooksData();

        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        } else {
            cartItems.innerHTML = cart.map(item => {
                const handbook = handbooks.find(h => h.id === item.id);
                if (!handbook) return '';
                return `
                    <div class="cart-item">
                        <div class="cart-item-image">${handbook.icon}</div>
                        <div class="cart-item-details">
                            <div class="cart-item-title">${handbook.title}</div>
                            <div class="cart-item-price">$${handbook.price.toFixed(2)}</div>
                            <div class="cart-item-controls">
                                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                                <span class="item-quantity">${item.quantity}</span>
                                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                            </div>
                            <button class="remove-item-btn" onclick="removeFromCart(${item.id})">Remove</button>
                        </div>
                    </div>
                `;
            }).join('');
        }
    }

    // Update cart total
    const cartTotal = document.getElementById('cartTotal');
    if (cartTotal) {
        cartTotal.textContent = getCartTotal().toFixed(2);
    }
}

// Show feedback when item is added to cart
function showAddToCartFeedback() {
    const cartBtn = document.querySelector('.cart-btn');
    if (cartBtn) {
        cartBtn.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartBtn.style.transform = 'scale(1)';
        }, 200);
    }
}


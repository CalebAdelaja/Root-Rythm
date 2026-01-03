// Handbook products data
const handbooks = [
    {
        id: 1,
        title: "Student Guide 2024",
        description: "Complete guide for new students covering campus life, academics, and resources.",
        price: 29.99,
        icon: "📚"
    },
    {
        id: 2,
        title: "Academic Handbook",
        description: "Essential academic policies, course requirements, and graduation guidelines.",
        price: 24.99,
        icon: "🎓"
    },
    {
        id: 3,
        title: "Campus Life Manual",
        description: "Everything about student organizations, events, and campus facilities.",
        price: 19.99,
        icon: "🏫"
    },
    {
        id: 4,
        title: "Career Development Guide",
        description: "Resources for internships, job search, and professional development.",
        price: 34.99,
        icon: "💼"
    },
    {
        id: 5,
        title: "Study Skills Handbook",
        description: "Proven techniques for effective studying, time management, and exam preparation.",
        price: 22.99,
        icon: "✏️"
    },
    {
        id: 6,
        title: "Financial Aid Guide",
        description: "Complete information about scholarships, grants, and financial assistance.",
        price: 27.99,
        icon: "💰"
    }
];

// Initialize shop page
document.addEventListener('DOMContentLoaded', function() {
    displayHandbooks();
    updateCartUI();
});

// Display handbooks in the grid
function displayHandbooks() {
    const grid = document.getElementById('handbooksGrid');
    grid.innerHTML = '';

    handbooks.forEach(handbook => {
        const card = document.createElement('div');
        card.className = 'handbook-card';
        card.innerHTML = `
            <div class="handbook-image">${handbook.icon}</div>
            <h3 class="handbook-title">${handbook.title}</h3>
            <p class="handbook-description">${handbook.description}</p>
            <div class="handbook-price">$${handbook.price.toFixed(2)}</div>
            <button class="add-to-cart-btn" onclick="addToCart(${handbook.id})">
                Add to Cart
            </button>
        `;
        grid.appendChild(card);
    });
}

// Toggle cart sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.toggle('open');
}

// Get handbook by ID
function getHandbookById(id) {
    return handbooks.find(h => h.id === id);
}

// Go to checkout page
function goToCheckout() {
    const cart = getCart();
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    window.location.href = 'checkout.html';
}


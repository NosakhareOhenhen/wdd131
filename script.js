// Product array
const products = [
    { id: 'prod001', name: 'Ultra HD Smart TV' },
    { id: 'prod002', name: 'Wireless Bluetooth Headphones' },
    { id: 'prod003', name: 'Stainless Steel Water Bottle' },
    { id: 'prod004', name: 'Ergonomic Office Chair' },
    { id: 'prod005', name: 'Smartphone with Dual Camera' },
    { id: 'prod006', name: 'Portable Bluetooth Speaker' },
    { id: 'prod007', name: 'Electric Toothbrush' },
    { id: 'prod008', name: 'Fitness Tracker Watch' },
    { id: 'prod009', name: 'Laptop Backpack' },
    { id: 'prod010', name: 'Air Fryer' }
];

//  populate product select options
function populateProductOptions() {
    const productSelect = document.getElementById('productName');
    
    if (productSelect) {
        products.forEach(product => {
            const option = document.createElement('option');
            option.value = product.id;
            option.textContent = product.name;
            productSelect.appendChild(option);
        });
    }
}

//  update review counter
function updateReviewCounter() {
    const reviewCountElement = document.getElementById('reviewCount');
    
    if (reviewCountElement) {
        let reviewCount = localStorage.getItem('reviewCount');
        
        if (reviewCount === null) {
            reviewCount = 0;
        } else {
            reviewCount = parseInt(reviewCount);
        }
        
        reviewCount++;
        localStorage.setItem('reviewCount', reviewCount);
        reviewCountElement.textContent = reviewCount;
    }
}

// Initialize form when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    populateProductOptions();
    
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Set minimum date to today for date picker (can't review before installing)
    const dateInput = document.getElementById('installDate');
    if (dateInput) {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        dateInput.min = `${yyyy}-${mm}-${dd}`;
    }
});
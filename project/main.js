// App object to organize functionality
const artisanHaven = {
    // Configuration
    config: {
        productsPerPage: 4,
        localStorageKey: 'artisanHavenData'
    },

    // DOM Elements
    elements: {
        featuredProducts: document.getElementById('featuredProducts'),
        exploreBtn: document.getElementById('exploreBtn'),
        artisanName: document.getElementById('artisanName'),
        artisanBio: document.getElementById('artisanBio'),
        artisanImage: document.getElementById('artisanImage'),
        viewArtisanBtn: document.getElementById('viewArtisanBtn'),
        newsletterForm: document.getElementById('newsletterForm'),
        formSuccess: document.getElementById('formSuccess')
    },

    // Data
    data: {
        products: [],
        artisans: [],
        subscribers: []
    },

    // Initialize the application
    init() {
        this.loadData();
        this.setupEventListeners();
        this.renderFeaturedProducts();
        this.renderArtisanSpotlight();
        this.updateFooterDates();
    },

    // Load data from localStorage or initialize
    loadData() {
        const savedData = localStorage.getItem(this.config.localStorageKey);
        if (savedData) {
            this.data = JSON.parse(savedData);
        } else {
            this.initializeSampleData();
        }
    },

    // Save data to localStorage
    saveData() {
        localStorage.setItem(this.config.localStorageKey, JSON.stringify(this.data));
    },

    // Initialize with sample data if none exists
    initializeSampleData() {
        this.data.products = [
            {
                id: 1,
                name: "Hand-thrown Ceramic Mug",
                artisan: "Clay Creations",
                price: 35.00,
                category: "pottery",
                description: "Unique ceramic mug with organic texture",
                image: "images/mug.webp"
            },
            // Add more sample products...
        ];

        this.data.artisans = [
            {
                id: 1,
                name: "Sarah's Clay Creations",
                bio: "Specializing in functional stoneware with modern designs",
                image: "images/potter.webp",
                products: [1, 2, 3]
            },
            // Add more sample artisans...
        ];

        this.saveData();
    },

    // Set up event listeners
    setupEventListeners() {
        // Explore button click
        this.elements.exploreBtn.addEventListener('click', () => {
            window.location.href = "marketplace.html";
        });

        // View artisan button click
        this.elements.viewArtisanBtn.addEventListener('click', () => {
            const currentArtisanId = this.elements.viewArtisanBtn.dataset.artisanId;
            window.location.href = `artisan.html?id=${currentArtisanId}`;
        });

        // Newsletter form submission
        this.elements.newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleNewsletterSubmission();
        });

        // Mobile menu toggle
        document.querySelector('.menu-toggle').addEventListener('click', () => {
            document.querySelector('.primary-nav').classList.toggle('active');
        });
    },

    // Render featured products
    renderFeaturedProducts() {
        // Filter featured products (first 4 for demo)
        const featured = this.data.products.slice(0, this.config.productsPerPage);
        
        // Clear existing content
        this.elements.featuredProducts.innerHTML = '';
        
        // Create product cards
        featured.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <h3>${product.name}</h3>
                <p class="artisan">By ${product.artisan}</p>
                <p class="price">$${product.price.toFixed(2)}</p>
                <button class="product-button" data-product-id="${product.id}">View Details</button>
            `;
            this.elements.featuredProducts.appendChild(productCard);
        });

        // Add event listeners to product buttons
        document.querySelectorAll('.product-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = e.target.dataset.productId;
                this.viewProductDetails(productId);
            });
        });
    },

    // Render artisan spotlight
    renderArtisanSpotlight() {
        // Get random artisan for spotlight
        const randomIndex = Math.floor(Math.random() * this.data.artisans.length);
        const artisan = this.data.artisans[randomIndex];
        
        // Update DOM
        this.elements.artisanName.textContent = artisan.name;
        this.elements.artisanBio.textContent = artisan.bio;
        this.elements.artisanImage.src = artisan.image;
        this.elements.artisanImage.alt = `Artisan ${artisan.name}`;
        this.elements.viewArtisanBtn.dataset.artisanId = artisan.id;
    },

    // Handle newsletter form submission
    handleNewsletterSubmission() {
        const formData = new FormData(this.elements.newsletterForm);
        const subscriber = {
            name: formData.get('name'),
            email: formData.get('email'),
            interests: formData.get('interests'),
            date: new Date().toISOString()
        };
        
        // Add to subscribers
        this.data.subscribers.push(subscriber);
        this.saveData();
        
        // Show success message
        this.elements.newsletterForm.style.display = 'none';
        this.elements.formSuccess.style.display = 'block';
        
        // Reset form after 3 seconds
        setTimeout(() => {
            this.elements.newsletterForm.reset();
            this.elements.newsletterForm.style.display = 'block';
            this.elements.formSuccess.style.display = 'none';
        }, 3000);
    },

    // View product details
    viewProductDetails(productId) {
        // In a full implementation, this would redirect to product page
        console.log(`Viewing product ${productId}`);
        // For demo, show an alert
        const product = this.data.products.find(p => p.id == productId);
        if (product) {
            alert(`You selected: ${product.name}\nPrice: $${product.price.toFixed(2)}`);
        }
    },

    // Update footer dates
    updateFooterDates() {
        document.getElementById('currentyear').textContent = new Date().getFullYear();
        document.getElementById('lastModified').textContent = document.lastModified;
    }
};

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => artisanHaven.init());

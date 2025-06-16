// Ensure DOM is fully loaded before running script
document.addEventListener('DOMContentLoaded', () => {

    // --- Footer dynamic content (Current Year & Last Modified) ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    const lastModifiedSpan = document.getElementById('lastModified');
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = document.lastModified;
    }

    // --- Hamburger Menu Toggle (for mobile) ---
    const hamburgerBtn = document.querySelector('.hamburger-menu');
    const mainNav = document.querySelector('.main-nav');

    if (hamburgerBtn && mainNav) {
        hamburgerBtn.addEventListener('click', () => {
            // Toggle the 'active' class on the navigation to show/hide it
            mainNav.classList.toggle('active');

            // Toggle the icon (e.g., from bars to times) for better UX
            const icon = hamburgerBtn.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            // Announce state change for accessibility
            hamburgerBtn.setAttribute('aria-expanded', mainNav.classList.contains('active'));
        });
    }

    // --- Lazy Loading for Images ---
    // Select all images with the 'loading="lazy"' attribute
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    // Options for the Intersection Observer
    const lazyLoadOptions = {
        root: null, // viewport as root
        rootMargin: '0px', // no margin
        threshold: 0.1 // callback fires when 10% of element is visible
    };

    // Callback function when an image intersects the viewport
    const lazyLoadCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // For placeholder images, we just add the 'loaded' class
                // In a real scenario with data-src, you'd set img.src = img.dataset.src;
                img.classList.add('loaded'); // Add a class to apply opacity transition

                // Stop observing this image once it's loaded
                observer.unobserve(img);
            }
        });
    };

    // Create an Intersection Observer instance
    const lazyLoadObserver = new IntersectionObserver(lazyLoadCallback, lazyLoadOptions);

    // Observe each lazy image
    lazyImages.forEach(img => {
        lazyLoadObserver.observe(img);
    });


    // --- Form Handling and Local Storage (for contact.html) ---
    const contactForm = document.getElementById('contact-form');
    const messageBox = document.getElementById('message-box');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            // Clear previous messages
            displayMessage('', false); // Call a reusable function

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');

            let isValid = true;
            const errors = {}; // Object to hold validation errors

            // Basic Validation with conditional branching
            if (nameInput.value.trim() === '') {
                isValid = false;
                errors.name = 'Name is required.';
            }

            if (emailInput.value.trim() === '') {
                isValid = false;
                errors.email = 'Email is required.';
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
                isValid = false;
                errors.email = 'Please enter a valid email address.';
            }

            if (subjectInput.value.trim() === '') {
                isValid = false;
                errors.subject = 'Subject is required.';
            }

            if (messageInput.value.trim() === '') {
                isValid = false;
                errors.message = 'Message cannot be empty.';
            }

            // Display error messages next to fields
            // Select elements and modify them (DOM interaction)
            document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none'); // Hide all errors first

            if (!isValid) {
                // Iterate over the errors object to display messages
                for (const field in errors) {
                    const errorElement = document.getElementById(`${field}-error`);
                    if (errorElement) {
                        errorElement.textContent = errors[field];
                        errorElement.style.display = 'block';
                    }
                }
                displayMessage('Please correct the errors in the form.', true); // Display a general error message
                return; // Stop execution if validation fails
            }

            // Gather form data using an object
            const formData = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                subject: subjectInput.value.trim(),
                message: messageInput.value.trim(),
                submissionDate: new Date().toISOString()
            };

            // Retrieve existing submissions or initialize an empty array from localStorage
            // Uses localStorage and an array
            const existingSubmissions = JSON.parse(localStorage.getItem('artisanHavenContactSubmissions')) || [];

            // Add the new submission using an array method (push)
            existingSubmissions.push(formData);

            // Store updated submissions array in localStorage
            localStorage.setItem('artisanHavenContactSubmissions', JSON.stringify(existingSubmissions));

            // Use a template literal for output message (required)
            displayMessage(`Thank you, ${formData.name}! Your message about "${formData.subject}" has been sent. We'll get back to you soon.`, false);

            // Optional: Clear the form fields after successful submission
            contactForm.reset();
        });
    }

    // Function to display messages (reusable, multiple functions requirement)
    // Uses conditional branching for success/error styling
    function displayMessage(message, isError) {
        if (messageBox) {
            messageBox.textContent = message;
            messageBox.classList.remove('error'); // Remove previous error state
            if (isError) {
                messageBox.classList.add('error');
            }
            // Modifying element display (DOM interaction)
            messageBox.style.display = message ? 'block' : 'none'; // Show if message exists, hide otherwise
        }
    }

    // --- Global Site Visit Counter (uses localStorage) ---
    function updateVisitCount() {
        let visitCount = localStorage.getItem('artisanHavenSiteVisitCount');

        // Conditional branching: check if count exists
        if (visitCount === null) {
            visitCount = 1; // First visit
        } else {
            visitCount = parseInt(visitCount) + 1; // Increment for subsequent visits
        }

        // Store updated count in localStorage
        localStorage.setItem('artisanHavenSiteVisitCount', visitCount.toString());
        // console.log(`Artisan Haven site visit count: ${visitCount}`); // For debugging
    }

    // Call the visit counter function on every page load
    updateVisitCount();
});

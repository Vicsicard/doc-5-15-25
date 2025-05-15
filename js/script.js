/**
 * Daughter of Compassion - Main JavaScript
 * Handles form submission, navigation, and interactive elements
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initStickyHeader();
    initContactForm();
    initSmoothScroll();
    initModal();
});

/**
 * Makes the header sticky on scroll
 */
function initStickyHeader() {
    const header = document.querySelector('header');
    const scrollThreshold = 50;

    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * Handles the contact form submission
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const modal = document.getElementById('thankYouModal');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            // Validate form data
            if (!validateForm(formData)) {
                formStatus.textContent = 'Please fill in all required fields correctly.';
                formStatus.className = 'error';
                return;
            }
            
            // Show loading message
            formStatus.textContent = 'Sending your message...';
            formStatus.className = 'sending';
            
            // Send data to Vercel serverless function
            fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Reset form
                    contactForm.reset();
                    formStatus.textContent = '';
                    
                    // Show thank you modal
                    showModal();
                } else {
                    throw new Error(data.error || 'Something went wrong');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                formStatus.textContent = 'There was an error submitting your message. Please try again.';
                formStatus.className = 'error';
            });
        });
    }
}

/**
 * Validates form data
 * @param {Object} formData - The form data to validate
 * @returns {boolean} - Whether the form data is valid
 */
function validateForm(formData) {
    // Check if all required fields are filled
    if (!formData.name || !formData.phone || !formData.email || !formData.message) {
        return false;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        return false;
    }
    
    // Validate phone number (basic validation)
    const phoneRegex = /^[0-9\-\+\(\)\s]{10,15}$/;
    if (!phoneRegex.test(formData.phone)) {
        return false;
    }
    
    return true;
}

/**
 * Enables smooth scrolling for navigation links
 */
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop;
                let scrollOffset = 120; // Default offset for most sections
                
                // Add more padding for specific sections
                if (targetId === '#services' || targetId === '#testimonials' || targetId === '#why-choose') {
                    scrollOffset = 150; // More padding for sections with titles at the top
                }
                
                window.scrollTo({
                    top: offsetTop - scrollOffset,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Creates a simple mobile navigation toggle
 * Note: This would be expanded in a real implementation
 */
function initMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
}

/**
 * Initializes the thank you modal functionality
 */
function initModal() {
    const modal = document.getElementById('thankYouModal');
    const closeBtn = document.querySelector('.close-modal');
    
    if (modal && closeBtn) {
        // Close modal when clicking the close button
        closeBtn.addEventListener('click', function() {
            hideModal();
        });
        
        // Close modal when clicking outside the modal content
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                hideModal();
            }
        });
        
        // Close modal when pressing escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                hideModal();
            }
        });
    }
}

/**
 * Shows the thank you modal
 */
function showModal() {
    const modal = document.getElementById('thankYouModal');
    if (modal) {
        modal.style.display = 'block';
        // Use setTimeout to ensure the transition happens after display change
        setTimeout(function() {
            modal.classList.add('show');
        }, 10);
        
        // Prevent scrolling of the background
        document.body.style.overflow = 'hidden';
    }
}

/**
 * Hides the thank you modal
 */
function hideModal() {
    const modal = document.getElementById('thankYouModal');
    if (modal) {
        modal.classList.remove('show');
        
        // Wait for the transition to complete before hiding
        setTimeout(function() {
            modal.style.display = 'none';
            // Re-enable scrolling
            document.body.style.overflow = '';
        }, 300);
    }
}

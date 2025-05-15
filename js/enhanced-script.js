/* 
   Daughter of Compassion - Enhanced JavaScript
   Luxury UI enhancements for an elegant in-home care service website
*/

document.addEventListener('DOMContentLoaded', function() {
    // Testimonial Carousel
    initTestimonialCarousel();
    
    // Gold accent animations for various elements
    initGoldAccents();
    
    // Responsive adjustments
    handleResponsiveLayout();
});

// Testimonial Carousel Functionality
function initTestimonialCarousel() {
    const slidesContainer = document.getElementById('testimonialSlides');
    const dots = document.querySelectorAll('.testimonial-dot');
    let currentSlide = 0;
    let autoSlideInterval;
    
    if (!slidesContainer) return;
    
    // Set up click handlers for dots
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            currentSlide = parseInt(dot.getAttribute('data-slide'));
            updateCarousel();
        });
    });
    
    // Auto-rotate slides
    startAutoSlide();
    
    // Pause auto-rotation on hover
    slidesContainer.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    slidesContainer.addEventListener('mouseleave', () => {
        startAutoSlide();
    });
    
    function startAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % dots.length;
            updateCarousel();
        }, 5000); // Change slide every 5 seconds
    }
    
    function updateCarousel() {
        // Update slides position
        slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update active dot
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
}

// Gold Accent Animations
function initGoldAccents() {
    // Add shimmer effect to gold dividers
    const goldDividers = document.querySelectorAll('.gold-divider');
    goldDividers.forEach(divider => {
        // The animation is handled by CSS, but we could add dynamic effects here
    });
    
    // Add hover effects to elements with gold borders
    const goldBorders = document.querySelectorAll('.gold-border');
    goldBorders.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.classList.add('gold-border-hover');
        });
        
        element.addEventListener('mouseleave', () => {
            element.classList.remove('gold-border-hover');
        });
    });
}

// Responsive Layout Adjustments
function handleResponsiveLayout() {
    const updateLayout = () => {
        const windowWidth = window.innerWidth;
        
        // Adjust testimonial carousel for mobile
        if (windowWidth < 768) {
            // Mobile-specific adjustments
        } else {
            // Desktop-specific adjustments
        }
    };
    
    // Initial call
    updateLayout();
    
    // Update on resize
    window.addEventListener('resize', updateLayout);
}

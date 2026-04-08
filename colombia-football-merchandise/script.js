// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Show/hide floating CTA based on scroll position
    const floatingCta = document.querySelector('.floating-cta');
    const heroSection = document.querySelector('.hero');
    
    if (floatingCta && heroSection) {
        window.addEventListener('scroll', function() {
            const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
            const scrollPosition = window.pageYOffset;
            
            if (scrollPosition > heroBottom) {
                floatingCta.style.display = 'block';
            } else {
                floatingCta.style.display = 'none';
            }
        });
    }

    // Add animation on scroll for cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards
    const cards = document.querySelectorAll('.product-card, .review-card, .faq-item');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });

    // Track Amazon link clicks (for analytics)
    const amazonLinks = document.querySelectorAll('a[href*="amzn.to"]');
    amazonLinks.forEach(link => {
        link.addEventListener('click', function() {
            const productName = this.closest('.product-card, .review-card, .editors-choice-wrapper')
                ?.querySelector('h3')?.textContent || 'Unknown Product';
            
            console.log('Amazon link clicked:', productName);
            
            // You can add Google Analytics or other tracking here
            // Example: gtag('event', 'click', { 'event_category': 'affiliate_link', 'event_label': productName });
        });
    });

    // Add loading state to CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.href && this.href.includes('amzn.to')) {
                this.style.opacity = '0.7';
                setTimeout(() => {
                    this.style.opacity = '1';
                }, 300);
            }
        });
    });

    // Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        const images = document.querySelectorAll('.product-image, .featured-image');
        images.forEach(img => imageObserver.observe(img));
    }

    // Add hover effect sound (optional - commented out by default)
    /*
    const hoverElements = document.querySelectorAll('.product-card, .cta-button');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            // Add subtle hover feedback
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
    */

    console.log('Sportida Affiliate Page Loaded Successfully');
});
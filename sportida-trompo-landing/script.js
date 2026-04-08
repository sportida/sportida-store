// Sportida Trompos Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('Sportida Trompos Landing Page Loaded');

    // Smooth scroll for anchor links
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

    // Intersection Observer for scroll animations
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

    // Observe variant cards, feature items, and FAQ items
    const animatedElements = document.querySelectorAll('.variant-card, .feature-item, .faq-item, .tutorial-step');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });

    // Track Amazon link clicks
    const amazonLinks = document.querySelectorAll('a[href*="amzn.to"]');
    amazonLinks.forEach(link => {
        link.addEventListener('click', function() {
            const variantName = this.closest('.variant-card')
                ?.querySelector('.variant-title')?.textContent || 'Unknown Variant';
            
            console.log('Amazon link clicked:', variantName);
            
            // Analytics tracking can be added here
            // Example: gtag('event', 'click', { 'event_category': 'affiliate_link', 'event_label': variantName });
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
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        const images = document.querySelectorAll('.variant-image, .feature-image');
        images.forEach(img => imageObserver.observe(img));
    }

    // Video autoplay fallback for mobile
    const videoIframe = document.querySelector('.video-container iframe');
    if (videoIframe) {
        // Ensure video plays on mobile devices
        videoIframe.addEventListener('load', function() {
            console.log('Video iframe loaded');
        });
    }

    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        
        if (heroContent && scrolled < 600) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / 600);
        }
    });

    // Tutorial step animation on scroll
    const tutorialSteps = document.querySelectorAll('.tutorial-step');
    const tutorialObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 150);
            }
        });
    }, { threshold: 0.2 });

    tutorialSteps.forEach(step => {
        step.style.opacity = '0';
        step.style.transform = 'translateX(-30px)';
        step.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        tutorialObserver.observe(step);
    });

    // Feature icon animation on hover
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach(item => {
        const icon = item.querySelector('.feature-icon');
        
        item.addEventListener('mouseenter', function() {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Add transition to feature icons
    const featureIcons = document.querySelectorAll('.feature-icon');
    featureIcons.forEach(icon => {
        icon.style.transition = 'transform 0.3s ease-out';
    });

    console.log('All animations and interactions initialized');
});
/**
 * The Kwapong Foundation Website JavaScript
 * Main functionality and interactivity
 */

(function() {
    'use strict';

    // =======================
    // Navigation
    // =======================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Mobile navigation toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // =======================
    // Scroll to Top Button
    // =======================
    const scrollTopBtn = document.getElementById('scrollTop');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // =======================
    // Animated Stats Counter
    // =======================
    const stats = document.querySelectorAll('.stat-number, .metric-value, .stat-value');
    let statsAnimated = false;

    function animateStats() {
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            if (!target) return;

            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps

            let current = 0;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target + (stat.textContent.includes('+') ? '+' : '');
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 16);
        });
    }

    // Trigger stats animation when scrolled into view
    const statsSection = document.querySelector('.impact-stats, .impact-metrics, .hero-stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsAnimated) {
                    animateStats();
                    statsAnimated = true;
                }
            });
        }, { threshold: 0.3 });

        statsObserver.observe(statsSection);
    }

    // =======================
    // Donation Amount Selection & JustGiving Integration
    // =======================
    const amountBtns = document.querySelectorAll('.amount-btn');
    const customAmountInput = document.getElementById('custom-amount-input');
    const customAmountField = document.getElementById('customAmount');
    const justGivingButton = document.getElementById('justgiving-button');
    const donateAmountText = document.getElementById('donate-amount-text');
    let selectedAmount = 50; // Default amount

    amountBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            amountBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const amount = this.getAttribute('data-amount');

            if (amount === 'custom') {
                customAmountInput.style.display = 'block';
                customAmountField.focus();
            } else {
                customAmountInput.style.display = 'none';
                selectedAmount = parseInt(amount);
                updateJustGivingButton();
            }
        });
    });

    // Handle custom amount input
    if (customAmountField) {
        customAmountField.addEventListener('input', function() {
            const value = parseInt(this.value);
            if (value > 0) {
                selectedAmount = value;
                updateJustGivingButton();
            }
        });
    }

    // =======================
    // Monthly Giving Toggle
    // =======================
    const frequencyBtns = document.querySelectorAll('.frequency-btn');
    let isMonthly = false;

    frequencyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            frequencyBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            // Update frequency type
            isMonthly = this.getAttribute('data-frequency') === 'monthly';

            // Update impact box text
            const oneTimeAmounts = document.querySelectorAll('.one-time-amount');
            const monthlyAmounts = document.querySelectorAll('.monthly-amount');
            const oneTimeTexts = document.querySelectorAll('.one-time-text');
            const monthlyTexts = document.querySelectorAll('.monthly-text');

            if (isMonthly) {
                // Show monthly, hide one-time
                oneTimeAmounts.forEach(el => el.style.display = 'none');
                monthlyAmounts.forEach(el => el.style.display = 'block');
                oneTimeTexts.forEach(el => el.style.display = 'none');
                monthlyTexts.forEach(el => el.style.display = 'block');
            } else {
                // Show one-time, hide monthly
                oneTimeAmounts.forEach(el => el.style.display = 'block');
                monthlyAmounts.forEach(el => el.style.display = 'none');
                oneTimeTexts.forEach(el => el.style.display = 'block');
                monthlyTexts.forEach(el => el.style.display = 'none');
            }

            // Update donation button
            updateJustGivingButton();
        });
    });

    // =======================
    // JustGiving Button Update
    // =======================
    function updateJustGivingButton() {
        if (justGivingButton && donateAmountText) {
            // Update button text with frequency type
            const frequencyText = isMonthly ? ' per month' : '';
            donateAmountText.textContent = `Donate £${selectedAmount}${frequencyText}`;

            // Update JustGiving URL with amount parameter
            // Note: Replace 'kwapongfoundation' with your actual JustGiving campaign URL
            const baseUrl = 'https://www.justgiving.com/campaign/kwapongfoundation';
            const urlWithAmount = `${baseUrl}?amount=${selectedAmount}&isMonthly=${isMonthly}`;
            justGivingButton.href = urlWithAmount;
        }
    }

    // Initialize on page load
    updateJustGivingButton();

    // =======================
    // Contact Form Handling
    // =======================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // Here you would typically send the form data to a server
            // For now, we'll just show a success message
            console.log('Form data:', formData);

            // Show success message
            showNotification('Thank you for your message! We will get back to you soon.', 'success');

            // Reset form
            contactForm.reset();
        });
    }

    // =======================
    // Newsletter Form
    // =======================
    const newsletterForm = document.querySelector('.newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = this.querySelector('input[type="email"]').value;

            // Here you would typically send to email service
            console.log('Newsletter signup:', email);

            showNotification('Thank you for subscribing to our newsletter!', 'success');

            this.reset();
        });
    }

    // =======================
    // Notification System
    // =======================
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // Determine background color based on type
        let bgColor = '#4FC3F7'; // info
        if (type === 'success') bgColor = '#66BB6A';
        if (type === 'error') bgColor = '#EF5350';

        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            padding: '1rem 2rem',
            background: bgColor,
            color: '#fff',
            borderRadius: '8px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
            zIndex: '9999',
            animation: 'slideIn 0.3s ease-out',
            fontSize: '1rem',
            maxWidth: '400px'
        });

        // Add to page
        document.body.appendChild(notification);

        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }

    // Add notification animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // =======================
    // Smooth Scroll for Anchor Links
    // =======================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#" or empty
            if (href === '#' || href === '') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                const navHeight = navbar.offsetHeight;
                const targetPosition = target.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // =======================
    // Intersection Observer for Fade-in Animations
    // =======================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });

    // =======================
    // Lazy Load Images (if any are added)
    // =======================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // =======================
    // Print Functionality
    // =======================
    function setupPrint() {
        // Add print button if needed
        window.addEventListener('beforeprint', () => {
            console.log('Preparing to print...');
        });

        window.addEventListener('afterprint', () => {
            console.log('Print complete');
        });
    }

    setupPrint();

    // =======================
    // Accessibility Improvements
    // =======================

    // Add focus visible polyfill behavior
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });

    // Add keyboard navigation for donation amounts
    amountBtns.forEach((btn, index) => {
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                const nextBtn = amountBtns[index + 1] || amountBtns[0];
                nextBtn.focus();
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                const prevBtn = amountBtns[index - 1] || amountBtns[amountBtns.length - 1];
                prevBtn.focus();
            } else if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                btn.click();
            }
        });
    });

    // =======================
    // Performance Monitoring
    // =======================
    if ('PerformanceObserver' in window) {
        // Monitor largest contentful paint
        const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
        });

        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    }

    // =======================
    // Console Welcome Message
    // =======================
    console.log('%c🩸 The Kwapong Foundation', 'color: #DC143C; font-size: 24px; font-weight: bold;');
    console.log('%cEmpowering Young Warriors Living with Sickle Cell Disease', 'color: #2C3E50; font-size: 14px;');
    console.log('%cWebsite by Claude Code | Built with ❤️ for the community', 'color: #64748B; font-size: 12px;');

    // =======================
    // Service Worker Registration (for PWA)
    // =======================
    if ('serviceWorker' in navigator) {
        // Uncomment when service worker is ready
        // navigator.serviceWorker.register('/sw.js')
        //     .then(reg => console.log('Service Worker registered', reg))
        //     .catch(err => console.log('Service Worker registration failed', err));
    }

})();

// =======================
// Export for testing (if needed)
// =======================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        // Export functions for testing if needed
    };
}

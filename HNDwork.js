// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const header = document.getElementById('header');

    // Mobile menu toggle
    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenuBtn.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const mobileNavLinks = mobileNav.querySelectorAll('.nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuBtn.classList.remove('active');
                mobileNav.classList.remove('active');
            });
        });
    }

    // Header scroll effect
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Class filtering (for classes page)
    const categoryBtns = document.querySelectorAll('.category-btn');
    const classCards = document.querySelectorAll('.class-card');

    if (categoryBtns.length > 0 && classCards.length > 0) {
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                
                // Update active button
                categoryBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Filter classes
                classCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    if (category === 'all' || cardCategory === category) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.name || !data.email || !data.subject || !data.message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('.form-submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your message! We\'ll get back to you soon.');
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add loading animation to buttons
    const buttons = document.querySelectorAll('.btn, .book-btn, .pricing-btn, .consultation-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Don't add loading effect to form submit buttons or links
            if (this.type === 'submit' || this.tagName === 'A') {
                return;
            }
            
            e.preventDefault();
            
            const originalText = this.innerHTML;
            this.innerHTML = 'Loading...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
                
                // Simulate action completion
                if (this.classList.contains('book-btn')) {
                    alert('Class booking feature coming soon!');
                } else if (this.classList.contains('pricing-btn')) {
                    alert('Membership signup coming soon!');
                } else if (this.classList.contains('consultation-btn')) {
                    alert('Consultation booking coming soon!');
                }
            }, 1500);
        });
    });

    // Intersection Observer for animations
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

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.stat-item, .feature-card, .value-card, .team-card, .class-card, .pricing-card, .contact-info-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add hover effects to cards
    const cards = document.querySelectorAll('.feature-card, .class-card, .team-card, .pricing-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Parallax effect for hero background
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = heroSection.querySelector('.hero-bg');
            if (parallax) {
                const speed = scrolled * 0.5;
                parallax.style.transform = `translateY(${speed}px)`;
            }
        });
    }

    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 1000);
    }

    // Add counter animation to stats
    const statValues = document.querySelectorAll('.stat-value');
    const countUp = (element, target) => {
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 20);
    };

    // Trigger counter animation when stats section is visible
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statValue = entry.target;
                const text = statValue.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                
                if (number) {
                    statValue.textContent = '0';
                    countUp(statValue, number);
                }
                
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statValues.forEach(stat => {
        statsObserver.observe(stat);
    });
});
// Modern JavaScript for Nodewiz.ai

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initThemeToggle();
    initNavbarEffects();
    initScrollAnimations();
    initBackToTop();
    initParallaxEffects();
    initCounterAnimations();
    initNodeAnimations();
    initSmoothScroll();
    
    console.log('✨ Nodewiz.ai initialized successfully!');
    
    // Theme Toggle
    function initThemeToggle() {
        const btn = document.getElementById('themeToggle');
        if (!btn) return;
        
        const root = document.documentElement;
        const moon = btn.querySelector('[data-icon="moon"]');
        const sun = btn.querySelector('[data-icon="sun"]');

        function updateIcons() {
            const theme = root.getAttribute('data-theme') || 'dark';
            const isDark = theme === 'dark';
            
            if (moon && sun) {
                moon.classList.toggle('d-none', !isDark);
                sun.classList.toggle('d-none', isDark);
            }
        }

        btn.addEventListener('click', () => {
            const current = root.getAttribute('data-theme') || 'dark';
            const next = current === 'dark' ? 'light' : 'dark';
            
            root.setAttribute('data-theme', next);
            
            try { 
                localStorage.setItem('theme', next); 
            } catch (e) {}
            
            updateIcons();
            
            // Add a subtle animation
            btn.style.transform = 'scale(0.9)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 150);
        });

        updateIcons();
    }
    
    // Navbar Effects
    function initNavbarEffects() {
        const navbar = document.getElementById('mainNav');
        if (!navbar) return;
        
        let ticking = false;
        
        function updateNavbar() {
            const scrolled = window.scrollY > 50;
            navbar.classList.toggle('scrolled', scrolled);
            ticking = false;
        }
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateNavbar);
                ticking = true;
            }
        }, { passive: true });
    }
    
    // Scroll Animations with Intersection Observer
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    
                    // Stagger animation for cards
                    const cards = entry.target.querySelectorAll('.feature-card, .step-card, .testimonial-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('fade-in');
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);
        
        // Observe sections
        const sections = document.querySelectorAll('.features-section, .how-it-works, .testimonials-section, .cta-section');
        sections.forEach(section => observer.observe(section));
        
        // Observe individual cards
        const cards = document.querySelectorAll('.feature-card, .step-card, .testimonial-card');
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }
    
    // Back to Top Button
    function initBackToTop() {
        const backToTop = document.getElementById('backToTop');
        if (!backToTop) return;
        
        let ticking = false;
        
        function updateBackToTop() {
            const shouldShow = window.scrollY > 300;
            backToTop.style.display = shouldShow ? 'flex' : 'none';
            ticking = false;
        }
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateBackToTop);
                ticking = true;
            }
        }, { passive: true });
        
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Parallax Effects
    function initParallaxEffects() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        
        const heroVisual = document.querySelector('.hero-visual');
        if (!heroVisual) return;
        
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (heroVisual) {
                heroVisual.style.transform = `translateY(${rate}px)`;
            }
            
            ticking = false;
        }
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }, { passive: true });
    }
    
    // Counter Animations
    function initCounterAnimations() {
        const counters = document.querySelectorAll('.stat-number');
        
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.counted) {
                    animateCounter(entry.target);
                    entry.target.dataset.counted = 'true';
                }
            });
        }, observerOptions);
        
        counters.forEach(counter => observer.observe(counter));
    }
    
    function animateCounter(element) {
        const text = element.textContent;
        const hasPercent = text.includes('%');
        const hasPlus = text.includes('+');
        
        // Extract number
        const number = parseInt(text.replace(/[^\d]/g, ''));
        if (isNaN(number)) return;
        
        let current = 0;
        const increment = number / 60; // 60 frames for smooth animation
        const duration = 2000; // 2 seconds
        const stepTime = duration / 60;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                current = number;
                clearInterval(timer);
            }
            
            let displayText = Math.floor(current).toString();
            if (hasPercent) displayText += '%';
            if (hasPlus) displayText += '+';
            
            element.textContent = displayText;
        }, stepTime);
    }
    
    // Node Animations
    function initNodeAnimations() {
        const nodes = document.querySelectorAll('.node-card');
        if (!nodes.length) return;
        
        // Add hover effects
        nodes.forEach((node, index) => {
            node.addEventListener('mouseenter', () => {
                node.style.transform = 'translateY(-8px) scale(1.05)';
                node.style.zIndex = '10';
            });
            
            node.addEventListener('mouseleave', () => {
                node.style.transform = '';
                node.style.zIndex = '';
            });
            
            // Add random floating animation
            const delay = index * 1000; // Stagger start times
            setTimeout(() => {
                node.classList.add('floating');
            }, delay);
        });
        
        // Animate connection lines
        const paths = document.querySelectorAll('.connection-path');
        paths.forEach((path, index) => {
            setTimeout(() => {
                path.style.opacity = '0.6';
                path.style.animation = 'dash 2s linear infinite';
            }, index * 500);
        });
    }
    
    // Smooth Scrolling
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href === '#' || href === '#!') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Marquee Animation Enhancement
    function initMarqueeEffects() {
        const marqueeContent = document.querySelector('.marquee-content');
        if (!marqueeContent) return;
        
        // Pause on hover
        marqueeContent.addEventListener('mouseenter', () => {
            marqueeContent.style.animationPlayState = 'paused';
        });
        
        marqueeContent.addEventListener('mouseleave', () => {
            marqueeContent.style.animationPlayState = 'running';
        });
    }
    
    // Initialize marquee effects
    initMarqueeEffects();
    
    // Card Interaction Enhancements
    function initCardEffects() {
        const cards = document.querySelectorAll('.feature-card, .step-card, .testimonial-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                // Add subtle glow effect
                card.style.boxShadow = '0 20px 60px rgba(59, 130, 246, 0.15)';
            });
            
            card.addEventListener('mouseleave', (e) => {
                // Reset shadow
                card.style.boxShadow = '';
            });
            
            // Add click ripple effect
            card.addEventListener('click', (e) => {
                const ripple = document.createElement('div');
                const rect = card.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(59, 130, 246, 0.3);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    left: ${x}px;
                    top: ${y}px;
                    width: ${size}px;
                    height: ${size}px;
                    pointer-events: none;
                `;
                
                card.style.position = 'relative';
                card.style.overflow = 'hidden';
                card.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
    
    // Initialize card effects
    initCardEffects();
    
    // Performance optimizations
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .floating {
            animation: float 6s ease-in-out infinite;
        }
        
        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .scrolled {
            background: rgba(15, 23, 42, 0.8) !important;
            backdrop-filter: blur(20px) !important;
        }
        
        [data-theme="light"] .scrolled {
            background: rgba(255, 255, 255, 0.9) !important;
        }
    `;
    document.head.appendChild(style);
    
    // Page load animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Animate hero elements
        const heroElements = document.querySelectorAll('.hero-content > *');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('fade-in');
            }, index * 200);
        });
    });
    
    // Error handling
    window.addEventListener('error', (e) => {
        console.warn('JavaScript error:', e.error);
    });
    
    // Add loading states
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
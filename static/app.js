// ========== UTILITY FUNCTIONS & ERROR HANDLING ==========

// Toast Notification System
function showToast(message, type = 'info', title = '') {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };

    const titles = {
        success: title || 'Success',
        error: title || 'Error',
        warning: title || 'Warning',
        info: title || 'Info'
    };

    toast.innerHTML = `
        <i class="fas ${icons[type]} toast-icon"></i>
        <div class="toast-content">
            <div class="toast-title">${titles[type]}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" aria-label="Close notification">×</button>
    `;

    toastContainer.appendChild(toast);

    // Close button handler
    const closeBtn = toast.querySelector('.toast-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => removeToast(toast));
    }

    // Auto remove after 5 seconds
    setTimeout(() => removeToast(toast), 5000);
}

function removeToast(toast) {
    if (!toast) return;
    toast.classList.add('removing');
    setTimeout(() => {
        if (toast.parentElement) {
            toast.parentElement.removeChild(toast);
        }
    }, 300);
}

// Loading Screen Handler
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 500);
    }
});

// Safe DOM Query with Null Check
function safeQuery(selector) {
    try {
        return document.querySelector(selector);
    } catch (error) {
        console.warn(`Element not found: ${selector}`);
        return null;
    }
}

function safeQueryAll(selector) {
    try {
        return document.querySelectorAll(selector);
    } catch (error) {
        console.warn(`Elements not found: ${selector}`);
        return [];
    }
}

// ========== TYPING ANIMATION ==========

// Typing Animation with Null Check
const typingText = document.getElementById('typingText');
const phrases = ['Python Developer', 'Web Developer', 'Problem Solver', 'AI Enthusiast', 'Full-Stack Developer'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
    if (!typingText) return;

    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500;
    }

    setTimeout(typeText, typingSpeed);
}

// Initialize typing animation
if (typingText) {
    typeText();
}

// ========== NAVBAR & SCROLL EFFECTS ==========

// Navbar Scroll Effect with Null Check
const navbar = document.getElementById('mainNav');
let lastScrollTop = 0;

if (navbar) {
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollTop = scrollTop;
    });
}

// Active Navigation Link  with Null Checks
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

if (sections.length > 0 && navLinks.length > 0) {
    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Scroll Progress Bar with Null Check
const scrollProgress = document.getElementById('scrollProgress');

if (scrollProgress) {
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    });
}

// Stats Counter Animation with Null Checks
const statNumbers = document.querySelectorAll('.stat-number');

if (statNumbers.length > 0) {
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            if (isNaN(target)) return;

            let count = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                count += increment;
                if (count >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(count);
                }
            }, 30);
        });
    }

    const statsSection = document.querySelector('.stats-container');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(statsSection);
    }
}

// Skills Progress Bar Animation with Null Checks
const skillBars = document.querySelectorAll('.skill-progress');

if (skillBars.length > 0) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width') || '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
                skillsObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillsObserver.observe(bar));
}
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        }
    });
});

// Removed duplicate Stats Counter Animation and Skills Progress Bar Animation code
// Already implemented above (lines 186-242) with proper null checks

// Enhanced Particle Animation
const particlesContainer = document.getElementById('particles');
const particleCount = 80;

for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    const size = Math.random() * 5 + 2;
    const duration = Math.random() * 15 + 15;
    const delay = Math.random() * 5;
    const opacity = Math.random() * 0.5 + 0.3;

    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, rgba(0, 171, 240, ${opacity}) 0%, transparent 70%);
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: particleFloat ${duration}s linear infinite;
        animation-delay: ${delay}s;
        filter: blur(${Math.random() * 2}px);
        box-shadow: 0 0 ${size * 2}px rgba(0, 171, 240, ${opacity * 0.8});
    `;
    particlesContainer.appendChild(particle);
}

// Add particle animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 200 - 100}px, -120vh) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Magnetic button effect
const magneticButtons = document.querySelectorAll('.btn-hero-primary, .btn-hero-secondary, .btn-submit');

magneticButtons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0)';
    });
});

// Resume Download Function
function downloadResume() {
    window.open('./static/Atul_Varma_Resume.pdf', '_blank');
}

// Contact Form Handling with Enhanced Validation
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    // Real-time email validation
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function () {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value && !emailRegex.test(this.value)) {
                this.style.borderColor = '#ff4444';
            } else {
                this.style.borderColor = '';
            }
        });
    }

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Form validation
        if (!name || !email || !subject || !message) {
            showFormMessage('Please fill in all fields.', 'error');
            return;
        }

        // Name validation (at least 2 characters)
        if (name.length < 2) {
            showFormMessage('Please enter a valid name (at least 2 characters).', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Message length validation
        if (message.length < 10) {
            showFormMessage('Please enter a message with at least 10 characters.', 'error');
            return;
        }

        // Show loading state
        const btnText = document.querySelector('.btn-text');
        const btnLoading = document.querySelector('.btn-loading');
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline-block';

        // Send form data to Formspree or other service
        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body: new FormData(contactForm)
            });

            const data = await response.json();

            btnText.style.display = 'inline-block';
            btnLoading.style.display = 'none';

            if (response.ok) {
                showFormMessage('Thank you! Your message has been sent.', 'success');
                contactForm.reset();
            } else {
                if (Object.hasOwn(data, 'errors')) {
                    showFormMessage(data["errors"].map(error => error["message"]).join(", "), 'error');
                } else {
                    showFormMessage('Oops! There was a problem submitting your form.', 'error');
                }
            }
        } catch (error) {
            btnText.style.display = 'inline-block';
            btnLoading.style.display = 'none';
            showFormMessage('Failed to send message. Please try again later.', 'error');
            console.error('Error:', error);
        }
    });
}

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';

    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// Project Modal
function openProjectModal(title, description, technologies, githubLink) {
    const modal = new bootstrap.Modal(document.getElementById('projectModal'));
    document.getElementById('projectModalTitle').textContent = title;
    document.getElementById('projectModalDescription').textContent = description;

    const tagsContainer = document.getElementById('projectModalTags');
    tagsContainer.innerHTML = '';
    technologies.forEach(tech => {
        const tag = document.createElement('span');
        tag.className = 'tag';
        tag.textContent = tech;
        tagsContainer.appendChild(tag);
    });

    const githubLinkElement = document.getElementById('projectModalLink');
    if (githubLink && githubLink !== '#') {
        githubLinkElement.href = githubLink;
        githubLinkElement.style.display = 'inline-block';
    } else {
        githubLinkElement.style.display = 'none';
    }

    modal.show();
}

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scroll reveal with Intersection Observer
const revealElements = document.querySelectorAll('.timeline-item, .project-card, .cert-card, .exp-item, .profile-card, .skill-category');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) rotateX(0)';
            }, index * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(50px) rotateX(10deg)';
    element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    revealObserver.observe(element);
});

// Enhanced 3D Tilt Effect for Cards
function addTiltEffect(element) {
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;

        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;

        // Update CSS variable for spotlight effect
        element.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
        element.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
    });

    element.addEventListener('mouseleave', () => {
        element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
}

// Apply tilt effect to cards
const tiltCards = document.querySelectorAll('.project-card, .cert-card, .profile-card, .skill-category');
tiltCards.forEach(card => {
    card.style.transition = 'transform 0.1s ease, box-shadow 0.3s ease';
    addTiltEffect(card);
});

// Enhanced cursor effect with glow
let cursorDot, cursorOutline;

function initCursor() {
    cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    cursorOutline = document.createElement('div');
    cursorOutline.className = 'cursor-outline';

    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorOutline);

    const cursorStyle = document.createElement('style');
    cursorStyle.textContent = `
        .cursor-dot {
            width: 8px;
            height: 8px;
            background: var(--primary-color);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 10000;
            transition: transform 0.15s ease;
            box-shadow: 0 0 20px rgba(0, 171, 240, 0.8), 0 0 40px rgba(0, 171, 240, 0.4);
        }
        .cursor-outline {
            width: 40px;
            height: 40px;
            border: 2px solid var(--primary-color);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 10000;
            transition: all 0.2s ease;
            box-shadow: 0 0 20px rgba(0, 171, 240, 0.3);
        }
    `;
    document.head.appendChild(cursorStyle);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;

        cursorDot.style.left = cursorX + 'px';
        cursorDot.style.top = cursorY + 'px';
        cursorOutline.style.left = (cursorX - 20) + 'px';
        cursorOutline.style.top = (cursorY - 20) + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    const interactiveElements = document.querySelectorAll('a, button, .project-card, .social-icon, .skill-category');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.style.transform = 'scale(2)';
            cursorOutline.style.transform = 'scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursorDot.style.transform = 'scale(1)';
            cursorOutline.style.transform = 'scale(1)';
        });
    });
}

// Initialize cursor effect only on desktop
if (window.innerWidth > 768) {
    initCursor();
}

// Loading Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

console.log('%c Welcome to my Portfolio! ', 'background: linear-gradient(135deg, #00abf0 0%, #0066ff 100%); color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
console.log('%c Thanks for visiting! Feel free to connect with me. ', 'color: #00abf0; font-size: 14px;');


// ========== UI/UX ENHANCEMENTS ==========

// Removed duplicate smooth scroll code - already defined at line 243

// Enhanced form validation with real-time feedback
const contactFormEnhanced = document.getElementById('contactForm');
if (contactFormEnhanced) {
    const inputs = contactFormEnhanced.querySelectorAll('input, textarea');

    inputs.forEach(input => {
        // Real-time validation
        input.addEventListener('input', function () {
            if (this.value.length > 0) {
                if (this.checkValidity()) {
                    this.style.borderColor = 'var(--primary-color)';
                } else {
                    this.style.borderColor = '#ff4444';
                }
            } else {
                this.style.borderColor = '';
            }
        });

        // Focus effects
        input.addEventListener('focus', function () {
            this.parentElement.style.transform = 'scale(1.01)';
        });

        input.addEventListener('blur', function () {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
}

// Loading state for buttons
function setButtonLoading(button, isLoading) {
    if (isLoading) {
        button.disabled = true;
        button.classList.add('btn-loading');
        button.style.pointerEvents = 'none';
    } else {
        button.disabled = false;
        button.classList.remove('btn-loading');
        button.style.pointerEvents = 'auto';
    }
}

// Enhanced stats animation with easing
function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            element.textContent = end;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Lazy loading for images
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Keyboard navigation improvements
document.addEventListener('keydown', (e) => {
    // ESC to close modals
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal.show');
        modals.forEach(modal => {
            const bsModal = bootstrap.Modal.getInstance(modal);
            if (bsModal) bsModal.hide();
        });
    }
});

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        animation: ripple 0.6s ease-out;
    `;

    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
}

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

const rippleButtons = document.querySelectorAll('.btn-hero-primary, .btn-hero-secondary, .btn-project, .btn-submit');
rippleButtons.forEach(button => {
    button.addEventListener('click', createRipple);
});

// Improved scroll progress
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrollProgress = document.getElementById('scrollProgress');
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            scrollProgress.style.width = scrolled + '%';
            ticking = false;
        });
        ticking = true;
    }
});

// Toast notification system
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        padding: 16px 24px;
        background: ${type === 'success' ? 'var(--primary-color)' : '#ff4444'};
        color: white;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        font-weight: 500;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

const toastStyle = document.createElement('style');
toastStyle.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutRight {
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
document.head.appendChild(toastStyle);

// Debounce function for performance
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

// Optimized resize handler
const handleResize = debounce(() => {
    // Reinitialize cursor on desktop only
    if (window.innerWidth > 768 && !document.querySelector('.cursor-dot')) {
        initCursor();
    }
}, 250);

window.addEventListener('resize', handleResize);

// Preload critical resources
const preloadLinks = document.querySelectorAll('link[rel="preload"]');
if (preloadLinks.length === 0) {
    const preload = document.createElement('link');
    preload.rel = 'preload';
    preload.as = 'style';
    preload.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
    document.head.appendChild(preload);
}

// Accessibility: Announce page changes
function announcePageChange(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 1000);
}

// Track active section for navigation
// Using the same sections and navLinks variables declared earlier

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, {
    threshold: 0.3
});

sections.forEach(section => sectionObserver.observe(section));

console.log('%c✨ Portfolio Loaded Successfully! ', 'background: linear-gradient(135deg, #00abf0 0%, #0066ff 100%); color: white; font-size: 16px; padding: 12px 20px; border-radius: 8px; font-weight: bold;');
console.log('%c🚀 Enhanced with modern UI/UX improvements ', 'color: #00abf0; font-size: 14px; font-weight: 500;');


// ========== UNIQUE MODERN FEATURES ==========

// 1. Command Palette (Ctrl+K or Cmd+K)
const commandPalette = document.createElement('div');
commandPalette.className = 'command-palette';
commandPalette.innerHTML = `
    <input type="text" class="command-input" placeholder="Type a command..." />
    <div class="command-results"></div>
`;
document.body.appendChild(commandPalette);

const commands = [
    { name: 'Go to About', icon: 'fa-user', action: () => document.querySelector('#about').scrollIntoView({ behavior: 'smooth' }) },
    { name: 'Go to Projects', icon: 'fa-folder', action: () => document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' }) },
    { name: 'Go to Contact', icon: 'fa-envelope', action: () => document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' }) },
    { name: 'Download Resume', icon: 'fa-download', action: () => downloadResume() },
    { name: 'Toggle Theme', icon: 'fa-palette', action: () => toggleTheme() },
    { name: 'Open Terminal', icon: 'fa-terminal', action: () => toggleTerminal() },
];

let selectedCommandIndex = 0;

document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        commandPalette.classList.toggle('active');
        if (commandPalette.classList.contains('active')) {
            commandPalette.querySelector('.command-input').focus();
            renderCommands(commands);
        }
    }
    if (e.key === 'Escape') {
        commandPalette.classList.remove('active');
    }
});

commandPalette.querySelector('.command-input').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = commands.filter(cmd => cmd.name.toLowerCase().includes(query));
    renderCommands(filtered);
});

function renderCommands(cmds) {
    const results = commandPalette.querySelector('.command-results');
    results.innerHTML = cmds.map((cmd, i) => `
        <div class="command-item ${i === selectedCommandIndex ? 'selected' : ''}" data-index="${i}">
            <i class="fas ${cmd.icon}"></i>
            <span>${cmd.name}</span>
        </div>
    `).join('');

    results.querySelectorAll('.command-item').forEach(item => {
        item.addEventListener('click', () => {
            cmds[item.dataset.index].action();
            commandPalette.classList.remove('active');
        });
    });
}

// 2. Theme Switcher
const themeSwitcher = document.createElement('div');
themeSwitcher.className = 'theme-switcher';
themeSwitcher.innerHTML = `
    <button class="theme-btn" data-theme="dark" title="Dark Mode">
        <i class="fas fa-moon"></i>
    </button>
    <button class="theme-btn" data-theme="light" title="Light Mode">
        <i class="fas fa-sun"></i>
    </button>
    <button class="theme-btn" data-theme="auto" title="Auto Mode">
        <i class="fas fa-adjust"></i>
    </button>
`;
document.body.appendChild(themeSwitcher);

function toggleTheme(theme = 'dark') {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    showToast(`Theme changed to ${theme} mode`, 'success');
}

themeSwitcher.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => toggleTheme(btn.dataset.theme));
});

// 3. Interactive Terminal
const terminal = document.createElement('div');
terminal.className = 'terminal-widget';
terminal.innerHTML = `
    <div class="terminal-header">
        <div class="terminal-dots">
            <span class="terminal-dot red"></span>
            <span class="terminal-dot yellow"></span>
            <span class="terminal-dot green"></span>
        </div>
        <span style="color: var(--primary-color); font-size: 12px;">Terminal</span>
    </div>
    <div class="terminal-body">
        <div class="terminal-line">Welcome to Atul's Portfolio Terminal v1.0</div>
        <div class="terminal-line">Type 'help' for available commands</div>
        <div class="terminal-input-line">
            <span class="terminal-prompt">$</span>
            <input type="text" class="terminal-input" />
        </div>
    </div>
`;
document.body.appendChild(terminal);

const terminalCommands = {
    help: 'Available commands: about, skills, projects, contact, clear, github, linkedin',
    about: 'Computer Science Student | Full-Stack Developer | AI Enthusiast',
    skills: 'Python, JavaScript, HTML/CSS, React, Node.js, AI/ML',
    projects: 'Coffee Shop, Portfolio, RoopRani, Recycling Platform',
    contact: 'Email: atulverma15704@gmail.com',
    github: () => window.open('https://github.com/atul87', '_blank'),
    linkedin: () => window.open('https://www.linkedin.com/in/atul-varma-102b5b2a9', '_blank'),
    clear: () => {
        terminal.querySelector('.terminal-body').innerHTML = `
            <div class="terminal-input-line">
                <span class="terminal-prompt">$</span>
                <input type="text" class="terminal-input" />
            </div>
        `;
        terminal.querySelector('.terminal-input').focus();
    }
};

function toggleTerminal() {
    terminal.classList.toggle('active');
    if (terminal.classList.contains('active')) {
        terminal.querySelector('.terminal-input').focus();
    }
}

terminal.querySelector('.terminal-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const cmd = e.target.value.trim().toLowerCase();
        const output = terminalCommands[cmd];

        if (typeof output === 'function') {
            output();
        } else if (output) {
            const line = document.createElement('div');
            line.className = 'terminal-line';
            line.textContent = output;
            terminal.querySelector('.terminal-body').insertBefore(line, terminal.querySelector('.terminal-input-line'));
        } else if (cmd) {
            const line = document.createElement('div');
            line.className = 'terminal-line';
            line.style.color = '#ff4444';
            line.textContent = `Command not found: ${cmd}`;
            terminal.querySelector('.terminal-body').insertBefore(line, terminal.querySelector('.terminal-input-line'));
        }

        e.target.value = '';
        terminal.querySelector('.terminal-body').scrollTop = terminal.querySelector('.terminal-body').scrollHeight;
    }
});

// 4. Easter Egg - Konami Code
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

const easterEgg = document.createElement('div');
easterEgg.className = 'easter-egg';
easterEgg.innerHTML = `
    <h2>🎉 You found the secret! 🎉</h2>
    <p>Konami Code activated!</p>
    <button onclick="this.parentElement.classList.remove('active')" style="margin-top: 20px; padding: 10px 20px; background: var(--primary-color); border: none; border-radius: 8px; color: white; cursor: pointer;">Close</button>
`;
document.body.appendChild(easterEgg);

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            easterEgg.classList.add('active');
            createConfetti();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

// 5. Confetti Effect
function createConfetti() {
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear`;
        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 5000);
    }
}

const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

// 6. Floating Action Menu
const fabMenu = document.createElement('div');
fabMenu.className = 'fab-menu';
fabMenu.innerHTML = `
    <button class="fab-main"><i class="fas fa-plus"></i></button>
    <div class="fab-options">
        <button class="fab-option" onclick="toggleTerminal()" title="Terminal"><i class="fas fa-terminal"></i></button>
        <button class="fab-option" onclick="window.scrollTo({top: 0, behavior: 'smooth'})" title="Scroll to Top"><i class="fas fa-arrow-up"></i></button>
        <button class="fab-option" onclick="document.querySelector('#contact').scrollIntoView({behavior: 'smooth'})" title="Contact"><i class="fas fa-envelope"></i></button>
    </div>
`;
document.body.appendChild(fabMenu);

fabMenu.querySelector('.fab-main').addEventListener('click', () => {
    fabMenu.classList.toggle('active');
});

// 7. Spotlight Effect
const spotlight = document.createElement('div');
spotlight.className = 'spotlight';
document.body.appendChild(spotlight);

document.addEventListener('mousemove', (e) => {
    spotlight.style.transform = `translate(${e.clientX - 300}px, ${e.clientY - 300}px)`;
});

// 8. Visitor Counter
const visitorCounter = document.createElement('div');
visitorCounter.className = 'visitor-counter';
const visits = localStorage.getItem('visits') || 0;
localStorage.setItem('visits', parseInt(visits) + 1);
visitorCounter.innerHTML = `
    <i class="fas fa-eye"></i>
    <span>Visits: ${parseInt(visits) + 1}</span>
`;
document.body.appendChild(visitorCounter);

// 9. Screen Time Tracker
const screenTime = document.createElement('div');
screenTime.className = 'screen-time';
let seconds = 0;
screenTime.innerHTML = `<i class="fas fa-clock"></i> <span id="timeSpent">0:00</span>`;
document.body.appendChild(screenTime);

setInterval(() => {
    seconds++;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    document.getElementById('timeSpent').textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
}, 1000);

// 10. Code Rain Effect (Matrix style)
const codeRain = document.createElement('canvas');
codeRain.className = 'code-rain';
document.body.appendChild(codeRain);

const ctx = codeRain.getContext('2d');
codeRain.width = window.innerWidth;
codeRain.height = window.innerHeight;

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
const fontSize = 14;
const columns = codeRain.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawCodeRain() {
    ctx.fillStyle = 'rgba(10, 14, 39, 0.05)';
    ctx.fillRect(0, 0, codeRain.width, codeRain.height);

    ctx.fillStyle = 'rgba(0, 171, 240, 0.5)';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > codeRain.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawCodeRain, 50);

window.addEventListener('resize', () => {
    codeRain.width = window.innerWidth;
    codeRain.height = window.innerHeight;
});

// 11. Voice Commands (experimental)
if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';

    const voiceBtn = document.createElement('button');
    voiceBtn.className = 'fab-option';
    voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
    voiceBtn.title = 'Voice Commands';
    voiceBtn.style.cssText = 'position: fixed; bottom: 200px; right: 40px; z-index: 1000;';
    document.body.appendChild(voiceBtn);

    voiceBtn.addEventListener('click', () => {
        recognition.start();
        voiceBtn.style.background = 'var(--primary-color)';
        voiceBtn.style.color = 'white';
    });

    recognition.onresult = (event) => {
        const command = event.results[0][0].transcript.toLowerCase();

        if (command.includes('about')) document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
        else if (command.includes('project')) document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' });
        else if (command.includes('contact')) document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
        else if (command.includes('home')) document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });

        showToast(`Voice command: ${command}`, 'success');
    };

    recognition.onend = () => {
        voiceBtn.style.background = '';
        voiceBtn.style.color = '';
    };
}

// 12. Double Click Easter Egg
let clickCount = 0;
document.querySelector('.profile-img').addEventListener('click', () => {
    clickCount++;
    if (clickCount === 3) {
        createConfetti();
        showToast('🎉 Triple click bonus!', 'success');
        clickCount = 0;
    }
    setTimeout(() => clickCount = 0, 1000);
});

console.log('%c🚀 Advanced Features Loaded! ', 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 16px; padding: 12px 20px; border-radius: 8px; font-weight: bold;');
console.log('%c💡 Try: Ctrl+K for command palette, Konami code, voice commands, terminal! ', 'color: #00abf0; font-size: 14px;');


// ========== STUNNING BACKGROUND EFFECTS ==========

// Initialize all background effects
function initBackgroundEffects() {
    // 1. Gradient Mesh
    const gradientMesh = document.createElement('div');
    gradientMesh.className = 'gradient-mesh';
    document.body.insertBefore(gradientMesh, document.body.firstChild);

    // 2. Geometric Shapes
    const geometricShapes = document.createElement('div');
    geometricShapes.className = 'geometric-shapes';
    geometricShapes.innerHTML = `
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
    `;
    document.body.insertBefore(geometricShapes, document.body.firstChild);

    // 3. Aurora Effect
    const aurora = document.createElement('div');
    aurora.className = 'aurora';
    aurora.innerHTML = `
        <div class="aurora-layer"></div>
        <div class="aurora-layer"></div>
        <div class="aurora-layer"></div>
    `;
    document.body.insertBefore(aurora, document.body.firstChild);

    // 4. Glowing Orbs
    const glowingOrbs = document.createElement('div');
    glowingOrbs.className = 'glowing-orbs';
    glowingOrbs.innerHTML = `
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
        <div class="orb orb-3"></div>
    `;
    document.body.insertBefore(glowingOrbs, document.body.firstChild);

    // 5. Hexagon Pattern
    const hexagonPattern = document.createElement('div');
    hexagonPattern.className = 'hexagon-pattern';
    document.body.insertBefore(hexagonPattern, document.body.firstChild);

    // 6. Grid Lines
    const gridLines = document.createElement('div');
    gridLines.className = 'grid-lines';
    document.body.insertBefore(gridLines, document.body.firstChild);

    // 7. Nebula Effect
    const nebula = document.createElement('div');
    nebula.className = 'nebula';
    document.body.insertBefore(nebula, document.body.firstChild);

    // 8. Starfield
    createStarfield();

    // 9. Particle Network Canvas
    createParticleNetwork();
}

// Create Starfield
function createStarfield() {
    const starfield = document.createElement('div');
    starfield.className = 'starfield';

    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        starfield.appendChild(star);
    }

    document.body.insertBefore(starfield, document.body.firstChild);
}

// Create Interactive Particle Network
function createParticleNetwork() {
    const canvas = document.createElement('canvas');
    canvas.className = 'particle-network';
    document.body.insertBefore(canvas, document.body.firstChild);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;
    const maxDistance = 150;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 171, 240, 0.5)';
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 171, 240, ${1 - distance / maxDistance})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        connectParticles();
        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Background switcher
let currentBg = 0;
const backgrounds = ['gradient-mesh', 'aurora', 'nebula', 'liquid-bg'];

function switchBackground() {
    document.querySelectorAll('.gradient-mesh, .aurora, .nebula, .liquid-bg').forEach(el => {
        el.style.opacity = '0';
    });

    currentBg = (currentBg + 1) % backgrounds.length;
    const activeBg = document.querySelector(`.${backgrounds[currentBg]}`);
    if (activeBg) {
        activeBg.style.opacity = '1';
    }
}

// Add background switcher button
const bgSwitcher = document.createElement('button');
bgSwitcher.className = 'theme-btn';
bgSwitcher.innerHTML = '<i class="fas fa-image"></i>';
bgSwitcher.title = 'Switch Background';
bgSwitcher.style.cssText = 'position: fixed; bottom: 280px; right: 40px; z-index: 1000;';
bgSwitcher.addEventListener('click', () => {
    switchBackground();
    showToast('Background changed!', 'success');
});
document.body.appendChild(bgSwitcher);

// Initialize on load
window.addEventListener('load', () => {
    initBackgroundEffects();
    console.log('%c🎨 Stunning Backgrounds Loaded! ', 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 16px; padding: 12px 20px; border-radius: 8px; font-weight: bold;');
});

// Performance monitoring
let fps = 0;
let lastTime = performance.now();

function monitorPerformance() {
    const currentTime = performance.now();
    fps = Math.round(1000 / (currentTime - lastTime));
    lastTime = currentTime;

    // Reduce effects if FPS drops below 30
    if (fps < 30) {
        document.querySelectorAll('.shape, .orb, .aurora-layer').forEach(el => {
            el.style.animationDuration = '30s';
        });
    }

    requestAnimationFrame(monitorPerformance);
}

monitorPerformance();

// DOM Elements
const loader = document.querySelector('.loader');
const themeToggle = document.querySelector('.theme-toggle');
const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-list');
const navLinks = document.querySelectorAll('.nav-link');
const backToTopBtn = document.querySelector('.back-to-top');
const currentYear = document.getElementById('year');
const contactForm = document.getElementById('contactForm');
const skillProgressBars = document.querySelectorAll('.skill-progress');

// Loader
window.addEventListener('load', () => {
    loader.classList.add('hidden');
});

// Theme Toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('darkTheme', isDark);
    
    if (isDark) {
        document.body.setAttribute('data-theme', 'dark');
    } else {
        document.body.removeAttribute('data-theme');
    }
});

// Check for saved theme preference
if (localStorage.getItem('darkTheme') === 'true') {
    document.body.classList.add('dark-theme');
    document.body.setAttribute('data-theme', 'dark');
}

// Mobile Menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navList.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navList.classList.remove('active');
        
        // Set active link
        navLinks.forEach(item => item.classList.remove('active'));
        link.classList.add('active');
    });
});

// Set current year in footer
currentYear.textContent = new Date().getFullYear();

// Back to Top Button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('active');
        document.querySelector('.header').classList.add('scrolled');
    } else {
        backToTopBtn.classList.remove('active');
        document.querySelector('.header').classList.remove('scrolled');
    }
});

backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact Form Submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', data);
    
    // Show success message
    alert('Merci pour votre message! Je vous répondrai dès que possible.');
    contactForm.reset();
});

// Animate skill progress bars on scroll
function animateSkills() {
    skillProgressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
    });
}

// Initialize animations when elements are in viewport
function initScrollAnimations() {
    const sections = document.querySelectorAll('.section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const section = entry.target;
                
                // Animate section elements
                const elements = section.querySelectorAll('.fade-in, .slide-up, .slide-down, .slide-left, .slide-right');
                elements.forEach(el => {
                    el.style.animationPlayState = 'running';
                });
                
                // Special case for skills section
                if (section.id === 'about') {
                    animateSkills();
                }
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    
    // Pause all animations initially
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up, .slide-down, .slide-left, .slide-right');
    animatedElements.forEach(el => {
        el.style.animationPlayState = 'paused';
    });
});
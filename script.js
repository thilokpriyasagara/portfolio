// script.js

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });


    // 2. Sticky Navbar & Active Link Highlights on Scroll
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('#hero, #about, #projects, #skills, #contact.section');

    window.addEventListener('scroll', () => {
        // Sticky Navbar Effect
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link switching
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });


    // 3. Reveal Animations on Scroll using IntersectionObserver
    const revealElements = document.querySelectorAll('.fade-in-up');

    const revealOptions = {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                // Optional: Stop observing once revealed to only animate once
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Trigger immediately for hero section elements on load
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-section .fade-in-up');
        heroElements.forEach(el => el.classList.add('visible'));
    }, 100);

});

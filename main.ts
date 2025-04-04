// TypeScript main file for Jonathan Bareket's portfolio website

interface ElementPosition {
    top: number;
    left: number;
    bottom: number;
    right: number;
}

// DOM Elements
document.addEventListener('DOMContentLoaded', (): void => {
    // Navigation functionality
    const navToggle: HTMLElement | null = document.getElementById('navToggle');
    const navMenu: HTMLElement | null = document.getElementById('navMenu');
    const header: HTMLElement | null = document.querySelector('header');
    const navLinks: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('.nav-link');
    const backToTop: HTMLElement | null = document.getElementById('backToTop');
    const sections: NodeListOf<HTMLElement> = document.querySelectorAll('section[id]');

    // Testimonial slider elements
    const testimonialItems: NodeListOf<HTMLElement> = document.querySelectorAll('.testimonial-item');
    const testimonialDots: HTMLElement | null = document.getElementById('testimonialDots');
    const prevButton: HTMLElement | null = document.getElementById('testimonialPrev');
    const nextButton: HTMLElement | null = document.getElementById('testimonialNext');

    // Contact form
    const contactForm: HTMLFormElement | null = document.getElementById('contactForm') as HTMLFormElement;

    // Navigation toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', (): void => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e: MouseEvent): void => {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navMenu?.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle?.classList.remove('active');
            }
            
            const targetId: string = link.getAttribute('href') || '';
            const targetSection: HTMLElement | null = document.querySelector(targetId);
            
            if (targetSection) {
                const yOffset: number = -80; // Header height + extra padding
                const y: number = targetSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
                
                window.scrollTo({
                    top: y,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to top button
    if (backToTop) {
        backToTop.addEventListener('click', (e: MouseEvent): void => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Header scroll effect and active nav item
    const onScroll = (): void => {
        const scrollPosition: number = window.scrollY;
        
        // Header shadow on scroll
        if (header) {
            if (scrollPosition > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        // Active navigation based on scroll position
        sections.forEach(section => {
            const sectionTop: number = section.offsetTop - 100;
            const sectionHeight: number = section.offsetHeight;
            const sectionId: string = section.getAttribute('id') || '';
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', onScroll);
    
    // Initialize scroll position on page load
    onScroll();

    // Testimonial Slider
    let currentSlide: number = 0;

    const showSlide = (index: number): void => {
        // Hide all slides
        testimonialItems.forEach((item: HTMLElement): void => {
            item.classList.remove('active');
        });
        
        // Update dots
        if (testimonialDots) {
            const dots: NodeListOf<HTMLElement> = testimonialDots.querySelectorAll('.dot');
            dots.forEach((dot: HTMLElement, i: number): void => {
                dot.classList.toggle('active', i === index);
            });
        }
        
        // Show current slide
        if (testimonialItems[index]) {
            testimonialItems[index].classList.add('active');
            currentSlide = index;
        }
    };

    // Initialize testimonial slider if elements exist
    if (testimonialItems.length > 0 && testimonialDots) {
        // Create dots
        testimonialItems.forEach((_, i: number): void => {
            const dot: HTMLSpanElement = document.createElement('span');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', (): void => showSlide(i));
            testimonialDots.appendChild(dot);
        });

        // Next/Prev functionality
        if (prevButton) {
            prevButton.addEventListener('click', (): void => {
                const newIndex: number = (currentSlide - 1 + testimonialItems.length) % testimonialItems.length;
                showSlide(newIndex
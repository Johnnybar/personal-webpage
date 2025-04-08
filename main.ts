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
    const navToggle: HTMLElement | null = document.querySelector('.menu-btn');
    const navMenu: HTMLElement | null = document.querySelector('.nav-links');
    const header: HTMLElement | null = document.querySelector('header');
    const navLinks: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('.nav-link');
    const backToTop: HTMLElement | null = document.getElementById('backToTop');
    const sections: NodeListOf<HTMLElement> = document.querySelectorAll('section[id]');

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

    

    // Contact form handling
    if (contactForm) {
        contactForm.addEventListener('submit', (e: Event): void => {
            e.preventDefault();
            
            // Get form data
            const formData: FormData = new FormData(contactForm);
            const formValues: {[key: string]: string} = {};
            
            formData.forEach((value, key): void => {
                formValues[key] = value.toString();
            });
            
            // Validate form (simple example)
            let isValid: boolean = true;
            const errorMessages: string[] = [];
            
            if (!formValues['name'] || formValues['name'].trim() === '') {
                isValid = false;
                errorMessages.push('Name is required');
            }
            
            if (!formValues['email'] || !isValidEmail(formValues['email'])) {
                isValid = false;
                errorMessages.push('Valid email is required');
            }
            
            if (!formValues['message'] || formValues['message'].trim() === '') {
                isValid = false;
                errorMessages.push('Message is required');
            }
            
            if (isValid) {
                // Here you would typically send the form data to a server
                // For demo purposes, we'll just log it and show success message
                console.log('Form submitted:', formValues);
                
                // Show success message (in a real implementation, this would happen after successful API call)
                const successMessage: HTMLDivElement = document.createElement('div');
                successMessage.className = 'form-success';
                successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
                
                contactForm.innerHTML = '';
                contactForm.appendChild(successMessage);
            } else {
                // Show error messages
                const errorContainer: HTMLDivElement | null = document.querySelector('.form-errors');
                
                if (errorContainer) {
                    errorContainer.innerHTML = '';
                    errorMessages.forEach(msg => {
                        const errorElem: HTMLParagraphElement = document.createElement('p');
                        errorElem.textContent = msg;
                        errorContainer.appendChild(errorElem);
                    });
                } else {
                    const newErrorContainer: HTMLDivElement = document.createElement('div');
                    newErrorContainer.className = 'form-errors';
                    
                    errorMessages.forEach(msg => {
                        const errorElem: HTMLParagraphElement = document.createElement('p');
                        errorElem.textContent = msg;
                        newErrorContainer.appendChild(errorElem);
                    });
                    
                    contactForm.insertBefore(newErrorContainer, contactForm.firstChild);
                }
            }
        });
    }
    
    // Helper function to validate email
    const isValidEmail = (email: string): boolean => {
        const regex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    // Add animation on scroll for portfolio-item
    const animateOnScroll = (): void => {
        const projectCards: NodeListOf<HTMLElement> = document.querySelectorAll('.portfolio-item');
        
        projectCards.forEach((card: HTMLElement): void => {
            const cardPosition: ElementPosition = card.getBoundingClientRect();
            const windowHeight: number = window.innerHeight;
            
            // If card is in viewport
            if (cardPosition.top < windowHeight - 100) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initialize project cards with opacity 0
    const projectCards: NodeListOf<HTMLElement> = document.querySelectorAll('.portfolio-item');
    projectCards.forEach((card: HTMLElement): void => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Add scroll event for animations
    window.addEventListener('scroll', animateOnScroll);
    
    // Initial check for elements in viewport
    animateOnScroll();
});

// Function to compile TypeScript to JavaScript
// This would be done using the TypeScript compiler in a real build process
// For deployment, you'll need to transpile this file to JavaScript using tsc
// tsc main.ts --target es6

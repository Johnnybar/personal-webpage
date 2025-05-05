// TypeScript main file for Jonathan Bareket's portfolio website
// DOM Elements
document.addEventListener("DOMContentLoaded", () => {
  // Navigation functionality
  const navToggle = document.querySelector(".menu-btn");
  const navMenu = document.querySelector(".nav-links");
  const header = document.querySelector("header");
  const navLinks = document.querySelectorAll(".nav-link");
  const backToTop = document.getElementById("backToTop");
  const sections = document.querySelectorAll("section[id]");
  // Contact form
  const contactForm = document.getElementById("contactForm");
  // Navigation toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      navToggle.classList.toggle("active");
    });
  }
  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      // Close mobile menu if open
      if (
        navMenu === null || navMenu === void 0
          ? void 0
          : navMenu.classList.contains("active")
      ) {
        navMenu.classList.remove("active");
        navToggle === null || navToggle === void 0
          ? void 0
          : navToggle.classList.remove("active");
      }
      const targetId = link.getAttribute("href") || "";
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        const yOffset = -80; // Header height + extra padding
        const y =
          targetSection.getBoundingClientRect().top +
          window.pageYOffset +
          yOffset;
        window.scrollTo({
          top: y,
          behavior: "smooth",
        });
      }
    });
  });
  // Back to top button
  if (backToTop) {
    backToTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
  // Header scroll effect and active nav item
  const onScroll = () => {
    const scrollPosition = window.scrollY;
    // Header shadow on scroll
    if (header) {
      if (scrollPosition > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }
    // Active navigation based on scroll position
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id") || "";
      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  };
  window.addEventListener("scroll", onScroll);
  // Initialize scroll position on page load
  onScroll();
  // Testimonial Slider
  let currentSlide = 0;
  const showSlide = (index) => {
    // Hide all slides
    testimonialItems.forEach((item) => {
      item.classList.remove("active");
    });
    // Update dots
    if (testimonialDots) {
      const dots = testimonialDots.querySelectorAll(".dot");
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });
    }
    // Show current slide
    if (testimonialItems[index]) {
      testimonialItems[index].classList.add("active");
      currentSlide = index;
    }
  };
  // Contact form handling
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      // Get form data
      const formData = new FormData(contactForm);
      const formValues = {};
      formData.forEach((value, key) => {
        formValues[key] = value.toString();
      });
      // Validate form (simple example)
      let isValid = true;
      const errorMessages = [];
      if (!formValues["name"] || formValues["name"].trim() === "") {
        isValid = false;
        errorMessages.push("Name is required");
      }
      if (!formValues["email"] || !isValidEmail(formValues["email"])) {
        isValid = false;
        errorMessages.push("Valid email is required");
      }
      if (!formValues["message"] || formValues["message"].trim() === "") {
        isValid = false;
        errorMessages.push("Message is required");
      }
      if (isValid) {
        // Here you would typically send the form data to a server
        // For demo purposes, we'll just log it and show success message
        console.log("Form submitted:", formValues);
        // Show success message (in a real implementation, this would happen after successful API call)
        const successMessage = document.createElement("div");
        successMessage.className = "form-success";
        successMessage.textContent =
          "Thank you for your message! I will get back to you soon.";
        contactForm.innerHTML = "";
        contactForm.appendChild(successMessage);
      } else {
        // Show error messages
        const errorContainer = document.querySelector(".form-errors");
        if (errorContainer) {
          errorContainer.innerHTML = "";
          errorMessages.forEach((msg) => {
            const errorElem = document.createElement("p");
            errorElem.textContent = msg;
            errorContainer.appendChild(errorElem);
          });
        } else {
          const newErrorContainer = document.createElement("div");
          newErrorContainer.className = "form-errors";
          errorMessages.forEach((msg) => {
            const errorElem = document.createElement("p");
            errorElem.textContent = msg;
            newErrorContainer.appendChild(errorElem);
          });
          contactForm.insertBefore(newErrorContainer, contactForm.firstChild);
        }
      }
    });
  }
  // Helper function to validate email
  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  // Add animation on scroll for portfolio-item
  const animateOnScroll = () => {
    const projectCards = document.querySelectorAll(".portfolio-item");
    projectCards.forEach((card) => {
      const cardPosition = card.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // If card is in viewport
      if (cardPosition.top < windowHeight - 100) {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }
    });
  };
  // Initialize project cards with opacity 0
  const projectCards = document.querySelectorAll(".portfolio-item");
  projectCards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  });
  // Add scroll event for animations
  window.addEventListener("scroll", animateOnScroll);
  // Initial check for elements in viewport
  animateOnScroll();
  var acc = document.getElementsByClassName("accordion");
  var acc = document.getElementsByClassName("accordion");
  for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      // toggle active class on the button
      this.classList.toggle("active");
      // toggle the panel
      var panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
  }
});
// Function to compile TypeScript to JavaScript
// This would be done using the TypeScript compiler in a real build process
// For deployment, you'll need to transpile this file to JavaScript using tsc
// tsc main.ts --target es6

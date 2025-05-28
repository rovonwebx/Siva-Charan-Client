// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    
    // Create mobile menu
    const mobileMenu = document.createElement('div');
    mobileMenu.classList.add('mobile-menu');
    const mobileMenuUl = document.querySelector('nav ul').cloneNode(true);
    mobileMenu.appendChild(mobileMenuUl);
    document.body.appendChild(mobileMenu);
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        // Toggle hamburger animation
        const bars = document.querySelectorAll('.bar');
        if (hamburger.classList.contains('active')) {
            bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });
    
    // Close mobile menu when clicking on a link
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active');
            
            // Reset hamburger
            const bars = document.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        });
    });
    
    // Typing effect
    const typedTextElement = document.querySelector('.typed-text');
    const cursorElement = document.querySelector('.cursor');
    
    if (typedTextElement) {
        const textArray = [
            "Student at SRM Chennai",
            "Web Developer",
            "UI/UX Designer",
            "Tech Enthusiast"
        ];
        
        let textArrayIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingDelay = 100; // Delay between each character typing
        let erasingDelay = 50; // Delay between each character erasing
        let newTextDelay = 2000; // Delay before starting to erase text
        
        function type() {
            const currentText = textArray[textArrayIndex];
            
            if (isDeleting) {
                // Remove character
                typedTextElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingDelay = erasingDelay;
            } else {
                // Add character
                typedTextElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingDelay = 100;
            }
            
            // If word is complete
            if (!isDeleting && charIndex === currentText.length) {
                // Set delay before starting to erase
                typingDelay = newTextDelay;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                // Move to next word
                textArrayIndex = (textArrayIndex + 1) % textArray.length;
                // Pause before typing next word
                typingDelay = 500;
            }
            
            setTimeout(type, typingDelay);
        }
        
        // Start the typing effect
        setTimeout(type, newTextDelay);
    }
    
    // Project Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                } else if (card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Transparent Header & Scroll Effect
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For now, we'll just log it to the console
            console.log('Form submitted:', { name, email, subject, message });
            
            // Show success message (you can customize this)
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        }
    });
    
    // Animation on scroll
    const animateElements = document.querySelectorAll('.section-title, .section-subtitle, .about-image-container, .about-card, .about-description p, .about-cta, .timeline-item, .timeline-card, .timeline-dot, .certification-card, .skill-category, .project-card, .contact-item, .hero-content > *, .profile-image');
    
    // Function to check if an element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
        );
    }
    
    // Function to add animation classes
    function addAnimationClasses() {
        animateElements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('fade-in');
                element.classList.add('animated'); // Mark as animated
            }
        });
    }
    
    // Run on scroll
    window.addEventListener('scroll', addAnimationClasses);
    
    // Run once on page load
    addAnimationClasses();
    
    // Add animation to hero elements on load
    const heroElements = document.querySelectorAll('.hero-greeting, .hero-content h1, .hero-subtitle, .hero-description, .cta-buttons, .social-icons, .profile-image');
    
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('fade-in');
            element.classList.add('animated');
        }, 300 * index);
    });
    
    // Add staggered animation for about cards
    document.addEventListener('scroll', function() {
        const aboutCards = document.querySelectorAll('.about-card');
        const aboutSection = document.querySelector('.about');
        
        if (aboutSection && isInViewport(aboutSection)) {
            aboutCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('fade-in');
                    card.classList.add('animated');
                }, 200 * index);
            });
        }
    }, { once: true });
    
    // Add staggered animation for timeline items
    document.addEventListener('scroll', function() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        const educationSection = document.querySelector('.education');
        
        if (educationSection && isInViewport(educationSection)) {
            timelineItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('fade-in');
                    item.classList.add('animated');
                    
                    // Animate the dot separately with a slight delay
                    const dot = item.querySelector('.timeline-dot');
                    if (dot) {
                        setTimeout(() => {
                            dot.classList.add('fade-in');
                            dot.classList.add('animated');
                        }, 300);
                    }
                }, 400 * index);
            });
        }
    }, { once: true });
    
    // Add staggered animation for certification cards
    document.addEventListener('scroll', function() {
        const certCards = document.querySelectorAll('.certification-card');
        const certSection = document.querySelector('.certifications-section');
        
        if (certSection && isInViewport(certSection)) {
            certCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('fade-in');
                    card.classList.add('animated');
                }, 200 * index);
            });
        }
    }, { once: true });
});
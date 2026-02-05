// DOM Elements
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navLinks = document.getElementById('navLinks');
        const header = document.getElementById('header');
        const notFoundPage = document.getElementById('notFoundPage');
        const goHomeBtn = document.getElementById('goHome');
        const contactForm = document.getElementById('contactForm');
        const externalLinks = document.querySelectorAll('.external-link');
        const sectionTitles = document.querySelectorAll('.section-title');
        const serviceCards = document.querySelectorAll('.service-card');
        const aboutText = document.querySelector('.about-text');
        const aboutImage = document.querySelector('.about-image');
        const statCards = document.querySelectorAll('.stat-card');
        const steps = document.querySelectorAll('.step');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        const testimonial = document.querySelector('.testimonial');
        const teamMembers = document.querySelectorAll('.team-member');
        const contactInfo = document.querySelector('.contact-info');
        const contactFormElement = document.querySelector('.contact-form');

        // Mobile Menu Toggle (robust + accessible)
        if (mobileMenuBtn && navLinks && header) {
            const updateNavPosition = () => {
                const rect = header.getBoundingClientRect();
                // Use header bottom to position the menu flush against the header.
                const topPos = Math.max(0, Math.ceil(rect.bottom) - 1); // overlap by 1px to avoid visual gap
                navLinks.style.top = `${topPos}px`;
                navLinks.style.maxHeight = `calc(100vh - ${topPos}px)`;
                // Reduce the nav panel's top padding when it's anchored to the header so it appears flush
                if (parseInt(navLinks.style.paddingTop || 0, 10) > 8) navLinks.style.paddingTop = '8px';
            };

            const closeMobileMenu = () => {
                navLinks.classList.remove('active');
                navLinks.setAttribute('aria-hidden', 'true');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
                navLinks.style.top = '';
                navLinks.style.maxHeight = '';
            };

            const openMobileMenu = () => {
                updateNavPosition();
                navLinks.classList.add('active');
                navLinks.setAttribute('aria-hidden', 'false');
                mobileMenuBtn.setAttribute('aria-expanded', 'true');
                mobileMenuBtn.innerHTML = '<i class="fas fa-times" aria-hidden="true"></i>';
            };

            mobileMenuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (navLinks.classList.contains('active')) {
                    closeMobileMenu();
                } else {
                    openMobileMenu();
                }
            });

            // Close when clicking any nav link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', closeMobileMenu);
            });

            // Close when clicking outside the menu
            document.addEventListener('click', (ev) => {
                if (!navLinks.contains(ev.target) && !mobileMenuBtn.contains(ev.target)) {
                    closeMobileMenu();
                }
            });

            // Close on Escape
            document.addEventListener('keydown', (ev) => {
                if (ev.key === 'Escape') closeMobileMenu();
            });

            // Recalculate menu position on resize/scroll while open
            window.addEventListener('resize', () => {
                if (navLinks.classList.contains('active')) updateNavPosition();
            });
            window.addEventListener('scroll', () => {
                if (navLinks.classList.contains('active')) updateNavPosition();
            });
        } else {
            // graceful fallback for unexpected DOM changes
            console.warn('Mobile menu: required elements not found.');
        }

        // Header scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Trigger animations when elements come into view
            triggerAnimations();
        });

        // 404 Page for External Links
        externalLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                notFoundPage.classList.add('show');
                document.body.style.overflow = 'hidden';
            });
        });

        // Go Home from 404 Page
        goHomeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            notFoundPage.classList.remove('show');
            document.body.style.overflow = 'auto';
        });

        // Contact Form Submission
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });

        // Animation on scroll
        function triggerAnimations() {
            // Section titles
            sectionTitles.forEach(title => {
                const rect = title.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.85) {
                    title.classList.add('visible');
                }
            });
            
            // Service cards
            serviceCards.forEach((card, index) => {
                const rect = card.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.85) {
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, index * 150);
                }
            });
            
            // About section
            if (aboutText) {
                const rect = aboutText.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.85) {
                    aboutText.classList.add('visible');
                    aboutImage.classList.add('visible');
                }
            }
            
            // Stats
            statCards.forEach((card, index) => {
                const rect = card.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.85) {
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, index * 150);
                }
            });
            
            // Process steps
            steps.forEach((step, index) => {
                const rect = step.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.85) {
                    setTimeout(() => {
                        step.classList.add('visible');
                    }, index * 150);
                }
            });
            
            // Portfolio items
            portfolioItems.forEach((item, index) => {
                const rect = item.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.85) {
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, index * 150);
                }
            });
            
            // Testimonial
            if (testimonial) {
                const rect = testimonial.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.85) {
                    testimonial.classList.add('visible');
                }
            }
            
            // Team members
            teamMembers.forEach((member, index) => {
                const rect = member.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.85) {
                    setTimeout(() => {
                        member.classList.add('visible');
                    }, index * 150);
                }
            });
            
            // Contact section
            if (contactInfo) {
                const rect = contactInfo.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.85) {
                    contactInfo.classList.add('visible');
                    contactFormElement.classList.add('visible');
                }
            }
        }

        // Testimonial Slider
        let currentTestimonial = 0;
        const testimonials = [
            {
                text: "Stackly transformed our outdated IT infrastructure into a modern, cloud-based system that improved our operational efficiency by 40%. Their team was professional, knowledgeable, and delivered beyond our expectations.",
                name: "Michael Rodriguez",
                position: "CTO, TechForward Inc.",
                image: "https://randomuser.me/api/portraits/men/32.jpg"
            },
            {
                text: "The mobile application developed by Stackly has significantly improved our customer engagement. Their attention to detail and user experience focus resulted in a product that our customers love to use.",
                name: "Jennifer Lee",
                position: "Product Manager, RetailPlus",
                image: "https://randomuser.me/api/portraits/women/26.jpg"
            },
            {
                text: "We partnered with Stackly for our cybersecurity needs, and their thorough assessment identified vulnerabilities we didn't even know existed. Their proactive approach has given us peace of mind.",
                name: "Robert Johnson",
                position: "Security Director, Global Finance Corp",
                image: "https://randomuser.me/api/portraits/men/54.jpg"
            }
        ];

        function rotateTestimonial() {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            const testimonialData = testimonials[currentTestimonial];
            
            testimonial.classList.remove('active');
            
            setTimeout(() => {
                testimonial.innerHTML = `
                    <p>"${testimonialData.text}"</p>
                    <div class="client-info">
                        <div class="client-avatar">
                            <img src="${testimonialData.image}" alt="Client">
                        </div>
                        <div>
                            <h4>${testimonialData.name}</h4>
                            <p>${testimonialData.position}</p>
                        </div>
                    </div>
                `;
                testimonial.classList.add('active');
            }, 400);
        }

        // Auto-rotate testimonials every 5 seconds
        setInterval(rotateTestimonial, 5000);

        // Trigger initial animations
        window.addEventListener('load', () => {
            triggerAnimations();
            
            // Initial fade-in for hero elements
            setTimeout(() => {
                document.querySelector('.hero-text').style.animationPlayState = 'running';
            }, 300);
            
            setTimeout(() => {
                document.querySelector('.hero-image').style.animationPlayState = 'running';
            }, 600);
        });
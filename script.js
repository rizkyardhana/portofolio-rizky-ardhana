/* ===================================
   MUHAMMAD RIZKI ARDHANA — PORTFOLIO
   Interactive JavaScript
   =================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ============ Dark / Light Theme Toggle ============
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const savedTheme = localStorage.getItem('portfolio-theme');

    // Apply saved theme on initial load
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        if (themeIcon) {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (themeIcon) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const targetTheme = currentTheme === 'light' ? 'dark' : 'light';

            document.documentElement.setAttribute('data-theme', targetTheme);
            localStorage.setItem('portfolio-theme', targetTheme);

            if (themeIcon) {
                if (targetTheme === 'light') {
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-moon');
                    themeToggle.setAttribute('title', 'Ganti ke Mode Gelap');
                } else {
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                    themeToggle.setAttribute('title', 'Ganti ke Mode Terang');
                }
            }
        });
    }

    // ============ Cursor Glow Effect ============
    const cursorGlow = document.getElementById('cursorGlow');
    if (cursorGlow) {
        let mouseX = 0, mouseY = 0;
        let glowX = 0, glowY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorGlow.classList.add('active');
        });

        function animateGlow() {
            glowX += (mouseX - glowX) * 0.08;
            glowY += (mouseY - glowY) * 0.08;
            cursorGlow.style.left = glowX + 'px';
            cursorGlow.style.top = glowY + 'px';
            requestAnimationFrame(animateGlow);
        }
        animateGlow();

        document.addEventListener('mouseleave', () => {
            cursorGlow.classList.remove('active');
        });
    }

    // ============ Navbar Scroll Effect ============
    const navbar = document.getElementById('navbar');
    const scrollTop = document.getElementById('scrollTop');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function handleScroll() {
        const scrollY = window.scrollY;

        // Sticky navbar
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll to top button
        if (scrollTop) {
            if (scrollY > 500) {
                scrollTop.classList.add('show');
            } else {
                scrollTop.classList.remove('show');
            }
        }

        // Active nav link based on scroll position
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // ============ Scroll to Top ============
    if (scrollTop) {
        scrollTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ============ Mobile Nav Toggle ============
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile menu when clicking a link
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ============ Typing Animation ============
    const typingElement = document.getElementById('typingText');
    if (typingElement) {
        const phrases = [
            'Full Stack Web Developer',
            'Software Engineer',
            'Programmer',
            'Frontend & Backend Specialist',
            'Web Development Specialist',
            'Co-Founder & CTO Bariz'
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 80;

        function typeText() {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 40;
            } else {
                typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 80;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 400; // Pause before next phrase
            }

            setTimeout(typeText, typeSpeed);
        }

        setTimeout(typeText, 1000);
    }

    // ============ Scroll Animations (Intersection Observer) ============
    const animatedElements = document.querySelectorAll('[data-animate]');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, parseInt(delay));
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));

    // ============ Counter Animation ============
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const count = parseInt(target.dataset.count);
                animateCounter(target, count);
                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));

    function animateCounter(element, target) {
        let current = 0;
        const duration = 2000;
        const step = target / (duration / 16);

        function update() {
            current += step;
            if (current >= target) {
                element.textContent = target;
                return;
            }
            element.textContent = Math.floor(current);
            requestAnimationFrame(update);
        }
        update();
    }

    // ============ Skill Bar Animation ============
    const skillBars = document.querySelectorAll('.skill-bar-fill');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.dataset.width;
                entry.target.style.width = width + '%';
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    skillBars.forEach(bar => skillObserver.observe(bar));

    // ============ Hero Particles ============
    const particleContainer = document.getElementById('heroParticles');
    if (particleContainer) {
        const particleCount = 30;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            const size = Math.random() * 4 + 1;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 10;
            const opacity = Math.random() * 0.4 + 0.1;

            particle.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${x}%;
                top: ${y}%;
                opacity: ${opacity};
                animation: particle-float ${duration}s linear ${delay}s infinite;
            `;

            particleContainer.appendChild(particle);
        }

        // Add keyframes for particle animation
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            @keyframes particle-float {
                0% {
                    transform: translateY(0) translateX(0);
                    opacity: 0;
                }
                10% {
                    opacity: 0.3;
                }
                90% {
                    opacity: 0.3;
                }
                100% {
                    transform: translateY(-100vh) translateX(${Math.random() > 0.5 ? '' : '-'}${Math.random() * 100}px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(styleSheet);
    }

    // ============ Contact Form (Basic) ============
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = document.getElementById('submitBtn');
            const originalText = submitBtn.innerHTML;

            // Simulate sending
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Pesan Terkirim!';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                    contactForm.reset();
                }, 2500);
            }, 1500);
        });
    }

    // ============ FAQ Accordion ============
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        if (questionBtn) {
            questionBtn.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close other items for single-open accordion feel
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherBtn = otherItem.querySelector('.faq-question');
                        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
                    }
                });

                item.classList.toggle('active', !isActive);
                questionBtn.setAttribute('aria-expanded', !isActive ? 'true' : 'false');
            });
        }
    });

    // ============ Live Clock (Yogyakarta / WIB) ============
    const liveClockEl = document.getElementById('liveClock');
    if (liveClockEl) {
        function updateLiveClock() {
            const now = new Date();
            const timeString = now.toLocaleTimeString('id-ID', {
                timeZone: 'Asia/Jakarta',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });
            liveClockEl.textContent = `${timeString} WIB`;
        }
        updateLiveClock();
        setInterval(updateLiveClock, 1000);
    }

    // ============ Terminal Code Copy Button ============
    const copyCodeBtn = document.getElementById('copyCodeBtn');
    const copyCodeText = document.getElementById('copyCodeText');
    if (copyCodeBtn) {
        copyCodeBtn.addEventListener('click', () => {
            const codeContent = `{
  "name": "Muhammad Rizki Ardhana",
  "role": "Full Stack Web Developer & Software Engineer",
  "leadership": "Co-Founder & CTO @ Bariz",
  "education": "Teknik Informatika UAJY (IPK 3.5)",
  "coreStack": ["JavaScript", "React", "Node.js", "PHP", "MySQL"],
  "passion": "Clean Code, Aksesibilitas Web & Scalability",
  "availableForHire": true
}`;
            navigator.clipboard.writeText(codeContent).then(() => {
                if (copyCodeText) copyCodeText.textContent = 'Tersalin! ✓';
                copyCodeBtn.style.borderColor = '#10b981';
                copyCodeBtn.style.color = '#10b981';

                setTimeout(() => {
                    if (copyCodeText) copyCodeText.textContent = 'Salin JSON';
                    copyCodeBtn.style.borderColor = '';
                    copyCodeBtn.style.color = '';
                }, 2000);
            }).catch(() => {
                if (copyCodeText) copyCodeText.textContent = 'Gagal Salin';
            });
        });
    }

    // ============ Project Category Filter Tabs ============
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length > 0 && projectCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category') || '';
                    if (filterValue === 'all' || cardCategory.includes(filterValue)) {
                        card.classList.remove('filter-hide');
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(15px)';
                        setTimeout(() => {
                            card.style.transition = 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.classList.add('filter-hide');
                    }
                });
            });
        });
    }

    // ============ CV Download Modal ============
    const openCvModalBtn = document.getElementById('openCvModal');
    const closeCvModalBtn = document.getElementById('closeCvModal');
    const cvModal = document.getElementById('cvModal');

    if (cvModal) {
        if (openCvModalBtn) {
            openCvModalBtn.addEventListener('click', (e) => {
                e.preventDefault();
                cvModal.classList.add('active');
                cvModal.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
            });
        }

        if (closeCvModalBtn) {
            closeCvModalBtn.addEventListener('click', () => {
                cvModal.classList.remove('active');
                cvModal.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            });
        }

        // Close on backdrop click
        cvModal.addEventListener('click', (e) => {
            if (e.target === cvModal) {
                cvModal.classList.remove('active');
                cvModal.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            }
        });

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && cvModal.classList.contains('active')) {
                cvModal.classList.remove('active');
                cvModal.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            }
        });
    }

    // ============ Smooth Scroll for Anchor Links ============
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

});
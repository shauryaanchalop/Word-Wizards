// Extracted from original file.

// Store SVG icons in JS variables
        const instaSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 1.748-6.983 6.096-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.203 4.348 2.625 5.896 6.983 6.096 1.28.058 1.688.072 4.947.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-1.748 6.979-6.096.059-1.28.073-1.687.073-4.947s-.014-3.667-.072-4.947c-.196-4.354-2.617-5.896-6.979-6.096-1.28-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`;
        const linkedinSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>`;

        // 1. LENIS SMOOTH SCROLLING INIT
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        if (typeof lenis !== 'undefined' && lenis) {
            lenis.on('scroll', () => {
                if (typeof revealElement === 'function') revealElement();
            });
        }

        // Preloader & Initial GSAP Hero Animations (with mobile network fallback)
        let preloaderDismissed = false;
        function dismissPreloader() {
            if (preloaderDismissed) return;
            preloaderDismissed = true;
            const preloader = document.querySelector('.preloader');
            const progress = document.querySelector('.progress');
            if (progress) progress.style.width = '100%';
            if (preloader) preloader.classList.add('fade-out');
            document.body.classList.remove('loading');
            
            // Trigger GSAP Hero animations after preloader
            if (typeof gsap !== 'undefined') {
                gsap.from(".hero-title", {y: 100, opacity: 0, duration: 1.5, ease: "power4.out", delay: 0.2});
                gsap.from(".hero-subtitle", {y: 50, opacity: 0, duration: 1.5, ease: "power4.out", delay: 0.4});
                gsap.from(".hero-btn", {scale: 0.8, opacity: 0, duration: 1.5, ease: "elastic.out(1, 0.5)", delay: 0.6});
            }
        }

        window.addEventListener('load', () => {
            const progress = document.querySelector('.progress');
            if (progress) setTimeout(() => { progress.style.width = '100%'; }, 100);
            setTimeout(dismissPreloader, 2100);
        });

        // Maximum fallback for mobile 3G/4G connections: dismiss preloader after 3.8s
        setTimeout(dismissPreloader, 3800);

        // 2. THE GSAP CURSOR (Dynamic, responsive, and compatible with PC, mobile, & touchscreen laptops)
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');
        let cursorInitialized = false;

        function enableCustomCursor() {
            if (cursorInitialized || !cursorDot || !cursorOutline || typeof gsap === 'undefined' || window.innerWidth <= 900 || window.matchMedia('(pointer: coarse)').matches) return;
            cursorInitialized = true;
            document.body.classList.add('custom-cursor-active');

            gsap.set(cursorDot, {xPercent: -50, yPercent: -50});
            gsap.set(cursorOutline, {xPercent: -50, yPercent: -50});
            
            let xToDot = gsap.quickTo(cursorDot, "x", {duration: 0.1, ease: "power3"}),
                yToDot = gsap.quickTo(cursorDot, "y", {duration: 0.1, ease: "power3"}),
                xToOut = gsap.quickTo(cursorOutline, "x", {duration: 0.4, ease: "power3.out"}),
                yToOut = gsap.quickTo(cursorOutline, "y", {duration: 0.4, ease: "power3.out"});

            window.addEventListener('mousemove', (e) => {
                if (!document.body.classList.contains('custom-cursor-active')) {
                    document.body.classList.add('custom-cursor-active');
                }
                xToDot(e.clientX); yToDot(e.clientY);
                xToOut(e.clientX); yToOut(e.clientY);
            });

            document.addEventListener('mouseover', (e) => {
                if (e.target.closest('.premium-hover, a, button, .logo, .close-modal-btn, .img-wrap img, .card-container, .faculty-profile-card, .equal-card, .tech-highlight-card, .recruit-card, .results-check-btn, .results-dismiss-btn, .results-close-btn, .clear-search-btn, .selection-select, .reset-filters-btn, .tab-btn, .btn-white')) {
                    document.body.classList.add('hovering');
                }
            });
            document.addEventListener('mouseout', (e) => {
                if (e.target.closest('.premium-hover, a, button, .logo, .close-modal-btn, .img-wrap img, .card-container, .faculty-profile-card, .equal-card, .tech-highlight-card, .recruit-card, .results-check-btn, .results-dismiss-btn, .results-close-btn, .clear-search-btn, .selection-select, .reset-filters-btn, .tab-btn, .btn-white')) {
                    document.body.classList.remove('hovering');
                }
            });
        }

        window.addEventListener('pointerdown', (e) => {
            if (e.pointerType === 'touch') {
                document.body.classList.remove('custom-cursor-active');
            } else if (e.pointerType === 'mouse') {
                enableCustomCursor();
            }
        });
        window.addEventListener('mousemove', () => {
            enableCustomCursor();
        }, { once: true });
        window.addEventListener('touchstart', () => {
            document.body.classList.remove('custom-cursor-active');
        }, { passive: true });
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 900) {
                document.body.classList.remove('custom-cursor-active');
            }
        });

        // GSAP 3D Hover Effect - Maintained on desktops
        if (typeof gsap !== 'undefined') {
            document.querySelectorAll('.card-container').forEach(container => {
                const card = container.querySelector('.team-card');
                if (!card) return;
                container.addEventListener('mousemove', function(e) {
                    const rect = this.getBoundingClientRect();
                    const xRotation = -(((e.clientY - rect.top) - rect.height / 2) / rect.height) * 25; 
                    const yRotation = (((e.clientX - rect.left) - rect.width / 2) / rect.width) * 25;
                    
                    gsap.to(card, {
                        rotationX: xRotation,
                        rotationY: yRotation,
                        duration: 0.4,
                        ease: "power2.out"
                    });
                });
                container.addEventListener('mouseleave', function() {
                    gsap.to(card, {
                        rotationX: 0,
                        rotationY: 0,
                        duration: 0.7,
                        ease: "power3.out"
                    });
                });
            });
        }

        const hamburger = document.querySelector('.hamburger');
        const navLinksContainer = document.querySelector('.nav-links');

        hamburger.addEventListener('click', () => {
            navLinksContainer.classList.toggle('nav-active');
            hamburger.classList.toggle('toggle');
        });

        // Tab System Logic
        document.querySelectorAll('.tab-container').forEach(container => {
            const tabBtns = container.querySelectorAll('.tab-btn');
            const tabContents = container.querySelectorAll('.tab-content');

            tabBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    tabBtns.forEach(b => b.classList.remove('active'));
                    tabContents.forEach(c => c.classList.remove('active'));
                    
                    btn.classList.add('active');
                    container.querySelector('#' + btn.getAttribute('data-tab')).classList.add('active');
                    setTimeout(() => {
                        revealElement();
                        ScrollTrigger.refresh(); 
                    }, 50);
                });
            });
        });

        function switchSection(targetId) {
            if (navLinksContainer && navLinksContainer.classList.contains('nav-active')) {
                navLinksContainer.classList.remove('nav-active');
                if (hamburger) hamburger.classList.remove('toggle');
            }
            document.querySelectorAll('.page-section').forEach(sec => sec.classList.remove('active'));
            const targetSec = document.querySelector(targetId);
            if (targetSec) targetSec.classList.add('active');
            
            if (typeof lenis !== 'undefined' && lenis) {
                lenis.scrollTo(0, {immediate: true}); 
            } else {
                window.scrollTo(0, 0);
            }
            
            document.querySelectorAll('.nav-links a').forEach(link => {
                if (link.getAttribute('data-target') === targetId) link.classList.add('active-link');
                else link.classList.remove('active-link');
            });
            setTimeout(() => {
                revealElement();
                if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
            }, 60);
        }

        // Global delegation for navigation links & triggers and mobile menu dismissal
        document.addEventListener('click', (e) => {
            const trigger = e.target.closest('.nav-links a, .nav-trigger, .logo');
            if (trigger) {
                const target = trigger.getAttribute('data-target') || '#home';
                switchSection(target);
            }
            if (navLinksContainer && navLinksContainer.classList.contains('nav-active')) {
                if (!navLinksContainer.contains(e.target) && !hamburger.contains(e.target)) {
                    navLinksContainer.classList.remove('nav-active');
                    if (hamburger) hamburger.classList.remove('toggle');
                }
            }
        });

        const navbar = document.getElementById('navbar');

        window.addEventListener('scroll', () => {
            let scrollY = window.scrollY;
            if (scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        function revealElement() {
            document.querySelectorAll(".reveal").forEach(el => {
                if (el.getBoundingClientRect().top < window.innerHeight - 100) el.classList.add("active-reveal");
            });
        }
        window.addEventListener("scroll", revealElement);
        window.addEventListener("load", revealElement);

        // IMAGE LIGHTBOX LOGIC
        const lightbox = document.getElementById('imageLightbox');
        const lightboxImg = lightbox.querySelector('.lightbox-img');
        const lightboxClose = lightbox.querySelector('.lightbox-close-btn');

        document.querySelectorAll('.gallery-track img, .photo-grid img').forEach(img => {
            img.addEventListener('click', (e) => {
                e.stopPropagation();
                lightboxImg.src = img.src;
                lightbox.classList.add('active');
                lenis.stop(); // Freeze background scrolling
                document.body.classList.remove('hovering'); // Prevent cursor glitch
            });
        });

        lightboxClose.addEventListener('click', (e) => {
            e.stopPropagation(); 
            lightbox.classList.remove('active');
            lenis.start(); 
        });

        lightbox.addEventListener('click', (e) => {
            if(e.target !== lightboxImg) {
                lightbox.classList.remove('active');
                lenis.start();
            }
        });

        // ELITE SQUIRCLE MODAL LOGIC (Fixed for social links)
        const modalOverlay = document.getElementById('memberModal');
        const modalClose = document.getElementById('closeModal');
        const modalAvatar = document.getElementById('modalAvatar');
        const modalName = document.getElementById('modalName');
        const modalRole = document.getElementById('modalRole');
        const modalDesc = document.getElementById('modalDesc');

        // Event listener is on the card-container to guarantee click
        document.querySelectorAll('.card-container').forEach(container => {
            container.addEventListener('click', function() {
                const name = this.getAttribute('data-name');
                const role = this.getAttribute('data-role');
                const img = this.getAttribute('data-img');
                const desc = this.getAttribute('data-desc');
                const insta = this.getAttribute('data-insta');
                const linkedin = this.getAttribute('data-linkedin');

                modalName.textContent = name;
                modalRole.textContent = role;
                modalAvatar.style.backgroundImage = `url('${img}')`;
                
                let htmlContent = `<p>${desc}</p>`;
                
                if(insta && insta !== "#" || linkedin && linkedin !== "#") {
                    htmlContent += `<div class="modal-socials">`;
                    if(insta && insta !== "#") htmlContent += `<a href="${insta}" target="_blank" rel="noopener noreferrer" class="premium-hover">${instaSVG}</a>`;
                    if(linkedin && linkedin !== "#") htmlContent += `<a href="${linkedin}" target="_blank" rel="noopener noreferrer" class="premium-hover">${linkedinSVG}</a>`;
                    htmlContent += `</div>`;
                }
                
                modalDesc.innerHTML = htmlContent;

                modalOverlay.classList.add('active');
                lenis.stop(); 
            });
        });

        modalClose.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
            lenis.start(); 
        });

        modalOverlay.addEventListener('click', (e) => {
            if(e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
                lenis.start();
            }
        });

        // ==========================================
        // 5. AUDITIONS RESULTS LIVE ANNOUNCEMENT POPUP
        // ==========================================
        const resultsModal = document.getElementById('resultsModal');
        const closeResultsModal = document.getElementById('closeResultsModal');
        const checkResultsBtn = document.getElementById('checkResultsBtn');
        const dismissResultsBtn = document.getElementById('dismissResultsBtn');

        function openResultsModal() {
            if (!resultsModal) return;
            resultsModal.classList.add('active');
            if (typeof lenis !== 'undefined' && lenis) lenis.stop();
        }

        function hideResultsModal() {
            if (!resultsModal) return;
            resultsModal.classList.remove('active');
            if (typeof lenis !== 'undefined' && lenis) lenis.start();
        }

        // Show the results popup automatically after preloader finishes
        window.addEventListener('load', () => {
            setTimeout(() => {
                openResultsModal();
            }, 2600);
        });

        if (checkResultsBtn) {
            checkResultsBtn.addEventListener('click', () => {
                hideResultsModal();
                switchSection('#selections');
                const searchInput = document.getElementById('recruitSearchInput');
                if (searchInput) {
                    setTimeout(() => searchInput.focus(), 350);
                }
            });
        }

        if (closeResultsModal) {
            closeResultsModal.addEventListener('click', hideResultsModal);
        }

        if (dismissResultsBtn) {
            dismissResultsBtn.addEventListener('click', hideResultsModal);
        }

        if (resultsModal) {
            resultsModal.addEventListener('click', (e) => {
                if (e.target === resultsModal) {
                    hideResultsModal();
                }
            });
        }

        // ==========================================
        // 6. SELECTED MEMBERS (AUDITION RESULTS) DATA & NAME SEARCH LOGIC
        // ==========================================
        // Official list of selected members of Word Wizards from Auditions
        // Details: name, branch, and section (no department system)
        const selectedStudentsList = [
            { name: "Aarush Jain", branch: "CSE", section: "A", departments: ["Technical"] },
            { name: "Aashu Kumari", branch: "IT", section: "E", departments: ["Creative"] },
            { name: "Aastha Pandey", branch: "IT", section: "F", departments: ["Anchoring"] },
            { name: "Aavika Bhatt", branch: "CSE", section: "Q", departments: ["Content"] },
            { name: "Abdulla Siddiqui", branch: "CSE", section: "Q", departments: ["Content"] },
            { name: "Abhijeet Kumar Rai", branch: "CST", section: "O", departments: ["Technical"] },
            { name: "Abhinav Kumar Jha", branch: "CST", section: "O", departments: ["Event","Content"] },
            { name: "Addhyan Kumar", branch: "CS", section: "W", departments: ["Technical","Creative","Content","Graphics"] },
            { name: "Aditya Yadav", branch: "AIML", section: "I", departments: ["Technical"] },
            { name: "Adrika Bhadauria", branch: "CSE", section: "B", departments: ["Technical","Anchoring"] },
            { name: "Afshara", branch: "CSE", section: "B", departments: ["Technical"] },
            { name: "Akash Singh", branch: "CS", section: "W", departments: ["Technical", "Video Editing"] },
            { name: "Akshat Aggarwal", branch: "CSE", section: "A", departments: ["Technical"] },
            { name: "Akshay", branch: "CST", section: "O", departments: ["Technical","Content"] },
            { name: "Akshit Mishra", branch: "AIML", section: "T", departments: ["Technical","PR & Sponsorship","Content"] },
            { name: "Akshita Purohit", branch: "AIML", section: "T", departments: ["Anchoring","Social Media","Video Editing"] },
            { name: "Aman Kumar Singh", branch: "CSE", section: "A", departments: ["Event"] },
            { name: "Amay Jain", branch: "ECE", section: "R", departments: ["Technical"] },
            { name: "Ambika Jha", branch: "AIDS", section: "M", departments: ["Technical","Anchoring","Video Editing"] },
            { name: "Amitanshu Srivastava", branch: "CS", section: "W", departments: ["Technical","Graphics","Content"] },
            { name: "Amlesh Mishra", branch: "AIDS", section: "M", departments: ["Technical","Content","Graphics"] },
            { name: "Anjali Yadav", branch: "IT", section: "F", departments: ["Social Media"] },
            { name: "Ankit Kumar", branch: "AIML", section: "J", departments: ["Technical","Event"] },
            { name: "Ankit Kumar Prajapati", branch: "IT", section: "F", departments: ["Technical"] },
            { name: "Anmol Gupta", branch: "AIDS", section: "M", departments: ["Technical","Anchoring"] },
            { name: "Anshika Kumari", branch: "CSE", section: "C", departments: ["Technical","Anchoring"] },
            { name: "Anshul Bhardwaj", branch: "AIML", section: "J", departments: ["Creative"] },
            { name: "Arihant Rehal", branch: "AIDS", section: "M", departments: ["Technical","Content"] },
            { name: "Arnav Aggarwal", branch: "CST", section: "V", departments: ["PR & Sponsorship"] },
            { name: "Arnav Nagpal", branch: "AIML", section: "I", departments: ["Technical"] },
            { name: "Arnav Shrivastav", branch: "AIML", section: "J", departments: ["Technical","Graphics"] },
            { name: "Aryan Chanana", branch: "AIDS", section: "L", departments: ["Technical"] },
            { name: "Ashish Kumar Dwivedi", branch: "CSE", section: "C", departments: ["Technical","Content"] },
            { name: "Atharv Gupta", branch: "AIDS", section: "U", departments: ["Creative"] },
            { name: "Avni", branch: "AIDS", section: "U", departments: ["Graphics","Creative"] },
            { name: "Ayaan Asif", branch: "CST", section: "O", departments: ["Technical","Anchoring"] },
            { name: "Ayna Pathak", branch: "AIDS", section: "N", departments: ["Event","PR & Sponsorship"] },
            { name: "Ayush", branch: "IT", section: "E", departments: ["Video Editing"] },
            { name: "Ayush Jha", branch: "AIDS", section: "M", departments: ["PR & Sponsorship"] },
            { name: "Ayush Kaushik", branch: "AIML", section: "K", departments: ["Creative"] },
            { name: "Bhavik Bhasin", branch: "IT", section: "E", departments: ["Event","PR & Sponsorship"] },
            { name: "Bhavya Jain", branch: "AIML", section: "I", departments: ["Technical","Content"] },
            { name: "Bhavya Jain", branch: "ME", section: "G&H", departments: ["Graphics"] },
            { name: "Bhumika Kandpal", branch: "AIDS", section: "N", departments: ["Technical","PR & Sponsorship","Creative"] },
            { name: "Chetanya Verma", branch: "AIML", section: "T", departments: ["Technical","Social Media","Video Editing"] },
            { name: "Daksh Jain", branch: "CST", section: "O", departments: ["Video Editing"] },
            { name: "Daksh Kaushik", branch: "AIML", section: "T", departments: ["Technical"] },
            { name: "Deepak Maurya", branch: "CS", section: "W", departments: ["Event","PR & Sponsorship"] },
            { name: "Dev", branch: "AIDS", section: "M", departments: ["Social Media","Video Editing"] },
            { name: "Dev Bhardwaj", branch: "CSE", section: "C", departments: ["Technical","Anchoring","PR & Sponsorship"] },
            { name: "Devansh Jha", branch: "ECE", section: "R", departments: ["Technical","Event"] },
            { name: "Devika Yadav", branch: "AIDS", section: "N", departments: ["Technical","Anchoring","Event"] },
            { name: "Dhriti Samanotra", branch: "CS", section: "W", departments: ["Technical"] },
            { name: "Dishant Verma", branch: "AIDS", section: "L", departments: ["Technical","Event"] },
            { name: "Divyanshi", branch: "CS", section: "P", departments: ["Technical","Event"] },
            { name: "Divyanshi Malik", branch: "IT", section: "F", departments: ["Event"] },
            { name: "Divyanshu Tiwari", branch: "AIML", section: "I", departments: ["PR & Sponsorship"] },
            { name: "Farhan", branch: "AIDS", section: "M", departments: ["Technical","Graphics","PR & Sponsorship"] },
            { name: "Farhan Ahmed", branch: "AIML", section: "J", departments: ["Technical"] },
            { name: "Garv Chawla", branch: "AIDS", section: "N", departments: ["Technical","Event","Creative"] },
            { name: "Ginishka Arora", branch: "AIDS", section: "M", departments: ["Technical", "Video Editing"] },
            { name: "Gouri Saroch", branch: "CSE", section: "C", departments: ["Technical"] },
            { name: "Gyan Prakash", branch: "CSE", section: "Q", departments: ["Technical","Event"] },
            { name: "Hardik Raj", branch: "AIML", section: "T", departments: ["Creative"] },
            { name: "Harsh Chaudhary", branch: "CS", section: "W", departments: ["Technical"] },
            { name: "Harsh Mathpal", branch: "CSE", section: "Q", departments: ["Event"] },
            { name: "Harsh Pratap Singh", branch: "CS", section: "P", departments: ["Technical","PR & Sponsorship"] },
            { name: "Harsh Raj", branch: "CSE", section: "A", departments: ["Event"] },
            { name: "Harsh Sharma", branch: "CST", section: "O", departments: ["Technical","Event"] },
            { name: "Harshit Jaiswal", branch: "IT", section: "E", departments: ["Social Media"] },
            { name: "Hena Monga", branch: "AIML", section: "J", departments: ["Technical"] },
            { name: "Iqra Khan", branch: "CSE", section: "B", departments: ["Technical","Anchoring"] },
            { name: "Isha Chhikara", branch: "IT", section: "F", departments: ["Technical","Anchoring"] },
            { name: "Janvi", branch: "AIML", section: "I", departments: ["Technical"] },
            { name: "Jatin", branch: "AIDS", section: "L", departments: ["Event"] },
            { name: "Jatin Jaiswal", branch: "IT", section: "E", departments: ["Content","Creative"] },
            { name: "Jitika Bansal", branch: "AIDS", section: "N", departments: ["Event","Graphics","PR & Sponsorship"] },
            { name: "Kajal Verma", branch: "AIML", section: "J", departments: ["Creative"] },
            { name: "Kartikeya Sharma", branch: "CST", section: "V", departments: ["Event","Content","PR & Sponsorship"] },
            { name: "Kashvi Sharma", branch: "IT", section: "E", departments: ["PR & Sponsorship","Content"] },
            { name: "Kashvi Verma", branch: "ECE", section: "D", departments: ["Video Editing","Technical"] },
            { name: "Kaveri", branch: "IT", section: "E", departments: ["Creative"] },
            { name: "Kavya Gujral", branch: "AIDS", section: "M", departments: ["Technical","Event"] },
            { name: "Ketki", branch: "CSE", section: "A", departments: ["Anchoring"] },
            { name: "Khushal Jain", branch: "AIDS", section: "L", departments: ["Technical","Event"] },
            { name: "Khushi Gupta", branch: "IT", section: "F", departments: ["Technical","Anchoring","Creative"] },
            { name: "Khushi Kumari", branch: "AIML", section: "J", departments: ["Event"] },
            { name: "Khushi Sharma", branch: "CSE", section: "C", departments: ["Technical"] },
            { name: "Kinjal Gupta", branch: "AIDS", section: "L", departments: ["Technical","Creative"] },
            { name: "Krishna Saxena", branch: "IT", section: "E", departments: ["PR & Sponsorship","Event"] },
            { name: "Krishna Sinha", branch: "CST", section: "V", departments: ["Event","PR & Sponsorship"] },
            { name: "Kritarth Shukla", branch: "AIML", section: "I", departments: ["Technical"] },
            { name: "Kriti Jain", branch: "AIDS", section: "M", departments: ["Event"] },
            { name: "Lakshay Murthy", branch: "IT", section: "S", departments: ["Technical","Event","PR & Sponsorship"] },
            { name: "Lakshit", branch: "CS", section: "P", departments: ["Technical","PR & Sponsorship"] },
            { name: "Lavanye Garg", branch: "AIML", section: "K", departments: ["Technical"] },
            { name: "Madhav Gupta", branch: "IT", section: "E", departments: ["Social Media","Video Editing","Content"] },
            { name: "Madhav Kabra", branch: "AIDS", section: "U", departments: ["Technical"] },
            { name: "Manan Masiwal", branch: "AIML", section: "T", departments: ["Content"] },
            { name: "Mansi Tiwari", branch: "CSE", section: "B", departments: ["Creative","Anchoring","PR & Sponsorship"] },
            { name: "Mayank Sharma", branch: "AIML", section: "J", departments: ["Technical","Event"] },
            { name: "Mayank Yadav", branch: "CS", section: "W", departments: ["Technical"] },
            { name: "MD Anwar", branch: "CSE", section: "A", departments: ["Technical"] },
            { name: "Meenakshi Saun", branch: "IT", section: "F", departments: ["Technical","Creative"] },
            { name: "Mohd Asad Ahmad", branch: "AIML", section: "J", departments: ["Event"] },
            { name: "Mohd. Kaif", branch: "AIML", section: "K", departments: ["Content"] },
            { name: "Mohit Chhabra", branch: "AIML", section: "T", departments: ["Content"] },
            { name: "Mourya Aditya", branch: "CSE", section: "A", departments: ["Technical","Creative"] },
            { name: "Naitik Malhotra", branch: "CST", section: "V", departments: ["Technical","PR & Sponsorship"] },
            { name: "Naman Agarwal", branch: "IT", section: "E", departments: ["Event"] },
            { name: "Naman Jain", branch: "ECE", section: "R", departments: ["Technical"] },
            { name: "Naman Kr. Singh", branch: "AIML", section: "T", departments: ["Creative","Content"] },
            { name: "Namit Bisht", branch: "CSE", section: "A", departments: ["Technical"] },
            { name: "Nikunj Malik", branch: "AIML", section: "I", departments: ["Technical","Event"] },
            { name: "Nirbhay", branch: "CSE", section: "Q", departments: ["Technical","Social Media","Video Editing","Graphics"] },
            { name: "Nisha Kumari", branch: "CSE", section: "A", departments: ["Technical", "Creative"] },
            { name: "Nitin Kumar", branch: "CSE", section: "B", departments: ["Technical"] },
            { name: "Niya Sharma", branch: "CS", section: "P", departments: ["Graphics"] },
            { name: "Niyati Rawat", branch: "IT", section: "E", departments: ["Graphics","Video Editing"] },
            { name: "Ojassv Manchanda", branch: "AIDS", section: "M", departments: ["Graphics"] },
            { name: "Palak Sharma", branch: "IT", section: "F", departments: ["Anchoring","Content"] },
            { name: "Piyush", branch: "AIML", section: "J", departments: ["Technical"] },
            { name: "Prachi", branch: "CST", section: "V", departments: ["Technical","PR & Sponsorship","Creative"] },
            { name: "Prajna Sharma", branch: "AIDS", section: "M", departments: ["Creative","Graphics"] },
            { name: "Pranav Aggarwal", branch: "AIML", section: "I", departments: ["Technical","Anchoring"] },
            { name: "Prateek", branch: "CSE", section: "C", departments: ["Technical","PR & Sponsorship"] },
            { name: "Pratyush Shandilya", branch: "IT", section: "S", departments: ["Technical","Event","PR & Sponsorship"] },
            { name: "Prince Malay", branch: "CSE", section: "B", departments: ["Technical","PR & Sponsorship"] },
            { name: "Prince Soni", branch: "AIDS", section: "U", departments: ["Creative","Graphics"] },
            { name: "Priyanshi Khanna", branch: "IT", section: "E", departments: ["Social Media","Content"] },
            { name: "Rabiya Parveen", branch: "CS", section: "P", departments: ["Technical","Event"] },
            { name: "Rahul Sahani", branch: "CS", section: "W", departments: ["PR & Sponsorship","Event"] },
            { name: "Rajat", branch: "CSE", section: "A", departments: ["Technical","Anchoring"] },
            { name: "Raksha Anand", branch: "CSE", section: "C", departments: ["Technical","Content"] },
            { name: "Rashi", branch: "CSE", section: "Q", departments: ["Technical"] },
            { name: "Ravi Joshi", branch: "IT", section: "F", departments: ["Social Media"] },
            { name: "Riddhi Arora", branch: "CS", section: "W", departments: ["Technical"] },
            { name: "Ronit", branch: "CS", section: "W", departments: ["Technical","Event"] },
            { name: "Rudraksh Gupta", branch: "CST", section: "O", departments: ["PR & Sponsorship","Event"] },
            { name: "Rudrakshi", branch: "CSE", section: "C", departments: ["Technical","Creative"] },
            { name: "Sachin Gupta", branch: "CST", section: "V", departments: ["Event"] },
            { name: "Sakshi", branch: "CST", section: "V", departments: ["Technical"] },
            { name: "Sanchit Binwal", branch: "CS", section: "W", departments: ["Graphics", "Event"] },
            { name: "Sarthak Jain", branch: "CS", section: "W", departments: ["Event"] },
            { name: "Saumay Dwivedi", branch: "CSE", section: "A", departments: ["Technical","Event"] },
            { name: "Saurav Mishra", branch: "ECE", section: "D", departments: ["Anchoring"] },
            { name: "Shaibal Chakraborty", branch: "CSE", section: "Q", departments: ["Technical","Graphics"] },
            { name: "Shaz Ahmed", branch: "CSE", section: "B", departments: ["Technical"] },
            { name: "Shiva Jaiswal", branch: "CSE", section: "A", departments: ["Technical","Anchoring"] },
            { name: "Shivam", branch: "CSE", section: "C", departments: ["Event"] },
            { name: "Shivam Pal", branch: "CST", section: "O", departments: ["Technical"] },
            { name: "Shivam Panwar", branch: "CSE", section: "A", departments: ["Technical","Event"] },
            { name: "Shlok", branch: "AIDS", section: "U", departments: ["Content"] },
            { name: "Shreeyash Khandelwal", branch: "CS", section: "P", departments: ["Technical","Anchoring"] },
            { name: "Shresth", branch: "IT", section: "E", departments: ["Content", "Creative", "Event"] },
            { name: "Shresth Malik", branch: "AIML", section: "T", departments: ["Content"] },
            { name: "Shreya Aggarwal", branch: "AIML", section: "I", departments: ["Technical","Event"] },
            { name: "Shreya Gupta", branch: "CSE", section: "A", departments: ["Technical","Anchoring"] },
            { name: "Shreya Singh", branch: "AIML", section: "J", departments: ["Event"] },
            { name: "Shruti Maharaj", branch: "AIML", section: "T", departments: ["Technical","Anchoring","Content"] },
            { name: "Shubh Singhal", branch: "CS", section: "W", departments: ["Social Media","Video Editing","Graphics"] },
            { name: "Shubhmay Pradhan", branch: "CSE", section: "C", departments: ["Technical"] },
            { name: "Siddharth Singh", branch: "AIDS", section: "L", departments: ["Technical","Event"] },
            { name: "Siddhi Dhawan", branch: "CSE", section: "A", departments: ["Technical","Content"] },
            { name: "Snigdha Khanna", branch: "ECE", section: "D", departments: ["Technical"] },
            { name: "Soumya Yadav", branch: "AIML", section: "T", departments: ["Content"] },
            { name: "Subham Prakash Mishra", branch: "CST", section: "O", departments: ["Technical"] },
            { name: "Suhani Chaudhary", branch: "ME", section: "G&H", departments: ["Social Media","Video Editing","Content"] },
            { name: "Surya Chauhan", branch: "AIML", section: "I", departments: ["Technical"] },
            { name: "Syed Altamash", branch: "AIML", section: "T", departments: ["Graphics"] },
            { name: "Tanishqa Rani", branch: "CS", section: "P", departments: ["Technical","Event"] },
            { name: "Taniya Garg", branch: "AIDS", section: "N", departments: ["Technical","Creative","Event"] },
            { name: "Tanmay Parida", branch: "CS", section: "W", departments: ["PR & Sponsorship","Event"] },
            { name: "Tripti Thakur", branch: "CS", section: "W", departments: ["Technical"] },
            { name: "Udit bansal", branch: "CS", section: "W", departments: ["Graphics"] },
            { name: "Ujjwal Sharma", branch: "AIDS", section: "U", departments: ["Technical"] },
            { name: "Ujjwal Singh", branch: "AIML", section: "K", departments: ["Technical", "Event"] },
            { name: "Vaman Jangra", branch: "AIDS", section: "L", departments: ["Event"] },
            { name: "Vansh Gairola", branch: "CST", section: "V", departments: ["PR & Sponsorship"] },
            { name: "Vansh Gupta", branch: "ECE", section: "R", departments: ["Technical","Anchoring"] },
            { name: "Vansh Tyagi", branch: "AIML", section: "J", departments: ["Graphics"] },
            { name: "Vanshika Gupta", branch: "AIDS", section: "M", departments: ["Technical","Creative","Content"] },
            { name: "Veedushi Bhatt", branch: "AIML", section: "T", departments: ["Anchoring","Content"] },
            { name: "Vinita Katara", branch: "CSE", section: "Q", departments: ["Technical"] },
            { name: "Vyom Saxena", branch: "AIDS", section: "U", departments: ["Technical"] },
            { name: "Yash", branch: "CST", section: "O", departments: ["Technical"] },
            { name: "Yuvraj", branch: "CSE", section: "C", departments: ["Event"] },
            { name: "Zainuddin", branch: "CSE", section: "B", departments: ["Technical","Anchoring","PR & Sponsorship"] }
        ];

        window.selectedStudentsList = selectedStudentsList; // Accessible globally for easy updates

        const recruitsGrid = document.getElementById('recruitsGrid');
        const recruitSearchInput = document.getElementById('recruitSearchInput');
        const clearSearchBtn = document.getElementById('clearSearchBtn');
        const noRecruitsFound = document.getElementById('noRecruitsFound');
        const selectedCountBadge = document.getElementById('selectedCountBadge');
        const branchFilterSelect = document.getElementById('branchFilterSelect');
        const sectionFilterSelect = document.getElementById('sectionFilterSelect');
        const deptFilterSelect = document.getElementById('deptFilterSelect');
        const recruitSortSelect = document.getElementById('recruitSortSelect');
        const resetFiltersBtn = document.getElementById('resetFiltersBtn');

        function escapeHtml(str) {
            if (!str) return '';
            return String(str)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;');
        }

        function renderRecruits() {
            if (!recruitsGrid) return;

            // Search by name or department keyword
            const nameQuery = (recruitSearchInput ? recruitSearchInput.value.trim().toLowerCase() : '');
            const selectedBranch = (branchFilterSelect ? branchFilterSelect.value : 'all');
            const selectedSection = (sectionFilterSelect ? sectionFilterSelect.value : 'all');
            const selectedDept = (deptFilterSelect ? deptFilterSelect.value : 'all');
            const sortVal = (recruitSortSelect ? recruitSortSelect.value : 'branch-asc');

            if (clearSearchBtn) {
                clearSearchBtn.style.display = nameQuery.length > 0 ? 'flex' : 'none';
            }

            const filtered = selectedStudentsList.filter(student => {
                // Search query matches student name or department name
                const matchesSearch = (nameQuery === '' ||
                    (student.name && student.name.toLowerCase().includes(nameQuery)) ||
                    (student.departments && student.departments.some(d => d.toLowerCase().includes(nameQuery)))
                );
                // Branch dropdown filter
                const matchesBranch = (selectedBranch === 'all' || (student.branch && student.branch.toUpperCase() === selectedBranch.toUpperCase()));
                // Section dropdown filter
                const matchesSection = (selectedSection === 'all' || (student.section && String(student.section).toUpperCase() === selectedSection.toUpperCase()));
                // Department dropdown filter
                const matchesDept = (selectedDept === 'all' || (student.departments && student.departments.some(d => d.toLowerCase() === selectedDept.toLowerCase())));

                return matchesSearch && matchesBranch && matchesSection && matchesDept;
            });

            // Sorting by Branch, Section, Department, or Name
            filtered.sort((a, b) => {
                let primaryA = '';
                let primaryB = '';
                let secondaryA = '';
                let secondaryB = '';

                if (sortVal === 'section-asc' || sortVal === 'section-desc') {
                    primaryA = (a.section || '').toLowerCase();
                    primaryB = (b.section || '').toLowerCase();
                    secondaryA = (a.branch || '').toLowerCase() + ' ' + (a.name || '').toLowerCase();
                    secondaryB = (b.branch || '').toLowerCase() + ' ' + (b.name || '').toLowerCase();
                } else if (sortVal === 'dept-asc' || sortVal === 'dept-desc') {
                    primaryA = (a.departments && a.departments.length > 0 ? a.departments.join(', ') : 'zz').toLowerCase();
                    primaryB = (b.departments && b.departments.length > 0 ? b.departments.join(', ') : 'zz').toLowerCase();
                    secondaryA = (a.name || '').toLowerCase();
                    secondaryB = (b.name || '').toLowerCase();
                } else if (sortVal === 'name-asc' || sortVal === 'name-desc') {
                    primaryA = (a.name || '').toLowerCase();
                    primaryB = (b.name || '').toLowerCase();
                    secondaryA = (a.branch || '').toLowerCase() + ' ' + (a.section || '').toLowerCase();
                    secondaryB = (b.branch || '').toLowerCase() + ' ' + (b.section || '').toLowerCase();
                } else {
                    // Default: Sort by branch
                    primaryA = (a.branch || '').toLowerCase();
                    primaryB = (b.branch || '').toLowerCase();
                    secondaryA = (a.section || '').toLowerCase() + ' ' + (a.name || '').toLowerCase();
                    secondaryB = (b.section || '').toLowerCase() + ' ' + (b.name || '').toLowerCase();
                }

                let cmp = primaryA.localeCompare(primaryB, undefined, { numeric: true, sensitivity: 'base' });
                if (cmp === 0) {
                    cmp = secondaryA.localeCompare(secondaryB, undefined, { numeric: true, sensitivity: 'base' });
                }

                const isDesc = (sortVal === 'branch-desc' || sortVal === 'section-desc' || sortVal === 'dept-desc' || sortVal === 'name-desc');
                return isDesc ? -cmp : cmp;
            });

            if (selectedCountBadge) {
                const isFiltered = (nameQuery !== '' || selectedBranch !== 'all' || selectedSection !== 'all' || selectedDept !== 'all');
                if (!isFiltered) {
                    selectedCountBadge.innerHTML = `Showing <strong>${filtered.length}</strong> Selected Members`;
                } else {
                    selectedCountBadge.innerHTML = `Found <strong>${filtered.length}</strong> of ${selectedStudentsList.length} Selected Members`;
                }
            }

            if (filtered.length === 0) {
                recruitsGrid.innerHTML = '';
                recruitsGrid.style.display = 'none';
                if (noRecruitsFound) {
                    noRecruitsFound.style.display = 'block';
                    let filterInfo = [];
                    if (nameQuery) filterInfo.push(`query "${escapeHtml(nameQuery)}"`);
                    if (selectedBranch !== 'all') filterInfo.push(`branch "${escapeHtml(selectedBranch)}"`);
                    if (selectedSection !== 'all') filterInfo.push(`section "${escapeHtml(selectedSection)}"`);
                    if (selectedDept !== 'all') filterInfo.push(`department "${escapeHtml(selectedDept)}"`);
                    const infoText = filterInfo.length > 0 ? filterInfo.join(', ') : 'selected criteria';
                    noRecruitsFound.innerHTML = `<p>No selected member found matching ${infoText}. Please check your spelling or reset filters.</p>`;
                }
            } else {
                if (noRecruitsFound) noRecruitsFound.style.display = 'none';
                recruitsGrid.style.display = 'grid';
                recruitsGrid.innerHTML = filtered.map(student => {
                    const deptsHtml = (student.departments && student.departments.length > 0)
                        ? student.departments.map(d => `<span class="recruit-dept-tag"><span class="dept-bullet"></span>${escapeHtml(d)}</span>`).join('')
                        : `<span class="recruit-dept-tag dept-general"><span class="dept-bullet"></span>Member</span>`;

                    return `
                        <div class="recruit-card reveal active-reveal premium-hover">
                            <h4 class="recruit-name">${escapeHtml(student.name)}</h4>
                            <div class="recruit-meta-row">
                                <span class="recruit-meta-pill">
                                    <span class="meta-label">Branch:</span>
                                    <span class="meta-value">${escapeHtml(student.branch)}</span>
                                </span>
                                <span class="recruit-meta-pill">
                                    <span class="meta-label">Section:</span>
                                    <span class="meta-value">${escapeHtml(String(student.section))}</span>
                                </span>
                            </div>
                            <div class="recruit-depts-row">
                                <span class="depts-label">Department:</span>
                                <div class="depts-tags-list">
                                    ${deptsHtml}
                                </div>
                            </div>
                        </div>
                    `;
                }).join('');

                // Custom cursor hover binding
                recruitsGrid.querySelectorAll('.recruit-card, .recruit-dept-tag').forEach(el => {
                    el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
                    el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
                });
            }
        }

        // Initialize recruits system
        if (recruitsGrid) {
            renderRecruits();

            if (recruitSearchInput) {
                recruitSearchInput.addEventListener('input', renderRecruits);
            }

            if (clearSearchBtn) {
                clearSearchBtn.addEventListener('click', () => {
                    recruitSearchInput.value = '';
                    renderRecruits();
                    recruitSearchInput.focus();
                });
            }

            if (branchFilterSelect) {
                branchFilterSelect.addEventListener('change', renderRecruits);
            }

            if (sectionFilterSelect) {
                sectionFilterSelect.addEventListener('change', renderRecruits);
            }

            if (deptFilterSelect) {
                deptFilterSelect.addEventListener('change', renderRecruits);
            }

            if (recruitSortSelect) {
                recruitSortSelect.addEventListener('change', renderRecruits);
            }

            if (resetFiltersBtn) {
                resetFiltersBtn.addEventListener('click', () => {
                    if (recruitSearchInput) recruitSearchInput.value = '';
                    if (branchFilterSelect) branchFilterSelect.value = 'all';
                    if (sectionFilterSelect) sectionFilterSelect.value = 'all';
                    if (deptFilterSelect) deptFilterSelect.value = 'all';
                    if (recruitSortSelect) recruitSortSelect.value = 'branch-asc';
                    renderRecruits();
                });
            }
        }

        // Global ESC key listener for modals and lightbox
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) {
                if (resultsModal && resultsModal.classList.contains('active')) {
                    hideResultsModal();
                }
                if (modalOverlay && modalOverlay.classList.contains('active')) {
                    modalOverlay.classList.remove('active');
                    if (typeof lenis !== 'undefined' && lenis) lenis.start();
                }
                if (lightbox && lightbox.classList.contains('active')) {
                    lightbox.classList.remove('active');
                    if (typeof lenis !== 'undefined' && lenis) lenis.start();
                }
            }
        });

        // Bind custom cursor hover states to interactive elements
        document.querySelectorAll('.recruit-card, .dept-card, .tech-tag-item, .tech-highlight-card, .results-check-btn, .results-dismiss-btn, .results-close-btn, .clear-search-btn, .selection-select, .reset-filters-btn').forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
        });



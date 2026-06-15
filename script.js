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

        // Preloader & Initial GSAP Hero Animations
        window.addEventListener('load', () => {
            const preloader = document.querySelector('.preloader');
            const progress = document.querySelector('.progress');
            setTimeout(() => { progress.style.width = '100%'; }, 100);
            setTimeout(() => {
                preloader.classList.add('fade-out');
                document.body.classList.remove('loading');
                
                // Trigger GSAP Hero animations after preloader
                gsap.from(".hero-title", {y: 100, opacity: 0, duration: 1.5, ease: "power4.out", delay: 0.2});
                gsap.from(".hero-subtitle", {y: 50, opacity: 0, duration: 1.5, ease: "power4.out", delay: 0.4});
                gsap.from(".hero-btn", {scale: 0.8, opacity: 0, duration: 1.5, ease: "elastic.out(1, 0.5)", delay: 0.6});
            }, 2100);
        });

        // 2. THE GSAP CURSOR 
        const isTouchDevice = (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));

        if (!isTouchDevice) {
            const cursorDot = document.querySelector('.cursor-dot');
            const cursorOutline = document.querySelector('.cursor-outline');
            
            gsap.set(cursorDot, {xPercent: -50, yPercent: -50});
            gsap.set(cursorOutline, {xPercent: -50, yPercent: -50});
            
            let xToDot = gsap.quickTo(cursorDot, "x", {duration: 0.1, ease: "power3"}),
                yToDot = gsap.quickTo(cursorDot, "y", {duration: 0.1, ease: "power3"}),
                xToOut = gsap.quickTo(cursorOutline, "x", {duration: 0.4, ease: "power3.out"}),
                yToOut = gsap.quickTo(cursorOutline, "y", {duration: 0.4, ease: "power3.out"});

            window.addEventListener('mousemove', (e) => {
                xToDot(e.clientX); yToDot(e.clientY);
                xToOut(e.clientX); yToOut(e.clientY);
            });

            document.querySelectorAll('.premium-hover, a, button, .logo, .close-modal-btn, .img-wrap img, .card-container, .faculty-profile-card, .equal-card, .tech-highlight-card').forEach(el => {
                el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
                el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
            });

            // GSAP 3D Hover Effect - Maintained at optimal 25
            document.querySelectorAll('.card-container').forEach(container => {
                const card = container.querySelector('.team-card');
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
            if(navLinksContainer.classList.contains('nav-active')){
                navLinksContainer.classList.remove('nav-active');
                hamburger.classList.remove('toggle');
            }
            document.querySelectorAll('.page-section').forEach(sec => sec.classList.remove('active'));
            document.querySelector(targetId).classList.add('active');
            
            lenis.scrollTo(0, {immediate: true}); 
            
            document.querySelectorAll('.nav-links a').forEach(link => {
                if (link.getAttribute('data-target') === targetId) link.classList.add('active-link');
                else link.classList.remove('active-link');
            });
            setTimeout(revealElement, 50);
        }

        document.querySelectorAll('.nav-links a, .nav-trigger, .logo').forEach(el => {
            el.addEventListener('click', function(e) { switchSection(this.getAttribute('data-target') || '#home'); });
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

        // ELITE SQUIRCLE MODAL LOGIC
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
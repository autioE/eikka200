// script.js - Fast, energetic effects for EIKKA200

// Apply theme immediately to prevent flash
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-theme');
}

document.addEventListener('DOMContentLoaded', () => {
    const title = document.getElementById('main-title');
    const originalText = title ? title.innerText : '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';

    // Fast random glitch effect on title
    if (title) {
        setInterval(() => {
            if (Math.random() > 0.85) { // Rare text glitching
                const currentText = title.innerText;
                let glitchedText = currentText.split('').map(char => {
                    if (Math.random() > 0.9) {
                        return chars[Math.floor(Math.random() * chars.length)];
                    }
                    return char;
                }).join('');

                title.innerText = glitchedText;

                setTimeout(() => {
                    title.innerText = currentText;
                }, 150);
            }
        }, 3000);
    }

    // Aggressive mouse interactive movement for cards
    // Aggressive mouse interactive movement for cards - Disable on touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (!isTouchDevice) {
        document.addEventListener('mousemove', (e) => {
            const cards = document.querySelectorAll('.card');
            const mouseX = e.clientX / window.innerWidth - 0.5;
            const mouseY = e.clientY / window.innerHeight - 0.5;

            cards.forEach(card => {
                // Intense tilt
                card.style.transform = `perspective(1000px) rotateY(${mouseX * 25}deg) rotateX(${-mouseY * 25}deg) translateZ(20px)`;
            });
        });

        // Reset card transform on leave
        document.addEventListener('mouseleave', () => {
            const cards = document.querySelectorAll('.card');
            cards.forEach(card => {
                card.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)`;
            });
        });
    }

    // Fast chaotic canvas background
    const canvasContainer = document.getElementById('canvas-container');
    const canvas = document.createElement('canvas');
    canvasContainer.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let width, height;
    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    const particles = [];
    for (let i = 0; i < 60; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 4 + 1,
            speedY: (Math.random() * 1.5 + 0.3) * (Math.random() > 0.5 ? 1 : -1), // Slow, smooth float
            speedX: (Math.random() * 1.5 + 0.3) * (Math.random() > 0.5 ? 1 : -1), // Slow, smooth float
            isPrimary: Math.random() > 0.5
        });
    }

    function animate() {
        // Leave a slight trail for motion blur effect
        if (document.body.classList.contains('light-theme')) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        } else {
            ctx.fillStyle = 'rgba(10, 10, 10, 0.3)';
        }
        ctx.fillRect(0, 0, width, height);

        const primaryColor = getComputedStyle(document.body).getPropertyValue('--primary-color').trim();
        const secondaryColor = getComputedStyle(document.body).getPropertyValue('--secondary-color').trim();

        particles.forEach(p => {
            if (document.body.classList.contains('light-theme')) {
                ctx.globalAlpha = 0.2; // Much softer in light mode
            } else {
                ctx.globalAlpha = 1.0;
            }

            ctx.fillStyle = p.isPrimary ? primaryColor : secondaryColor;
            ctx.fillRect(p.x, p.y, p.size, p.size); // Sharp square particles
            ctx.globalAlpha = 1.0; // Reset alpha for next frame/elements

            p.y += p.speedY;
            p.x += p.speedX;

            // Wrap around aggressively
            if (p.y > height) p.y = 0;
            if (p.y < 0) p.y = height;
            if (p.x > width) p.x = 0;
            if (p.x < 0) p.x = width;

            // Occasional gentle direction change
            if (Math.random() > 0.99) {
                p.speedY = (Math.random() * 1.5 + 0.3) * (Math.random() > 0.5 ? 1 : -1);
                p.speedX = (Math.random() * 1.5 + 0.3) * (Math.random() > 0.5 ? 1 : -1);
            }
        });

        requestAnimationFrame(animate);
    }
    animate();

    // Animated stats counter
    const counters = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'));
                const duration = 1800;
                const step = Math.ceil(target / (duration / 30));
                let current = 0;
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        el.innerText = target;
                        clearInterval(timer);
                    } else {
                        el.innerText = current;
                    }
                }, 30);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));

    // Theme Toggle is handled by top-right button

    // Reveal Content Logic
    const revealBtn = document.querySelector('.btn');
    const mainSection = document.getElementById('about');

    const revealContent = () => {
        if (mainSection) mainSection.style.display = 'block';
        if (revealBtn) {
            revealBtn.style.opacity = '0';
            revealBtn.style.pointerEvents = 'none';
        }
    };

    if (revealBtn && mainSection) {
        // Ensure button is visible if no hash (reset any leftover styles)
        revealBtn.style.opacity = '1';
        revealBtn.style.pointerEvents = 'all';

        // Check if hash is #about on load or if we navigated back
        if (window.location.hash === '#about') {
            revealContent();
        }

        revealBtn.addEventListener('click', (e) => {
            e.preventDefault();
            revealContent();

            // Smooth scroll with a slight delay to allow display: block to take effect
            setTimeout(() => {
                mainSection.scrollIntoView({ behavior: 'smooth' });
            }, 50);
        });
    }

    console.log("EIKKA200 OVERRIDE // SYSTEM HIJACKED // RED AND BLUE ACTIVE");
});

// Language Toggle Logic
(function initLanguage() {
    let currentLang = localStorage.getItem('lang') || 'en';

    function createLangButton() {
        if (!document.getElementById('lang-toggle')) {
            const btn = document.createElement('button');
            btn.id = 'lang-toggle';
            btn.className = 'lang-toggle-btn';
            btn.setAttribute('aria-label', 'Toggle language');
            document.body.appendChild(btn);

            btn.addEventListener('click', () => {
                currentLang = currentLang === 'en' ? 'fi' : 'en';
                localStorage.setItem('lang', currentLang);
                applyLanguage(currentLang);
            });
        }
    }

    function createThemeButton() {
        if (!document.getElementById('theme-toggle-btn')) {
            const btn = document.createElement('button');
            btn.id = 'theme-toggle-btn';
            btn.className = 'theme-toggle-btn';
            btn.setAttribute('aria-label', 'Toggle theme');
            document.body.appendChild(btn);

            btn.addEventListener('click', () => {
                document.body.classList.toggle('light-theme');
                const isLight = document.body.classList.contains('light-theme');
                localStorage.setItem('theme', isLight ? 'light' : 'dark');
                applyLanguage(currentLang);
            });
        }
    }

    const translations = {
        en: {
            mainTitle: "WHO IS EIKKA200",
            subHeader: "producer // music reviewer",
            getToKnowBtn: "get to know",
            socialMedia: "SOCIAL MEDIA",
            projects: "PROJECTS",
            contact: "CONTACT",
            aboutMe: "ABOUT ME",
            latestReviews: "LATEST REVIEWS",
            backLink: "← BACK TO HOME",
            aboutHeader: "ABOUT ME",
            producingHeader: "PRODUCING",
            socialHeader: "SOCIAL MEDIA",
            reviewsHeader: "LATEST REVIEWS",
            contactHeader: "CONTACT",
            favsHeader: "ALL TIME FAVS",
            favsCard: "ALL TIME FAVS",
            soonText: "SOON!",
            bornLabel: "BORN:",
            nameLabel: "NAME:",
            outNowYoutube: "out now on youtube!",
            watchYoutube: "WATCH ON YOUTUBE",
            wantCollab: "WANT TO COLLAB?",
            contactMe: "CONTACT ME",
            themeBtnText: "CHANGE COLOR"
        },
        fi: {
            mainTitle: "KUKA ON EIKKA200",
            subHeader: "tuottaja // musiikkiarvostelija",
            getToKnowBtn: "tutustu",
            socialMedia: "SOSIAALINEN MEDIA",
            projects: "PROJEKTIT",
            contact: "OTA YHTEYTTÄ",
            aboutMe: "TIETOA MINUSTA",
            latestReviews: "UUSIMMAT ARVOSTELUT",
            backLink: "← TAKAISIN KOTISIVULLE",
            aboutHeader: "TIETOA MINUSTA",
            producingHeader: "TUOTANTO",
            socialHeader: "SOSIAALINEN MEDIA",
            reviewsHeader: "UUSIMMAT ARVOSTELUT",
            contactHeader: "OTA YHTEYTTÄ",
            favsHeader: "SUOSIKKI LEVYT",
            favsCard: "SUOSIKKI LEVYT",
            soonText: "TULOSSA PIAN!",
            bornLabel: "SYNTYNYT:",
            nameLabel: "NIMI:",
            outNowYoutube: "nyt ulkona youtubessa!",
            watchYoutube: "KATSO YOUTUBESSA",
            wantCollab: "YHTEISTYÖTÄ?",
            contactMe: "OTA YHTEYTTÄ",
            themeBtnText: "VAIHDA VÄRIÄ"
        }
    };

    function applyLanguage(lang) {
        const btn = document.getElementById('lang-toggle');
        if (btn) {
            btn.innerHTML = lang === 'en' ? '<strong>EN</strong> / FI' : 'EN / <strong>FI</strong>';
            btn.classList.toggle('lang-en', lang === 'en');
            btn.classList.toggle('lang-fi', lang === 'fi');
        }

        const t = translations[lang];

        const themeBtn = document.getElementById('theme-toggle-btn');
        if (themeBtn) {
            themeBtn.innerText = t.themeBtnText;
        }

        // Header / Main Title
        const mainTitleEl = document.getElementById('main-title');
        if (mainTitleEl) {
            mainTitleEl.innerText = t.mainTitle;
            mainTitleEl.setAttribute('data-text', t.mainTitle);
        }

        const subHeaderEl = document.querySelector('.sub-header');
        if (subHeaderEl) {
            subHeaderEl.innerText = t.subHeader;
        }

        const getToKnowEl = document.querySelector('header .btn');
        if (getToKnowEl) {
            getToKnowEl.innerText = t.getToKnowBtn;
        }

        // Back links on subpages
        const backLinkEl = document.querySelector('.back-link');
        if (backLinkEl) {
            backLinkEl.innerText = t.backLink;
        }

        // Subpage headers (h1)
        const aboutH1 = document.querySelector('.about-header h1');
        if (aboutH1) aboutH1.innerText = t.aboutHeader;

        const producingH1 = document.querySelector('.producing-header h1');
        if (producingH1) producingH1.innerText = t.producingHeader;

        const socialH1 = document.querySelector('.social-header h1');
        if (socialH1) socialH1.innerText = t.socialHeader;

        const reviewsH1 = document.querySelector('.reviews-header h1');
        if (reviewsH1) reviewsH1.innerText = t.reviewsHeader;

        const contactH1 = document.querySelector('.contact-header h1');
        if (contactH1) contactH1.innerText = t.contactHeader;

        const favsH1 = document.querySelector('.favs-header h1');
        if (favsH1) favsH1.innerText = t.favsHeader;

        // Cards on homepage
        document.querySelectorAll('.card-link').forEach(link => {
            const h2 = link.querySelector('h2');
            if (!h2) return;
            const href = link.getAttribute('href');
            if (href === 'social.html') h2.innerText = t.socialMedia;
            else if (href === 'producing.html') h2.innerText = t.projects;
            else if (href === 'contact.html') h2.innerText = t.contact;
            else if (href === 'about.html') h2.innerText = t.aboutMe;
            else if (href === 'reviews.html') h2.innerText = t.latestReviews;
            else if (href === 'favs.html') h2.innerText = t.favsCard;
        });

        // About page labels
        document.querySelectorAll('.about-text p').forEach(p => {
            if (p.innerHTML.includes('NAME:') || p.innerHTML.includes('NIMI:')) {
                p.innerHTML = `> <strong>${t.nameLabel}</strong> Elias Autio`;
            } else if (p.innerHTML.includes('BORN:') || p.innerHTML.includes('SYNTYNYT:')) {
                p.innerHTML = `> <strong>${t.bornLabel}</strong> Oulu, 2007`;
            }
        });

        // Producing page text & buttons
        document.querySelectorAll('.work-card').forEach(card => {
            const desc = card.querySelector('.work-desc');
            const btn = card.querySelector('.contact-btn');
            const title = card.querySelector('.work-title');

            if (desc && (desc.innerText.includes('out now on youtube!') || desc.innerText.includes('nyt ulkona youtubessa!'))) {
                desc.innerText = t.outNowYoutube;
            }
            if (btn && (btn.innerText.includes('WATCH ON YOUTUBE') || btn.innerText.includes('KATSO YOUTUBESSA'))) {
                btn.innerText = t.watchYoutube;
            }
            if (title && (title.innerText.includes('WANT TO COLLAB?') || title.innerText.includes('HALUATKO YHTEISTYÖTÄ?') || title.innerText.includes('YHTEISTYÖTÄ?'))) {
                title.innerText = t.wantCollab;
            }
            if (btn && (btn.innerText.includes('CONTACT ME') || btn.innerText.includes('OTA YHTEYTTÄ'))) {
                btn.innerText = t.contactMe;
            }
        });

        // Reviews / Soon text
        document.querySelectorAll('.reviews-container h2').forEach(h2 => {
            if (h2.innerText === 'SOON!' || h2.innerText === 'TULOSSA PIAN!') {
                h2.innerText = t.soonText;
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            createLangButton();
            createThemeButton();
            applyLanguage(currentLang);
        });
    } else {
        createLangButton();
        createThemeButton();
        applyLanguage(currentLang);
    }
})();


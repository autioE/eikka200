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
            if (Math.random() > 0.92) { // Infrequent glitching
                let glitchedText = originalText.split('').map(char => {
                    if (Math.random() > 0.9) {
                        return chars[Math.floor(Math.random() * chars.length)];
                    }
                    return char;
                }).join('');

                title.innerText = glitchedText;

                setTimeout(() => {
                    title.innerText = originalText;
                }, 150); // Slower recovery
            }
        }, 600);
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
            speedY: (Math.random() * 8 + 2) * (Math.random() > 0.5 ? 1 : -1), // Fast
            speedX: (Math.random() * 8 + 2) * (Math.random() > 0.5 ? 1 : -1), // Fast
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

            // Occasional erratic direction change
            if (Math.random() > 0.98) {
                p.speedY = (Math.random() * 8 + 2) * (Math.random() > 0.5 ? 1 : -1);
                p.speedX = (Math.random() * 8 + 2) * (Math.random() > 0.5 ? 1 : -1);
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

    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const themeText = document.getElementById('theme-text');

    if (themeText) {
        themeText.innerText = document.body.classList.contains('light-theme') ? 'DARK MODE' : 'LIGHT MODE';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');

            if (themeText) {
                themeText.innerText = isLight ? 'DARK MODE' : 'LIGHT MODE';
            }

            // Trigger a small glitch on toggle if title exists
            if (title) {
                title.innerText = 'REBOOTING...';
                setTimeout(() => {
                    title.innerText = originalText;
                }, 300);
            }
        });
    }

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

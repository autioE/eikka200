// script.js - Fast, energetic effects for EIKKA200

document.addEventListener('DOMContentLoaded', () => {
    const title = document.getElementById('main-title');
    const originalText = title.innerText;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';

    // Fast random glitch effect on title
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

    // Aggressive mouse interactive movement for cards
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
            color: Math.random() > 0.5 ? '#e30e0e' : '#180ee3' // Red or Blue
        });
    }

    function animate() {
        // Leave a slight trail for motion blur effect
        ctx.fillStyle = 'rgba(10, 10, 10, 0.3)';
        ctx.fillRect(0, 0, width, height);

        particles.forEach(p => {
            ctx.fillStyle = p.color;
            ctx.fillRect(p.x, p.y, p.size, p.size); // Sharp square particles

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

    console.log("EIKKA200 OVERRIDE // SYSTEM HIJACKED // RED AND BLUE ACTIVE");
});

// Loading Animation
const loadingBar = document.getElementById('loadingBar');
const loadingPercentage = document.getElementById('loadingPercentage');

// Simulate loading stuck at 99%
function animateLoading() {
    let progress = 99;
    const interval = setInterval(() => {
        // Keep it at 99% with slight variations
        progress = 99 + Math.random() * 0.5;
        if (loadingBar) {
            const progressBar = loadingBar.querySelector('.loading-progress');
            if (progressBar) {
                progressBar.style.width = Math.min(progress, 99.5) + '%';
            }
        }
        if (loadingPercentage) {
            loadingPercentage.textContent = Math.floor(progress) + '%';
        }
    }, 100);
}

// Start loading animation
animateLoading();

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const nav = document.querySelector('.nav');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        if (nav) {
            nav.classList.toggle('active');
        }
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add glitch effect to loading title
const loadingTitle = document.querySelector('.loading-title');
if (loadingTitle) {
    setInterval(() => {
        if (Math.random() > 0.7) {
            loadingTitle.style.animation = 'none';
            setTimeout(() => {
                loadingTitle.style.animation = 'pulse 2s ease-in-out infinite';
            }, 50);
        }
    }, 3000);
}

// Add typing effect to status messages
function typeWriter(element, text, speed = 50) {
    if (!element) return;
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Parallax effect on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - scrolled / 500;
    }
});

// Add random glitch effects
function randomGlitch() {
    const elements = document.querySelectorAll('.loading-title, .token-name');
    elements.forEach(element => {
        if (Math.random() > 0.95) {
            element.style.textShadow = `
                0 0 10px var(--glow-color),
                2px 2px 0 #ff0000,
                -2px -2px 0 #00ffff
            `;
            setTimeout(() => {
                element.style.textShadow = '0 0 20px var(--glow-color)';
            }, 100);
        }
    });
}

setInterval(randomGlitch, 2000);

// Console easter egg
console.log('%cLOADING... (99%)', 'color: #00d9ff; font-size: 20px; font-weight: bold;');
console.log('%cbuffering.exe ☕ system stuck at 99%…', 'color: #b0b0b0; font-size: 14px;');
console.log('%c$LOADING — launching soon ⚙️', 'color: #00d9ff; font-size: 14px;');

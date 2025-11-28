// Loading Animation
const loadingBar = document.getElementById('loadingBar');
const loadingPercentage = document.getElementById('loadingPercentage');

// Simulate loading stuck at 99%
function animateLoading() {
    let progress = 99;
    const interval = setInterval(() => {
        // Keep it at 99% with more noticeable variations
        // Range: 98.5% to 99.8% for more visible animation
        progress = 98.5 + Math.random() * 1.3;
        if (loadingBar) {
            const progressBar = loadingBar.querySelector('.loading-progress');
            if (progressBar) {
                progressBar.style.width = Math.min(progress, 99.8) + '%';
            }
        }
        if (loadingPercentage) {
            loadingPercentage.textContent = Math.floor(progress) + '%';
        }
    }, 100);
}

// Start loading animation
animateLoading();

// Mobile sidebar toggle
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const sidebarClose = document.getElementById('sidebarClose');

function openSidebar() {
    if (sidebar) {
        sidebar.classList.add('active');
        if (sidebarOverlay) {
            sidebarOverlay.classList.add('active');
        }
        document.body.style.overflow = 'hidden';
    }
}

function closeSidebar() {
    if (sidebar) {
        sidebar.classList.remove('active');
        if (sidebarOverlay) {
            sidebarOverlay.classList.remove('active');
        }
        document.body.style.overflow = '';
    }
}

if (menuToggle) {
    menuToggle.addEventListener('click', openSidebar);
}

if (sidebarClose) {
    sidebarClose.addEventListener('click', closeSidebar);
}

if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeSidebar);
}

// Close sidebar when clicking on links
document.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', () => {
        setTimeout(closeSidebar, 300);
    });
});

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

// Parallax effect removed for better mobile experience

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

// Countdown Timer - Turkey Time (UTC+3) - November 29, 2025, 21:30
const countdownDays = document.getElementById('days');
const countdownHours = document.getElementById('hours');
const countdownMinutes = document.getElementById('minutes');
const countdownSeconds = document.getElementById('seconds');

if (countdownDays && countdownHours && countdownMinutes && countdownSeconds) {
    // Target date: November 29, 2025, 21:30 Turkey Time (UTC+3)
    // Convert to UTC: November 29, 2025, 18:30 UTC
    const targetDate = new Date('2025-11-29T18:30:00Z'); // UTC time
    
    // Track countdown view on page load
    if (typeof gtag !== 'undefined') {
        gtag('event', 'countdown_view', {
            'event_category': 'Countdown',
            'event_label': 'Timer Displayed'
        });
    }
    
    function updateCountdown() {
        const now = new Date();
        const diff = targetDate - now;
        
        if (diff <= 0) {
            // Countdown finished
            countdownDays.textContent = '00';
            countdownHours.textContent = '00';
            countdownMinutes.textContent = '00';
            countdownSeconds.textContent = '00';
            
            // Track countdown completion
            if (typeof gtag !== 'undefined') {
                gtag('event', 'countdown_complete', {
                    'event_category': 'Countdown',
                    'event_label': 'Timer Reached Zero'
                });
            }
            return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        countdownDays.textContent = String(days).padStart(2, '0');
        countdownHours.textContent = String(hours).padStart(2, '0');
        countdownMinutes.textContent = String(minutes).padStart(2, '0');
        countdownSeconds.textContent = String(seconds).padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000); // Update every second
}

// Days Counter - Calculate days since Nov 1, 2025 (or whenever you started)
const startDate = new Date('2025-11-01');
const daysCounter = document.getElementById('daysCounter');
if (daysCounter) {
    function updateDaysCounter() {
        const now = new Date();
        const diffTime = Math.abs(now - startDate);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        daysCounter.textContent = diffDays;
    }
    updateDaysCounter();
    setInterval(updateDaysCounter, 1000 * 60 * 60); // Update every hour
}

// Live Quotes from CSV
let quotes = [];
let currentQuoteIndex = 0;
const quoteCard = document.getElementById('quoteCard');
const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');
const quoteCounter = document.getElementById('quoteCounter');
const quotePrev = document.getElementById('quotePrev');
const quoteNext = document.getElementById('quoteNext');

// Load quotes from JSON
async function loadQuotes() {
    try {
        const response = await fetch('tweets-quotes.json');
        if (!response.ok) {
            throw new Error('tweets-quotes.json not found. Run: node parse-tweets.js');
        }
        quotes = await response.json();
        
        if (quotes.length > 0) {
            showQuote(0);
            updateCounter();
        } else {
            if (quoteText) quoteText.textContent = "Loading quotes...";
        }
    } catch (error) {
        console.error('Error loading quotes:', error);
        // Fallback quotes
        quotes = [
            { text: "We're not early. We're not late. We're buffering.", id: "fallback" },
            { text: "LOADING isn't just a project… it's a SIGNAL.", id: "fallback2" }
        ];
        if (quotes.length > 0) {
            showQuote(0);
            updateCounter();
        }
    }
}

function showQuote(index) {
    if (!quoteCard || !quoteText || !quoteAuthor || quotes.length === 0) return;
    
    quoteCard.classList.remove('active');
    setTimeout(() => {
        currentQuoteIndex = index;
        const quote = quotes[currentQuoteIndex];
        quoteText.textContent = `"${quote.text}"`;
        quoteAuthor.textContent = "— @stilllllloading";
        quoteCard.classList.add('active');
        updateCounter();
    }, 250);
}

function nextQuote() {
    if (quotes.length === 0) return;
    const nextIndex = (currentQuoteIndex + 1) % quotes.length;
    showQuote(nextIndex);
}

function prevQuote() {
    if (quotes.length === 0) return;
    const prevIndex = (currentQuoteIndex - 1 + quotes.length) % quotes.length;
    showQuote(prevIndex);
}

function updateCounter() {
    // Counter removed as requested
}

// Navigation buttons
if (quotePrev) {
    quotePrev.addEventListener('click', () => {
        prevQuote();
        // Track quote navigation
        if (typeof gtag !== 'undefined') {
            gtag('event', 'quote_navigation', {
                'event_category': 'Quotes',
                'event_label': 'Previous',
                'value': currentQuoteIndex
            });
        }
    });
}

if (quoteNext) {
    quoteNext.addEventListener('click', () => {
        nextQuote();
        // Track quote navigation
        if (typeof gtag !== 'undefined') {
            gtag('event', 'quote_navigation', {
                'event_category': 'Quotes',
                'event_label': 'Next',
                'value': currentQuoteIndex
            });
        }
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevQuote();
        // Track keyboard navigation
        if (typeof gtag !== 'undefined') {
            gtag('event', 'quote_navigation', {
                'event_category': 'Quotes',
                'event_label': 'Keyboard Previous',
                'value': currentQuoteIndex
            });
        }
    } else if (e.key === 'ArrowRight') {
        nextQuote();
        // Track keyboard navigation
        if (typeof gtag !== 'undefined') {
            gtag('event', 'quote_navigation', {
                'event_category': 'Quotes',
                'event_label': 'Keyboard Next',
                'value': currentQuoteIndex
            });
        }
    }
});

// Auto-rotate every 5 seconds
let autoRotateInterval;
function startAutoRotate() {
    autoRotateInterval = setInterval(() => {
        nextQuote();
    }, 5000);
}

// Load quotes on page load
loadQuotes().then(() => {
    startAutoRotate();
});

// Pause auto-rotate on hover
if (quoteCard) {
    quoteCard.addEventListener('mouseenter', () => {
        if (autoRotateInterval) {
            clearInterval(autoRotateInterval);
        }
    });
    
    quoteCard.addEventListener('mouseleave', () => {
        startAutoRotate();
    });
}

// Interactive "Try to Reach 100%" Button
const tryButton = document.getElementById('tryButton');
const interactiveResult = document.getElementById('interactiveResult');
const responses = [
    "Nope. Still 99%. 😏",
    "Nice try. Still loading... 99%",
    "System says: 'Not today, degen.' 99%",
    "Error: Cannot reach 100%. System stuck at 99%.",
    "Loading... Loading... Still 99% 💀",
    "The button is also loading at 99% 😭",
    "Even the button can't escape the 99% curse ⚙️",
    "System response: 'lol no' — 99%",
    "You clicked it. We're still at 99%. Coincidence? I think not. 😎",
    "The 99% is stronger than your click. Still loading..."
];

let clickCount = 0;

if (tryButton && interactiveResult) {
    tryButton.addEventListener('click', () => {
        clickCount++;
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        interactiveResult.textContent = randomResponse;
        
        // Track button click
        if (typeof gtag !== 'undefined') {
            gtag('event', 'button_click', {
                'event_category': 'Interactive',
                'event_label': 'Try to Reach 100%',
                'value': clickCount
            });
        }
        
        // Add glitch effect
        tryButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            tryButton.style.transform = 'scale(1)';
        }, 100);
        
        // Update loading bar to show it's still 99%
        if (loadingPercentage) {
            loadingPercentage.textContent = '99%';
        }
        if (loadingBar) {
            const progressBar = loadingBar.querySelector('.loading-progress');
            if (progressBar) {
                progressBar.style.width = '99%';
            }
        }
        
        // Easter egg after 10 clicks
        if (clickCount === 10) {
            interactiveResult.textContent = "You've clicked 10 times. Still 99%. This is your life now. Welcome to the cult. ⚡️";
            // Track easter egg
            if (typeof gtag !== 'undefined') {
                gtag('event', 'easter_egg', {
                    'event_category': 'Interactive',
                    'event_label': '10 Clicks Reached'
                });
            }
        }
    });
}

// Terminal Live Log Updates
const liveLog = document.getElementById('liveLog');
const logMessages = [
    "Still loading... 99%",
    "System processing... 99%",
    "Buffering... 99%",
    "Loading sequence active... 99%",
    "Waiting for 100%... 99%",
    "Cult chamber opening... 99%",
    "Portal initializing... 99%",
    "Signal detected... 99%",
    "Node active... 99%",
    "Core warming... 99%"
];

if (liveLog) {
    let logIndex = 0;
    setInterval(() => {
        liveLog.textContent = logMessages[logIndex];
        logIndex = (logIndex + 1) % logMessages.length;
    }, 3000);
}

// Auto-scroll terminal to bottom
const terminalBody = document.getElementById('terminalBody');
if (terminalBody) {
    terminalBody.scrollTop = terminalBody.scrollHeight;
    setInterval(() => {
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }, 1000);
}

// Track external link clicks (Telegram, X, etc.)
document.addEventListener('DOMContentLoaded', () => {
    // Track Telegram links
    document.querySelectorAll('a[href*="t.me"]').forEach(link => {
        link.addEventListener('click', () => {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'external_link_click', {
                    'event_category': 'Outbound',
                    'event_label': 'Telegram',
                    'transport_type': 'beacon'
                });
            }
        });
    });
    
    // Track X/Twitter links
    document.querySelectorAll('a[href*="x.com"], a[href*="twitter.com"]').forEach(link => {
        link.addEventListener('click', () => {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'external_link_click', {
                    'event_category': 'Outbound',
                    'event_label': 'X (Twitter)',
                    'transport_type': 'beacon'
                });
            }
        });
    });
});

// Console easter egg
console.log('%cLOADING... (99%)', 'color: #00d9ff; font-size: 20px; font-weight: bold;');
console.log('%cbuffering.exe ☕ system stuck at 99%…', 'color: #b0b0b0; font-size: 14px;');
console.log('%c$LOADING — launching soon ⚙️', 'color: #00d9ff; font-size: 14px;');
console.log('%cWe\'re not early. We\'re not late. We\'re buffering.', 'color: #00d9ff; font-size: 12px; font-style: italic;');

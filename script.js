// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initAnimations();
    initInteractiveElements();
    initScrollEffects();
    initCounterAnimations();
    initParallaxEffects();
});

// Navigation functionality
function initNavigation() {
    const nav = document.querySelector('.navigation');
    let lastScrollY = window.scrollY;

    // Navbar hide/show on scroll
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            nav.style.background = 'rgba(10, 10, 10, 0.9)';
        } else {
            nav.style.background = 'rgba(10, 10, 10, 0.7)';
        }

        lastScrollY = currentScrollY;
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = nav.offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize scroll-based animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.mission-card, .tech-panel, .planet-discovery, .propulsion-system, .contact-card').forEach(el => {
        observer.observe(el);
    });
}

// Initialize interactive elements
function initInteractiveElements() {
    // Mission cards enhancement
    document.querySelectorAll('.mission-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) rotateX(5deg) scale(1.03)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0) scale(1)';
        });
    });

    // Planet rotation on click
    const planet = document.querySelector('.planet');
    if (planet) {
        planet.addEventListener('click', function() {
            this.style.animation = 'none';
            this.style.transform = 'translate(-50%, -50%) rotateY(0deg)';
            
            setTimeout(() => {
                this.style.animation = 'planetRotate 2s linear';
            }, 100);
        });
    }

    // Tech panel interactions
    document.querySelectorAll('.tech-panel').forEach(panel => {
        panel.addEventListener('mouseenter', function() {
            const specs = this.querySelectorAll('.spec-value');
            specs.forEach(spec => {
                spec.style.textShadow = '0 0 10px #00AEFF';
            });
        });
        
        panel.addEventListener('mouseleave', function() {
            const specs = this.querySelectorAll('.spec-value');
            specs.forEach(spec => {
                spec.style.textShadow = 'none';
            });
        });
    });

    // Planet discovery hover effects
    document.querySelectorAll('.planet-discovery').forEach(discovery => {
        discovery.addEventListener('mouseenter', function() {
            const score = this.querySelector('.habitability-score');
            if (score) {
                score.style.transform = 'scale(1.1)';
                score.style.boxShadow = '0 0 20px rgba(0, 174, 255, 0.5)';
            }
        });
        
        discovery.addEventListener('mouseleave', function() {
            const score = this.querySelector('.habitability-score');
            if (score) {
                score.style.transform = 'scale(1)';
                score.style.boxShadow = 'none';
            }
        });
    });

    // CTA Button interactions
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
            ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Initialize scroll effects
function initScrollEffects() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Counter animations for statistics
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-value');
    const speed = 2000;

    const countUp = (counter) => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const increment = target / (speed / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = counter.textContent.replace(/\d+/, target);
                clearInterval(timer);
            } else {
                counter.textContent = counter.textContent.replace(/\d+/, Math.floor(current));
            }
        }, 16);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                countUp(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Parallax effects
function initParallaxEffects() {
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroVisual) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroVisual.style.transform = `translateY(${rate}px)`;
        });
    }

    // Starfield parallax
    const starfield = document.querySelector('.starfield-background');
    if (starfield) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.2;
            starfield.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Dynamic data updates (simulate real-time data)
function initRealTimeData() {
    // Update planet discovery data periodically
    const planetStats = document.querySelectorAll('.planet-stat .stat-value');
    
    setInterval(() => {
        planetStats.forEach(stat => {
            if (stat.textContent.includes('LY')) {
                // Simulate distance updates
                const currentDistance = parseFloat(stat.textContent);
                const newDistance = (currentDistance + (Math.random() - 0.5) * 0.1).toFixed(1);
                stat.textContent = `${newDistance} LY`;
            }
        });
    }, 5000);
}

// Add CSS for animations
const animationStyles = `
    .animate-in {
        animation: slideInUp 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(60px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-links a.active {
        color: #00AEFF;
    }
    
    .nav-links a.active::after {
        width: 100%;
    }
`;

// Inject animation styles
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

// Particle system for enhanced visual effects
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: #00AEFF;
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${3 + Math.random() * 4}s linear infinite;
            opacity: ${Math.random() * 0.5 + 0.2};
        `;
        particleContainer.appendChild(particle);
    }
    
    document.body.appendChild(particleContainer);
}

// Add particle animation CSS
const particleStyles = `
    @keyframes particleFloat {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;

const particleStyleSheet = document.createElement('style');
particleStyleSheet.textContent = particleStyles;
document.head.appendChild(particleStyleSheet);

// Initialize particles after page load
setTimeout(createParticles, 1000);

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.length === konamiSequence.length && 
        konamiCode.every((code, index) => code === konamiSequence[index])) {
        
        // Easter egg: Make the planet rainbow colored
        const planet = document.querySelector('.planet');
        if (planet) {
            planet.style.background = 'linear-gradient(135deg, #ff0000, #ff8000, #ffff00, #80ff00, #00ff00, #00ff80, #00ffff, #0080ff, #0000ff, #8000ff, #ff00ff, #ff0080)';
            planet.style.animation = 'planetRotate 2s linear, rainbowShift 3s ease-in-out infinite';
            
            // Add rainbow shift animation
            const rainbowStyle = document.createElement('style');
            rainbowStyle.textContent = `
                @keyframes rainbowShift {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(rainbowStyle);
        }
        
        konamiCode = [];
    }
});

// Console message for developers
console.log(`
🌌 CHRISTIAN ESPINOSA ORGANIZATION - GALACTIC COMMAND INTERFACE 🌌
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Mission: Establishing humanity's galactic dominion
Status: ACTIVE - Traversing cosmic frontiers
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Interesting discovery? Try the Konami code for a surprise! ↑↑↓↓←→←→BA

Developed with cutting-edge web technologies for the future of space exploration.
`);

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`🚀 Interface loaded in ${loadTime.toFixed(2)}ms - Ready for galactic missions!`);
    });
}// Advanced Space and War Effects
// Initialize battle mode and war effects
initBattleEffects();
initAsteroidField();
initLaserBeams();
initPlasmaStorm();
initWarpSpeed();
initTargetingSystem();
initEnergyWeapons();

// Battle Mode Effects
function initBattleEffects() {
    // Add battle mode toggle
    let battleModeActive = false;
    
    // Double-click anywhere to toggle battle mode
    document.addEventListener('dblclick', function() {
        battleModeActive = !battleModeActive;
        document.body.classList.toggle('battle-mode-active', battleModeActive);
        
        if (battleModeActive) {
            triggerBattleMode();
        }
    });
    
    // Battle mode effects
    function triggerBattleMode() {
        // Add scanning overlay
        const scannerOverlay = document.createElement('div');
        scannerOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: repeating-linear-gradient(
                90deg,
                transparent,
                transparent 98px,
                rgba(0, 174, 255, 0.1) 100px
            );
            animation: scanGrid 2s linear infinite;
            pointer-events: none;
            z-index: 9999;
            opacity: 0.6;
        `;
        document.body.appendChild(scannerOverlay);
        
        // Random explosions effect
        setInterval(() => {
            if (battleModeActive) {
                createExplosion();
            }
        }, 3000);
        
        setTimeout(() => {
            if (scannerOverlay.parentNode) {
                scannerOverlay.parentNode.removeChild(scannerOverlay);
            }
        }, 5000);
    }
}

// Asteroid Field System
function initAsteroidField() {
    const asteroidContainer = document.createElement('div');
    asteroidContainer.className = 'asteroid-field';
    document.body.appendChild(asteroidContainer);
    
    // Create multiple asteroids
    for (let i = 0; i < 15; i++) {
        createAsteroid(asteroidContainer, i);
    }
}

function createAsteroid(container, index) {
    const asteroid = document.createElement('div');
    asteroid.className = 'asteroid';
    
    const size = Math.random() * 15 + 5;
    asteroid.style.cssText = `
        position: absolute;
        top: ${Math.random() * 100}%;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, #666, #333);
        border-radius: 50%;
        left: -50px;
        animation: asteroidMove ${15 + Math.random() * 10}s linear infinite;
        animation-delay: ${Math.random() * 5}s;
        box-shadow: 0 0 10px rgba(102, 102, 102, 0.5);
    `;
    
    container.appendChild(asteroid);
}

// Laser Beam System
function initLaserBeams() {
    const laserContainer = document.createElement('div');
    laserContainer.id = 'laser-container';
    laserContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1000;
    `;
    document.body.appendChild(laserContainer);
    
    // Fire random laser beams
    setInterval(() => {
        fireLaser(laserContainer);
    }, 5000);
}

function fireLaser(container) {
    const laser = document.createElement('div');
    laser.className = 'laser-beam';
    laser.style.cssText = `
        position: absolute;
        width: 2px;
        height: 100vh;
        background: linear-gradient(to bottom, transparent, #FF3346, transparent);
        left: ${Math.random() * 100}%;
        top: 0;
        opacity: 0.8;
        animation: laserFire 1s ease-out forwards;
        box-shadow: 0 0 20px #FF3346;
    `;
    
    container.appendChild(laser);
    
    setTimeout(() => {
        if (laser.parentNode) {
            laser.parentNode.removeChild(laser);
        }
    }, 1000);
}

// Plasma Storm Effects
function initPlasmaStorm() {
    const plasmaContainer = document.createElement('div');
    plasmaContainer.className = 'plasma-storm';
    document.body.appendChild(plasmaContainer);
    
    // Add plasma orbs
    for (let i = 0; i < 5; i++) {
        createPlasmaOrb(plasmaContainer, i);
    }
}

function createPlasmaOrb(container, index) {
    const orb = document.createElement('div');
    orb.style.cssText = `
        position: absolute;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255, 183, 0, 0.8), rgba(255, 51, 70, 0.4), transparent);
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        animation: plasmaOrbMove ${8 + Math.random() * 4}s ease-in-out infinite;
        animation-delay: ${index * 2}s;
        filter: blur(1px);
    `;
    container.appendChild(orb);
}

const plasmaOrbStyle = document.createElement('style');
plasmaOrbStyle.textContent = `
    @keyframes plasmaOrbMove {
        0%, 100% { 
            transform: translate(0, 0) scale(1); 
            opacity: 0.7; 
        }
        25% { 
            transform: translate(50px, -30px) scale(1.2); 
            opacity: 0.9; 
        }
        50% { 
            transform: translate(-30px, 40px) scale(0.8); 
            opacity: 0.6; 
        }
        75% { 
            transform: translate(20px, -20px) scale(1.1); 
            opacity: 0.8; 
        }
    }
`;
document.head.appendChild(plasmaOrbStyle);

// Warp Speed Effect
function initWarpSpeed() {
    // Trigger warp speed on scroll
    let lastScrollY = window.scrollY;
    let warpTimeout;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        const scrollDiff = Math.abs(currentScrollY - lastScrollY);
        
        if (scrollDiff > 50) {
            triggerWarpSpeed();
        }
        
        lastScrollY = currentScrollY;
        
        clearTimeout(warpTimeout);
        warpTimeout = setTimeout(() => {
            document.body.classList.remove('warp-speed');
        }, 500);
    });
}

function triggerWarpSpeed() {
    document.body.classList.add('warp-speed');
    
    // Create warp streaks
    const warpContainer = document.createElement('div');
    warpContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 999;
    `;
    
    for (let i = 0; i < 20; i++) {
        const streak = document.createElement('div');
        streak.style.cssText = `
            position: absolute;
            width: 2px;
            height: 100px;
            background: linear-gradient(to bottom, transparent, #00AEFF, transparent);
            left: ${Math.random() * 100}%;
            top: -100px;
            animation: warpStreak 0.5s linear;
            opacity: 0.8;
        `;
        warpContainer.appendChild(streak);
    }
    
    document.body.appendChild(warpContainer);
    
    setTimeout(() => {
        if (warpContainer.parentNode) {
            warpContainer.parentNode.removeChild(warpContainer);
        }
    }, 500);
}

const warpStreakStyle = document.createElement('style');
warpStreakStyle.textContent = `
    @keyframes warpStreak {
        0% {
            top: -100px;
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            top: 100vh;
            opacity: 0;
        }
    }
`;
document.head.appendChild(warpStreakStyle);

// Targeting System
function initTargetingSystem() {
    document.addEventListener('click', function(e) {
        if (e.target.closest('.mission-card, .tech-panel, .planet-discovery, .propulsion-system, .contact-card')) {
            createTargetingReticle(e.clientX, e.clientY);
        }
    });
}

function createTargetingReticle(x, y) {
    const reticle = document.createElement('div');
    reticle.style.cssText = `
        position: fixed;
        left: ${x - 30}px;
        top: ${y - 30}px;
        width: 60px;
        height: 60px;
        border: 2px solid #FF3346;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: targetLock 1s ease-out forwards;
        box-shadow: 0 0 20px #FF3346;
    `;
    
    // Add targeting lines
    for (let i = 0; i < 4; i++) {
        const line = document.createElement('div');
        const angle = i * 90;
        line.style.cssText = `
            position: absolute;
            width: 20px;
            height: 2px;
            background: #FF3346;
            top: 50%;
            left: 50%;
            transform-origin: left center;
            transform: translate(-50%, -50%) rotate(${angle}deg);
            animation: targetLine 1s ease-out forwards;
        `;
        reticle.appendChild(line);
    }
    
    document.body.appendChild(reticle);
    
    setTimeout(() => {
        if (reticle.parentNode) {
            reticle.parentNode.removeChild(reticle);
        }
    }, 1000);
}

const targetStyle = document.createElement('style');
targetStyle.textContent = `
    @keyframes targetLock {
        0% {
            transform: scale(0);
            opacity: 0;
        }
        50% {
            transform: scale(1.2);
            opacity: 1;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
    
    @keyframes targetLine {
        0% {
            width: 0;
        }
        100% {
            width: 20px;
        }
    }
`;
document.head.appendChild(targetStyle);

// Energy Weapons System
function initEnergyWeapons() {
    document.addEventListener('mousedown', function(e) {
        createEnergyBurst(e.clientX, e.clientY);
    });
}

function createEnergyBurst(x, y) {
    const burst = document.createElement('div');
    burst.style.cssText = `
        position: fixed;
        left: ${x - 50}px;
        top: ${y - 50}px;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(0, 174, 255, 0.8), rgba(255, 51, 70, 0.6), transparent);
        pointer-events: none;
        z-index: 9998;
        animation: energyBurst 0.6s ease-out forwards;
    `;
    
    document.body.appendChild(burst);
    
    setTimeout(() => {
        if (burst.parentNode) {
            burst.parentNode.removeChild(burst);
        }
    }, 600);
}

const energyBurstStyle = document.createElement('style');
energyBurstStyle.textContent = `
    @keyframes energyBurst {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        50% {
            transform: scale(1.5);
            opacity: 0.8;
        }
        100% {
            transform: scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(energyBurstStyle);

// Enhanced Planet Interaction
function initEnhancedPlanetEffects() {
    const planet = document.querySelector('.planet');
    if (planet) {
        planet.addEventListener('mouseenter', function() {
            // Create energy ripples
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    createPlanetRipple(planet);
                }, i * 200);
            }
        });
    }
}

function createPlanetRipple(element) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border: 2px solid rgba(0, 174, 255, 0.6);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: planetRipple 2s ease-out forwards;
    `;
    
    element.parentNode.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 2000);
}

const planetRippleStyle = document.createElement('style');
planetRippleStyle.textContent = `
    @keyframes planetRipple {
        0% {
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            width: 400px;
            height: 400px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(planetRippleStyle);

// Initialize enhanced effects
setTimeout(initEnhancedPlanetEffects, 1000);

// Console Battle Commands
window.battleCommands = {
    battleMode: () => document.body.classList.toggle('battle-mode-active'),
    fireLasers: () => {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => fireLaser(document.getElementById('laser-container')), i * 200);
        }
    },
    warpSpeed: () => triggerWarpSpeed(),
    createExplosion: () => createExplosion()
};

// Enhanced console message
console.log(`
🌌 CHRISTIAN ESPINOSA ORGANIZATION - GALACTIC COMMAND INTERFACE 🌌
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Mission: Establishing humanity's galactic dominion
Status: ACTIVE - Traversing cosmic frontiers with BATTLE SYSTEMS ONLINE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔫 BATTLE COMMANDS AVAILABLE:
• battleCommands.battleMode() - Toggle battle mode
• battleCommands.fireLasers() - Fire warning shots
• battleCommands.warpSpeed() - Engage warp drive
• battleCommands.createExplosion() - Simulate weapon test

⚡ INTERACTIVE FEATURES:
• Double-click anywhere for BATTLE MODE
• Click on cards for TARGETING SYSTEM
• Mouse down anywhere for ENERGY BURSTS
• Scroll fast for WARP SPEED EFFECT

🌟 EASTER EGGS:
• Konami Code: ↑↑↓↓←→←→BA for Rainbow Planet
• Hidden asteroid fields and laser battles
• Plasma storms and warp effects

Developed with cutting-edge web technologies for the future of space warfare.
`);